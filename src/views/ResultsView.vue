<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import ShoeCard from '@/components/ShoeCard.vue'
import ShopButton from '@/components/ShopButton.vue'
import RestartButton from '@/components/RestartButton.vue'
import { useQuizStore } from '@/stores/quiz'
import { getShoeImage } from '@/utils/shoeImages'

const router = useRouter()
const quiz = useQuizStore()

const topMatches = computed(() => quiz.rankedShoes.slice(0, 3))

function restartQuiz() {
  quiz.reset()
  router.push({ name: 'quiz' })
}
</script>

<template>
  <div class="results">
    <AppHeader />

    <main v-if="topMatches[0]" class="results__content">
      <h1 class="results__heading">Congratulations!</h1>
      <p class="results__intro">
        Based on your selection we&rsquo;ve decided on the {{ topMatches[0].name }}! Enjoy the 30
        day trial.
      </p>

      <template v-for="(shoe, index) in topMatches" :key="shoe.id">
        <h2 v-if="index === 1" class="results__subheading">Similar profiles</h2>

        <ShoeCard class="results__card" :name="shoe.name" :image-src="getShoeImage(shoe.id)" />
        <ShopButton class="results__shop" />
      </template>

      <RestartButton class="results__restart" @click="restartQuiz" />
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.results {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: $color-white;
}

.results__content {
  flex: 1;
  padding: 32px 24px 40px;
}

.results__heading {
  font-size: 28px;
  margin-bottom: 12px;
}

.results__intro {
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 24px;
}

.results__subheading {
  font-size: 22px;
  margin: 40px 0 20px;
}

.results__card {
  margin-bottom: 24px;
}

.results__shop {
  display: block;
  width: fit-content;
  margin: 0 auto 40px;
}

.results__restart {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}
</style>
