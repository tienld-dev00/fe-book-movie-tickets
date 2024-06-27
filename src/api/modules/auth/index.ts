import axios from '@/api/axios'
import {
    LoginRequest,
    LoginResponse,
    UserDetail,
    RegisterRequest,
    ChangePasswordRequest,
    checkForgotPasswordRequest,
    ResetPasswordRequest
} from './types'

const headers = {
    'Content-Type': 'multipart/form-data',
};

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

export const logout = async (): Promise<void> => {
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
}

export const googleLoginCallback = async (code: string): Promise<any> => {
    try {
        const response = await axios.get(`/google/callback?code=${code}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}


export const updateProfile = async (data: FormData): Promise<UserDetail> => {
    try {
        const response = await axios.post('/auth/update', data, { headers });
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const changePassword = async (data: ChangePasswordRequest): Promise<void> => {
    try {
        const response = await axios.post('/auth/change-password', data);
        return response.data;
    } catch (error) {
        return Promise.reject(error)
    }
};

export const checkForgotPassword = async (data: checkForgotPasswordRequest): Promise<void> => {
    try {
        await axios.post('/auth/check-forgot-password', data);
    } catch (error) {
        return Promise.reject(error)
    }
};

export const ResetPassword = async (params: ResetPasswordRequest): Promise<void> => {
    try {
        const { email, signature, ...rest } = params;
        await axios.post(`/auth/resetPassword?email=${email}&signature=${signature}`, rest);
    } catch (error) {
        return Promise.reject(error)
    }
};

export const resendActivationEmail = async (email: string): Promise<void> => {
    try {
        await axios.post('/auth/resend-activation-email', { email });
    } catch (error) {
        return Promise.reject(error);
    }
};

export const verifyEmail = async (params): Promise<void> => {
    try {
        const response = await axios.get('/auth/verify-email', { params });
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
};