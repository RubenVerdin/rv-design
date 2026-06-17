# RV Design System

A **token-driven Vue 3 component library**, recreated here as a design system: low-level design tokens, reusable UI primitives, and full-screen product recreations. The whole system is built so a consuming product can re-theme it — including switching between **light and dark mode** — by overriding a single layer of CSS custom properties.

> **What this is.** RV Design favours *simple* foundations — surfaces, sizes, states (disabled / hover / active), and type — over decoration. It is a developer-facing kit meant to be customised, not a heavily opinionated brand.

## Sources & provenance
- **No codebase or Figma file was attached.** The system was designed from a written brief ("RV Design — a Vue 3 component library utilising design tokens; simple styles focusing on surfaces, sizes, states and fonts; developer-focused and customisable").
- A **reference screenshot** of a Naive-UI-style component documentation page (`uploads/Screenshot 2026-06-14 002042.png`) was used **only** as a taxonomy guide for the button **type × variant × size** matrix and the light/dark split. The **colour direction** is a natural / architectural palette specified by the brief: forest green `#4A5C42` primary, charcoal `#1A1816` text + dark surfaces, warm ivory `#FAF9F7` backgrounds, stone/taupe `#D5CEC5` neutrals, and walnut/caramel `#A97844` accent. The components, code, and visual treatment here are original — not a reproduction of any third-party library.

---

## CONTENT FUNDAMENTALS — how RV writes

RV Design is documentation-voice: the copy of a developer tool, not marketing.

- **Tone:** plain, precise, second-person. "Choose a single value from a list." "Set `data-theme="dark"`." Instructions, not adjectives.
- **Person:** address the developer as **you**; refer to the library as **RV Design** or **the library**. Avoid "we/our" except in onboarding prose.
- **Casing:** **Sentence case everywhere** — headings, buttons, menu items ("Save changes", "Invite", "Delete workspace"). Never Title Case UI labels. Component and type names are Capitalised when referring to the API (Button, `type="primary"`).
- **Component descriptions** are one sentence, present tense, starting with the component name: *"Button is used to trigger an action."* *"Accordion shows expandable, stacked sections."*
- **Code voice:** token names, prop values, and snippets are set in mono and wrapped in code chips (`--rv-accent`, `type="primary"`, `data-theme`). Props are referred to by their literal value.
- **No emoji, no exclamation marks, no hype.** Numbers are concrete ("20 primitives", "8 / 10 seats"). Status words are short: Active, Invited, Stable, Beta.
- **Vibe:** quiet, technical, trustworthy. The interest comes from precision and the natural forest-green + walnut palette, not from flourish.

---

## VISUAL FOUNDATIONS

**Colour.** A natural, architectural palette — **forest green** primary (`--rv-primary-*`, `#4A5C42`, oklch hue ~137), **warm ivory** page surfaces (`#FAF9F7`), **charcoal** text + dark surfaces (`#1A1816`), and **warm stone / taupe** neutrals (`#D5CEC5`, hue ~74) for borders and dividers — deliberately warm rather than the usual cool blue-and-gray SaaS gray. A **walnut / caramel** scale (`--rv-walnut-*` / `--rv-accent-warm`, `#A97844`, hue ~62) is the secondary brand accent. Semantic families are muted slate-blue **info**, clean **success** green (kept distinct from the forest primary), ochre **warning** in the walnut family, and terracotta **error** — each a small set of steps. Reference the semantic aliases (`--rv-accent`, `--rv-surface-card`, `--rv-color-<type>`) in components, never the raw scales. scale plus a `--rv-color-<type>` channel used by components. Neutrals are a cool slate scale (hue ~265). Components **never** reference raw scales; they read **semantic aliases** (`--rv-surface-*`, `--rv-text-*`, `--rv-border-*`, `--rv-accent`, `--rv-state-*`). All colour is authored in **oklch** so a scale's hue/chroma can be retuned in one place.

