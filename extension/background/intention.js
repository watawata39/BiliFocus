(() => {
  const policy = BiliFocusIntention;
  const settingsUrl = chrome.runtime.getURL("settings/index.html");
  const bufferUrl = chrome.runtime.getURL("intention/index.html");
  let queue = Promise.resolve();
  let sessions = {};
  let pending = {};
  let config = policy.normalize();
  let lastPersisted = {};
  const storedPendingTokens = new Set();
  const redirects = new Map();
  const ready = chrome.storage.local.get(["intentionCheck", "intentionSessions", "intentionPending"]).then(data => {
    config = policy.normalize(data.intentionCheck);
    sessions = data.intentionSessions || {};
    pending = data.intentionPending || {};
    Object.values(pending).forEach(entry => storedPendingTokens.add(entry.token));
    lastPersisted = { intentionSessions: JSON.stringify(data.intentionSessions || {}), intentionPending: JSON.stringify(data.intentionPending || {}) };
    // Never credit time between background-worker instances to a countdown.
    Object.values(pending).forEach(p => { p.tickAt = null; });
    configureAlarm();
  });
  function serial(work) {
    const task = queue.then(() => ready).then(work);
    queue = task.catch(error => console.warn("BiliFocus Intention Check:", error));
    return task;
  }
  const scope = tab => tab.incognito ? "private" : "normal";
  const valid = tab => policy.approved(sessions[scope(tab)], Date.now(), config.awayMinutes);
  function configureAlarm() {
    if (config.enabled) chrome.alarms.create("intention-presence", { periodInMinutes: 1 });
    else chrome.alarms.clear("intention-presence");
  }
  async function persist() {
    // Private browsing state is only retained in this background instance.
    const publicPending = Object.fromEntries(Object.entries(pending).filter(([, p]) => !p.incognito));
    const values = { intentionSessions: sessions.normal ? { normal: sessions.normal } : {}, intentionPending: publicPending };
    const changed = Object.fromEntries(Object.entries(values).filter(([key, value]) => JSON.stringify(value) !== lastPersisted[key]));
    if (Object.keys(changed).length) {
      await chrome.storage.local.set(changed);
      for (const [key, value] of Object.entries(changed)) lastPersisted[key] = JSON.stringify(value);
    }
  }
  async function activeTab() {
    const window = await chrome.windows.getLastFocused();
    if (!window.focused) return null;
    const tabs = await chrome.tabs.query({ active: true, windowId: window.id });
    return tabs[0] || null;
  }
  function finishPresence(now) {
    for (const session of Object.values(sessions)) {
      // A stale heartbeat after sleep must not revive an expired visit.
      if (session.foregroundTabId != null && now >= session.lastPresent && now - session.lastPresent <= 90000) {
        session.lastPresent = now;
      }
      session.foregroundTabId = null;
    }
  }
  async function trackFocus() {
    if (!config.enabled && Object.keys(pending).length === 0) return;
    const now = Date.now();
    const tab = await activeTab();
    const next = tab && policy.isBilibili(tab.url) ? tab : null;
    // An expired session cannot be revived by focusing an old page.
    finishPresence(now);
    if (next && valid(next)) {
      sessions[scope(next)].lastPresent = now;
      sessions[scope(next)].foregroundTabId = next.id;
    }
    Object.entries(pending).forEach(([id, p]) => {
      if (!tab || Number(id) !== tab.id) p.tickAt = null;
    });
    await persist();
  }
  async function visit(tab, url) {
    if (!config.enabled || !policy.isBilibili(url)) return { allow: true };
    await trackFocus();
    if (valid(tab)) {
      return { allow: true };
    }
    const previous = pending[tab.id];
    const entry = previous && previous.target === url ? previous : {
      token: crypto.randomUUID(), target: url, remaining: config.countdownSeconds * 1000,
      incognito: !!tab.incognito, tickAt: null,
    };
    pending[tab.id] = entry;
    await persist();
    return { allow: false, redirect: `${bufferUrl}?token=${entry.token}` };
  }
  async function checkNavigation(tabId, url, documentId) {
    if (!config.enabled) return { allow: true };
    const frame = await chrome.webNavigation.getFrame({ tabId, frameId: 0 });
    // tabs.get().url can still describe the previous page during document_start.
    // Validate the actual document instead, without redirecting a newer navigation.
    if (!frame || frame.url !== url || (documentId && frame.documentId && documentId !== frame.documentId)) return { allow: true };
    const tab = await chrome.tabs.get(tabId);
    const result = await visit(tab, url);
    if (result.redirect) {
      const dispatched = redirects.get(tabId);
      if (dispatched && dispatched.url === url && dispatched.documentId === frame.documentId && dispatched.result.redirect === result.redirect) return dispatched.result;
      const current = await chrome.webNavigation.getFrame({ tabId, frameId: 0 });
      if (!current || current.url !== url || (frame.documentId && current.documentId && frame.documentId !== current.documentId)) return { allow: true };
      await chrome.tabs.update(tabId, { url: result.redirect });
      redirects.set(tabId, { url, documentId: frame.documentId, result });
    }
    return result;
  }
  async function bufferAction(message, sender) {
    const tab = sender.tab;
    // Ignore late messages from a buffer that this tab has already left.
    if (!tab || !sender.url?.startsWith(bufferUrl) || (await chrome.tabs.get(tab.id)).url !== sender.url) return { error: true };
    // A restored tab can message before onStartup has remapped its old tab ID.
    let p = tab && pending[tab.id];
    if (tab && sender.url?.startsWith(bufferUrl) && (!p || p.token !== message.token)) {
      const old = Object.entries(pending).find(([, entry]) => entry.token === message.token && !!entry.incognito === !!tab.incognito);
      if (old) {
        delete pending[old[0]];
        p = pending[tab.id] = old[1];
        p.tickAt = null;
      }
    }
    if (!p || p.token !== message.token || !sender.url?.startsWith(bufferUrl)) return { error: true };
    const current = await activeTab();
    const now = Date.now();
    if (p.tickAt !== null && current?.id === tab.id && message.visible) {
      const elapsed = now - p.tickAt;
      if (elapsed >= 0 && elapsed <= 1500) p.remaining = Math.max(0, p.remaining - elapsed);
    }
    p.tickAt = current?.id === tab.id && message.visible ? now : null;
    const mayContinue = !config.enabled || valid(tab) || p.remaining === 0;
    if (message.action === "intentionContinue" && mayContinue) {
      sessions[scope(tab)] = { approved: true, lastPresent: now };
      redirects.delete(tab.id);
      delete pending[tab.id];
      await persist();
      return { destination: p.target };
    }
    await persist();
    return { remaining: mayContinue ? 0 : Math.ceil(p.remaining / 1000), target: p.target, reminder: config.reminder };
  }
  chrome.runtime.onMessage.addListener((message, sender, respond) => {
    if (!["openSettings", "intentionVisit", "intentionTick", "intentionContinue", "intentionLeave"].includes(message?.action)) return;
    serial(async () => {
      if (message.action === "openSettings") {
        const section = ["general", "clean", "blocking", "intention", "support"].includes(message.section) ? message.section : "general";
        const tabs = await chrome.tabs.query({});
        const source = sender.tab || await activeTab();
        const existing = tabs.find(tab => tab.url?.split("#")[0] === settingsUrl && !!tab.incognito === !!source?.incognito);
        if (existing) {
          await chrome.tabs.update(existing.id, { active: true, url: `${settingsUrl}#${section}` });
          await chrome.windows.update(existing.windowId, { focused: true });
        } else await chrome.tabs.create({ url: `${settingsUrl}#${section}` });
        return { ok: true };
      }
      if (message.action === "intentionVisit") {
        if (!sender.tab || sender.frameId !== 0 || !policy.isBilibili(sender.url)) return { allow: true };
        return checkNavigation(sender.tab.id, sender.url, sender.documentId);
      }
      if (!sender.tab && sender.url?.startsWith(bufferUrl) && Number.isInteger(message.tabId)) {
        const tab = await chrome.tabs.get(message.tabId);
        if (tab.url !== sender.url) return { error: true };
        sender = { ...sender, tab };
      }
      if (message.action === "intentionLeave") {
        if (sender.tab && sender.url?.startsWith(bufferUrl)) {
          redirects.delete(sender.tab.id);
          delete pending[sender.tab.id];
          await persist();
          await chrome.tabs.remove(sender.tab.id);
        }
        return { ok: true };
      }
      return bufferAction(message, sender);
    }).then(respond, () => respond({ error: true }));
    return true;
  });
  chrome.tabs.onActivated.addListener(() => { serial(trackFocus); });
  chrome.windows.onFocusChanged.addListener(() => { serial(trackFocus); });
  chrome.tabs.onUpdated.addListener((id, changes) => {
    if (!changes.url) return;
    serial(async () => {
      const p = pending[id];
      if (p && !policy.isBilibili(changes.url) && changes.url.split("#")[0] !== `${bufferUrl}?token=${p.token}`) {
        // Navigation away starts a new wait; switching tabs only pauses it.
        // Keep the token so browser Back can reopen the buffer with a full timer.
        p.remaining = config.countdownSeconds * 1000;
        p.tickAt = null;
        redirects.delete(id);
      }
      await trackFocus();
    });
  });
  chrome.tabs.onRemoved.addListener(id => { serial(async () => {
    redirects.delete(id);
    delete pending[id];
    await trackFocus();
  }); });
  // Check committed documents even if their content-script message is delayed/lost.
  // Both entry points share the queue and validate the current document.
  function onNavigation(details) {
    if (details.frameId !== 0 || !policy.isBilibili(details.url)) return;
    serial(() => checkNavigation(details.tabId, details.url, details.documentId));
  }
  const navigationFilter = { url: [{ hostEquals: "bilibili.com" }, { hostSuffix: ".bilibili.com" }] };
  chrome.webNavigation.onCommitted.addListener(details => {
    if (details.frameId === 0) redirects.delete(details.tabId);
    onNavigation(details);
  }, navigationFilter);
  chrome.webNavigation.onHistoryStateUpdated.addListener(onNavigation, navigationFilter);
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local" || !changes.intentionCheck) return;
    serial(async () => {
      const next = policy.normalize(changes.intentionCheck.newValue);
      if (config.enabled !== next.enabled) {
        sessions = {};
        redirects.clear();
      }
      config = next;
      configureAlarm();
      await persist();
    });
  });
  chrome.runtime.onStartup.addListener(() => { serial(async () => {
    Object.values(sessions).forEach(session => { session.foregroundTabId = null; });
    // Restored buffers keep their token in the URL, even if tab IDs changed.
    const tabs = await chrome.tabs.query({});
    const remapped = {};
    // A first visit can arrive before onStartup finishes. Do not discard its token.
    for (const [id, entry] of Object.entries(pending)) {
      if (!storedPendingTokens.has(entry.token)) remapped[id] = entry;
    }
    for (const tab of tabs) {
      if (!tab.url?.startsWith(bufferUrl)) continue;
      const token = new URL(tab.url).searchParams.get("token");
      const p = Object.values(pending).find(value => value.token === token);
      if (p) remapped[tab.id] = p;
    }
    pending = remapped;
    await persist();
  }); });
  chrome.alarms.onAlarm.addListener(alarm => {
    if (alarm.name === "intention-presence") serial(trackFocus);
  });
})();
