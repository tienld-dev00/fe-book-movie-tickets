import { RouteRecordRaw } from 'vue-router'
import BlankLayout from '@/layout/blankLayout.vue'

const checkoutRouter: Array<RouteRecordRaw> = [
    {
        path: '/payment',
        name: 'payment',
        redirect: '/',
        component: BlankLayout,
        children: [
            {
                path: 'result',
                name: 'payment-result',
                component: () => import('@/views/user/payment-result/index.vue'),
            },
        ],
    },
]

export default checkoutRouter
