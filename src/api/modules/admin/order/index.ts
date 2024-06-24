import axios from '@/api/axios'
import { FormSearchOrder, ListOrderResponse, RefundOrderResponse } from './types'

const resource = 'admin/orders'

export const order = {
    list: (params: FormSearchOrder): Promise<ListOrderResponse> => axios.get(resource, { params }),
    refund: (id: number): Promise<RefundOrderResponse> => axios.post(`${resource}/refund/${id}`),
}
