<script setup lang="ts">
// RvTabs — tabbed navigation. items: [{ key, label, icon?, content?, disabled? }]
// v-model selects the active key.
import { ref, computed, watch, type PropType } from 'vue'

interface TabItem {
  key: string | number
  label: string
  icon?: string
  content?: string
  disabled?: boolean
}

const props = defineProps({
  items:      { type: Array as PropType<TabItem[]>, default: () => [] },
  modelValue: { type: [String, Number], default: undefined },
  variant:    { type: String, default: 'line' }, // line|card|segment
})
const emit = defineEmits(['update:modelValue', 'change'])

const internal = ref(props.modelValue ?? props.items[0]?.key)
watch(() => props.modelValue, (v) => { if (v !== undefined) internal.value = v })
const active = computed(() => (props.modelValue !== undefined ? props.modelValue : internal.value))
const activeItem = computed(() => props.items.find((i) => i.key === active.value))

function select(it: TabItem): void {
  if (it.disabled) return
  internal.value = it.key
  emit('update:modelValue', it.key)
  emit('change', it.key)
}
</script>

<template>
  <div :class="['rv-tabs', `rv-tabs--${variant}`]">
    <div class="rv-tabs__list" role="tablist">
      <button
        v-for="it in items"
        :key="it.key"
        type="button"
        role="tab"
        :aria-selected="it.key === active"
        :class="['rv-tab', it.key === active && 'rv-tab--active', it.disabled && 'rv-tab--disabled']"
        @click="select(it)"
      >
        <span v-if="it.icon" class="rv-tab__icon" v-html="it.icon" />
        {{ it.label }}
      </button>
    </div>
    <div v-if="activeItem?.content || $slots.default" class="rv-tabs__panel" role="tabpanel">
      <slot>{{ activeItem?.content }}</slot>
    </div>
  </div>
</template>
