import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',              // 首页
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/paper/detail',  // 论文详情页
    name: 'PaperDetail',
    component: () => import('../views/PaperDetail.vue')
  },
  {
    path: '/PaperSearchResults',  // 论文搜索结果页
    name: 'PaperSearchResults',
    component: () => import('../views/SearchResults.vue')
  },
  {
    path: '/history',  // 历史记录
    name: 'History',
    component: () => import('../views/History.vue')
  },
  {
    path: '/collect',  // 收藏夹
    name: 'Collect',
    component: () => import('../views/Collect.vue')
  },
  {
    path: '/person',  // 个人主页
    name: 'PersonPage',
    component: () => import('../views/PersonPage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
