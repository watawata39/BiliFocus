const RELEASE_ORDER = ["2.1.0", "2.1.4"];

const PAGE_MESSAGES = {
  zh: {
    title: "BiliFocus 更新了",
    multiSubtitle: "这里汇总了你还没有看过的几个重要更新。",
    close: "知道了",
  },
  en: {
    title: "BiliFocus Has Updated",
    multiSubtitle: "Here are the important updates you have not seen yet.",
    close: "Got it",
  },
  ja: {
    title: "BiliFocus が更新されました",
    multiSubtitle: "まだ確認していない重要な更新をまとめています。",
    close: "了解",
  },
};

const RELEASE_NOTES = {
  "2.1.0": {
    zh: {
      subtitle: "2.1.0 加入了清爽搜索模式，让 B 站首页可以变成一个更安静、更专注的搜索入口。",
      version: "Version 2.1.0",
      features: [
        {
          title: "清爽搜索模式",
          body: "清爽搜索模式只影响 B 站主页面。开启后，首页会保留搜索栏、头像，以及你选择显示的右上导航项目，其余内容会被隐藏。你可以随时在扩展弹窗中关闭它。",
          image: "images/clean_search_page.jpg",
        },
        {
          title: "自定义背景",
          body: "点击右下角的壁纸按钮即可打开背景面板。你可以选择内置壁纸、纯色背景，也可以上传一张自己的图片。",
          image: "images/panel.jpg",
        },
        {
          title: "选择右上导航项目",
          body: "清爽搜索模式会把保留显示的右上导航项目放在页面左上方。你可以在扩展弹窗中选择哪些项目继续显示。",
          image: "images/change_rightnavi.jpg",
        },
      ],
      extras: [
        {
          title: "不想使用清爽搜索模式？",
          body: "如果你更喜欢原本的首页，可以在扩展弹窗中关闭清爽搜索模式。关闭后，B 站首页会恢复原本的页面布局。",
          image: "images/turnoff_clean_search_mode.jpg",
        },
      ],
    },
    en: {
      subtitle: "Version 2.1.0 adds Clean Search Mode, turning Bilibili's homepage into a quieter, search-focused entry point.",
      version: "Version 2.1.0",
      features: [
        {
          title: "Clean Search Mode",
          body: "Clean Search Mode only affects Bilibili's main page. It keeps the search bar, avatar, and the right navigation items you choose to show, while hiding the rest. You can disable it from the extension popup at any time.",
          image: "images/clean_search_page.jpg",
        },
        {
          title: "Custom Backgrounds",
          body: "Click the wallpaper button in the bottom-right corner to open the background panel. You can choose a built-in wallpaper, use a solid color, or upload your own image.",
          image: "images/panel.jpg",
        },
        {
          title: "Choose Right Navigation Items",
          body: "In Clean Search Mode, visible right navigation items are placed on the left side of the page. You can choose which items remain visible in the extension popup.",
          image: "images/change_rightnavi.jpg",
        },
      ],
      extras: [
        {
          title: "Prefer the Original Homepage?",
          body: "If you prefer the original homepage, open the extension popup and switch Clean Search Mode off. Once disabled, Bilibili's homepage returns to its original layout.",
          image: "images/turnoff_clean_search_mode.jpg",
        },
      ],
    },
    ja: {
      subtitle: "Version 2.1.0 では、Bilibili のホームを静かで検索に集中しやすいページにするクリーン検索モードを追加しました。",
      version: "Version 2.1.0",
      features: [
        {
          title: "クリーン検索モード",
          body: "クリーン検索モードは Bilibili のメインページだけに作用します。検索バー、アバター、選択した右上ナビ項目だけを残し、それ以外を非表示にします。拡張機能のポップアップからいつでもオフにできます。",
          image: "images/clean_search_page.jpg",
        },
        {
          title: "背景カスタマイズ",
          body: "右下の壁紙ボタンをクリックすると背景パネルが開きます。内蔵壁紙、単色背景、自分でアップロードした画像を選べます。",
          image: "images/panel.jpg",
        },
        {
          title: "右上ナビ項目の選択",
          body: "クリーン検索モードでは、表示する右上ナビ項目がページ左上に配置されます。どの項目を表示するかは拡張機能のポップアップで選べます。",
          image: "images/change_rightnavi.jpg",
        },
      ],
      extras: [
        {
          title: "元のホームに戻したい場合",
          body: "元のホームを使いたい場合は、拡張機能のポップアップでクリーン検索モードをオフにできます。オフにすると、Bilibili のホームは元のレイアウトに戻ります。",
          image: "images/turnoff_clean_search_mode.jpg",
        },
      ],
    },
  },
  "2.1.4": {
    zh: {
      subtitle: "2.1.4 调整了清爽搜索模式中的导航栏行为，让左侧导航和右上导航的位置更可控。",
      version: "Version 2.1.4",
      features: [
        {
          title: "更灵活的导航栏位置",
          body: "清爽搜索模式不再锁定左侧导航栏。你可以在设置中选择是否把右上导航项目移动到页面左侧。若右上导航放在左侧，为避免两组导航重叠，左侧导航栏不会显示；关闭这个设置后，右上导航会留在右侧，左侧导航可以按你的显示选项出现。",
          image: "images/left_navi_right_setting.jpg",
        },
      ],
    },
    en: {
      subtitle: "Version 2.1.4 makes navigation placement in Clean Search Mode more flexible.",
      version: "Version 2.1.4",
      features: [
        {
          title: "More Flexible Navigation Placement",
          body: "Clean Search Mode no longer locks the left navigation bar. A new setting lets you choose whether right navigation items move to the left. When right navigation is placed on the left, the left navigation bar is hidden to avoid overlap; when the setting is off, right navigation stays on the right and left navigation can appear according to your visibility choice.",
          image: "images/left_navi_right_setting.jpg",
        },
      ],
    },
    ja: {
      subtitle: "Version 2.1.4 では、クリーン検索モードのナビゲーション配置をより柔軟にしました。",
      version: "Version 2.1.4",
      features: [
        {
          title: "より柔軟なナビゲーション配置",
          body: "クリーン検索モードでは左側ナビが固定で非表示にならなくなりました。設定で、右上ナビ項目を左側へ移動するか選べます。右上ナビを左側に置く場合は重なりを避けるため左側ナビは表示されません。この設定をオフにすると、右上ナビは右側に残り、左側ナビは表示設定に従って表示できます。",
          image: "images/left_navi_right_setting.jpg",
        },
      ],
    },
  },
};

