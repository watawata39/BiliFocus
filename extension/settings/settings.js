let intentionConfig = BiliFocusIntention.normalize();
const byId = id => document.getElementById(id);
let statusTimer;
async function save(values) {
  try {
    await chrome.storage.local.set(values);
    byId("save-status").dataset.i18n = "saved";
    byId("save-status").textContent = pageText("saved");
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => {
      byId("save-status").textContent = "";
      delete byId("save-status").dataset.i18n;
    }, 1800);
  } catch (_) {
    byId("save-status").dataset.i18n = "saveError";
    byId("save-status").textContent = pageText("saveError");
  }
}
function showSection() {
  const section = ["general", "clean", "blocking", "intention", "support"].includes(location.hash.slice(1)) ? location.hash.slice(1) : "general";
  document.querySelectorAll("main>section").forEach(el => { el.hidden = el.id !== section; });
  document.querySelectorAll("nav a").forEach(el => {
    if (el.hash === `#${section}`) el.setAttribute("aria-current", "page");
    else el.removeAttribute("aria-current");
  });
}
function showSettings(data, changed = ["language", "slashfocus", "cleansearchrightnavleft", "intentionCheck"]) {
  if (changed.includes("language")) {
    localizePage(data.language);
    document.title = `BiliFocus · ${pageText("settings")}`;
    byId("language").value = pageLanguage;
    document.querySelector("nav").setAttribute("aria-label", pageText("settings"));
  }
  for (const key of ["slashfocus", "cleansearchrightnavleft"]) {
    if (changed.includes(key)) byId(key).checked = data[key] !== false;
  }
  if (changed.includes("intentionCheck")) {
    intentionConfig = BiliFocusIntention.normalize(data.intentionCheck);
    byId("intention-enabled").checked = intentionConfig.enabled;
    byId("countdown").value = intentionConfig.countdownSeconds;
    byId("interval").value = intentionConfig.awayMinutes;
    byId("reminder").value = intentionConfig.reminder;
  }
}
async function initializeSettings() {
  const keys = ["language", "slashfocus", "cleansearchrightnavleft", "intentionCheck", "keywordblockrules"];
  const data = await chrome.storage.local.get(keys);
  showSettings(data);
  keywordBlockingLanguage = getKeywordBlockingLanguage(data.language);
  setKeywordBlockingRules(data.keywordblockrules, false);
  openKeywordBlockingPanel();
  showSection();
  window.addEventListener("hashchange", showSection);
  byId("language").addEventListener("change", () => save({ language: byId("language").value }));
  for (const id of ["slashfocus", "cleansearchrightnavleft"]) {
    byId(id).addEventListener("change", () => save({ [id]: byId(id).checked }));
  }
  for (const id of ["intention-enabled", "countdown", "interval", "reminder"]) {
    byId(id).addEventListener("change", () => {
      if (!byId("countdown").reportValidity() || !byId("interval").reportValidity()) return;
      intentionConfig = BiliFocusIntention.normalize({
        enabled: byId("intention-enabled").checked, countdownSeconds: byId("countdown").valueAsNumber,
        awayMinutes: byId("interval").valueAsNumber, reminder: byId("reminder").value,
      });
      save({ intentionCheck: intentionConfig });
    });
  }
  byId("preview").addEventListener("click", () => chrome.tabs.create({ url: chrome.runtime.getURL("intention/index.html?preview=1") }));
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local") return;
    const changed = keys.slice(0,4).filter(key => changes[key]);
    if (changed.length) showSettings(Object.fromEntries(changed.map(key => [key, changes[key].newValue])), changed);
  });
}
initializeSettings().catch(() => {
  // Do not allow edits based on incomplete or unread settings.
  document.querySelector(".layout").inert = true;
  byId("save-status").dataset.i18n = "loadError";
  byId("save-status").textContent = pageText("loadError");
}).finally(() => {
  document.body.removeAttribute("aria-busy");
  document.body.hidden = false;
});
