<script setup lang="ts">
// RvTooltip — hover/focus tooltip wrapping its default slot.
// `content` is the tooltip text; the wrapped element is the default slot.
import { ref } from 'vue'

defineProps({
  content: { type: String, default: '' },
})
const show = ref(false)
</script>

<template>
  <span
    class="rv-tooltip-wrap"
    @mouseenter="show = true"
    @mouseleave="show = false"
    @focusin="show = true"
    @focusout="show = false"
  >
    <slot />
    <span v-if="show && content" class="rv-tooltip" role="tooltip">{{ content }}</span>
  </span>
</template>