**Light & dark mode.** Default behaviour **follows the OS**: with no `data-theme` set, `@media (prefers-color-scheme: dark)` applies the dark tokens automatically. To pin a theme regardless of OS, set `data-theme="light"` or `data-theme="dark"` on any ancestor (typically `<html>` or the `.rv-app` root) — an explicit value always wins over the system preference. Only the semantic-alias block is overridden — raw palette scales stay constant. Dark surfaces are warm **charcoal** (`--rv-surface-page` ≈ #141210, cards ≈ #1A1816); accent and semantic *text* colours brighten one or two steps for contrast. Soft/secondary fills use `color-mix(... in oklab, var(--color) N%, transparent)` so a single rule renders correctly over both themes.

**Type.** UI sans is **Hanken Grotesk** (`--rv-font-sans`); code/token mono is **JetBrains Mono** (`--rv-font-mono`). Both are loaded from Google Fonts (see *Font substitution* below). Scale runs `--rv-text-2xs` (11px) → `--rv-text-4xl` (48px); default UI size is `--rv-text-md` (14px). Headings use tight tracking (`-0.018em`) and balanced wrapping; level 6 is an uppercase overline. Weights 400–800.

**Spacing & sizing.** 4px base grid (`--rv-space-1` … `--rv-space-12`). Controls come in three heights — `sm 28 / md 36 / lg 44` (`--rv-control-h-*`) — with matching horizontal padding and font-size tokens. Buttons add a fourth, denser scale (tiny/small/medium/large).

**Radius.** Calm and slightly rounded: `--rv-radius-md` (7px) is the default control radius, `lg` (10px) for cards, `full` for pills/avatars. Nothing is sharp; nothing is bubbly.

**Elevation.** Soft, low-spread shadows tinted with the neutral hue (not pure black), `--rv-shadow-xs … xl`. Cards are mostly **flat with a 1px border**; elevation is reserved for overlays (menus, popovers, dialogs) and the optional `raised` card variant. Menus/dropdowns use `--rv-shadow-lg`.

**Borders.** 1px hairlines are the primary separator. `--rv-border-subtle` for internal dividers, `--rv-border-default` for control outlines, `--rv-border-strong` on hover. In dark mode borders are translucent white (`color-mix(... var(--rv-neutral-0) N%, transparent)`).

**States** (a first-class concern here):
- **Hover** — neutral controls darken/lighten via `--rv-state-hover` (a low-alpha overlay); coloured buttons step to `--rv-color-<type>-hover`.
- **Active/press** — a subtle `translateY(0.5px) scale(0.985)` plus `--rv-state-active`.
- **Selected** — `--rv-state-selected` (accent tint) with accent text.
- **Focus** — a 3px `--rv-focus-ring` box-shadow (accent at ~50% alpha); never a raw outline.
- **Disabled** — `opacity: .45`, `cursor: not-allowed`, pointer events off.

**Motion.** Short and functional: 80–320ms, default `--rv-ease-standard` `cubic-bezier(0.2,0,0.1,1)`. Menus/tooltips fade+rise 4px; accordions animate `grid-template-rows`; switches slide the thumb. **No bounce, no decorative loops.** Everything collapses under `prefers-reduced-motion`.

**Backgrounds & imagery.** Flat surface colours only — no gradients, no textures, no illustration. The product chrome leans on hairline borders and a faint top-bar `backdrop-filter: blur(8px)`. The only "brand image" is a green rounded-square **RV** wordmark mark.

**Cards.** Surface = `--rv-surface-card`, 1px `--rv-border-default`, `--rv-radius-lg`, optional header/footer separated by `--rv-border-subtle`. Default is flat; `raised` adds `--rv-shadow-md`; `hoverable` lifts 1px on hover.

---

## ICONOGRAPHY

- **Style:** thin, rounded **line icons** — 2px stroke, `stroke-linecap/linejoin: round`, 24×24 viewBox, `currentColor` fill. This matches Lucide / Feather conventions.
- **Source:** icons in the components and UI kits are authored inline as small SVGs in the JSX (chevrons, check, close, search, menu dots, theme sun/moon, etc.) so the kit is dependency-free. They inherit `color` and size via `1em`/`--rv-icon-*` tokens.
- **Substitution flag:** there is **no bundled icon font or sprite** (no codebase was provided). For production, pair RV Design with **[Lucide](https://lucide.dev)** (or Feather/Heroicons-outline) — same 2px rounded-line language — and size them with `--rv-icon-sm|md|lg`. Swap if your product already has an icon set.
- **Emoji / unicode:** not used as UI icons. The only non-SVG glyph used decoratively is the `✓` selected-check in menus and `*` required-marker.

---

## Font substitution (action needed)
No font binaries were provided, so **Hanken Grotesk** and **JetBrains Mono** are loaded from **Google Fonts** via `@import` in `tokens/fonts.css` (not self-hosted). If RV Design has its own UI/mono typefaces, drop the `.woff2` files in `assets/fonts/`, replace the `@import` with `@font-face` rules, and keep the `--rv-font-sans` / `--rv-font-mono` variable names.

---

## Index / manifest

**Foundations**
- `styles.css` — the single entry point consumers link (imports everything below).
- `tokens/` — `colors.css` (light + dark semantic aliases), `typography.css`, `spacing.css`, `radius.css`, `elevation.css`, `motion.css`, `fonts.css`.
- `css/` — component stylesheets (the React components emit these classes); aggregated by `css/components.css`.
- `guidelines/*.card.html` — foundation specimen cards (Colors, Type, Spacing, States).

**Components** (`components/<group>/`) — React mirrors, exported on `window.RVDesignSystem_87e467`:
- `buttons/` — **Button**
- `forms/` — **Input, Textarea, Select, Checkbox, Radio, RadioGroup, Switch, FormField**
- `navigation/` — **Tabs, Accordion, Dropdown**
- `data-display/` — **Card, Badge, Tag, Avatar**
- `feedback/` — **Alert, Spinner, Tooltip**
- `typography/` — **Heading**

**UI kits** (`ui_kits/<product>/`)
- `docs/` — the component **documentation site** (sidebar nav, live demo cards, light/dark toggle).
- `dashboard/` — a **settings dashboard** showing the primitives composed into a real product view.

**Other**
- `SKILL.md` — Agent-Skills-compatible entry point.
- `readme.md` — this file.

## Theming quickstart
```html
<link rel="stylesheet" href="styles.css" />
<!-- Omit data-theme to follow the OS (prefers-color-scheme). -->
<div class="rv-app"> … </div>
<!-- Or pin a theme to override the OS: -->
<div class="rv-app" data-theme="dark"> … </div>
```
```js
// pin / toggle a theme (overrides the OS preference)
document.documentElement.dataset.theme =
  document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';

// remove the attribute to go back to following the OS
delete document.documentElement.dataset.theme;
```
Re-brand by overriding the semantic aliases (and, if you like, the `--rv-primary-*` scale) under `:root` and `[data-theme="dark"]`. The `@media (prefers-color-scheme: dark)` block mirrors `[data-theme="dark"]`, so keep the two in sync when you re-theme.
