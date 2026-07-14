import { createRouter, createWebHistory } from 'vue-router'
import StartView from '@/views/StartView.vue'
import QuestionView from '@/views/QuestionView.vue'
import LoadingView from '@/views/LoadingView.vue'
import ResultsView from '@/views/ResultsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: StartView,
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: QuestionView,
    },
    {
      path: '/loading',
      name: 'loading',
      component: LoadingView,
    },
    {
      path: '/results',
      name: 'results',
      component: ResultsView,
    },
  ],
})

export default router
