export interface ProcessPaymentRequest {
    seats: Array<number>
    showtime_id: number
}

export interface ProcessPaymentResponse {
    code: number
    message: string
    data: {
        orderId: number
        clientSecret: string
        customerOptions: {
            customer: string
            ephemeralKey: string
        }
    }
}
