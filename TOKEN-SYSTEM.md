# RV Design — Token System Reference

This document describes how the token system works and what semantic tokens each component uses. Its purpose is to help generate correct theme overrides for consumers (e.g. rv-porfolio).

---

## How the system works

There are two layers:

### Layer 1 — Raw scale (primitive values)

Fixed values that never change between themes. They are the named stops on each scale (color, spacing, radius, etc.). Components **never** reference these directly.

### Layer 2 — Semantic aliases

CSS custom properties that reference raw scale values. They describe *intent* rather than a specific value. Components only reference these. Theming works by overriding the aliases — not the raw scale.

```css
/* Raw scale — always the same */
--rv-radius-lg: 0.625rem;

/* Semantic alias — what components use */
--rv-radius-card: var(--rv-radius-lg);

/* Theme override — change all cards at once */
--rv-radius-card: 0; /* completely square cards */
```

---

## Where to put theme overrides

All overrides go on `:root` (global default), `[data-theme="dark"]` (dark mode), or a custom scope selector. The portfolio uses `[data-theme="paper"]` as a custom scope.

```css
/* Global brand override */
:root {
  --rv-accent: oklch(0.512 0.098 54);
}

/* Scoped theme */
[data-theme="paper"] {
  --rv-surface-page: oklch(0.906 0.032 79);
}
```

---

## Full token reference

### Colors — Raw scales

These are never overridden in themes. They are just named stops to use in semantic alias definitions.

**Neutral (warm taupe — not cool gray)**
| Token | Value |
|---|---|
| `--rv-neutral-0` | `#fff` |
| `--rv-neutral-50` | `oklch(98.4% 0.003 82)` — warm ivory |
| `--rv-neutral-100` | `oklch(96.8% 0.004 80)` |
| `--rv-neutral-150` | `oklch(94.9% 0.005 78)` |
| `--rv-neutral-200` | `oklch(92.2% 0.007 76)` |
| `--rv-neutral-300` | `oklch(86.2% 0.012 75)` — stone |
| `--rv-neutral-400` | `oklch(73.2% 0.014 73)` |
| `--rv-neutral-500` | `oklch(58.6% 0.014 70)` |
| `--rv-neutral-600` | `oklch(47.2% 0.013 68)` |
| `--rv-neutral-700` | `oklch(39.2% 0.012 66)` |
| `--rv-neutral-800` | `oklch(29.8% 0.010 64)` |
| `--rv-neutral-850` | `oklch(24.8% 0.009 62)` |
| `--rv-neutral-900` | `oklch(21.2% 0.008 60)` |
| `--rv-neutral-925` | `oklch(19% 0.007 60)` — charcoal #1A1816 |
| `--rv-neutral-950` | `oklch(16.8% 0.006 58)` |
| `--rv-neutral-975` | `oklch(14.4% 0.005 58)` |

**Primary (forest green — brand)**
| Token | Value |
|---|---|
| `--rv-primary-50` | `oklch(96.2% 0.014 142)` |
| `--rv-primary-100` | `oklch(93% 0.025 141)` |
| `--rv-primary-200` | `oklch(87.8% 0.036 140)` |
| `--rv-primary-300` | `oklch(79.2% 0.044 139)` |
| `--rv-primary-400` | `oklch(64.8% 0.050 138)` |
| `--rv-primary-500` | `oklch(54% 0.050 137)` |
| `--rv-primary-600` | `oklch(47% 0.047 137)` — #4A5C42 |
| `--rv-primary-700` | `oklch(40.8% 0.042 138)` |
| `--rv-primary-800` | `oklch(34.8% 0.036 139)` |
| `--rv-primary-900` | `oklch(29.8% 0.029 140)` |
| `--rv-primary-950` | `oklch(22.4% 0.021 141)` |

**Accent (walnut / caramel — secondary brand)**
| Token | Value |
|---|---|
| `--rv-walnut-50` | `oklch(96.4% 0.018 72)` |
| `--rv-walnut-100` | `oklch(93% 0.034 70)` |
| `--rv-walnut-200` | `oklch(87.8% 0.052 68)` |
| `--rv-walnut-300` | `oklch(79.8% 0.070 66)` |
| `--rv-walnut-400` | `oklch(70.6% 0.084 64)` |
| `--rv-walnut-500` | `oklch(64.2% 0.090 63)` |
| `--rv-walnut-600` | `oklch(59.8% 0.090 62)` — #A97844 |
| `--rv-walnut-700` | `oklch(51.8% 0.078 61)` |
| `--rv-walnut-800` | `oklch(44.2% 0.064 61)` |
| `--rv-walnut-900` | `oklch(38.2% 0.052 62)` |
| `--rv-walnut-950` | `oklch(28% 0.038 63)` |

