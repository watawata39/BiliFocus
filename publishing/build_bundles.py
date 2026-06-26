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
                archive.write(source_path, relative_path.as_posix())

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

    print(f"Built {chrome_edge_bundle.relative_to(PROJECT_ROOT)}")
    print(f"Built {firefox_bundle.relative_to(PROJECT_ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
