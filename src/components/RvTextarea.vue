<script setup lang="ts">
// RvTextarea — multi-line text field. v-model compatible.
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  status:     { type: String, default: '' }, // ''|success|warning|error
  rows:       { type: [Number, String], default: 4 },
  placeholder:{ type: String, default: '' },
  disabled:   { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue'])

function onInput(e: Event): void {
  emit('update:modelValue', (e.target as HTMLTextAreaElement).value)
}

const classes = computed(() => [
  'rv-input', 'rv-input--textarea',
  props.status && `rv-input--${props.status}`,
  props.disabled && 'rv-input--disabled',
])
</script>

<template>
  <div :class="classes">
    <textarea
      class="rv-input__field"
      :rows="rows"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="onInput"
    />
  </div>
</template>
