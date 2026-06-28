<script setup lang="ts">
// RvProse — renders long-form / user-generated HTML with prose styling.
// Pass `content` for CMS/markdown output, or use the default slot for
// static markup. Content passed via prop must be sanitized upstream.

defineProps({
  content: { type: String, default: '' },
  as:      { type: String, default: 'article' },
})
</script>

<template>
  <component v-if="content" :is="as" class="rv-prose" v-html="content" />
  <component v-else :is="as" class="rv-prose"><slot /></component>
</template>
