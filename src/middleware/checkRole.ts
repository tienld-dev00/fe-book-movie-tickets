import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import store from '@/store';
import { USER_ROLE } from '@/constants/user';

export async function checkRole(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
): Promise<void> {
    const requiredRoles = {
        admin: [USER_ROLE.ADMIN],
        user: [USER_ROLE.USER],
    };

    const userRole = store.getters['auth/userRole'];

    if (to.meta.role.includes(userRole)) {
        next();
    } else {
        // Handle unauthorized access
        next({ name: 'home' }); // Redirect to home or an error page
    }
}
