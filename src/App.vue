<script setup lang="ts"></script>

<template>
  <div class="app-shell">
    <!--placeholder Vue Router swaps content into based on current route-->
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.app-shell {
  max-width: $shell-max-width;
  margin: 0 auto;

  @media (min-width: $bp-laptop) {
    max-width: $shell-max-width-desktop;
  }
}
</style>
