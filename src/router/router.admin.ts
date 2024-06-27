import { RouteRecordRaw } from 'vue-router'
import { checkLogin } from '@/middleware/checkLogin'

const adminRouter: Array<RouteRecordRaw> = [
    {
        path: '/admin',
        name: 'admin',
        component: () => import('@/layout/adminLayout.vue'),
        meta: {
            middleware: [checkLogin],
            isAdmin: true,
        },
        children: [
            {
                path: '',
                name: 'admin_dashboard',
                component: () => import('@/views/admin/index.vue'),
            },
            {
                path: 'user',
                name: 'admin_user',
                component: () => import('@/views/admin/user/index.vue'),
            },
            {
                path: 'category',
                name: 'admin_category',
                component: () => import('@/views/admin/Category/index.vue'),
            },
            {
                path: 'order',
                name: 'admin-order',
                component: () => import('@/views/admin/order/index.vue'),
            },
            {
                path: 'room',
                name: 'admin-room',
                component: () => import('@/views/admin/room/index.vue'),
            },
            {
                path: 'movie',
                name: 'admin-movie',
                component: () => import('@/views/admin/movie/index.vue'),
            },
            {
                path: 'profile',
                name: 'admin_profile',
                component: () => import('@/views/admin/Profile/index.vue')
            }
        ],
    },
]

export default adminRouter
