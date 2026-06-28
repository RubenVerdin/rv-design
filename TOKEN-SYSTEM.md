# RV Design — System Reference

This document describes the philosophy, token architecture, component inventory, and theming API of rv-design. Its primary audience is AI assistants and developers generating theme overrides for consumers such as rv-porfolio.

---

## Philosophy

RV Design is a token-driven Vue 3 component library built around three ideas.

### 1. Natural palette, not tech-neutral

Most design systems default to cool gray and safety blue. RV Design uses a warm, architectural palette:

- **Neutral** — warm taupe (hue ~74–82°) instead of cool gray. Ivory page backgrounds, charcoal text.
- **Primary brand** — forest green (`#4A5C42`), earthy and grounded.
- **Warm accent** — walnut caramel (`#A97844`), a secondary brand expression.
- **Status colors** — terracotta red, ochre amber, clean green, muted slate blue. All chosen to feel natural alongside the brand palette.

Colors are expressed in oklch, which gives perceptually uniform lightness steps and makes dark-mode variants predictable.

### 2. Two-layer token system

All design decisions live in CSS custom properties. There are two layers:

**Layer 1 — Raw scale** (primitive values, never used directly in components)
Named stops on each dimension's scale. They never change between themes.

```css
--rv-radius-lg: 0.625rem;
--rv-primary-600: oklch(47% 0.047 137);
--rv-text-3xl: 2.25rem;
```

**Layer 2 — Semantic aliases** (what components and utilities actually use)
These express *intent*. Overriding them reshapes whole categories at once.

```css
--rv-radius-card:  var(--rv-radius-lg);    /* every card/panel/menu */
--rv-accent:       var(--rv-primary-600);  /* every interactive accent */
--rv-heading-1:    var(--rv-text-3xl);     /* every h1 */
```

**Theming = overriding semantic aliases.** You never touch the raw scale.

```css
/* Make every card square */
:root { --rv-radius-card: 0; }

/* Rebrand from green to indigo */
:root { --rv-accent: oklch(55% 0.18 270); }

/* Scoped theme — only affects elements inside [data-theme="paper"] */
[data-theme="paper"] { --rv-surface-page: oklch(0.906 0.032 79); }
```

### 3. CSS cascade for dark mode and scoped themes

Dark mode is handled entirely in CSS — no JS, no class toggling on `<body>`.

```css
/* Automatic: follows OS preference */
@media (prefers-color-scheme: dark) { :root { --rv-surface-page: ...; } }

/* Explicit pin: always dark, even if OS is light */
[data-theme="dark"] { --rv-surface-page: ...; }

/* Explicit pin: always light, even if OS is dark */
[data-theme="light"] { --rv-surface-page: ...; }

/* Custom theme: scoped to a subtree */
[data-theme="paper"] { --rv-surface-page: oklch(0.906 0.032 79); }
```

Toggle dark mode: `document.documentElement.dataset.theme = 'dark'`  
Revert to OS: `delete document.documentElement.dataset.theme`

---

## Installation and setup

```bash
npm install rv-design
```

### Option A — Full bundle (recommended)

Registers all components globally and imports all styles in one call.

```ts
// main.ts
import { createApp } from 'vue'
import RVDesign from 'rv-design'

createApp(App).use(RVDesign).mount('#app')
```

```css
/* Imported automatically by rv-design's plugin — nothing else needed */
```

### Option B — Individual imports

```ts
import { RvButton, RvCard, RvProse } from 'rv-design'
```

### Wrapper element

Wrap your app root in `.rv-app` to scope the CSS reset and apply fonts:

```html
<div class="rv-app">
  <YourApp />
</div>
```

### Optional extras (not in the default bundle)

```css
/* Scoped CSS reset — normalises UA styles under .rv-app */
@import 'rv-design/reset';

/* Semantic utility classes — .rv-stack, .rv-cluster, .rv-sr-only, etc. */
@import 'rv-design/utilities';
```

---

## Component inventory

