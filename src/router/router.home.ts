import { RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layout/defaultLayout.vue'
// import { checkLogin } from '@/middleware/checkLogin'

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
                path: '/',
                name: 'movieIsShowing',
                component: () => import('@/views/user/movieIsShowing/index.vue'),
            },
            {
                path: '/upcoming-movie',
                name: 'upcomingMovie',
                component: () => import('@/views/user/upcomingMovie/index.vue'),
            },
            {
                path: '/movie-details',
                name: 'movieDetails',
                component: () => import('@/views/user/movieDetails/index.vue'),
            },
            {
                path: '/booking',
                name: 'booking',
                component: () => import('@/views/user/booking/index.vue'),
            },
            {
                path: '/profile/:id',
                name: 'profile',
                component: () => import('@/views/user/profile/index.vue'),
            },
            {
                path: '/password-change',
                name: 'changePassword',
                component: () => import('@/views/user/changePassword/index.vue'),
            },
            {
                path: '/transaction-history',
                name: 'transactionHistory',
                component: () => import('@/views/user/transactionHistory/index.vue'),
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
