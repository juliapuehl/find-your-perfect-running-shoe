<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AnswerOption from '@/components/AnswerOption.vue'
import { useQuizStore, type Answer } from '@/stores/quiz'

const quiz = useQuizStore()

function selectAnswer(answer: Answer) {
  quiz.answer(answer)
}
</script>

<template>
  <div class="question">
    <AppHeader />

    <main class="question__content">
      <p class="question__eyebrow">Try On Quiz<br />30 Days risk free</p>

      <template v-if="quiz.currentQuestion">
        <h1 class="question__copy">{{ quiz.currentQuestion.copy }}</h1>

        <div class="question__answers">
          <AnswerOption
            v-for="(answer, index) in quiz.currentQuestion.answers"
            :key="index"
            :label="answer.copy"
            @click="selectAnswer(answer)"
          />
        </div>
      </template>

      <h1 v-else class="question__copy">Thanks! Finding your shoes&hellip;</h1>
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

.question__copy {
  font-size: clamp(26px, 6vw, 34px);
  line-height: 1.25;
  color: $color-text-inverse;
  max-width: 420px;
  margin-bottom: 15%;
}

.question__answers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
  max-width: 420px;
}
</style>
