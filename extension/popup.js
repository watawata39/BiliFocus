false_count = 0;

function adjust_button() {
  // Adjust button's text using the current language
  updateButtonText();
}

// Language content mappings
const languageContent = {
  zh: {
    languageBtn: '中',
    mainTitle: '选择要隐藏的东西',
    homepagerecom: '首页推荐',
    vidrecom: '视频推荐',
    comments: '评论区',
    groupGeneral: '一般',
    searchrecom: '搜索推荐',
    leftnavi: '左上导航栏',
    ads: '广告',
    rightNaviGeneral: '右上导航栏',
    membership: '大会员图标',
    messages: '消息图标',
    dongtai: '动态图标',
    favourites: '收藏图标',
    history: '历史图标',
    tougao: '投稿图标',
    personalPage: '个人主页',
    myvideos: '我的视频',
    myfavourites: '收藏夹',
    subanimes: '订阅番剧',
    recentcoins: '最近投币的视频',
    collections: '合集和系列',
    columns: '专栏',
    recentlikes: '最近点赞的视频',
    usrpageleftsidebar: '左侧边栏',
    settingsMainTitle: '设置',
    settingsTitle: '语言',
    behaviorTitle: '其他',
    slashfocus: '使用「/」键聚焦搜索栏',
    selectAll: '全部选择',
    unselectAll: '全部取消',
    feedback: '意见反馈',
    modalText: '意见反馈请发邮件至 waterlemon0096@gmail.com。'
  },
  en: {
    languageBtn: 'EN',
    mainTitle: 'Choose What to Hide',
    homepagerecom: 'Home Page Recommendations',
    vidrecom: 'Video Recommendations',
    comments: 'Video/Post Comments',
    groupGeneral: 'General',
    searchrecom: 'Search Recommendations',
    leftnavi: 'Top-Left Navi',
    ads: 'All Ads',
    rightNaviGeneral: 'Top-Right Navi',
    membership: 'Membership Icon',
    messages: 'Messages Icon',
    dongtai: 'Subscription Posts Icon',
    favourites: 'Favourites Icon',
    history: 'History Icon',
    tougao: 'Creativity Center & Post Icon',
    personalPage: 'Personal Homepage',
    myvideos: 'My Videos',
    myfavourites: 'Favourites',
    subanimes: 'Subscribed Animes',
    recentcoins: 'Recent Coins',
    collections: 'Collections',
    columns: 'Columns',
    recentlikes: 'Recent Likes',
    usrpageleftsidebar: 'Left Sidebar',
    settingsMainTitle: 'Settings',
    settingsTitle: 'Language',
    behaviorTitle: 'Other',
    slashfocus: 'Use "/" key to focus search bar',
    selectAll: 'Select All',
    unselectAll: 'Unselect All',
    feedback: 'Feedback',
    modalText: 'For feedback, please email waterlemon0096@gmail.com.'
  },
  ja: {
    languageBtn: '日',
    mainTitle: '非表示にするものを選択',
    homepagerecom: 'ホームページおすすめ',
    vidrecom: '動画おすすめ',
    comments: 'コメント欄',
    groupGeneral: '一般',
    searchrecom: '検索おすすめ',
    leftnavi: '左上ナビゲーション',
    ads: '広告',
    rightNaviGeneral: '右上ナビゲーション',
    membership: 'メンバーシップアイコン',
    messages: 'メッセージアイコン',
    dongtai: '投稿アイコン',
    favourites: 'お気に入りアイコン',
    history: '履歴アイコン',
    tougao: '投稿センターアイコン',
    personalPage: '個人ホームページ',
    myvideos: '私の動画',
    myfavourites: 'お気に入り',
    subanimes: '購読アニメ',
    recentcoins: '最近投幣した動画',
    collections: 'コレクションとシリーズ',
    columns: 'コラム',
    recentlikes: '最近いいねした動画',
    usrpageleftsidebar: '左サイドバー',
    settingsMainTitle: '設定',
    settingsTitle: '言語',
    behaviorTitle: 'その他',
    slashfocus: '「/」キーで検索バーにフォーカス',
    selectAll: 'すべて選択',
    unselectAll: 'すべて解除',
    feedback: 'フィードバック',
    modalText: 'フィードバックは waterlemon0096@gmail.com までメールをお送りください。'
  }
};

