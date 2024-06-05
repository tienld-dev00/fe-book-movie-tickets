<template>
    <div class="ml-3 mr-3">
        <div class="mt-7 mb-7 md:mt-10 md:mb-10">
            <span class="text-2xl font-bold">MOVIE IS SHOWING</span>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            <!-- Card 1 -->
            <div class="bg-white shadow-lg rounded-lg">
                <router-link :to="{ name: 'movieDetails' }">
                    <div class="relative flex justify-center">
                        <img class="w-[195px] h-[265px] xl:w-[225px] xl:h-[285px] rounded"
                            src="https://metiz.vn/media/poster_film/drm24_-_poster.jpg" alt="Movie Poster">
                        <div
                            class="absolute -top-2 -right-2 md:-top-2 md:right-0 lg:-top-2 lg:-right-1 xl:-top-2 xl:right-2 2xl:-top-2 2xl:right-9">
                            <span class="bg-yellow-500 text-white text-sm px-2 py-1 rounded-full">1</span>
                        </div>
                    </div>
                    <div class="p-4">
                        <h2 class="text-xl font-bold truncate">MOVIE MOVIE DORAEMON - NOBITA AND THE EARTH SYMPHONY (VOICE OVER) (P)</h2>
                        <p class="text-gray-700 mt-2"><strong>Category:</strong> Cartoon</p>
                        <p class="text-gray-700"><strong>Time:</strong> 115 minutes </p>
                        <p class="text-gray-700"><strong>Age limit:</strong> 12+ </p>
                        <p class="text-gray-700"><strong>Premiere:</strong> May 24, 2024</p>
                    </div>
                </router-link>
                <div class="mt-2 mb-3 flex justify-center">
                    <button @click="outerVisible = true"
                        class="bg-colers_button-25 text-white px-4 py-2 rounded hover:bg-colers_button-50">BOOK TICKETS</button>
                </div>
            </div>

            <!-- Card 2 -->
            <div class="bg-white shadow-lg rounded-lg">
                <router-link :to="{ name: 'movieDetails' }">
                    <div class="relative flex justify-center">
                        <img class="w-[195px] h-[265px] xl:w-[225px] xl:h-[285px] rounded"
                            src="https://metiz.vn/media/poster_film/drm24_-_poster.jpg" alt="Movie Poster">
                        <div
                            class="absolute -top-2 -right-2 md:-top-2 md:right-0 lg:-top-2 lg:-right-1 xl:-top-2 xl:right-2 2xl:-top-2 2xl:right-9">
                            <span class="bg-yellow-500 text-white text-sm px-2 py-1 rounded-full">2</span>
                        </div>
                    </div>
                    <div class="p-4">
                        <h2 class="text-xl font-bold truncate">MOVIE MOVIE DORAEMON - NOBITA AND THE EARTH SYMPHONY (VOICE OVER) (P)</h2>
                        <p class="text-gray-700 mt-2"><strong>Category:</strong> Cartoon</p>
                        <p class="text-gray-700"><strong>Time:</strong> 115 minutes </p>
                        <p class="text-gray-700"><strong>Age limit:</strong> 12+ </p>
                        <p class="text-gray-700"><strong>Premiere:</strong> May 24, 2024</p>
                    </div>
                </router-link>
                <div class="mt-2 mb-3 flex justify-center">
                    <button @click="outerVisible = true"
                        class="bg-colers_button-25 text-white px-4 py-2 rounded hover:bg-colers_button-50">BOOK TICKETS</button>
                </div>
            </div>

            <!-- Card 3 -->
            <div class="bg-white shadow-lg rounded-lg">
                <router-link :to="{ name: 'movieDetails' }">
                    <div class="relative flex justify-center">
                        <img class="w-[195px] h-[265px] xl:w-[225px] xl:h-[285px] rounded"
                            src="https://metiz.vn/media/poster_film/drm24_-_poster.jpg" alt="Movie Poster">
                        <div
                            class="absolute -top-2 -right-2 md:-top-2 md:right-0 lg:-top-2 lg:-right-1 xl:-top-2 xl:right-2 2xl:-top-2 2xl:right-9">
                            <span class="bg-yellow-500 text-white text-sm px-2 py-1 rounded-full">3</span>
                        </div>
                    </div>
                    <div class="p-4">
                        <h2 class="text-xl font-bold truncate">MOVIE MOVIE DORAEMON - NOBITA AND THE EARTH SYMPHONY (VOICE OVER) (P)</h2>
                        <p class="text-gray-700 mt-2"><strong>Category:</strong> Cartoon</p>
                        <p class="text-gray-700"><strong>Time:</strong> 115 minutes </p>
                        <p class="text-gray-700"><strong>Age limit:</strong> 12+ </p>
                        <p class="text-gray-700"><strong>Premiere:</strong> May 24, 2024</p>
                    </div>
                </router-link>
                <div class="mt-2 mb-3 flex justify-center">
                    <button @click="outerVisible = true"
                        class="bg-colers_button-25 text-white px-4 py-2 rounded hover:bg-colers_button-50">BOOK TICKETS</button>
                </div>
            </div>

            <!-- Card 4 -->
            <div class="bg-white shadow-lg rounded-lg">
                <router-link :to="{ name: 'movieDetails' }">
                    <div class="relative flex justify-center">
                        <img class="w-[195px] h-[265px] xl:w-[225px] xl:h-[285px] rounded"
                            src="https://metiz.vn/media/poster_film/drm24_-_poster.jpg" alt="Movie Poster">
                        <div
                            class="absolute -top-2 -right-2 md:-top-2 md:right-0 lg:-top-2 lg:-right-1 xl:-top-2 xl:right-2 2xl:-top-2 2xl:right-9">
                            <span class="bg-yellow-500 text-white text-sm px-2 py-1 rounded-full">4</span>
                        </div>
                    </div>
                    <div class="p-4">
                        <h2 class="text-xl font-bold truncate">MOVIE MOVIE DORAEMON - NOBITA AND THE EARTH SYMPHONY (VOICE OVER) (P)</h2>
                        <p class="text-gray-700 mt-2"><strong>Category:</strong> Cartoon</p>
                        <p class="text-gray-700"><strong>Time:</strong> 115 minutes </p>
                        <p class="text-gray-700"><strong>Age limit:</strong> 12+ </p>
                        <p class="text-gray-700"><strong>Premiere:</strong> May 24, 2024</p>
                    </div>
                </router-link>
                <div class="mt-2 mb-3 flex justify-center">
                    <button @click="outerVisible = true"
                        class="bg-colers_button-25 text-white px-4 py-2 rounded hover:bg-colers_button-50">BOOK TICKETS</button>
                </div>
            </div>

            <!-- Card 5 -->
            <div class="bg-white shadow-lg rounded-lg">
                <router-link :to="{ name: 'movieDetails' }">
                    <div class="relative flex justify-center">
                        <img class="w-[195px] h-[265px] xl:w-[225px] xl:h-[285px] rounded"
                            src="https://metiz.vn/media/poster_film/drm24_-_poster.jpg" alt="Movie Poster">
                        <div
                            class="absolute -top-2 -right-2 md:-top-2 md:right-0 lg:-top-2 lg:-right-1 xl:-top-2 xl:right-2 2xl:-top-2 2xl:right-9">
                            <span class="bg-yellow-500 text-white text-sm px-2 py-1 rounded-full">5</span>
                        </div>
                    </div>
                    <div class="p-4">
                        <h2 class="text-xl font-bold truncate">MOVIE MOVIE DORAEMON - NOBITA AND THE EARTH SYMPHONY (VOICE OVER) (P)</h2>
                        <p class="text-gray-700 mt-2"><strong>Category:</strong> Cartoon</p>
                        <p class="text-gray-700"><strong>Time:</strong> 115 minutes </p>
                        <p class="text-gray-700"><strong>Age limit:</strong> 12+ </p>
                        <p class="text-gray-700"><strong>Premiere:</strong> May 24, 2024</p>
                    </div>
                </router-link>
                <div class="mt-2 mb-3 flex justify-center">
                    <button @click="outerVisible = true"
                        class="bg-colers_button-25 text-white px-4 py-2 rounded hover:bg-colers_button-50">BOOK TICKETS</button>
                </div>
            </div>

            <!-- Card 6 -->
            <div class="bg-white shadow-lg rounded-lg">
                <router-link :to="{ name: 'movieDetails' }">
                    <div class="relative flex justify-center">
                        <img class="w-[195px] h-[265px] xl:w-[225px] xl:h-[285px] rounded"
                            src="https://metiz.vn/media/poster_film/drm24_-_poster.jpg" alt="Movie Poster">
                        <div
                            class="absolute -top-2 -right-2 md:-top-2 md:right-0 lg:-top-2 lg:-right-1 xl:-top-2 xl:right-2 2xl:-top-2 2xl:right-9">
                            <span class="bg-yellow-500 text-white text-sm px-2 py-1 rounded-full">6</span>
                        </div>
                    </div>
                    <div class="p-4">
                        <h2 class="text-xl font-bold truncate">MOVIE MOVIE DORAEMON - NOBITA AND THE EARTH SYMPHONY (VOICE OVER) (P)</h2>
                        <p class="text-gray-700 mt-2"><strong>Category:</strong> Cartoon</p>
                        <p class="text-gray-700"><strong>Time:</strong> 115 minutes </p>
                        <p class="text-gray-700"><strong>Age limit:</strong> 12+ </p>
                        <p class="text-gray-700"><strong>Premiere:</strong> May 24, 2024</p>
                    </div>
                </router-link>
                <div class="mt-2 mb-3 flex justify-center">
                    <button @click="outerVisible = true"
                        class="bg-colers_button-25 text-white px-4 py-2 rounded hover:bg-colers_button-50">BOOK TICKETS</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Movie ticket booking method -->
    <el-dialog class="min-w-[90%] md:min-w-[80%] !mx-auto" v-model="outerVisible" @close="handleClose">
        <template #header>
            <div class="text-2xl text-orange-600 font-medium">Showtimes</div>
        </template>
        <hr class="border-b border-orange-600 w-full mb-3">

        <!-- Calendar Selection -->
        <h3 class="text-xl font-medium mb-2">Select show date</h3>
        <div class="flex justify-center mb-4 mt-7">
            <div class="flex flex-wrap space-x-4 space-y-4 justify-center">
                <button class="px-4 py-2 rounded-full bg-orange-500 text-white">Wednesday<br>29/05</button>
                <button class="px-4 py-2 rounded-full bg-gray-200">Thursday<br>30/05</button>
                <button class="px-4 py-2 rounded-full bg-gray-200">Friday<br>31/05</button>
                <button class="px-4 py-2 rounded-full bg-gray-200">Saturday<br>01/06</button>
                <button class="px-4 py-2 rounded-full bg-gray-200">Sunday<br>02/06</button>
                <button class="px-4 py-2 rounded-full bg-gray-200">Monday<br>03/06</button>
                <button class="px-4 py-2 rounded-full bg-gray-200">Tuesday<br>04/06</button>
            </div>
        </div>

        <!-- Showtime Selection -->
        <div class="mt-20">
            <hr class="border-b border-orange-600 w-full mb-3">
            <h3 class="text-xl  font-medium mb-2">Select showtime</h3>
            <p class="font-bold text-xl mb-2 mt-4 text-center">PHIM ĐIỆN ẢNH DORAEMON - NOBITA VÀ BẢN GIAO HƯỞNG ĐỊA CẦU
                (LỒNG
                TIẾNG) (P)
            </p>
            <div class="md:flex md:items-center md:mb-4 md:mt-5 md:justify-center md:w-full">
                <img src="https://metiz.vn/media/poster_film/drm24_-_poster.jpg" alt="Doraemon Movie"
                    class="w-[195px] h-[265px] xl:w-[185px] xl:h-[245px] md:mr-4 mt-7 mx-auto">
                <div class="">
                    <button class="p-2 ml-2 mr-2 mt-2 mb-2 border rounded text-center">14:20-16:15<br>Cinema Room
                        02</button>
                    <button class="p-2 ml-2 mr-2 mt-2 mb-2 border rounded text-center">15:35-17:30<br>Cinema Room
                        05</button>
                    <button class="p-2 ml-2 mr-2 mt-2 mb-2 border rounded text-center">17:05-19:00<br>Cinema Room
                        04</button>
                    <button class="p-2 ml-2 mr-2 mt-2 mb-2 border rounded text-center">17:40-19:35<br>Cinema Room
                        05</button>
                    <button class="p-2 ml-2 mr-2 mt-2 mb-2 border rounded text-center">18:20-20:15<br>Cinema Room
                        03</button>
                    <button class="p-2 ml-2 mr-2 mt-2 mb-2 border rounded text-center">19:00-20:55<br>Cinema Room
                        02</button>
                    <button class="p-2 ml-2 mr-2 mt-2 mb-2 border rounded text-center">19:45-21:40<br>Cinema Room
                        05</button>
                    <button class="p-2 ml-2 mr-2 mt-2 mb-2 border rounded text-center">20:10-22:55<br>Cinema Room
                        01</button>
                </div>
            </div>
        </div>
        <router-link :to="{ name: 'booking' }" class="mt-2 mb-3 flex justify-center">
            <button class="bg-colers_button-25 text-white px-4 py-2 rounded hover:bg-colers_button-50">
                ĐẶT VÉ
            </button>
        </router-link>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const outerVisible = ref(false);
const route = useRoute();
const router = useRouter();

// Watch for query parameter change
watch(
    () => route.query.openModal,
    (newVal) => {
        if (newVal === 'true') {
            outerVisible.value = true;
        }
    },
    { immediate: true }
);

// Handle modal close
const handleClose = () => {
    outerVisible.value = false;
    // Remove query parameter without reloading the page
    router.replace({ name: 'movieIsShowing', query: {} });
};
</script>
