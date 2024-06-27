export interface FromSearchShowtime {
    months?: Array<number>
    years?: Array<number>
    movie_id?: number
    room_id?: number
}

export interface GetListShowtimeResponse {
    code: number
    message: string
    data: Showtime[]
}

export interface CreateShowtimeRequest {
    start_time: string | Date
    end_time: string | Date
    room_id: number
    movie_id: number
    price: number
}

export interface UpdateShowtimeRequest {
    id: number
    start_time: string | Date
    end_time: string | Date
    room_id: number
    movie_id: number
    price: number
}

export interface CreateShowtimeResponse {
    code: number
    message: string
    data: Showtime
}

export interface UpdateShowtimeResponse {
    code: number
    message: string
    data: Showtime
}

export interface DeleteShowtimeResponse {
    code: number
    message: string
}

export interface Showtime {
    id: number
    start_time: Date | string
    end_time: Date | string
    movie_id: number
    movie: string
    movie_image: string
    room_id: number
    total_success_order: number
    room: string
    status: number
    created_at: Date
    updated_at: Date
}
