import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import questionsData from '@/data/questions.json'
import shoesData from '@/data/shoes.json'

// interfaces bring objects into a predefined shape -> better readability, reusability
// exported interfaces are needed/ modified from other components
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
  link: string
}

interface HistoryEntry {
  questionId: number
  answer: Answer
}

const questions = questionsData.questions as Question[]
const shoes = shoesData.shoes as Shoe[]

// initial ratings for all shoes are always 0
function initialRatings(): Record<string, number> {
  return Object.fromEntries(shoes.map((shoe) => [shoe.id, 0]))
}

type Gender = 'male' | 'female'

const GENDER_PATH_SEGMENT: Record<Gender, string> = { male: 'mens', female: 'womens' }
const GENDER_QUESTION_ID = 0

export const useQuizStore = defineStore('quiz', () => {
  const currentQuestionId = ref<number | null>(questions[0]?.id ?? null)
  const ratings = ref<Record<string, number>>(initialRatings())
  const history = ref<HistoryEntry[]>([])
  const gender = ref<Gender | null>(null)

  const currentQuestion = computed(() =>
    questions.find((question) => question.id === currentQuestionId.value),
  )

  const canGoBack = computed(() => history.value.length > 0)

  const rankedShoes = computed<Shoe[]>(() =>
    // creates a shallow copy of the shoe array to protect original array from being reordered
    // but actually .map returns a new array anyway
    [...shoes]
      .map((shoe) => ({
        // copies all shoes props into new object, props listed after overwrite them
        ...shoe,
        rating: ratings.value[shoe.id] ?? 0,
        link: applyGenderToLink(shoe.link),
      }))
      .sort((a, b) => b.rating - a.rating),
  )

  // adapts the shop link according to gender
  function applyGenderToLink(link: string): string {
    if (!gender.value) return link
    return link.replace(/\/(mens|womens)\//, `/${GENDER_PATH_SEGMENT[gender.value]}/`)
  }

  function answer(selected: Answer) {
    if (currentQuestionId.value === null) return

    // set the gender value
    if (currentQuestionId.value === GENDER_QUESTION_ID) {
      gender.value = selected.copy.trim().toLowerCase() === 'female' ? 'female' : 'male'
    }

    // update the shoe ratings depending on the current answer
    // (each answer for each question has a certain rating for all shoes, meaning the ratings of all shoes always change with each answer)
    for (const [shoeId, points] of Object.entries(selected.ratingIncrease)) {
      ratings.value[shoeId] = (ratings.value[shoeId] ?? 0) + points
    }

    // update the answer history array with the current question and chosen answer
    history.value.push({ questionId: currentQuestionId.value, answer: selected })
    // set the currentQuestionId to the next questions id (saved in answers array inside question data)
    currentQuestionId.value = selected.nextQuestion === '' ? null : selected.nextQuestion
  }

  function goToPreviousQuestion() {
    const previous = history.value.pop()
    if (!previous) return

    // undo the shoe ratings score update
    for (const [shoeId, points] of Object.entries(previous.answer.ratingIncrease)) {
      ratings.value[shoeId] = (ratings.value[shoeId] ?? 0) - points
    }

    // if the previous question was the gender question, reset the gender value
    if (previous.questionId === GENDER_QUESTION_ID) {
      gender.value = null
    }

    currentQuestionId.value = previous.questionId
  }

  // for restarting the quiz -> setting everything back to the initial state
  function reset() {
    currentQuestionId.value = questions[0]?.id ?? null
    ratings.value = initialRatings()
    history.value = []
    gender.value = null
  }

  return {
    currentQuestion,
    ratings,
    gender,
    canGoBack,
    rankedShoes,
    answer,
    goToPreviousQuestion,
    reset,
  }
})
