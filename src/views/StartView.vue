<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import runnerImage from '@/assets/Background Image Start Screen.png'
</script>

<template>
  <div class="start">
    <AppHeader />

    <main class="start__content">
      <div class="start__copy">
        <h1 class="start__heading">Take the quiz<br />and try your first pair!</h1>

        <button class="start__cta" type="button">Try On Trial</button>

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
  max-width: 640px;
  padding: 19% 48px 0;
}

.start__heading {
  font-family: $font-serif;
  font-weight: 400;
  font-size: clamp(28px, 7vw, 38px);
  line-height: 1.15;
  color: $color-text;
  margin-bottom: 28px;
}

.start__cta {
  position: relative;
  display: inline-block;
  background: $color-black;
  color: $color-white;
  font-family: $font-sans;
  font-size: 24px;
  letter-spacing: 0.02em;
  padding: 18px 40px;
  margin-bottom: 24px;
  box-shadow: 0 6px 0 0 #55534e;
  transition: transform 0.15s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 3px 0 0 #55534e;
  }
}

.start__note {
  font-family: $font-sans;
  font-size: 14px;
  color: $color-text-muted;
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
