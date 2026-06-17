<script setup lang="ts">
// RvDropdown — menu anchored to a trigger slot.
// items: [{ key, label, icon?, shortcut?, danger?, disabled?, onClick? }
//          | { type: 'divider' } | { type: 'label', label }]
import { ref, onMounted, onBeforeUnmount, type PropType } from 'vue'

interface DropdownItem {
  key?: string | number
  type?: 'divider' | 'label'
  label?: string
  icon?: string
  shortcut?: string
  danger?: boolean
  disabled?: boolean
  onClick?: () => void
}

const props = defineProps({
  items: { type: Array as PropType<DropdownItem[]>, default: () => [] },
  align: { type: String, default: 'left' }, // left|right
})
const emit = defineEmits(['select'])

const open = ref(false)
const root = ref<HTMLElement | null>(null)

function choose(it: DropdownItem): void {
  if (it.disabled || it.type === 'divider' || it.type === 'label') return
  emit('select', it.key, it)
  it.onClick?.()
  open.value = false
}
function onDoc(e: MouseEvent): void {
  if (root.value && !root.value.contains(e.target as Node)) open.value = false
}
function onKey(e: KeyboardEvent): void {
  if (e.key === 'Escape') open.value = false
}
onMounted(() => {
  document.addEventListener('mousedown', onDoc)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDoc)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div ref="root" class="rv-dropdown">
    <span @click="open = !open"><slot name="trigger" /></span>
    <div v-if="open" :class="['rv-dropdown__panel', `rv-dropdown__panel--${align}`]">
      <div class="rv-menu" role="menu">
        <template v-for="(it, i) in items" :key="it.key ?? i">
          <div v-if="it.type === 'divider'" class="rv-menu__sep" />
          <div v-else-if="it.type === 'label'" class="rv-menu__label">{{ it.label }}</div>
          <div
            v-else
            role="menuitem"
            :class="['rv-menu__item', it.danger && 'rv-menu__item--danger', it.disabled && 'rv-menu__item--disabled']"
            @click="choose(it)"
          >
            <span v-if="it.icon" class="rv-menu__item-icon" v-html="it.icon" />
            <span>{{ it.label }}</span>
            <span v-if="it.shortcut" class="rv-menu__shortcut">{{ it.shortcut }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
