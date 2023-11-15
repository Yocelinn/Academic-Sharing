import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NetView from '../components/Net.vue'

const routes = [
  {
    path: '/',
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
    path:'/author',
    name: 'author',
    component: HomeView
  },
  {
    path: '/searchResults',
    name: 'searchResults',
    component: () => import(/* webpackChunkName: "about" */ '../views/SearchResults.vue')
  },
  {
    path: '/paper/detail',  // 论文详情页
    name: 'PaperDetail',
    component: () => import('../views/PaperDetail.vue')
  },
  {
    path: '/PaperSearchResults',  // 论文搜索结果页
    name: 'PaperSearchResults',
    component: () => import('../components/SearchResults/PaperResults.vue')
  },
  {
    path: '/net',  // 专家关系网络组件,只是一个组件
    name: 'paperDetail',
    component: () => import('../components/Net.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
