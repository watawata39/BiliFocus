// Clean Search Mode
// Loaded before main.js by manifest.json.


const CLEAN_SEARCH_LOCKED_SETTINGS = ["homepagerecom", "searchrecom", "ads"];
const CLEAN_SEARCH_RIGHT_NAV_SELECTORS = {
  membership: ".bili-focus-clean-search-mode .right-entry > .vip-wrap,.bili-focus-clean-search-mode .right-entry > :nth-child(2)",
  messages: ".bili-focus-clean-search-mode .right-entry > :nth-child(3)",
  dongtai: ".bili-focus-clean-search-mode .right-entry > :nth-child(4)",
  favourites: ".bili-focus-clean-search-mode .right-entry > :nth-child(5)",
  history: ".bili-focus-clean-search-mode .right-entry > :nth-child(6)",
  tougao: ".bili-focus-clean-search-mode .right-entry > :nth-child(7),.bili-focus-clean-search-mode .right-entry > :nth-child(8),.bili-focus-clean-search-mode .right-entry .header-upload-entry",
};
const CLEAN_SEARCH_RIGHT_NAV_LAYOUT_ITEMS = [
  {
    key: "membership",
    setting: "membership",
    childIndex: 2,
    dropdownSelector: ".right-entry > :nth-child(2) > .v-popover-wrap > .v-popover:not(.v-popover-wrap)",
  },
  {
    key: "messages",
    setting: "messages",
    childIndex: 3,
    dropdownSelector: ".right-entry > :nth-child(3) > .v-popover:not(.v-popover-wrap)",
  },
  {
    key: "dongtai",
    setting: "dongtai",
    childIndex: 4,
    dropdownSelector: ".right-entry > :nth-child(4) > .v-popover:not(.v-popover-wrap)",
  },
  {
    key: "favourites",
    setting: "favourites",
    childIndex: 5,
    dropdownSelector: ".right-entry > :nth-child(5) > .v-popover:not(.v-popover-wrap)",
  },
  {
    key: "history",
    setting: "history",
    childIndex: 6,
    dropdownSelector: ".right-entry > :nth-child(6) > .v-popover:not(.v-popover-wrap)",
  },
  {
    key: "creator",
    setting: "tougao",
    childIndex: 7,
  },
  {
    key: "upload",
    setting: "tougao",
    childIndex: 8,
    dropdownSelector: ".right-entry > :nth-child(8) > .v-popover-wrap > .v-popover:not(.v-popover-wrap)",
  },
];
const CLEAN_SEARCH_RIGHT_POPOVER_CACHE_ITEMS = CLEAN_SEARCH_RIGHT_NAV_LAYOUT_ITEMS.filter((item) => item.dropdownSelector);
const CLEAN_SEARCH_BADGE_MESSAGES = {
  zh: "清爽搜索",
  en: "Clean Search",
  ja: "クリーン検索",
};
const CLEAN_SEARCH_UI_MESSAGES = {
  zh: {
    customizeBackground: "自定义背景",
    wallpapers: "壁纸",
    closeWallpapers: "关闭壁纸面板",
    aboutWallpapers: "关于壁纸",
    backToWallpapers: "返回壁纸",
    wallpaperInfoLoading: "正在加载壁纸信息...",
    wallpaperSource: "来源",
    wallpaperCreator: "作者",
    solidColor: "纯色背景",
    customColor: "自定义颜色",
    uploadWallpaper: "上传背景",
    chooseColor: "选择颜色",
    colorValue: "颜色",
    confirm: "确认",
    cancel: "取消",
    useUploadedWallpaper: "使用已上传背景",
    uploadNewWallpaper: "上传新背景",
    uploadFailed: "无法使用这张图片，请尝试其他图片。",
  },
  en: {
    customizeBackground: "Customize background",
    wallpapers: "Wallpapers",
    closeWallpapers: "Close wallpapers panel",
    aboutWallpapers: "About the wallpapers",
    backToWallpapers: "Back to wallpapers",
    wallpaperInfoLoading: "Loading wallpaper information...",
    wallpaperSource: "Source",
    wallpaperCreator: "Creator",
    solidColor: "Solid color",
    customColor: "Custom color",
    uploadWallpaper: "Upload background",
    chooseColor: "Choose color",
    colorValue: "Color",
    confirm: "Confirm",
    cancel: "Cancel",
    useUploadedWallpaper: "Use uploaded wallpaper",
    uploadNewWallpaper: "Upload new wallpaper",
    uploadFailed: "This image could not be used. Please try another image.",
  },
  ja: {
    customizeBackground: "背景をカスタマイズ",
    wallpapers: "壁紙",
    closeWallpapers: "壁紙パネルを閉じる",
    aboutWallpapers: "壁紙について",
    backToWallpapers: "壁紙に戻る",
    wallpaperInfoLoading: "壁紙情報を読み込んでいます...",
    wallpaperSource: "出典",
    wallpaperCreator: "作者",
    solidColor: "単色背景",
    customColor: "カスタムカラー",
    uploadWallpaper: "背景をアップロード",
    chooseColor: "色を選択",
    colorValue: "色",
    confirm: "確定",
    cancel: "キャンセル",
    useUploadedWallpaper: "アップロード済みの背景を使用",
    uploadNewWallpaper: "新しい背景をアップロード",
    uploadFailed: "この画像は使用できません。別の画像をお試しください。",
  },
};
const CLEAN_SEARCH_WALLPAPERS = ["gradient3", "gradient2", "gradient1", "earth1", "earth2", "earth3", "milkyway", "startrail", "sea"];
const CLEAN_SEARCH_DEFAULT_BACKGROUND = { type: "wallpaper", id: "gradient3" };
const CLEAN_SEARCH_DEFAULT_COLOR = "#f8fafc";
const CLEAN_SEARCH_COLOR_SWATCHES = ["#f8fafc", "#f9fafb", "#fafaf9", "#eff6ff", "#f0f9ff", "#ecfeff", "#f0fdfa", "#f0fdf4", "#fefce8", "#fff7ed", "#fdf2f8", "#f5f3ff"];
const CLEAN_SEARCH_FOREGROUND_REGIONS = ["logo", "left_nav", "right_nav", "brand"];
const CLEAN_SEARCH_LIGHT_FOREGROUND_LUMINANCE_THRESHOLD = 0.6;
const CLEAN_SEARCH_DEFAULT_FOREGROUND = {
  logo: "dark",
  left_nav: "dark",
  right_nav: "dark",
  brand: "dark",
};
const CLEAN_SEARCH_BUILT_IN_FOREGROUNDS = {
  earth1: {
    logo: "light",
    left_nav: "light",
    right_nav: "light",
    brand: "light",
  },
  earth2: {
    logo: "light",
    left_nav: "light",
    right_nav: "light",
    brand: "light",
  },
  earth3: {
    logo: "light",
    left_nav: "light",
    right_nav: "light",
    brand: "light",
  },
  gradient1: {
    logo: "light",
    left_nav: "light",
    right_nav: "light",
    brand: "light",
  },
  gradient2: {
    logo: "dark",
    left_nav: "dark",
    right_nav: "dark",
    brand: "dark",
  },
  gradient3: {
    logo: "light",
    left_nav: "dark",
    right_nav: "dark",
    brand: "light",
  },
  milkyway: {
    logo: "light",
    left_nav: "light",
    right_nav: "light",
    brand: "light",
  },
  sea: {
    logo: "light",
    left_nav: "light",
    right_nav: "light",
    brand: "light",
  },
  startrail: {
    logo: "light",
    left_nav: "light",
    right_nav: "light",
    brand: "light",
  },
};
const CLEAN_SEARCH_BACKGROUND_STORAGE_KEYS = ["cleansearchbackground", "cleansearchuploadedwallpaper", "cleansearchcustomcolor", "cleansearchuploadedforegroundcache"];
const CLEAN_SEARCH_RIGHT_POPOVER_CACHE_STORAGE_KEY = "cleansearchrightpopovercache";
const CLEAN_SEARCH_RIGHT_POPOVER_CACHE_STYLE_ID = "bili-focus-style-cleansearch-popover-cache";
const CLEAN_SEARCH_RIGHT_POPOVER_CACHE_MAX_ENTRIES = 96;
const CLEAN_SEARCH_RIGHT_POPOVER_SELECTOR = ".v-popover:not(.v-popover-wrap)";
let cleanSearchLanguage = "zh";
let cleanSearchBackgroundState = { ...CLEAN_SEARCH_DEFAULT_BACKGROUND };
let cleanSearchUploadedWallpaper = "";
let cleanSearchCustomColor = CLEAN_SEARCH_DEFAULT_COLOR;
let cleanSearchForegroundState = { ...CLEAN_SEARCH_DEFAULT_FOREGROUND };
let cleanSearchUploadedForegroundCache = {};
let cleanSearchForegroundRaf = 0;
let cleanSearchUploadedThemeImage = null;
let cleanSearchUploadedThemeImageSignature = "";
let cleanSearchUploadedForegroundDetectionKey = "";
let cleanSearchBackgroundPanelOpen = false;
let cleanSearchWallpaperInfoOpen = false;
let cleanSearchWallpaperMetadata = null;
let cleanSearchWallpaperMetadataLoading = false;
let cleanSearchWallpaperMetadataPromise = null;
let cleanSearchColorPickerOpen = false;
let cleanSearchUploadChoiceOpen = false;
let cleanSearchRightPopoverObserver = null;
let cleanSearchRightPopoverRaf = 0;
let cleanSearchRightPopoverListenersActive = false;
let cleanSearchRightPopoverTimeouts = [];
let cleanSearchRightPopoverHoveredItem = null;
let cleanSearchRightPopoverCache = {};
let cleanSearchRightPopoverCacheWriteTimeout = null;
let cleanSearchRightPopoverLastLeftSignatures = {};

function isCleanSearchMainPage() {
  return window.location.hostname === "www.bilibili.com" &&
    (window.location.pathname === "/" || window.location.pathname === "");
}

function isCleanSearchActive() {
  return !!settings.cleansearchmode && isCleanSearchMainPage();
}

function isCleanSearchRightNavLeftAligned() {
  return settings.cleansearchrightnavleft !== false;
}

function shouldHideSetting(key) {
  if (settings[key]) return true;
  if (!isCleanSearchActive()) return false;
  return CLEAN_SEARCH_LOCKED_SETTINGS.includes(key);
}

function getCleanSearchMessage(key) {
  const messages = CLEAN_SEARCH_UI_MESSAGES[cleanSearchLanguage] || CLEAN_SEARCH_UI_MESSAGES.zh;
  return messages[key] || CLEAN_SEARCH_UI_MESSAGES.en[key] || key;
}

function normalizeCleanSearchForegroundValue(value) {
  return value === "light" ? "light" : "dark";
}

function normalizeCleanSearchForegroundTheme(value) {
  const theme = {};
  CLEAN_SEARCH_FOREGROUND_REGIONS.forEach((region) => {
    let foregroundValue = value && value[region];
    if (region === "left_nav" && foregroundValue === undefined && value && value.right_nav !== undefined) {
      foregroundValue = value.right_nav;
    }
    if (region === "right_nav" && foregroundValue === undefined && value && value.left_nav !== undefined) {
      foregroundValue = value.left_nav;
    }
    theme[region] = normalizeCleanSearchForegroundValue(foregroundValue);
  });
  return theme;
}

function getCleanSearchDataAttributeName(region) {
  return `data-bili-focus-${region.replace(/_/g, "-")}-fg`;
}

function applyCleanSearchForegroundAttributes(theme) {
  const root = document.documentElement;
  cleanSearchForegroundState = normalizeCleanSearchForegroundTheme(theme);
  root.removeAttribute("data-bili-focus-foreground-pending");
  CLEAN_SEARCH_FOREGROUND_REGIONS.forEach((region) => {
    root.setAttribute(getCleanSearchDataAttributeName(region), cleanSearchForegroundState[region]);
  });
}

function setCleanSearchForegroundPending(isPending) {
  document.documentElement.toggleAttribute("data-bili-focus-foreground-pending", !!isPending);
}

function clearCleanSearchForegroundAttributes() {
  const root = document.documentElement;
  root.removeAttribute("data-bili-focus-foreground-pending");
  CLEAN_SEARCH_FOREGROUND_REGIONS.forEach((region) => {
    root.removeAttribute(getCleanSearchDataAttributeName(region));
  });
}

