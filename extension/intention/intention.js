(() => {
  const params = new URLSearchParams(location.search);
  const preview = params.get("preview") === "1";
  const token = params.get("token");
  const get = id => document.getElementById(id);
  let tabId;
  let busy = false;
  let remaining = 0;
  let tickAt = null;
  let timer;
  let stopped = false;
  let progressing = false;
  let pollGeneration = 0;
  const visible = () => document.visibilityState === "visible" && document.hasFocus();
  const send = action => chrome.runtime.sendMessage({ action, token, tabId, visible: visible() });
  function render(seconds, reminder) {
    get("countdown").textContent = seconds > 0 ? String(seconds) : "0";
    get("countdown").setAttribute("aria-label", `${seconds} ${pageText("seconds")}`);
    get("status").textContent = pageText(seconds > 0 ? "waiting" : "ready");
    get("continue").disabled = seconds > 0;
    get("reminder").textContent = reminder || "";
    get("reminder").hidden = !reminder;
  }
  async function tick() {
    if (busy || stopped || progressing) return;
    const generation = pollGeneration;
    busy = true;
    try {
      if (preview) {
        const now = performance.now();
        if (tickAt !== null && visible() && now - tickAt <= 1500) remaining = Math.max(0, remaining - (now - tickAt));
        tickAt = visible() ? now : null;
        render(Math.ceil(remaining / 1000), get("reminder").textContent);
      } else {
        const result = await send("intentionTick");
        if (progressing || generation !== pollGeneration) return;
        if (!result || result.error) {
          stopped = true;
          get("status").textContent = pageText("unavailable");
          get("continue").disabled = true;
          clearInterval(timer);
        } else render(result.remaining, result.reminder);
      }
    } catch (_) {
      if (progressing || generation !== pollGeneration) return;
      get("status").textContent = pageText("connection");
      get("continue").disabled = true;
    } finally { busy = false; }
  }
  function resumePolling() {
    progressing = false;
    timer = setInterval(tick, 500);
  }
  async function close() {
    if (tabId == null) tabId = (await chrome.tabs.getCurrent()).id;
    if (preview) await chrome.tabs.remove(tabId);
    else await send("intentionLeave");
  }
  async function initialize() {
    const [data, tab] = await Promise.all([chrome.storage.local.get(["language", "intentionCheck"]), chrome.tabs.getCurrent()]);
    tabId = tab.id;
    localizePage(data.language);
    document.title = `BiliFocus · ${pageText("intention")}`;
    get("preview-label").hidden = !preview;
    if (preview) {
      const config = BiliFocusIntention.normalize(data.intentionCheck);
      remaining = config.countdownSeconds * 1000;
      get("leave").textContent = pageText("closePreview");
      render(config.countdownSeconds, config.reminder);
    }
    get("continue").addEventListener("click", async () => {
      if (get("continue").disabled || progressing) return;
      progressing = true;
      // Approval consumes the pending visit. Stop polling before requesting it,
      // and invalidate any earlier tick that is still awaiting a response.
      pollGeneration++;
      clearInterval(timer);
      get("continue").disabled = true;
      try {
        if (preview) { await close(); return; }
        const result = await send("intentionContinue");
        if (BiliFocusIntention.isBilibili(result?.destination)) {
          location.replace(result.destination);
          return;
        }
        resumePolling();
        await tick();
      } catch (_) {
        resumePolling();
        get("status").textContent = pageText("connection");
      }
    });
    for (const event of ["focus", "blur", "pageshow"]) window.addEventListener(event, () => { if (!visible()) tickAt = null; tick(); });
    document.addEventListener("visibilitychange", () => { if (!visible()) tickAt = null; tick(); });
    await tick();
    timer = setInterval(tick, 500);
  }
  get("leave").addEventListener("click", () => close().catch(() => { get("status").textContent = pageText("connection"); }));
  function start() {
    initialize().catch(() => {
      get("status").textContent = pageText("connection");
      setTimeout(start, 2000);
    });
  }
  start();
})();
