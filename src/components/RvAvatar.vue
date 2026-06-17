<script setup lang="ts">
// RvAvatar — image or initials. Slot overrides content.
import { computed } from 'vue'

const props = defineProps({
  src:    { type: String, default: '' },
  alt:    { type: String, default: '' },
  name:   { type: String, default: '' },
  size:   { type: String, default: 'medium' }, // small|medium|large
  shape:  { type: String, default: 'circle' }, // circle|square
  accent: { type: Boolean, default: false },
})

const initials = computed(() =>
  props.name
    ? props.name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
    : '',
)
const classes = computed(() => [
  'rv-avatar',
  props.size !== 'medium' && `rv-avatar--${props.size}`,
  props.shape !== 'circle' && `rv-avatar--${props.shape}`,
  props.accent && 'rv-avatar--accent',
])
</script>

<template>
  <span :class="classes">
    <img v-if="src" :src="src" :alt="alt" />
    <slot v-else>{{ initials }}</slot>
  </span>
</template>