function getHexLuminance(hex) {
  const normalized = typeof hex === "string" && /^#[0-9a-fA-F]{6}$/.test(hex) ? hex : CLEAN_SEARCH_DEFAULT_COLOR;
  const red = parseInt(normalized.slice(1, 3), 16) / 255;
  const green = parseInt(normalized.slice(3, 5), 16) / 255;
  const blue = parseInt(normalized.slice(5, 7), 16) / 255;
  return (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
}

function getForegroundForLuminance(luminance) {
  return luminance < CLEAN_SEARCH_LIGHT_FOREGROUND_LUMINANCE_THRESHOLD ? "light" : "dark";
}

function getUniformForegroundTheme(value) {
  const foreground = normalizeCleanSearchForegroundValue(value);
  const theme = {};
  CLEAN_SEARCH_FOREGROUND_REGIONS.forEach((region) => {
    theme[region] = foreground;
  });
  return theme;
}

function getCleanSearchUploadedImageSignature() {
  if (!cleanSearchUploadedWallpaper) return "";
  const source = `${cleanSearchUploadedWallpaper.length}:${cleanSearchUploadedWallpaper.slice(0, 96)}:${cleanSearchUploadedWallpaper.slice(-96)}`;
  let hash = 5381;
  for (let i = 0; i < source.length; i++) {
    hash = ((hash << 5) + hash) ^ source.charCodeAt(i);
  }
  return String(hash >>> 0);
}

function getCleanSearchForegroundLayoutKey() {
  const panelState = cleanSearchBackgroundPanelOpen ? "open" : "closed";
  const navLayout = isCleanSearchRightNavLeftAligned() ? "right-nav-left" : "right-nav-right";
  const widthBucket = Math.round(window.innerWidth / 160) * 160;
  const heightBucket = Math.round(window.innerHeight / 120) * 120;
  return `${panelState}:${navLayout}:${widthBucket}x${heightBucket}`;
}

function getStoredUploadedForegroundTheme() {
  const signature = getCleanSearchUploadedImageSignature();
  const layoutKey = getCleanSearchForegroundLayoutKey();
  if (!signature || !cleanSearchUploadedForegroundCache) return null;
  if (cleanSearchUploadedForegroundCache.imageSignature !== signature) return null;
  const theme = cleanSearchUploadedForegroundCache.entries && cleanSearchUploadedForegroundCache.entries[layoutKey];
  return theme ? normalizeCleanSearchForegroundTheme(theme) : null;
}

function storeUploadedForegroundTheme(theme) {
  const signature = getCleanSearchUploadedImageSignature();
  const layoutKey = getCleanSearchForegroundLayoutKey();
  if (!signature) return;

  cleanSearchUploadedForegroundCache = {
    imageSignature: signature,
    entries: {
      ...(cleanSearchUploadedForegroundCache && cleanSearchUploadedForegroundCache.imageSignature === signature ? cleanSearchUploadedForegroundCache.entries : {}),
      [layoutKey]: normalizeCleanSearchForegroundTheme(theme),
    },
  };
  chrome.storage.local.set({ cleansearchuploadedforegroundcache: cleanSearchUploadedForegroundCache });
}

function normalizeCleanSearchBackground(value) {
  if (!value || typeof value !== "object") return { ...CLEAN_SEARCH_DEFAULT_BACKGROUND };
  if (value.type === "wallpaper" && typeof value.id === "string") {
    const id = value.id.replace(/\.jpg$/i, "");
    if (CLEAN_SEARCH_WALLPAPERS.includes(id)) {
      return { type: "wallpaper", id };
    }
  }
  if (value.type === "color" && typeof value.color === "string" && /^#[0-9a-fA-F]{6}$/.test(value.color)) {
    return { type: "color", color: value.color };
  }
  if (value.type === "upload") {
    return { type: "upload" };
  }
  return { ...CLEAN_SEARCH_DEFAULT_BACKGROUND };
}

function loadCleanSearchBackgroundSettings(result) {
  const nextUploadedWallpaper = typeof result.cleansearchuploadedwallpaper === "string" ? result.cleansearchuploadedwallpaper : "";
  if (nextUploadedWallpaper !== cleanSearchUploadedWallpaper) {
    cleanSearchUploadedThemeImage = null;
    cleanSearchUploadedThemeImageSignature = "";
    cleanSearchUploadedForegroundDetectionKey = "";
  }
  cleanSearchUploadedWallpaper = nextUploadedWallpaper;
  cleanSearchUploadedForegroundCache = result.cleansearchuploadedforegroundcache && typeof result.cleansearchuploadedforegroundcache === "object" ? result.cleansearchuploadedforegroundcache : {};
  if (typeof result.cleansearchcustomcolor === "string" && /^#[0-9a-fA-F]{6}$/.test(result.cleansearchcustomcolor)) {
    cleanSearchCustomColor = result.cleansearchcustomcolor;
  }

  cleanSearchBackgroundState = normalizeCleanSearchBackground(result.cleansearchbackground);
  if (cleanSearchBackgroundState.type === "upload" && !cleanSearchUploadedWallpaper) {
    cleanSearchBackgroundState = { ...CLEAN_SEARCH_DEFAULT_BACKGROUND };
  }
  if (cleanSearchBackgroundState.type === "color") {
    cleanSearchCustomColor = cleanSearchBackgroundState.color;
  }
}

function updateCleanSearchBackgroundSettingsFromChanges(changes) {
  const snapshot = {
    cleansearchbackground: cleanSearchBackgroundState,
    cleansearchuploadedwallpaper: cleanSearchUploadedWallpaper,
    cleansearchcustomcolor: cleanSearchCustomColor,
    cleansearchuploadedforegroundcache: cleanSearchUploadedForegroundCache,
  };
  CLEAN_SEARCH_BACKGROUND_STORAGE_KEYS.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(changes, key)) {
      snapshot[key] = changes[key].newValue;
    }
  });
  loadCleanSearchBackgroundSettings(snapshot);
  applyCleanSearchBackgroundVars();
  updateCleanSearchForegroundTheme();
  if (cleanSearchBackgroundPanelOpen) {
    renderCleanSearchBackgroundPanel();
  }
}

function getCleanSearchWallpaperUrl(id) {
  return chrome.runtime.getURL(`wallpapers/${id}.jpg`);
}

function normalizeCleanSearchWallpaperMetadata(metadata) {
  const normalized = {};
  if (!metadata || typeof metadata !== "object") return normalized;

  Object.entries(metadata).forEach(([key, entry]) => {
    if (!entry || typeof entry !== "object") return;
    const candidates = [key, entry.id, entry.file, entry.filename]
      .filter((value) => typeof value === "string" && value)
      .map((value) => value.replace(/\.jpg$/i, ""));
    candidates.forEach((id) => {
      if (CLEAN_SEARCH_WALLPAPERS.includes(id)) {
        normalized[id] = entry;
      }
    });
  });

  return normalized;
}

function loadCleanSearchWallpaperMetadata() {
  if (cleanSearchWallpaperMetadata) return Promise.resolve(cleanSearchWallpaperMetadata);
  if (cleanSearchWallpaperMetadataPromise) return cleanSearchWallpaperMetadataPromise;
  cleanSearchWallpaperMetadataLoading = true;

  cleanSearchWallpaperMetadataPromise = fetch(chrome.runtime.getURL("wallpapers/metadata.json"), { cache: "no-store" })
    .then((response) => response.ok ? response.json() : {})
    .then((metadata) => {
      cleanSearchWallpaperMetadata = normalizeCleanSearchWallpaperMetadata(metadata);
      return cleanSearchWallpaperMetadata;
    })
    .catch(() => {
      cleanSearchWallpaperMetadata = {};
      return cleanSearchWallpaperMetadata;
    })
    .finally(() => {
      cleanSearchWallpaperMetadataLoading = false;
      cleanSearchWallpaperMetadataPromise = null;
      updateCleanSearchForegroundTheme();
      if (cleanSearchBackgroundPanelOpen && cleanSearchWallpaperInfoOpen) {
        renderCleanSearchBackgroundPanel();
      }
    });
  return cleanSearchWallpaperMetadataPromise;
}

function getCleanSearchWallpaperMetadataEntry(id) {
  if (!cleanSearchWallpaperMetadata || !id) return null;
  const normalizedId = id.replace(/\.jpg$/i, "");
  return cleanSearchWallpaperMetadata[normalizedId] || null;
}

function applyCleanSearchBackgroundVars() {
  const root = document.documentElement;
  if (!isCleanSearchActive()) {
    root.style.removeProperty("--bili-focus-clean-bg-image");
    root.style.removeProperty("--bili-focus-clean-bg-color");
    return;
  }

  if (cleanSearchBackgroundState.type === "color") {
    root.style.setProperty("--bili-focus-clean-bg-image", "none");
    root.style.setProperty("--bili-focus-clean-bg-color", cleanSearchBackgroundState.color || CLEAN_SEARCH_DEFAULT_COLOR);
    return;
  }

  if (cleanSearchBackgroundState.type === "upload" && cleanSearchUploadedWallpaper) {
    root.style.setProperty("--bili-focus-clean-bg-image", `url("${cleanSearchUploadedWallpaper}")`);
    root.style.setProperty("--bili-focus-clean-bg-color", CLEAN_SEARCH_DEFAULT_COLOR);
    return;
  }

  const id = cleanSearchBackgroundState.type === "wallpaper" ? cleanSearchBackgroundState.id : CLEAN_SEARCH_DEFAULT_BACKGROUND.id;
  root.style.setProperty("--bili-focus-clean-bg-image", `url("${getCleanSearchWallpaperUrl(id)}")`);
  root.style.setProperty("--bili-focus-clean-bg-color", CLEAN_SEARCH_DEFAULT_COLOR);
}

function updateCleanSearchForegroundTheme() {
  if (!isCleanSearchActive()) {
    clearCleanSearchForegroundAttributes();
    return;
  }

  if (cleanSearchBackgroundState.type === "color") {
    applyCleanSearchForegroundAttributes(getUniformForegroundTheme(getForegroundForLuminance(getHexLuminance(cleanSearchBackgroundState.color || CLEAN_SEARCH_DEFAULT_COLOR))));
    return;
  }

  if (cleanSearchBackgroundState.type === "wallpaper") {
    const id = cleanSearchBackgroundState.id || CLEAN_SEARCH_DEFAULT_BACKGROUND.id;
    const metadata = getCleanSearchWallpaperMetadataEntry(id);
    if (metadata && metadata.ui_foreground) {
      applyCleanSearchForegroundAttributes(metadata.ui_foreground);
      return;
    }

    const builtInTheme = CLEAN_SEARCH_BUILT_IN_FOREGROUNDS[id] || CLEAN_SEARCH_BUILT_IN_FOREGROUNDS[CLEAN_SEARCH_DEFAULT_BACKGROUND.id] || CLEAN_SEARCH_DEFAULT_FOREGROUND;
    applyCleanSearchForegroundAttributes(builtInTheme);
    if (!cleanSearchWallpaperMetadata && !cleanSearchWallpaperMetadataLoading) {
      loadCleanSearchWallpaperMetadata();
    }
    return;
  }

  if (cleanSearchBackgroundState.type === "upload" && cleanSearchUploadedWallpaper) {
    const cachedTheme = getStoredUploadedForegroundTheme();
    if (cachedTheme) {
      applyCleanSearchForegroundAttributes(cachedTheme);
      return;
    }

    setCleanSearchForegroundPending(true);
    scheduleCleanSearchUploadedForegroundDetection();
    return;
  }

  applyCleanSearchForegroundAttributes(CLEAN_SEARCH_DEFAULT_FOREGROUND);
}

function scheduleCleanSearchForegroundThemeUpdate() {
  if (cleanSearchForegroundRaf) return;
  cleanSearchForegroundRaf = requestAnimationFrame(() => {
    cleanSearchForegroundRaf = 0;
    updateCleanSearchForegroundTheme();
  });
}

function scheduleCleanSearchUploadedForegroundDetection() {
  if (!isCleanSearchActive() || cleanSearchBackgroundState.type !== "upload" || !cleanSearchUploadedWallpaper) return;

  const detectionKey = `${getCleanSearchUploadedImageSignature()}|${getCleanSearchForegroundLayoutKey()}`;
  if (cleanSearchUploadedForegroundDetectionKey === detectionKey) return;
  cleanSearchUploadedForegroundDetectionKey = detectionKey;

  requestAnimationFrame(() => {
    detectCleanSearchUploadedForegroundTheme(detectionKey);
  });
}

async function detectCleanSearchUploadedForegroundTheme(detectionKey) {
  if (!isCleanSearchActive() || cleanSearchBackgroundState.type !== "upload" || !cleanSearchUploadedWallpaper) {
    if (cleanSearchUploadedForegroundDetectionKey === detectionKey) cleanSearchUploadedForegroundDetectionKey = "";
    return;
  }

  try {
    const image = await getCleanSearchUploadedThemeImage();
    if (!image) return;
    if (!isCleanSearchActive() || cleanSearchBackgroundState.type !== "upload" || !cleanSearchUploadedWallpaper || cleanSearchUploadedForegroundDetectionKey !== detectionKey) return;
    const theme = sampleCleanSearchForegroundThemeFromImage(image);
    applyCleanSearchForegroundAttributes(theme);
    storeUploadedForegroundTheme(theme);
  } catch (error) {
    console.error("BiliFocus foreground detection failed:", error);
    applyCleanSearchForegroundAttributes(CLEAN_SEARCH_DEFAULT_FOREGROUND);
  } finally {
    if (cleanSearchUploadedForegroundDetectionKey === detectionKey) cleanSearchUploadedForegroundDetectionKey = "";
  }
}

async function getCleanSearchUploadedThemeImage() {
  const signature = getCleanSearchUploadedImageSignature();
  if (!signature) return null;
  if (cleanSearchUploadedThemeImage && cleanSearchUploadedThemeImageSignature === signature) {
    return cleanSearchUploadedThemeImage;
  }

  const image = await loadImageFromUrl(cleanSearchUploadedWallpaper);
  cleanSearchUploadedThemeImage = image;
  cleanSearchUploadedThemeImageSignature = signature;
  return image;
}

function sampleCleanSearchForegroundThemeFromImage(image) {
  const theme = {};
  CLEAN_SEARCH_FOREGROUND_REGIONS.forEach((region) => {
    const luminance = sampleCleanSearchRegionLuminance(image, region);
    theme[region] = getForegroundForLuminance(luminance);
  });
  return normalizeCleanSearchForegroundTheme(theme);
}

function getVisibleCleanSearchNavChildRects(selector) {
  const nav = document.querySelector(selector);
  if (!nav) return [];
  return Array.from(nav.children)
    .filter((child) => {
      const style = window.getComputedStyle(child);
      const rect = child.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && rect.width > 2 && rect.height > 2;
    })
    .map((child) => expandCleanSearchRect(child.getBoundingClientRect(), 8));
}

