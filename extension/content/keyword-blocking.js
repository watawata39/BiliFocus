// Keyword Blocking
// Loaded before main.js by manifest.json.

const KEYWORD_BLOCKING_STORAGE_KEY = "keywordblockrules";
const KEYWORD_BLOCKING_STYLE_ID = "bili-focus-style-keyword-blocking";
const KEYWORD_BLOCKING_PANEL_ID = "bili-focus-keyword-panel";
const KEYWORD_BLOCKING_CARD_CLASS = "bili-focus-keyword-blocked-card";
const KEYWORD_BLOCKING_EXPORT_TYPE = "bilifocus-keyword-blocking-settings";

const KEYWORD_BLOCKING_MESSAGES = {
  zh: {
    panelTitle: "视频卡片屏蔽",
    close: "关闭",
    keywordTab: "关键词",
    regexTab: "正则表达式",
    keywordPlaceholder: "添加关键词",
    regexPlaceholder: "添加正则表达式",
    addKeyword: "添加关键词",
    addRegex: "添加正则",
    emptyKeywords: "还没有关键词。",
    emptyRegexes: "还没有正则表达式。",
    invalidRegex: "这个正则表达式无效。",
    duplicateKeyword: "这个关键词已经存在。",
    duplicateRegex: "这个正则表达式已经存在。",
    helpText: "当主页推荐或搜索结果的视频标题匹配关键词或正则表达式时，将屏蔽对应视频。英文关键词不区分大小写。",
    importHelpText: "你可以从另一台设备导出的文件中导入关键词和正则。导入不会覆盖已有项目，只会添加文件中的关键词和正则。",
    blockedCard: "已按关键词屏蔽",
    deleteItem: "删除",
    importButton: "导入",
    exportButton: "导出",
    deleteAllButton: "全部删除",
    okButton: "OK",
    cancelButton: "取消",
    continueButton: "继续",
    deleteAllTitle: "删除全部关键词设置",
    deleteAllBody: "这会删除全部关键词和正则表达式。此操作无法撤销。",
    invalidImportFile: "导入失败。请选择由 BiliFocus 导出的关键词屏蔽设置文件。",
    importSuccess: "导入完成：已添加 {added} 项，跳过 {skipped} 项。",
    importNoRules: "这个文件中没有可导入的关键词或正则表达式。",
    exportEmpty: "当前没有可导出的关键词或正则表达式。",
  },
  en: {
    panelTitle: "Video Card Blocking",
    close: "Close",
    keywordTab: "Keyword",
    regexTab: "Regex",
    keywordPlaceholder: "Add a keyword",
    regexPlaceholder: "Add a regular expression",
    addKeyword: "Add keyword",
    addRegex: "Add regex",
    emptyKeywords: "No keywords yet.",
    emptyRegexes: "No regular expressions yet.",
    invalidRegex: "This regular expression is invalid.",
    duplicateKeyword: "This keyword already exists.",
    duplicateRegex: "This regular expression already exists.",
    helpText: "Videos on the main page and search results are blocked when their titles match your keywords or regex. English keyword matching is case-insensitive.",
    importHelpText: "You can import keywords and regex from the exported file from another device. Import will not override existing items; it only adds keywords and regex from the file.",
    blockedCard: "Blocked by keyword",
    deleteItem: "Delete",
    importButton: "Import",
    exportButton: "Export",
    deleteAllButton: "Delete all",
    okButton: "OK",
    cancelButton: "Cancel",
    continueButton: "Continue",
    deleteAllTitle: "Delete All Keyword Settings",
    deleteAllBody: "This will delete all keywords and regex, and cannot be undone.",
    invalidImportFile: "Import failed. Please choose a keyword blocking settings file exported by BiliFocus.",
    importSuccess: "Import complete: added {added}, skipped {skipped}.",
    importNoRules: "This file does not contain any keyword or regex that can be imported.",
    exportEmpty: "There are no keywords or regex to export.",
  },
  ja: {
    panelTitle: "動画カードブロック",
    close: "閉じる",
    keywordTab: "キーワード",
    regexTab: "正規表現",
    keywordPlaceholder: "キーワードを追加",
    regexPlaceholder: "正規表現を追加",
    addKeyword: "キーワードを追加",
    addRegex: "正規表現を追加",
    emptyKeywords: "キーワードはまだありません。",
    emptyRegexes: "正規表現はまだありません。",
    invalidRegex: "この正規表現は無効です。",
    duplicateKeyword: "このキーワードはすでに存在します。",
    duplicateRegex: "この正規表現はすでに存在します。",
    helpText: "ホームページおすすめと検索結果の動画タイトルがキーワードまたは正規表現に一致すると、該当動画をブロックします。英字キーワードは大文字と小文字を区別しません。",
    importHelpText: "別のデバイスからエクスポートしたファイルからキーワードと正規表現をインポートできます。インポートしても既存の項目は上書きされず、ファイル内のキーワードと正規表現だけが追加されます。",
    blockedCard: "キーワードでブロック済み",
    deleteItem: "削除",
    importButton: "インポート",
    exportButton: "エクスポート",
    deleteAllButton: "すべて削除",
    okButton: "OK",
    cancelButton: "キャンセル",
    continueButton: "続行",
    deleteAllTitle: "すべてのキーワード設定を削除",
    deleteAllBody: "すべてのキーワードと正規表現を削除します。この操作は元に戻せません。",
    invalidImportFile: "インポートできません。BiliFocus からエクスポートしたキーワードブロック設定ファイルを選択してください。",
    importSuccess: "インポート完了：{added} 件追加、{skipped} 件スキップ。",
    importNoRules: "このファイルにはインポートできるキーワードまたは正規表現がありません。",
    exportEmpty: "エクスポートできるキーワードまたは正規表現がありません。",
  },
};