**Status colors** (info/success/warning/error) each have stops at 50, 100, 300–700.

---

### Colors — Semantic aliases

These are what you override in themes. All components reference only these.

**Surfaces** — ordered lightest (page bg) to darkest (inset)
| Token | Light default | Dark default |
|---|---|---|
| `--rv-surface-page` | `--rv-neutral-50` (ivory) | `--rv-neutral-975` |
| `--rv-surface-card` | `--rv-neutral-0` (white) | `--rv-neutral-925` |
| `--rv-surface-raised` | `--rv-neutral-0` | `--rv-neutral-900` |
| `--rv-surface-sunken` | `--rv-neutral-100` | `--rv-neutral-950` |
| `--rv-surface-inset` | `--rv-neutral-150` | `--rv-neutral-850` |
| `--rv-surface-overlay` | `neutral-950 @ 42%` | `#000 @ 64%` |
| `--rv-surface-inverse` | `--rv-neutral-900` | `--rv-neutral-100` |

**Text**
| Token | Light default | Dark default |
|---|---|---|
| `--rv-text-primary` | `--rv-neutral-925` | `oklch(96.2% 0.004 82)` |
| `--rv-text-secondary` | `--rv-neutral-700` | `oklch(77.6% 0.007 76)` |
| `--rv-text-muted` | `--rv-neutral-500` | `oklch(61% 0.009 72)` |
| `--rv-text-disabled` | `--rv-neutral-400` | `oklch(45.2% 0.009 68)` |
| `--rv-text-inverse` | `--rv-neutral-50` | `--rv-neutral-925` |
| `--rv-text-link` | `--rv-primary-700` | `--rv-primary-400` |
| `--rv-text-on-accent` | `--rv-neutral-50` | `--rv-neutral-975` |

**Borders**
| Token | Light default | Dark default |
|---|---|---|
| `--rv-border-subtle` | `--rv-neutral-150` | `neutral-50 @ 8%` |
| `--rv-border-default` | `--rv-neutral-200` | `neutral-50 @ 12%` |
| `--rv-border-strong` | `--rv-neutral-300` | `neutral-50 @ 20%` |
| `--rv-border-inverse` | `--rv-neutral-700` | `--rv-neutral-300` |

**Accent (primary brand — forest green)**
| Token | Light default | Dark default |
|---|---|---|
| `--rv-accent` | `--rv-primary-600` | `--rv-primary-400` |
| `--rv-accent-hover` | `--rv-primary-700` | `--rv-primary-300` |
| `--rv-accent-active` | `--rv-primary-800` | `--rv-primary-200` |
| `--rv-accent-subtle` | `--rv-primary-50` | `primary-400 @ 20%` |
| `--rv-accent-text` | `--rv-primary-700` | `--rv-primary-300` |

**Warm accent (walnut — secondary brand)**
| Token | Light default | Dark default |
|---|---|---|
| `--rv-accent-warm` | `--rv-walnut-600` | `--rv-walnut-400` |
| `--rv-accent-warm-hover` | `--rv-walnut-700` | `--rv-walnut-300` |
| `--rv-accent-warm-active` | `--rv-walnut-800` | `--rv-walnut-200` |
| `--rv-accent-warm-subtle` | `--rv-walnut-50` | `walnut-400 @ 22%` |
| `--rv-accent-warm-text` | `--rv-walnut-700` | `--rv-walnut-300` |

**Interactive states**
| Token | Light default | Dark default |
|---|---|---|
| `--rv-focus-ring` | `primary-500 @ 50%` | `primary-400 @ 55%` |
| `--rv-state-hover` | `neutral-925 @ 6%` | `neutral-50 @ 8%` |
| `--rv-state-active` | `neutral-925 @ 11%` | `neutral-50 @ 14%` |
| `--rv-state-selected` | `--rv-primary-50` | `primary-400 @ 22%` |

**Per-type colors** — used by Badge, Tag, Alert, Button (primary/danger), Checkbox  
Each type has three tokens: solid fill, hover fill, foreground text.
| Type | `--rv-color-{type}` | `--rv-color-{type}-hover` | `--rv-color-{type}-fg` |
|---|---|---|---|
| `default` | `--rv-neutral-200` | `--rv-neutral-300` | `--rv-neutral-800` |
| `primary` | `--rv-primary-600` | `--rv-primary-700` | `--rv-primary-700` |
| `info` | `--rv-info-600` | `--rv-info-700` | `--rv-info-700` |
| `success` | `--rv-success-600` | `--rv-success-700` | `--rv-success-700` |
| `warning` | `--rv-warning-500` | `--rv-warning-600` | `--rv-warning-700` |
| `error` | `--rv-error-600` | `--rv-error-700` | `--rv-error-700` |

