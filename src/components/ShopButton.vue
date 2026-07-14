<script setup lang="ts">
withDefaults(defineProps<{ type?: 'button' | 'submit' }>(), { type: 'button' })
</script>

<template>
  <button class="shop-button" :type="type">
    <slot>Shop now</slot>
  </button>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.shop-button {
  display: inline-block;
  background: $color-teal;
  color: $color-white;
  font-size: 15px;
  letter-spacing: 0.02em;
  padding: 16px 40px;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.9;
  }
}
</style>
