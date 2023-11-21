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
    component: () => import('../views/SearchResults.vue')
  },
  {
    path: '/paper/detail',  // 论文详情页
    name: 'PaperDetail',
    component: () => import('../views/PaperDetail.vue')
  },
  {
    path: '/PaperSearchResults',  // 论文搜索结果页
    name: 'PaperSearchResults',
    component: () => import('../components/SearchResults/PaperResult.vue')
  },
  {
    path: '/net',  // 专家关系网络组件,只是一个组件
    name: 'paperDetail',
    component: () => import('../components/Net.vue')
  },
  {
    path: '/manage',
    redirect: '/manage/welcome',
    name: 'ManageView',
    component: () => import('../views/ManageView.vue'),
    children: [
      {
        path: '/manage/welcome', 
        component: () => import('../components/manage/Welcome.vue')
      },
      {
        path: '/manage/scholar', 
        component: () => import('../components/manage/Scholar.vue')
      },
      {
        path: '/manage/comments', 
        component: () => import('../components/manage/Comments.vue')
      },
      {
        path: '/manage/paper', 
        component: () => import('../components/manage/Paper.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
