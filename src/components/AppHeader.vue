<script setup lang="ts">
import onLogo from '@/assets/on-logo.png'
</script>

<template>
  <header class="app-header">
    <button class="app-header__menu" type="button" aria-label="Open menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <img class="app-header__logo" :src="onLogo" alt="On" />
  </header>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.app-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: $header-height;
  flex-shrink: 0;
  background: $color-white;
  border-bottom: 1px solid $color-border;
}

.app-header__logo {
  height: 54px;
  width: auto;
}

.app-header__menu {
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px;

  span {
    display: block;
    width: 40px;
    height: 2.5px;
    background: $color-text-muted;
  }
}
</style>
