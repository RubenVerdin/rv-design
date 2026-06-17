<script setup lang="ts">
// RvInput — text field with optional prefix/suffix. v-model compatible.
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  size:       { type: String, default: 'medium' }, // small|medium|large
  status:     { type: String, default: '' },       // ''|success|warning|error
  type:       { type: String, default: 'text' },
  placeholder:{ type: String, default: '' },
  disabled:   { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

function onInput(e: Event): void {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

const classes = computed(() => [
  'rv-input',
  props.size !== 'medium' && `rv-input--${props.size}`,
  props.status && `rv-input--${props.status}`,
  props.disabled && 'rv-input--disabled',
])
</script>

<template>
  <div :class="classes">
    <span v-if="$slots.prefix" class="rv-input__affix"><slot name="prefix" /></span>
    <input
      class="rv-input__field"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="onInput"
    />
    <span v-if="$slots.suffix" class="rv-input__affix"><slot name="suffix" /></span>
  </div>
</template>
