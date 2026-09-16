// Map stored language preference to _locales folder name
const langToLocale = { zh: 'zh_CN', en: 'en', ja: 'ja' };
const supportedLangs = ['zh', 'en', 'ja'];
const cleanSearchLockedKeys = ['homepagerecom', 'searchrecom', 'ads'];

// Cached messages per locale (from _locales/<locale>/messages.json)
let messagesCache = {};
let currentMessages = null;
let currentLanguage = 'en';
let cleanSearchModeEnabled = true;

function adjust_button() {
  updateCleanSearchButtonText();
}

function getMessage(messages, key) {
  if (!messages || !messages[key]) return '';
  return messages[key].message || '';
}

function showPopupAlert(message) {
  const overlay = document.getElementById("custom-alert");
  const text = document.getElementById("modal-text");
  if (!overlay || !text) return;
  text.textContent = message;
  overlay.style.display = "flex";
}

function getCurrentPopupMessage(key, fallback = '') {
  return getMessage(currentMessages, key) || fallback;
}

async function loadLocale(locale) {
  if (messagesCache[locale]) return messagesCache[locale];
  const url = chrome.runtime.getURL(`_locales/${locale}/messages.json`);
  const res = await fetch(url);
  const data = await res.json();
  messagesCache[locale] = data;
  return data;
}

async function applyLanguage(lang) {
  currentLanguage = lang;
  const locale = langToLocale[lang];
  const content = await loadLocale(locale);
  currentMessages = content;

  document.getElementById('main-title').textContent = getMessage(content, 'mainTitle');
  document.getElementById('homepagerecom-text').textContent = getMessage(content, 'homepagerecom');
  document.getElementById('vidrecom-text').textContent = getMessage(content, 'vidrecom');
  document.getElementById('comments-text').textContent = getMessage(content, 'comments');
  document.getElementById('group_general-title').textContent = getMessage(content, 'groupGeneral');
  document.getElementById('searchrecom-text').textContent = getMessage(content, 'searchrecom');
  document.getElementById('leftnavi-text').textContent = getMessage(content, 'leftnavi');
  document.getElementById('ads-text').textContent = getMessage(content, 'ads');
  document.getElementById('right_navi_general-title').textContent = getMessage(content, 'rightNaviGeneral');
  document.getElementById('membership-text').textContent = getMessage(content, 'membership');
  document.getElementById('messages-text').textContent = getMessage(content, 'messages');
  document.getElementById('dongtai-text').textContent = getMessage(content, 'dongtai');
  document.getElementById('favourites-text').textContent = getMessage(content, 'favourites');
  document.getElementById('history-text').textContent = getMessage(content, 'history');
  document.getElementById('tougao-text').textContent = getMessage(content, 'tougao');
  document.getElementById('personal_page-title').textContent = getMessage(content, 'personalPage');
  document.getElementById('myvideos-text').textContent = getMessage(content, 'myvideos');
  document.getElementById('myfavourites-text').textContent = getMessage(content, 'myfavourites');
  document.getElementById('subanimes-text').textContent = getMessage(content, 'subanimes');
  document.getElementById('recentcoins-text').textContent = getMessage(content, 'recentcoins');
  document.getElementById('collections-text').textContent = getMessage(content, 'collections');
  document.getElementById('columns-text').textContent = getMessage(content, 'columns');
  document.getElementById('recentlikes-text').textContent = getMessage(content, 'recentlikes');
  document.getElementById('usrpageleftsidebar-text').textContent = getMessage(content, 'usrpageleftsidebar');
  document.getElementById('feedback-text').textContent = getMessage(content, 'feedback');
  document.getElementById('support-text').textContent = getMessage(content, 'support');
  document.getElementById('modal-text').textContent = getMessage(content, 'modalText');

  const settingsBtn = document.getElementById('settings-btn');
  if (settingsBtn) settingsBtn.title = getMessage(content, 'settingsBtnTitle');
  const cleanSearchBtn = document.getElementById('clean-search-btn');
  if (cleanSearchBtn) cleanSearchBtn.title = getMessage(content, 'cleanSearchModeTitle');
  const choicesMenuBtn = document.getElementById('choices-menu-btn');
  if (choicesMenuBtn) choicesMenuBtn.title = getMessage(content, 'moreOptionsTitle');
  const selectAllBtn = document.getElementById('select-all-btn');
  if (selectAllBtn) selectAllBtn.textContent = getMessage(content, 'selectAll');
  const unselectAllBtn = document.getElementById('unselect-all-btn');
  if (unselectAllBtn) unselectAllBtn.textContent = getMessage(content, 'unselectAll');

  const modalCloseBtn = document.getElementById('modal-close-btn');
  if (modalCloseBtn) modalCloseBtn.textContent = getMessage(content, 'modalCloseBtn');
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang === 'ja' ? 'ja' : 'en';
  updateCleanSearchButtonText();
  updateCleanSearchLockText();
}

