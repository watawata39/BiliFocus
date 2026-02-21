false_count = 0;

// Map stored language preference to _locales folder name
const langToLocale = { zh: 'zh_CN', en: 'en', ja: 'ja' };
const supportedLangs = ['zh', 'en', 'ja'];

// Cached messages per locale (from _locales/<locale>/messages.json)
let messagesCache = {};
let currentMessages = null;
let currentLanguage = 'zh';

function adjust_button() {
  updateButtonText();
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
  const slashText = document.getElementById('slashfocus-text');
  if (slashText) slashText.textContent = getMessage(content, 'slashfocus');
  const behaviorTitle = document.getElementById('behavior-title');
  if (behaviorTitle) behaviorTitle.textContent = getMessage(content, 'behaviorTitle');

  const settingsBtn = document.getElementById('settings-btn');
  if (settingsBtn) settingsBtn.title = getMessage(content, 'settingsBtnTitle');
  const bottomBtn = document.getElementById('bottom-btn');
  if (bottomBtn) bottomBtn.title = getMessage(content, 'bottomBtnTitle');

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

function setupLanguageSwitching() {
  chrome.storage.local.get(['language', 'slashfocus'], async function(result) {
    const savedLanguage = supportedLangs.includes(result.language) ? result.language : 'zh';
    await applyLanguage(savedLanguage);

    const slashToggle = document.getElementById('slashfocus-toggle');
    if (slashToggle) {
      const enabled = result.slashfocus !== undefined ? !!result.slashfocus : true;
      slashToggle.checked = enabled;
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

  // Load stored settings or set defaults if missing
  chrome.storage.local.get(Object.keys(defaults), function(result) {
    const toSet = {};
    Object.keys(defaults).forEach(key => {
      if (result[key] === undefined) {
        toSet[key] = defaults[key];
        if (!defaults[key]) false_count++;
      } else if (!result[key]) false_count++;
      document.getElementById(key).checked = result[key] !== undefined ? result[key] : defaults[key];
    });
    chrome.storage.local.set(toSet, () => console.log('Initial storage set:', toSet));

    adjust_button();
  });

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
        }, (response) => {
          if (chrome.runtime.lastError) {
            console.log(`Tab ${tab.id} does not have the content script:`, chrome.runtime.lastError.message);
          }
        });
      });
    });
  }

  // Add change listeners for each checkbox with storage update
  Object.keys(defaults)
    .forEach(id => {
      document.getElementById(id).addEventListener('change', function() {
        updateStorage(id, this.checked);
        false_count += this.checked ? -1 : 1;
        adjust_button();
      });
    });

  // Select All / Unselect All button logic
  document.getElementById('bottom-btn').addEventListener('click', function() {
    const set_to = false_count === 0 ? false : true;
    false_count = set_to ? 0 : Object.keys(defaults).length;
    Object.keys(defaults).forEach(key => {
      document.getElementById(key).checked = set_to;
      updateStorage(key, set_to);
    });

    adjust_button();
  });

  // Scroll behaviour control
  const choicesContainer = document.querySelector(".choices_container");
  const reference = document.querySelector("#bottom-btn");

  function checkOverflow() {
    if (choicesContainer.scrollHeight > choicesContainer.clientHeight) {
      // Add margin when content is scrollable
      choicesContainer.style.marginBottom = '15px';
    } else {
      // Remove margin when no overflow
      choicesContainer.style.marginBottom = '5px';
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
        
        // Scroll the expanded content into view
        setTimeout(() => {
          content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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