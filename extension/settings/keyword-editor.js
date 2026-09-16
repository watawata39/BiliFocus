let keywordBlockingActiveType = "keyword";
let keywordBlockingInlineMessageTimer = 0;
let keywordDialogPreviousFocus = null;

function saveKeywordBlockingRules() {
  chrome.storage.local.set({ [KEYWORD_BLOCKING_STORAGE_KEY]: keywordBlockingRules }).catch(async () => {
    showKeywordBlockingDialog({ message: pageText("saveError") });
    const data = await chrome.storage.local.get(KEYWORD_BLOCKING_STORAGE_KEY).catch(() => null);
    if (data) setKeywordBlockingRules(data[KEYWORD_BLOCKING_STORAGE_KEY], false);
  });
}

function setKeywordBlockingRules(nextRules, shouldSave = true) {
  keywordBlockingRules = normalizeKeywordBlockingRules(nextRules);
  if (shouldSave) saveKeywordBlockingRules();
  renderKeywordBlockingPanel();
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

function createKeywordBlockingIconButton(className, titleKey, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
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
  if (keywordDialogPreviousFocus?.isConnected) keywordDialogPreviousFocus.focus();
  keywordDialogPreviousFocus = null;
}

function showKeywordBlockingDialog({ title = "", message = "", buttons = [] }) {
  const panel = document.getElementById(KEYWORD_BLOCKING_PANEL_ID);
  if (!panel) return;

  closeKeywordBlockingDialog();
  keywordDialogPreviousFocus = document.activeElement;
  const overlay = document.createElement("div");
  overlay.className = "bili-focus-keyword-dialog-overlay";

  const dialog = document.createElement("div");
  dialog.className = "bili-focus-keyword-dialog";
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-label", title || message);
  overlay.addEventListener("keydown", event => {
    if (event.key === "Escape") { event.preventDefault(); closeKeywordBlockingDialog(); }
    if (event.key !== "Tab") return;
    const buttons = [...dialog.querySelectorAll("button")];
    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

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

  const primaryButton = actions.querySelector("button");
  if (primaryButton) primaryButton.focus();
}

function renderKeywordBlockingPanel() {
  const panel = document.getElementById(KEYWORD_BLOCKING_PANEL_ID);
  if (!panel) return;

  const tabs = panel.querySelectorAll(".bili-focus-keyword-tab");
  tabs.forEach((tab) => {
    const type = tab.dataset.type;
    tab.classList.toggle("is-active", type === keywordBlockingActiveType);
    tab.setAttribute("aria-pressed", String(type === keywordBlockingActiveType));
    const label = document.createElement("span");
    label.textContent = getKeywordBlockingMessage(type === "regex" ? "regexTab" : "keywordTab");
    const count = document.createElement("span");
    count.className = "bili-focus-keyword-count";
    count.textContent = keywordBlockingRules.filter(rule => rule.type === type).length;
    tab.replaceChildren(label, count);
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
  input.setAttribute("aria-label", input.placeholder);
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
}

function openKeywordBlockingPanel() {
  if (!document.body) {
    document.addEventListener("DOMContentLoaded", openKeywordBlockingPanel, { once: true });
    return;
  }
  closeKeywordBlockingPanel();

  const panel = document.createElement("aside");
  panel.id = KEYWORD_BLOCKING_PANEL_ID;

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
  const toolbar = document.createElement("div");
  toolbar.className = "bili-focus-keyword-toolbar";
  toolbar.append(tabs, footerActions);
  footer.append(help, importHelp);
  body.append(form, error, inlineMessage, list);
  panel.append(toolbar, body, footer);
  document.getElementById("blocking-editor").appendChild(panel);
  renderKeywordBlockingPanel();
}


chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;
  if (changes.keywordblockrules) setKeywordBlockingRules(changes.keywordblockrules.newValue, false);
  if (changes.language) {
    keywordBlockingLanguage = getKeywordBlockingLanguage(changes.language.newValue);
    renderKeywordBlockingPanel();
  }
});
const KEYWORD_BLOCKING_PANEL_ID = "bili-focus-keyword-panel";
const KEYWORD_BLOCKING_EXPORT_TYPE = "bilifocus-keyword-blocking-settings";
