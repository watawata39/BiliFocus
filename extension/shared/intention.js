// Shared validation and session policy; timestamps persist across worker restarts.
globalThis.BiliFocusIntention = {
  normalize(value = {}) {
    value = value && typeof value === "object" ? value : {};
    const number = (v, fallback, min, max) => Number.isFinite(v) ? Math.min(max, Math.max(min, Math.round(v))) : fallback;
    return {
      enabled: value.enabled === true,
      countdownSeconds: number(value.countdownSeconds, 10, 1, 120),
      awayMinutes: number(value.awayMinutes, 30, 1, 1440),
      reminder: typeof value.reminder === "string" ? value.reminder.slice(0, 300) : "",
    };
  },
  isBilibili(value) {
    try {
      const url = new URL(value);
      return ["http:", "https:"].includes(url.protocol) &&
        (url.hostname === "bilibili.com" || url.hostname.endsWith(".bilibili.com"));
    } catch (_) { return false; }
  },
  approved(session, now, minutes) {
    return !!session && session.approved === true &&
      now >= session.lastPresent && now - session.lastPresent < minutes * 60000;
  },
};
