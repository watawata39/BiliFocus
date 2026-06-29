// Main content script
// Clean Search Mode helpers are loaded from clean-search.js before this file.

// Functions
function addGlobalStyle(css, id = "bili-focus-style") {
  let existingStyle = document.getElementById(id);
  
  if (existingStyle) {  // Update existing style if already added
    existingStyle.innerHTML = css;
  } else {
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = css;
    document.documentElement.appendChild(style);
  }
}

function removeGlobalStyle(id = "bili-focus-style") {
  const style = document.getElementById(id);
  if (style) {
    style.remove();
  }
}

// searchrecom: store original placeholder/title for restore when option is turned off
var original_placeholder = '', original_title = '';
var searchrecomObserver = null; // one-shot observer to clear search inputs when they appear
const SEARCH_INPUT_SELECTORS = ".nav-search-input, .nav-search-keyword, #nav-searchform > div.p-relative.search-bar.over-hidden.border-box.t-nowrap > input";
const SEARCH_INPUT_PLACEHOLDER_SELECTORS = ".nav-search-input::placeholder, .nav-search-keyword::placeholder, #nav-searchform > div.p-relative.search-bar.over-hidden.border-box.t-nowrap > input::placeholder";
function clearSearchInputSuggestions() {
  function clearInputs() {
    const inputs = document.querySelectorAll(SEARCH_INPUT_SELECTORS);
    if (inputs.length === 0) return false;
    const first = inputs[0];
    if (original_placeholder === '' && original_title === '') {
      original_placeholder = first.getAttribute("placeholder") || '';
      original_title = first.getAttribute("title") || '';
    }
    inputs.forEach(el => {
      el.setAttribute("placeholder", "");
      el.setAttribute("title", "");
    });
    return true;
  }
  if (!document.body) return;
  if (clearInputs()) return;
  if (searchrecomObserver) {
    searchrecomObserver.disconnect();
    searchrecomObserver = null;
  }
  searchrecomObserver = new MutationObserver(() => {
    if (clearInputs()) {
      searchrecomObserver.disconnect();
      searchrecomObserver = null;
    }
  });
  searchrecomObserver.observe(document.body, { childList: true, subtree: true });
}

function getCookieValue(cookieName) {
    const match = document.cookie.match('(^|;)\\s*' + cookieName + '=([^;]*)');
    return match ? match[2] : null;
}


function addVidrecomObserver(run = false) {
  const callback = () => {
    const recom_container = document.querySelector(".bpx-player-ending-related");
    if (!recom_container) return;  // if the recoms' container not present, quit
    const cancel_btn = document.querySelector(".bpx-player-ending-related-item-cancel");
    const countdown = document.querySelector(".bpx-player-ending-related-item-countdown");
    if (cancel_btn && countdown) {
      // 自动连播 is on, show the 取消连播 option
      cancel_btn.style.visibility = 'visible';cancel_btn.style.pointerEvents = 'auto';
      countdown.style.visibility = 'visible';countdown.style.pointerEvents = 'auto';
    }
  };
  const targetNode = document.querySelector(".bpx-player-ending-panel");
  if (!targetNode) return;
  window.vidrecom_observer = new MutationObserver(callback);
  window.vidrecom_observer.observe(targetNode, { childList: true, subtree: true });
  if (run) {callback();}
}

// Code start

function clean_navigation_bar(shouldHide = true) {
  let target_entries = [document.querySelector(".left-entry"),           // for most pages
                        document.querySelector(".nav-link-ul.mini")];    // as of now, only aware of usage in https://live.bilibili.com/p/html/live-fansmedal-wall/#/view-medal

  for (let target_entry of target_entries) {
    if (target_entry) {
      let is_first = true;
      Array.from(target_entry.children).forEach((target) => {
        if (is_first) {
          is_first = false;
          return;
        }
        if (shouldHide && shouldHideSetting("leftnavi")) {
          target.style.visibility = "hidden";
          target.style.pointerEvents = "none";
        } else {
          target.style.visibility = "visible";
          target.style.pointerEvents = "auto";
        }
      });
    }
  }
}

