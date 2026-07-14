<script setup lang="ts"></script>

<template>
  <button class="back-button" type="button" aria-label="Previous question">
    <svg class="back-button__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 18L9 12L15 6"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.back-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: $color-text-inverse;
}

.back-button__icon {
  width: 24px;
  height: 24px;
}
</style>