function getCleanSearchRegionRects(region) {
  if (region === "logo") {
    const logo = document.querySelector("#bili-focus-clean-brand img");
    return logo ? [expandCleanSearchRect(logo.getBoundingClientRect(), 10)] : [];
  }
  if (region === "brand") {
    const brand = document.querySelector("#bili-focus-clean-brand .bili-focus-clean-brand-pill");
    return brand ? [expandCleanSearchRect(brand.getBoundingClientRect(), 8)] : [];
  }
  if (region === "left_nav") {
    const selector = isCleanSearchRightNavLeftAligned()
      ? ".bili-focus-clean-search-mode .bili-header__bar > .right-entry"
      : ".bili-focus-clean-search-mode .bili-header__bar > .left-entry";
    return getVisibleCleanSearchNavChildRects(selector);
  }
  if (region === "right_nav") {
    if (isCleanSearchRightNavLeftAligned()) return [];
    return getVisibleCleanSearchNavChildRects(".bili-focus-clean-search-mode .bili-header__bar > .right-entry");
  }
  return [];
}

function expandCleanSearchRect(rect, amount) {
  return {
    left: rect.left - amount,
    top: rect.top - amount,
    right: rect.right + amount,
    bottom: rect.bottom + amount,
    width: rect.width + (amount * 2),
    height: rect.height + (amount * 2),
  };
}

function getCleanSearchStageRect() {
  const panel = document.getElementById("bili-focus-clean-bg-panel");
  const right = cleanSearchBackgroundPanelOpen && panel ? panel.getBoundingClientRect().left : window.innerWidth;
  return {
    left: 0,
    top: 0,
    right,
    bottom: window.innerHeight,
    width: Math.max(1, right),
    height: Math.max(1, window.innerHeight),
  };
}

function sampleCleanSearchRegionLuminance(image, region) {
  const stage = getCleanSearchStageRect();
  const rects = getCleanSearchRegionRects(region);
  if (!rects.length) return 1;

  let weightedLuminance = 0;
  let totalWeight = 0;
  rects.forEach((rect) => {
    const luminance = sampleCleanSearchRectLuminance(image, rect, stage);
    const weight = Math.max(1, rect.width * rect.height);
    weightedLuminance += luminance * weight;
    totalWeight += weight;
  });

  return totalWeight ? weightedLuminance / totalWeight : 1;
}

function sampleCleanSearchRectLuminance(image, rect, stage) {
  const clippedLeft = Math.max(stage.left, Math.min(stage.right, rect.left));
  const clippedTop = Math.max(stage.top, Math.min(stage.bottom, rect.top));
  const clippedRight = Math.max(stage.left, Math.min(stage.right, rect.right));
  const clippedBottom = Math.max(stage.top, Math.min(stage.bottom, rect.bottom));
  const clippedWidth = clippedRight - clippedLeft;
  const clippedHeight = clippedBottom - clippedTop;
  if (clippedWidth <= 0 || clippedHeight <= 0) return 1;

  const scale = Math.max(stage.width / image.naturalWidth, stage.height / image.naturalHeight);
  const renderedWidth = image.naturalWidth * scale;
  const renderedHeight = image.naturalHeight * scale;
  const offsetX = stage.left + ((stage.width - renderedWidth) / 2);
  const offsetY = stage.top + ((stage.height - renderedHeight) / 2);

  const sourceX = (clippedLeft - offsetX) / scale;
  const sourceY = (clippedTop - offsetY) / scale;
  const sourceWidth = clippedWidth / scale;
  const sourceHeight = clippedHeight / scale;
  return sampleImageLuminance(image, sourceX, sourceY, sourceWidth, sourceHeight);
}

function sampleImageLuminance(image, sourceX, sourceY, sourceWidth, sourceHeight) {
  const sx = Math.max(0, Math.min(image.naturalWidth, sourceX));
  const sy = Math.max(0, Math.min(image.naturalHeight, sourceY));
  if (sx >= image.naturalWidth || sy >= image.naturalHeight) return 1;
  const sw = Math.max(1, Math.min(image.naturalWidth - sx, sourceWidth));
  const sh = Math.max(1, Math.min(image.naturalHeight - sy, sourceHeight));
  const sampleWidth = Math.max(1, Math.min(40, Math.round(sw)));
  const sampleHeight = Math.max(1, Math.min(40, Math.round(sh)));
  const canvas = document.createElement("canvas");
  canvas.width = sampleWidth;
  canvas.height = sampleHeight;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return 1;
  context.drawImage(image, sx, sy, sw, sh, 0, 0, sampleWidth, sampleHeight);
  const pixels = context.getImageData(0, 0, sampleWidth, sampleHeight).data;
  let luminance = 0;
  for (let i = 0; i < pixels.length; i += 4) {
    luminance += ((0.2126 * pixels[i]) + (0.7152 * pixels[i + 1]) + (0.0722 * pixels[i + 2])) / 255;
  }
  return luminance / (pixels.length / 4);
}

function updateCleanSearchBackgroundLayer(shouldShow) {
  const existingLayer = document.getElementById("bili-focus-clean-bg-layer");
  if (!shouldShow) {
    if (existingLayer) existingLayer.remove();
    return;
  }
  if (!document.body || existingLayer) return;

  const layer = document.createElement("div");
  layer.id = "bili-focus-clean-bg-layer";
  layer.setAttribute("aria-hidden", "true");
  document.body.prepend(layer);
}

function updateCleanSearchBackgroundSelection() {
  const panel = document.getElementById("bili-focus-clean-bg-panel");
  if (!panel) return;

  panel.querySelectorAll("[data-bili-focus-bg-choice]").forEach((card) => {
    const type = card.dataset.biliFocusBgType;
    const id = card.dataset.biliFocusBgId;
    const selected =
      (type === "wallpaper" && cleanSearchBackgroundState.type === "wallpaper" && cleanSearchBackgroundState.id === id) ||
      (type === "color" && cleanSearchBackgroundState.type === "color") ||
      (type === "upload" && cleanSearchBackgroundState.type === "upload");
    card.classList.toggle("is-selected", selected);
    card.setAttribute("aria-pressed", selected ? "true" : "false");
  });
}

function renderCleanSearchBackgroundPanel() {
  const existingPanel = document.getElementById("bili-focus-clean-bg-panel");
  if (existingPanel) existingPanel.remove();
  if (!document.body || !isCleanSearchActive()) return;
  const shouldAnimate = !existingPanel;

  const panel = document.createElement("aside");
  panel.id = "bili-focus-clean-bg-panel";
  panel.setAttribute("aria-label", getCleanSearchMessage("wallpapers"));

  const header = document.createElement("div");
  header.className = "bili-focus-clean-bg-panel-header";

  const title = document.createElement("div");
  title.className = "bili-focus-clean-bg-panel-title";
  title.textContent = getCleanSearchMessage("wallpapers");

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "bili-focus-clean-bg-panel-close";
  closeButton.title = getCleanSearchMessage("closeWallpapers");
  closeButton.setAttribute("aria-label", getCleanSearchMessage("closeWallpapers"));
  closeButton.addEventListener("click", () => setCleanSearchBackgroundPanelOpen(false));

  const closeIcon = document.createElement("img");
  closeIcon.src = chrome.runtime.getURL("icons/cross.svg");
  closeIcon.alt = "";
  closeButton.appendChild(closeIcon);
  header.append(title, closeButton);

  const body = document.createElement("div");
  body.className = "bili-focus-clean-bg-panel-body";

  if (cleanSearchWallpaperInfoOpen) {
    body.appendChild(createCleanSearchWallpaperInfoList());
  } else {
    const featuredGrid = document.createElement("div");
    featuredGrid.className = "bili-focus-clean-bg-featured-grid";
    featuredGrid.append(createCleanSearchColorCard(), createCleanSearchUploadCard());
    body.appendChild(featuredGrid);

    const colorPanel = createCleanSearchColorPanel();
    if (cleanSearchColorPickerOpen) body.appendChild(colorPanel);

    const uploadPanel = createCleanSearchUploadChoicePanel();
    if (cleanSearchUploadChoiceOpen) body.appendChild(uploadPanel);

    const wallpaperGrid = document.createElement("div");
    wallpaperGrid.className = "bili-focus-clean-bg-wallpaper-grid";
    CLEAN_SEARCH_WALLPAPERS.forEach((id) => {
      wallpaperGrid.appendChild(createCleanSearchWallpaperCard(id));
    });
    body.appendChild(wallpaperGrid);
  }

  const footer = document.createElement("div");
  footer.className = "bili-focus-clean-bg-panel-footer";
  const footerLink = document.createElement("a");
  footerLink.href = "#";
  footerLink.className = "bili-focus-clean-bg-panel-link";
  footerLink.textContent = cleanSearchWallpaperInfoOpen ? getCleanSearchMessage("backToWallpapers") : getCleanSearchMessage("aboutWallpapers");
  footerLink.addEventListener("click", (event) => {
    event.preventDefault();
    cleanSearchColorPickerOpen = false;
    cleanSearchUploadChoiceOpen = false;
    cleanSearchWallpaperInfoOpen = !cleanSearchWallpaperInfoOpen;
    if (cleanSearchWallpaperInfoOpen) loadCleanSearchWallpaperMetadata();
    renderCleanSearchBackgroundPanel();
  });
  footer.appendChild(footerLink);

  panel.append(header, body, footer);
  document.body.appendChild(panel);
  if (shouldAnimate) {
    requestAnimationFrame(() => {
      panel.classList.add("is-open");
    });
  } else {
    panel.classList.add("is-open");
  }
  updateCleanSearchBackgroundSelection();
}

function createCleanSearchBackgroundCard(type, label) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "bili-focus-clean-bg-card";
  card.dataset.biliFocusBgChoice = "true";
  card.dataset.biliFocusBgType = type;
  card.title = label;
  card.setAttribute("aria-label", label);
  card.setAttribute("aria-pressed", "false");
  return card;
}

function createCleanSearchColorCard() {
  const card = createCleanSearchBackgroundCard("color", getCleanSearchMessage("solidColor"));
  card.classList.add("bili-focus-clean-bg-card-color");
  card.style.setProperty("--bili-focus-clean-card-color", cleanSearchCustomColor || CLEAN_SEARCH_DEFAULT_COLOR);
  card.addEventListener("click", () => {
    cleanSearchColorPickerOpen = !cleanSearchColorPickerOpen;
    cleanSearchUploadChoiceOpen = false;
    renderCleanSearchBackgroundPanel();
  });

  const icon = document.createElement("img");
  icon.src = chrome.runtime.getURL("icons/pallet.svg");
  icon.alt = "";
  card.appendChild(icon);
  return card;
}

function createCleanSearchUploadCard() {
  const card = createCleanSearchBackgroundCard("upload", getCleanSearchMessage("uploadWallpaper"));
  card.classList.add("bili-focus-clean-bg-card-upload");
  card.addEventListener("click", () => {
    cleanSearchColorPickerOpen = false;
    if (cleanSearchBackgroundState.type === "upload" || !cleanSearchUploadedWallpaper) {
      openCleanSearchWallpaperFilePicker();
      return;
    }
    cleanSearchUploadChoiceOpen = !cleanSearchUploadChoiceOpen;
    renderCleanSearchBackgroundPanel();
  });

  const icon = document.createElement("img");
  icon.src = chrome.runtime.getURL("icons/upload.svg");
  icon.alt = "";
  card.appendChild(icon);
  return card;
}

function createCleanSearchWallpaperCard(id) {
  const card = createCleanSearchBackgroundCard("wallpaper", id);
  card.removeAttribute("title");
  card.dataset.biliFocusBgId = id;
  card.classList.add("bili-focus-clean-bg-card-wallpaper");
  card.style.backgroundImage = `url("${getCleanSearchWallpaperUrl(id)}")`;
  card.addEventListener("click", () => {
    cleanSearchColorPickerOpen = false;
    cleanSearchUploadChoiceOpen = false;
    setCleanSearchBackgroundState({ type: "wallpaper", id });
  });
  return card;
}

function createCleanSearchWallpaperInfoList() {
  const list = document.createElement("div");
  list.className = "bili-focus-clean-wallpaper-info-list";

  if (!cleanSearchWallpaperMetadata) {
    const loading = document.createElement("div");
    loading.className = "bili-focus-clean-wallpaper-info-loading";
    loading.textContent = getCleanSearchMessage("wallpaperInfoLoading");
    list.appendChild(loading);
    loadCleanSearchWallpaperMetadata();
    return list;
  }

  CLEAN_SEARCH_WALLPAPERS.forEach((id) => {
    const metadata = getCleanSearchWallpaperMetadataEntry(id) || {};
    const item = document.createElement("article");
    item.className = "bili-focus-clean-wallpaper-info-item";

    const preview = document.createElement("div");
    preview.className = "bili-focus-clean-wallpaper-info-preview";
    preview.style.backgroundImage = `url("${getCleanSearchWallpaperUrl(id)}")`;

    const details = document.createElement("div");
    details.className = "bili-focus-clean-wallpaper-info-details";

    const title = document.createElement("div");
    title.className = "bili-focus-clean-wallpaper-info-title";
    title.textContent = metadata.name || metadata.title || id;
    details.appendChild(title);

    if (metadata.creator) {
      details.appendChild(createCleanSearchWallpaperInfoMeta(getCleanSearchMessage("wallpaperCreator"), metadata.creator));
    }
    if (metadata.url) {
      const source = document.createElement("a");
      source.href = metadata.url;
      source.target = "_blank";
      source.rel = "noopener noreferrer";
      source.className = "bili-focus-clean-wallpaper-info-source";
      source.textContent = getCleanSearchMessage("wallpaperSource");
      details.appendChild(source);
    }

    item.append(preview, details);
    list.appendChild(item);
  });

  return list;
}

function createCleanSearchWallpaperInfoMeta(label, value) {
  const meta = document.createElement("div");
  meta.className = "bili-focus-clean-wallpaper-info-meta";
  meta.textContent = `${label}: ${value}`;
  return meta;
}