| Component | Description |
|---|---|
| `RvButton` | Primary / secondary / text variants, sm/md/lg sizes |
| `RvInput` | Text input, sm/md/lg sizes, disabled/error states |
| `RvTextarea` | Multi-line input |
| `RvSelect` | Custom select with popover menu |
| `RvCheckbox` | Checkbox with indeterminate support |
| `RvRadio` | Radio button |
| `RvRadioGroup` | Group of radio buttons |
| `RvSwitch` | Toggle switch |
| `RvFormField` | Label + input + error/hint wrapper |
| `RvHeading` | Semantic heading h1–h6 + display variant |
| `RvProse` | Long-form / user-generated HTML styling |
| `RvCard` | Surface container with border, shadow, radius |
| `RvBadge` | Inline status chip (default/primary/info/success/warning/error) |
| `RvTag` | Dismissible label |
| `RvAvatar` | Image or initials avatar (circle/square/rounded) |
| `RvAlert` | Inline message banner |
| `RvSpinner` | Loading indicator |
| `RvTooltip` | Hover tooltip |
| `RvTabs` | Tabbed navigation (line / segment variants) |
| `RvAccordion` | Expandable sections (default / bordered / separated) |
| `RvDropdown` | Popover panel anchored to a trigger (click or hover) |
| `RvDropdownMenu` | Convenience item list for use inside RvDropdown |
| `RvContainer` | Max-width content wrapper |

---

## Heading and typography classes

### RvHeading component

```vue
<RvHeading level="1">Page title</RvHeading>
<RvHeading level="2" tone="muted">Subtitle</RvHeading>
<RvHeading :display="true">Hero</RvHeading>
<RvHeading level="3" as="p">Styled as h3, renders as p</RvHeading>
```

Props: `level` (1–6), `display` (boolean), `tone` (muted | accent), `as` (tag override)

### Standalone heading utility classes

The same tokens and styles, usable on any element without the component:

```html
<h1 class="rv-heading-1">Page title</h1>
<p class="rv-heading-display">Hero text</p>
<span class="rv-heading-6">Eyebrow label</span>
```

Classes: `.rv-heading-display`, `.rv-heading-1` through `.rv-heading-6`

---

## Prose (long-form content)

### RvProse component

Applies `.rv-prose` styles to user-generated or CMS HTML. Content passed via `content` prop must be sanitised upstream.

```vue
<!-- From a markdown parser or CMS -->
<RvProse :content="markdownHtml" />

<!-- Static markup in the slot -->
<RvProse>
  <h2>Handwritten content</h2>
  <p>With a <a href="#">link</a> and <code>inline code</code>.</p>
</RvProse>

<!-- Custom wrapper tag -->
<RvProse as="section" :content="html" />
```

Props: `content` (HTML string), `as` (tag override, default `article`)

### What .rv-prose styles

Inside `.rv-prose`, the following elements are styled automatically using design tokens — no extra classes needed:

| Element | Style |
|---|---|
| `h1`–`h6` | Heading tokens, tight line height, top margin |
| `p` | Prose lead, spacing between paragraphs |
| `a` | Link color, underline, hover transition |
| `strong` | Semibold weight, primary color |
| `em` | Italic |
| `code` (inline) | Mono font, sunken background, badge radius |
| `pre` | Code block, card radius, scrollable |
| `blockquote` | Left border, secondary color, italic |
| `ul` / `ol` / `li` | Proper indentation and spacing |
| `hr` | Subtle divider |
| `img` | Max-width, card radius, block display |
| `table` / `th` / `td` | Bordered, semibold headers |
| `mark` | Accent-tinted highlight chip |
| `kbd` | Keyboard shortcut chip with shadow |

Existing component classes (`.rv-badge`, `.rv-tag`) work inside `.rv-prose` without any changes.

### Prose token overrides

```css
/* More editorial — larger body, wider line height */
[data-theme="paper"] {
  --rv-prose-size:  var(--rv-text-lg);   /* body font size, default: --rv-text-base */
  --rv-prose-lead:  1.8;                 /* line height,    default: --rv-leading-relaxed */
  --rv-prose-width: 65ch;               /* reading column, default: 68ch */
}
```

`--rv-prose-width` is defined as a token but not applied automatically. Use it in layout:

```css
.blog-post { max-width: var(--rv-prose-width); margin-inline: auto; }
```

---

## Full token reference

### Colors — Raw scales

Never override these. Use them only when defining semantic aliases.

#### Neutral (warm taupe)

