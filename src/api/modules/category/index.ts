import axios from '@/api/axios'
import { DetailCategoryResponse ,FormSearchCategory, FormCategoryData, CategoryData } from './types'

const resource = '/admin/categories'
const headers = {
    'Content-Type': 'multipart/form-data',
}

export const category = {
    list: async (params: FormSearchCategory): Promise<CategoryData> => {
        const { data: response } = await axios.get(`${resource}/index`, { params })
        return response
    },
    detail: (id: number): Promise<any> => axios.get(`${resource}/show/${id}`),
    create: (data: FormCategoryData): Promise<DetailCategoryResponse> => axios.post(`${resource}/create/`, data, { headers }),
    update: async (formData: FormCategoryData, id: number): Promise<any> => {
        return await axios.post(`${resource}/update/${id}`, formData, { headers})
    },
}