function createCleanSearchColorPanel() {
  const panel = document.createElement("div");
  panel.className = "bili-focus-clean-color-panel";

  const heading = document.createElement("div");
  heading.className = "bili-focus-clean-color-heading";
  heading.textContent = getCleanSearchMessage("chooseColor");

  const customPicker = document.createElement("label");
  customPicker.className = "bili-focus-clean-custom-picker";
  const colorInput = document.createElement("input");
  colorInput.type = "color";
  colorInput.value = cleanSearchCustomColor || CLEAN_SEARCH_DEFAULT_COLOR;

  const customPreview = document.createElement("span");
  customPreview.className = "bili-focus-clean-custom-preview";

  const customText = document.createElement("span");
  customText.className = "bili-focus-clean-custom-text";
  const customLabel = document.createElement("span");
  customLabel.className = "bili-focus-clean-custom-label";
  customLabel.textContent = getCleanSearchMessage("customColor");
  const customValue = document.createElement("span");
  customValue.className = "bili-focus-clean-custom-value";
  customText.append(customLabel, customValue);

  customPicker.append(colorInput, customPreview, customText);

  const swatches = document.createElement("div");
  swatches.className = "bili-focus-clean-color-swatches";
  function updateColorPanelPreview() {
    const currentColor = colorInput.value.toLowerCase();
    customPreview.style.background = colorInput.value;
    customValue.textContent = colorInput.value.toUpperCase();
    swatches.querySelectorAll(".bili-focus-clean-color-swatch").forEach((swatch) => {
      swatch.classList.toggle("is-selected", swatch.dataset.color.toLowerCase() === currentColor);
    });
  }

  colorInput.addEventListener("input", updateColorPanelPreview);
  colorInput.addEventListener("change", updateColorPanelPreview);

  CLEAN_SEARCH_COLOR_SWATCHES.forEach((color) => {
    const swatch = document.createElement("button");
    swatch.type = "button";
    swatch.className = "bili-focus-clean-color-swatch";
    swatch.dataset.color = color;
    swatch.style.background = color;
    swatch.setAttribute("aria-label", color);
    swatch.addEventListener("click", () => {
      colorInput.value = color;
      updateColorPanelPreview();
    });
    swatches.appendChild(swatch);
  });
  updateColorPanelPreview();

  const actions = document.createElement("div");
  actions.className = "bili-focus-clean-color-actions";

  const cancel = document.createElement("button");
  cancel.type = "button";
  cancel.className = "bili-focus-clean-secondary-btn";
  cancel.textContent = getCleanSearchMessage("cancel");
  cancel.addEventListener("click", () => {
    cleanSearchColorPickerOpen = false;
    renderCleanSearchBackgroundPanel();
  });

  const confirm = document.createElement("button");
  confirm.type = "button";
  confirm.className = "bili-focus-clean-primary-btn";
  confirm.textContent = getCleanSearchMessage("confirm");
  confirm.addEventListener("click", () => {
    cleanSearchCustomColor = colorInput.value;
    cleanSearchColorPickerOpen = false;
    setCleanSearchBackgroundState({ type: "color", color: cleanSearchCustomColor }, {
      cleansearchcustomcolor: cleanSearchCustomColor,
    });
  });

  actions.append(cancel, confirm);
  panel.append(heading, customPicker, swatches, actions);
  return panel;
}

function createCleanSearchUploadChoicePanel() {
  const panel = document.createElement("div");
  panel.className = "bili-focus-clean-upload-panel";

  const useUploaded = document.createElement("button");
  useUploaded.type = "button";
  useUploaded.className = "bili-focus-clean-upload-choice";
  useUploaded.addEventListener("click", () => {
    cleanSearchUploadChoiceOpen = false;
    setCleanSearchBackgroundState({ type: "upload" });
  });

  const preview = document.createElement("span");
  preview.className = "bili-focus-clean-upload-preview";
  if (cleanSearchUploadedWallpaper) {
    preview.style.backgroundImage = `url("${cleanSearchUploadedWallpaper}")`;
  }
  const previewText = document.createElement("span");
  previewText.textContent = getCleanSearchMessage("useUploadedWallpaper");
  useUploaded.append(preview, previewText);

  const uploadNew = document.createElement("button");
  uploadNew.type = "button";
  uploadNew.className = "bili-focus-clean-upload-choice";
  uploadNew.textContent = getCleanSearchMessage("uploadNewWallpaper");
  uploadNew.addEventListener("click", () => {
    cleanSearchUploadChoiceOpen = false;
    openCleanSearchWallpaperFilePicker();
  });

  panel.append(useUploaded, uploadNew);
  return panel;
}

function setCleanSearchBackgroundState(nextState, extraStorage = {}) {
  const normalized = normalizeCleanSearchBackground(nextState);
  cleanSearchBackgroundState = normalized;
  applyCleanSearchBackgroundVars();
  updateCleanSearchForegroundTheme();
  if (cleanSearchBackgroundPanelOpen) {
    renderCleanSearchBackgroundPanel();
  } else {
    updateCleanSearchBackgroundSelection();
  }
  chrome.storage.local.set({
    cleansearchbackground: normalized,
    ...extraStorage,
  });
}

function setCleanSearchBackgroundPanelOpen(open) {
  const nextOpen = !!open && isCleanSearchActive();
  const panel = document.getElementById("bili-focus-clean-bg-panel");

  if (!nextOpen) {
    cleanSearchColorPickerOpen = false;
    cleanSearchUploadChoiceOpen = false;
    cleanSearchWallpaperInfoOpen = false;
  }

  cleanSearchBackgroundPanelOpen = nextOpen;
  document.documentElement.classList.toggle("bili-focus-clean-bg-panel-open", cleanSearchBackgroundPanelOpen);
  scheduleCleanSearchForegroundThemeUpdate();

  if (cleanSearchBackgroundPanelOpen) {
    renderCleanSearchBackgroundPanel();
  } else if (panel) {
    panel.classList.remove("is-open");
    panel.classList.add("is-closing");
    setTimeout(() => {
      if (panel.classList.contains("is-closing")) panel.remove();
    }, 260);
  }
  updateCleanSearchRightPopoverCacheStyle();
  scheduleCleanSearchRightPopoverClampBurst();
}

function updateCleanSearchBackgroundUiText() {
  const button = document.getElementById("bili-focus-clean-bg-btn");
  if (button) {
    button.title = getCleanSearchMessage("customizeBackground");
    button.setAttribute("aria-label", getCleanSearchMessage("customizeBackground"));
  }
  if (cleanSearchBackgroundPanelOpen) {
    renderCleanSearchBackgroundPanel();
  }
}

function openCleanSearchWallpaperFilePicker() {
  let input = document.getElementById("bili-focus-clean-bg-file-input");
  if (!input) {
    input = document.createElement("input");
    input.id = "bili-focus-clean-bg-file-input";
    input.type = "file";
    input.accept = "image/*";
    input.style.display = "none";
    input.addEventListener("change", handleCleanSearchWallpaperFileChange);
    document.body.appendChild(input);
  }
  input.value = "";
  input.click();
}

async function handleCleanSearchWallpaperFileChange(event) {
  const input = event.currentTarget;
  const file = input.files && input.files[0];
  if (!file) return;

  try {
    const dataUrl = await compressCleanSearchWallpaperFile(file);
    cleanSearchUploadedWallpaper = dataUrl;
    cleanSearchUploadedForegroundCache = {};
    cleanSearchUploadedThemeImage = null;
    cleanSearchUploadedThemeImageSignature = "";
    cleanSearchUploadChoiceOpen = false;
    cleanSearchColorPickerOpen = false;
    cleanSearchBackgroundState = { type: "upload" };
    applyCleanSearchBackgroundVars();
    updateCleanSearchForegroundTheme();
    renderCleanSearchBackgroundPanel();
    chrome.storage.local.set({
      cleansearchuploadedwallpaper: dataUrl,
      cleansearchbackground: { type: "upload" },
      cleansearchuploadedforegroundcache: {},
    }, () => {
      if (chrome.runtime.lastError) {
        window.alert(getCleanSearchMessage("uploadFailed"));
      }
    });
  } catch (error) {
    console.error("BiliFocus wallpaper upload failed:", error);
    window.alert(getCleanSearchMessage("uploadFailed"));
  }
}

function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    if (!file.type || !file.type.startsWith("image/")) {
      reject(new Error("Unsupported image type"));
      return;
    }

    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Image load failed"));
    };
    image.src = url;
  });
}

function loadImageFromUrl(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Image load failed"));
    image.src = url;
  });
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality);
  });
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error("File read failed"));
    reader.readAsDataURL(blob);
  });
}

async function compressCleanSearchWallpaperFile(file) {
  const image = await loadImageFromFile(file);
  const maxDataUrlLength = 6500000;
  const maxDimensions = [2560, 2048, 1600];
  const qualities = [0.86, 0.78, 0.7, 0.62];
  let fallbackDataUrl = "";

  for (const maxDimension of maxDimensions) {
    const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext("2d", { alpha: false });
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    for (const quality of qualities) {
      let blob = await canvasToBlob(canvas, "image/webp", quality);
      if (!blob || blob.type !== "image/webp") {
        blob = await canvasToBlob(canvas, "image/jpeg", quality);
      }
      if (!blob) continue;

      const dataUrl = await blobToDataUrl(blob);
      fallbackDataUrl = dataUrl;
      if (dataUrl.length <= maxDataUrlLength) return dataUrl;
    }
  }

  if (!fallbackDataUrl) throw new Error("Image compression failed");
  return fallbackDataUrl;
}

