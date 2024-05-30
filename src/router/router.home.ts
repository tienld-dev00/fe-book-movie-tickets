import { RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layout/defaultLayout.vue'
import { checkLogin } from '@/middleware/checkLogin'

const homeRouter: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        redirect: '/',
        component: DefaultLayout,
        meta: {
            // middleware: [checkLogin],
        },
        children: [
            {
                path: '/movie-is-showing',
                name: 'movieIsShowing',
                component: () => import('@/views/movieIsShowing/index.vue'),
            },
            {
                path: '/upcoming-movie',
                name: 'upcomingMovie',
                component: () => import('@/views/upcomingMovie/index.vue'),
            },
            {
                path: '/movie-details',
                name: 'movieDetails',
                component: () => import('@/views/movieDetails/index.vue'),
            },
            {
                path: '/booking',
                name: 'booking',
                component: () => import('@/views/booking/index.vue'),
            },
            {
                path: '/profile',
                name: 'profile',
                component: () => import('@/views/profile/index.vue'),
            },
            {
                path: '/password-change',
                name: 'changePassword',
                component: () => import('@/views/changePassword/index.vue'),
            },
            {
                path: '/transaction-history',
                name: 'transactionHistory',
                component: () => import('@/views/transactionHistory/index.vue'),
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('@/views/user/index.vue'),
            },
        ],
    },
]

export default homeRouter
