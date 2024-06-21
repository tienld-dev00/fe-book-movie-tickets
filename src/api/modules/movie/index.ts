import axios from '@/api/axios'
import { FormSearchMovie, ListMoviesResponse } from './types'

const resource = '/movie'

export const movie = {
    list: (params: FormSearchMovie): Promise<ListMoviesResponse> => axios.get(resource, { params }),
    movieDetail: (slug: string): Promise<any> => axios.get(`${resource}/${slug}`),
}

