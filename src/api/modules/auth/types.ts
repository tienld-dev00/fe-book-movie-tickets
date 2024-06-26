export interface LoginRequest {
    email: string | undefined
    password: string | undefined
    role: number
}

export interface LoginResponse {
    code: number
    message: string
    access_token: string
    data: UserDetail
}

export interface UserDetail {
    id: number
    role: number
    name: string
    email: string
    avatar: string
    status: number
    phone_number: string
}

export interface RegisterRequest {
    name: string | undefined
    email: string | undefined
    phone_number: string | undefined
    password: string | undefined
    password_confirmation: string | undefined
}

export interface ChangePasswordRequest {
    old_password: string | undefined
    new_password: string | undefined
    new_password_confirmation: string | undefined
}

export interface checkForgotPasswordRequest {
    email: string | undefined
}

export interface ResetPasswordRequest {
    email:string | undefined
    signature :string | undefined
    password: string | undefined
    password_confirmation: string | undefined
}