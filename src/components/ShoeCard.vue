<script setup lang="ts">
defineProps<{ name: string; imageSrc: string }>()
</script>

<template>
  <article class="shoe-card">
    <img class="shoe-card__image" :src="imageSrc" :alt="name" />

    <div class="shoe-card__body">
      <h3 class="shoe-card__name">{{ name }}</h3>
      <p class="shoe-card__description">
        Your perfect partner in the world&rsquo;s lightest fully-cushioned shoe for Running
        Remixed.
      </p>
      <p class="shoe-card__meta">200 CHF&ensp;|&ensp;Neon &amp; Grey</p>

      <div class="shoe-card__swatches">
        <span class="shoe-card__swatch shoe-card__swatch--cream" />
        <span class="shoe-card__swatch shoe-card__swatch--orange" />
        <span class="shoe-card__swatch shoe-card__swatch--blue" />
        <span class="shoe-card__swatch shoe-card__swatch--black" />
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

$swatch-cream: #ded9c4;
$swatch-orange: #c1613a;
$swatch-blue: #2f4a5c;
$swatch-black: $color-black;

.shoe-card {
  background: $color-bg-light;
  text-align: left;
}

.shoe-card__image {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: contain;
  padding: 24px;
}

.shoe-card__body {
  padding: 0 20px 28px;
}

.shoe-card__name {
  font-size: 20px;
  margin-bottom: 10px;
}

.shoe-card__description {
  font-size: 14px;
  line-height: 1.5;
  color: $color-text-muted;
  margin-bottom: 14px;
}

.shoe-card__meta {
  font-size: 14px;
  margin-bottom: 14px;
}

.shoe-card__swatches {
  display: flex;
  gap: 8px;
}

.shoe-card__swatch {
  width: 16px;
  height: 16px;
  border: 1px solid $color-border;

  &--cream {
    background: $swatch-cream;
  }

  &--orange {
    background: $swatch-orange;
  }

  &--blue {
    background: $swatch-blue;
  }

  &--black {
    background: $swatch-black;
  }
}
</style>
