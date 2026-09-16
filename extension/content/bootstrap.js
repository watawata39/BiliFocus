// Prepaint bootstrap. Loaded before the feature scripts by manifest.json.

(() => {
  const root = document.documentElement;
  const criticalStorageKeys = [
    "homepagerecom",
    "vidrecom",
    "comments",
    "leftnavi",
    "searchrecom",
    "membership",
    "messages",
    "dongtai",
    "favourites",
    "history",
    "tougao",
    "ads",
    "myvideos",
    "myfavourites",
    "subanimes",
    "recentcoins",
    "recentlikes",
    "collections",
    "columns",
    "usrpageleftsidebar",
    "cleansearchmode",
    "cleansearchrightnavleft",
    "language",
    "cleansearchbackground",
    "keywordblockrules",
    "intentionCheck",
  ];
  let revealScheduled = false;
  let revealed = false;
  let redirecting = false;

  const finishReveal = () => {
    if (revealed || redirecting) return;
    revealed = true;
    if (root) root.removeAttribute("data-bili-focus-preparing");
  };

  const failSafeTimer = setTimeout(finishReveal, 2000);
  if (root) root.setAttribute("data-bili-focus-preparing", "");

  const revealPage = async () => {
    await intentionReady;
    if (revealed || revealScheduled) return;
    revealScheduled = true;
    const reveal = () => {
      clearTimeout(failSafeTimer);
      finishReveal();
    };
    if (typeof requestAnimationFrame === "function") {
      requestAnimationFrame(reveal);
    } else {
      reveal();
    }
  };

  const settingsReady = new Promise((resolve) => {
    try {
      chrome.storage.local.get(criticalStorageKeys, (result) => {
        if (chrome.runtime.lastError) {
          console.warn("BiliFocus could not load its startup settings:", chrome.runtime.lastError.message);
          resolve({});
          return;
        }
        resolve(result || {});
      });
    } catch (error) {
      console.warn("BiliFocus could not request its startup settings:", error);
      resolve({});
    }
  });

  // Disabled visits use the existing storage read without a session-message round trip.
  const checkVisit = async data => {
    if (window.top !== window || data.intentionCheck?.enabled !== true) return;
    const result = await chrome.runtime.sendMessage({ action: "intentionVisit" });
    if (result?.redirect) redirecting = true;
  };
  const intentionReady = settingsReady.then(checkVisit).catch(() => {});
  window.addEventListener("pageshow", event => {
    if (!event.persisted || window.top !== window) return;
    revealed = false;
    redirecting = false;
    if (root) root.setAttribute("data-bili-focus-preparing", "");
    const timeout = setTimeout(finishReveal, 2000);
    // Preferences may have changed while this document was in the back/forward cache.
    chrome.storage.local.get("intentionCheck").then(checkVisit).catch(() => {}).finally(() => {
      clearTimeout(timeout);
      finishReveal();
    });
  });

  globalThis.biliFocusBootstrap = {
    settingsReady,
    revealPage,
  };
})();
