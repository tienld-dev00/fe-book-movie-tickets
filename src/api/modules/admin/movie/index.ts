import axios from '@/api/axios'
import { FormSearchMovie, ListMoviesResponse, FormMovieyData } from './types'

const resource = '/admin/movies'
const headers = {
    'Content-Type': 'multipart/form-data',
}

export const movie = {
    list: (params: FormSearchMovie): Promise<ListMoviesResponse> => axios.get(resource, { params }),
    movieDetail: (slug: string): Promise<any> => axios.get(`${resource}/${slug}`),
    create: (data: FormMovieyData): Promise<any> => axios.post(`${resource}/`, data, { headers }),
    update: (data: FormMovieyData, id: number): Promise<any> => axios.post(`${resource}/${id}`, data, { headers }),
    delete: (id: number): Promise<any> => axios.delete(`${resource}/${id}`),
    changeStatus: (id: number): Promise<any> => axios.get(`${resource}/change-status/${id}`)
}

