# Header compatibility added in 2.3.3

The September 11, 2026 report contained BiliFocus 2.3.2's unchanged generated
stylesheet, but a different first-party Bilibili header. Bilibili's referenced
`laputa-home/assets/index-4a1ca406.js` bundle creates this markup; an extension
conflict is not required to reproduce the failure. Rollout status is unknown.

| Area | Legacy structure | New structure |
| --- | --- | --- |
| Large header | `.bili-header.large-header` | `.bili-header.bili-header--large` |
| Right navigation | `ul.right-entry > item` | `.right-entry > .right-entry__main > item` |
| Left navigation | `.left-entry > item` | `.left-entry > .left-entry-main > item` |
| Membership | `.vip-wrap` | `.vip-entry` |
| Upload button | `.header-upload-entry` | `.upload-entry .upload-entry__trigger` |

Clean Search uses allowlists at specific container boundaries. Keeping the
header at the feed boundary does not hide its banner when the next selector
fails to match the renamed header. Likewise, the new navigation wrapper makes
legacy direct-child positional selectors miss the actual entries.

## Compatibility boundaries

- Keep legacy selectors and their declarations. Add new branches scoped to the
  new classes/wrappers; do not remove or reparent Bilibili's Vue-managed nodes.
- Use `display: contents` on the new wrappers only while Clean Search is active.
  This retains the existing outer flex layout, spacing, and avatar order. Normal
  mode retains Bilibili's wrapper layout and visibility-only blocking.
- Resolve real navigation items through `getBiliFocusNavItemsContainer()` for
  visibility handling, foreground sampling, pointer/focus targets, and dropdowns.
- New navigation selectors use named roles and logged-out `data-idx` triggers.
  Bilibili can omit VIP for overseas users, so new item indices are not stable.
  Relational `:has()` branches are inside forgiving `:is()` lists to avoid
  invalidating legacy CSS in browsers without relational-selector support.
- Keep new dropdown offset keys separate with the `wrapped-header;` prefix.
  Existing legacy keys and selectors are preserved. Membership retains an inner
  popover wrapper; the new upload entry itself is the popover wrapper.
- Normal-mode rules live in `main.js`; Clean Search's collapsing rules live in
  `clean-search.js`. Both use the new role map defined in `clean-search.js`, which
  the manifest already loads first. Settings, defaults, permissions, storage
  format, startup handling, and unrelated page-blocking rules are unchanged.

Source comments containing `2.3.3` mark the compatibility changes. The bundle
builder intentionally strips JavaScript comments from ZIPs; consult repository
source for these annotations.

## Regression checks

Install Playwright in a test environment with Chromium, then run:

```sh
node tests/header-compatibility.cjs
```

`PLAYWRIGHT_MODULE` may point to an existing Playwright installation, and
`BILIFOCUS_CHROMIUM_PATH` may specify an existing Chromium executable. The Git
checkout must contain baseline commit `257120235ff0e572aec8e85ec9f8b62c16e15648`.

The test runs the production style generator and blocking functions in a real
browser. It compares computed styles and visibility with 2.3.2 on a legacy
fixture over 384 combinations: all 64 right-navigation setting combinations,
both left-navigation settings, and normal / Clean Search left / Clean Search
right layouts. New fixtures cover the same combinations for logged-in and
logged-out users, both with and without VIP, plus dropdown selection, hover
targets, cached offsets, and avatar order.

For a privately supplied page snapshot, optionally set `BILIFOCUS_SNAPSHOT` to
its HTML path and `BILIFOCUS_NATIVE_CSS` to its referenced native stylesheet.
Snapshot scripts and external resource requests are blocked. Do not commit
reporter HTML, account identifiers, correspondence, or recordings. The checked-in
fixtures are synthetic and contain no reporter information.

Build release ZIPs using the existing script:

```sh
python3 publishing/build_bundles.py
```

The Chrome/Edge bundle retains `background.service_worker`; the Firefox bundle
uses the builder's existing `background.scripts` conversion. This is a
compatibility release, not a change to the build or release-notes behavior.
