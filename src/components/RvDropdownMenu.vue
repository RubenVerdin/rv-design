<script setup lang="ts">
import { type PropType } from 'vue'

export interface DropdownItem {
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
})

const emit = defineEmits<{
  select: [key: string | number | undefined, item: DropdownItem]
}>()

function choose(it: DropdownItem) {
  if (it.disabled || it.type === 'divider' || it.type === 'label') return
  emit('select', it.key, it)
  it.onClick?.()
}
</script>

<template>
  <div class="rv-menu">
    <template v-for="(it, i) in items" :key="it.key ?? i">
      <div v-if="it.type === 'divider'" role="separator" class="rv-menu__sep" />
      <div v-else-if="it.type === 'label'" role="presentation" class="rv-menu__label">{{ it.label }}</div>
      <div
        v-else
        role="menuitem"
        :aria-disabled="it.disabled || undefined"
        :tabindex="it.disabled ? undefined : -1"
        :class="['rv-menu__item', it.danger && 'rv-menu__item--danger', it.disabled && 'rv-menu__item--disabled']"
        @click="choose(it)"
        @keydown.enter.space.prevent="choose(it)"
      >
        <span v-if="it.icon" class="rv-menu__item-icon" v-html="it.icon" />
        <span>{{ it.label }}</span>
        <span v-if="it.shortcut" class="rv-menu__shortcut">{{ it.shortcut }}</span>
      </div>
    </template>
  </div>
</template>
