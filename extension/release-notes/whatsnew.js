const RELEASE_ORDER = [];

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

const RELEASE_NOTES = {};

function getReleaseNotesLanguage() {
  const language = (navigator.language || "").toLowerCase();
  if (language.startsWith("ja")) return "ja";
  if (language.startsWith("zh")) return "zh";
  return "en";
}

function getRequestedVersions() {
  const params = new URLSearchParams(window.location.search);
  const rawVersions = params.get("versions") || params.get("version") || "";
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

function renderReleaseNotes() {
  const language = getReleaseNotesLanguage();
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

renderReleaseNotes();
