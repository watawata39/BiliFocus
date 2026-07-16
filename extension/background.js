const RELEASE_NOTES_METADATA_PATH = "release-notes/metadata.json";

function getReleaseNotesStorageKey(version) {
  return `releaseNotesShown:${version}`;
}

async function loadReleaseNotesMetadata() {
  try {
    const response = await fetch(chrome.runtime.getURL(RELEASE_NOTES_METADATA_PATH), { cache: "no-store" });
    if (!response.ok) return null;
    return await response.json();
  } catch (_) {
    return null;
  }
}

function normalizeReleaseNotesVersions(metadata, currentVersion) {
  const versions = Array.isArray(metadata.versions)
    ? metadata.versions.filter((version) => typeof version === "string" && version)
    : [];
  return versions.length > 0 ? versions : [currentVersion];
}

async function openReleaseNotesOnUpdate() {
  const metadata = await loadReleaseNotesMetadata();
  if (!metadata || metadata.enabled !== true) return;

  const currentVersion = chrome.runtime.getManifest().version;
  if (metadata.version && metadata.version !== currentVersion) return;

  const releaseNotesVersions = normalizeReleaseNotesVersions(metadata, currentVersion);
  const storageKeys = releaseNotesVersions.map(getReleaseNotesStorageKey);
  chrome.storage.local.get(storageKeys, (result) => {
    const versionsToShow = releaseNotesVersions.filter((version) => !result[getReleaseNotesStorageKey(version)]);
    if (versionsToShow.length === 0) return;

    const shownFlags = {};
    versionsToShow.forEach((version) => {
      shownFlags[getReleaseNotesStorageKey(version)] = true;
    });

    chrome.storage.local.set(shownFlags, () => {
      chrome.tabs.create({
        url: chrome.runtime.getURL(`release-notes/whatsnew.html?versions=${encodeURIComponent(versionsToShow.join(","))}`),
      });
    });
  });
}

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason !== "update") return;
  openReleaseNotesOnUpdate();
});
