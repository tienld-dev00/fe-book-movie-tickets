import axios from '@/api/axios'
import { DetailUserResponse, FormSearchUser, ListUserResponse, FormUserData, UserData } from './types'

const resource = '/admin/users'
const headers = {
    'Content-Type': 'multipart/form-data',
}

export const user = {
    list: async (params: FormSearchUser): Promise<UserData> => {
        const { data: response } = await axios.get(`${resource}/index`, { params })
        return response
    },
    detail: (id: number): Promise<any> => axios.get(`${resource}/show/${id}`),
    create: (data: FormUserData): Promise<DetailUserResponse> => axios.post(`${resource}`, data, { headers }),
    update: async (formData: FormUserData, id: number): Promise<any> => {
        return await axios.post(`${resource}/update/${id}`, formData, { headers})
    },
}
