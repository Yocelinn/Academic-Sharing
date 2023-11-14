import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/person',
    name: 'person',
    component: () => import('../views/PersonPage.vue')
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('../views/History.vue')
  },
  {
    path: '/collect',
    name: 'collect',
    component: () => import('../views/Collect.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
