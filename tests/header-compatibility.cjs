// BiliFocus 2.3.3 regression coverage. Fixtures contain no reporter data.
// Requires Playwright and a Chromium installation; see docs/header-compatibility.md.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = path.resolve(__dirname, '..');
const baseline = '257120235ff0e572aec8e85ec9f8b62c16e15648';
const keys = ['membership', 'messages', 'dongtai', 'favourites', 'history', 'tougao'];

function source(file, legacy) {
  return legacy
    ? execFileSync('git', ['show', `${baseline}:extension/content/${file}`], { cwd: root, encoding: 'utf8' })
    : fs.readFileSync(path.join(process.env.BILIFOCUS_EXTENSION_DIR || path.join(root, 'extension'), 'content', file), 'utf8');
}

function fixture(wrapped, loggedOut = false, noVip = false) {
  const roles = [
    ['avatar', 'header-avatar-wrap'], ['membership', wrapped ? 'vip-entry' : 'vip-wrap'],
    ['messages', 'message-entry'], ['dongtai', 'dynamic-entry'],
    ['favourites', 'favorite-entry'], ['history', 'history-entry'],
    ['creator', ''], ['upload', 'upload-entry'],
  ].filter(([role]) => !(noVip && role === 'membership'));
  const dataIdx = { messages: 'message', dongtai: 'dynamic', favourites: 'fav', history: 'history', creator: 'creation' };
  const rightItems = roles.map(([role, cls]) => {
    const tag = wrapped || role === 'membership' ? 'div' : 'li';
    const hasInner = role === 'avatar' || role === 'membership' || (!wrapped && role === 'upload');
    const popover = '<div class="v-popover is-bottom" style="position:absolute;width:180px;height:60px;left:-80px">Dropdown</div>';
    let trigger = `<a href="${role === 'creator' ? 'https://member.bilibili.com/platform/home' : '#'}" class="${wrapped ? 'right-entry__item-trigger' : 'right-entry-icon'}"><span>${role}</span></a>`;
    if (wrapped && loggedOut && dataIdx[role]) {
      trigger = `<div class="right-entry__item-trigger" data-idx="${dataIdx[role]}"><span>${role}</span></div>`;
      if (role !== 'creator') cls = '';
    }
    if (role === 'upload') trigger = wrapped
      ? '<a href="#"><div class="upload-entry__trigger"><svg class="trigger-icon"></svg><span class="trigger-text">Upload</span></div></a>'
      : '<a href="#"><div class="header-upload-entry"><svg class="header-upload-entry__icon"></svg><span class="header-upload-entry__text">Upload</span></div></a>';
    const content = trigger + (role === 'creator' ? '' : popover);
    const legacyClass = role === 'creator' ? 'right-entry-item' : role === 'upload' ? 'right-entry-item--upload' : hasInner ? cls : 'v-popover-wrap';
    return `<${tag} id="${role}" class="${wrapped ? `${cls} right-entry__item ${hasInner || role === 'creator' ? '' : 'v-popover-wrap'}` : legacyClass}">${hasInner ? `<div class="v-popover-wrap">${content}</div>` : content}</${tag}>`;
  }).join('');
  const leftItems = ['Home', 'Anime', 'Live'].map((name, index) => `<${wrapped ? 'div' : 'li'} id="left${index}" class="${wrapped ? `left-entry__item v-popover-wrap ${index === 0 ? 'home-page-entry' : ''}` : ''}"><a href="#" class="left-entry__item-trigger"><span>${name}</span></a></${wrapped ? 'div' : 'li'}>`).join('');
  return `<!doctype html><html><head><style>
    body { margin:0; font-family:Arial; } .bili-header { background:#eee; }
    .bili-header__banner { height:100px; background:green; }
    .bili-header__bar,.left-entry,.right-entry,.right-entry__main,.left-entry-main { display:flex; align-items:center; }
    .left-entry,.right-entry { list-style:none; margin:0; padding:0; }
    .right-entry > *, .right-entry__main > * { position:relative; margin:0 10px; min-width:38px; }
    .v-popover-wrap { position:relative; } .v-popover { background:white; }
    .right-entry__item-trigger { color:red; } .trigger-icon { width:17px; height:17px; }
  </style></head><body><div id="app"><div class="bili-feed4">
    <div class="bili-header ${wrapped ? 'bili-header--large' : 'large-header'}">
      <div class="bili-header__bar">
        <${wrapped ? 'div' : 'ul'} class="left-entry">${wrapped ? `<div class="left-entry-main">${leftItems}</div>` : leftItems}</${wrapped ? 'div' : 'ul'}>
        <div class="center-search-container"><div class="center-search__bar"><form id="nav-searchform"><input class="nav-search-input" placeholder="Suggested" title="Suggested"></form></div></div>
        <${wrapped ? 'div' : 'ul'} class="right-entry">${wrapped ? `<div class="right-entry__main">${rightItems}</div>` : rightItems}</${wrapped ? 'div' : 'ul'}>
      </div><div id="banner" class="bili-header__banner">Banner</div><div class="bili-header__channel">Channels</div>
    </div><main id="feed" class="bili-feed4-layout">Recommendations</main>
  </div></div></body></html>`;
}

