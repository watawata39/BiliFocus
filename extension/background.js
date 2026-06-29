const RELEASE_NOTES_VERSION = "2.1.4";
const RELEASE_NOTES_VERSIONS = ["2.1.0", "2.1.4"];

function getReleaseNotesStorageKey(version) {
  return `releaseNotesShown:${version}`;
}

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason !== "update") return;

  const currentVersion = chrome.runtime.getManifest().version;
  if (currentVersion !== RELEASE_NOTES_VERSION) return;

  const storageKeys = RELEASE_NOTES_VERSIONS.map(getReleaseNotesStorageKey);
  chrome.storage.local.get(storageKeys, (result) => {
    const versionsToShow = RELEASE_NOTES_VERSIONS.filter((version) => !result[getReleaseNotesStorageKey(version)]);
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
});
