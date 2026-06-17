<script setup lang="ts">
// RvRadio — single radio. Use standalone with v-model, or inside RvRadioGroup.
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number, Boolean, null], default: undefined },
  value:      { type: [String, Number, Boolean], required: true },
  name:       { type: String, default: '' },
  disabled:   { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue', 'change'])

const checked = computed(() => props.modelValue === props.value)
const classes = computed(() => [
  'rv-choice', 'rv-choice--radio',
  checked.value && 'rv-choice--checked',
  props.disabled && 'rv-choice--disabled',
])

function onChange() {
  if (props.disabled) return
  emit('update:modelValue', props.value)
  emit('change', props.value)
}
</script>

<template>
  <label :class="classes">
    <input type="radio" :name="name" :checked="checked" :disabled="disabled" @change="onChange" />
    <span class="rv-choice__box"><span class="rv-choice__dot" /></span>
    <span v-if="$slots.default" class="rv-choice__label"><slot /></span>
  </label>
</template>