function updateCleanSearchButtonText() {
  const btn = document.getElementById('clean-search-btn');
  const text = document.getElementById('clean-search-btn-text');
  const content = currentMessages || messagesCache[langToLocale[currentLanguage]];
  if (!btn || !text || !content) return;

  btn.classList.toggle('active', cleanSearchModeEnabled);
  btn.setAttribute('aria-checked', cleanSearchModeEnabled ? 'true' : 'false');
  btn.setAttribute('aria-label', getMessage(content, cleanSearchModeEnabled ? 'cleanSearchModeOn' : 'cleanSearchModeOff'));
  text.textContent = getMessage(content, 'cleanSearchModeLabel') || getMessage(content, 'cleanSearchModeTitle');
}

function getCleanSearchLockTooltip(content) {
  return getMessage(content, 'lockedByCleanSearchModeTooltip') || getMessage(content, 'lockedByCleanSearchMode') || 'Locked by Clean Search Mode';
}

function updateCleanSearchLockText() {
  const content = currentMessages || messagesCache[langToLocale[currentLanguage]];
  const lockText = getMessage(content, 'lockedByCleanSearchMode') || 'Locked';
  const lockTooltip = getCleanSearchLockTooltip(content);
  cleanSearchLockedKeys.forEach((key) => {
    const note = document.querySelector(`[data-lock-note="${key}"]`);
    if (note) note.textContent = lockText;
    const input = document.getElementById(key);
    const label = input ? input.closest('label') : null;
    if (label && label.classList.contains('locked-option')) {
      label.title = lockTooltip;
      input.title = lockTooltip;
    } else if (label && input) {
      label.removeAttribute('title');
      input.removeAttribute('title');
    }
  });
}

function setupLanguageSwitching() {
  chrome.storage.local.get("language", result => applyLanguage(supportedLangs.includes(result.language) ? result.language : "en"));
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.language) applyLanguage(supportedLangs.includes(changes.language.newValue) ? changes.language.newValue : "en");
  });
  document.getElementById("settings-btn").addEventListener("click", async () => {
    const result = await chrome.runtime.sendMessage({ action: "openSettings" }).catch(() => null);
    if (result?.ok) window.close();
    else chrome.runtime.openOptionsPage();
  });
}

// Theme detection and switching functionality
function detectSystemTheme() {
  // Check if the system prefers dark mode
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
}