async function setup(browser, markup, legacy = false) {
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.route('**/*', route => route.request().isNavigationRequest() && route.request().url() === 'https://www.bilibili.com/'
    ? route.fulfill({ contentType: 'text/html', body: markup }) : route.abort());
  await page.goto('https://www.bilibili.com/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    // Bilibili creates nested legacy <li> nodes through Vue's DOM API; the HTML
    // parser would otherwise auto-close the outer <li> in a string fixture.
    document.querySelectorAll('ul.right-entry > .vip-wrap > .v-popover-wrap, ul.right-entry > .right-entry-item--upload > .v-popover-wrap').forEach(node => {
      const li = document.createElement('li');
      li.className = node.className;
      li.append(...node.childNodes);
      node.replaceWith(li);
    });
    window.chrome = { runtime: { getURL: file => `https://extension.invalid/${file}` }, storage: { local: { set() {} } } };
    window.fetch = async () => ({ ok: true, json: async () => ({}) });
  });
  await page.addScriptTag({ content: source('clean-search.js', legacy) });
  // Exercise the production hideElements() and its helpers without unrelated
  // extension startup/storage listeners. The real page snapshot is also tested.
  const main = source('main.js', legacy);
  await page.addScriptTag({ content: main.slice(0, main.indexOf('\nlet lastRunTime =')) + '\nlet lastHideElementsTime = 0; const HIDE_ELEMENTS_MIN_DELAY = 50;' });
  await page.evaluate(() => {
    Object.keys(settings).forEach(key => { settings[key] = false; });
    cleanSearchBackground = { type: 'color', color: '#dde5ee' };
  });
  return page;
}

async function matrix(page) {
  return page.evaluate(keys => {
    const result = [];
    const properties = ['display', 'visibility', 'pointerEvents', 'position', 'color', 'backgroundColor', 'order', 'marginLeft', 'width', 'height'];
    const ids = ['banner', 'feed', 'avatar', 'membership', 'messages', 'dongtai', 'favourites', 'history', 'creator', 'upload', 'left0', 'left1', 'left2'];
    for (const mode of ['normal', 'clean-left', 'clean-right']) {
      for (const leftHidden of [false, true]) {
        for (let mask = 0; mask < 64; mask++) {
          Object.assign(settings, { cleansearchmode: mode !== 'normal', cleansearchrightnavleft: mode === 'clean-left', leftnavi: leftHidden });
          keys.forEach((key, index) => { settings[key] = !!(mask & (1 << index)); });
          hideElements(true);
          const nodes = {};
          ids.forEach(id => {
            const node = document.getElementById(id);
            if (!node) return;
            const style = getComputedStyle(node);
            const visible = !!node.getClientRects().length && style.visibility !== 'hidden' && style.display !== 'none';
            nodes[id] = { visible, css: properties.map(key => style[key]) };
          });
          result.push({ mode, leftHidden, mask, nodes });
        }
      }
    }
    return result;
  }, keys);
}

function assertWrappedMatrix(rows, noVip) {
  for (const row of rows) {
    const { nodes, mode, mask, leftHidden } = row;
    const label = JSON.stringify({ mode, mask, leftHidden, noVip });
    assert.equal(nodes.banner.visible, mode === 'normal', `banner ${label}`);
    assert.equal(nodes.avatar.visible, true, `avatar ${label}`);
    keys.forEach((key, index) => {
      if (noVip && key === 'membership') return;
      const ids = key === 'tougao' ? ['creator', 'upload'] : [key];
      ids.forEach(id => assert.equal(nodes[id].visible, !(mask & (1 << index)), `${id} ${label}`));
    });
    assert.equal(nodes.left1.visible, mode !== 'clean-left' && !leftHidden, `left nav ${label}`);
    if (mode !== 'normal') assert.equal(nodes.avatar.css[6], '99', `avatar order ${label}`);
  }
}

