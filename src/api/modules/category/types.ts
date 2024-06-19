
export interface FormSearchCategory {
    valueSearch: string
}

export interface ListCategoryResponse {
    data: CategoryData[]
}

export interface CategoryData {
    id: number
    name?: string
}

export interface FormCategoryData {
    name?: string
}

export interface DetailCategoryResponse {
    code: number
    message: string
    data: FormCategoryData
}
