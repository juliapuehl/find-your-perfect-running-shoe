<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AnswerOption from '@/components/AnswerOption.vue'
import { useQuizStore, type Answer } from '@/stores/quiz'

const router = useRouter()
const quiz = useQuizStore()

function selectAnswer(answer: Answer) {
  quiz.answer(answer)

  if (!quiz.currentQuestion) {
    router.push({ name: 'loading' })
  }
}
</script>

<template>
  <div class="question">
    <AppHeader />

    <main v-if="quiz.currentQuestion" class="question__content">
      <p class="question__eyebrow">Try On Quiz<br />30 Days risk free</p>
      <div class="question__wrapper">
        <h1 class="question__copy">{{ quiz.currentQuestion.copy }}</h1>

        <div class="question__answers">
          <AnswerOption
            v-for="(answer, index) in quiz.currentQuestion.answers"
            :key="index"
            :label="answer.copy"
            @click="selectAnswer(answer)"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.question {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: $color-bg-dark;
}

.question__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 15% 24px 0;
}

.question__eyebrow {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.15em;
  line-height: 1.8;
  text-transform: uppercase;
  color: rgba($color-text-inverse, 0.6);
  margin-bottom: 22%;
}

.question__wrapper {
  height: 300px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.question__copy {
  font-size: clamp(26px, 6vw, 34px);
  line-height: 1.25;
  color: $color-text-inverse;
}

.question__answers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
}
</style>
