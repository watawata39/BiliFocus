// Rule schema, validation, and messages shared by filtering and the settings editor.

const KEYWORD_BLOCKING_STORAGE_KEY = "keywordblockrules";

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
    keywordTab: "Keywords",
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
let keywordBlockingLanguage = BiliFocusLanguage.resolve();

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
  return BiliFocusLanguage.resolve(value);
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

function isUnsafeKeywordBlockingRegex(source) {
  // Rejects nested quantifiers like (a+)+, (a*)*, (a+)* which can trigger
  // catastrophic backtracking (exponential-time matching) in the regex engine.
  return /\([^()]*[+*][^()]*\)[+*]/.test(source);
}

function normalizeKeywordBlockingRule(rule) {
  if (!rule || typeof rule !== "object") return null;
  const type = rule.type === "regex" ? "regex" : "keyword";
  const raw = typeof rule.raw === "string" ? rule.raw.trim() : "";
  const source = typeof rule.source === "string" ? rule.source : "";
  const flags = sanitizeKeywordBlockingFlags(rule.flags);
  if (!raw || !source) return null;
  if (type === "regex" && isUnsafeKeywordBlockingRegex(source)) return null;
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
