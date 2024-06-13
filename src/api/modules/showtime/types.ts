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
