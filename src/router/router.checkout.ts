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
                component: () => import('@/views/checkout/index.vue'),
            },
        ],
    },
    {
        path: '/create-order-example',
        component: () => import('@/views/create-order-example/index.vue'),
    },
]

export default checkoutRouter