// Get stored info
const settings = { // these are the defaults, initialise to all true
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
  cleansearchmode: true,
  cleansearchrightnavleft: true,
};
const personal_page_prefrences = ["myvideos","myfavourites","subanimes","recentcoins","recentlikes","collections","columns","usrpageleftsidebar"];
const right_navi_preferences = ["membership", "messages", "dongtai", "favourites", "history", "tougao"];
// In this table, "styles" selectors are hidden with visibility/pointer-events/display:none.
// "styles2" selectors are hidden with visibility/pointer-events only.
const modifications = {
  // CSS only for the homepage recommendation layout itself.
  homepagerecom: [
    ["styles", ".bili-feed4-layout,.bili-header__channel,.header-channel,.palette-button-wrap,.bili-footer,"],],
  // CSS hides the recommendation surfaces. addVidrecomObserver() does not hide extra nodes; it re-enables cancel/countdown controls inside Bilibili's ending panel when autoplay is on.
  vidrecom: [
    ["styles", ".recommend-list-v1,.pop-live-small-mode,div[class^='recommend_wrap'],"],
    ["styles2", ".bpx-player-ending-related,"],],
  // CSS only.
  comments: [
    ["styles", `#commentapp,iframe[name="DMdl"],#comment-module,.bili-dyn-item__footer > :nth-child(2),`],],
  // CSS covers known static structures. clean_navigation_bar() also hides later-rendered left-entry/nav-link-ul children inline, and the bottom observer hides the first 首页 dropdown (.is-bottom-start).
  leftnavi: [
    ["styles2", ".left-entry > li:first-child > a:first-child > div:nth-child(2),.left-entry > :nth-child(2),.left-entry > :nth-child(3),.left-entry > :nth-child(4),.left-entry > :nth-child(5),.left-entry > :nth-child(6),.left-entry > :nth-child(7),.left-entry > :nth-child(8),.left-entry > :nth-child(9),.left-entry > :nth-child(10),.left-entry > :nth-child(11),.left-entry > :nth-child(12),"], // this style2 is to immediately hide the fixed parts of the leftnavi to eliminate the flash effect
    ["styles2", ".nav-link-ul.mini > :nth-child(3),.nav-link-ul.mini > :nth-child(4),.nav-link-ul.mini > :nth-child(5),.nav-link-ul.mini > :nth-child(6),.nav-link-ul.mini > :nth-child(7),.nav-link-ul.mini > :nth-child(8),.nav-link-ul.mini > :nth-child(9),.nav-link-ul.mini > :nth-child(10),.nav-link-ul.mini > :nth-child(11),.nav-link-ul.mini > :nth-child(12),"],
    ["styles2", "#biliMainHeader > div > div > ul.BiliHeaderV3_leftEntry__TrayO > li:first-child > a:first-child > div:nth-child(2),#biliMainHeader > div > div > ul.BiliHeaderV3_leftEntry__TrayO > :nth-child(2),#biliMainHeader > div > div > ul.BiliHeaderV3_leftEntry__TrayO > :nth-child(3),#biliMainHeader > div > div > ul.BiliHeaderV3_leftEntry__TrayO > :nth-child(4),#biliMainHeader > div > div > ul.BiliHeaderV3_leftEntry__TrayO > :nth-child(5),#biliMainHeader > div > div > ul.BiliHeaderV3_leftEntry__TrayO > :nth-child(6),#biliMainHeader > div > div > ul.BiliHeaderV3_leftEntry__TrayO > :nth-child(7),"], // elements that flash by when bilibili.com/bangumi/play is loaded
    ["styles2", "#prehold-nav-vm > div > div:nth-of-type(n+3):nth-of-type(-n+16),"],  // elements that flash by when https://live.bilibili.com/ is loaded
    ["styles2", "#left-part > div > div > div.flex-block > div,#left-part > div > div > div.flex-block > div > div > div.dp-table-cell.v-middle,#left-part > div > div > div.showmore-link.p-relative.f-left,"], // streaming page
  ],
  // CSS hides recommendation/trending panels. clearSearchInputSuggestions() also clears search input placeholder/title via JS, and hideElements() adds placeholder CSS to prevent text flash.
  searchrecom: [
    ["styles", ".trending,.bili-dyn-topic-box,.topic-panel,.channel-menu-mini,.bili-dyn-search-trendings,"],
  ],
  // CSS only in normal mode. Clean Search has separate right-navigation display rules in clean-search.js.
  membership: [
    ["styles2", 'div.vip-wrap,'],
  ],
  // CSS only in normal mode. Clean Search has separate right-navigation display rules in clean-search.js.
  messages: [
    ["styles2", '.right-entry > :nth-child(3),'],
  ],
  // CSS only in normal mode. Clean Search has separate right-navigation display rules in clean-search.js.
  dongtai: [
    ["styles2", '.right-entry > :nth-child(4),'],
  ],
  // CSS only in normal mode. Clean Search has separate right-navigation display rules in clean-search.js.
  favourites: [
    ["styles2", '.right-entry > :nth-child(5),'],
  ],
  // CSS only in normal mode. Clean Search has separate right-navigation display rules in clean-search.js.
  history: [
    ["styles2", '.right-entry > :nth-child(6),'],
  ],
  // CSS only in normal mode. Clean Search has separate right-navigation display rules in clean-search.js.
  tougao: [
    ["styles2", '.right-entry > :nth-child(7),'], // 创意中心 icon
    ["styles2", '.right-entry > :nth-child(8),.right-entry .header-upload-entry,'], // 投稿 icon, the second is for the icon that flashes on load in video streaming page
  ],
  // CSS only. Common ad containers use direct selectors; main/search ad cards use :has() to detect inner ad markers.
  ads: [
    ["styles", "#slide_ad,.ad-report,.video-card-ad-small,.adcard-content,.bili-dyn-ads,.head-title,.ad-img,.adcard,div.section.game,div.video-page-game-card-small,"],  // other ad containers
    ["styles2", ".bili-feed-card:has(a.bili-video-card__image--link[href*=\"ad_card\"]),.bili-video-card:has(.bili-video-card__stats--ad),"],],  // ad video cards on main page and search page respectively. The former does not distinguish between ad and 创意推广
  // CSS only; hideElements() applies this only on the signed-in user's own personal page.
  myvideos: [
    ["styles", "div.section.i-pin-v,div.section.video,"], // for legacy UI
    ["styles", "#app > main > div.space-home > div.content > :nth-child(1),#app > main > div.space-home > div.content > :nth-child(2),"],],
  // CSS only; hideElements() applies this only on the signed-in user's own personal page.
  myfavourites: [
    ["styles", "div.section.fav,"], // for legacy UI
    ["styles", "#app > main > div.space-home > div.content > :nth-child(3),"],],
  // CSS only; hideElements() applies this only on the signed-in user's own personal page.
  subanimes: [
    ["styles", "div.section.bangumi,"], // for legacy UI
    ["styles", "#app > main > div.space-home > div.content > :nth-child(4),"],],
  // CSS only; hideElements() applies this only on the signed-in user's own personal page.
  recentcoins: [
    ["styles", "div.col-1 > :nth-child(5),"], // for legacy UI
    ["styles", "#app > main > div.space-home > div.content > :nth-child(5),"],],
  // CSS only; hideElements() applies this only on the signed-in user's own personal page.
  collections: [
    ["styles", "div.section.channel,"], // for legacy UI
    ["styles", "#app > main > div.space-home > div.content > :nth-child(6),"],],
  // CSS only; hideElements() applies this only on the signed-in user's own personal page.
  columns: [
    ["styles", "div.section.article,"], // for legacy UI
    ["styles", "#app > main > div.space-home > div.content > :nth-child(7),"],],
  // CSS only; hideElements() applies this only on the signed-in user's own personal page.
  recentlikes: [
    ["styles", "div.col-1 > :nth-child(8),"], // for legacy UI
    ["styles", "#app > main > div.space-home > div.content > :nth-child(8),"],],
  // CSS only; hideElements() applies this only on the signed-in user's own personal page.
  usrpageleftsidebar: [ // last 1 is legacy
    ["styles", "div.aside,div.col-2,"]],
  // No selectors here. applyCleanSearchMode() in clean-search.js injects the Clean Search layout.
  cleansearchmode: [],
  // No selectors here. Clean Search uses this to decide whether right-navi items are moved to the left; when they are, clean-search.css hides the left navi on the main page without changing the leftnavi preference.
  cleansearchrightnavleft: [],
};