function getCleanSearchModeStyle() {
  const hiddenHeaderChildrenSelector = isCleanSearchRightNavLeftAligned()
    ? ":not(.center-search-container):not(.right-entry)"
    : ":not(.center-search-container):not(.left-entry):not(.right-entry)";
  const hiddenCleanSearchLeftNavStyles = !isCleanSearchRightNavLeftAligned() && settings.leftnavi
    ? `
      .bili-focus-clean-search-mode.bili-focus-clean-right-nav-right .bili-header__bar > .left-entry {
        visibility: hidden !important;
        pointer-events: none !important;
        display: none !important;
      }
    `
    : "";
  let hiddenRightNavStyles = "";
  Object.entries(CLEAN_SEARCH_RIGHT_NAV_SELECTORS).forEach(([key, selector]) => {
    if (settings[key]) {
      hiddenRightNavStyles += `
        ${selector} {
          visibility: hidden !important;
          pointer-events: none !important;
          display: none !important;
        }
      `;
    }
  });

  return `
    .bili-focus-clean-search-mode {
      --bili-focus-clean-bg-panel-width: min(344px, 42vw);
      --bili-focus-clean-stage-right: 0px;
      --bili-focus-clean-stage-center: calc((100vw - var(--bili-focus-clean-stage-right)) / 2);
      --bili-focus-clean-blue: #007bff;
      --bili-focus-clean-left-nav-color: rgba(24, 33, 51, 0.88);
      --bili-focus-clean-right-nav-color: rgba(24, 33, 51, 0.88);
    }

    .bili-focus-clean-search-mode[data-bili-focus-left-nav-fg="light"] {
      --bili-focus-clean-left-nav-color: rgba(255, 255, 255, 0.98);
    }

    .bili-focus-clean-search-mode[data-bili-focus-left-nav-fg="dark"] {
      --bili-focus-clean-left-nav-color: rgba(24, 33, 51, 0.88);
    }

    .bili-focus-clean-search-mode[data-bili-focus-right-nav-fg="light"] {
      --bili-focus-clean-right-nav-color: rgba(255, 255, 255, 0.98);
    }

    .bili-focus-clean-search-mode[data-bili-focus-right-nav-fg="dark"] {
      --bili-focus-clean-right-nav-color: rgba(24, 33, 51, 0.88);
    }

    .bili-focus-clean-search-mode.bili-focus-clean-bg-panel-open {
      --bili-focus-clean-stage-right: var(--bili-focus-clean-bg-panel-width);
    }

    .bili-focus-clean-search-mode,
    .bili-focus-clean-search-mode body {
      min-height: 100vh !important;
      overflow-x: hidden !important;
      background-color: var(--bili-focus-clean-bg-color, #f6f8fb) !important;
      background-image: none !important;
    }

    .bili-focus-clean-search-mode #bili-focus-clean-bg-layer {
      position: fixed !important;
      top: 0 !important;
      right: var(--bili-focus-clean-stage-right) !important;
      bottom: 0 !important;
      left: 0 !important;
      background-color: var(--bili-focus-clean-bg-color, #f6f8fb) !important;
      background-image: var(--bili-focus-clean-bg-image, none) !important;
      background-position: center center !important;
      background-repeat: no-repeat !important;
      background-size: cover !important;
      z-index: 0 !important;
      pointer-events: none !important;
      transition: right 240ms cubic-bezier(0.2, 0, 0, 1) !important;
    }

    .bili-focus-clean-search-mode #app,
    .bili-focus-clean-search-mode #app > .bili-feed4 {
      min-height: 100vh !important;
      background: transparent !important;
    }

    .bili-focus-clean-search-mode #app > .bili-feed4 > :not(.bili-header),
    .bili-focus-clean-search-mode .bili-header.large-header > :not(.bili-header__bar),
    .bili-focus-clean-search-mode .bili-header__bar > ${hiddenHeaderChildrenSelector},
    .bili-focus-clean-search-mode .bili-feed4-layout,
    .bili-focus-clean-search-mode .bili-header__channel,
    .bili-focus-clean-search-mode .header-channel,
    .bili-focus-clean-search-mode .palette-button-outer,
    .bili-focus-clean-search-mode .palette-button-wrap,
    .bili-focus-clean-search-mode .bili-footer {
      visibility: hidden !important;
      pointer-events: none !important;
      display: none !important;
    }

    .bili-focus-clean-search-mode .bili-header.large-header {
      min-height: 100vh !important;
      height: 100vh !important;
      background: transparent !important;
      box-shadow: none !important;
    }

    .bili-focus-clean-search-mode .bili-header__bar {
      position: fixed !important;
      inset: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      min-height: 100vh !important;
      padding: 0 !important;
      margin: 0 !important;
      display: block !important;
      background: transparent !important;
      box-shadow: none !important;
      pointer-events: none !important;
      z-index: 10000 !important;
    }

    .bili-focus-clean-search-mode .bili-header__bar > .center-search-container {
      position: static !important;
      width: auto !important;
      max-width: none !important;
      min-width: 0 !important;
      height: auto !important;
      margin: 0 !important;
      padding: 0 !important;
      transform: none !important;
      pointer-events: none !important;
      z-index: auto !important;
    }

    .bili-focus-clean-search-mode .bili-header__bar > .center-search-container > .center-search__bar {
      position: fixed !important;
      left: var(--bili-focus-clean-stage-center) !important;
      top: 35% !important;
      transform: translateX(-50%) scale(1.28) !important;
      transform-origin: top center !important;
      width: min(502px, calc((100vw - var(--bili-focus-clean-stage-right) - 64px) / 1.8285714286)) !important;
      max-width: none !important;
      margin: 0 !important;
      padding: 0 !important;
      pointer-events: auto !important;
      z-index: 10002 !important;
      transition: left 240ms cubic-bezier(0.2, 0, 0, 1), width 240ms cubic-bezier(0.2, 0, 0, 1) !important;
    }

    .bili-focus-clean-search-mode #bili-focus-clean-brand {
      position: fixed !important;
      left: var(--bili-focus-clean-stage-center) !important;
      top: calc(36.5% - 164px) !important;
      transform: translateX(-50%) !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      flex-direction: column !important;
      pointer-events: none !important;
      user-select: none !important;
      z-index: 10001 !important;
      transition: left 240ms cubic-bezier(0.2, 0, 0, 1), opacity 120ms ease !important;
    }

    .bili-focus-clean-search-mode[data-bili-focus-foreground-pending] #bili-focus-clean-brand,
    .bili-focus-clean-search-mode[data-bili-focus-foreground-pending] .bili-header__bar > .left-entry,
    .bili-focus-clean-search-mode[data-bili-focus-foreground-pending] .bili-header__bar > .right-entry {
      opacity: 0 !important;
    }

    .bili-focus-clean-search-mode #bili-focus-clean-brand .bili-focus-clean-brand-row {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      flex-direction: column !important;
      gap: 10px !important;
      white-space: nowrap !important;
    }

    .bili-focus-clean-search-mode #bili-focus-clean-brand img {
      width: 224px !important;
      height: auto !important;
      display: block !important;
      opacity: 0.94 !important;
      transition: filter 160ms ease, opacity 160ms ease !important;
    }

    .bili-focus-clean-search-mode[data-bili-focus-logo-fg="light"] #bili-focus-clean-brand img {
      filter: brightness(0) invert(1) !important;
      opacity: 0.96 !important;
    }

    .bili-focus-clean-search-mode[data-bili-focus-logo-fg="dark"] #bili-focus-clean-brand img {
      filter: none !important;
      opacity: 0.94 !important;
    }

    .bili-focus-clean-search-mode #bili-focus-clean-brand .bili-focus-clean-brand-pill {
      min-height: 24px !important;
      padding: 0 12px !important;
      border: 1px solid rgba(25, 34, 51, 0.1) !important;
      border-radius: 999px !important;
      background: rgba(255, 255, 255, 0.72) !important;
      color: rgba(24, 33, 51, 0.64) !important;
      font-size: 12px !important;
      line-height: 24px !important;
      font-weight: 600 !important;
      letter-spacing: 0 !important;
      transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease !important;
    }

    .bili-focus-clean-search-mode[data-bili-focus-brand-fg="light"] #bili-focus-clean-brand .bili-focus-clean-brand-pill {
      border-color: rgba(25, 34, 51, 0.1) !important;
      background: rgba(255, 255, 255, 0.72) !important;
      color: rgba(24, 33, 51, 0.64) !important;
    }

    .bili-focus-clean-search-mode[data-bili-focus-brand-fg="dark"] #bili-focus-clean-brand .bili-focus-clean-brand-pill {
      border-color: rgba(255, 255, 255, 0.18) !important;
      background: rgba(13, 18, 28, 0.48) !important;
      color: rgba(255, 255, 255, 0.88) !important;
    }

    .bili-focus-clean-search-mode .center-search__bar #nav-searchform,
    .bili-focus-clean-search-mode .center-search__bar .search-panel {
      width: 100% !important;
      max-width: none !important;
    }

    .bili-focus-clean-search-mode .center-search__bar .search-panel .history,
    .bili-focus-clean-search-mode .center-search__bar .search-panel .trending,
    .bili-focus-clean-search-mode .center-search__bar .search-panel .suggestions {
      width: 100% !important;
      max-width: none !important;
    }

    .bili-focus-clean-search-mode .center-search__bar .search-panel .history {
      height: auto !important;
      max-height: none !important;
      overflow: visible !important;
    }

    .bili-focus-clean-search-mode .center-search__bar .search-panel .history .histories-wrap {
      height: auto !important;
      max-height: none !important;
      overflow: visible !important;
    }

    .bili-focus-clean-search-mode .center-search__bar .search-panel .histories {
      display: flex !important;
      flex-wrap: wrap !important;
      align-content: flex-start !important;
      gap: 5px 6px !important;
    }

    .bili-focus-clean-search-mode .center-search__bar .search-panel .history .header,
    .bili-focus-clean-search-mode .center-search__bar .search-panel .trending .header {
      min-height: 28px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
    }

    .bili-focus-clean-search-mode .center-search__bar .search-panel .header .title {
      font-size: 13px !important;
      line-height: 18px !important;
      font-weight: 600 !important;
    }

    .bili-focus-clean-search-mode .center-search__bar .search-panel .header .clear,
    .bili-focus-clean-search-mode .center-search__bar .search-panel .history [class*="more"],
    .bili-focus-clean-search-mode .center-search__bar .search-panel .history [class*="More"],
    .bili-focus-clean-search-mode .center-search__bar .search-panel .history [class*="expand"],
    .bili-focus-clean-search-mode .center-search__bar .search-panel .history [class*="Expand"],
    .bili-focus-clean-search-mode .center-search__bar .search-panel .history [class*="fold"],
    .bili-focus-clean-search-mode .center-search__bar .search-panel .history [class*="Fold"] {
      font-size: 11px !important;
      line-height: 16px !important;
    }

    .bili-focus-clean-search-mode .center-search__bar .search-panel .history-fold-wrap {
      display: none !important;
    }

    .bili-focus-clean-search-mode .center-search__bar .search-panel .history-fold-wrap .fold-text {
      font-size: 11px !important;
      line-height: 16px !important;
    }

    .bili-focus-clean-search-mode .center-search__bar .search-panel .history-fold-wrap .fold-icon {
      width: 10px !important;
      height: 10px !important;
      margin-left: 2px !important;
    }

    .bili-focus-clean-search-mode .center-search__bar .search-panel .history-item {
      min-height: 22px !important;
      height: 22px !important;
      display: inline-flex !important;
      align-items: center !important;
      vertical-align: top !important;
      line-height: 14px !important;
      box-sizing: border-box !important;
      max-width: 156px !important;
      min-width: 0 !important;
      margin: 0 !important;
      overflow: visible !important;
      position: relative !important;
    }

    .bili-focus-clean-search-mode .center-search__bar .search-panel .history-text {
      font-size: 10px !important;
      line-height: 14px !important;
      display: block !important;
      flex: 1 1 auto !important;
      min-width: 0 !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
    }

    .bili-focus-clean-search-mode .center-search__bar .search-panel .history-item .close {
      position: absolute !important;
      top: -5px !important;
      right: -5px !important;
      width: 15px !important;
      height: 15px !important;
      margin: 0 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      visibility: hidden !important;
      opacity: 0 !important;
      color: rgba(118, 128, 143, 0.78) !important;
      pointer-events: none !important;
      z-index: 2 !important;
    }

    .bili-focus-clean-search-mode .center-search__bar .search-panel .history-item:hover .close,
    .bili-focus-clean-search-mode .center-search__bar .search-panel .history-item:focus .close,
    .bili-focus-clean-search-mode .center-search__bar .search-panel .history-item:focus-within .close {
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
    }

    .bili-focus-clean-search-mode .center-search__bar .search-panel .history-item .close svg {
      width: 15px !important;
      height: 15px !important;
      display: block !important;
    }

    .bili-focus-clean-search-mode .center-search__bar .search-panel .history-item .close svg path {
      fill: currentColor !important;
    }

    .bili-focus-clean-search-mode .center-search__bar .search-panel .trending-item {
      min-height: 26px !important;
      display: flex !important;
      align-items: center !important;
      box-sizing: border-box !important;
      font-size: 11px !important;
      line-height: 18px !important;
    }

    .bili-focus-clean-search-mode .center-search__bar .search-panel .suggest-item {
      min-height: 20px !important;
      height: 20px !important;
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      display: flex !important;
      align-items: center !important;
      box-sizing: border-box !important;
      font-size: 11px !important;
      line-height: 16px !important;
    }

    .bili-focus-clean-search-mode .center-search__bar .search-panel .trendings-rank {
      font-size: 11px !important;
      line-height: 18px !important;
      flex: 0 0 auto !important;
    }

    .bili-focus-clean-search-mode .center-search__bar .search-panel .trending-text {
      font-size: 11px !important;
      line-height: 18px !important;
    }

    .bili-focus-clean-search-mode .center-search__bar .search-panel .suggest-item,
    .bili-focus-clean-search-mode .center-search__bar .search-panel .suggest-item em,
    .bili-focus-clean-search-mode .center-search__bar .search-panel .suggest_high_light {
      font-size: 11px !important;
      line-height: 16px !important;
    }

    .bili-focus-clean-search-mode.bili-focus-clean-right-nav-right .bili-header__bar > .left-entry {
      position: fixed !important;
      top: 24px !important;
      left: 28px !important;
      right: auto !important;
      width: auto !important;
      max-width: calc(100vw - var(--bili-focus-clean-stage-right) - 56px) !important;
      height: auto !important;
      margin: 0 !important;
      padding: 0 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: flex-start !important;
      gap: 10px !important;
      color: var(--bili-focus-clean-left-nav-color) !important;
      pointer-events: auto !important;
      z-index: 10003 !important;
      transition: opacity 120ms ease !important;
    }

    .bili-focus-clean-search-mode.bili-focus-clean-right-nav-right .left-entry > * {
      margin: 0 !important;
      flex: 0 0 auto !important;
    }

    .bili-focus-clean-search-mode.bili-focus-clean-right-nav-right .left-entry > li {
      height: 34px !important;
      min-height: 34px !important;
      display: flex !important;
      align-items: center !important;
      line-height: 18px !important;
    }

    .bili-focus-clean-search-mode.bili-focus-clean-right-nav-right .left-entry > li > a {
      height: 34px !important;
      min-height: 34px !important;
      padding: 0 !important;
      display: inline-flex !important;
      align-items: center !important;
      gap: 5px !important;
      line-height: 18px !important;
      box-sizing: border-box !important;
    }

    .bili-focus-clean-search-mode.bili-focus-clean-right-nav-right .left-entry > li > a,
    .bili-focus-clean-search-mode.bili-focus-clean-right-nav-right .left-entry > li > a > span,
    .bili-focus-clean-search-mode.bili-focus-clean-right-nav-right .left-entry > li > a > div {
      color: var(--bili-focus-clean-left-nav-color) !important;
      min-height: 0 !important;
      line-height: 18px !important;
    }

    .bili-focus-clean-search-mode.bili-focus-clean-right-nav-right .left-entry > li > a > svg,
    .bili-focus-clean-search-mode.bili-focus-clean-right-nav-right .left-entry > li > a > svg * {
      color: var(--bili-focus-clean-left-nav-color) !important;
    }

    ${hiddenCleanSearchLeftNavStyles}

    .bili-focus-clean-search-mode .bili-header__bar > .right-entry {
      position: fixed !important;
      top: 24px !important;
      right: calc(var(--bili-focus-clean-stage-right) + 28px) !important;
      left: 28px !important;
      width: calc(100vw - var(--bili-focus-clean-stage-right) - 56px) !important;
      height: auto !important;
      margin: 0 !important;
      padding: 0 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: flex-start !important;
      gap: 14px !important;
      pointer-events: auto !important;
      z-index: 10003 !important;
      transition: right 240ms cubic-bezier(0.2, 0, 0, 1), width 240ms cubic-bezier(0.2, 0, 0, 1), opacity 120ms ease !important;
    }

    .bili-focus-clean-search-mode.bili-focus-clean-right-nav-left .bili-header__bar > .right-entry {
      --bili-focus-clean-right-nav-color: var(--bili-focus-clean-left-nav-color);
    }

    .bili-focus-clean-search-mode.bili-focus-clean-right-nav-right .bili-header__bar > .right-entry {
      left: auto !important;
      right: calc(var(--bili-focus-clean-stage-right) + 28px) !important;
      width: auto !important;
      max-width: calc(100vw - var(--bili-focus-clean-stage-right) - 56px) !important;
      justify-content: flex-end !important;
    }

    .bili-focus-clean-search-mode .right-entry > * {
      margin: 0 !important;
      flex: 0 0 auto !important;
    }

    .bili-focus-clean-search-mode ul.right-entry > div.vip-wrap > li.v-popover-wrap > a,
    .bili-focus-clean-search-mode ul.right-entry > li.v-popover-wrap:not(.header-avatar-wrap) > a,
    .bili-focus-clean-search-mode ul.right-entry > li.right-entry-item > a,
    .bili-focus-clean-search-mode ul.right-entry > li.right-entry-item--upload > li.v-popover-wrap > a {
      color: var(--bili-focus-clean-right-nav-color) !important;
    }

    .bili-focus-clean-search-mode ul.right-entry > div.vip-wrap > li.v-popover-wrap > a .right-entry-icon,
    .bili-focus-clean-search-mode ul.right-entry > li.v-popover-wrap:not(.header-avatar-wrap) > a .right-entry-icon,
    .bili-focus-clean-search-mode ul.right-entry > li.right-entry-item > a .right-entry-icon,
    .bili-focus-clean-search-mode ul.right-entry > li.right-entry-item--upload > li.v-popover-wrap > a .header-upload-entry__icon,
    .bili-focus-clean-search-mode ul.right-entry > div.vip-wrap > li.v-popover-wrap > a .right-entry-text,
    .bili-focus-clean-search-mode ul.right-entry > li.v-popover-wrap:not(.header-avatar-wrap) > a .right-entry-text,
    .bili-focus-clean-search-mode ul.right-entry > li.right-entry-item > a .right-entry-text,
    .bili-focus-clean-search-mode ul.right-entry > li.right-entry-item--upload > li.v-popover-wrap > a .header-upload-entry__text {
      color: currentColor !important;
    }

    .bili-focus-clean-search-mode ul.right-entry > li.right-entry-item--upload > li.v-popover-wrap > a {
      text-decoration: none !important;
    }

    .bili-focus-clean-search-mode ul.right-entry > li.right-entry-item--upload .header-upload-entry {
      min-width: 70px !important;
      height: 34px !important;
      padding: 0 13px !important;
      box-sizing: border-box !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 5px !important;
      border: 1px solid currentColor !important;
      border-radius: 999px !important;
      background: transparent !important;
      color: var(--bili-focus-clean-right-nav-color) !important;
      box-shadow: none !important;
      transition: border-color 160ms ease, color 160ms ease !important;
    }

    .bili-focus-clean-search-mode ul.right-entry > li.right-entry-item--upload .header-upload-entry__icon {
      width: 17px !important;
      height: 17px !important;
      flex: 0 0 auto !important;
    }

    .bili-focus-clean-search-mode ul.right-entry > li.right-entry-item--upload .header-upload-entry__text {
      color: currentColor !important;
      font-weight: 500 !important;
    }

    .bili-focus-clean-search-mode .right-entry > .header-avatar-wrap {
      order: 99 !important;
      margin-left: auto !important;
      visibility: visible !important;
      pointer-events: auto !important;
      display: flex !important;
    }

    .bili-focus-clean-search-mode.bili-focus-clean-right-nav-right .right-entry > .header-avatar-wrap {
      order: 99 !important;
      margin-left: 0 !important;
    }

    .bili-focus-clean-search-mode #bili-focus-clean-bg-btn {
      position: fixed !important;
      right: calc(var(--bili-focus-clean-stage-right) + 20px) !important;
      bottom: 20px !important;
      width: 32px !important;
      height: 32px !important;
      border: none !important;
      border-radius: 50% !important;
      background: rgba(0, 0, 0, 0.58) !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 0 !important;
      cursor: pointer !important;
      z-index: 2147483647 !important;
      pointer-events: auto !important;
      transition: right 240ms cubic-bezier(0.2, 0, 0, 1), background-color 160ms ease, opacity 120ms ease !important;
    }

    .bili-focus-clean-search-mode #bili-focus-clean-bg-panel {
      position: fixed !important;
      top: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: var(--bili-focus-clean-bg-panel-width) !important;
      height: 100vh !important;
      box-sizing: border-box !important;
      display: flex !important;
      flex-direction: column !important;
      background: rgba(255, 255, 255, 0.92) !important;
      color: rgba(24, 33, 51, 0.88) !important;
      border-left: 1px solid rgba(25, 34, 51, 0.12) !important;
      box-shadow: -18px 0 46px rgba(25, 34, 51, 0.18) !important;
      backdrop-filter: blur(18px) !important;
      -webkit-backdrop-filter: blur(18px) !important;
      z-index: 2147483646 !important;
      pointer-events: auto !important;
      font-family: Arial, sans-serif !important;
      user-select: none !important;
      opacity: 0 !important;
      transform: translateX(100%) !important;
      transition: transform 240ms cubic-bezier(0.2, 0, 0, 1), opacity 180ms ease !important;
    }

    .bili-focus-clean-search-mode #bili-focus-clean-bg-panel.is-open {
      opacity: 1 !important;
      transform: translateX(0) !important;
    }

    .bili-focus-clean-search-mode #bili-focus-clean-bg-panel.is-closing {
      opacity: 0 !important;
      transform: translateX(100%) !important;
    }

    .bili-focus-clean-search-mode #bili-focus-clean-bg-panel * {
      box-sizing: border-box !important;
      letter-spacing: 0 !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-bg-panel-header {
      height: 60px !important;
      padding: 0 16px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      border-bottom: 1px solid rgba(25, 34, 51, 0.1) !important;
      flex: 0 0 auto !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-bg-panel-title {
      font-size: 16px !important;
      line-height: 20px !important;
      font-weight: 700 !important;
      color: rgba(24, 33, 51, 0.88) !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-bg-panel-close {
      width: 32px !important;
      height: 32px !important;
      padding: 0 !important;
      border: none !important;
      border-radius: 50% !important;
      background: transparent !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      cursor: pointer !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-bg-panel-close:hover {
      background: rgba(25, 34, 51, 0.08) !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-bg-panel-close img {
      width: 16px !important;
      height: 16px !important;
      display: block !important;
      opacity: 0.72 !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-bg-panel-body {
      flex: 1 1 auto !important;
      min-height: 0 !important;
      padding: 16px !important;
      overflow-y: auto !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-bg-panel-footer {
      flex: 0 0 auto !important;
      padding: 12px 16px 16px !important;
      border-top: 1px solid rgba(25, 34, 51, 0.1) !important;
      text-align: center !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-bg-panel-link {
      color: var(--bili-focus-clean-blue) !important;
      font-size: 12px !important;
      line-height: 18px !important;
      font-weight: 600 !important;
      text-decoration: none !important;
      cursor: pointer !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-bg-panel-link:hover {
      text-decoration: underline !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-bg-featured-grid {
      display: grid !important;
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      gap: 12px !important;
      margin-bottom: 12px !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-bg-wallpaper-grid {
      display: grid !important;
      grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      gap: 10px !important;
      margin-top: 12px !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-bg-card {
      position: relative !important;
      aspect-ratio: 1 / 1 !important;
      width: 100% !important;
      min-width: 0 !important;
      border: 2px solid transparent !important;
      border-radius: 8px !important;
      padding: 0 !important;
      overflow: hidden !important;
      background-color: #eef1f5 !important;
      background-position: center !important;
      background-repeat: no-repeat !important;
      background-size: cover !important;
      cursor: pointer !important;
      box-shadow: 0 1px 4px rgba(25, 34, 51, 0.12) !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-bg-card:hover {
      box-shadow: 0 4px 14px rgba(25, 34, 51, 0.18) !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-bg-card.is-selected {
      border-color: var(--bili-focus-clean-blue) !important;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.22), 0 4px 14px rgba(25, 34, 51, 0.18) !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-bg-card-color {
      background: var(--bili-focus-clean-card-color, #eef4fb) !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-bg-card-upload {
      background: #edf0f4 !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-bg-card img {
      position: absolute !important;
      left: 50% !important;
      top: 50% !important;
      width: 28px !important;
      height: 28px !important;
      transform: translate(-50%, -50%) !important;
      opacity: 0.74 !important;
      pointer-events: none !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-wallpaper-info-list {
      display: grid !important;
      gap: 12px !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-wallpaper-info-loading {
      padding: 16px !important;
      border: 1px solid rgba(25, 34, 51, 0.12) !important;
      border-radius: 8px !important;
      background: rgba(255, 255, 255, 0.68) !important;
      color: rgba(24, 33, 51, 0.62) !important;
      font-size: 12px !important;
      line-height: 18px !important;
      text-align: center !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-wallpaper-info-item {
      display: grid !important;
      grid-template-columns: 82px minmax(0, 1fr) !important;
      gap: 10px !important;
      padding: 10px !important;
      border: 1px solid rgba(25, 34, 51, 0.12) !important;
      border-radius: 8px !important;
      background: rgba(255, 255, 255, 0.68) !important;
      box-shadow: 0 4px 14px rgba(25, 34, 51, 0.08) !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-wallpaper-info-preview {
      width: 82px !important;
      aspect-ratio: 1 / 1 !important;
      border-radius: 6px !important;
      background-position: center !important;
      background-repeat: no-repeat !important;
      background-size: cover !important;
      border: 1px solid rgba(25, 34, 51, 0.12) !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-wallpaper-info-details {
      min-width: 0 !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 4px !important;
      justify-content: center !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-wallpaper-info-title {
      color: rgba(24, 33, 51, 0.86) !important;
      font-size: 12px !important;
      line-height: 16px !important;
      font-weight: 700 !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      display: -webkit-box !important;
      -webkit-line-clamp: 2 !important;
      -webkit-box-orient: vertical !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-wallpaper-info-meta,
    .bili-focus-clean-search-mode .bili-focus-clean-wallpaper-info-source {
      color: rgba(24, 33, 51, 0.58) !important;
      font-size: 11px !important;
      line-height: 15px !important;
      text-decoration: none !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-wallpaper-info-source {
      color: var(--bili-focus-clean-blue) !important;
      font-weight: 600 !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-wallpaper-info-source:hover {
      text-decoration: underline !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-color-panel,
    .bili-focus-clean-search-mode .bili-focus-clean-upload-panel {
      padding: 12px !important;
      border: 1px solid rgba(25, 34, 51, 0.12) !important;
      border-radius: 8px !important;
      background: rgba(255, 255, 255, 0.74) !important;
      box-shadow: 0 8px 22px rgba(25, 34, 51, 0.1) !important;
      margin-bottom: 12px !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-color-heading {
      font-size: 13px !important;
      line-height: 18px !important;
      font-weight: 700 !important;
      margin-bottom: 10px !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-custom-picker {
      position: relative !important;
      display: grid !important;
      grid-template-columns: 34px minmax(0, 1fr) !important;
      align-items: center !important;
      gap: 10px !important;
      min-height: 48px !important;
      padding: 8px 10px !important;
      margin-bottom: 10px !important;
      border: 1px dashed rgba(25, 34, 51, 0.28) !important;
      border-radius: 8px !important;
      background: rgba(255, 255, 255, 0.62) !important;
      cursor: pointer !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-custom-picker:hover {
      border-color: rgba(0, 123, 255, 0.52) !important;
      background: rgba(255, 255, 255, 0.78) !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-custom-picker input {
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      border: none !important;
      opacity: 0 !important;
      cursor: pointer !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-custom-picker input:focus,
    .bili-focus-clean-search-mode .bili-focus-clean-custom-picker input:focus-visible {
      outline: none !important;
      box-shadow: none !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-custom-preview {
      width: 34px !important;
      height: 34px !important;
      border-radius: 7px !important;
      border: 1px solid rgba(25, 34, 51, 0.18) !important;
      box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.42) !important;
      pointer-events: none !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-custom-text {
      display: flex !important;
      flex-direction: column !important;
      min-width: 0 !important;
      pointer-events: none !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-custom-label {
      font-size: 12px !important;
      line-height: 18px !important;
      font-weight: 700 !important;
      color: rgba(24, 33, 51, 0.82) !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-custom-value {
      font-size: 11px !important;
      line-height: 16px !important;
      color: rgba(24, 33, 51, 0.54) !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-color-swatches {
      display: grid !important;
      grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
      gap: 6px !important;
      margin-bottom: 12px !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-color-swatch {
      aspect-ratio: 1 / 1 !important;
      border: 2px solid rgba(25, 34, 51, 0.14) !important;
      border-radius: 50% !important;
      padding: 0 !important;
      cursor: pointer !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-color-swatch.is-selected {
      border-color: var(--bili-focus-clean-blue) !important;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.22) !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-color-swatch:focus,
    .bili-focus-clean-search-mode .bili-focus-clean-color-swatch:focus-visible {
      outline: none !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-color-actions {
      display: flex !important;
      justify-content: flex-end !important;
      gap: 8px !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-primary-btn,
    .bili-focus-clean-search-mode .bili-focus-clean-secondary-btn,
    .bili-focus-clean-search-mode .bili-focus-clean-upload-choice {
      min-height: 30px !important;
      border-radius: 7px !important;
      padding: 0 12px !important;
      font-size: 12px !important;
      line-height: 18px !important;
      font-weight: 600 !important;
      cursor: pointer !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-primary-btn {
      border: 1px solid var(--bili-focus-clean-blue) !important;
      background: var(--bili-focus-clean-blue) !important;
      color: #fff !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-secondary-btn {
      border: 1px solid rgba(25, 34, 51, 0.14) !important;
      background: rgba(255, 255, 255, 0.78) !important;
      color: rgba(24, 33, 51, 0.74) !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-upload-panel {
      display: grid !important;
      gap: 8px !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-upload-choice {
      width: 100% !important;
      min-height: 42px !important;
      border: 1px solid rgba(25, 34, 51, 0.12) !important;
      background: rgba(255, 255, 255, 0.78) !important;
      color: rgba(24, 33, 51, 0.82) !important;
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
      justify-content: flex-start !important;
      text-align: left !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-upload-choice:hover,
    .bili-focus-clean-search-mode .bili-focus-clean-primary-btn:hover,
    .bili-focus-clean-search-mode .bili-focus-clean-secondary-btn:hover {
      filter: brightness(0.98) !important;
    }

    .bili-focus-clean-search-mode .bili-focus-clean-upload-preview {
      width: 34px !important;
      height: 34px !important;
      border-radius: 6px !important;
      flex: 0 0 auto !important;
      background-color: #dfe4ea !important;
      background-position: center !important;
      background-size: cover !important;
      background-repeat: no-repeat !important;
      border: 1px solid rgba(25, 34, 51, 0.12) !important;
    }

    .bili-focus-clean-search-mode #bili-focus-clean-bg-btn:hover {
      background: #000 !important;
    }

    .bili-focus-clean-search-mode #bili-focus-clean-bg-btn img {
      width: 14px !important;
      height: 14px !important;
      display: block !important;
      filter: brightness(0) invert(1) !important;
      opacity: 1 !important;
    }

    ${hiddenRightNavStyles}
  `;
}

