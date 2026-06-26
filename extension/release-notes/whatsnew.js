const RELEASE_NOTES = {
  zh: {
    title: "BiliFocus 更新了",
    subtitle: "2.1.0 加入了清爽搜索模式，让 B 站首页可以变成一个更安静、更专注的搜索入口。",
    version: "Version 2.1.0",
    close: "知道了",
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
    turnOff: {
      title: "不想使用清爽搜索模式？",
      body: "如果你更喜欢原本的首页，可以在扩展弹窗中关闭清爽搜索模式。关闭后，B 站首页会恢复原本的页面布局。",
      image: "images/turnoff_clean_search_mode.jpg",
    },
  },
  en: {
    title: "BiliFocus Has Updated",
    subtitle: "Version 2.1.0 adds Clean Search Mode, turning Bilibili's homepage into a quieter, search-focused entry point.",
    version: "Version 2.1.0",
    close: "Got it",
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
    turnOff: {
      title: "Prefer the Original Homepage?",
      body: "If you prefer the original homepage, open the extension popup and switch Clean Search Mode off. Once disabled, Bilibili's homepage returns to its original layout.",
      image: "images/turnoff_clean_search_mode.jpg",
    },
  },
  ja: {
    title: "BiliFocus が更新されました",
    subtitle: "Version 2.1.0 では、Bilibili のホームを静かで検索に集中しやすいページにするクリーン検索モードを追加しました。",
    version: "Version 2.1.0",
    close: "了解",
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
    turnOff: {
      title: "元のホームに戻したい場合",
      body: "元のホームを使いたい場合は、拡張機能のポップアップでクリーン検索モードをオフにできます。オフにすると、Bilibili のホームは元のレイアウトに戻ります。",
      image: "images/turnoff_clean_search_mode.jpg",
    },
  },
};

function getReleaseNotesLanguage() {
  const language = (navigator.language || "").toLowerCase();
  if (language.startsWith("ja")) return "ja";
  if (language.startsWith("zh")) return "zh";
  return "en";
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

function renderReleaseNotes() {
  const language = getReleaseNotesLanguage();
  const notes = RELEASE_NOTES[language];
  document.documentElement.lang = language === "zh" ? "zh-CN" : language;
  document.getElementById("title").textContent = notes.title;
  document.getElementById("subtitle").textContent = notes.subtitle;
  document.getElementById("version").textContent = notes.version;
  document.getElementById("close").textContent = notes.close;

  const list = document.getElementById("features");
  notes.features.forEach((feature) => {
    list.appendChild(createFeatureCard(feature));
  });

  const turnOffSection = document.getElementById("turnoff-section");
  turnOffSection.replaceChildren();
  appendFeatureContent(turnOffSection, notes.turnOff);
}

document.getElementById("close").addEventListener("click", () => {
  window.close();
});

renderReleaseNotes();
