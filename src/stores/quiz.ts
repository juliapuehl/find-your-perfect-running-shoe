import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import questionsData from '@/data/questions.json'
import shoesData from '@/data/shoes.json'

export interface Answer {
  copy: string
  nextQuestion: number | ''
  ratingIncrease: Record<string, number>
}

interface Question {
  id: number
  copy: string
  answers: Answer[]
}

interface Shoe {
  id: string
  name: string
  rating: number
}

const questions = questionsData.questions as Question[]
const shoes = shoesData.shoes as Shoe[]

function initialRatings(): Record<string, number> {
  return Object.fromEntries(shoes.map((shoe) => [shoe.id, 0]))
}

export const useQuizStore = defineStore('quiz', () => {
  const currentQuestionId = ref<number | null>(questions[0]?.id ?? null)
  const ratings = ref<Record<string, number>>(initialRatings())

  const currentQuestion = computed(() =>
    questions.find((question) => question.id === currentQuestionId.value),
  )

  function answer(selected: Answer) {
    for (const [shoeId, points] of Object.entries(selected.ratingIncrease)) {
      ratings.value[shoeId] = (ratings.value[shoeId] ?? 0) + points
    }

    currentQuestionId.value = selected.nextQuestion === '' ? null : selected.nextQuestion
  }

  function reset() {
    currentQuestionId.value = questions[0]?.id ?? null
    ratings.value = initialRatings()
  }

  return { currentQuestion, ratings, answer, reset }
})
