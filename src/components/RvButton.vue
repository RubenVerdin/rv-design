<script setup lang="ts">
import { computed, useSlots } from 'vue'

const props = defineProps({
  type:     { type: String, default: 'primary' },  // primary|secondary|text
  size:     { type: String, default: 'medium' },   // small|medium|large
  disabled: { type: Boolean, default: false },
  iconOnly: { type: Boolean, default: false },
})

defineEmits(['click'])
const slots = useSlots()

const isIconOnly = computed(
  () => props.iconOnly || (!slots.default && (slots.iconLeft || slots.iconRight)),
)

const classes = computed(() => [
  'rv-btn',
  `rv-btn--${props.type}`,
  `rv-btn--${props.size}`,
  { 'rv-btn--icon': isIconOnly.value,
    'rv-btn--disabled': props.disabled },
])
</script>

<template>
  <button
    :class="classes"
    type="button"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <span v-if="$slots.iconLeft" class="rv-btn__icon"><slot name="iconLeft" /></span>
    <slot />
    <span v-if="$slots.iconRight" class="rv-btn__icon"><slot name="iconRight" /></span>
  </button>
</template>
