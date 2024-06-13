import axios from '@/api/axios'
import { DetailUserResponse, ShowtimeParams, ListUserResponse, FormUserData, UserData } from './types'

const resource = '/movie'

export const movie = {
    movieDetail: (slug: string): Promise<any> => axios.get(`${resource}/${slug}`),
}
