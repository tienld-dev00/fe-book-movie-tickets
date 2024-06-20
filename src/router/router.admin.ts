import { RouteRecordRaw } from 'vue-router'
// import { checkLogin } from '@/middleware/checkLogin'

const adminRouter: Array<RouteRecordRaw> = [
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
            {
                path: 'order',
                name: 'admin-order',
                component: () => import('@/views/admin/order/index.vue'),
            },
        ],
    },
]

export default adminRouter
