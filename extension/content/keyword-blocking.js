// Video-card filtering. Shared rule parsing is loaded first by the manifest.
const KEYWORD_BLOCKING_STYLE_ID = "bili-focus-style-keyword-blocking";
const KEYWORD_BLOCKING_CARD_CLASS = "bili-focus-keyword-blocked-card";
let keywordBlockingCompiledRules = [];
let keywordBlockingObserver = null;
let keywordBlockingRaf = 0;
function setKeywordBlockingRules(nextRules) {
  keywordBlockingRules = normalizeKeywordBlockingRules(nextRules);
  keywordBlockingCompiledRules = keywordBlockingRules
    .filter(rule => rule.enabled !== false)
    .map(rule => ({ rule, regex: new RegExp(rule.source, rule.flags) }));
  scheduleKeywordBlockingScan();
}
function addKeywordBlockingStyle(css, id = KEYWORD_BLOCKING_STYLE_ID) {
  let style = document.getElementById(id);
  if (!style) {
    style = document.createElement("style");
    style.id = id;
    document.documentElement.appendChild(style);
  }
  style.textContent = css;
}

function installKeywordBlockingStyles() {
  addKeywordBlockingStyle(`
    .${KEYWORD_BLOCKING_CARD_CLASS} {
      position: relative !important;
      visibility: visible !important;
      pointer-events: none !important;
      background: #f3f5f8 !important;
      border-radius: 6px !important;
      box-shadow: none !important;
      overflow: hidden !important;
      isolation: isolate !important;
    }

    .${KEYWORD_BLOCKING_CARD_CLASS} > * {
      visibility: hidden !important;
      pointer-events: none !important;
    }

    .${KEYWORD_BLOCKING_CARD_CLASS}::after {
      content: attr(data-bili-focus-keyword-label);
      position: absolute !important;
      inset: 0 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 16px !important;
      box-sizing: border-box !important;
      color: rgba(38, 48, 64, 0.58) !important;
      background: #f3f5f8 !important;
      font-size: 14px !important;
      line-height: 20px !important;
      font-weight: 700 !important;
      text-align: center !important;
      visibility: visible !important;
      pointer-events: none !important;
    }

`);
}

function getKeywordBlockingCardTitle(card) {
  const titleElement = card.querySelector(".bili-video-card__info--tit");
  if (titleElement) {
    const titleAttribute = titleElement.getAttribute("title");
    if (titleAttribute) return titleAttribute.trim();
    const titleLink = titleElement.querySelector("a");
    if (titleLink) {
      const linkTitle = titleLink.getAttribute("title") || titleLink.textContent;
      if (linkTitle) return linkTitle.trim();
    }
    const titleText = titleElement.textContent;
    if (titleText) return titleText.trim();
  }

  const fallbackTitle = card.querySelector("h3[title], a[title]");
  if (fallbackTitle) {
    const value = fallbackTitle.getAttribute("title") || fallbackTitle.textContent;
    if (value) return value.trim();
  }
  return "";
}

function getKeywordBlockingCards() {
  if (!document.body) return [];
  const cards = Array.from(document.querySelectorAll(".bili-feed-card, .bili-video-card"));
  return cards.filter((card) => {
    if (card.matches(".bili-video-card") && card.closest(".bili-feed-card")) return false;
    return !!getKeywordBlockingCardTitle(card);
  });
}

function isKeywordBlockingTitleBlocked(title) {
  if (!title || keywordBlockingCompiledRules.length === 0) return false;
  return keywordBlockingCompiledRules.some(({ regex }) => {
    regex.lastIndex = 0;
    return regex.test(title);
  });
}

function applyKeywordBlocking() {
  getKeywordBlockingCards().forEach((card) => {
    const title = getKeywordBlockingCardTitle(card);
    const shouldBlock = isKeywordBlockingTitleBlocked(title);
    card.classList.toggle(KEYWORD_BLOCKING_CARD_CLASS, shouldBlock);
    if (shouldBlock) {
      card.setAttribute("data-bili-focus-keyword-label", getKeywordBlockingMessage("blockedCard"));
    } else {
      card.removeAttribute("data-bili-focus-keyword-label");
    }
  });

  document.querySelectorAll(`.${KEYWORD_BLOCKING_CARD_CLASS}`).forEach((card) => {
    if (!isKeywordBlockingTitleBlocked(getKeywordBlockingCardTitle(card))) {
      card.classList.remove(KEYWORD_BLOCKING_CARD_CLASS);
      card.removeAttribute("data-bili-focus-keyword-label");
    }
  });
}

function scheduleKeywordBlockingScan() {
  if (keywordBlockingRaf) return;
  keywordBlockingRaf = requestAnimationFrame(() => {
    keywordBlockingRaf = 0;
    applyKeywordBlocking();
  });
}

function startKeywordBlockingObserver() {
  const target = document.body || document.documentElement;
  if (!target || keywordBlockingObserver) return;
  keywordBlockingObserver = new MutationObserver(() => {
    scheduleKeywordBlockingScan();
  });
  keywordBlockingObserver.observe(target, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["title", "href", "class"],
  });
  scheduleKeywordBlockingScan();
}

function getInitialKeywordBlockingSettings() {
  const bootstrap = globalThis.biliFocusBootstrap;
  if (bootstrap && bootstrap.settingsReady) return bootstrap.settingsReady;

  return new Promise((resolve) => {
    chrome.storage.local.get([KEYWORD_BLOCKING_STORAGE_KEY, "language"], (result) => {
      if (chrome.runtime.lastError) {
        console.warn("BiliFocus could not load keyword blocking settings:", chrome.runtime.lastError.message);
        resolve({});
        return;
      }
      resolve(result || {});
    });
  });
}

function initializeKeywordBlocking() {
  installKeywordBlockingStyles();
  const settingsReady = getInitialKeywordBlockingSettings().then((result) => {
    keywordBlockingLanguage = getKeywordBlockingLanguage(result.language);
    setKeywordBlockingRules(result[KEYWORD_BLOCKING_STORAGE_KEY]);
    applyKeywordBlocking();
    startKeywordBlockingObserver();
  });

  return settingsReady;
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;
  if (Object.prototype.hasOwnProperty.call(changes, KEYWORD_BLOCKING_STORAGE_KEY)) {
    setKeywordBlockingRules(changes[KEYWORD_BLOCKING_STORAGE_KEY].newValue);
  }
  if (Object.prototype.hasOwnProperty.call(changes, "language")) {
    keywordBlockingLanguage = getKeywordBlockingLanguage(changes.language.newValue);
    scheduleKeywordBlockingScan();
  }
});

globalThis.biliFocusKeywordBlockingReady = initializeKeywordBlocking();
