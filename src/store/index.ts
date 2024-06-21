import { Store } from 'vuex'
import authModule from './modules/auth'
import showtimeModule from './modules/showtime'
import { AuthState } from '@/types'
import { ShowtimeState } from '@/types'

export interface RootState {
    auth: AuthState
    showtime: ShowtimeState
}

const store: Store<RootState> = createStore({
    modules: {
        auth: authModule,
        showtime: showtimeModule,
    },
})

export default store
