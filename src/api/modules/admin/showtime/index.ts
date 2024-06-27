import axios from '@/api/axios'
import {
    CreateShowtimeRequest,
    CreateShowtimeResponse,
    DeleteShowtimeResponse,
    FromSearchShowtime,
    GetListShowtimeResponse,
    UpdateShowtimeRequest,
    UpdateShowtimeResponse,
} from './types'

const resource = '/admin/showtimes'

export const showtime = {
    list: (params: FromSearchShowtime): Promise<GetListShowtimeResponse> => axios.get(resource, { params }),
    create: (data: CreateShowtimeRequest): Promise<CreateShowtimeResponse> => axios.post(resource, data),
    update: (data: UpdateShowtimeRequest): Promise<UpdateShowtimeResponse> => axios.put(`${resource}/${data.id}`, data),
    delete: (id: number): Promise<DeleteShowtimeResponse> => axios.delete(`${resource}/${id}`),
}
