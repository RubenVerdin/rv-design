<script setup lang="ts">
// RvSelect — custom single-select with a token-styled menu. v-model compatible.
import { ref, computed, onMounted, onBeforeUnmount, type PropType } from 'vue'

interface SelectOption {
  value: string | number | boolean | null
  label: string
  disabled?: boolean
}

const props = defineProps({
  modelValue: { type: [String, Number, Boolean, null] as PropType<string | number | boolean | null>, default: null },
  options:    { type: Array as PropType<SelectOption[]>, default: () => [] },
  placeholder:{ type: String, default: 'Select…' },
  size:       { type: String, default: 'medium' },
  disabled:   { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue', 'change'])

const open = ref(false)
const root = ref<HTMLElement | null>(null)
const selected = computed(() => props.options.find((o) => o.value === props.modelValue))

const classes = computed(() => [
  'rv-select',
  props.size !== 'medium' && `rv-select--${props.size}`,
  open.value && 'rv-select--open',
  props.disabled && 'rv-select--disabled',
])

function pick(opt: SelectOption): void {
  if (opt.disabled) return
  emit('update:modelValue', opt.value)
  emit('change', opt.value, opt)
  open.value = false
}
function onDoc(e: MouseEvent): void {
  if (root.value && !root.value.contains(e.target as Node)) open.value = false
}
onMounted(() => document.addEventListener('mousedown', onDoc))
onBeforeUnmount(() => document.removeEventListener('mousedown', onDoc))
</script>

<template>
  <div ref="root" :class="classes">
    <button
      type="button"
      class="rv-select__trigger"
      :disabled="disabled"
      aria-haspopup="listbox"
      :aria-expanded="open"
      @click="open = !open"
    >
      <span :class="['rv-select__value', !selected && 'rv-select__value--placeholder']">
        {{ selected ? selected.label : placeholder }}
      </span>
      <svg class="rv-select__chev" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <div v-if="open" class="rv-menu" role="listbox">
      <div
        v-for="opt in options"
        :key="String(opt.value)"
        role="option"
        :aria-selected="opt.value === modelValue"
        :class="['rv-menu__item',
                 opt.value === modelValue && 'rv-menu__item--selected',
                 opt.disabled && 'rv-menu__item--disabled']"
        @click="pick(opt)"
      >
        {{ opt.label }}
      </div>
    </div>
  </div>
</template>
