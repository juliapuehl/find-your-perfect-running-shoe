<script setup lang="ts">
withDefaults(defineProps<{ type?: 'button' | 'submit' }>(), { type: 'button' })
</script>

<template>
  <button class="cta-button" :type="type">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.cta-button {
  position: relative;
  display: inline-block;
  background: $color-black;
  color: $color-white;
  font-family: $font-serif;
  font-size: 24px;
  letter-spacing: 0.02em;
  padding: 18px 40px;
  box-shadow: 0 6px 0 0 $color-shadow-ledge;
  transition: transform 0.15s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 3px 0 0 $color-shadow-ledge;
  }
}
</style>
