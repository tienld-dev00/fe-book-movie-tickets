import { RouteRecordRaw } from 'vue-router'
import BlankLayout from '@/layout/blankLayout.vue'

const checkoutRouter: Array<RouteRecordRaw> = [
    {
        path: '/checkout',
        component: BlankLayout,
        children: [
            {
                path: '',
                name: 'checkout',
                component: () => import('@/views/user/checkout/index.vue'),
            },
        ],
    },
]

export default checkoutRouter
