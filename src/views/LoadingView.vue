<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import loaderIcon from '@/assets/loader.gif'

const router = useRouter()

let redirectTimer: ReturnType<typeof setTimeout>

onMounted(() => {
  redirectTimer = setTimeout(() => {
    router.push({ name: 'results' })
  }, 1800)
})

onUnmounted(() => {
  clearTimeout(redirectTimer)
})
</script>

<template>
  <div class="loading">
    <AppHeader />

    <main class="loading__content">
      <img class="loading__icon" :src="loaderIcon" alt="" />
      <p class="loading__copy">We’re running to get your results.</p>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.loading {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: $color-bg-dark;
}

.loading__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 32% 24px 0;
}

.loading__icon {
  width: 128px;
  height: 128px;
  margin-bottom: 20px;
  opacity: 0.7;
}

.loading__copy {
  font-family: $font-serif;
  font-size: 19px;
  color: rgba($color-text-inverse, 0.6);
  max-width: 320px;
}
</style>
