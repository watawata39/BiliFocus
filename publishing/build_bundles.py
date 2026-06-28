#!/usr/bin/env python3
"""Build Chrome/Edge and Firefox extension ZIP bundles.

The source manifest remains Chrome/Edge-compatible. For the Firefox bundle,
this script rewrites only the in-ZIP manifest background field from
`service_worker` to `scripts`, which is what Firefox's uploader expects.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import tempfile
import zipfile
from pathlib import Path
from typing import Iterable


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_EXTENSION_DIR = PROJECT_ROOT / "extension"
DEFAULT_OUTPUT_DIR = PROJECT_ROOT / "dist"

SKIPPED_DIRS = {
    "__MACOSX",
    ".git",
    ".hg",
    ".svn",
    "__pycache__",
}

SKIPPED_FILES = {
    ".DS_Store",
    "Thumbs.db",
    ".gitkeep",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Build BiliFocus ZIP bundles for Chrome/Edge and Firefox."
    )
    parser.add_argument(
        "--extension-dir",
        type=Path,
        default=DEFAULT_EXTENSION_DIR,
        help="Extension source directory. Defaults to ./extension.",
    )
    parser.add_argument(
        "--out-dir",
        type=Path,
        default=DEFAULT_OUTPUT_DIR,
        help="Directory for generated ZIP bundles. Defaults to ./dist.",
    )
    return parser.parse_args()


def should_skip(path: Path) -> bool:
    if any(part in SKIPPED_DIRS for part in path.parts):
        return True

    name = path.name
    return (
        name in SKIPPED_FILES
        or name.startswith("._")
        or name.endswith(".zip")
        or name.endswith(".pyc")
    )


def extension_files(extension_dir: Path) -> Iterable[Path]:
    for path in sorted(extension_dir.rglob("*")):
        relative_path = path.relative_to(extension_dir)
        if path.is_dir() or should_skip(relative_path):
            continue
        yield path


def load_manifest(extension_dir: Path) -> dict:
    manifest_path = extension_dir / "manifest.json"
    try:
        with manifest_path.open("r", encoding="utf-8") as manifest_file:
            return json.load(manifest_file)
    except FileNotFoundError:
        raise SystemExit(f"Manifest not found: {manifest_path}") from None
    except json.JSONDecodeError as error:
        raise SystemExit(f"Invalid manifest JSON: {error}") from None


def manifest_version(manifest: dict) -> str:
    version = manifest.get("version")
    if not isinstance(version, str) or not version:
        raise SystemExit("Manifest must contain a string version.")
    return version


def firefox_manifest(manifest: dict) -> dict:
    patched_manifest = json.loads(json.dumps(manifest))
    background = patched_manifest.get("background")

    if not isinstance(background, dict):
        return patched_manifest

    service_worker = background.get("service_worker")
    if service_worker:
        patched_manifest["background"] = {"scripts": [service_worker]}
    elif "scripts" not in background:
        raise SystemExit(
            "Firefox bundle needs background.scripts, but no service_worker "
            "was found to convert."
        )

    return patched_manifest


def manifest_bytes(manifest: dict) -> bytes:
    return (json.dumps(manifest, ensure_ascii=False, indent=2) + "\n").encode("utf-8")


def display_path(path: Path) -> Path:
    try:
        return path.relative_to(PROJECT_ROOT)
    except ValueError:
        return path


def is_regex_context(previous_significant: str) -> bool:
    return previous_significant == "" or previous_significant in "([{=,:;!&|?+-*~^<>"


def strip_js_comments(source: str) -> str:
    """Remove JS line/block comments without changing source files on disk."""
    output: list[str] = []
    index = 0
    previous_significant = ""
    state = "code"
    template_expression_depth = 0
    brace_stack: list[str] = []

    while index < len(source):
        char = source[index]
        next_char = source[index + 1] if index + 1 < len(source) else ""

        if state == "code":
            if char == "/" and next_char == "/":
                index += 2
                while index < len(source) and source[index] not in "\r\n":
                    index += 1
                continue
            if char == "/" and next_char == "*":
                index += 2
                while index < len(source) - 1 and not (source[index] == "*" and source[index + 1] == "/"):
                    if source[index] in "\r\n":
                        output.append(source[index])
                    index += 1
                index = min(index + 2, len(source))
                continue
            if char == "'" or char == '"':
                state = char
                output.append(char)
                index += 1
                continue
            if char == "`":
                state = "template"
                output.append(char)
                index += 1
                continue
            if char == "/" and is_regex_context(previous_significant):
                state = "regex"
                output.append(char)
                index += 1
                continue
            if template_expression_depth and char == "{":
                template_expression_depth += 1
            elif template_expression_depth and char == "}":
                template_expression_depth -= 1
                output.append(char)
                if template_expression_depth == 0 and brace_stack and brace_stack[-1] == "template":
                    brace_stack.pop()
                    state = "template"
                previous_significant = "}"
                index += 1
                continue
            if not char.isspace():
                previous_significant = char
            output.append(char)
            index += 1
            continue

        if state == "'" or state == '"':
            output.append(char)
            if char == "\\":
                if index + 1 < len(source):
                    output.append(source[index + 1])
                    index += 2
                else:
                    index += 1
                continue
            if char == state:
                previous_significant = char
                state = "code"
            index += 1
            continue

        if state == "template":
            output.append(char)
            if char == "\\":
                if index + 1 < len(source):
                    output.append(source[index + 1])
                    index += 2
                else:
                    index += 1
                continue
            if char == "`":
                previous_significant = char
                state = "code"
                index += 1
                continue
            if char == "$" and next_char == "{":
                output.append(next_char)
                brace_stack.append("template")
                template_expression_depth = 1
                state = "code"
                previous_significant = "{"
                index += 2
                continue
            index += 1
            continue

        if state == "regex":
            output.append(char)
            if char == "\\":
                if index + 1 < len(source):
                    output.append(source[index + 1])
                    index += 2
                else:
                    index += 1
                continue
            if char == "[":
                state = "regex_class"
                index += 1
                continue
            if char == "/":
                index += 1
                while index < len(source) and (source[index].isalpha() or source[index].isdigit()):
                    output.append(source[index])
                    index += 1
                previous_significant = "/"
                state = "code"
                continue
            index += 1
            continue

        if state == "regex_class":
            output.append(char)
            if char == "\\":
                if index + 1 < len(source):
                    output.append(source[index + 1])
                    index += 2
                else:
                    index += 1
                continue
            if char == "]":
                state = "regex"
            index += 1
            continue

    return "".join(output)


def file_bytes_for_bundle(source_path: Path) -> bytes:
    if source_path.suffix == ".js":
        return strip_js_comments(source_path.read_text(encoding="utf-8")).encode("utf-8")
    return source_path.read_bytes()


def write_bundle(
    extension_dir: Path,
    output_path: Path,
    manifest: dict,
) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with tempfile.NamedTemporaryFile(
        prefix=f"{output_path.stem}.",
        suffix=".zip",
        dir=output_path.parent,
        delete=False,
    ) as temp_file:
        temp_path = Path(temp_file.name)

    try:
        with zipfile.ZipFile(
            temp_path,
            "w",
            compression=zipfile.ZIP_DEFLATED,
            compresslevel=9,
        ) as archive:
            archive.writestr("manifest.json", manifest_bytes(manifest))

            for source_path in extension_files(extension_dir):
                relative_path = source_path.relative_to(extension_dir)
                if relative_path.as_posix() == "manifest.json":
                    continue
                archive.writestr(relative_path.as_posix(), file_bytes_for_bundle(source_path))

        os.replace(temp_path, output_path)
    except Exception:
        temp_path.unlink(missing_ok=True)
        raise


def main() -> int:
    args = parse_args()
    extension_dir = args.extension_dir.resolve()
    output_dir = args.out_dir.resolve()

    manifest = load_manifest(extension_dir)
    version = manifest_version(manifest)

    chrome_edge_bundle = output_dir / f"bilifocus-{version}-chrome-edge.zip"
    firefox_bundle = output_dir / f"bilifocus-{version}-firefox.zip"

    write_bundle(extension_dir, chrome_edge_bundle, manifest)
    write_bundle(extension_dir, firefox_bundle, firefox_manifest(manifest))

    print(f"Built {display_path(chrome_edge_bundle)}")
    print(f"Built {display_path(firefox_bundle)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