let keywordBlockingRules = [];
let keywordBlockingCompiledRules = [];
let keywordBlockingLanguage = "en";
let keywordBlockingActiveType = "keyword";
let keywordBlockingObserver = null;
let keywordBlockingRaf = 0;
let keywordBlockingInlineMessageTimer = 0;

function getKeywordBlockingMessage(key) {
  const messages = KEYWORD_BLOCKING_MESSAGES[keywordBlockingLanguage] || KEYWORD_BLOCKING_MESSAGES.en;
  return messages[key] || KEYWORD_BLOCKING_MESSAGES.en[key] || key;
}

function formatKeywordBlockingMessage(key, values = {}) {
  return getKeywordBlockingMessage(key).replace(/\{(\w+)\}/g, (_, name) => (
    Object.prototype.hasOwnProperty.call(values, name) ? String(values[name]) : `{${name}}`
  ));
}

function getKeywordBlockingLanguage(value) {
  return Object.prototype.hasOwnProperty.call(KEYWORD_BLOCKING_MESSAGES, value) ? value : "en";
}

function getKeywordBlockingId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `rule-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function escapeKeywordBlockingRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function sanitizeKeywordBlockingFlags(flags) {
  const source = typeof flags === "string" && flags ? flags : "i";
  const allowed = source.replace(/[^imsu]/g, "");
  return Array.from(new Set(allowed.split(""))).join("") || "i";
}

function parseKeywordBlockingRegexInput(value) {
  const trimmed = value.trim();
  const match = trimmed.match(/^\/(.+)\/([a-z]*)$/i);
  if (!match) return { source: trimmed, flags: "i" };
  return { source: match[1], flags: sanitizeKeywordBlockingFlags(match[2]) };
}

function getKeywordBlockingDuplicateKey(type, raw, source, flags) {
  if (type === "regex") return `regex:${source}/${sanitizeKeywordBlockingFlags(flags)}`;
  return `keyword:${raw.trim().toLocaleLowerCase()}`;
}

function normalizeKeywordBlockingRule(rule) {
  if (!rule || typeof rule !== "object") return null;
  const type = rule.type === "regex" ? "regex" : "keyword";
  const raw = typeof rule.raw === "string" ? rule.raw.trim() : "";
  const source = typeof rule.source === "string" ? rule.source : "";
  const flags = sanitizeKeywordBlockingFlags(rule.flags);
  if (!raw || !source) return null;
  try {
    new RegExp(source, flags);
  } catch (_) {
    return null;
  }
  return {
    id: typeof rule.id === "string" && rule.id ? rule.id : getKeywordBlockingId(),
    type,
    raw,
    source,
    flags,
    enabled: rule.enabled !== false,
  };
}

function normalizeKeywordBlockingRules(value) {
  if (!Array.isArray(value)) return [];
  return value.map(normalizeKeywordBlockingRule).filter(Boolean);
}

function compileKeywordBlockingRules() {
  keywordBlockingCompiledRules = keywordBlockingRules
    .filter((rule) => rule.enabled !== false)
    .map((rule) => {
      try {
        return { rule, regex: new RegExp(rule.source, rule.flags) };
      } catch (_) {
        return null;
      }
    })
    .filter(Boolean);
}

function saveKeywordBlockingRules() {
  chrome.storage.local.set({ [KEYWORD_BLOCKING_STORAGE_KEY]: keywordBlockingRules });
}

function setKeywordBlockingRules(nextRules, shouldSave = true) {
  keywordBlockingRules = normalizeKeywordBlockingRules(nextRules);
  compileKeywordBlockingRules();
  if (shouldSave) saveKeywordBlockingRules();
  renderKeywordBlockingPanel();
  scheduleKeywordBlockingScan();
}

function addKeywordBlockingRule(type, rawValue) {
  const raw = rawValue.trim();
  if (!raw) return { ok: false };

  const ruleType = type === "regex" ? "regex" : "keyword";
  let source = "";
  let flags = "i";
  if (ruleType === "regex") {
    const parsed = parseKeywordBlockingRegexInput(raw);
    source = parsed.source;
    flags = parsed.flags;
  } else {
    source = escapeKeywordBlockingRegex(raw);
  }

  try {
    new RegExp(source, flags);
  } catch (_) {
    return { ok: false, error: "invalidRegex" };
  }

  const duplicateKey = getKeywordBlockingDuplicateKey(ruleType, raw, source, flags);
  const isDuplicate = keywordBlockingRules.some((rule) => (
    getKeywordBlockingDuplicateKey(rule.type, rule.raw, rule.source, rule.flags) === duplicateKey
  ));
  if (isDuplicate) {
    return { ok: false, error: ruleType === "regex" ? "duplicateRegex" : "duplicateKeyword", inline: true };
  }

  setKeywordBlockingRules([
    ...keywordBlockingRules,
    {
      id: getKeywordBlockingId(),
      type: ruleType,
      raw,
      source,
      flags,
      enabled: true,
    },
  ]);
  return { ok: true };
}

function removeKeywordBlockingRule(id) {
  setKeywordBlockingRules(keywordBlockingRules.filter((rule) => rule.id !== id));
}

function getKeywordBlockingExportRules() {
  return keywordBlockingRules.map((rule) => ({
    type: rule.type,
    raw: rule.raw,
    source: rule.source,
    flags: rule.flags,
    enabled: rule.enabled !== false,
  }));
}

function normalizeKeywordBlockingImportedRules(data) {
  if (!data || typeof data !== "object") return null;
  if (data.type !== KEYWORD_BLOCKING_EXPORT_TYPE || !Array.isArray(data.rules)) return null;

  return data.rules.map((rule) => {
    if (!rule || typeof rule !== "object") return null;
    const type = rule.type === "regex" ? "regex" : rule.type === "keyword" ? "keyword" : "";
    const raw = typeof rule.raw === "string" ? rule.raw.trim() : "";
    if (!type || !raw) return null;

    let source = typeof rule.source === "string" ? rule.source : "";
    let flags = sanitizeKeywordBlockingFlags(rule.flags);
    if (type === "keyword") {
      source = escapeKeywordBlockingRegex(raw);
      flags = "i";
    }
    if (!source) return null;

    return normalizeKeywordBlockingRule({
      id: getKeywordBlockingId(),
      type,
      raw,
      source,
      flags,
      enabled: true,
    });
  }).filter(Boolean);
}

function mergeKeywordBlockingImportedRules(importedRules) {
  const existingKeys = new Set(keywordBlockingRules.map((rule) => (
    getKeywordBlockingDuplicateKey(rule.type, rule.raw, rule.source, rule.flags)
  )));
  const addedRules = [];
  let skipped = 0;

  importedRules.forEach((rule) => {
    const duplicateKey = getKeywordBlockingDuplicateKey(rule.type, rule.raw, rule.source, rule.flags);
    if (existingKeys.has(duplicateKey)) {
      skipped += 1;
      return;
    }
    existingKeys.add(duplicateKey);
    addedRules.push({ ...rule, id: getKeywordBlockingId() });
  });

  if (addedRules.length > 0) {
    setKeywordBlockingRules([...keywordBlockingRules, ...addedRules]);
  }
  return { added: addedRules.length, skipped };
}

function exportKeywordBlockingRules() {
  if (keywordBlockingRules.length === 0) {
    showKeywordBlockingDialog({
      message: getKeywordBlockingMessage("exportEmpty"),
      buttons: [{ labelKey: "okButton", primary: true }],
    });
    return;
  }

  const exported = {
    app: "BiliFocus",
    type: KEYWORD_BLOCKING_EXPORT_TYPE,
    version: 1,
    exportedAt: new Date().toISOString(),
    rules: getKeywordBlockingExportRules(),
  };
  const blob = new Blob([`${JSON.stringify(exported, null, 2)}\n`], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `bilifocus-keyword-blocking-${new Date().toISOString().slice(0, 10)}.json`;
  link.style.display = "none";
  document.documentElement.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function openKeywordBlockingImportPicker() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json,application/json";
  input.style.display = "none";
  input.addEventListener("change", async () => {
    const file = input.files && input.files[0];
    input.remove();
    if (!file) return;

    try {
      const parsed = JSON.parse(await file.text());
      const importedRules = normalizeKeywordBlockingImportedRules(parsed);
      if (!importedRules) throw new Error("Invalid import format");
      if (importedRules.length === 0) {
        showKeywordBlockingDialog({
          message: getKeywordBlockingMessage("importNoRules"),
          buttons: [{ labelKey: "okButton", primary: true }],
        });
        return;
      }

      const result = mergeKeywordBlockingImportedRules(importedRules);
      showKeywordBlockingDialog({
        message: formatKeywordBlockingMessage("importSuccess", result),
        buttons: [{ labelKey: "okButton", primary: true }],
      });
    } catch (_) {
      showKeywordBlockingDialog({
        message: getKeywordBlockingMessage("invalidImportFile"),
        buttons: [{ labelKey: "okButton", primary: true }],
      });
    }
  }, { once: true });
  document.documentElement.appendChild(input);
  input.click();
}

function importKeywordBlockingRules() {
  openKeywordBlockingImportPicker();
}

function deleteAllKeywordBlockingRules() {
  showKeywordBlockingDialog({
    title: getKeywordBlockingMessage("deleteAllTitle"),
    message: getKeywordBlockingMessage("deleteAllBody"),
    buttons: [
      { labelKey: "cancelButton" },
      {
        labelKey: "continueButton",
        danger: true,
        onClick: () => setKeywordBlockingRules([]),
      },
    ],
  });
}

function addKeywordBlockingStyle(css, id = KEYWORD_BLOCKING_STYLE_ID) {
  let style = document.getElementById(id);
  if (!style) {
    style = document.createElement("style");
    style.id = id;
    document.documentElement.appendChild(style);
  }
  style.textContent = css;
}

function installKeywordBlockingStyles() {
  addKeywordBlockingStyle(`
    .${KEYWORD_BLOCKING_CARD_CLASS} {
      position: relative !important;
      visibility: visible !important;
      pointer-events: none !important;
      background: #f3f5f8 !important;
      border-radius: 6px !important;
      box-shadow: none !important;
      overflow: hidden !important;
      isolation: isolate !important;
    }

    .${KEYWORD_BLOCKING_CARD_CLASS} > * {
      visibility: hidden !important;
      pointer-events: none !important;
    }

    .${KEYWORD_BLOCKING_CARD_CLASS}::after {
      content: attr(data-bili-focus-keyword-label);
      position: absolute !important;
      inset: 0 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 16px !important;
      box-sizing: border-box !important;
      color: rgba(38, 48, 64, 0.58) !important;
      background: #f3f5f8 !important;
      font-size: 14px !important;
      line-height: 20px !important;
      font-weight: 700 !important;
      text-align: center !important;
      visibility: visible !important;
      pointer-events: none !important;
    }

    #${KEYWORD_BLOCKING_PANEL_ID} {
      position: fixed !important;
      top: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: min(380px, 92vw) !important;
      z-index: 2147483646 !important;
      display: flex !important;
      flex-direction: column !important;
      box-sizing: border-box !important;
      background: rgba(255, 255, 255, 0.96) !important;
      color: #182133 !important;
      border-left: 1px solid rgba(24, 33, 51, 0.12) !important;
      box-shadow: -18px 0 45px rgba(24, 33, 51, 0.18) !important;
      font-family: Arial, "Microsoft YaHei", "PingFang SC", sans-serif !important;
      user-select: none !important;
    }

    #${KEYWORD_BLOCKING_PANEL_ID} * {
      box-sizing: border-box !important;
      letter-spacing: 0 !important;
    }

    .bili-focus-keyword-header {
      min-height: 58px !important;
      padding: 0 18px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      border-bottom: 1px solid rgba(24, 33, 51, 0.1) !important;
    }

    .bili-focus-keyword-title {
      margin: 0 !important;
      font-size: 16px !important;
      line-height: 22px !important;
      font-weight: 800 !important;
      color: #182133 !important;
    }

    .bili-focus-keyword-close,
    .bili-focus-keyword-remove {
      border: none !important;
      background: transparent !important;
      padding: 0 !important;
      cursor: pointer !important;
    }

    .bili-focus-keyword-close {
      width: 28px !important;
      height: 28px !important;
      border-radius: 50% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }

    .bili-focus-keyword-close:hover {
      background: rgba(24, 33, 51, 0.08) !important;
    }

    .bili-focus-keyword-close img,
    .bili-focus-keyword-remove img {
      display: block !important;
      width: 14px !important;
      height: 14px !important;
      opacity: 0.58 !important;
    }

    .bili-focus-keyword-body {
      flex: 1 1 auto !important;
      min-height: 0 !important;
      padding: 16px 18px 18px !important;
      overflow-y: auto !important;
    }

    .bili-focus-keyword-tabs {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 6px !important;
      padding: 4px !important;
      margin-bottom: 14px !important;
      border-radius: 10px !important;
      background: rgba(24, 33, 51, 0.06) !important;
    }

    .bili-focus-keyword-tab {
      min-height: 34px !important;
      border: none !important;
      border-radius: 8px !important;
      background: transparent !important;
      color: rgba(24, 33, 51, 0.64) !important;
      font-size: 13px !important;
      font-weight: 700 !important;
      cursor: pointer !important;
    }

    .bili-focus-keyword-tab.is-active {
      background: #fff !important;
      color: #007bff !important;
      box-shadow: 0 1px 5px rgba(24, 33, 51, 0.12) !important;
    }

    .bili-focus-keyword-form {
      display: grid !important;
      grid-template-columns: 1fr auto !important;
      gap: 8px !important;
      margin-bottom: 11px !important;
    }

    .bili-focus-keyword-input {
      min-width: 0 !important;
      height: 36px !important;
      border: 1px solid rgba(24, 33, 51, 0.14) !important;
      border-radius: 8px !important;
      padding: 0 10px !important;
      background: #fff !important;
      color: #182133 !important;
      font-size: 13px !important;
      outline: none !important;
      user-select: text !important;
    }

    .bili-focus-keyword-input:focus {
      border-color: #007bff !important;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.12) !important;
    }

    .bili-focus-keyword-add {
      height: 36px !important;
      border: 1px solid #007bff !important;
      border-radius: 8px !important;
      padding: 0 12px !important;
      background: #007bff !important;
      color: #fff !important;
      font-size: 13px !important;
      font-weight: 800 !important;
      cursor: pointer !important;
    }

    .bili-focus-keyword-error {
      min-height: 0 !important;
      margin: 0 !important;
      color: #d92d20 !important;
      font-size: 12px !important;
      line-height: 18px !important;
    }

    .bili-focus-keyword-error:not(:empty) {
      min-height: 18px !important;
      margin-bottom: 8px !important;
    }

    .bili-focus-keyword-inline-message {
      min-height: 0 !important;
      margin: 0 0 10px !important;
      padding: 8px 10px !important;
      border: 1px solid rgba(0, 123, 255, 0.14) !important;
      border-radius: 8px !important;
      background: rgba(0, 123, 255, 0.08) !important;
      color: #0066cc !important;
      font-size: 12px !important;
      line-height: 18px !important;
      font-weight: 700 !important;
      opacity: 0 !important;
      transform: translateY(-4px) !important;
      transition: opacity 0.16s ease, transform 0.16s ease !important;
      display: none !important;
    }

    .bili-focus-keyword-inline-message.is-visible {
      display: block !important;
      opacity: 1 !important;
      transform: translateY(0) !important;
    }

    .bili-focus-keyword-inline-message.is-error {
      border-color: rgba(217, 45, 32, 0.18) !important;
      background: rgba(217, 45, 32, 0.08) !important;
      color: #d92d20 !important;
    }

    .bili-focus-keyword-list {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 8px !important;
      align-items: flex-start !important;
    }

    .bili-focus-keyword-list.is-regex {
      display: grid !important;
      grid-template-columns: 1fr !important;
    }

    .bili-focus-keyword-empty {
      width: 100% !important;
      min-height: 46px !important;
      display: flex !important;
      align-items: center !important;
      padding-left: 4px !important;
      color: rgba(24, 33, 51, 0.52) !important;
      font-size: 13px !important;
      line-height: 20px !important;
    }

    .bili-focus-keyword-chip,
    .bili-focus-keyword-row {
      position: relative !important;
      min-width: 0 !important;
      border: 1px solid rgba(24, 33, 51, 0.12) !important;
      background: #fff !important;
      color: rgba(24, 33, 51, 0.78) !important;
      box-shadow: 0 1px 3px rgba(24, 33, 51, 0.06) !important;
    }

    .bili-focus-keyword-chip {
      max-width: 100% !important;
      height: 30px !important;
      border-radius: 999px !important;
      padding: 0 13px !important;
      display: inline-flex !important;
      align-items: center !important;
    }

    .bili-focus-keyword-row {
      width: 100% !important;
      min-height: 36px !important;
      border-radius: 8px !important;
      padding: 0 34px 0 12px !important;
      display: flex !important;
      align-items: center !important;
    }

    .bili-focus-keyword-text {
      min-width: 0 !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
      font-size: 13px !important;
      line-height: 18px !important;
      user-select: text !important;
    }

    .bili-focus-keyword-remove {
      position: absolute !important;
      top: -6px !important;
      right: -6px !important;
      width: 18px !important;
      height: 18px !important;
      border-radius: 50% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      background: #fff !important;
      border: 1px solid rgba(24, 33, 51, 0.16) !important;
      box-shadow: 0 2px 6px rgba(24, 33, 51, 0.16) !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }

    .bili-focus-keyword-chip:hover .bili-focus-keyword-remove,
    .bili-focus-keyword-row:hover .bili-focus-keyword-remove {
      opacity: 1 !important;
      pointer-events: auto !important;
    }

    .bili-focus-keyword-remove img {
      width: 10px !important;
      height: 10px !important;
    }

    .bili-focus-keyword-footer {
      flex: 0 0 auto !important;
      border-top: 1px solid rgba(24, 33, 51, 0.1) !important;
      background: rgba(255, 255, 255, 0.74) !important;
    }

    .bili-focus-keyword-footer-actions {
      display: grid !important;
      grid-template-columns: repeat(3, 1fr) !important;
      gap: 8px !important;
      padding: 12px 18px 0 !important;
    }

    .bili-focus-keyword-footer-button {
      min-width: 0 !important;
      height: 30px !important;
      border: 1px solid rgba(24, 33, 51, 0.14) !important;
      border-radius: 8px !important;
      padding: 0 8px !important;
      background: #fff !important;
      color: rgba(24, 33, 51, 0.74) !important;
      font-size: 12px !important;
      line-height: 16px !important;
      font-weight: 800 !important;
      cursor: pointer !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
    }

    .bili-focus-keyword-footer-button:hover {
      border-color: rgba(0, 123, 255, 0.35) !important;
      color: #007bff !important;
      background: rgba(0, 123, 255, 0.06) !important;
    }

    .bili-focus-keyword-footer-button.is-danger:hover {
      border-color: rgba(217, 45, 32, 0.35) !important;
      color: #d92d20 !important;
      background: rgba(217, 45, 32, 0.06) !important;
    }

    .bili-focus-keyword-help {
      margin: 0 !important;
      padding: 0 22px !important;
      color: rgba(24, 33, 51, 0.52) !important;
      font-size: 12px !important;
      line-height: 18px !important;
    }

    .bili-focus-keyword-footer-actions + .bili-focus-keyword-help {
      padding-top: 10px !important;
    }

    .bili-focus-keyword-help + .bili-focus-keyword-help {
      margin-top: 6px !important;
    }

    .bili-focus-keyword-footer .bili-focus-keyword-help:last-child {
      padding-bottom: 14px !important;
    }

    .bili-focus-keyword-dialog-overlay {
      position: absolute !important;
      inset: 0 !important;
      z-index: 4 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 22px !important;
      background: rgba(255, 255, 255, 0.28) !important;
    }

    .bili-focus-keyword-dialog {
      width: min(300px, 100%) !important;
      border: 1px solid rgba(24, 33, 51, 0.12) !important;
      border-radius: 12px !important;
      padding: 18px !important;
      background: rgba(255, 255, 255, 0.98) !important;
      box-shadow: 0 16px 42px rgba(24, 33, 51, 0.2) !important;
    }

    .bili-focus-keyword-dialog-title {
      margin: 0 0 8px !important;
      color: #182133 !important;
      font-size: 15px !important;
      line-height: 21px !important;
      font-weight: 800 !important;
    }

    .bili-focus-keyword-dialog-message {
      margin: 0 !important;
      color: rgba(24, 33, 51, 0.68) !important;
      font-size: 13px !important;
      line-height: 20px !important;
    }

    .bili-focus-keyword-dialog-actions {
      display: flex !important;
      justify-content: flex-end !important;
      gap: 8px !important;
      margin-top: 16px !important;
    }

    .bili-focus-keyword-dialog-button {
      min-width: 74px !important;
      height: 32px !important;
      border: 1px solid rgba(24, 33, 51, 0.14) !important;
      border-radius: 8px !important;
      padding: 0 12px !important;
      background: #fff !important;
      color: rgba(24, 33, 51, 0.72) !important;
      font-size: 13px !important;
      font-weight: 800 !important;
      cursor: pointer !important;
    }

    .bili-focus-keyword-dialog-button.is-primary {
      border-color: #007bff !important;
      background: #007bff !important;
      color: #fff !important;
    }

    .bili-focus-keyword-dialog-button.is-danger {
      border-color: #d92d20 !important;
      background: #d92d20 !important;
      color: #fff !important;
    }
  `);
}

function getKeywordBlockingCardTitle(card) {
  const titleElement = card.querySelector(".bili-video-card__info--tit");
  if (titleElement) {
    const titleAttribute = titleElement.getAttribute("title");
    if (titleAttribute) return titleAttribute.trim();
    const titleLink = titleElement.querySelector("a");
    if (titleLink) {
      const linkTitle = titleLink.getAttribute("title") || titleLink.textContent;
      if (linkTitle) return linkTitle.trim();
    }
    const titleText = titleElement.textContent;
    if (titleText) return titleText.trim();
  }

  const fallbackTitle = card.querySelector("h3[title], a[title]");
  if (fallbackTitle) {
    const value = fallbackTitle.getAttribute("title") || fallbackTitle.textContent;
    if (value) return value.trim();
  }
  return "";
}

function getKeywordBlockingCards() {
  if (!document.body) return [];
  const cards = Array.from(document.querySelectorAll(".bili-feed-card, .bili-video-card"));
  return cards.filter((card) => {
    if (card.matches(".bili-video-card") && card.closest(".bili-feed-card")) return false;
    return !!getKeywordBlockingCardTitle(card);
  });
}

function isKeywordBlockingTitleBlocked(title) {
  if (!title || keywordBlockingCompiledRules.length === 0) return false;
  return keywordBlockingCompiledRules.some(({ regex }) => {
    regex.lastIndex = 0;
    return regex.test(title);
  });
}

function applyKeywordBlocking() {
  getKeywordBlockingCards().forEach((card) => {
    const title = getKeywordBlockingCardTitle(card);
    const shouldBlock = isKeywordBlockingTitleBlocked(title);
    card.classList.toggle(KEYWORD_BLOCKING_CARD_CLASS, shouldBlock);
    if (shouldBlock) {
      card.setAttribute("data-bili-focus-keyword-label", getKeywordBlockingMessage("blockedCard"));
    } else {
      card.removeAttribute("data-bili-focus-keyword-label");
    }
  });

  document.querySelectorAll(`.${KEYWORD_BLOCKING_CARD_CLASS}`).forEach((card) => {
    if (!isKeywordBlockingTitleBlocked(getKeywordBlockingCardTitle(card))) {
      card.classList.remove(KEYWORD_BLOCKING_CARD_CLASS);
      card.removeAttribute("data-bili-focus-keyword-label");
    }
  });
}

function scheduleKeywordBlockingScan() {
  if (keywordBlockingRaf) return;
  keywordBlockingRaf = requestAnimationFrame(() => {
    keywordBlockingRaf = 0;
    applyKeywordBlocking();
  });
}

function startKeywordBlockingObserver() {
  if (!document.body || keywordBlockingObserver) return;
  keywordBlockingObserver = new MutationObserver(() => {
    scheduleKeywordBlockingScan();
  });
  keywordBlockingObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["title", "href", "class"],
  });
  scheduleKeywordBlockingScan();
}

function createKeywordBlockingIconButton(className, titleKey, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.title = getKeywordBlockingMessage(titleKey);
  button.setAttribute("aria-label", getKeywordBlockingMessage(titleKey));
  button.addEventListener("click", onClick);

  const icon = document.createElement("img");
  icon.src = chrome.runtime.getURL("icons/cross.svg");
  icon.alt = "";
  button.appendChild(icon);
  return button;
}

function closeKeywordBlockingPanel() {
  const panel = document.getElementById(KEYWORD_BLOCKING_PANEL_ID);
  if (panel) panel.remove();
}

function closeKeywordBlockingDialog() {
  const panel = document.getElementById(KEYWORD_BLOCKING_PANEL_ID);
  const overlay = panel ? panel.querySelector(".bili-focus-keyword-dialog-overlay") : null;
  if (overlay) overlay.remove();
}

function showKeywordBlockingDialog({ title = "", message = "", buttons = [] }) {
  const panel = document.getElementById(KEYWORD_BLOCKING_PANEL_ID);
  if (!panel) return;

  closeKeywordBlockingDialog();
  const overlay = document.createElement("div");
  overlay.className = "bili-focus-keyword-dialog-overlay";

  const dialog = document.createElement("div");
  dialog.className = "bili-focus-keyword-dialog";
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");

  if (title) {
    const titleElement = document.createElement("h3");
    titleElement.className = "bili-focus-keyword-dialog-title";
    titleElement.textContent = title;
    dialog.appendChild(titleElement);
  }

  const messageElement = document.createElement("p");
  messageElement.className = "bili-focus-keyword-dialog-message";
  messageElement.textContent = message;
  dialog.appendChild(messageElement);

  const actions = document.createElement("div");
  actions.className = "bili-focus-keyword-dialog-actions";
  const dialogButtons = buttons.length > 0 ? buttons : [{ labelKey: "okButton", primary: true }];
  dialogButtons.forEach((buttonConfig) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "bili-focus-keyword-dialog-button";
    if (buttonConfig.primary) button.classList.add("is-primary");
    if (buttonConfig.danger) button.classList.add("is-danger");
    button.textContent = buttonConfig.label || getKeywordBlockingMessage(buttonConfig.labelKey || "okButton");
    button.addEventListener("click", () => {
      closeKeywordBlockingDialog();
      if (typeof buttonConfig.onClick === "function") buttonConfig.onClick();
    });
    actions.appendChild(button);
  });
  dialog.appendChild(actions);
  overlay.appendChild(dialog);
  panel.appendChild(overlay);

  const primaryButton = actions.querySelector(".is-primary, .is-danger") || actions.querySelector("button");
  if (primaryButton) primaryButton.focus();
}

function renderKeywordBlockingPanel() {
  const panel = document.getElementById(KEYWORD_BLOCKING_PANEL_ID);
  if (!panel) return;

  const title = panel.querySelector(".bili-focus-keyword-title");
  if (title) title.textContent = getKeywordBlockingMessage("panelTitle");

  const tabs = panel.querySelectorAll(".bili-focus-keyword-tab");
  tabs.forEach((tab) => {
    const type = tab.dataset.type;
    tab.classList.toggle("is-active", type === keywordBlockingActiveType);
    tab.textContent = getKeywordBlockingMessage(type === "regex" ? "regexTab" : "keywordTab");
  });

  const input = panel.querySelector(".bili-focus-keyword-input");
  const addButton = panel.querySelector(".bili-focus-keyword-add");
  const error = panel.querySelector(".bili-focus-keyword-error");
  const inlineMessage = panel.querySelector(".bili-focus-keyword-inline-message");
  const list = panel.querySelector(".bili-focus-keyword-list");
  const help = panel.querySelector(".bili-focus-keyword-help");
  const importHelp = panel.querySelector(".bili-focus-keyword-import-help");
  const importButton = panel.querySelector('[data-keyword-action="import"]');
  const exportButton = panel.querySelector('[data-keyword-action="export"]');
  const deleteAllButton = panel.querySelector('[data-keyword-action="delete-all"]');
  if (!input || !addButton || !error || !list) return;

  input.placeholder = getKeywordBlockingMessage(keywordBlockingActiveType === "regex" ? "regexPlaceholder" : "keywordPlaceholder");
  addButton.textContent = getKeywordBlockingMessage(keywordBlockingActiveType === "regex" ? "addRegex" : "addKeyword");
  if (help) help.textContent = getKeywordBlockingMessage("helpText");
  if (importHelp) importHelp.textContent = getKeywordBlockingMessage("importHelpText");
  if (importButton) {
    importButton.textContent = getKeywordBlockingMessage("importButton");
    importButton.title = getKeywordBlockingMessage("importButton");
  }
  if (exportButton) {
    exportButton.textContent = getKeywordBlockingMessage("exportButton");
    exportButton.title = getKeywordBlockingMessage("exportButton");
  }
  if (deleteAllButton) {
    deleteAllButton.textContent = getKeywordBlockingMessage("deleteAllButton");
    deleteAllButton.title = getKeywordBlockingMessage("deleteAllButton");
  }
  error.textContent = "";
  if (inlineMessage) {
    inlineMessage.textContent = "";
    inlineMessage.classList.remove("is-visible");
  }
  list.classList.toggle("is-regex", keywordBlockingActiveType === "regex");
  list.replaceChildren();

  const currentRules = keywordBlockingRules.filter((rule) => rule.type === keywordBlockingActiveType);
  if (currentRules.length === 0) {
    const empty = document.createElement("div");
    empty.className = "bili-focus-keyword-empty";
    empty.textContent = getKeywordBlockingMessage(keywordBlockingActiveType === "regex" ? "emptyRegexes" : "emptyKeywords");
    list.appendChild(empty);
    return;
  }

  currentRules.forEach((rule) => {
    const item = document.createElement("div");
    item.className = keywordBlockingActiveType === "regex" ? "bili-focus-keyword-row" : "bili-focus-keyword-chip";

    const text = document.createElement("span");
    text.className = "bili-focus-keyword-text";
    text.textContent = rule.raw;
    text.title = rule.raw;

    const remove = createKeywordBlockingIconButton("bili-focus-keyword-remove", "deleteItem", (event) => {
      event.stopPropagation();
      removeKeywordBlockingRule(rule.id);
    });
    remove.removeAttribute("title");

    item.append(text, remove);
    list.appendChild(item);
  });
}

function showKeywordBlockingInlineMessage(messageKey, variant = "") {
  const panel = document.getElementById(KEYWORD_BLOCKING_PANEL_ID);
  const message = panel ? panel.querySelector(".bili-focus-keyword-inline-message") : null;
  if (!message) return;

  message.textContent = getKeywordBlockingMessage(messageKey);
  message.classList.toggle("is-error", variant === "error");
  message.classList.add("is-visible");
  if (keywordBlockingInlineMessageTimer) clearTimeout(keywordBlockingInlineMessageTimer);
  keywordBlockingInlineMessageTimer = setTimeout(() => {
    message.classList.remove("is-visible");
    message.classList.remove("is-error");
    keywordBlockingInlineMessageTimer = 0;
  }, 2200);
}

function submitKeywordBlockingRule(panel) {
  const input = panel.querySelector(".bili-focus-keyword-input");
  const error = panel.querySelector(".bili-focus-keyword-error");
  if (!input || !error) return;

  const result = addKeywordBlockingRule(keywordBlockingActiveType, input.value);
  if (!result.ok) {
    if (result.inline && result.error) {
      error.textContent = "";
      showKeywordBlockingInlineMessage(result.error);
    } else if (result.error === "invalidRegex") {
      error.textContent = "";
      showKeywordBlockingInlineMessage(result.error, "error");
    } else {
      error.textContent = result.error ? getKeywordBlockingMessage(result.error) : "";
    }
    return;
  }
  input.value = "";
  input.focus();
}

function openKeywordBlockingPanel() {
  if (!document.body) {
    document.addEventListener("DOMContentLoaded", openKeywordBlockingPanel, { once: true });
    return;
  }
  installKeywordBlockingStyles();
  closeKeywordBlockingPanel();

  const panel = document.createElement("aside");
  panel.id = KEYWORD_BLOCKING_PANEL_ID;

  const header = document.createElement("div");
  header.className = "bili-focus-keyword-header";

  const title = document.createElement("h2");
  title.className = "bili-focus-keyword-title";

  const closeButton = createKeywordBlockingIconButton("bili-focus-keyword-close", "close", closeKeywordBlockingPanel);
  closeButton.removeAttribute("title");
  header.append(title, closeButton);

  const body = document.createElement("div");
  body.className = "bili-focus-keyword-body";

  const tabs = document.createElement("div");
  tabs.className = "bili-focus-keyword-tabs";
  ["keyword", "regex"].forEach((type) => {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = "bili-focus-keyword-tab";
    tab.dataset.type = type;
    tab.addEventListener("click", () => {
      keywordBlockingActiveType = type;
      renderKeywordBlockingPanel();
      const input = panel.querySelector(".bili-focus-keyword-input");
      if (input) input.focus();
    });
    tabs.appendChild(tab);
  });

  const form = document.createElement("form");
  form.className = "bili-focus-keyword-form";
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitKeywordBlockingRule(panel);
  });

  const input = document.createElement("input");
  input.className = "bili-focus-keyword-input";
  input.type = "text";
  input.autocomplete = "off";

  const addButton = document.createElement("button");
  addButton.className = "bili-focus-keyword-add";
  addButton.type = "submit";
  form.append(input, addButton);

  const error = document.createElement("p");
  error.className = "bili-focus-keyword-error";

  const inlineMessage = document.createElement("div");
  inlineMessage.className = "bili-focus-keyword-inline-message";
  inlineMessage.setAttribute("role", "status");
  inlineMessage.setAttribute("aria-live", "polite");

  const list = document.createElement("div");
  list.className = "bili-focus-keyword-list";

  const footer = document.createElement("div");
  footer.className = "bili-focus-keyword-footer";

  const footerActions = document.createElement("div");
  footerActions.className = "bili-focus-keyword-footer-actions";

  const importButton = document.createElement("button");
  importButton.type = "button";
  importButton.className = "bili-focus-keyword-footer-button";
  importButton.dataset.keywordAction = "import";
  importButton.addEventListener("click", importKeywordBlockingRules);

  const exportButton = document.createElement("button");
  exportButton.type = "button";
  exportButton.className = "bili-focus-keyword-footer-button";
  exportButton.dataset.keywordAction = "export";
  exportButton.addEventListener("click", exportKeywordBlockingRules);

  const deleteAllButton = document.createElement("button");
  deleteAllButton.type = "button";
  deleteAllButton.className = "bili-focus-keyword-footer-button is-danger";
  deleteAllButton.dataset.keywordAction = "delete-all";
  deleteAllButton.addEventListener("click", deleteAllKeywordBlockingRules);

  const help = document.createElement("p");
  help.className = "bili-focus-keyword-help";

  const importHelp = document.createElement("p");
  importHelp.className = "bili-focus-keyword-help bili-focus-keyword-import-help";

  footerActions.append(importButton, exportButton, deleteAllButton);
  footer.append(footerActions, help, importHelp);
  body.append(tabs, form, error, inlineMessage, list);
  panel.append(header, body, footer);
  document.body.appendChild(panel);
  renderKeywordBlockingPanel();
  input.focus();
}

function initializeKeywordBlocking() {
  installKeywordBlockingStyles();
  chrome.storage.local.get([KEYWORD_BLOCKING_STORAGE_KEY, "language"], (result) => {
    keywordBlockingLanguage = getKeywordBlockingLanguage(result.language);
    setKeywordBlockingRules(result[KEYWORD_BLOCKING_STORAGE_KEY], false);
  });

  const startWhenReady = () => {
    startKeywordBlockingObserver();
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startWhenReady, { once: true });
  } else {
    startWhenReady();
  }
}

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request && request.action === "openKeywordBlockingPanel") {
    openKeywordBlockingPanel();
    sendResponse({ ok: true });
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;
  if (Object.prototype.hasOwnProperty.call(changes, KEYWORD_BLOCKING_STORAGE_KEY)) {
    setKeywordBlockingRules(changes[KEYWORD_BLOCKING_STORAGE_KEY].newValue, false);
  }
  if (Object.prototype.hasOwnProperty.call(changes, "language")) {
    keywordBlockingLanguage = getKeywordBlockingLanguage(changes.language.newValue);
    renderKeywordBlockingPanel();
    scheduleKeywordBlockingScan();
  }
});

initializeKeywordBlocking();