| Token | Value | Note |
|---|---|---|
| `--rv-neutral-0` | `#fff` | |
| `--rv-neutral-50` | `oklch(98.4% 0.003 82)` | warm ivory |
| `--rv-neutral-100` | `oklch(96.8% 0.004 80)` | |
| `--rv-neutral-150` | `oklch(94.9% 0.005 78)` | |
| `--rv-neutral-200` | `oklch(92.2% 0.007 76)` | |
| `--rv-neutral-300` | `oklch(86.2% 0.012 75)` | stone |
| `--rv-neutral-400` | `oklch(73.2% 0.014 73)` | |
| `--rv-neutral-500` | `oklch(58.6% 0.014 70)` | |
| `--rv-neutral-600` | `oklch(47.2% 0.013 68)` | |
| `--rv-neutral-700` | `oklch(39.2% 0.012 66)` | |
| `--rv-neutral-800` | `oklch(29.8% 0.010 64)` | |
| `--rv-neutral-850` | `oklch(24.8% 0.009 62)` | |
| `--rv-neutral-900` | `oklch(21.2% 0.008 60)` | |
| `--rv-neutral-925` | `oklch(19% 0.007 60)` | charcoal #1A1816 |
| `--rv-neutral-950` | `oklch(16.8% 0.006 58)` | |
| `--rv-neutral-975` | `oklch(14.4% 0.005 58)` | |

#### Primary (forest green)

| Token | Value | Note |
|---|---|---|
| `--rv-primary-50` | `oklch(96.2% 0.014 142)` | |
| `--rv-primary-100` | `oklch(93% 0.025 141)` | |
| `--rv-primary-200` | `oklch(87.8% 0.036 140)` | |
| `--rv-primary-300` | `oklch(79.2% 0.044 139)` | |
| `--rv-primary-400` | `oklch(64.8% 0.050 138)` | |
| `--rv-primary-500` | `oklch(54% 0.050 137)` | |
| `--rv-primary-600` | `oklch(47% 0.047 137)` | #4A5C42 |
| `--rv-primary-700` | `oklch(40.8% 0.042 138)` | |
| `--rv-primary-800` | `oklch(34.8% 0.036 139)` | |
| `--rv-primary-900` | `oklch(29.8% 0.029 140)` | |
| `--rv-primary-950` | `oklch(22.4% 0.021 141)` | |

#### Walnut accent (caramel)

| Token | Value | Note |
|---|---|---|
| `--rv-walnut-50` | `oklch(96.4% 0.018 72)` | |
| `--rv-walnut-100` | `oklch(93% 0.034 70)` | |
| `--rv-walnut-200` | `oklch(87.8% 0.052 68)` | |
| `--rv-walnut-300` | `oklch(79.8% 0.070 66)` | |
| `--rv-walnut-400` | `oklch(70.6% 0.084 64)` | |
| `--rv-walnut-500` | `oklch(64.2% 0.090 63)` | |
| `--rv-walnut-600` | `oklch(59.8% 0.090 62)` | #A97844 |
| `--rv-walnut-700` | `oklch(51.8% 0.078 61)` | |
| `--rv-walnut-800` | `oklch(44.2% 0.064 61)` | |
| `--rv-walnut-900` | `oklch(38.2% 0.052 62)` | |
| `--rv-walnut-950` | `oklch(28% 0.038 63)` | |

**Status scales** — info, success, warning, error each have stops at 50, 100, 400, 500, 600, 700.

---

### Colors — Semantic aliases

These are what you override in themes.

**Surfaces** — light to dark within each theme
| Token | Light | Dark |
|---|---|---|
| `--rv-surface-page` | `--rv-neutral-50` | `--rv-neutral-975` |
| `--rv-surface-card` | `--rv-neutral-0` | `--rv-neutral-925` |
| `--rv-surface-raised` | `--rv-neutral-0` | `--rv-neutral-900` |
| `--rv-surface-sunken` | `--rv-neutral-100` | `--rv-neutral-950` |
| `--rv-surface-inset` | `--rv-neutral-150` | `--rv-neutral-850` |
| `--rv-surface-overlay` | `neutral-950 @ 42%` | `#000 @ 64%` |
| `--rv-surface-inverse` | `--rv-neutral-900` | `--rv-neutral-100` |

**Text**
| Token | Light | Dark |
|---|---|---|
| `--rv-text-primary` | `--rv-neutral-925` | `oklch(96.2% 0.004 82)` |
| `--rv-text-secondary` | `--rv-neutral-700` | `oklch(77.6% 0.007 76)` |
| `--rv-text-muted` | `--rv-neutral-500` | `oklch(61% 0.009 72)` |
| `--rv-text-disabled` | `--rv-neutral-400` | `oklch(45.2% 0.009 68)` |
| `--rv-text-inverse` | `--rv-neutral-50` | `--rv-neutral-925` |
| `--rv-text-link` | `--rv-primary-700` | `--rv-primary-400` |
| `--rv-text-on-accent` | `--rv-neutral-50` | `--rv-neutral-975` |

