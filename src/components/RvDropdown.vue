<script setup lang="ts">
// RvDropdown — aim-aware, popover-based dropdown anchored to its trigger.
// trigger="click" (default) | "hover"
// placement: 12 positions, auto-flips via CSS position-try-fallbacks.
// Panel uses popover="auto": top-layer, light-dismiss, sibling-exclusivity.
import { ref, computed, watch, onBeforeUnmount, getCurrentInstance, nextTick } from 'vue'
import { useAimAware } from '../composables/useAimAware'
import { useDropdownPosition, type DropdownPlacement } from '../composables/useDropdownPosition'

const props = defineProps({
  trigger:    { type: String as () => 'click' | 'hover', default: 'click' },
  placement:  { type: String as () => DropdownPlacement, default: 'bottom-start' },
  offset:     { type: Number, default: 8 },
  animation:  { type: String as () => 'slide' | 'scale' | 'fade' | 'none', default: 'slide' },
  hoverDelay: { type: Number, default: 100 },
  disabled:   { type: Boolean, default: false },
})

const emit = defineEmits<{ open: []; close: [] }>()

const uid      = getCurrentInstance()!.uid
const panelId  = `rv-drop-${uid}`
const anchorName = `--rv-drop-${uid}`

const triggerRef = ref<HTMLElement | null>(null)
const panelRef   = ref<HTMLElement | null>(null)
const isOpen     = ref(false)

// ---- ARIA props passed to the trigger slot --------------------------------

const triggerProps = computed(() => ({
  'aria-haspopup':  'menu' as const,
  'aria-expanded':  isOpen.value,
  'aria-controls':  panelId,
}))

// ---- Panel style ----------------------------------------------------------

const panelStyle = computed(() => ({
  positionAnchor: anchorName,
  '--rv-drop-offset': `${props.offset}px`,
}))

// ---- JS fallback positioning (no-op when anchor positioning is supported) -

useDropdownPosition(
  triggerRef,
  panelRef,
  () => props.placement,
  () => props.offset,
  isOpen,
)

// ---- Aim-aware hover ------------------------------------------------------

const aim = useAimAware(panelRef, () => panelRef.value?.hidePopover(), () => props.hoverDelay)

function onTriggerEnter() {
  if (props.trigger !== 'hover' || props.disabled) return
  aim.cancelClose()
  panelRef.value?.showPopover()
}

function onTriggerLeave() {
  if (props.trigger !== 'hover') return
  aim.scheduleClose()
}

function onPanelEnter() {
  if (props.trigger !== 'hover') return
  aim.cancelClose()
}

function onPanelLeave() {
  if (props.trigger !== 'hover') return
  aim.scheduleClose()
}

// Track mouse globally while panel is open (aim-awareness works in transit)
function onDocMouseMove(e: MouseEvent) { aim.track(e) }

watch(isOpen, (open) => {
  if (open && props.trigger === 'hover') {
    document.addEventListener('mousemove', onDocMouseMove)
  } else {
    document.removeEventListener('mousemove', onDocMouseMove)
  }
})

// ---- Click mode -----------------------------------------------------------

function onTriggerClick() {
  if (props.trigger !== 'click' || props.disabled) return
  if (isOpen.value) panelRef.value?.hidePopover()
  else              panelRef.value?.showPopover()
}

// ---- Popover toggle -------------------------------------------------------

function onToggle(e: Event) {
  const te = e as ToggleEvent
  isOpen.value = te.newState === 'open'
  if (te.newState === 'open') {
    emit('open')
    nextTick(focusFirstItem)
  } else {
    emit('close')
    aim.reset()
  }
}

// ---- Keyboard navigation --------------------------------------------------

function menuItems(): HTMLElement[] {
  return Array.from(
    panelRef.value?.querySelectorAll<HTMLElement>(
      '[role="menuitem"]:not([aria-disabled="true"])'
    ) ?? []
  )
}

function focusFirstItem() {
  menuItems()[0]?.focus()
}

function onPanelKeydown(e: KeyboardEvent) {
  const items = menuItems()
  if (!items.length) return

  const idx = items.indexOf(document.activeElement as HTMLElement)

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      items[(idx + 1) % items.length]?.focus()
      break
    case 'ArrowUp':
      e.preventDefault()
      items[(idx - 1 + items.length) % items.length]?.focus()
      break
    case 'Home':
      e.preventDefault()
      items[0]?.focus()
      break
    case 'End':
      e.preventDefault()
      items[items.length - 1]?.focus()
      break
    case 'Escape':
      panelRef.value?.hidePopover()
      triggerRef.value?.querySelector<HTMLElement>('button,[tabindex="0"],[tabindex="-1"]')?.focus()
      break
    case 'Tab':
      panelRef.value?.hidePopover()
      break
  }
}

// ---- Cleanup --------------------------------------------------------------

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onDocMouseMove)
  aim.reset()
})
</script>

<template>
  <div
    ref="triggerRef"
    class="rv-dropdown__trigger"
    :style="{ anchorName }"
    @click="onTriggerClick"
    @mouseenter="onTriggerEnter"
    @mouseleave="onTriggerLeave"
  >
    <slot
      name="trigger"
      v-bind="triggerProps"
    />
  </div>

  <div
    :id="panelId"
    ref="panelRef"
    popover="auto"
    role="menu"
    tabindex="-1"
    class="rv-dropdown__panel"
    :data-placement="placement"
    :data-animation="animation"
    :style="panelStyle"
    @toggle="onToggle"
    @keydown="onPanelKeydown"
    @mouseenter="onPanelEnter"
    @mouseleave="onPanelLeave"
  >
    <slot />
  </div>
</template>
