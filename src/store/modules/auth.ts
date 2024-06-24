import { Module } from 'vuex'

import { RootState } from '@/store'
import { AuthState } from '@/types'
import { getUserProfile, login, logout, register, getGoogleSignInUrl, googleLoginCallback} from '@/api/modules/auth'
import { UserDetail } from '@/api/modules/auth/types'
import router from '@/router/index'

const authModule: Module<AuthState, RootState> = {
    namespaced: true,
    state: {
        access_token: null,
        user: null,
    },
    mutations: {
        setAccessToken(state, accessToken: string){
            state.access_token = accessToken
            localStorage.setItem('access_token', accessToken)
        },
        setUserProfile(state, user) {
            state.user = user
        },
        logout(state) {
            state.access_token = null
            state.user = null
            localStorage.removeItem('access_token')
        },
    },
    actions: {
        async login({ commit }, credentials) {
            try {
                const res = await login(credentials)

                commit('setAccessToken', res.access_token)
                commit('setUserProfile', res.data)
                
                return res
            } catch (error) {
                if (error?.data?.code === 409){
                    router.push({ 
                        name: 'verify_account',
                        query: { email: credentials.email }
                     })
                }
                return Promise.reject(error)
            }
        },
        async profile({ commit, getters }, payload) {
            try {
                if (getters.currentUser && (!payload?.force || payload.force === false)) {
                    return getters.currentUser
                }

                const profile: UserDetail = await getUserProfile()
                commit('setUserProfile', profile)

                return profile
            } catch (error) {
                return Promise.reject(error)
            }
        },
        async setProfile({ commit }) {
            try {
                const profile: UserDetail = await getUserProfile()

                commit('setUserProfile', profile)
            } catch (error) {
                return Promise.reject(error)
            }
        },
        async logout({ commit }) {
            try {
                await logout()
                commit('logout')
            } catch (error) {
                return Promise.reject(error)
            }
        },
        async register({ commit }, credentials) {
            try {
                await register(credentials)
            } catch (error) {
                return Promise.reject(error)
            }
        },
        async googleSignInUrl() {
            try {
                const url = await getGoogleSignInUrl();
                window.location.href = url;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async googleLoginCallback({ commit }, code: string) {
            try {
                const response = await googleLoginCallback(code);
                commit('setAccessToken', response.access_token);
                await this.dispatch('auth/setProfile');
                return response;
            } catch (error) {
                console.error('Error during Google login callback:', error);
                return Promise.reject(error);
            }
        },
    },
    getters: {
        isLoggedIn(state) {
            if (localStorage.getItem('access_token')) return true;
            if (state.access_token) return true;

            return false
        },
        currentUser(state) {
            return state.user
        },
    },
}

export default authModule
