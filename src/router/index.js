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
    component: () => import('../Person/PersonPage.vue')
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('../Person/History.vue')
  },
  {
    path: '/collect',
    name: 'collect',
    component: () => import('../Person/Collect.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('../Person/Mine.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../Person/test.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
