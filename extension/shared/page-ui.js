const PAGE_MESSAGES = {
  en: {
    loadError: "Could not load settings. Please reload this page.",
    settings: "Settings", general: "General", clean: "Clean Search", blocking: "Video Card Blocking", intention: "Intention Check",
    support: "Support", supportMessage: "I develop and maintain BiliFocus on my own, as a labor of love.\nIf it has helped you, a donation is always welcome. Thank you for your support!", wechatCode: "WeChat donation code for BiliFocus",
    language: "Language", shortcut: "Focus search with /", navLeft: "Move right navigation to the left",
    navNote: "When enabled, the homepage's left navigation stays hidden, even if you choose to show it.",
    wallpaper: "Wallpapers", wallpaperNoteBeforeIcon: "With Clean Search Mode enabled, open the Bilibili homepage and click the pen icon", wallpaperNoteAfterIcon: " in the bottom-right corner to customize your background.",
    enable: "Enable Intention Check", intentionNote: "Pause before a new Bilibili visit. Continuing allows browsing across your tabs until you spend the chosen interval away. Returning to an existing page does not interrupt it; the next navigation starts the check.",
    duration: "Waiting time", seconds: "seconds", interval: "Time away before another check", minutes: "minutes",
    reminder: "Personal reminder", reminderHint: "What did you come here to watch?", optional: "Optional", preview: "Preview", saved: "Saved", saveError: "Could not save. Please try again.",
    pauseTitle: "A moment before Bilibili", pauseNote: "Is this how you want to spend your time right now?", continue: "Continue to Bilibili", leave: "Leave for now", waiting: "Take a breath", ready: "Your choice", previewLabel: "Preview", closePreview: "Close preview", unavailable: "This visit is no longer available. Open Bilibili again to start a new visit.", connection: "Could not connect. Retrying...", foreground: "The countdown pauses while you are away.",
  },
  zh: {
    loadError: "加载设置失败，请刷新此页重试。",
    settings: "设置", general: "常规", clean: "清爽搜索", blocking: "视频卡片屏蔽", intention: "访问前停一停",
    support: "打赏支持", supportMessage: "BiliFocus 由我独立开发和维护，全靠用爱发电。\n如果它帮到了你，也欢迎打赏支持，感激不尽！", wechatCode: "BiliFocus 的微信赞赏码",
    language: "语言", shortcut: "使用 / 键聚焦搜索栏", navLeft: "将右上导航栏移至左侧",
    navNote: "此项开启时，即使选择显示左上导航栏，主页也不会显示它。", wallpaper: "壁纸",
    wallpaperNoteBeforeIcon: "启用清爽搜索模式后，打开 B 站主页，点击右下角的笔图标", wallpaperNoteAfterIcon: "即可自定义背景。",
    enable: "启用访问前停一停", intentionNote: "在新一轮 B 站浏览前稍作停顿。选择继续后，各标签页均可正常浏览，直到你离开达到设定时长。返回已打开的页面不会打断当前内容，下次页面跳转时才会再次提醒。",
    duration: "等待时间", seconds: "秒", interval: "离开多久后再次提醒", minutes: "分钟", reminder: "给自己的提醒", reminderHint: "你这次来是想看什么？", optional: "选填", preview: "预览", saved: "已保存", saveError: "保存失败，请重试。",
    pauseTitle: "打开 B 站前，停一停", pauseNote: "这是你现在想花时间做的事吗？", continue: "继续访问 B 站", leave: "暂时离开", waiting: "稍作停顿", ready: "由你选择", previewLabel: "预览", closePreview: "关闭预览", unavailable: "此次访问已失效，请重新打开 B 站。", connection: "连接失败，正在重试……", foreground: "离开此页时，倒计时会暂停。",
  },
  ja: {
    loadError: "設定を読み込めませんでした。ページを再読み込みしてください。",
    settings: "設定", general: "一般", clean: "クリーンサーチ", blocking: "動画カードブロック", intention: "アクセス前の確認",
    support: "開発を支援", supportMessage: "BiliFocus は私一人で開発・メンテナンスしている、情熱だけで続けているプロジェクトです。\nお役に立てたなら、寄付で応援していただけるとうれしいです。ご支援に心から感謝します！", wechatCode: "BiliFocus への寄付用 WeChat コード",
    language: "言語", shortcut: "/ キーで検索欄にフォーカス", navLeft: "右ナビゲーションを左側に移動",
    navNote: "オンの場合、表示する設定にしていても、ホームの左ナビゲーションは表示されません。", wallpaper: "壁紙",
    wallpaperNoteBeforeIcon: "クリーンサーチモードを有効にして Bilibili のホームを開き、右下のペンアイコン", wallpaperNoteAfterIcon: "から背景を変更できます。",
    enable: "アクセス前の確認を有効にする", intentionNote: "Bilibili を見始める前に、ひと息。続行すると、他のタブでもそのまま閲覧できます。設定した時間だけ離れると、次のページへの移動時に再び確認します。開いたままのページに戻るだけでは、閲覧を中断しません。",
    duration: "待ち時間", seconds: "秒", interval: "再確認までの離席時間", minutes: "分", reminder: "自分へのメッセージ", reminderHint: "何を見に来ましたか？", optional: "任意", preview: "プレビュー", saved: "保存しました", saveError: "保存できませんでした。もう一度お試しください。",
    pauseTitle: "Bilibili の前に、ひと息", pauseNote: "今、この時間をどう使いたいですか？", continue: "Bilibili へ進む", leave: "今はやめる", waiting: "ひと休み", ready: "あなたの選択", previewLabel: "プレビュー", closePreview: "プレビューを閉じる", unavailable: "このアクセスは無効です。Bilibili をもう一度開いてください。", connection: "接続できません。再接続中…", foreground: "このページを離れると、カウントダウンは一時停止します。",
  },
};
let pageLanguage = BiliFocusLanguage.resolve();
function pageText(key) { return (PAGE_MESSAGES[pageLanguage] || PAGE_MESSAGES.en)[key] || PAGE_MESSAGES.en[key] || key; }
function localizePage(language) {
  pageLanguage = BiliFocusLanguage.resolve(language);
  document.documentElement.lang = pageLanguage === "zh" ? "zh-CN" : pageLanguage;
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = pageText(el.dataset.i18n); });
  document.querySelectorAll("[data-placeholder]").forEach(el => { el.placeholder = pageText(el.dataset.placeholder); });
  document.querySelectorAll("[data-alt]").forEach(el => { el.alt = pageText(el.dataset.alt); });
}
