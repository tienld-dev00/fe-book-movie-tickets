import { LinksResponse, MetaResponse } from '@/types'

export interface ShowtimeParams {
    movie_id: number
    date: string
}

export interface ListUserResponse {
    data: UserData[]
}

export interface UserData {
    id: number
    name?: string
    email?: string
    avatar?: string
    role: number
    status: number
}

export interface FormUserData {
    id: number
    avatar?: string
    name?: string
    role: number
    email?: string
    password?: boolean | string
    status: number
}

export interface DetailAccountStaffResponse {
    code: number
    message: string
    data: FormUserData
}

export interface GetShowtimeDetailResponse {
    code: number
    message: string
    data: Showtime
}

export interface Showtime {
    id: number
    start_time: Date
    end_time: Date
    price: number
    movie: Movie
    room: string
    created_at: Date
    updated_at: Date
    seats: Seat[]
}

export interface Movie {
    id: number
    name: string
    release_date: Date
    category_id: number
    age_limit: number
    duration: number
    description: string
    status: number
    image: string
    trailer: string
    slug: string
    created_at: null
    updated_at: null
    deleted_at: null
}

export interface Seat {
    id: number
    name: string
}
