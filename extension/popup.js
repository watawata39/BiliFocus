let false_count = 0;

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
  updateButtonText();
  updateCleanSearchButtonText();
}

function getMessage(messages, key) {
  if (!messages || !messages[key]) return '';
  return messages[key].message || '';
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
  document.getElementById('modal-text').textContent = getMessage(content, 'modalText');

  const settingsMainTitle = document.getElementById('settings-main-title');
  if (settingsMainTitle) settingsMainTitle.textContent = getMessage(content, 'settingsMainTitle');
  document.getElementById('language-title').textContent = getMessage(content, 'settingsTitle');
  const cleanSearchSettingsTitle = document.getElementById('clean-search-settings-title');
  if (cleanSearchSettingsTitle) cleanSearchSettingsTitle.textContent = getMessage(content, 'cleanSearchModeLabel');
  const cleanSearchRightNavLeftText = document.getElementById('cleansearchrightnavleft-text');
  if (cleanSearchRightNavLeftText) cleanSearchRightNavLeftText.textContent = getMessage(content, 'cleanSearchRightNavLeft');
  const cleanSearchRightNavLeftNote = document.getElementById('cleansearchrightnavleft-note');
  if (cleanSearchRightNavLeftNote) cleanSearchRightNavLeftNote.textContent = getMessage(content, 'cleanSearchRightNavLeftNote');
  const slashText = document.getElementById('slashfocus-text');
  if (slashText) slashText.textContent = getMessage(content, 'slashfocus');
  const behaviorTitle = document.getElementById('behavior-title');
  if (behaviorTitle) behaviorTitle.textContent = getMessage(content, 'behaviorTitle');

  const settingsBtn = document.getElementById('settings-btn');
  if (settingsBtn) settingsBtn.title = getMessage(content, 'settingsBtnTitle');
  const bottomBtn = document.getElementById('bottom-btn');
  if (bottomBtn) bottomBtn.title = getMessage(content, 'bottomBtnTitle');
  const cleanSearchBtn = document.getElementById('clean-search-btn');
  if (cleanSearchBtn) cleanSearchBtn.title = getMessage(content, 'cleanSearchModeTitle');

  const modalCloseBtn = document.getElementById('modal-close-btn');
  if (modalCloseBtn) modalCloseBtn.textContent = getMessage(content, 'modalCloseBtn');
  const settingsCloseBtn = document.getElementById('settings-close-btn');
  if (settingsCloseBtn) settingsCloseBtn.textContent = getMessage(content, 'settingsCloseBtn');

  // Update language option labels in settings
  const langLabels = document.querySelectorAll('#language-options label');
  const langKeys = ['languageZh', 'languageEn', 'languageJa'];
  langLabels.forEach((label, i) => {
    const input = label.querySelector('input[name="language"]');
    if (input) {
      const text = getMessage(content, langKeys[i]);
      label.replaceChildren(input, ' ', document.createTextNode(text));
    }
  });

  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang === 'ja' ? 'ja' : 'en';
  updateButtonText();
  updateCleanSearchButtonText();
  updateCleanSearchLockText();
  chrome.storage.local.set({ language: lang });
}

function updateButtonText() {
  const btn = document.getElementById('bottom-btn-text');
  const content = currentMessages || messagesCache[langToLocale[currentLanguage]];
  if (!content) return;
  if (false_count === 0) {
    btn.textContent = getMessage(content, 'unselectAll');
  } else {
    btn.textContent = getMessage(content, 'selectAll');
  }
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
  chrome.storage.local.get(['language', 'slashfocus', 'cleansearchrightnavleft'], async function(result) {
    const savedLanguage = supportedLangs.includes(result.language) ? result.language : 'en';
    await applyLanguage(savedLanguage);

    const slashToggle = document.getElementById('slashfocus-toggle');
    if (slashToggle) {
      const enabled = result.slashfocus !== undefined ? !!result.slashfocus : true;
      slashToggle.checked = enabled;
    }

    const rightNavLeftToggle = document.getElementById('cleansearchrightnavleft-toggle');
    if (rightNavLeftToggle) {
      const enabled = result.cleansearchrightnavleft !== undefined ? !!result.cleansearchrightnavleft : true;
      rightNavLeftToggle.checked = enabled;
      if (result.cleansearchrightnavleft === undefined) {
        chrome.storage.local.set({ cleansearchrightnavleft: true });
      }
    }
  });

  const settingsBtn = document.getElementById('settings-btn');
  const settingsOverlay = document.getElementById('settings-overlay');
  const settingsCloseBtn = document.getElementById('settings-close-btn');
  const languageRadios = document.querySelectorAll('input[name="language"]');
  const slashToggle = document.getElementById('slashfocus-toggle');

  if (!settingsBtn || !settingsOverlay || !settingsCloseBtn || !languageRadios.length || !slashToggle) {
    return;
  }

  function openSettings() {
    const currentRadio = document.querySelector(`input[name="language"][value="${currentLanguage}"]`);
    if (currentRadio) currentRadio.checked = true;
    settingsOverlay.style.display = 'flex';
  }

  settingsBtn.addEventListener('click', openSettings);

  settingsCloseBtn.addEventListener('click', () => {
    settingsOverlay.style.display = 'none';
  });

  languageRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      const value = radio.value;
      if (value && supportedLangs.includes(value)) {
        applyLanguage(value);
      }
    });
  });

  // Toggle "/" shortcut behavior
  slashToggle.addEventListener('change', () => {
    chrome.storage.local.set({ slashfocus: slashToggle.checked });
  });

  // Close settings when clicking outside the modal content
  settingsOverlay.addEventListener('click', (e) => {
    if (e.target === settingsOverlay) {
      settingsOverlay.style.display = 'none';
    }
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

  function recalculateFalseCount() {
    false_count = 0;
    Object.keys(defaults).forEach(key => {
      const input = document.getElementById(key);
      if (input && !input.checked) false_count++;
    });
  }

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
    recalculateFalseCount();
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
        recalculateFalseCount();
        adjust_button();
      });
    });

  // Select All / Unselect All button logic
  document.getElementById('bottom-btn').addEventListener('click', function() {
    const set_to = false_count === 0 ? false : true;
    Object.keys(defaults).forEach(key => {
      const value = cleanSearchModeEnabled && cleanSearchLockedKeys.includes(key) ? true : set_to;
      document.getElementById(key).checked = value;
      updateStorage(key, value);
    });

    applyCleanSearchLock(cleanSearchModeEnabled);
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

  const rightNavLeftToggle = document.getElementById('cleansearchrightnavleft-toggle');
  if (rightNavLeftToggle) {
    rightNavLeftToggle.addEventListener('change', function() {
      updateStorage('cleansearchrightnavleft', this.checked);
    });
  }

  // Scroll behaviour control
  const choicesContainer = document.querySelector(".choices_container");
  const popupMaxHeight = 560;

  function checkOverflow() {
    choicesContainer.style.maxHeight = 'none';

    const fullChoicesHeight = choicesContainer.scrollHeight;
    const outsideChoicesHeight = document.body.scrollHeight - choicesContainer.offsetHeight;
    const maxChoicesHeight = Math.max(120, popupMaxHeight - outsideChoicesHeight);

    choicesContainer.style.maxHeight = `${Math.min(fullChoicesHeight, maxChoicesHeight)}px`;
    choicesContainer.style.overflowY = fullChoicesHeight > maxChoicesHeight ? 'auto' : 'hidden';
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
        
        // Scroll the expanded content into view
        setTimeout(() => {
          content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          checkOverflow();
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
    feedbackOverlay.style.display = "flex";
  });
}

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
