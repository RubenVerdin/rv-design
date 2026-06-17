<script setup lang="ts">
// RvFormField — label + help/error wrapper for a form control.
defineProps({
  label:    { type: String, default: '' },
  required: { type: Boolean, default: false },
  help:     { type: String, default: '' },
  error:    { type: String, default: '' },
  htmlFor:  { type: String, default: '' },
})
</script>

<template>
  <div class="rv-field">
    <label v-if="label" class="rv-field__label" :for="htmlFor">
      {{ label }}
      <span v-if="required" class="rv-field__required" aria-hidden="true">*</span>
    </label>
    <slot />
    <span v-if="error" class="rv-field__error">{{ error }}</span>
    <span v-else-if="help" class="rv-field__help">{{ help }}</span>
  </div>
</template>
