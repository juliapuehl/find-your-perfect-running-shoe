<script setup lang="ts">
import type { Component } from 'vue'
import CtaButton from '@/components/CtaButton.vue'

withDefaults(defineProps<{ label?: string; icon?: Component }>(), {
  label: 'Restart Quiz',
})
</script>

<template>
  <CtaButton class="restart-button">
    <component :is="icon" v-if="icon" class="restart-button__icon" />
    {{ label }}
  </CtaButton>
</template>

<style lang="scss" scoped>
.restart-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.restart-button__icon {
  width: 16px;
  height: 16px;
}
</style>
