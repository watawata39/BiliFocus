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

function hideDropdownOnHover() {
  if (!document.body) return; // DOM not ready

  if (!window.hideDropdownObserver) {
    window.hideDropdownObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (
            node.nodeType === Node.ELEMENT_NODE &&
            node.classList.contains("is-bottom-start")
          ) {
            node.style.visibility = "hidden";
            node.style.pointerEvents = "none";
            node.style.display = "none";
          }
        }
      }
    });
  }

  window.hideDropdownObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

function remove_by_element(target, remove = true) {
  // remove = true -> remove element
  // remove = false -> display element
  if (remove) {
    target.style.visibility = "hidden";
    target.style.pointerEvents = "none";
  } else {
    target.style.visibility = "visible";
    target.style.pointerEvents = "auto";
  }
}

// searchrecom: store original placeholder/title for restore when option is turned off
var original_placeholder = '', original_title = '';
var searchrecomObserver = null; // one-shot observer to clear search inputs when they appear
function clearSearchInputSuggestions() {
  function clearInputs() {
    const inputs = document.querySelectorAll(".nav-search-input, .nav-search-keyword");
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

rafmr_lastRunTime = 0;
RAFMR_MINDELAY = 100;
function remove_ads_from_mainpagerecom(remove = true) {
  const currentTime = Date.now();
  if (currentTime - rafmr_lastRunTime < RAFMR_MINDELAY) return;
  rafmr_lastRunTime = currentTime;
  // console.log("BiliFocus: Removing ads from homepage recommendations...");
  if (!settings.homepagerecom || window.location.href.includes("search.bilibili.com")) {
    const ad_icons = document.querySelectorAll(".bili-video-card__info--ad"); // the old version, but still needed for the ads on search.bilibili.com
    ad_icons.forEach((element) => {
      remove_by_element(element.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement, remove);
    });
    const ad_images = document.querySelectorAll('img[src*="bfs/sycp/sanlian/image"]');  // for the new version ads on the main page
    ad_images.forEach((element) => {
      remove_by_element(element.closest('.bili-feed-card'), remove);
    });
    // This cannot select the mini-program ads
    // const ad_cards = Array.from(  // for the new web version; .vui_icon is the rocket icon of 创意推广, which is not to be included in the array
    //   document.querySelectorAll('a.bili-video-card__image--link[href^="//cm.bilibili.com"][href*="ad_card"]')
    // ).filter(link => !link.querySelector('.vui_icon'));
    // ad_cards.forEach((element) => {
    //   remove_by_element(element.closest('.bili-feed-card'), remove);
    // });
  }
}

function repeat_n_times(n, interval, func) {
  let count = 0;
  func();
  count++;
  const intervalId = setInterval(() => {
    if (count >= n) {
      clearInterval(intervalId);
      return;
    }
    func();
    count++;
  }, interval);
}

function getCookieValue(cookieName) {
    const match = document.cookie.match('(^|;)\\s*' + cookieName + '=([^;]*)');
    return match ? match[2] : null;
}

function addVidrecomObserver(run = false) {
  const callback = () => {
    // console.log("BiliFocus: reacting to post-video recommendations.");
    const recom_container = document.querySelector(".bpx-player-ending-related");
    if (!recom_container) return;  // if the recoms' container not present, quit
    const cancel_btn = document.querySelector(".bpx-player-ending-related-item-cancel");
    const countdown = document.querySelector(".bpx-player-ending-related-item-countdown");
    if (cancel_btn && countdown) {
      // 自动连播 is on, show the 取消连播 option
      // console.log("BiliFocus: auto play is on, making modifications...");
      cancel_btn.style.visibility = 'visible';cancel_btn.style.pointerEvents = 'auto';
      countdown.style.visibility = 'visible';countdown.style.pointerEvents = 'auto';
    } else {
      // console.log("BiliFocus: auto play not detected.");
    }
  };
  const targetNode = document.querySelector(".bpx-player-ending-panel");
  if (!targetNode) return;
  window.vidrecom_observer = new MutationObserver(callback);
  // console.log("BiliFocus: adding post video observer.");
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
        if (shouldHide && settings.leftnavi) {
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
};
const personal_page_prefrences = ["myvideos","myfavourites","subanimes","recentcoins","recentlikes","collections","columns","usrpageleftsidebar"];
const modifications = {
  homepagerecom: [
    ["styles", ".bili-feed4-layout,.bili-header__channel,.header-channel,.palette-button-wrap,.bili-footer,"],],
  vidrecom: [
    ["styles", ".recommend-list-v1,.pop-live-small-mode,div[class^='recommend_wrap'],"],
    ["styles2", ".bpx-player-ending-related,"],],
  comments: [
    ["styles", `#commentapp,iframe[name="DMdl"],#comment-module,.bili-dyn-item__footer > :nth-child(2),`],],
  leftnavi: [
    ["repeat_n_times", 2, 150, "clean_navigation_bar()"], // this is not gonna do anything really, but put it here for consistency. It should be unnecessary after 1.7.4 as the following 2 lines has excess selectors that should cover all cases. It is kept here because, well, it's just a backup.
    ["styles2", ".left-entry > :nth-child(2),.left-entry > :nth-child(3),.left-entry > :nth-child(4),.left-entry > :nth-child(5),.left-entry > :nth-child(6),.left-entry > :nth-child(7),.left-entry > :nth-child(8),.left-entry > :nth-child(9),.left-entry > :nth-child(10),.left-entry > :nth-child(11),.left-entry > :nth-child(12),"], // this style2 is to immediately hide the fixed parts of the leftnavi to eliminate the flash effect
    ["styles2", ".nav-link-ul.mini > :nth-child(2),.nav-link-ul.mini > :nth-child(3),.nav-link-ul.mini > :nth-child(4),.nav-link-ul.mini > :nth-child(5),.nav-link-ul.mini > :nth-child(6),.nav-link-ul.mini > :nth-child(7),.nav-link-ul.mini > :nth-child(8),.nav-link-ul.mini > :nth-child(9),.nav-link-ul.mini > :nth-child(10),.nav-link-ul.mini > :nth-child(11),.nav-link-ul.mini > :nth-child(12),"],
    ["styles2", "#left-part > div > div > div.flex-block > div,#left-part > div > div > div.showmore-link.p-relative.f-left,"], // streaming page
    ["hideDropdownOnHover"]],
  searchrecom: [
    ["styles", ".trending,.bili-dyn-topic-box,.topic-panel,.channel-menu-mini,.bili-dyn-search-trendings,"],
  ],
  membership: [
    ["styles2", 'div.vip-wrap,'],
  ],
  messages: [
    ["styles2", '.right-entry > :nth-child(3),'],
  ],
  dongtai: [
    ["styles2", '.right-entry > :nth-child(4),'],
  ],
  favourites: [
    ["styles2", '.right-entry > :nth-child(5),'],
  ],
  history: [
    ["styles2", '.right-entry > :nth-child(6),'],
  ],
  tougao: [
    ["styles2", '.right-entry > :nth-child(7),'], // 创意中心 icon
    ["styles2", '.right-entry > :nth-child(8),.right-entry .header-upload-entry,'], // 投稿 icon, the second is for the icon that flashes on load in video streaming page
  ],
  ads: [
    ["styles", "#slide_ad,.ad-report,.video-card-ad-small,.adcard-content,.bili-dyn-ads,.head-title,.ad-img,.adcard,div.section.game,"],],
  myvideos: [
    ["styles", "div.section.i-pin-v,div.section.video,"], // for legacy UI
    ["styles", "#app > main > div.space-home > div.content > :nth-child(1),#app > main > div.space-home > div.content > :nth-child(2),"],],
  myfavourites: [
    ["styles", "div.section.fav,"], // for legacy UI
    ["styles", "#app > main > div.space-home > div.content > :nth-child(3),"],],
  subanimes: [
    ["styles", "div.section.bangumi,"], // for legacy UI
    ["styles", "#app > main > div.space-home > div.content > :nth-child(4),"],],
  recentcoins: [
    ["styles", "div.col-1 > :nth-child(5),"], // for legacy UI
    ["styles", "#app > main > div.space-home > div.content > :nth-child(5),"],],
  collections: [
    ["styles", "div.section.channel,"], // for legacy UI
    ["styles", "#app > main > div.space-home > div.content > :nth-child(6),"],],
  columns: [
    ["styles", "div.section.article,"], // for legacy UI
    ["styles", "#app > main > div.space-home > div.content > :nth-child(7),"],],
  recentlikes: [
    ["styles", "div.col-1 > :nth-child(8),"], // for legacy UI
    ["styles", "#app > main > div.space-home > div.content > :nth-child(8),"],],
  usrpageleftsidebar: [ // last 1 is legacy
    ["styles", "div.aside,div.col-2,"]],
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
    if (value == false) return;
    if (!is_personal_page && personal_page_prefrences.includes(key)) return; // if current page is not the user's personal page and the current key is a personal-page-specific one, don't execute
    for (const instruction of modifications[key]) {
      switch (instruction[0]) {
        case "styles":
          styles += instruction[1];
          break;
        case "styles2":
          styles2 += instruction[1];
          break;
        case "hideDropdownOnHover":
          hideDropdownOnHover();
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

  // Hide search box placeholder text via CSS to prevent flash before JS clears attributes
  if (settings.searchrecom) {
    addGlobalStyle(".nav-search-input::placeholder, .nav-search-keyword::placeholder { color: transparent !important; opacity: 0 !important; }", "bili-focus-style-searchrecom");
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
}

let lastRunTime = 0; // limit the number of calls of runMainCode
const MIN_DELAY = 100;
let is_first_personal_page_check = true;
let lastHideElementsTime = 0; // limit the number of calls of hideElements
const HIDE_ELEMENTS_MIN_DELAY = 50;
function initialLogicBody() {
  // console.log("BiliFocus: Running initializing logic...");
  chrome.storage.local.get(Object.keys(settings), function(result) {
    Object.keys(settings).forEach(key => {
      settings[key] = result[key] !== undefined ? result[key] : settings[key];
    });
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
          // console.log("BiliFocus: is first personal page check, running logic without interval check. ");
          is_first_personal_page_check = false;
          runMainCode(false);
          return;
        }
        const targetClasses = Array.from(mutation.target.classList);
        if ((targetClasses.some(className => mutation_targets.includes(className)))
          ) {
          // console.log("BiliFocus: target mutation detected, running logic...");
          runMainCode();
        }
        if (mutation.target.classList.contains("bili-video-card__image--wrap")) {
          // Clean ads from main page recommendations
          if (settings.ads) {
            remove_ads_from_mainpagerecom();
          }
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
      // console.log("BiliFocus: popstate detected. Running logic...");
      runMainCode();
    });

    // And just run once anyways
    runMainCode();
    // repeat_n_times(3, 110, runMainCode);
    if (settings.ads) { remove_ads_from_mainpagerecom();}
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
    
    if (request.value == true) {     // if the user turned the option on
      if (request.field == "vidrecom") {
        addVidrecomObserver(true);
      } else
      if (request.field == "ads") {
        remove_ads_from_mainpagerecom();
      }
    } else {                         // if the user turned the option off
      for (const instruction of modifications[request.field]) {
        if (instruction[0] == "hideDropdownOnHover" && window.hideDropdownObserver) {
          window.hideDropdownObserver.disconnect();
        }
      } 
      if (request.field == "leftnavi") {
        clean_navigation_bar(false);
      } else 
      if (request.field == "homepagerecom") {
        remove_ads_from_mainpagerecom();
      } else
      if (request.field == "searchrecom") {
        if (searchrecomObserver) {
          searchrecomObserver.disconnect();
          searchrecomObserver = null;
        }
        // Page loaded with searchrecom on: we never captured originals, so use 搜索
        const place = original_placeholder !== '' ? original_placeholder : '搜索';
        const title = original_title !== '' ? original_title : '';
        document.querySelectorAll(".nav-search-input, .nav-search-keyword").forEach(el => {
          el.setAttribute("placeholder", place);
          if (title !== '') el.setAttribute("title", title);
          else el.removeAttribute("title");
        });
      } else 
      if (request.field == "ads") {
        remove_ads_from_mainpagerecom(false);
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
chrome.storage.local.get(Object.keys(settings), function(result) {
  Object.keys(settings).forEach(key => {
    settings[key] = result[key] !== undefined ? result[key] : settings[key];
  });
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
});

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

console.log("BiliFocus: Extension Loaded.");