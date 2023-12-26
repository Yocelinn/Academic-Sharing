import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store';
import { match } from 'path-to-regexp';
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
    path: '/searchResults',
    name: 'searchResults',
    component: () => import('../views/SearchResults.vue'),
    // props: (route) => ({ query: route.query.query }),
  },
  {
    path: '/paper/detail/:workId?',  // 论文详情页
    name: 'PaperDetail',
    component: () => import('../views/details/PaperDetail.vue')
  },
  {
    path: '/patent/detail/:patentId?',  // 专利详情页
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
    name: 'institution',
    component: () => import("../views/InstitutionView.vue")
  },
  {
    path: '/PersonalDoorPage/',
    name: 'PersonalDoorPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/PersonalDoorPage.vue')
    }
  },
  {
    path: '/program/detail/:funderId?',  // 项目详情页
    name: 'ProgramDetail',
    component: () => import('../views/details/ProgramDetail.vue')
  },
  {
    path:'/allInstitution',//全部机构展示页
    name:'allInstitution',
    component: () => import('../views/AllInstitutionDisplay.vue')
  },
  { 
    path: '/collectPaper',
    name: 'collectPaper',
    component: () => import('../views/CollectPaper.vue')
  },
  {
    path: '/collectPatent',
    name: 'collectPatent',
    component: () => import('../views/CollectPatent.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
const whiteList = ['/', '/searchResults', '/allInstitution','/institution']
const excludedRoute = '/paper/detail/:workId?';
const excludedRoute2 = '/patent/detail/:patentId?';
const excludedRoute3 = '/program/detail/:funderId?';
const excludedRoute4 = '/manage'
router.beforeEach((to, from, next) => {
  if(to.path==="/"){
    store.commit('isHome', true);
  } else{
    store.commit('isHome', false);
  }
  const isExcluded = match(excludedRoute)(to.path);
  const isExcluded2 = match(excludedRoute2)(to.path);
  const isExcluded3 = match(excludedRoute3)(to.path);
  const isExcluded4 = match(excludedRoute4)(to.path)
  if (whiteList.indexOf(to.path) !== -1) {
    // 放行，进入下一个路由
    next()
  }
  else if(isExcluded)
  {
    next()
  } 
  else if(isExcluded2)
  {
    next()
  }
  else if(isExcluded3)
  {
    next()
  }
  else if (store.state.userInfo.isLogin==false&&store.state.administratorInfo.isLogin==false){
    next('/');
  }
  else if(store.state.userInfo.isLogin==true&&isExcluded4){
    next('/')
  } 
  else if(store.state.administratorInfo.isLogin==true&&!isExcluded4){
    next('/')
  }
  else {
    next()
  }
})
export default router