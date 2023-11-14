import { createRouter, createWebHistory } from 'vue-router'

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/findDoorPage.vue')
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
