const RELEASE_ORDER = ["2.2.0"];

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
  "2.2.0": {
    zh: {
      subtitle: "2.2.0 加入了视频卡片屏蔽。你可以用关键词或正则表达式屏蔽主页和搜索结果中的视频卡片。",
      version: "Version 2.2.0",
      features: [
        {
          title: "视频卡片屏蔽设置面板",
          body: "在扩展弹窗中点击“视频卡片屏蔽”，即可在当前 Bilibili 页面打开设置面板。",
          image: "images/selecting_the_button_in_popup.jpg",
        },
        {
          title: "用关键词或正则屏蔽视频",
          body: "你可以添加普通关键词，也可以添加正则表达式。标题匹配的视频卡片会在主页推荐和搜索结果中被屏蔽。设置面板也支持导入、导出和一键清空规则。",
          image: "images/entering_keywords_in_panel.jpeg",
        },
      ],
    },
    en: {
      subtitle: "Version 2.2.0 adds Video Card Blocking, letting you block homepage and search-result video cards with keywords or regex.",
      version: "Version 2.2.0",
      features: [
        {
          title: "Video Card Blocking Settings Panel",
          body: "Click “Block Video Cards” in the extension popup to open the settings panel on the current Bilibili page.",
          image: "images/selecting_the_button_in_popup.jpg",
        },
        {
          title: "Block Videos with Keywords or Regex",
          body: "Add plain keywords for simple title matching, or regular expressions for more flexible patterns. Matching video cards are blocked on homepage recommendations and search results. The panel also supports importing, exporting, and deleting all rules.",
          image: "images/entering_keywords_in_panel.jpeg",
        },
      ],
    },
    ja: {
      subtitle: "Version 2.2.0 では、キーワードや正規表現でホームと検索結果の動画カードをブロックできる機能を追加しました。",
      version: "Version 2.2.0",
      features: [
        {
          title: "動画カードブロック設定パネル",
          body: "拡張機能のポップアップで「動画カードブロック」をクリックすると、現在の Bilibili ページ上に設定パネルが開きます。",
          image: "images/selecting_the_button_in_popup.jpg",
        },
        {
          title: "キーワードまたは正規表現で動画をブロック",
          body: "通常のキーワードで簡単にタイトルを一致させることも、正規表現でより柔軟な条件を作ることもできます。一致した動画カードはホームのおすすめと検索結果でブロックされます。設定パネルではルールのインポート、エクスポート、一括削除もできます。",
          image: "images/entering_keywords_in_panel.jpeg",
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
  const rawVersions = params.get("versions") || params.get("version") || "2.2.0";
  const requested = rawVersions
    .split(",")
    .map((version) => version.trim())
    .filter((version) => Object.prototype.hasOwnProperty.call(RELEASE_NOTES, version));
  const uniqueVersions = Array.from(new Set(requested));
  const orderedVersions = RELEASE_ORDER.filter((version) => uniqueVersions.includes(version));
  return orderedVersions.length > 0 ? orderedVersions : ["2.2.0"];
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
