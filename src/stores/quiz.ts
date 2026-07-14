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

export interface Shoe {
  id: string
  name: string
  rating: number
}

interface HistoryEntry {
  questionId: number
  answer: Answer
}

const questions = questionsData.questions as Question[]
const shoes = shoesData.shoes as Shoe[]

function initialRatings(): Record<string, number> {
  return Object.fromEntries(shoes.map((shoe) => [shoe.id, 0]))
}

export const useQuizStore = defineStore('quiz', () => {
  const currentQuestionId = ref<number | null>(questions[0]?.id ?? null)
  const ratings = ref<Record<string, number>>(initialRatings())
  const history = ref<HistoryEntry[]>([])

  const currentQuestion = computed(() =>
    questions.find((question) => question.id === currentQuestionId.value),
  )

  const canGoBack = computed(() => history.value.length > 0)

  const rankedShoes = computed<Shoe[]>(() =>
    [...shoes]
      .map((shoe) => ({ ...shoe, rating: ratings.value[shoe.id] ?? 0 }))
      .sort((a, b) => b.rating - a.rating),
  )

  function answer(selected: Answer) {
    if (currentQuestionId.value === null) return

    for (const [shoeId, points] of Object.entries(selected.ratingIncrease)) {
      ratings.value[shoeId] = (ratings.value[shoeId] ?? 0) + points
    }

    history.value.push({ questionId: currentQuestionId.value, answer: selected })
    currentQuestionId.value = selected.nextQuestion === '' ? null : selected.nextQuestion
  }

  function goToPreviousQuestion() {
    const previous = history.value.pop()
    if (!previous) return

    for (const [shoeId, points] of Object.entries(previous.answer.ratingIncrease)) {
      ratings.value[shoeId] = (ratings.value[shoeId] ?? 0) - points
    }

    currentQuestionId.value = previous.questionId
  }

  function reset() {
    currentQuestionId.value = questions[0]?.id ?? null
    ratings.value = initialRatings()
    history.value = []
  }

  return { currentQuestion, ratings, canGoBack, rankedShoes, answer, goToPreviousQuestion, reset }
})
