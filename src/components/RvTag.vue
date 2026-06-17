<script setup lang="ts">
// RvTag — labelled chip, optionally removable.
import { computed } from 'vue'

const props = defineProps({
  type:     { type: String, default: 'default' },
  round:    { type: Boolean, default: false },
  closable: { type: Boolean, default: false },
})
defineEmits(['close'])

const classes = computed(() => [
  'rv-tag', `rv-tag--${props.type}`, props.round && 'rv-tag--round',
])
</script>

<template>
  <span :class="classes">
    <slot />
    <span
      v-if="closable"
      class="rv-tag__close"
      role="button"
      aria-label="Remove"
      @click="$emit('close')"
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" /></svg>
    </span>
  </span>
</template>
