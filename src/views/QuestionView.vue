<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AnswerOption from '@/components/AnswerOption.vue'
import BackButton from '@/components/BackButton.vue'
import { useQuizStore, type Answer } from '@/stores/quiz'

const router = useRouter()
const quiz = useQuizStore()
const transitionName = ref('question-swap')

function selectAnswer(answer: Answer) {
  transitionName.value = 'question-swap'
  quiz.answer(answer)

  if (!quiz.currentQuestion) {
    router.push({ name: 'loading' })
  }
}

function goBack() {
  transitionName.value = 'question-instant'
  quiz.goToPreviousQuestion()
}
</script>

<template>
  <div class="question">
    <AppHeader />

    <main v-if="quiz.currentQuestion" class="question__content">
      <BackButton v-if="quiz.canGoBack" class="question__back" @click="goBack" />

      <p class="question__eyebrow">Try On Quiz<br />30 Days risk free</p>
      <Transition :name="transitionName" mode="out-in">
        <div :key="quiz.currentQuestion.id" class="question__wrapper">
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
      </Transition>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.question {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  overflow: hidden;
  background: $color-bg-dark;
}

.question__content {
  position: relative;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: clamp(16px, 4vh, 48px) 24px;
  gap: clamp(16px, 5vh, 40px);
}

.question__back {
  position: absolute;
  left: 24px;
  top: clamp(12px, 3vh, 24px);
}

.question__eyebrow {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.15em;
  line-height: 1.8;
  text-transform: uppercase;
  color: rgba($color-text-inverse, 0.6);
}

.question__wrapper {
  max-width: 320px;
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 4vh, 32px);

  @media (min-width: $bp-laptop) {
    max-width: 500px;
  }
}

.question__copy {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 5em;
  line-height: 1.25;
  color: $color-text-inverse;
}

.question__answers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
}

.question-swap-enter-active,
.question-swap-leave-active {
  transition:
    opacity 0.28s ease,
    transform 0.28s ease;
}

.question-swap-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.question-swap-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

.question-instant-enter-active,
.question-instant-leave-active {
  transition: none;
}
</style>
