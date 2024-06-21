export interface FormSearchMovie {
    per_page?: number
    page?: number
    key_word?: string
    sort_field?: string
    sort_direction?: string
}

export interface ListMoviesResponse {
    code: number
    message: string
    data: { data: Movie[], meta: Meta }
}

export interface Movie {
    id: number
    name: string
    release_date: Date
    category: string
    age_limit: number
    duration: number
    description: string
    image: string
    trailer: string
    slug: string
    created_at: Date
    updated_at: Date
    total_orders: Date
}
export interface Meta {
    current_page: number
    from: number
    last_page: number
    path: string
    per_page: number
    to: number
    total: number
}