// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Game from '../views/Game.vue' // Assuming Game.vue is in src/views/

const routes = [
  {
    path: '/',
    name: 'Game',
    component: Game
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
