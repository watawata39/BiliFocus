const RELEASE_ORDER = ["2.4.0"];

const PAGE_MESSAGES = {
  zh: {
    title: "BiliFocus 更新了",
    multiSubtitle: "这里汇总了你还没有看过的几个重要更新。",
    emptySubtitle: "这个版本没有需要展示的更新说明。",
    close: "知道了",
  },
  en: {
    title: "BiliFocus Has Updated",
    multiSubtitle: "Here are the important updates you have not seen yet.",
    emptySubtitle: "There are no release notes configured for this version.",
    close: "Got it",
  },
  ja: {
    title: "BiliFocus が更新されました",
    multiSubtitle: "まだ確認していない重要な更新をまとめています。",
    emptySubtitle: "このバージョンで表示するリリースノートはありません。",
    close: "了解",
  },
};

const RELEASE_NOTES = {
  "2.4.0": {
    zh: {
      version: "2.4.0",
      subtitle: "独立的设置页面，以及新的防沉迷功能：访问前停一停。",
      features: [
        {
          title: "从齿轮图标打开设置",
          body: "设置现在移到了独立页面。点击插件弹窗右上角的齿轮图标，即可调整常规设置、清爽搜索和视频卡片屏蔽等选项。隐藏选项和清爽搜索开关仍保留在弹窗中。",
          image: "images/gear_item_in_popup.jpg",
        },
        {
          title: "访问前停一停",
          body: "新增可选的防沉迷功能，默认关闭。你可以在设置中的「访问前停一停」启用它，调整等待时间、离开多久后再次提醒，并写下给自己的提醒。也可以先预览效果。",
          image: "images/intentions_check_settings_page.jpg",
        },
        {
          title: "给自己一点时间，再决定是否继续",
          body: "启用后，在新一轮 B 站浏览开始前，会先显示一个简短的倒计时页面。倒计时结束后可以选择继续，也可以随时暂时离开。选择继续后，各标签页均可正常浏览，不会每打开一个页面就提醒；离开达到设定时长后，下次页面跳转时才会再次提醒。离开倒计时页面时，倒计时会暂停。",
          image: "images/buffer_page.jpg",
        },
      ],
    },
    en: {
      version: "2.4.0",
      subtitle: "A dedicated settings page and a new anti-addiction feature: Intention Check.",
      features: [
        {
          title: "Open Settings from the Gear Icon",
          body: "Settings now has its own page. Click the gear icon in the top-right corner of the extension popup to adjust general settings, Clean Search, Video Card Blocking, and more. Visibility controls and the Clean Search switch remain in the popup.",
          image: "images/gear_item_in_popup.jpg",
        },
        {
          title: "Intention Check",
          body: "This optional anti-addiction feature is off by default. Enable it in the Intention Check section of settings, choose the waiting time and how long away triggers another check, and add a personal reminder. You can preview it before using it.",
          image: "images/intentions_check_settings_page.jpg",
        },
        {
          title: "Pause Before You Continue",
          body: "When enabled, a short countdown appears before a new Bilibili browsing session. Once it finishes, you can continue, or choose to leave at any time. Continuing allows browsing across your tabs without a check on every page. After you spend the chosen interval away, the next navigation triggers another check. The countdown pauses while you are away from its page.",
          image: "images/buffer_page.jpg",
        },
      ],
    },
    ja: {
      version: "2.4.0",
      subtitle: "独立した設定ページと、新しい使いすぎ防止機能「アクセス前の確認」を追加しました。",
      features: [
        {
          title: "歯車アイコンから設定を開く",
          body: "設定が独立したページに移りました。拡張機能のポップアップ右上にある歯車アイコンから、一般設定、クリーンサーチ、動画カードブロックなどを設定できます。非表示にする項目の選択とクリーンサーチのスイッチは、引き続きポップアップにあります。",
          image: "images/gear_item_in_popup.jpg",
        },
        {
          title: "アクセス前の確認",
          body: "任意で使える使いすぎ防止機能です。初期状態ではオフになっています。設定の「アクセス前の確認」で有効にすると、待ち時間、再び確認するまでの離席時間、自分へのメッセージを設定できます。プレビューで確認することもできます。",
          image: "images/intentions_check_settings_page.jpg",
        },
        {
          title: "ひと息ついてから、続けるか決める",
          body: "有効にすると、Bilibili を見始める前に短いカウントダウンが表示されます。終了後は閲覧を続けられ、途中でも離れることができます。続行後は他のタブでも閲覧でき、ページを開くたびに確認することはありません。設定した時間だけ離れると、次のページへの移動時に再び確認します。カウントダウンのページから離れている間は、一時停止します。",
          image: "images/buffer_page.jpg",
        },
      ],
    },
  },
};

