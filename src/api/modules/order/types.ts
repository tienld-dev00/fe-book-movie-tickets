export interface CreateOrderRequest {
    order_id: number
    seats: Array<number>
    showtime_id: number
}
export interface CreateOrderResponse {
    code: number
    message: string
    data: Order
}

export interface GetOrderDetailResponse {
    code: number
    message: string
    data: Order
}

export interface Order {
    id: number
    payment_method: number
    status: number
    user_id: number
    showtime_id: number
    amount: number
    tickets: Ticket[]
    created_at: Date
    updated_at: Date
}

export interface Ticket {
    id: number
    price: string
    order_id: number
    seat_id: number
    created_at: Date
    updated_at: Date
}
