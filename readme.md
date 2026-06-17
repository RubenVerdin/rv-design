# rv-design

A token-driven Vue 3 component library. Light and dark theming, natural palette, all driven by CSS custom properties.

## Installation

```bash
npm install rv-design
```

## Usage

Register all components globally as a Vue plugin:

```ts
import { createApp } from 'vue'
import RvDesign from 'rv-design'
import 'rv-design/styles.css'

const app = createApp(App)
app.use(RvDesign)
app.mount('#app')
```

Or import individual components:

```ts
import { RvButton, RvInput } from 'rv-design'
import 'rv-design/styles.css'
```

## Components

**Form**

| Component | Description |
|---|---|
| `RvButton` | Triggers an action. Supports type, variant, size, loading, and icon slots. |
| `RvInput` | Single-line text input with label, prefix, suffix, and validation state. |
| `RvTextarea` | Multi-line text input. |
| `RvSelect` | Dropdown picker for a list of options. |
| `RvCheckbox` | Single boolean toggle with label. |
| `RvRadio` | Single option within a radio group. |
| `RvRadioGroup` | Group of mutually exclusive radio options. |
| `RvSwitch` | On/off toggle. |
| `RvFormField` | Wraps any input with a label, hint, and error message. |

**Display**

| Component | Description |
|---|---|
| `RvHeading` | Semantic heading (h1–h6) with a visual level override. |
| `RvCard` | Surface container with optional header, footer, and hover state. |
| `RvBadge` | Small status label. |
| `RvTag` | Dismissible label for categories or filters. |
| `RvAvatar` | User avatar — image with fallback initials. |

**Feedback**

| Component | Description |
|---|---|
| `RvAlert` | Inline message for info, success, warning, or error states. |
| `RvSpinner` | Loading indicator. |
| `RvTooltip` | Contextual label shown on hover or focus. |

**Navigation**

| Component | Description |
|---|---|
| `RvTabs` | Tabbed content switcher with line, card, and segment variants. |
| `RvAccordion` | Expandable stacked sections. |
| `RvDropdown` | Menu triggered by a custom slot — actions, links, or labels. |

## Theming

By default the library follows the OS preference via `@media (prefers-color-scheme)`. To pin a theme, set `data-theme` on the root element:

```html
<html data-theme="light"> <!-- or "dark" -->
```

Use the `useTheme()` composable to manage this from JavaScript:

```ts
import { useTheme } from 'rv-design'

const { mode, setTheme, cycle } = useTheme()

setTheme('dark')   // 'system' | 'light' | 'dark'
cycle()            // rotates system → light → dark → system
```

## Customisation

All colours, spacing, typography, and radius values are CSS custom properties. Override the semantic aliases under `:root` to re-theme without touching component code:

```css
:root {
  --rv-accent: #your-brand-color;
  --rv-radius-md: 4px;
}
```

## Docs

Full component documentation and live examples: [rubenverdin.github.io/rv-design](https://rubenverdin.github.io/rv-design)
