import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AIChatPage from '../views/AIChatPage.vue'
1
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/ai-chat',
      name: 'ai-chat',
      component: AIChatPage
    }
  ]
})

export default router
