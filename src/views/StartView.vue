<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import CtaButton from '@/components/CtaButton.vue'
import runnerImage from '@/assets/Background Image Start Screen.png'

interface Sparkle {
  left: number
  bottom: number
  size: number
  delay: number
}

const router = useRouter()
const isTransitioning = ref(false)
const sparkles = ref<Sparkle[]>([])

function createSparkles(): Sparkle[] {
  return Array.from({ length: 16 }, () => {
    const bottom = Math.random() * 100
    return {
      left: Math.random() * 100,
      bottom,
      size: 3 + Math.random() * 4,
      delay: (bottom / 100) * 0.5 + Math.random() * 0.15,
    }
  })
}

function startQuiz() {
  if (isTransitioning.value) return
  isTransitioning.value = true
  sparkles.value = createSparkles()

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.setTimeout(() => router.push({ name: 'quiz' }), prefersReducedMotion ? 0 : 700)
}
</script>

<template>
  <div class="start">
    <AppHeader />

    <main class="start__content" :class="{ 'start__content--transitioning': isTransitioning }">
      <div class="start__copy">
        <h1 class="start__heading">Take the quiz<br />and try your first pair!</h1>

        <CtaButton class="start__cta" @click="startQuiz">Try On Trial</CtaButton>

        <p class="start__note">30 Days risk free</p>
      </div>

      <div class="start__visual">
        <img class="start__runner" :src="runnerImage" alt="Runner in On apparel mid-stride" />
      </div>

      <div v-if="isTransitioning" class="start__sparkles" aria-hidden="true">
        <span
          v-for="(sparkle, index) in sparkles"
          :key="index"
          class="start__sparkle"
          :style="{
            left: sparkle.left + '%',
            bottom: sparkle.bottom + '%',
            width: sparkle.size + 'px',
            height: sparkle.size + 'px',
            animationDelay: sparkle.delay + 's',
          }"
        />
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
    transition: height 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &--transitioning::after {
    height: 100%;
  }
}

.start__sparkles {
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
}

.start__sparkle {
  position: absolute;
  border-radius: 50%;
  background: $color-white;
  box-shadow: 0 0 6px 2px rgba($color-white, 0.85);
  opacity: 0;
  transform: scale(0);
  animation: start-sparkle-twinkle 1.5s ease-in-out forwards;
}

@keyframes start-sparkle-twinkle {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  45% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.3);
  }
}

.start__copy {
  position: relative;
  z-index: 2;
  max-width: 80%;
  padding: 19% 48px 0;
  @media (min-width: $bp-laptop) {
    width: 62%;
  }
  @media (min-width: $bp-desktop) {
    width: 52%;
  }
}

.start__heading {
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
  @media (min-width: $bp-laptop) {
    width: 32%;
  }
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
