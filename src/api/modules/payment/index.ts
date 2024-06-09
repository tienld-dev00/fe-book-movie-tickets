import axios from '@/api/axios'
import { ProcessPaymentRequest, ProcessPaymentResponse } from './types'

export const stripePaymentIntent = {
    processPayment: (data: ProcessPaymentRequest): Promise<ProcessPaymentResponse> =>
        axios.post('/stripe/process-payment', data),
}
