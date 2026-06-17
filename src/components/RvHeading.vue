<script setup lang="ts">
// RvHeading — semantic heading with display / tone variants.
import { computed } from 'vue'

const props = defineProps({
  level:   { type: [Number, String], default: 2 }, // 1..6
  display: { type: Boolean, default: false },
  tone:    { type: String, default: '' },          // e.g. muted | accent
  as:      { type: String, default: '' },          // override the tag
})

const tag = computed(() => props.as || `h${props.level}`)
const classes = computed(() => [
  'rv-heading',
  props.display ? 'rv-heading--display' : `rv-heading--${props.level}`,
  props.tone && `rv-heading--${props.tone}`,
])
</script>

<template>
  <component :is="tag" :class="classes"><slot /></component>
</template>
