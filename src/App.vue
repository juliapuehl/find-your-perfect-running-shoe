<script setup lang="ts"></script>

<template>
  <div class="app-shell">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.app-shell {
  max-width: $shell-max-width;
  margin: 0 auto;

  @media (min-width: $bp-desktop) {
    max-width: $shell-max-width-desktop;
  }
}
</style>