// this is the core function to hiding the sections
// before_dom_load is the flag to indicate whether this function is called before the DOM is loaded (see bottom of script for usage)
function hideElements(before_dom_load = false) {
  // Prevent multiple rapid calls to hideElements
  const currentTime = Date.now();
  if (!before_dom_load && currentTime - lastHideElementsTime < HIDE_ELEMENTS_MIN_DELAY) {
    return;
  }
  lastHideElementsTime = currentTime;
  
  let styles = ""; // classes to be removed via global css insertment
  let styles2 = "";  // without the display = false field
  // Detect whether it is the user's personal page
  let is_personal_page = false;

  if (window.location.href.includes("space.bilibili.com/"+getCookieValue("DedeUserID")))
    {is_personal_page = true;}
  Object.entries(settings).forEach(([key, value]) => {
    if (!shouldHideSetting(key)) return;
    if (!modifications[key]) return;
    if (!is_personal_page && personal_page_prefrences.includes(key)) return; // if current page is not the user's personal page and the current key is a personal-page-specific one, don't execute
    for (const instruction of modifications[key]) {
      switch (instruction[0]) {
        case "styles":
          styles += instruction[1];
          break;
        case "styles2":
          styles2 += instruction[1];
          break;
      }
    }
    if (key == "leftnavi") {
      clean_navigation_bar();
      setTimeout(clean_navigation_bar, 150);  // call again to clean any later-added items
    } else
    if (key == "searchrecom") {
      clearSearchInputSuggestions();
    }
  });

  if (!shouldHideSetting("leftnavi")) {
    clean_navigation_bar(false);
  }

  // Hide search box placeholder text via CSS to prevent flash before JS clears attributes
  if (shouldHideSetting("searchrecom")) {
    addGlobalStyle(`${SEARCH_INPUT_PLACEHOLDER_SELECTORS} { color: transparent !important; opacity: 0 !important; }`, "bili-focus-style-searchrecom");
  } else {
    addGlobalStyle("", "bili-focus-style-searchrecom");
  }

  if (styles !== "") {
    addGlobalStyle(`${styles.substring(0, styles.length - 1)}
     {
        visibility: hidden !important;
        pointer-events: none !important;
        display: none !important;
      }
    `, "bili-focus-style-1");
  } else {
    addGlobalStyle('', "bili-focus-style-1");
  }
  if (styles2 !== "") {
    addGlobalStyle(`${styles2.substring(0, styles2.length - 1)}
     {
        visibility: hidden !important;
        pointer-events: none !important;
      }
    `, "bili-focus-style-2");
  } else {
    addGlobalStyle('', "bili-focus-style-2");
  }
  applyCleanSearchMode();
}

