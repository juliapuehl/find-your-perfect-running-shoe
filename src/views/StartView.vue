<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import CtaButton from '@/components/CtaButton.vue'
import runnerImage from '@/assets/Background Image Start Screen.png'

const router = useRouter()

function startQuiz() {
  router.push({ name: 'quiz' })
}
</script>

<template>
  <div class="start">
    <AppHeader />

    <main class="start__content">
      <div class="start__copy">
        <h1 class="start__heading">Take the quiz<br />and try your first pair!</h1>

        <CtaButton class="start__cta" @click="startQuiz">Try On Trial</CtaButton>

        <p class="start__note">30 Days risk free</p>
      </div>

      <div class="start__visual">
        <img class="start__runner" :src="runnerImage" alt="Runner in On apparel mid-stride" />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.start {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: $color-bg-light;
}

.start__content {
  position: relative;
  flex: 1;
  min-height: 620px;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 18%;
    background: linear-gradient(to bottom, rgba($color-bg-light, 0), $color-bg-light 85%);
    z-index: 3;
    pointer-events: none;
  }
}

.start__copy {
  position: relative;
  z-index: 2;
  max-width: 50%;
  padding: 19% 48px 0;
}

.start__heading {
  font-size: clamp(28px, 7vw, 38px);
  line-height: 1.15;
  margin-bottom: 28px;
}

.start__cta {
  margin-bottom: 24px;
}

.start__note {
  font-size: 14px;
}

.start__visual {
  position: absolute;
  right: 2%;
  bottom: 0;
  width: 68%;
  aspect-ratio: 0.52 / 1;

  @media (min-width: $bp-desktop) {
    width: 52%;
  }
}

.start__runner {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 100%;
}
</style>
