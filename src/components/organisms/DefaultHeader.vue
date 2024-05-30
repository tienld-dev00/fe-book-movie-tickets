<template>
    <div class="flex flex-col">
        <div class="md:hidden">
            <div class="flex justify-center text-white">
                <div class="flex justify-center">
                    <div class="inline-block mt-5">
                        <img src="/src/assets/img/logo.png" alt="Logo" class="w-36 h-32 object-cover">
                    </div>
                </div>
            </div>
            <div class="flex justify-center text-white">
                <div class="flex flex-col w-full mr-3 items-end">
                    <span class="text-end text-xs font-normal">HOTLINE:1234567890 <br> GIỜ MỞ CỬA:9:00-22:00</span>
                </div>
            </div>
            <div class="flex justify-between">
                <button id="menuButton" class="w-full border relative">
                    <i class="fa-solid fa-bars text-gray-500 text-2xl p-2"></i>
                    <ul id="menuList" class="z-2 hidden absolute top-full left-0 w-full bg-sky-950 border">
                        <a href="#" class="block px-4 py-2 text-sm text-white hover:bg-blue-800">LỊCH CHIẾU</a>
                        <a href="/movie-is-showing" class="block px-4 py-2 text-sm text-white hover:bg-blue-800">PHIM
                            ĐANG
                            CHIẾU</a>
                        <a href="/upcoming-movie" class="block px-4 py-2 text-sm text-white hover:bg-blue-800">PHIM SẮP
                            CHIẾU</a>
                    </ul>
                </button>
                <button id="userButton" class="w-full border relative">
                    <i class="fa-solid fa-user text-gray-500 text-2xl p-2"></i>
                    <ul id="userMenuList" class="z-2 hidden absolute top-full left-0 w-full bg-sky-950 border">
                        <a href="/profile" class="block px-4 py-2 text-sm text-white hover:bg-blue-800">PROFILE</a>
                        <a href="#" class="block px-4 py-2 text-sm text-white hover:bg-blue-800">LOGOUT</a>
                    </ul>
                </button>
            </div>
        </div>
    </div>
    <div class=" hidden md:flex">
        <div class="flex justify-center p-2">
            <router-link :to="{ name: 'movieIsShowing' }" class="inline-block mt-5">
                <img src="/src/assets/img/logo.png" alt="Logo" class="w-full h-28 object-cover">
            </router-link>
        </div>
        <div class="flex flex-col w-full justify-center">
            <div class="flex justify-center text-white">
                <div class="flex flex-col w-full items-end p-2">
                    <span class="text-end text-xs font-normal">HOTLINE:1234567890 - GIỜ MỞ CỬA:9:00-22:00</span>
                </div>
            </div>
            <nav class="justify-between flex p-3 w-full items-center bg-colors_header-menu-50">
                <a href="#" class="text-xs md:text-sm lg:text-base text-white">LỊCH CHIẾU</a>
                <div class="relative group">
                    <a href="#" class="text-xs md:text-sm lg:text-base text-white">PHIM</a>
                    <div class="absolute left-1 top-4 mt-2 w-40 bg-blue-950 rounded shadow-lg group-hover:block hidden">
                        <a href="/movie-is-showing" class="block px-4 py-2 text-sm text-white hover:bg-blue-800">PHIM
                            ĐANG
                            CHIẾU</a>
                        <a href="/upcoming-movie" class="block px-4 py-2 text-sm text-white hover:bg-blue-800">PHIM SẮP
                            CHIẾU</a>
                    </div>
                </div>
                <a href="#" class="text-xs md:text-sm lg:text-base text-white">ƯU ĐÃI</a>
                <a href="#" class="text-xs md:text-sm lg:text-base text-white">TIN TỨC PHIM</a>

                <div>
                    <router-link :to="{ name: 'profile' }">
                        <button class="text-xs md:text-xs lg:text-xs text-white font-normal">NGUYỄN QUỐC KHÁNH</button>
                    </router-link>
                    <span class="text-white font-normal"> / </span>
                    <button class="text-xs md:text-xs lg:text-xs text-white font-normal">ĐĂNG XUẤT</button>
                </div>
            </nav>
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