async function testDropdowns(page, wrapped) {
  const result = await page.evaluate(() => {
    Object.keys(settings).forEach(key => { settings[key] = false; });
    settings.cleansearchmode = settings.cleansearchrightnavleft = true;
    hideElements(true);
    return CLEAN_SEARCH_RIGHT_POPOVER_CACHE_ITEMS.filter(item => document.getElementById(item.key)).map(item => {
      const entry = document.getElementById(item.key);
      const popover = entry.querySelector('.v-popover');
      const definition = getCleanSearchRightPopoverItemDefinition(popover);
      const selector = typeof getCleanSearchRightPopoverDropdownSelector === 'function' ? getCleanSearchRightPopoverDropdownSelector(item) : item.dropdownSelector;
      setCleanSearchRightPopoverCacheEntry(item, 37, '0px');
      updateCleanSearchRightPopoverCacheStyle();
      return { key: item.key, resolved: definition && definition.key, matches: popover.matches(selector), hover: getCleanSearchRightNavItem(entry.querySelector('span')).id, margin: getComputedStyle(popover).marginLeft, cacheKey: getCleanSearchRightPopoverCacheKey(item) };
    });
  });
  for (const item of result) {
    assert.equal(item.resolved, item.key);
    assert.equal(item.matches, true, item.key);
    assert.equal(item.hover, item.key);
    assert.equal(item.margin, '37px', item.key);
    assert.equal(item.cacheKey.startsWith('wrapped-header;'), wrapped);
  }
}

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.BILIFOCUS_CHROMIUM_PATH ? { executablePath: process.env.BILIFOCUS_CHROMIUM_PATH } : {}) });
  try {
    const old = await setup(browser, fixture(false), true);
    const oldRows = await matrix(old);
    await old.close();
    const legacy = await setup(browser, fixture(false));
    const currentRows = await matrix(legacy);
    assert.deepEqual(currentRows, oldRows, 'Legacy computed styles/visibility changed from 2.3.2');
    await testDropdowns(legacy, false);
    await legacy.close();
    console.log(`PASS: ${oldRows.length} legacy setting combinations exactly match 2.3.2.`);
    for (const loggedOut of [false, true]) {
      for (const noVip of [false, true]) {
        const page = await setup(browser, fixture(true, loggedOut, noVip));
        assertWrappedMatrix(await matrix(page), noVip);
        await testDropdowns(page, true);
        await page.close();
        console.log(`PASS: 384 new-header combinations and dropdowns (loggedOut=${loggedOut}, noVip=${noVip}).`);
      }
    }
    if (process.env.BILIFOCUS_SNAPSHOT) {
      const snapshot = fs.readFileSync(process.env.BILIFOCUS_SNAPSHOT, 'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<link\b[^>]*>/gi, '');
      const page = await setup(browser, snapshot);
      if (process.env.BILIFOCUS_NATIVE_CSS) await page.addStyleTag({ content: fs.readFileSync(process.env.BILIFOCUS_NATIVE_CSS, 'utf8') });
      await page.evaluate(() => {
        document.querySelectorAll('style[id^="bili-focus-style"]').forEach(style => style.remove());
        Object.keys(settings).forEach(key => { settings[key] = true; });
        hideElements(true);
      });
      for (const selector of ['.bili-header__banner', '.vip-entry', '.message-entry', '.dynamic-entry', '.favorite-entry', '.history-entry', '.upload-entry']) {
        assert.equal(await page.locator(selector).first().isVisible(), false, `captured snapshot: ${selector}`);
      }
      assert.equal(await page.locator('.right-entry__main > .right-entry__item > a[href*="//member.bilibili.com/platform/home"]').isVisible(), false);
      assert.equal(await page.locator('.header-avatar-wrap').isVisible(), true);
      assert.equal(await page.locator('.nav-search-input').isVisible(), true);
      await page.close();
      console.log('PASS: reporter snapshot hides banner/navigation and keeps avatar/search visible.');
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
