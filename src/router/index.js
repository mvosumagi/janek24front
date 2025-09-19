import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/home',
    name: 'homeRoute',
    component: HomeView
  },

  {
    path: '/error',
    name: 'errorRoute',
    component: ErrorView
  },
  {
    path: '/service',
    name: 'serviceRoute',
    component: ServiceView
  },
  {
    path: '/login',
    name: 'loginRoute',
    component: LoginView
  },
  {
    path: '/user',
    name: 'userRoute',
    component: UserView
  },
  {
    path: '/myorders',
    name: 'myOrdersRoute',
    component: MyOrdersView
  },

  {
    path: '/myservices',
    name: 'myServicesRoute',
    component: MyServicesView
  },





  {
    path: '/not-authorized',
    name: 'notAuthorizedRoute',
    component: NotAuthorizedView
  },



  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
