<script setup lang="ts">
// RvBadge — small status marker. `dot` renders a bare indicator.
import { computed } from 'vue'

const props = defineProps({
  type:    { type: String, default: 'default' }, // default|primary|info|success|warning|error
  variant: { type: String, default: 'soft' },    // soft|solid|outline
  dot:     { type: Boolean, default: false },
})

const classes = computed(() =>
  props.dot
    ? ['rv-badge', 'rv-badge--dot', `rv-badge--${props.type}`]
    : ['rv-badge', `rv-badge--${props.type}`, `rv-badge--${props.variant}`],
)
</script>

<template>
  <span v-if="dot" :class="classes" />
  <span v-else :class="classes"><slot /></span>
</template>
