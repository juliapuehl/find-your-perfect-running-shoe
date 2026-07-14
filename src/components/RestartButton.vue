<script setup lang="ts">
import CtaButton from '@/components/CtaButton.vue'
</script>

<template>
  <CtaButton class="restart-button">
    <svg class="restart-button__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 4v5h5M20 20v-5h-5M4.5 15a8 8 0 0 0 14.5 3M19.5 9A8 8 0 0 0 5 6"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    Restart Quiz
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