function updateCleanSearchBackgroundButton(shouldShow) {
  const existingButton = document.getElementById("bili-focus-clean-bg-btn");
  if (!shouldShow) {
    if (existingButton) existingButton.remove();
    cleanSearchBackgroundPanelOpen = false;
    cleanSearchColorPickerOpen = false;
    cleanSearchUploadChoiceOpen = false;
    cleanSearchWallpaperInfoOpen = false;
    clearCleanSearchForegroundAttributes();
    document.documentElement.classList.remove("bili-focus-clean-bg-panel-open");
    const panel = document.getElementById("bili-focus-clean-bg-panel");
    if (panel) panel.remove();
    return;
  }
  if (!document.body || existingButton) return;

  const button = document.createElement("button");
  button.id = "bili-focus-clean-bg-btn";
  button.type = "button";
  button.title = getCleanSearchMessage("customizeBackground");
  button.setAttribute("aria-label", getCleanSearchMessage("customizeBackground"));
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    setCleanSearchBackgroundPanelOpen(!cleanSearchBackgroundPanelOpen);
  });

  const icon = document.createElement("img");
  icon.src = chrome.runtime.getURL("icons/pen.svg");
  icon.alt = "";
  button.appendChild(icon);
  document.body.appendChild(button);
}

function getCleanSearchBadgeText() {
  return CLEAN_SEARCH_BADGE_MESSAGES[cleanSearchLanguage] || CLEAN_SEARCH_BADGE_MESSAGES.zh;
}