function setupThemeDetection() {
  // Apply initial theme based on system preference
  const systemTheme = detectSystemTheme();
  applyTheme(systemTheme);
  
  // Listen for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (e) => {
    const newTheme = e.matches ? 'dark' : 'light';
    applyTheme(newTheme);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Set up theme detection first
  setupThemeDetection();
  
  // Set up language switching
  setupLanguageSwitching();
  const cleanSearchDefault = true;
  const defaults = {
    homepagerecom: true,
    vidrecom: true,
    comments: true,
    leftnavi: true,
    searchrecom: true,
    membership: true,
    messages: true,
    dongtai: true,
    favourites: true,
    history: true,
    tougao: true,
    ads: true,
    myvideos: true,
    myfavourites: true,
    subanimes: true,
    recentcoins: true,
    recentlikes: true,
    collections: true,
    columns: true,
    usrpageleftsidebar: true,
  };

  // Function to update storage whenever a checkbox changes
  function updateStorage(key, value) {
    const obj = {};
    obj[key] = value;
    // Update local storage
    chrome.storage.local.set(obj);
    // Send message to content script
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, {
          action: "updateCheckbox",
          field: key,
          value: value
        }, () => {
          // Most open tabs do not run this content script; consume Chrome's expected no-receiver error.
          void chrome.runtime.lastError;
        });
      });
    });
  }

  function closeChoicesMenu() {
    const menu = document.getElementById('choices-menu');
    if (!menu) return;
    if (menu.contains(document.activeElement)) {
      document.getElementById('choices-menu-btn').focus({ preventScroll: true });
    }
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
  }

  function setAllOptions(setTo) {
    Object.keys(defaults).forEach(key => {
      const value = cleanSearchModeEnabled && cleanSearchLockedKeys.includes(key) ? true : setTo;
      document.getElementById(key).checked = value;
      updateStorage(key, value);
    });
    applyCleanSearchLock(cleanSearchModeEnabled);
    closeChoicesMenu();
  }

  function applyCleanSearchLock(enabled) {
    cleanSearchModeEnabled = enabled;
    cleanSearchLockedKeys.forEach(key => {
      const input = document.getElementById(key);
      if (!input) return;
      const label = input.closest('label');

      if (enabled) {
        input.checked = true;
      }
      input.disabled = enabled;
      if (label) {
        label.classList.toggle('locked-option', enabled);
        if (enabled) {
          const lockTooltip = getCleanSearchLockTooltip(currentMessages);
          label.title = lockTooltip;
          input.title = lockTooltip;
        } else {
          label.removeAttribute('title');
          input.removeAttribute('title');
        }
      }
    });
    updateCleanSearchLockText();
    adjust_button();
  }

  // Load stored settings or set defaults if missing
  chrome.storage.local.get([...Object.keys(defaults), 'cleansearchmode'], function(result) {
    const toSet = {};
    cleanSearchModeEnabled = result.cleansearchmode !== undefined ? !!result.cleansearchmode : cleanSearchDefault;
    if (result.cleansearchmode === undefined) {
      toSet.cleansearchmode = cleanSearchDefault;
    }

    Object.keys(defaults).forEach(key => {
      let value = result[key] !== undefined ? result[key] : defaults[key];
      if (cleanSearchModeEnabled && cleanSearchLockedKeys.includes(key)) {
        value = true;
      }
      if (result[key] === undefined || (cleanSearchModeEnabled && cleanSearchLockedKeys.includes(key) && result[key] !== true)) {
        toSet[key] = value;
      }
      document.getElementById(key).checked = value;
    });
    chrome.storage.local.set(toSet);
    Object.entries(toSet).forEach(([key, value]) => updateStorage(key, value));

    applyCleanSearchLock(cleanSearchModeEnabled);
  });

  // Add change listeners for each checkbox with storage update
  Object.keys(defaults)
    .forEach(id => {
      document.getElementById(id).addEventListener('change', function() {
        if (cleanSearchModeEnabled && cleanSearchLockedKeys.includes(id)) {
          this.checked = true;
          return;
        }
        updateStorage(id, this.checked);
        adjust_button();
      });
    });

  const choicesMenuBtn = document.getElementById('choices-menu-btn');
  const choicesMenu = document.getElementById('choices-menu');
  const selectAllBtn = document.getElementById('select-all-btn');
  const unselectAllBtn = document.getElementById('unselect-all-btn');

  if (choicesMenuBtn && choicesMenu) {
    choicesMenuBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      const shouldOpen = !choicesMenu.classList.contains('is-open');
      if (shouldOpen) {
        choicesMenu.classList.add('is-open');
        choicesMenu.setAttribute('aria-hidden', 'false');
      } else {
        closeChoicesMenu();
      }
    });
  }
  if (selectAllBtn) selectAllBtn.addEventListener('click', () => setAllOptions(true));
  if (unselectAllBtn) unselectAllBtn.addEventListener('click', () => setAllOptions(false));
  document.addEventListener('click', (event) => {
    if (!choicesMenu || !choicesMenuBtn) return;
    if (choicesMenu.contains(event.target) || choicesMenuBtn.contains(event.target)) return;
    closeChoicesMenu();
  });

  // Clean Search Mode toggle
  document.getElementById('clean-search-btn').addEventListener('click', function() {
    const nextValue = !cleanSearchModeEnabled;
    updateStorage('cleansearchmode', nextValue);
    if (nextValue) {
      cleanSearchLockedKeys.forEach(key => {
        document.getElementById(key).checked = true;
        updateStorage(key, true);
      });
    }
    applyCleanSearchLock(nextValue);
  });

  // Scroll behaviour control
  const choicesContainer = document.querySelector(".choices_container");
  const popupMaxHeight = 560;
  const expandedListBottomGap = 10;

  function checkOverflow() {
    choicesContainer.style.maxHeight = 'none';

    const fullChoicesHeight = choicesContainer.scrollHeight;
    const outsideChoicesHeight = document.body.scrollHeight - choicesContainer.offsetHeight;
    const maxChoicesHeight = Math.max(120, popupMaxHeight - outsideChoicesHeight);

    choicesContainer.style.maxHeight = `${Math.min(fullChoicesHeight, maxChoicesHeight)}px`;
    choicesContainer.style.overflowY = fullChoicesHeight > maxChoicesHeight ? 'auto' : 'hidden';
  }

  function scrollExpandedContentIntoView(content) {
    const containerRect = choicesContainer.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    const bottomOverflow = contentRect.bottom + expandedListBottomGap - containerRect.bottom;
    const topOverflow = contentRect.top - containerRect.top;

    if (bottomOverflow > 0) {
      choicesContainer.scrollTo({
        top: choicesContainer.scrollTop + bottomOverflow,
        behavior: 'smooth'
      });
    } else if (topOverflow < 0) {
      choicesContainer.scrollTo({
        top: choicesContainer.scrollTop + topOverflow,
        behavior: 'smooth'
      });
    }
  }

  checkOverflow();

  // Group Displays
  const groupTitles = document.querySelectorAll(".group-title");
  const groupContents = document.querySelectorAll(".group-content");

  groupContents.forEach((content) => {
    content.style.display = "none";
  });

  // Add collapsed class to all group titles initially
  groupTitles.forEach((title) => {
    title.classList.add("collapsed");
  });

  groupTitles.forEach((title) => {
    title.addEventListener("click", function () {
      const groupId = title.getAttribute("data-group");
      const content = document.getElementById(groupId);
      const isCurrentlyHidden = content.style.display === "none";
      
      if (isCurrentlyHidden) {
        content.style.display = "block";
        title.classList.remove("collapsed");
        
        // Scroll the expanded content into view with a little space below it.
        setTimeout(() => {
          checkOverflow();
          scrollExpandedContentIntoView(content);
        }, 50);
      } else {
        content.style.display = "none";
        title.classList.add("collapsed");
      }
      
      checkOverflow();
    });
  });
});

// Feedback interaction
const feedbackOverlay = document.getElementById("custom-alert");
const feedbackLink = document.getElementById("feedback-link");
const feedbackCloseBtn = document.getElementById("modal-close-btn");

if (feedbackLink && feedbackOverlay) {
  feedbackLink.addEventListener("click", (e) => {
    e.preventDefault();
    showPopupAlert(getCurrentPopupMessage('modalText', 'For feedback, please email waterlemon0096@gmail.com.'));
  });
}

document.getElementById("support-link").addEventListener("click", async (event) => {
  event.preventDefault();
  const result = await chrome.runtime.sendMessage({ action: "openSettings", section: "support" }).catch(() => null);
  if (!result?.ok) await chrome.tabs.create({ url: chrome.runtime.getURL("settings/index.html#support") });
  window.close();
});

if (feedbackCloseBtn && feedbackOverlay) {
  feedbackCloseBtn.addEventListener("click", () => {
    feedbackOverlay.style.display = "none";
  });

  // Close feedback modal when clicking outside the content
  feedbackOverlay.addEventListener("click", (e) => {
    if (e.target === feedbackOverlay) {
      feedbackOverlay.style.display = "none";
    }
  });
}
