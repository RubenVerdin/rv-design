<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  tag:  { type: String, default: 'div' },    // div | section
  size: { type: String, default: 'medium' }, // small | medium | large | xlarge
})

const classes = computed(() => [
  'rv-container',
  `rv-container--${props.size}`,
])
</script>

<template>
  <component
    :is="tag"
    :class="classes"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.rv-container {
  &--small  { max-width: var(--rv-container-sm); }
  &--medium { max-width: var(--rv-container-md); }
  &--large  { max-width: var(--rv-container-lg); }
  &--xlarge { max-width: var(--rv-container-xl); }

  // --rv-container-sm: 40rem;
  // --rv-container-md: 56rem;
  // --rv-container-lg: 72rem;
  // --rv-gutter: var(--rv-space-6);

  margin-inline: auto;
  padding-inline: 1rem;
}
</style>
