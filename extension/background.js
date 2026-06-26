const RELEASE_NOTES_VERSION = "2.1.0";
const RELEASE_NOTES_STORAGE_KEY = `releaseNotesShown:${RELEASE_NOTES_VERSION}`;

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason !== "update") return;

  const currentVersion = chrome.runtime.getManifest().version;
  if (currentVersion !== RELEASE_NOTES_VERSION) return;

  chrome.storage.local.get(RELEASE_NOTES_STORAGE_KEY, (result) => {
    if (result[RELEASE_NOTES_STORAGE_KEY]) return;

    chrome.storage.local.set({ [RELEASE_NOTES_STORAGE_KEY]: true }, () => {
      chrome.tabs.create({
        url: chrome.runtime.getURL(`release-notes/whatsnew.html?version=${encodeURIComponent(currentVersion)}`),
      });
    });
  });
});
