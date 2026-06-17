<script setup lang="ts">
// RvSwitch — boolean toggle. v-model compatible.
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  size:       { type: String, default: 'medium' }, // small|medium|large
  disabled:   { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'change'])

const classes = computed(() => [
  'rv-switch',
  props.modelValue && 'rv-switch--checked',
  props.size !== 'medium' && `rv-switch--${props.size}`,
  props.disabled && 'rv-switch--disabled',
])

function onChange(e: Event): void {
  if (props.disabled) return
  const checked = (e.target as HTMLInputElement).checked
  emit('update:modelValue', checked)
  emit('change', checked)
}
</script>

<template>
  <label :class="classes">
    <input
      type="checkbox"
      role="switch"
      :checked="modelValue"
      :disabled="disabled"
      @change="onChange"
    />
    <span class="rv-switch__track"><span class="rv-switch__thumb" /></span>
    <span v-if="$slots.default" class="rv-switch__label"><slot /></span>
  </label>
</template>