function getCleanSearchBrandText() {
  return `BiliFocus \u00B7 ${getCleanSearchBadgeText()}`;
}

function updateCleanSearchLanguage(lang) {
  cleanSearchLanguage = Object.prototype.hasOwnProperty.call(CLEAN_SEARCH_BADGE_MESSAGES, lang) ? lang : "zh";
  const pill = document.querySelector("#bili-focus-clean-brand .bili-focus-clean-brand-pill");
  if (pill) pill.textContent = getCleanSearchBrandText();
  updateCleanSearchBackgroundUiText();
}

function updateCleanSearchBrand(shouldShow) {
  const existingBrand = document.getElementById("bili-focus-clean-brand");
  if (!shouldShow) {
    if (existingBrand) existingBrand.remove();
    return;
  }
  if (!document.body || existingBrand) return;

  const brand = document.createElement("div");
  brand.id = "bili-focus-clean-brand";
  brand.setAttribute("aria-hidden", "true");

  const row = document.createElement("div");
  row.className = "bili-focus-clean-brand-row";

  const logo = document.createElement("img");
  logo.src = chrome.runtime.getURL("icons/BILIBILI_LOGO.svg");
  logo.alt = "";

  const pill = document.createElement("span");
  pill.className = "bili-focus-clean-brand-pill";
  pill.textContent = getCleanSearchBrandText();

  row.append(logo, pill);
  brand.appendChild(row);
  document.body.appendChild(brand);
}

function clearCleanSearchPopoverClamp(element) {
  if (Object.prototype.hasOwnProperty.call(element.dataset, "biliFocusOriginalMarginLeft")) {
    if (element.dataset.biliFocusOriginalMarginLeft === "") {
      element.style.removeProperty("margin-left");
    } else {
      element.style.setProperty(
        "margin-left",
        element.dataset.biliFocusOriginalMarginLeft,
        element.dataset.biliFocusOriginalMarginLeftPriority || ""
      );
    }
  } else {
    element.style.removeProperty("margin-left");
  }
  if (Object.prototype.hasOwnProperty.call(element.dataset, "biliFocusOriginalTransition")) {
    if (element.dataset.biliFocusOriginalTransition === "") {
      element.style.removeProperty("transition");
    } else {
      element.style.setProperty(
        "transition",
        element.dataset.biliFocusOriginalTransition,
        element.dataset.biliFocusOriginalTransitionPriority || ""
      );
    }
  } else {
    element.style.removeProperty("transition");
  }
  delete element.dataset.biliFocusRightPopoverClamped;
  delete element.dataset.biliFocusOriginalMarginLeft;
  delete element.dataset.biliFocusOriginalMarginLeftPriority;
  delete element.dataset.biliFocusOriginalTransition;
  delete element.dataset.biliFocusOriginalTransitionPriority;
  delete element.dataset.biliFocusAppliedMarginLeft;
  delete element.dataset.biliFocusRightPopoverShift;
}

function getCleanSearchSafeCssPixelLength(value) {
  const normalized = typeof value === "string" ? value.trim() : "";
  return /^-?\d+(?:\.\d+)?px$/.test(normalized) ? normalized : "0px";
}

function getCleanSearchClampedMargin(originalMargin, shiftX) {
  const safeOriginalMargin = getCleanSearchSafeCssPixelLength(originalMargin);
  const roundedShift = Math.round(Number(shiftX) || 0);
  const operator = roundedShift < 0 ? "-" : "+";
  return `calc(${safeOriginalMargin} ${operator} ${Math.abs(roundedShift)}px)`;
}

function isCleanSearchRightNavLayoutItemVisible(item) {
  return !item.setting || !settings[item.setting];
}

function getCleanSearchRightPopoverLeftSignature(itemKey) {
  const leftItems = [];
  for (const item of CLEAN_SEARCH_RIGHT_NAV_LAYOUT_ITEMS) {
    if (item.key === itemKey) break;
    if (isCleanSearchRightNavLayoutItemVisible(item)) {
      leftItems.push(item.key);
    }
  }
  return leftItems.join(",");
}

function getCleanSearchRightPopoverLeftSignatures() {
  const signatures = {};
  CLEAN_SEARCH_RIGHT_POPOVER_CACHE_ITEMS.forEach((item) => {
    signatures[item.key] = getCleanSearchRightPopoverLeftSignature(item.key);
  });
  return signatures;
}

function rememberCleanSearchRightPopoverLeftSignatures() {
  cleanSearchRightPopoverLastLeftSignatures = getCleanSearchRightPopoverLeftSignatures();
}

function deleteCleanSearchRightPopoverCacheEntries(itemKey, leftSignature) {
  let didDelete = false;
  Object.entries(cleanSearchRightPopoverCache).forEach(([cacheKey, entry]) => {
    if (entry.itemKey === itemKey && entry.leftSignature === leftSignature) {
      delete cleanSearchRightPopoverCache[cacheKey];
      didDelete = true;
    }
  });
  return didDelete;
}

function invalidateCleanSearchRightPopoverCacheForLayoutChange() {
  const nextSignatures = getCleanSearchRightPopoverLeftSignatures();
  let didDelete = false;

  Object.entries(nextSignatures).forEach(([itemKey, nextSignature]) => {
    const previousSignature = cleanSearchRightPopoverLastLeftSignatures[itemKey];
    if (previousSignature !== undefined && previousSignature !== nextSignature) {
      didDelete = deleteCleanSearchRightPopoverCacheEntries(itemKey, previousSignature) || didDelete;
    }
  });

  cleanSearchRightPopoverLastLeftSignatures = nextSignatures;
  if (didDelete) {
    updateCleanSearchRightPopoverCacheStyle();
    scheduleCleanSearchRightPopoverCacheWrite();
  }
}

function getCleanSearchRightPopoverMaxRight() {
  const panel = document.getElementById("bili-focus-clean-bg-panel");
  if (cleanSearchBackgroundPanelOpen) {
    if (panel) return panel.getBoundingClientRect().left;
    return window.innerWidth - Math.min(344, window.innerWidth * 0.42);
  }
  return window.innerWidth;
}

function getCleanSearchRightPopoverLayoutKey() {
  const maxRight = Math.round(getCleanSearchRightPopoverMaxRight());
  return `w=${Math.round(window.innerWidth)};right=${maxRight}`;
}

function getCleanSearchRightPopoverCacheKey(item) {
  return [
    item.key,
    `left=${getCleanSearchRightPopoverLeftSignature(item.key)}`,
    getCleanSearchRightPopoverLayoutKey(),
  ].join("|");
}

function getCleanSearchRightPopoverItemDefinition(element) {
  const rightEntry = document.querySelector(".bili-focus-clean-search-mode .right-entry");
  if (!rightEntry || !(element instanceof Element)) return null;
  const child = element.closest(".right-entry > *");
  if (!child || child.parentElement !== rightEntry) return null;
  const childIndex = Array.prototype.indexOf.call(rightEntry.children, child) + 1;
  return CLEAN_SEARCH_RIGHT_POPOVER_CACHE_ITEMS.find((item) => item.childIndex === childIndex) || null;
}

function normalizeCleanSearchRightPopoverCache(value) {
  const normalized = {};
  if (!value || typeof value !== "object") return normalized;

  Object.entries(value).forEach(([cacheKey, entry]) => {
    if (!entry || typeof entry !== "object") return;
    const item = CLEAN_SEARCH_RIGHT_POPOVER_CACHE_ITEMS.find((candidate) => candidate.key === entry.itemKey);
    const shiftX = Math.round(Number(entry.shiftX));
    if (!item || !Number.isFinite(shiftX) || shiftX === 0) return;
    normalized[cacheKey] = {
      itemKey: item.key,
      selector: item.dropdownSelector,
      leftSignature: typeof entry.leftSignature === "string" ? entry.leftSignature : "",
      layoutKey: typeof entry.layoutKey === "string" ? entry.layoutKey : "",
      originalMargin: getCleanSearchSafeCssPixelLength(entry.originalMargin),
      shiftX,
      updatedAt: Number(entry.updatedAt) || 0,
    };
  });

  return normalized;
}

function loadCleanSearchRightPopoverCache(result) {
  cleanSearchRightPopoverCache = normalizeCleanSearchRightPopoverCache(result && result[CLEAN_SEARCH_RIGHT_POPOVER_CACHE_STORAGE_KEY]);
  rememberCleanSearchRightPopoverLeftSignatures();
  updateCleanSearchRightPopoverCacheStyle();
}

function pruneCleanSearchRightPopoverCache() {
  const entries = Object.entries(cleanSearchRightPopoverCache);
  if (entries.length <= CLEAN_SEARCH_RIGHT_POPOVER_CACHE_MAX_ENTRIES) return;

  entries
    .sort(([, first], [, second]) => (Number(first.updatedAt) || 0) - (Number(second.updatedAt) || 0))
    .slice(0, entries.length - CLEAN_SEARCH_RIGHT_POPOVER_CACHE_MAX_ENTRIES)
    .forEach(([cacheKey]) => {
      delete cleanSearchRightPopoverCache[cacheKey];
    });
}

function scheduleCleanSearchRightPopoverCacheWrite() {
  if (cleanSearchRightPopoverCacheWriteTimeout) {
    clearTimeout(cleanSearchRightPopoverCacheWriteTimeout);
  }
  cleanSearchRightPopoverCacheWriteTimeout = setTimeout(() => {
    cleanSearchRightPopoverCacheWriteTimeout = null;
    chrome.storage.local.set({ [CLEAN_SEARCH_RIGHT_POPOVER_CACHE_STORAGE_KEY]: cleanSearchRightPopoverCache });
  }, 250);
}

function getCleanSearchRightPopoverCacheStyle() {
  if (!isCleanSearchActive() || !isCleanSearchRightNavLeftAligned()) return "";
  const rules = [];

  CLEAN_SEARCH_RIGHT_POPOVER_CACHE_ITEMS.forEach((item) => {
    if (!isCleanSearchRightNavLayoutItemVisible(item)) return;
    const cacheKey = getCleanSearchRightPopoverCacheKey(item);
    const entry = cleanSearchRightPopoverCache[cacheKey];
    if (!entry || entry.shiftX === 0) return;
    rules.push(`
      .bili-focus-clean-search-mode.bili-focus-clean-right-nav-left ${item.dropdownSelector} {
        margin-left: ${getCleanSearchClampedMargin(entry.originalMargin, entry.shiftX)} !important;
      }
    `);
  });

  return rules.join("\n");
}

function updateCleanSearchRightPopoverCacheStyle() {
  if (typeof addGlobalStyle !== "function") return;
  addGlobalStyle(getCleanSearchRightPopoverCacheStyle(), CLEAN_SEARCH_RIGHT_POPOVER_CACHE_STYLE_ID);
}

function setCleanSearchRightPopoverCacheEntry(item, shiftX, originalMargin) {
  if (!isCleanSearchActive() || !isCleanSearchRightNavLeftAligned() || !item || !item.dropdownSelector) return;
  const roundedShift = Math.round(Number(shiftX) || 0);
  if (roundedShift === 0) return;

  const leftSignature = getCleanSearchRightPopoverLeftSignature(item.key);
  const layoutKey = getCleanSearchRightPopoverLayoutKey();
  const cacheKey = getCleanSearchRightPopoverCacheKey(item);
  const nextEntry = {
    itemKey: item.key,
    selector: item.dropdownSelector,
    leftSignature,
    layoutKey,
    originalMargin: getCleanSearchSafeCssPixelLength(originalMargin),
    shiftX: roundedShift,
    updatedAt: Date.now(),
  };
  const previousEntry = cleanSearchRightPopoverCache[cacheKey];
  if (
    previousEntry &&
    previousEntry.shiftX === nextEntry.shiftX &&
    previousEntry.originalMargin === nextEntry.originalMargin &&
    previousEntry.leftSignature === nextEntry.leftSignature &&
    previousEntry.layoutKey === nextEntry.layoutKey
  ) {
    return;
  }

  cleanSearchRightPopoverCache[cacheKey] = nextEntry;
  pruneCleanSearchRightPopoverCache();
  updateCleanSearchRightPopoverCacheStyle();
  scheduleCleanSearchRightPopoverCacheWrite();
}