**Borders**
| Token | Light | Dark |
|---|---|---|
| `--rv-border-subtle` | `--rv-neutral-150` | `neutral-50 @ 8%` |
| `--rv-border-default` | `--rv-neutral-200` | `neutral-50 @ 12%` |
| `--rv-border-strong` | `--rv-neutral-300` | `neutral-50 @ 20%` |
| `--rv-border-inverse` | `--rv-neutral-700` | `--rv-neutral-300` |

**Accent (primary brand — forest green)**
| Token | Light | Dark |
|---|---|---|
| `--rv-accent` | `--rv-primary-600` | `--rv-primary-400` |
| `--rv-accent-hover` | `--rv-primary-700` | `--rv-primary-300` |
| `--rv-accent-active` | `--rv-primary-800` | `--rv-primary-200` |
| `--rv-accent-subtle` | `--rv-primary-50` | `primary-400 @ 20%` |
| `--rv-accent-text` | `--rv-primary-700` | `--rv-primary-300` |

#### Warm accent (walnut — secondary brand expression)

| Token | Light | Dark |
|---|---|---|
| `--rv-accent-warm` | `--rv-walnut-600` | `--rv-walnut-400` |
| `--rv-accent-warm-hover` | `--rv-walnut-700` | `--rv-walnut-300` |
| `--rv-accent-warm-active` | `--rv-walnut-800` | `--rv-walnut-200` |
| `--rv-accent-warm-subtle` | `--rv-walnut-50` | `walnut-400 @ 22%` |
| `--rv-accent-warm-text` | `--rv-walnut-700` | `--rv-walnut-300` |

**Interactive states**
| Token | Light | Dark |
|---|---|---|
| `--rv-focus-ring` | `primary-500 @ 50%` | `primary-400 @ 55%` |
| `--rv-state-hover` | `neutral-925 @ 6%` | `neutral-50 @ 8%` |
| `--rv-state-active` | `neutral-925 @ 11%` | `neutral-50 @ 14%` |
| `--rv-state-selected` | `--rv-primary-50` | `primary-400 @ 22%` |

**Per-type colors** — Badge, Tag, Alert, Button use these. Each type has fill / hover-fill / foreground.

| Type | fill | hover | fg |
|---|---|---|---|
| `default` | `--rv-neutral-200` | `--rv-neutral-300` | `--rv-neutral-800` |
| `primary` | `--rv-primary-600` | `--rv-primary-700` | `--rv-primary-700` |
| `info` | `--rv-info-600` | `--rv-info-700` | `--rv-info-700` |
| `success` | `--rv-success-600` | `--rv-success-700` | `--rv-success-700` |
| `warning` | `--rv-warning-500` | `--rv-warning-600` | `--rv-warning-700` |
| `error` | `--rv-error-600` | `--rv-error-700` | `--rv-error-700` |

Token pattern: `--rv-color-{type}`, `--rv-color-{type}-hover`, `--rv-color-{type}-fg`

**Soft message backgrounds** (Alert, inline callouts)
| Token | Light | Dark |
|---|---|---|
| `--rv-success-bg` | `--rv-success-50` | `success-500 @ 16% into card` |
| `--rv-warning-bg` | `--rv-warning-50` | `warning-500 @ 16% into card` |
| `--rv-danger-bg` | `--rv-error-50` | `error-500 @ 16% into card` |
| `--rv-info-bg` | `--rv-info-50` | `info-500 @ 16% into card` |

---

### Typography

**Families**
| Token | Value |
|---|---|
| `--rv-font-sans` | Hanken Grotesk → system-ui → sans-serif |
| `--rv-font-mono` | JetBrains Mono → ui-monospace → monospace |

Fonts are not self-hosted — add the Google Fonts link to your HTML `<head>` if needed.

**Weights**
| Token | Value |
|---|---|
| `--rv-weight-regular` | 400 |
| `--rv-weight-medium` | 500 |
| `--rv-weight-semibold` | 600 |
| `--rv-weight-bold` | 700 |
| `--rv-weight-extra` | 800 |

**Type scale** (1rem = 16px)