function getRequestedVersions() {
  const params = new URLSearchParams(window.location.search);
  const rawVersions = params.get("versions") || params.get("version") || RELEASE_ORDER[RELEASE_ORDER.length - 1];
  const requested = rawVersions
    .split(",")
    .map((version) => version.trim())
    .filter((version) => Object.prototype.hasOwnProperty.call(RELEASE_NOTES, version));
  const uniqueVersions = Array.from(new Set(requested));
  const orderedVersions = RELEASE_ORDER.filter((version) => uniqueVersions.includes(version));
  return orderedVersions;
}

function appendFeatureContent(item, feature) {
  if (feature.image) {
    const media = document.createElement("div");
    media.className = "feature-media";

    const image = document.createElement("img");
    image.src = feature.image;
    image.alt = feature.title;
    media.appendChild(image);
    item.appendChild(media);
  }

  const copy = document.createElement("div");
  copy.className = "feature-copy";

  const title = document.createElement("h2");
  title.textContent = feature.title;

  const body = document.createElement("p");
  body.textContent = feature.body;

  copy.append(title, body);
  item.appendChild(copy);
  return item;
}

function createFeatureCard(feature) {
  const item = document.createElement("li");
  item.className = "feature";
  return appendFeatureContent(item, feature);
}

function createExtraFeatureCard(feature) {
  const section = document.createElement("section");
  section.className = "feature extra-section";
  return appendFeatureContent(section, feature);
}

function createReleaseSection(notes) {
  const section = document.createElement("section");
  section.className = "release-section";

  const version = document.createElement("div");
  version.className = "version";
  version.textContent = notes.version;
  section.appendChild(version);

  const list = document.createElement("ul");
  list.className = "features";
  notes.features.forEach((feature) => {
    list.appendChild(createFeatureCard(feature));
  });
  section.appendChild(list);

  (notes.extras || []).forEach((feature) => {
    section.appendChild(createExtraFeatureCard(feature));
  });

  return section;
}

function renderReleaseNotes(preference) {
  const language = BiliFocusLanguage.resolve(preference);
  const pageMessages = PAGE_MESSAGES[language] || PAGE_MESSAGES.en;
  const versions = getRequestedVersions();
  const notesList = versions.map((version) => RELEASE_NOTES[version][language] || RELEASE_NOTES[version].en);

  document.documentElement.lang = language === "zh" ? "zh-CN" : language;
  document.title = versions.length === 1 ? `BiliFocus ${versions[0]}` : "BiliFocus Updates";
  document.getElementById("title").textContent = pageMessages.title;
  document.getElementById("close").textContent = pageMessages.close;

  const container = document.getElementById("release-sections");
  container.replaceChildren();
  if (versions.length === 0) {
    document.getElementById("subtitle").textContent = pageMessages.emptySubtitle;
    return;
  }

  document.getElementById("subtitle").textContent = versions.length === 1 ? notesList[0].subtitle : pageMessages.multiSubtitle;
  notesList.forEach((notes) => {
    container.appendChild(createReleaseSection(notes));
  });
}

document.getElementById("close").addEventListener("click", () => {
  window.close();
});

async function initializeReleaseNotes() {
  let preference;
  try {
    const data = await chrome.storage.local.get("language");
    preference = data.language;
  } catch (_) {
    // Direct file previews have no extension storage; use browser detection.
  }
  renderReleaseNotes(preference);
}

initializeReleaseNotes().finally(() => {
  document.body.removeAttribute("aria-busy");
  document.body.hidden = false;
});

globalThis.chrome?.storage?.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.language) renderReleaseNotes(changes.language.newValue);
});
