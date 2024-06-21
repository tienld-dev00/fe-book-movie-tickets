import axios from '@/api/axios'
import { ShowtimeParams, GetShowtimeDetailResponse } from './types'

const resource = '/showtime'

export const showtime = {
    getShowtimeByDate: async (params: ShowtimeParams): Promise<any> => {
        const { data: response } = await axios.get(`${resource}/`, { params })
        return response
    },
    getShowDate: (movie_id: number): Promise<any> => axios.get(`${resource}/dates/${movie_id}`),
    showtimeDetail: (showtime_id: number): Promise<GetShowtimeDetailResponse> =>
        axios.get(`${resource}/${showtime_id}`),
}