let lastRunTime = 0; // limit the number of calls of runMainCode
const MIN_DELAY = 100;
let is_first_personal_page_check = true;
let lastHideElementsTime = 0; // limit the number of calls of hideElements
const HIDE_ELEMENTS_MIN_DELAY = 50;
function initialLogicBody() {
  chrome.storage.local.get([...Object.keys(settings), "language", ...CLEAN_SEARCH_BACKGROUND_STORAGE_KEYS], function(result) {
    Object.keys(settings).forEach(key => {
      settings[key] = result[key] !== undefined ? result[key] : settings[key];
    });
    loadCleanSearchBackgroundSettings(result);
    updateCleanSearchLanguage(result.language);
    // Execute code after retrieving data
    function runMainCode(check = true) {
      const currentTime = Date.now();
      if (check && currentTime - lastRunTime < MIN_DELAY) return;
      lastRunTime = currentTime;
      hideElements();
    }

    // Execute main program if page refreshes
    window.runLogicObserver = new MutationObserver((mutations) => {
      // Skip if we're currently processing updates to prevent interference
      if (isProcessingUpdates) {
        return;
      }
      
      const mutation_targets = ["left-entry", "bili-header", "bili-header__bar", "mini-header", "right-entry", "vip-wrap", "vip-popover-wrap", "nav-link", "nav-link-ul"];
      mutations.forEach((mutation) => {
        if (is_first_personal_page_check && mutation.target.classList.contains("section-title")) {
          is_first_personal_page_check = false;
          runMainCode(false);
          return;
        }
        const targetClasses = Array.from(mutation.target.classList);
        if ((targetClasses.some(className => mutation_targets.includes(className)))
          ) {
          runMainCode();
        }
      });
    });
    window.runLogicObserver.observe(document.body, { childList: true, subtree: true });
    // Add observer for video end's recommendations, doing specific things when auto play is on / off
    if (window.location.href.includes("bilibili.com/video") && settings.vidrecom) {
      addVidrecomObserver();
    }

    window.addEventListener("popstate", () => {
      // Skip if we're currently processing updates to prevent interference
      if (isProcessingUpdates) {
        return;
      }
      runMainCode();
    });

    // And just run once anyways
    runMainCode();
  });
}

