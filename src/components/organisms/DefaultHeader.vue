<template>
    <div class="flex flex-col md:flex-row">
        <div class="flex justify-center p-2">
            <router-link :to="{ name: 'movieIsShowing' }" class="inline-block mt-5">
                <img src="/src/assets/img/logo.png" alt="Logo" class="w-full h-28 object-cover">
            </router-link>
        </div>
        <div class="flex flex-col w-full justify-center">
            <div class="flex justify-center text-white">
                <div class="flex flex-col w-full items-end p-2">
                    <span class="text-end text-xs font-normal">HOTLINE: 1234567890 - OPENING HOURS: 9:00-22:00</span>
                </div>
            </div>
            <nav class="hidden md:flex justify-between p-3 w-full items-center bg-colors_header-menu-50">
                <a href="/" class="text-xs md:text-sm lg:text-base text-white">MOVIE IS SHOWING</a>
                <a href="/upcoming-movie" class="text-xs md:text-sm lg:text-base text-white">MOVIE COMING SOON</a>
                <div v-if="currentUser">
                    <router-link :to="{ name: 'profile', params: { id: currentUser.id } }">
                        <a class="text-xs md:text-sm lg:text-base text-white">
                            {{ currentUser.name }}
                        </a>
                    </router-link>
                    <span class="text-white font-normal ml-2 mr-2"> | </span>
                    <a @click="handleLogout" class="text-xs md:text-sm lg:text-base cursor-pointer text-white">LOG
                        OUT</a>
                </div>
                <div v-else>
                    <a href="/auth/login" class="text-xs md:text-sm lg:text-base text-white">LOGIN |
                        REGISTER</a>
                </div>
            </nav>
        </div>
        <div class="md:hidden flex justify-between">
            <button @click="toggleMenu" class="w-full border relative">
                <i
                    :class="['fa-solid', 'fa-bars', 'text-gray-500', 'text-2xl', 'p-2', { 'text-red-500': isMenuOpen }]"></i>
                <ul v-if="isMenuOpen" class="z-20 absolute top-full left-0 w-full bg-sky-950 border">
                    <a href="/" class="block px-4 py-2 text-sm text-white hover:bg-blue-800">MOVIE IS SHOWING</a>
                    <a href="/upcoming-movie" class="block px-4 py-2 text-sm text-white hover:bg-blue-800">MOVIE COMING
                        SOON</a>
                </ul>
            </button>
            <button @click="toggleUserMenu" class="w-full border relative">
                <i
                    :class="['fa-solid', 'fa-user', 'text-gray-500', 'text-2xl', 'p-2', { 'text-red-500': isUserMenuOpen }]"></i>
                <ul v-if="isUserMenuOpen" class="z-20 absolute top-full left-0 w-full bg-sky-950 border">
                    <div v-if="currentUser">
                        <router-link :to="{ name: 'profile', params: { id: currentUser.id } }">
                            <button class="text-xs md:text-sm lg:text-base text-white">
                                {{ currentUser.name }}
                            </button>
                        </router-link>
                        <a @click="handleLogout" class="block px-4 py-2 text-sm text-white hover:bg-blue-800">LOG
                            OUT</a>
                    </div>
                    <div v-else>
                        <a href="/auth/login" class="block px-4 py-2 text-sm text-white hover:bg-blue-800">LOGIN |
                            REGISTER</a>
                    </div>
                </ul>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'
import { showToast } from '@/utils/toastHelper'
import { ToastType } from '@/types'

const isMenuOpen = ref(false);
const isUserMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
}
const toggleUserMenu = () => {
    isUserMenuOpen.value = !isUserMenuOpen.value;
};

const store = useStore()

const isLoggedIn = computed(() => store.getters['auth/isLoggedIn'])
// console.log("🚀 ~ isLoggedIn:", isLoggedIn)
const currentUser = computed(() => store.getters['auth/currentUser'])
// console.log("🚀 ~ currentUser:", currentUser)

const handleLogout = async () => {
    try {
        await store.dispatch('auth/logout')
        router.push({ name: 'home' })
        showToast('Logged out successfully', ToastType.SUCCESS)
    } catch (error: any) {
        showToast(error.message, ToastType.ERROR)
    }
}

onMounted(async () => {
    if (isLoggedIn.value) {
        try {
            await store.dispatch('auth/profile')
        } catch (error) {
            console.error('Failed to fetch profile', error)
        }
    }
})
</script>