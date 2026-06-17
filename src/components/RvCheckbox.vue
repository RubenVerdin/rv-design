<script setup lang="ts">
// RvCheckbox — boolean checkbox with indeterminate state. v-model compatible.
import { computed } from 'vue'

const props = defineProps({
  modelValue:    { type: Boolean, default: false },
  indeterminate: { type: Boolean, default: false },
  disabled:      { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue', 'change'])

const classes = computed(() => [
  'rv-choice', 'rv-choice--checkbox',
  props.modelValue && !props.indeterminate && 'rv-choice--checked',
  props.indeterminate && 'rv-choice--indeterminate',
  props.disabled && 'rv-choice--disabled',
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
    <input type="checkbox" :checked="modelValue" :disabled="disabled" @change="onChange" />
    <span class="rv-choice__box">
      <svg v-if="!indeterminate" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12l5 5L20 6" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>
    <span v-if="$slots.default" class="rv-choice__label"><slot /></span>
  </label>
</template>
