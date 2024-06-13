import axios from '@/api/axios'
import { LoginRequest, LoginResponse, UserDetail, RegisterRequest } from './types'

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    try {
        return await axios.post('/auth/login', data)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const getUserProfile = async (): Promise<UserDetail> => {
    try {
        const { data: response } = await axios.get('/auth/profile')

        return response
    } catch (error) {
        return Promise.reject(error)
    }
}

export const logout = async () : Promise<void> => {
    try {
        await axios.post('/auth/logout')
    } catch (error) {
        return Promise.reject(error)
    }
}

export const register = async (data: RegisterRequest): Promise<void> => {
    try {
        return await axios.post('/auth/register', data)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const getGoogleSignInUrl = async (): Promise<{ url: string }> => {
    try {
        const response = await axios.get('/google');
        return response.url;
    } catch (error) {
        console.error('Error during Google login:', error);
        return Promise.reject(error);
    }
};
