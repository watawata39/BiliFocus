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
  ];
  let revealScheduled = false;
  let revealed = false;

  const finishReveal = () => {
    if (revealed) return;
    revealed = true;
    if (root) root.removeAttribute("data-bili-focus-preparing");
  };

  const failSafeTimer = setTimeout(finishReveal, 2000);
  if (root) root.setAttribute("data-bili-focus-preparing", "");

  const revealPage = () => {
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

  globalThis.biliFocusBootstrap = {
    settingsReady,
    revealPage,
  };
})();