function getReleaseNotesLanguage() {
  const language = (navigator.language || "").toLowerCase();
  if (language.startsWith("ja")) return "ja";
  if (language.startsWith("zh")) return "zh";
  return "en";
}

function getRequestedVersions() {
  const params = new URLSearchParams(window.location.search);
  const rawVersions = params.get("versions") || params.get("version") || "2.1.4";
  const requested = rawVersions
    .split(",")
    .map((version) => version.trim())
    .filter((version) => Object.prototype.hasOwnProperty.call(RELEASE_NOTES, version));
  const uniqueVersions = Array.from(new Set(requested));
  const orderedVersions = RELEASE_ORDER.filter((version) => uniqueVersions.includes(version));
  return orderedVersions.length > 0 ? orderedVersions : ["2.1.4"];
}

function appendFeatureContent(item, feature) {
  const media = document.createElement("div");
  media.className = "feature-media";

  const image = document.createElement("img");
  image.src = feature.image;
  image.alt = feature.title;
  media.appendChild(image);

  const copy = document.createElement("div");
  copy.className = "feature-copy";

  const title = document.createElement("h2");
  title.textContent = feature.title;

  const body = document.createElement("p");
  body.textContent = feature.body;

  copy.append(title, body);
  item.append(media, copy);
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

function renderReleaseNotes() {
  const language = getReleaseNotesLanguage();
  const pageMessages = PAGE_MESSAGES[language] || PAGE_MESSAGES.en;
  const versions = getRequestedVersions();
  const notesList = versions.map((version) => RELEASE_NOTES[version][language] || RELEASE_NOTES[version].en);

  document.documentElement.lang = language === "zh" ? "zh-CN" : language;
  document.title = versions.length === 1 ? `BiliFocus ${versions[0]}` : "BiliFocus Updates";
  document.getElementById("title").textContent = pageMessages.title;
  document.getElementById("subtitle").textContent = versions.length === 1 ? notesList[0].subtitle : pageMessages.multiSubtitle;
  document.getElementById("close").textContent = pageMessages.close;

  const container = document.getElementById("release-sections");
  container.replaceChildren();
  notesList.forEach((notes) => {
    container.appendChild(createReleaseSection(notes));
  });
}

document.getElementById("close").addEventListener("click", () => {
  window.close();
});

renderReleaseNotes();
