import axios from '@/api/axios'
import { DetailUserResponse, ShowtimeParams, ListUserResponse, FormUserData, UserData } from './types'

const resource = '/showtime'

export const showtime = {
    getShowtimeByDate: async (params: ShowtimeParams): Promise<any> => {
        const { data: response } = await axios.get(`${resource}/`, { params });
        return response;
    },
    getShowDate: (movie_id: number): Promise<any> => axios.get(`${resource}/dates/${movie_id}`),
    showtimeDetail: (showtime_id: number): Promise<any> => axios.get(`${resource}/${showtime_id}`),
    // create: (data: FormUserData): Promise<DetailUserResponse> => axios.post(`${resource}`, data, { headers }),
    // update: async (formData: FormUserData, id: number): Promise<any> => {
    //     return await axios.post(`${resource}/update/${id}`, formData, { headers})
    // },
}
