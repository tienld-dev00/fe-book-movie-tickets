import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import store from '@/store'
import { UserDetail } from '@/api/modules/auth/types'
// import { LANGUAGE, USER_ROLE } from '@/constants'
import { USER_STATUS, USER_ROLE } from '@/constants'

export async function checkLogin(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
): Promise<void> {
    const excludedRoutes = ['movieIsShowing', 'upcomingMovie', 'verify_account', 'forgot_password', 'reset_password', 'confirmed_account']
    const router = useRouter()
    const isLoggedIn = store.getters['auth/isLoggedIn']

    if (excludedRoutes.includes(to.name as string) && !isLoggedIn) {
        next()
        return
    }

    if (isLoggedIn) {
        const auth: UserDetail = await store.dispatch('auth/profile')

        if (auth.status != USER_STATUS.ACTIVE) {
            nextTick(() => {
                store.dispatch('auth/logout').then(() => router.push({ name: 'login' }))
            })
        }

        if (to.name === 'login' || excludedRoutes.includes(to.name as string)) {
            return next({ name: 'home' })
        }

        const userRole = auth.role;

        // Kiểm tra và chặn truy cập dựa trên vai trò của người dùng
        if (userRole === USER_ROLE.ADMIN && isAdminRoute(to)) {
            next()
        } else if (userRole === USER_ROLE.USER && isUserRoute(to)) {
            next()
        } else {
            next({ name: 'page_error' })
        }
    } else {
        if (to.name === 'login') {
            return next()
        } else {
            store.dispatch('auth/setRedirectTo', to.fullPath)
            router.push({ name: 'login' })
        }
            console.log("🚀 ~ to.fullPath:", to.fullPath)
    }
}

function isAdminRoute(route: RouteLocationNormalized): boolean {
    return route.matched.some(record => record.meta && record.meta.isAdmin)
}

function isUserRoute(route: RouteLocationNormalized): boolean {
    return route.matched.some(record => record.meta && record.meta.isUser)
}