// Language switching functionality
let currentLanguage = 'zh'; // Default to Mandarin

function applyLanguage(lang) {
  currentLanguage = lang;
  const content = languageContent[lang];
  
  // Update all text elements
  const languageBtn = document.getElementById('language-btn');
  if (languageBtn) {
    languageBtn.textContent = content.languageBtn;
  }
  document.getElementById('main-title').textContent = content.mainTitle;
  document.getElementById('homepagerecom-text').textContent = content.homepagerecom;
  document.getElementById('vidrecom-text').textContent = content.vidrecom;
  document.getElementById('comments-text').textContent = content.comments;
  document.getElementById('group_general-title').textContent = content.groupGeneral;
  document.getElementById('searchrecom-text').textContent = content.searchrecom;
  document.getElementById('leftnavi-text').textContent = content.leftnavi;
  document.getElementById('ads-text').textContent = content.ads;
  document.getElementById('right_navi_general-title').textContent = content.rightNaviGeneral;
  document.getElementById('membership-text').textContent = content.membership;
  document.getElementById('messages-text').textContent = content.messages;
  document.getElementById('dongtai-text').textContent = content.dongtai;
  document.getElementById('favourites-text').textContent = content.favourites;
  document.getElementById('history-text').textContent = content.history;
  document.getElementById('tougao-text').textContent = content.tougao;
  document.getElementById('personal_page-title').textContent = content.personalPage;
  document.getElementById('myvideos-text').textContent = content.myvideos;
  document.getElementById('myfavourites-text').textContent = content.myfavourites;
  document.getElementById('subanimes-text').textContent = content.subanimes;
  document.getElementById('recentcoins-text').textContent = content.recentcoins;
  document.getElementById('collections-text').textContent = content.collections;
  document.getElementById('columns-text').textContent = content.columns;
  document.getElementById('recentlikes-text').textContent = content.recentlikes;
  document.getElementById('usrpageleftsidebar-text').textContent = content.usrpageleftsidebar;
  document.getElementById('feedback-text').textContent = content.feedback;
  document.getElementById('modal-text').textContent = content.modalText;
  const settingsMainTitle = document.getElementById('settings-main-title');
  if (settingsMainTitle) {
    settingsMainTitle.textContent = content.settingsMainTitle;
  }
  document.getElementById('language-title').textContent = content.settingsTitle;
  const slashText = document.getElementById('slashfocus-text');
  if (slashText) {
    slashText.textContent = content.slashfocus;
  }
  const behaviorTitle = document.getElementById('behavior-title');
  if (behaviorTitle && content.behaviorTitle) {
    behaviorTitle.textContent = content.behaviorTitle;
  }
  
  // Update button text
  updateButtonText();
  
  // Save language preference
  chrome.storage.local.set({ language: lang });
}

function updateButtonText() {
  const btn = document.getElementById('bottom-btn-text');
  const content = languageContent[currentLanguage];
  if (false_count == 0) {
    btn.textContent = content.unselectAll;
  } else {
    btn.textContent = content.selectAll;
  }
}

function setupLanguageSwitching() {
  // Load saved language preference or default to Mandarin
  chrome.storage.local.get(['language', 'slashfocus'], function(result) {
    const savedLanguage = result.language || 'zh';
    applyLanguage(savedLanguage);

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
    // Pre-select current language
    const currentRadio = document.querySelector(`input[name="language"][value="${currentLanguage}"]`);
    if (currentRadio) {
      currentRadio.checked = true;
    }
    settingsOverlay.style.display = 'flex';
  }

  settingsBtn.addEventListener('click', openSettings);

  settingsCloseBtn.addEventListener('click', () => {
    settingsOverlay.style.display = 'none';
  });

  // Change language immediately when selecting an option
  languageRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      const value = radio.value;
      if (value && languageContent[value]) {
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