function clearCleanSearchRightPopoverCacheEntry(item) {
  if (!item) return;
  const cacheKey = getCleanSearchRightPopoverCacheKey(item);
  if (!cleanSearchRightPopoverCache[cacheKey]) return;
  delete cleanSearchRightPopoverCache[cacheKey];
  updateCleanSearchRightPopoverCacheStyle();
  scheduleCleanSearchRightPopoverCacheWrite();
}

function getCleanSearchRightPopoverAppliedCache(element) {
  if (!isCleanSearchActive() || !isCleanSearchRightNavLeftAligned()) return null;
  const item = getCleanSearchRightPopoverItemDefinition(element);
  if (!item) return null;
  const cacheKey = getCleanSearchRightPopoverCacheKey(item);
  const entry = cleanSearchRightPopoverCache[cacheKey];
  return entry ? { item, entry } : { item, entry: null };
}

function isVisibleCleanSearchPopover(element) {
  if (!element || element.closest(".center-search-container")) return false;

  const style = window.getComputedStyle(element);
  if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0) {
    return false;
  }

  const rect = element.getBoundingClientRect();
  return rect.width > 20 && rect.height > 20;
}

function getOutermostCleanSearchPopovers(elements) {
  return elements.filter((element) => {
    return !elements.some((other) => other !== element && other.contains(element));
  });
}

function getCleanSearchRightPopoverCandidates() {
  const rightEntry = document.querySelector(".bili-focus-clean-search-mode .right-entry");
  if (!rightEntry || !document.body) return [];

  const rightEntryRect = rightEntry.getBoundingClientRect();
  const rightEntryPopovers = Array.from(rightEntry.querySelectorAll(CLEAN_SEARCH_RIGHT_POPOVER_SELECTOR));
  const bodyPopovers = Array.from(document.body.children).filter((element) => {
    if (!element.matches(CLEAN_SEARCH_RIGHT_POPOVER_SELECTOR)) return false;
    const rect = element.getBoundingClientRect();
    const nearRightNav = rect.right >= rightEntryRect.left - 460 && rect.left <= rightEntryRect.right + 460;
    const nearHeader = rect.top <= rightEntryRect.bottom + 260 && rect.bottom >= rightEntryRect.top - 20;
    return nearRightNav && nearHeader;
  });

  return getOutermostCleanSearchPopovers([...rightEntryPopovers, ...bodyPopovers]);
}

function clampCleanSearchRightPopovers() {
  if (!isCleanSearchActive()) return;

  const minLeft = 0;
  const maxRight = getCleanSearchRightPopoverMaxRight();
  getCleanSearchRightPopoverCandidates().forEach((element) => {
    if (!isVisibleCleanSearchPopover(element)) {
      if (element.dataset.biliFocusRightPopoverClamped === "true") {
        clearCleanSearchPopoverClamp(element);
      }
      return;
    }

    const cacheInfo = getCleanSearchRightPopoverAppliedCache(element);
    const currentMarginLeft = element.style.getPropertyValue("margin-left");
    const clampStillApplied = element.dataset.biliFocusAppliedMarginLeft === currentMarginLeft;
    const wasClamped = element.dataset.biliFocusRightPopoverClamped === "true";
    if (element.dataset.biliFocusRightPopoverClamped === "true" && !clampStillApplied) {
      if (Object.prototype.hasOwnProperty.call(element.dataset, "biliFocusOriginalTransition")) {
        if (element.dataset.biliFocusOriginalTransition === "") {
          element.style.removeProperty("transition");
        } else {
          element.style.setProperty(
            "transition",
            element.dataset.biliFocusOriginalTransition,
            element.dataset.biliFocusOriginalTransitionPriority || ""
          );
        }
      }
      delete element.dataset.biliFocusRightPopoverClamped;
      delete element.dataset.biliFocusOriginalMarginLeft;
      delete element.dataset.biliFocusOriginalMarginLeftPriority;
      delete element.dataset.biliFocusOriginalTransition;
      delete element.dataset.biliFocusOriginalTransitionPriority;
      delete element.dataset.biliFocusAppliedMarginLeft;
      delete element.dataset.biliFocusRightPopoverShift;
    }
    const cachedShiftX = cacheInfo && cacheInfo.entry ? Number(cacheInfo.entry.shiftX || 0) : 0;
    const currentShiftX = clampStillApplied ? Number(element.dataset.biliFocusRightPopoverShift || 0) : cachedShiftX;
    const rect = element.getBoundingClientRect();
    const baseLeft = rect.left - currentShiftX;
    const baseRight = rect.right - currentShiftX;
    let shiftX = 0;
    if (baseLeft < minLeft) {
      shiftX = minLeft - baseLeft;
    } else if (baseRight > maxRight) {
      shiftX = maxRight - baseRight;
    }

    shiftX = Math.round(shiftX);

    if (shiftX === currentShiftX) return;
    if (shiftX === 0) {
      if (cacheInfo && cacheInfo.entry) {
        clearCleanSearchRightPopoverCacheEntry(cacheInfo.item);
      }
      if (wasClamped && clampStillApplied) {
        clearCleanSearchPopoverClamp(element);
      }
      return;
    }

    const rawOriginalMargin = clampStillApplied
      ? element.dataset.biliFocusOriginalMarginLeft || "0px"
      : element.style.getPropertyValue("margin-left") || "";
    const originalMargin = cacheInfo && cacheInfo.entry
      ? cacheInfo.entry.originalMargin
      : rawOriginalMargin || "0px";
    if (cacheInfo && cacheInfo.item) {
      setCleanSearchRightPopoverCacheEntry(cacheInfo.item, shiftX, originalMargin);
    }
    if (element.dataset.biliFocusRightPopoverClamped !== "true") {
      element.dataset.biliFocusOriginalMarginLeft = rawOriginalMargin;
      element.dataset.biliFocusOriginalMarginLeftPriority = element.style.getPropertyPriority("margin-left") || "";
      element.dataset.biliFocusOriginalTransition = element.style.getPropertyValue("transition") || "";
      element.dataset.biliFocusOriginalTransitionPriority = element.style.getPropertyPriority("transition") || "";
    }
    const clampedMargin = getCleanSearchClampedMargin(originalMargin, shiftX);
    element.style.setProperty("transition", "none", "important");
    element.style.setProperty("margin-left", clampedMargin, "important");
    element.dataset.biliFocusAppliedMarginLeft = clampedMargin;
    element.dataset.biliFocusRightPopoverShift = String(shiftX);
    element.dataset.biliFocusRightPopoverClamped = "true";
  });
}

function scheduleCleanSearchRightPopoverClamp() {
  if (!isCleanSearchActive()) return;
  if (cleanSearchRightPopoverRaf) return;

  cleanSearchRightPopoverRaf = requestAnimationFrame(() => {
    cleanSearchRightPopoverRaf = 0;
    clampCleanSearchRightPopovers();
  });
}

function scheduleCleanSearchRightPopoverClampBurst() {
  updateCleanSearchRightPopoverCacheStyle();
  scheduleCleanSearchRightPopoverClamp();
  cleanSearchRightPopoverTimeouts.forEach(clearTimeout);
  cleanSearchRightPopoverTimeouts = [];
  [60, 180].forEach((delay) => {
    cleanSearchRightPopoverTimeouts.push(setTimeout(scheduleCleanSearchRightPopoverClamp, delay));
  });
}

function getCleanSearchRightNavItem(target) {
  if (!(target instanceof Element)) return null;
  const rightEntry = document.querySelector(".bili-focus-clean-search-mode .right-entry");
  if (!rightEntry) return null;
  const item = target.closest(".right-entry > *");
  return item && rightEntry.contains(item) ? item : null;
}

function handleCleanSearchRightPopoverInteraction(event) {
  const item = getCleanSearchRightNavItem(event.target);
  if (!item || item === cleanSearchRightPopoverHoveredItem) return;

  cleanSearchRightPopoverHoveredItem = item;
  scheduleCleanSearchRightPopoverClampBurst();
}

function dispatchCleanSearchRightNavExitEvents(element) {
  if (!(element instanceof Element)) return;

  const relatedTarget = document.body || null;
  const baseOptions = {
    bubbles: true,
    cancelable: true,
    relatedTarget,
    view: window,
  };

  if (typeof PointerEvent === "function") {
    element.dispatchEvent(new PointerEvent("pointerout", { ...baseOptions, pointerType: "mouse" }));
    element.dispatchEvent(new PointerEvent("pointerleave", { ...baseOptions, bubbles: false, pointerType: "mouse" }));
  }
  element.dispatchEvent(new MouseEvent("mouseout", baseOptions));
  element.dispatchEvent(new MouseEvent("mouseleave", { ...baseOptions, bubbles: false }));
}

function closeCleanSearchRightPopoversForNormalMode() {
  const rightEntry = document.querySelector(".bili-focus-clean-search-mode .right-entry");
  const popovers = getCleanSearchRightPopoverCandidates();

  popovers.forEach(clearCleanSearchPopoverClamp);
  cleanSearchRightPopoverHoveredItem = null;

  if (rightEntry) {
    const exitTargets = new Set([rightEntry, ...Array.from(rightEntry.children)]);
    rightEntry.querySelectorAll(".v-popover-wrap, .right-entry-item, a, button, li").forEach((element) => {
      exitTargets.add(element);
    });
    Array.from(exitTargets).reverse().forEach(dispatchCleanSearchRightNavExitEvents);

    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement && rightEntry.contains(activeElement)) {
      activeElement.blur();
    }
  }

  const refreshNormalLayout = () => {
    popovers.forEach(clearCleanSearchPopoverClamp);
    window.dispatchEvent(new Event("resize"));
  };
  requestAnimationFrame(refreshNormalLayout);
  setTimeout(refreshNormalLayout, 80);
}

function stopCleanSearchRightPopoverClamp() {
  if (cleanSearchRightPopoverObserver) {
    cleanSearchRightPopoverObserver.disconnect();
    cleanSearchRightPopoverObserver = null;
  }
  if (cleanSearchRightPopoverRaf) {
    cancelAnimationFrame(cleanSearchRightPopoverRaf);
    cleanSearchRightPopoverRaf = 0;
  }
  cleanSearchRightPopoverTimeouts.forEach(clearTimeout);
  cleanSearchRightPopoverTimeouts = [];
  cleanSearchRightPopoverHoveredItem = null;

  if (cleanSearchRightPopoverListenersActive) {
    document.removeEventListener("pointerover", handleCleanSearchRightPopoverInteraction, true);
    document.removeEventListener("focusin", handleCleanSearchRightPopoverInteraction, true);
    window.removeEventListener("resize", scheduleCleanSearchRightPopoverClampBurst);
    cleanSearchRightPopoverListenersActive = false;
  }

  document.querySelectorAll("[data-bili-focus-right-popover-clamped]").forEach(clearCleanSearchPopoverClamp);
  updateCleanSearchRightPopoverCacheStyle();
}

function updateCleanSearchRightPopoverClamp(shouldRun) {
  if (!shouldRun || !document.body) {
    stopCleanSearchRightPopoverClamp();
    return;
  }
  if (cleanSearchRightPopoverListenersActive) {
    scheduleCleanSearchRightPopoverClampBurst();
    return;
  }

  document.addEventListener("pointerover", handleCleanSearchRightPopoverInteraction, true);
  document.addEventListener("focusin", handleCleanSearchRightPopoverInteraction, true);
  window.addEventListener("resize", scheduleCleanSearchRightPopoverClampBurst, { passive: true });
  cleanSearchRightPopoverListenersActive = true;

  cleanSearchRightPopoverObserver = new MutationObserver(() => {
    scheduleCleanSearchRightPopoverClamp();
  });
  cleanSearchRightPopoverObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "style"],
  });

  scheduleCleanSearchRightPopoverClampBurst();
}

function applyCleanSearchMode() {
  const root = document.documentElement;
  const active = isCleanSearchActive();
  const wasActive = root.classList.contains("bili-focus-clean-search-mode");
  const wasRightNavLeftAligned = root.classList.contains("bili-focus-clean-right-nav-left");
  const rightNavLeftAligned = active && isCleanSearchRightNavLeftAligned();
  if (wasActive && (!active || (active && wasRightNavLeftAligned !== rightNavLeftAligned))) {
    closeCleanSearchRightPopoversForNormalMode();
  }
  root.classList.toggle("bili-focus-clean-search-mode", active);
  root.classList.toggle("bili-focus-clean-right-nav-left", rightNavLeftAligned);
  root.classList.toggle("bili-focus-clean-right-nav-right", active && !rightNavLeftAligned);

  if (!active) {
    applyCleanSearchBackgroundVars();
    updateCleanSearchBackgroundLayer(false);
    updateCleanSearchBackgroundButton(false);
    updateCleanSearchBrand(false);
    updateCleanSearchRightPopoverClamp(false);
    removeGlobalStyle("bili-focus-style-cleansearch");
    removeGlobalStyle(CLEAN_SEARCH_RIGHT_POPOVER_CACHE_STYLE_ID);
    clearCleanSearchForegroundAttributes();
    return;
  }

  applyCleanSearchBackgroundVars();
  updateCleanSearchForegroundTheme();
  addGlobalStyle(getCleanSearchModeStyle(), "bili-focus-style-cleansearch");
  updateCleanSearchBackgroundLayer(true);
  updateCleanSearchBackgroundButton(true);
  updateCleanSearchBrand(true);
  updateCleanSearchRightPopoverCacheStyle();
  updateCleanSearchRightPopoverClamp(true);
  if (cleanSearchBackgroundPanelOpen) renderCleanSearchBackgroundPanel();
}
