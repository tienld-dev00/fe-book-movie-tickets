import { Module } from 'vuex'
import { USER_ROLE } from '@/constants/user'
import { RootState } from '@/store'
import { AuthState } from '@/types'
import { getUserProfile, login, logout, register, getGoogleSignInUrl, googleLoginCallback } from '@/api/modules/auth'
import { UserDetail } from '@/api/modules/auth/types'
import router from '@/router/index'

const authModule: Module<AuthState, RootState> = {
    namespaced: true,
    state: {
        access_token: null,
        user: null,
        role: null,
    },
    mutations: {
        setAccessToken(state, accessToken: string) {
            state.access_token = accessToken
            localStorage.setItem('access_token', accessToken)
        },
        setUserProfile(state, user) {
            state.user = user
        },
        logout(state) {
            state.access_token = null
            state.user = null
            state.role = null
            localStorage.removeItem('access_token')
        },

        setUserRole(state, role) {
            state.role = role;
        },
    },
    actions: {
        async login({ commit }, credentials) {
            try {
                const res = await login(credentials)

                commit('setAccessToken', res.access_token)
                commit('setUserRole', res.role)
                commit('setUserProfile', res.data)

                const userRole = res.role;
                console.log("🚀 ~ login ~ userRole:", userRole)

                if (userRole === USER_ROLE.ADMIN) {
                    router.push({ name: 'admin_dashboard' })
                } else if (userRole === 1) {
                    router.push({ name: 'home' })
                } else {
                    throw new Error("Invalid user role")
                }

                return res
            } catch (error) {
                if (error?.data?.code === 409) {
                    router.push({
                        name: 'verify_account',
                        query: { email: credentials.email }
                    })
                }
                return Promise.reject(error)
            }
        },
        async profile({ commit }) {
            try {
                const profile: UserDetail = await getUserProfile()
                commit('setUserProfile', profile)
                commit('setUserRole', profile.role);
                console.log("🚀 ~ profile ~ profile.role:", profile.role)

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
        userRole(state) {
            return state.role
        },
    },
}

export default authModule
