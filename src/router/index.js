import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',              // 首页
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  },
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
  {
    path: '/searchResults',
    name: 'searchResults',
    component: () => import('../views/SearchResults.vue')
  },
  {
    path: '/paper/detail',  // 论文详情页
    name: 'PaperDetail',
    component: () => import('../views/details/PaperDetail.vue')
  },
  {
    path: '/patent/detail',  // 专利详情页
    name: 'PatentDetail',
    component: () => import('../views/details/PatentDetail.vue')
  },
  {
    path: '/history',  // 历史记录
    name: 'History',
    component: () => import('../views/History.vue')
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
  },
  // {
  //   path: '/net',  // 专家关系网络组件,只是一个组件
  //   name: 'paperDetail',
  //   component: () => import('../components/Net.vue')
  // },
  {
    path: '/institution',
    component: () => import("../views/InstitutionView.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
