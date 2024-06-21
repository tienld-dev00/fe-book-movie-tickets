import axios from '@/api/axios'
import { CreateOrderRequest, CreateOrderResponse, GetOrderDetailResponse } from './types'

const resource = '/orders'

export const order = {
    detail: (id: number): Promise<GetOrderDetailResponse> => axios.get(`${resource}/${id}`),
}
