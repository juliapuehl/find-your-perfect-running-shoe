<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <button class="answer-option" type="button">
    {{ label }}
  </button>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.answer-option {
  border: 1px solid rgba($color-text-inverse, 0.35);
  color: $color-text-inverse;
  font-size: 17px;
  padding: clamp(14px, 4vh, 26px) 16px;
  text-align: center;
  transition:
    border-color 0.15s ease,
    background-color 0.15s ease;

  &:hover {
    border-color: $color-text-inverse;
    background: rgba($color-text-inverse, 0.06);
  }
}
</style>
