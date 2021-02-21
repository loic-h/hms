import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import New from '../views/New.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/new',
    name: 'New',
    component: New
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
