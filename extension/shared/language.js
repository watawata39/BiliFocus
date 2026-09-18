globalThis.BiliFocusLanguage = {
  resolve(savedLanguage) {
    if (["zh", "en", "ja"].includes(savedLanguage)) return savedLanguage;

    const locale = globalThis.chrome?.i18n?.getUILanguage?.() || globalThis.navigator?.language || "";
    const language = locale.toLowerCase().split(/[-_]/)[0];
    // The existing "zh" preference uses zh_CN translations for every Chinese variant.
    return ["zh", "ja"].includes(language) ? language : "en";
  },
};
