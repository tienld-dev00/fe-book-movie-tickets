export interface FormSearchRoom {
    keyword?: string
    page?: number
    page_size?: number
}

export interface GetListRoomResponse {
    code: number
    message: string
    data: Room[]
    meta: Meta
}

export interface CreateRoomRequest {
    name: string
    row_number: number
    column_number: number
    seats: Seat[]
}

export interface CreateRoomResponse {
    code: number
    message: string
    data: RoomDetail
}

export interface UpdateRoomResponse {
    code: number
    message: string
    data: RoomDetail
}

export interface UpdateRoomRequest extends RoomDetail {}

export interface DeleteRoomResponse {
    code: number
    message: string
}

export interface GetRoomDetailResponse {
    code: number
    message: string
    data: RoomDetail
}

export interface Room {
    id: number
    name: string
    row_number: number
    column_number: number
}

export interface RoomDetail extends Room {
    seats: Seat[]
}

export interface Seat {
    name: string
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
