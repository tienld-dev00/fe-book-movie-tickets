import { Module } from 'vuex'

import { RootState } from '@/store'
import { ShowtimeState } from '@/types'

const showtimeModule: Module<ShowtimeState, RootState> = {
    namespaced: true,
    state: {
        showtime_id: null,
    },
    mutations: {
        setShowtime(state, showtime_id) {
            state.showtime_id = showtime_id
        },
        clear(state) {
            state = null
        },
    },
    actions: {
        setShowtime({ commit }, showtime_id) {
            commit('setShowtime', showtime_id);
        },
        clear({ commit }) {
            commit('clear');
        },
    },
    getters: {
        selectedShowtime(state) {
            return state.showtime_id
        },
    },
}

export default showtimeModule
