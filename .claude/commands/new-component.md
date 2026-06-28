Create a new RV Design component. The argument is the component name (PascalCase, without the `Rv` prefix — e.g. `Modal`, `Pagination`). If no argument is given, ask the user for the name before proceeding.

Argument: $ARGUMENTS

## Steps

Derive these values from the component name:
- **PascalName** = `Rv` + argument (e.g. `RvModal`)
- **kebab-name** = lowercase of the argument, camelCase split into hyphens (e.g. `Modal` → `modal`, `RadioGroup` → `radio-group`)
- **css-class** = `rv-` + kebab-name (e.g. `rv-modal`)

### 1. Create the Vue component

Create `src/components/{PascalName}.vue`:

```vue
<script setup lang="ts">
// {PascalName}
</script>

<template>
  <div class="{css-class}">
    <span class="{css-class}__text">{PascalName} placeholder</span>
  </div>
</template>
```

### 2. Create the CSS file

Create `css/{kebab-name}.css`:

```css
/* RV Design — {PascalName}
   ---------------------------------------------------------------------- */

.{css-class} {
  display: block;
}

.{css-class}__text {
  font-family: var(--rv-font-sans);
  color: var(--rv-text-primary);
}
```

### 3. Register the CSS import

Open `css/components.css` and append a new `@import` line at the end of the existing imports:

```css
@import "./{kebab-name}.css";
```

### 4. Register the component in src/index.ts

Open `src/index.ts` and make three edits:

**a) Add import** — append after the last existing `import Rv…` line:
```ts
import {PascalName} from './components/{PascalName}.vue'
```

**b) Add to named export block** — add `{PascalName}` to the `export { … }` list.

**c) Add to the `components` object** — add `{PascalName}` to the object literal used in the `install()` function.

---

After all files are written and edits applied, print a short summary:
- Files created
- Lines changed in index.ts and components.css
