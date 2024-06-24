export interface FormSearchOrder {
    keyword?: string
    page?: number
    page_size?: number
}

export interface ListOrderResponse {
    code: number
    message: string
    data: Order[]
    meta: Meta
}

export interface RefundOrderResponse {
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
    transaction_id: string
    user: any
    showtime: any
    payments: any
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
    seat: Seat
    created_at: Date
    updated_at: Date
}

export interface Seat {
    id: number
    name: string
    room_id: number
    created_at: Date
    updated_at: Date
    deleted_at: null | Date
}
export enum OrderStatus {
    PAYMENT_SUCCEEDED = 2,
    PAYMENT_FAILED = 3,
    REFUNDED = 4,
}

export enum PaymentMethod {
    STRIPE = 1,
}

export interface Meta {
    current_page: number
    from: number
    last_page: number
    path: string
    per_page: number
    to: number
    total: number
}
