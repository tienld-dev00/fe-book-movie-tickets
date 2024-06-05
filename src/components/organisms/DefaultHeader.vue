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
                <a href="/movie-is-showing" class="text-xs md:text-sm lg:text-base text-white">MOVIE IS SHOWING</a>
                <a href="/upcoming-movie" class="text-xs md:text-sm lg:text-base text-white">MOVIE COMING SOON</a>
                <div>
                    <router-link :to="{ name: 'profile', params: { id: 1 } }">
                        <button class="text-xs md:text-xs lg:text-xs text-white font-normal">NGUYEN QUOC KHANH</button>
                    </router-link>
                    <span class="text-white font-normal"> / </span>
                    <button class="text-xs md:text-xs lg:text-xs text-white font-normal">LOG OUT</button>
                </div>
            </nav>
        </div>
        <div class="md:hidden flex justify-between">
            <button id="menuButton" class="w-full border relative">
                <i class="fa-solid fa-bars text-gray-500 text-2xl p-2"></i>
                <ul id="menuList" class="z-20 hidden absolute top-full left-0 w-full bg-sky-950 border">
                    <a href="/movie-is-showing" class="block px-4 py-2 text-sm text-white hover:bg-blue-800">MOVIE IS SHOWING</a>
                    <a href="/upcoming-movie" class="block px-4 py-2 text-sm text-white hover:bg-blue-800">MOVIE COMING SOON</a>
                </ul>
            </button>
            <button id="userButton" class="w-full border relative">
                <i class="fa-solid fa-user text-gray-500 text-2xl p-2"></i>
                <ul id="userMenuList" class="z-20 hidden absolute top-full left-0 w-full bg-sky-950 border">
                    <a href="/profile/1" class="block px-4 py-2 text-sm text-white hover:bg-blue-800">PROFILE</a>
                    <a href="#" class="block px-4 py-2 text-sm text-white hover:bg-blue-800">LOG OUT</a>
                </ul>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
onMounted(() => {
    document.getElementById('menuButton').addEventListener('click', function () {
        const icon = this.querySelector('i');
        const menuList = document.getElementById('menuList');

        icon.classList.toggle('text-red-500');
        menuList.classList.toggle('hidden');
    });

    document.getElementById('userButton').addEventListener('click', function () {
        const icon = this.querySelector('i');
        const userMenuList = document.getElementById('userMenuList');

        icon.classList.toggle('text-red-500');
        userMenuList.classList.toggle('hidden');
    });

})
</script>