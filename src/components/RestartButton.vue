<script setup lang="ts">
import CtaButton from '@/components/CtaButton.vue'

withDefaults(defineProps<{ label?: string }>(), {
  label: 'Restart Quiz',
})
</script>

<template>
  <CtaButton class="restart-button">
    <slot name="icon" />
    {{ label }}
  </CtaButton>
</template>

<style lang="scss" scoped>
.restart-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

:slotted(.restart-button__icon) {
  width: 16px;
  height: 16px;
}
</style>
