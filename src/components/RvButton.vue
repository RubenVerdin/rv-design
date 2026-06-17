<script setup lang="ts">
// RvButton — trigger an action. Maps directly to the .rv-btn CSS contract.
import { computed, useSlots, type PropType } from 'vue'

const props = defineProps({
  type:     { type: String, default: 'default' }, // default|primary|info|success|warning|error
  variant:  { type: String, default: 'solid' },   // solid|soft|tertiary|ghost|dashed|outline
  size:     { type: String, default: 'medium' },  // tiny|small|medium|large
  disabled: { type: Boolean, default: false },
  loading:  { type: Boolean, default: false },
  block:    { type: Boolean, default: false },
  circle:   { type: Boolean, default: false },
  iconOnly: { type: Boolean, default: false },
  htmlType: { type: String as PropType<'button' | 'submit' | 'reset'>, default: 'button' },
})

defineEmits(['click'])
const slots = useSlots()

const isIconOnly = computed(
  () => props.iconOnly || (!slots.default && (slots.iconLeft || slots.iconRight)),
)

const classes = computed(() => [
  'rv-btn',
  `rv-btn--${props.type}`,
  `rv-btn--${props.variant}`,
  `rv-btn--${props.size}`,
  { 'rv-btn--block': props.block,
    'rv-btn--icon': isIconOnly.value,
    'rv-btn--circle': props.circle,
    'rv-btn--disabled': props.disabled || props.loading },
])
</script>

<template>
  <button
    :class="classes"
    :type="htmlType"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="rv-btn__spinner" aria-hidden="true" />
    <span v-else-if="$slots.iconLeft" class="rv-btn__icon"><slot name="iconLeft" /></span>
    <slot />
    <span v-if="!loading && $slots.iconRight" class="rv-btn__icon"><slot name="iconRight" /></span>
  </button>
</template>
