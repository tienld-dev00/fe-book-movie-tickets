import { RouteRecordRaw } from 'vue-router'
import { checkLogin } from '@/middleware/checkLogin'

const authRouter: Array<RouteRecordRaw> = [
    {
        path: '/auth/login',
        name: 'login',
        meta: {
            middleware: [checkLogin],
        },
        component: () => import('@/views/auth/login/index.vue'),
    },
    {
        path: '/page-error',
        name: 'page_error',
        component: () => import('@/views/user/page-error/index.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/page-error',
    },
    {
        path: '/google/callback',
        name: 'google_callback',
        component: () => import('@/views/auth/GoogleCallback/index.vue'),
    },
    {
        path: '/verify-account',
        name: 'verify_account',
        component: () => import('@/views/auth/VerifyAccount/index.vue'),
    },
    {
        path: '/forgot-password',
        name: 'forgot_password',
        component: () => import('@/views/auth/forgotPassword/index.vue'),
    },
    {
        path: '/reset-password',
        name: 'reset_password',
        component: () => import('@/views/auth/ResetPassword/index.vue'),
    },
    {
        path: '/confirmed-account',
        name: 'confirmed_account',
        component: () => import('@/views/auth/ConfirmedAccount/index.vue'),
    },
]

export default authRouter