| Token | rem | px | Role |
| --- | --- | --- | --- |
| `--rv-text-2xs` | 0.6875rem | 11 | |
| `--rv-text-xs` | 0.75rem | 12 | |
| `--rv-text-sm` | 0.8125rem | 13 | |
| `--rv-text-md` | 0.875rem | 14 | default UI size |
| `--rv-text-base` | 1rem | 16 | |
| `--rv-text-lg` | 1.125rem | 18 | |
| `--rv-text-xl` | 1.375rem | 22 | |
| `--rv-text-2xl` | 1.75rem | 28 | |
| `--rv-text-3xl` | 2.25rem | 36 | |
| `--rv-text-4xl` | 3rem | 48 | |

**Semantic heading sizes** — override these; raw scale follows automatically
| Token | Default | px |
|---|---|---|
| `--rv-heading-display` | `--rv-text-4xl` | 48 |
| `--rv-heading-1` | `--rv-text-3xl` | 36 |
| `--rv-heading-2` | `--rv-text-2xl` | 28 |
| `--rv-heading-3` | `--rv-text-xl` | 22 |
| `--rv-heading-4` | `--rv-text-lg` | 18 |
| `--rv-heading-5` | `--rv-text-base` | 16 |
| `--rv-heading-6` | `--rv-text-xs` | 12 |

**Semantic prose sizes** — override for editorial / blog themes

| Token | Default | Role |
|---|---|---|
| `--rv-prose-size` | `--rv-text-base` | body font size inside `.rv-prose` |
| `--rv-prose-lead` | `--rv-leading-relaxed` | paragraph line height |
| `--rv-prose-width` | `68ch` | comfortable reading column (apply manually) |

**Line heights**
| Token | Value |
|---|---|
| `--rv-leading-tight` | 1.2 |
| `--rv-leading-snug` | 1.35 |
| `--rv-leading-normal` | 1.5 |
| `--rv-leading-relaxed` | 1.65 |

**Letter spacing**
| Token | Value |
|---|---|
| `--rv-tracking-tight` | -0.018em |
| `--rv-tracking-normal` | 0em |
| `--rv-tracking-wide` | 0.02em |
| `--rv-tracking-caps` | 0.06em |

---

### Spacing

4px base grid.

| Token | rem | px |
|---|---|---|
| `--rv-space-1` | 0.25rem | 4 |
| `--rv-space-2` | 0.5rem | 8 |
| `--rv-space-3` | 0.75rem | 12 |
| `--rv-space-4` | 1rem | 16 |
| `--rv-space-5` | 1.25rem | 20 |
| `--rv-space-6` | 1.5rem | 24 |
| `--rv-space-8` | 2rem | 32 |
| `--rv-space-10` | 2.5rem | 40 |
| `--rv-space-12` | 3rem | 48 |
| `--rv-space-16` | 4rem | 64 |
| `--rv-space-20` | 5rem | 80 |

**Control sizes** (Button, Input, Select height and padding)

| Token | Value | px |
|---|---|---|
| `--rv-control-h-sm` | 1.75rem | 28 |
| `--rv-control-h-md` | 2.25rem | 36 — default |
| `--rv-control-h-lg` | 2.75rem | 44 |
| `--rv-control-px-sm` | 0.625rem | 10 |
| `--rv-control-px-md` | 0.875rem | 14 |
| `--rv-control-px-lg` | 1.125rem | 18 |
| `--rv-control-text-sm` | `--rv-text-sm` | |
| `--rv-control-text-md` | `--rv-text-md` | |
| `--rv-control-text-lg` | `--rv-text-base` | |

**Icon sizes**
| Token | rem | px |
|---|---|---|
| `--rv-icon-sm` | 0.875rem | 14 |
| `--rv-icon-md` | 1rem | 16 |
| `--rv-icon-lg` | 1.25rem | 20 |

**Layout**
| Token | Value |
|---|---|
| `--rv-container-sm` | 40rem |
| `--rv-container-md` | 56rem |
| `--rv-container-lg` | 72rem |
| `--rv-gutter` | `--rv-space-6` (24px) |

---

### Border radius

**Raw scale** (reference only — never use in overrides)
| Token | rem | px |
|---|---|---|
| `--rv-radius-none` | 0 | 0 |
| `--rv-radius-xs` | 0.1875rem | 3 |
| `--rv-radius-sm` | 0.3125rem | 5 |
| `--rv-radius-md` | 0.4375rem | 7 |
| `--rv-radius-lg` | 0.625rem | 10 |
| `--rv-radius-xl` | 0.875rem | 14 |
| `--rv-radius-2xl` | 1.25rem | 20 |
| `--rv-radius-full` | 999px | pills |

