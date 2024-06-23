import { RouteRecordRaw } from 'vue-router'
import { checkLogin } from '@/middleware/checkLogin'

const homeRouter: Array<RouteRecordRaw> = [
    {
        path: '/admin',
        name: 'admin',
        component: () => import('@/layout/adminLayout.vue'),
        meta: {
            middleware: [checkLogin],
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
                path: 'room',
                name: 'admin-room',
                component: () => import('@/views/admin/room/index.vue'),
            },
        ],
    },
]

export default homeRouter