---

### Typography

**Families**
| Token | Value |
|---|---|
| `--rv-font-sans` | Hanken Grotesk → system-ui → sans-serif |
| `--rv-font-mono` | JetBrains Mono → ui-monospace → monospace |

**Weights**
| Token | Value |
|---|---|
| `--rv-weight-regular` | 400 |
| `--rv-weight-medium` | 500 |
| `--rv-weight-semibold` | 600 |
| `--rv-weight-bold` | 700 |
| `--rv-weight-extra` | 800 |

**Type scale**
| Token | rem | px |
|---|---|---|
| `--rv-text-2xs` | 0.6875rem | 11 |
| `--rv-text-xs` | 0.75rem | 12 |
| `--rv-text-sm` | 0.8125rem | 13 |
| `--rv-text-md` | 0.875rem | 14 — default UI size |
| `--rv-text-base` | 1rem | 16 |
| `--rv-text-lg` | 1.125rem | 18 |
| `--rv-text-xl` | 1.375rem | 22 |
| `--rv-text-2xl` | 1.75rem | 28 |
| `--rv-text-3xl` | 2.25rem | 36 |
| `--rv-text-4xl` | 3rem | 48 |

**Semantic heading sizes** — override these to rescale all headings at once
| Token | Default |
|---|---|
| `--rv-heading-display` | `--rv-text-4xl` (48px) |
| `--rv-heading-1` | `--rv-text-3xl` (36px) |
| `--rv-heading-2` | `--rv-text-2xl` (28px) |
| `--rv-heading-3` | `--rv-text-xl` (22px) |
| `--rv-heading-4` | `--rv-text-lg` (18px) |
| `--rv-heading-5` | `--rv-text-base` (16px) |
| `--rv-heading-6` | `--rv-text-xs` (12px) |

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

4px base grid. Used for all padding, gap, and margin in components.

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

**Control sizes**
| Token | Value | Note |
|---|---|---|
| `--rv-control-h-sm` | 1.75rem | 28px |
| `--rv-control-h-md` | 2.25rem | 36px — default |
| `--rv-control-h-lg` | 2.75rem | 44px |
| `--rv-control-px-sm` | 0.625rem | horizontal padding |
| `--rv-control-px-md` | 0.875rem | |
| `--rv-control-px-lg` | 1.125rem | |
| `--rv-control-text-sm/md/lg` | `--rv-text-sm/md/base` | |

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

Two-layer system. Components use only the three semantic aliases below.

**Raw scale**
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

**Semantic aliases** — override these to reshape all components in a category
| Token | Default | Used by |
|---|---|---|
| `--rv-radius-control` | `--rv-radius-md` (7px) | Button, Input, Textarea, Select trigger, Alert container, Accordion (separated), Avatar (square), Tabs (segment list) |
| `--rv-radius-card` | `--rv-radius-lg` (10px) | Card, Dropdown panel, Select menu, Accordion (bordered), Avatar (rounded) |
| `--rv-radius-badge` | `--rv-radius-sm` (5px) | Badge, Tag, Tooltip, Menu items, Alert close button, Tabs (segment tab + focus ring) |

To make every component square: `--rv-radius-control: 0; --rv-radius-card: 0; --rv-radius-badge: 0;`  
To make everything pill-shaped: `--rv-radius-control: var(--rv-radius-full); --rv-radius-card: var(--rv-radius-full);`

---

### Elevation

**Shadows**
| Token | Use |
|---|---|
| `--rv-shadow-xs` | Subtle lift, avatar rings |
| `--rv-shadow-sm` | Tab segment active, small surfaces |
| `--rv-shadow-md` | Tooltip |
| `--rv-shadow-lg` | Dropdown panel, Select menu, Card hover |
| `--rv-shadow-xl` | Modals, heavy overlays |
| `--rv-shadow-inset` | Pressed / sunken inputs |

**Focus ring**
| Token | Default |
|---|---|
| `--rv-ring-width` | 3px |
| `--rv-ring` | `0 0 0 3px var(--rv-focus-ring)` |
| `--rv-focus-ring` | `primary-500 @ 50%` (light) / `primary-400 @ 55%` (dark) |

**Border width**
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

