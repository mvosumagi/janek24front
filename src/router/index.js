import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ErrorView from '@/views/ErrorView.vue'
import AddServiceView from '@/views/AddServiceView.vue'
import UserView from '@/views/UserView.vue'
import LoginView from '@/views/LoginView.vue'
import MyOrdersView from '@/views/MyOrdersView.vue'
import MyServicesView from '@/views/MyServicesView.vue'
import NotAuthorizedView from '@/views/NotAuthorizedView.vue'
import SearchView from '@/views/SearchView.vue'
import OrderingView from '@/views/OrderingView.vue'

const routes = [
    {
        path: '/home',
        name: 'homeRoute',
        component: HomeView
    },
    {
        path: '/inbox',
        name: 'inboxRoute',
        component: () => import('@/views/InboxView.vue')
    },
    {
        path: '/inbox-legacy',
        name: 'Inbox',
        redirect: {name: 'inboxRoute'}
    },
    {
        path: '/email',
        redirect: '/inbox'
    },
    {
        path: '/error',
        name: 'errorRoute',
        component: ErrorView
    },
    {
        path: '/service',
        name: 'serviceRoute',
        component: AddServiceView
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
        path: '/search',
        name: 'searchRoute',
        component: SearchView
    },
    {
        // path: '/my-orders/:customerId',
        path: '/my-orders',
        name: 'myOrdersRoute',
        component: MyOrdersView,
        props: true
    },
    {
        // path: '/my-services/:customerId',
        path: '/my-services',
        name: 'myServicesRoute',
        component: MyServicesView,
        props: true
    },
    {
        path: '/not-authorized',
        name: 'notAuthorizedRoute',
        component: NotAuthorizedView
    },
    {
        path: '/order/:serviceId',
        name: 'OrderingView',
        component: OrderingView
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/AboutView.vue')
    },
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/error'
    }
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router
