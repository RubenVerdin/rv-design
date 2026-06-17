<script setup lang="ts">
// RvAlert — inline status message. Slot = body; `title` prop = bold heading.
import { computed } from 'vue'

const props = defineProps({
  type:     { type: String, default: 'info' }, // info|success|warning|error|default
  title:    { type: String, default: '' },
  showIcon: { type: Boolean, default: true },
  closable: { type: Boolean, default: false },
})

defineEmits(['close'])

type AlertType = 'info' | 'success' | 'warning' | 'error' | 'default'

const ICONS: Record<AlertType, string> = {
  info:    'M12 8h.01M11 12h1v4h1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  success: 'M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  warning: 'M12 9v4m0 4h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h16.9a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z',
  error:   'M15 9l-6 6m0-6l6 6M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  default: 'M12 8h.01M11 12h1v4h1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
}
const iconPath = computed(() => ICONS[props.type as AlertType] ?? ICONS.default)
</script>

<template>
  <div role="alert" :class="['rv-alert', `rv-alert--${type}`]">
    <span v-if="showIcon" class="rv-alert__icon">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path :d="iconPath" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>
    <div class="rv-alert__body">
      <div v-if="title" class="rv-alert__title">{{ title }}</div>
      <div v-if="$slots.default" class="rv-alert__content"><slot /></div>
    </div>
    <button
      v-if="closable"
      type="button"
      class="rv-alert__close"
      aria-label="Dismiss"
      @click="$emit('close')"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
    </button>
  </div>
</template>