// Debounce mechanism to prevent multiple rapid calls to hideElements
let hideElementsTimeout = null;
let isProcessingUpdates = false;

// Listen to change in block options (message from popup.js)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateCheckbox") {
    // Prevent processing if we're already handling updates
    if (isProcessingUpdates) {
      return;
    }
    
    settings[request.field] = request.value;

    if (
      right_navi_preferences.includes(request.field) &&
      isCleanSearchActive() &&
      typeof closeCleanSearchRightPopoversForNormalMode === "function"
    ) {
      closeCleanSearchRightPopoversForNormalMode();
    }
    
    if (request.value == true) {     // if the user turned the option on
      if (request.field == "vidrecom") {
        addVidrecomObserver(true);
      }
    } else {                         // if the user turned the option off
      if (request.field == "leftnavi" || request.field == "cleansearchmode" || request.field == "cleansearchrightnavleft") {
        clean_navigation_bar(false);
      } else 
      if (request.field == "searchrecom") {
        if (searchrecomObserver) {
          searchrecomObserver.disconnect();
          searchrecomObserver = null;
        }
        // Page loaded with searchrecom on: we never captured originals, so use 搜索
        const place = original_placeholder !== '' ? original_placeholder : '搜索';
        const title = original_title !== '' ? original_title : '';
        document.querySelectorAll(SEARCH_INPUT_SELECTORS).forEach(el => {
          el.setAttribute("placeholder", place);
          if (title !== '') el.setAttribute("title", title);
          else el.removeAttribute("title");
        });
      }
    }
    
    // Clear any existing timeout and set a new one
    if (hideElementsTimeout) {
      clearTimeout(hideElementsTimeout);
    }
    
    // Use debouncing to prevent multiple rapid calls
    hideElementsTimeout = setTimeout(() => {
      isProcessingUpdates = true;
      hideElements();

      isProcessingUpdates = false;
      hideElementsTimeout = null;
    }, 100); // 100ms delay to catch bulk updates
  }
});

// main initilizing logic would execute after DOM fully loads, however, 
// calling hideElements to inject critical CSS right away. 
// This is to prevent contents from "flashing" before being hidden.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialLogicBody);
} else {
  initialLogicBody();
}
chrome.storage.local.get([...Object.keys(settings), "language", ...CLEAN_SEARCH_BACKGROUND_STORAGE_KEYS], function(result) {
  Object.keys(settings).forEach(key => {
    settings[key] = result[key] !== undefined ? result[key] : settings[key];
  });
  loadCleanSearchBackgroundSettings(result);
  updateCleanSearchLanguage(result.language);
  hideElements(true);
});

// following code is to implement the "/" shortcut to focus search bar
let enableSlashFocus = true;
chrome.storage.local.get(['slashfocus'], function (result) {
  if (result.slashfocus !== undefined) {
    enableSlashFocus = !!result.slashfocus;
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && Object.prototype.hasOwnProperty.call(changes, 'slashfocus')) {
    enableSlashFocus = !!changes.slashfocus.newValue;
  }
  if (area === 'local' && Object.prototype.hasOwnProperty.call(changes, 'language')) {
    updateCleanSearchLanguage(changes.language.newValue);
  }
  if (area === 'local' && CLEAN_SEARCH_BACKGROUND_STORAGE_KEYS.some((key) => Object.prototype.hasOwnProperty.call(changes, key))) {
    updateCleanSearchBackgroundSettingsFromChanges(changes);
  }
});

window.addEventListener("resize", scheduleCleanSearchForegroundThemeUpdate, { passive: true });

