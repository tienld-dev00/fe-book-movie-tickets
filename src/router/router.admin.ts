import { RouteRecordRaw } from 'vue-router'
// import { checkLogin } from '@/middleware/checkLogin'

const homeRouter: Array<RouteRecordRaw> = [
    {
        path: '/admin',
        component: () => import('@/layout/adminLayout.vue'),
        meta: {
            // middleware: [checkLogin],
        },
        children: [
            {
                path: '',
                name: 'admin-dashboard',
                component: () => import('@/views/admin/index.vue'),
            },
        ],
    },
]

export default homeRouter
