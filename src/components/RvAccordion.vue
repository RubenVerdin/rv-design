<script setup lang="ts">
// RvAccordion — stacked expandable sections.
// items: [{ key, title, content, extra?, disabled? }]
import { ref, computed, type PropType } from 'vue'

interface AccordionItem {
  key: string | number
  title: string
  content: string
  extra?: string
  
}

type AccordionKey = string | number

const props = defineProps({
  items:        { type: Array as PropType<AccordionItem[]>, default: () => [] },
  defaultValue: { type: [Array, String, Number], default: () => [] },
  multiple:     { type: Boolean, default: false },
  variant:      { type: String, default: 'bordered' },
})

const norm = (v: unknown): AccordionKey[] =>
  Array.isArray(v) ? v : v != null ? [v as AccordionKey] : []
const open = ref<AccordionKey[]>(norm(props.defaultValue))

const classes = computed(() => ['rv-accordion', `rv-accordion--${props.variant}`])

function toggle(key: AccordionKey): void {
  const isOpen = open.value.includes(key)
  if (props.multiple) {
    open.value = isOpen ? open.value.filter((k) => k !== key) : [...open.value, key]
  } else {
    open.value = isOpen ? [] : [key]
  }
}
</script>

<template>
  <div :class="classes">
    <div
      v-for="it in items"
      :key="it.key"
      :class="[
        'rv-accordion__item', 
        open.includes(it.key) && 'rv-accordion__item--open'
      ]"
    >
      <button
        type="button"
        class="rv-accordion__header"
        :aria-expanded="open.includes(it.key)"
        :disabled="it.disabled"
        @click="!it.disabled && toggle(it.key)"
      >
        <svg
          class="rv-accordion__chev"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span class="rv-accordion__title">{{ it.title }}</span>
        <span
          v-if="it.extra"
          class="rv-accordion__extra"
        >{{ it.extra }}</span>
      </button>
      <div class="rv-accordion__panel">
        <div class="rv-accordion__panel-inner">
          <div class="rv-accordion__content">
            {{ it.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
