<template>
    <div class="ml-3 mr-3">
        <div class="mt-7 mb-7 md:mt-10 md:mb-10">
            <span class="text-2xl font-bold">MOVIE COMING SOON</span>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            <!-- Card 1 -->
            <div v-for="movie in movies" :key="movie.id" class="bg-white shadow-lg rounded-lg">
                <router-link :to="{ name: 'movieDetails',params: { slug: movie.slug } }">
                    <div class=" flex justify-center">
                        <img class="w-[195px] h-[265px] xl:w-[225px] xl:h-[285px] rounded"
                        :src="movie.image" alt="Movie Poster">
                    </div>
                    <div class="p-4">
                        <h2 class="text-xl font-bold">{{ movie.name }}</h2>
                        <p class="text-gray-700 mt-2"><strong>Category:</strong> {{ movie.category_name }}</p>
                        <p class="text-gray-700"><strong>Time:</strong> {{ movie.duration }} minutes</p>
                        <p class="text-gray-700"><strong>Age limit:</strong> {{ movie.age_limit }}+</p>
                        <p class="text-gray-700"><strong>Premiere:</strong> {{ movie.release_date }}</p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { listUpcomingMovies } from '@/api/modules/movieIsShowing_upcomingMovie/index'

const movies = ref([]);

// Fetch list of movies showing
onMounted(async () => {
    try {
        const response = await listUpcomingMovies();
        movies.value = response.data; // Assign response data to movies
    } catch (error) {
        console.error('Failed to fetch movies:', error);
    }
});
</script>
