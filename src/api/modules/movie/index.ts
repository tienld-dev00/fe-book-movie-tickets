import axios from '@/api/axios'
import { FormSearchMovie, ListMoviesResponse, FormMovieyData } from './types'

const resource = '/movies'

export const movie = {
    movieDetail: (slug: string): Promise<any> => axios.get(`${resource}/${slug}`),
}

