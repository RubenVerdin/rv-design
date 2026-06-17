<script setup lang="ts">
// RvCard — content container. Slots: default (body), title, extra, footer.
import { computed } from 'vue'

const props = defineProps({
  title:     { type: String, default: '' },
  variant:   { type: String, default: 'default' }, // default|raised|outlined …
  padding:   { type: String, default: 'default' }, // default|none|… → rv-card--pad-*
  hoverable: { type: Boolean, default: false },
})

const classes = computed(() => [
  'rv-card',
  props.variant !== 'default' && `rv-card--${props.variant}`,
  props.padding !== 'default' && `rv-card--pad-${props.padding}`,
  props.hoverable && 'rv-card--hoverable',
])
</script>

<template>
  <div :class="classes">
    <div v-if="title || $slots.title || $slots.extra" class="rv-card__header">
      <span class="rv-card__title"><slot name="title">{{ title }}</slot></span>
      <span v-if="$slots.extra" class="rv-card__extra"><slot name="extra" /></span>
    </div>
    <div class="rv-card__body"><slot /></div>
    <div v-if="$slots.footer" class="rv-card__footer"><slot name="footer" /></div>
  </div>
</template>
