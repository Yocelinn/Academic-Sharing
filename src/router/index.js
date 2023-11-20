import { createRouter, createWebHistory } from 'vue-router'
import NetView from '../components/Net.vue'

const routes = [
  {
    path: '/testForSearchBox',
    name: 'testForSearchBox',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/testForSearchBox.vue')
  },
  {
    path: '/seniorSearchPage',
    name: 'seniorSearchPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/seniorSearchPage.vue')
  },
  {
    path: '/findDoor',
    name: 'findDoor',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/findDoorPage.vue')
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
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