function focusBiliSearch() {
  // the elements below are found in 1. search results page 2. right navi pages 3. streaming page 4. game center 5. game search page 6. shopping page 7. manga main page 8. manga detail pages 9. shopping item detail page n. main page & left navi pages & user home page & anime page
  // there is a keyword conflict in game streaming page, ignoring the issue for now
  let input = document.querySelector("input.search-input-el") || document.querySelector("div.topbar > div.right > div.search-input > input[type=text]") || document.querySelector("input.nav-search-content") || document.querySelector("#biliGameHeader > header > div.nav-search > input[type=text]") || document.querySelector("div.bili-game-header-nav-search > input[type=text]") || document.querySelector("#app > div.nav-header-wrapper > div > div.nav-header-search-bar-wrapper > input") || document.querySelector("input#keyword-search") || document.querySelector("input.search-input") || document.querySelector("input.nav-header-search-bar") || document.querySelector("input.nav-search-input");
  if (!input) return false;

  // Smoothly scroll the search box into the center of the viewport
  input.scrollIntoView({ behavior: "smooth", block: "center" });

  // focus to search box
  input.focus({ preventScroll: true });
  // select existing text
  const selectText = () => {
    if (input.value && input.value.length > 0) {
      const wasReadOnly = input.readOnly;
      const wasDisabled = input.disabled;
      if (wasReadOnly) input.readOnly = false;
      if (wasDisabled) input.disabled = false;
      
      try {
        input.select();
      } catch (e) {
        if (input.setSelectionRange) {
          input.setSelectionRange(0, input.value.length);
        }
      }
      if (wasReadOnly) input.readOnly = true;
      if (wasDisabled) input.disabled = false;
    }
  };
  selectText();
  requestAnimationFrame(() => {
    selectText();
  });
  setTimeout(() => {
    selectText();
  }, 1);
  
  return true;
}

document.addEventListener(
  "keydown",
  (e) => {
    if (!enableSlashFocus) return;
    // only plain "/" (ignore Ctrl/Cmd/Alt combos)
    if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) return;

    // don’t hijack when the user is already typing somewhere
    const t = e.target;
    const typing =
      t instanceof HTMLInputElement ||
      t instanceof HTMLTextAreaElement ||
      t?.isContentEditable;
    if (typing) return;

    e.preventDefault();
    focusBiliSearch();
  },
  true
);

// observer to hide dropdown menu from 首页 button at leftnavi if settings.leftnavi is true
(() => {
  let liObserver = null;       // observer for the first li (hides dropdown)
  let managerObserver = null;  // temporary observer that detects rerenders
  let currentLi = null;        // the li currently observing

  function hideIfPresent(li) {
    const target = li.querySelector(":scope > .is-bottom-start");
    if (!target) return;

    if (!shouldHideSetting("leftnavi")) {
      target.style.display = "";
      target.style.visibility = "";
      target.style.pointerEvents = "";
      return;
    }

    target.style.display = "none";
    target.style.visibility = "hidden";
    target.style.pointerEvents = "none";
  }

  function findFirstLi() {
    const ul = document.querySelector("ul.left-entry");
    if (!ul) return null;
    return ul.firstElementChild || null;
  }

  function attachToLi(li) {
    // If we're already attached to this exact node, do nothing
    if (li === currentLi) return;

    if (liObserver) {
      liObserver.disconnect();
      liObserver = null;
    }

    currentLi = li;

    // In case dropdown is already present for whatever reason
    hideIfPresent(li);

    liObserver = new MutationObserver(() => hideIfPresent(li));
    liObserver.observe(li, { childList: true });
  }

  function tryAttach() {
    // Gate: this is the 首页 button for the dropdown menu. Checking for it. 
    if (!document.querySelector("div.mini-header__title")) return false;

    const li = findFirstLi();
    if (!li) return false;

    attachToLi(li);
    return true;
  }

  function startManagerObserver() {
    if (managerObserver) return;

    managerObserver = new MutationObserver(() => {
      const li = findFirstLi();
      if (!li) return;

      if (currentLi !== li) {
        attachToLi(li);
      }
    });

    managerObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    // stop checking after 10 seconds
    setTimeout(() => {
      if (managerObserver) {
        managerObserver.disconnect();
        managerObserver = null;
      }
    }, 10000);
  }

  function bootstrap() {
    tryAttach();
    startManagerObserver();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap, { once: true });
  } else {
    bootstrap();
  }
})();