**Semantic aliases** — override these three to reshape all components
| Token | Default | Used by |
|---|---|---|
| `--rv-radius-control` | `--rv-radius-md` (7px) | Button, Input, Textarea, Select trigger, Alert, Accordion (separated), Avatar (square), Tabs (segment list) |
| `--rv-radius-card` | `--rv-radius-lg` (10px) | Card, Prose code blocks, Dropdown panel, Select menu, Accordion (bordered), Avatar (rounded) |
| `--rv-radius-badge` | `--rv-radius-sm` (5px) | Badge, Tag, Tooltip, Menu items, Alert close, Tabs (segment tab), `<mark>` and `<kbd>` in prose |

---

### Elevation

**Shadows**
| Token | Used by |
|---|---|
| `--rv-shadow-xs` | Avatar ring, `<kbd>` in prose |
| `--rv-shadow-sm` | Tab segment active, `.rv-surface` utility |
| `--rv-shadow-md` | Tooltip |
| `--rv-shadow-lg` | Dropdown panel, Select menu, Card |
| `--rv-shadow-xl` | Modals, heavy overlays |
| `--rv-shadow-inset` | Pressed / sunken inputs |

**Focus ring** — applied via `box-shadow` on all interactive elements
| Token | Default |
|---|---|
| `--rv-ring-width` | 3px |
| `--rv-ring` | `0 0 0 3px var(--rv-focus-ring)` |
| `--rv-focus-ring` | `primary-500 @ 50%` (light) · `primary-400 @ 55%` (dark) |

#### Border widths

| Token | Value |
|---|---|
| `--rv-border-width` | 1px |
| `--rv-border-width-strong` | 1.5px |

---

### Motion

| Token | Value |
|---|---|
| `--rv-duration-instant` | 80ms |
| `--rv-duration-fast` | 140ms |
| `--rv-duration-normal` | 220ms |
| `--rv-duration-slow` | 320ms |
| `--rv-ease-standard` | `cubic-bezier(0.2, 0, 0.1, 1)` |
| `--rv-ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--rv-ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` |
| `--rv-transition-control` | `bg + border + color + shadow + transform` composite |

---

## Component → token map

| Component | Key tokens |
|---|---|
| **Button** | `--rv-radius-control`, `--rv-control-h-*`, `--rv-control-px-*`, `--rv-color-{type}`, `--rv-accent`, `--rv-transition-control` |
| **Input / Textarea** | `--rv-radius-control`, `--rv-control-h-*`, `--rv-border-default/strong`, `--rv-surface-card/sunken`, `--rv-ring` |
| **Select** | `--rv-radius-control` (trigger), `--rv-radius-card` (menu), `--rv-radius-badge` (items), `--rv-shadow-lg` |
| **Checkbox / Radio / Switch** | `--rv-accent`, `--rv-border-default/strong`, `--rv-surface-card`, `--rv-ring` |
| **FormField** | `--rv-text-secondary/disabled/muted`, `--rv-color-error-fg` |
| **Heading / heading utilities** | `--rv-heading-{display/1–6}`, `--rv-weight-bold/semibold/extra`, `--rv-text-primary/muted` |
| **Prose** | `--rv-prose-size`, `--rv-prose-lead`, `--rv-heading-*`, `--rv-text-link`, `--rv-radius-card/badge`, `--rv-surface-sunken`, `--rv-accent-subtle` |
| **Card** | `--rv-radius-card`, `--rv-surface-card`, `--rv-border-default`, `--rv-shadow-sm/lg` |
| **Badge** | `--rv-radius-badge`, `--rv-color-{type}`, `--rv-text-xs`, `--rv-weight-medium` |
| **Tag** | `--rv-radius-badge`, `--rv-color-{type}`, `--rv-border-default` |
| **Avatar** | `--rv-radius-full` (circle), `--rv-radius-control` (square), `--rv-radius-card` (rounded), `--rv-surface-sunken` |
| **Alert** | `--rv-radius-control`, `--rv-radius-badge` (close btn), `--rv-color-{type}`, `--rv-border-default` |
| **Tooltip** | `--rv-radius-badge`, `--rv-surface-inverse`, `--rv-text-inverse`, `--rv-shadow-md` |
| **Tabs** | `--rv-radius-control` (segment list), `--rv-radius-badge` (tab + focus ring), `--rv-accent`, `--rv-surface-sunken/card` |
| **Accordion** | `--rv-radius-card` (bordered), `--rv-radius-control` (separated), `--rv-border-default/subtle`, `--rv-accent-text` |
| **Dropdown** | `--rv-radius-card` (panel), `--rv-surface-raised`, `--rv-border-default`, `--rv-shadow-lg` |
| **Spinner** | `--rv-accent` |
| **Container** | `--rv-container-sm/md/lg`, `--rv-gutter` |

