import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AIChatPage from '../views/AIChatPage.vue'
import XRPage from '../views/XRPage.vue'
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
    },
    {
      path: '/xr-experience',
      name: 'xr-experience',
      component: XRPage
    }
  ]
})

export default router
