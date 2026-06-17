<script setup lang="ts">
// RvSpinner — indeterminate loading indicator.
import { computed } from 'vue'

const props = defineProps({
  size:  { type: String, default: 'medium' }, // small|medium|large
  label: { type: String, default: '' },
})
const spinnerClass = computed(() => [
  'rv-spinner',
  props.size !== 'medium' && `rv-spinner--${props.size}`,
])
</script>

<template>
  <span class="rv-spinner-wrap" role="status">
    <span :class="spinnerClass" />
    <span v-if="label" class="rv-spinner__label">{{ label }}</span>
  </span>
</template>