---

## Theming recipes

### Minimal brand swap (change accent color only)

```css
:root {
  /* Replace forest green with indigo */
  --rv-accent:        oklch(55% 0.18 270);
  --rv-accent-hover:  oklch(50% 0.18 270);
  --rv-accent-active: oklch(45% 0.18 270);
  --rv-accent-subtle: oklch(97% 0.04 270);
  --rv-accent-text:   oklch(45% 0.18 270);
  --rv-focus-ring:    oklch(55% 0.18 270 / 50%);
  /* Also update --rv-text-link if desired */
  --rv-text-link: oklch(45% 0.18 270);
}
```

### Shape variants

```css
/* Fully square — no rounding anywhere */
:root { --rv-radius-control: 0; --rv-radius-card: 0; --rv-radius-badge: 0; }

/* Pill controls, rounded cards */
:root {
  --rv-radius-control: var(--rv-radius-full);
  --rv-radius-card: var(--rv-radius-xl);
  --rv-radius-badge: var(--rv-radius-md);
}
```

### Larger editorial type scale

```css
:root {
  --rv-heading-display: var(--rv-text-4xl); /* 48px */
  --rv-heading-1:       var(--rv-text-3xl); /* 36px */
  --rv-heading-2:       var(--rv-text-2xl); /* 28px */
  --rv-heading-3:       var(--rv-text-xl);  /* 22px */
  --rv-heading-4:       var(--rv-text-lg);  /* 18px */
  --rv-heading-5:       var(--rv-text-base);/* 16px */
  --rv-heading-6:       var(--rv-text-xs);  /* 12px */
  --rv-prose-size: var(--rv-text-lg);
  --rv-prose-lead: 1.8;
}
```

### Paper / parchment theme (rv-porfolio)

```css
[data-theme="paper"] {
  --rv-surface-page:    oklch(0.906 0.032 79);
  --rv-surface-card:    oklch(0.934 0.025 82);
  --rv-surface-raised:  oklch(0.946 0.021 83);
  --rv-surface-sunken:  oklch(0.870 0.037 77);
  --rv-surface-inset:   oklch(0.844 0.041 76);
  --rv-surface-overlay: color-mix(in oklab, oklch(0.30 0.04 52) 40%, transparent);
  --rv-surface-inverse: oklch(0.305 0.038 52);

  --rv-text-primary:   oklch(0.312 0.040 50);
  --rv-text-secondary: oklch(0.432 0.044 53);
  --rv-text-muted:     oklch(0.550 0.038 57);
  --rv-text-disabled:  oklch(0.668 0.030 64);
  --rv-text-inverse:   oklch(0.940 0.024 82);
  --rv-text-link:      oklch(0.462 0.106 50);
  --rv-text-on-accent: oklch(0.952 0.020 82);

  --rv-border-subtle:  oklch(0.842 0.034 75);
  --rv-border-default: oklch(0.792 0.040 73);
  --rv-border-strong:  oklch(0.710 0.046 70);
  --rv-border-inverse: oklch(0.450 0.040 53);

  --rv-accent:         oklch(0.512 0.098 54);
  --rv-accent-hover:   oklch(0.452 0.100 52);
  --rv-accent-active:  oklch(0.402 0.098 50);
  --rv-accent-subtle:  color-mix(in oklab, oklch(0.512 0.098 54) 16%, transparent);
  --rv-accent-text:    oklch(0.462 0.106 50);

  --rv-state-hover:    color-mix(in oklab, oklch(0.30 0.04 50) 7%, transparent);
  --rv-state-active:   color-mix(in oklab, oklch(0.30 0.04 50) 12%, transparent);
  --rv-state-selected: color-mix(in oklab, oklch(0.512 0.098 54) 16%, transparent);

  color-scheme: light;
}
```