| Component | Tokens used |
|---|---|
| **Button** | `--rv-radius-control`, `--rv-control-h-*`, `--rv-control-px-*`, `--rv-color-{type}`, `--rv-accent`, `--rv-transition-control` |
| **Input / Textarea** | `--rv-radius-control`, `--rv-control-h-*`, `--rv-border-default/strong`, `--rv-surface-card/sunken`, `--rv-text-primary/disabled`, `--rv-ring` |
| **Select** | `--rv-radius-control` (trigger), `--rv-radius-card` (menu), `--rv-radius-badge` (menu items), `--rv-shadow-lg`, `--rv-border-default` |
| **Checkbox / Radio / Switch** | `--rv-accent`, `--rv-border-default/strong`, `--rv-surface-card`, `--rv-ring` |
| **FormField** | `--rv-text-secondary/disabled/muted`, `--rv-color-error-fg` |
| **Heading** | `--rv-heading-{display/1–6}`, `--rv-weight-*`, `--rv-tracking-caps`, `--rv-text-muted` |
| **Card** | `--rv-radius-card`, `--rv-surface-card`, `--rv-border-default`, `--rv-shadow-sm/lg` |
| **Badge** | `--rv-radius-badge`, `--rv-color-{type}`, `--rv-text-xs`, `--rv-weight-medium` |
| **Tag** | `--rv-radius-badge`, `--rv-color-{type}`, `--rv-border-default` |
| **Avatar** | `--rv-radius-full` (circle), `--rv-radius-control` (square), `--rv-radius-card` (rounded), `--rv-surface-sunken` |
| **Alert** | `--rv-radius-control` (container), `--rv-radius-badge` (close button), `--rv-color-{type}`, `--rv-border-default` |
| **Tooltip** | `--rv-radius-badge`, `--rv-surface-inverse`, `--rv-text-inverse`, `--rv-shadow-md` |
| **Tabs** | `--rv-radius-control` (segment list), `--rv-radius-badge` (segment tab + focus ring), `--rv-accent`, `--rv-surface-sunken/card` |
| **Accordion** | `--rv-radius-card` (bordered), `--rv-radius-control` (separated), `--rv-border-default/subtle`, `--rv-accent-text` |
| **Dropdown** | `--rv-radius-card` (panel), `--rv-surface-raised`, `--rv-border-default`, `--rv-shadow-lg` |
| **Spinner** | `--rv-accent` |
| **Container** | `--rv-container-sm/md/lg`, `--rv-gutter` |

---

## Creating a custom theme

Override only the semantic tokens you need. The portfolio's paper theme is a good example of a partial surface + accent override:

```css
[data-theme="paper"] {
  /* Surfaces — warm parchment palette */
  --rv-surface-page:    oklch(0.906 0.032 79);
  --rv-surface-card:    oklch(0.934 0.025 82);
  --rv-surface-raised:  oklch(0.946 0.021 83);
  --rv-surface-sunken:  oklch(0.870 0.037 77);
  --rv-surface-inset:   oklch(0.844 0.041 76);

  /* Text — warm dark brown */
  --rv-text-primary:   oklch(0.312 0.040 50);
  --rv-text-secondary: oklch(0.432 0.044 53);
  --rv-text-muted:     oklch(0.550 0.038 57);
  --rv-text-disabled:  oklch(0.668 0.030 64);
  --rv-text-link:      oklch(0.462 0.106 50);

  /* Borders */
  --rv-border-subtle:  oklch(0.842 0.034 75);
  --rv-border-default: oklch(0.792 0.040 73);
  --rv-border-strong:  oklch(0.710 0.046 70);

  /* Accent */
  --rv-accent:         oklch(0.512 0.098 54);
  --rv-accent-hover:   oklch(0.452 0.100 52);
  --rv-accent-active:  oklch(0.402 0.098 50);
  --rv-accent-text:    oklch(0.462 0.106 50);
  --rv-accent-subtle:  color-mix(in oklab, oklch(0.512 0.098 54) 16%, transparent);

  color-scheme: light;
}
```

### Quick shape overrides

```css
/* Fully square — no rounding anywhere */
:root {
  --rv-radius-control: 0;
  --rv-radius-card: 0;
  --rv-radius-badge: 0;
}

/* Pill controls, rounder cards */
:root {
  --rv-radius-control: var(--rv-radius-full);
  --rv-radius-card: var(--rv-radius-xl);
  --rv-radius-badge: var(--rv-radius-md);
}
```

### Quick heading scale overrides

```css
/* Larger editorial scale */
:root {
  --rv-heading-display: var(--rv-text-4xl); /* 48px */
  --rv-heading-1:       var(--rv-text-3xl); /* 36px */
  --rv-heading-2:       var(--rv-text-2xl); /* 28px */
  --rv-heading-3:       var(--rv-text-xl);  /* 22px */
  --rv-heading-4:       var(--rv-text-lg);  /* 18px */
  --rv-heading-5:       var(--rv-text-base);/* 16px */
  --rv-heading-6:       var(--rv-text-xs);  /* 12px */
}
```
