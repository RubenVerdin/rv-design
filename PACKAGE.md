# RV Design — Vue 3 component library

A token-driven Vue 3 component library. Natural/architectural palette, light + dark
(OS-following) theming — all driven by CSS custom properties. This folder is a
**self-contained npm package**; open it directly in VSCode.

## Quick start

```bash
cd rv-vue          # this folder
code .             # open in VSCode
npm install        # vue + vite (dev deps)
npm run build      # → dist/rv-design.js + dist/rv-design.css
```

## Use it in a Vue app

```js
// main.js
import { createApp } from 'vue'
import RVDesign from 'rv-design'
import 'rv-design/styles.css'
import App from './App.vue'

createApp(App).use(RVDesign).mount('#app')   // registers <RvButton> … globally
```

Or import individually:

```vue
<script setup>
import { RvButton, RvSelect, useTheme } from 'rv-design'
import 'rv-design/styles.css'
const { cycle, mode } = useTheme()           // system → light → dark
</script>

<template>
  <RvButton type="primary" @click="cycle">Theme: {{ mode }}</RvButton>
</template>
```

### CSS-only (no Vue)
Every component is a plain CSS class — skip the Vue layer entirely:

```html
<link rel="stylesheet" href="rv-design/styles.css" />
<button class="rv-btn rv-btn--primary rv-btn--medium">Save</button>
```

Dark mode follows the OS by default; set `data-theme="light|dark"` on any ancestor to pin it.

## Components (20)

| Group | Components |
|-------|-----------|
| Buttons | `RvButton` |
| Data input | `RvInput` · `RvTextarea` · `RvSelect` · `RvCheckbox` · `RvRadio` · `RvRadioGroup` · `RvSwitch` · `RvFormField` |
| Data display | `RvCard` · `RvBadge` · `RvTag` · `RvAvatar` |
| Typography | `RvHeading` |
| Feedback | `RvAlert` · `RvSpinner` · `RvTooltip` |
| Navigation | `RvTabs` · `RvAccordion` · `RvDropdown` |

Each is a thin wrapper over the `.rv-*` CSS classes — same class contract as the
React previews in the parent design system. Inputs/toggles/selects/tabs support
`v-model`. See `readme.md` for the full design language (tokens, states, theming).

## Folder layout

| Path | Role |
|------|------|
| `styles.css` + `tokens/` + `css/` | the design system — CSS variables + component classes |
| `src/index.js` | entry: imports CSS, exports components + `useTheme`, default Vue plugin |
| `src/components/*.vue` | the 20 Vue components |
| `src/composables/useTheme.js` | light / dark / system theme control |
| `dist/` | build output (`npm run build`) |

## Publishing

```bash
npm run build
npm login
npm publish --access public      # change the name in package.json if "rv-design" is taken
```

Bump with `npm version patch|minor|major` before each publish.
