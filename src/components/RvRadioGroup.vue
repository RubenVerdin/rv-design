<script setup lang="ts">
// RvRadioGroup — manages a set of RvRadio options. v-model compatible.
import { computed, type PropType } from 'vue'
import RvRadio from './RvRadio.vue'

interface RadioOption {
  value: string | number | boolean
  label: string
  disabled?: boolean
}

const props = defineProps({
  modelValue: { type: [String, Number, Boolean, null] as PropType<string | number | boolean | null>, default: null },
  options:    { type: Array as PropType<RadioOption[]>, default: () => [] },
  name:       { type: String, default: '' },
  vertical:   { type: Boolean, default: false },
  disabled:   { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue', 'change'])

const classes = computed(() => [
  'rv-choice-group',
  props.vertical && 'rv-choice-group--vertical',
])

function update(val: string | number | boolean): void {
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<template>
  <div :class="classes" role="radiogroup">
    <RvRadio
      v-for="opt in options"
      :key="String(opt.value)"
      :name="name"
      :value="opt.value"
      :model-value="modelValue"
      :disabled="disabled || opt.disabled"
      @update:model-value="update"
    >
      {{ opt.label }}
    </RvRadio>
  </div>
</template>
