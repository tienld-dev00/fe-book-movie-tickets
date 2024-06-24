import axios from '@/api/axios'
import {
    CreateRoomRequest,
    CreateRoomResponse,
    DeleteRoomResponse,
    GetListRoomResponse,
    GetRoomDetailResponse,
    UpdateRoomRequest,
    UpdateRoomResponse,
} from './types'

const resource = 'admin/rooms'

export const room = {
    list: async (params): Promise<GetListRoomResponse> => axios.get(resource, { params }),
    create: (data: CreateRoomRequest): Promise<CreateRoomResponse> => axios.post(resource, data),
    update: (data: UpdateRoomRequest): Promise<UpdateRoomResponse> => axios.put(`${resource}/${data.id}`, data),
    delete: (id: number): Promise<DeleteRoomResponse> => axios.delete(`${resource}/${id}`),
    detail: (id: number): Promise<GetRoomDetailResponse> => axios.get(`${resource}/${id}`),
}
