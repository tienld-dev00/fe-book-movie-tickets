<template>
    <div v-show="isLoadingPage" class="flex items-center justify-center h-screen">
        <base-loading :loading="isLoadingPage" />
    </div>
    <div v-show="!isLoadingPage" class="xl:ml-10 xl:mr-10 2xl:ml-32 2xl:mr-32">
        <div class="flex">
            <div class="p-6 flex flex-col md:flex-row items-start">
                <img class="w-64 h-auto rounded" :src="thisMovie.image" alt="Movie Poster" />
                <div class="ml-0 md:ml-6 mt-6 md:mt-0 flex-1">
                    <h2 class="text-2xl font-bold uppercase">
                        {{ thisMovie.name }}
                    </h2>
                    <p class="mt-5 text-lg"><strong>Genre: </strong> {{ thisMovie.category_name }}</p>
                    <p class="text-lg">
                        <strong>Opening: </strong>{{ dayjs(thisMovie.release_date).format('DD-MM-YYYY') }}
                    </p>
                    <p class="text-lg"><strong>Duration: </strong>{{ thisMovie.duration }} minutes</p>
                    <p class="mt-2 text-lg">
                        <strong>Age Limit :</strong> <span class="text-red-600">{{ thisMovie.age_limit }}+</span>
                    </p>
                    <p class="text-gray-600 mt-2">
                        {{ thisMovie.description }}
                    </p>
                    <div class="mt-6">
                        <button
                            @click="openModal()"
                            class="bg-colers_button-25 text-white px-4 py-2 rounded hover:bg-colers_button-50"
                        >
                            BOOK TICKETS
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <p class="text-gray-600 text-xl mt-2 mb-5 p-5">
                <strong
                    >Movie Trailer <span class="uppercase">{{ thisMovie.name }}</span></strong
                >
            </p>
            <div class="w-fit mx-auto aspect-video w-full px-5">
                <iframe width="100%" height="100%" :src="videoURL"> </iframe>
            </div>
        </div>
        <!-- Movie ticket booking method -->
        <el-dialog class="min-w-[90%] md:min-w-[80%] !mx-auto" v-model="outerVisible">
            <template #header>
                <div class="text-center text-2xl text-orange-600 font-medium mx-auto w-fit px-10 uppercase">
                    {{ thisMovie.name }}
                </div>
            </template>
            <hr class="border-b border-orange-600 w-full mb-3" />

            <!-- Calendar Selection -->
            <h3 class="text-xl font-medium mb-2">Select show date</h3>
            <div class="w-4/5 mb-2 mt-2 mx-auto">
                <div v-if="showDate && showDate.length > 0" class="flex-wrap justify-center flex gap-2 items-center">
                    <div
                        v-for="(day, index) in showDate"
                        :key="index"
                        class="hover:bg-orange-200 mt-2 min-w-[110px] rounded-full bg-gray-200 overflow-hidden"
                    >
                        <input
                            class="hidden peer"
                            type="radio"
                            :id="day.date"
                            name="date"
                            :value="day.date"
                            v-model="selectedDate"
                            @change="getShowtimeByDate(day.date)"
                        />
                        <label
                            :for="day.date"
                            class="cursor-pointer block w-full h-full peer-checked:bg-orange-400 peer-checked:text-white peer-checked:border-orange-400 hover:bg-orange-400 hover:text-white text-center py-1 px-2"
                        >
                            <p>{{ t(`dayOfWeek.${day.day_of_week}`) }}</p>
                            <p>{{ dayjs(day.date).format('DD-MM-YYYY') }}</p>
                        </label>
                    </div>
                </div>
            </div>
            <!-- Showtime Selection -->
            <div class="mt-10">
                <hr class="border-b border-orange-600 w-full mb-3" />
                <h3 class="text-xl font-medium mb-2">Select showtime</h3>
                <div class="md:items-center md:mb-4 md:mt-5 md:w-full flex justify-start w-full relative">
                    <img
                        :src="thisMovie.image"
                        alt="Doraemon Movie"
                        class="w-[195px] h-[265px] xl:w-[185px] xl:h-[245px] md:mr-4 mt-7 shrink-0"
                    />

                    <div
                        v-if="isLoadingShowtime"
                        class="flex items-center justify-center h-full w-full absolute inset-0"
                    >
                        <base-loading :loading="isLoadingShowtime" />
                    </div>
                    <div v-else class="flex flex-wrap gap-2 justify-start w-full">
                        <div
                            v-for="showTime in showTimes"
                            :key="showTime.id"
                            class="ml-2 mr-2 mt-2 mb-2 border rounded border-2 text-center mx-auto"
                        >
                            <input
                                class="hidden peer"
                                type="radio"
                                :id="showTime.id"
                                name="showtime"
                                :value="showTime.id"
                                v-model="selectedShowtime"
                            />
                            <label
                                :for="showTime.id"
                                class="block p-2 cursor-pointer peer-checked:bg-orange-400 peer-checked:text-white peer-checked:border-orange-400 hover:bg-orange-400 hover:text-white"
                            >
                                <p>
                                    {{ dayjs(showTime.start_time).format('HH:mm') }} -
                                    {{ dayjs(showTime.end_time).format('HH:mm') }}
                                </p>
                                <p>{{ showTime.room }}</p>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center mb-3">
                <button
                    @click="handleSubmit()"
                    class="bg-colers_button-25 text-white px-4 py-2 rounded hover:bg-colers_button-50"
                >
                    BOOK TICKETS
                </button>
            </div>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { showtime } from '@/api/modules/showtime/index'
import { movie } from '@/api/modules/movie/index'
import i18n from '@/i18n'
import router from '@/router/index'
import store from '@/store/index'
import { ToastType } from '@/types/toastMessage'
import { showToast } from '@/utils/toastHelper'
import { dayjs } from 'element-plus'

const { t } = i18n.global
const route = useRoute()
const slug = route.params.slug
const outerVisible = ref(false)
const videoURL = ref(null)
const thisMovie = reactive({})
const showDate = ref([])
const showTimes = ref([])
const isLoadingPage = ref(true)
const isLoadingShowtime = ref(false)
const selectedDate = ref(null)
const selectedShowtime = ref(null)
const previousPath = (router.options.history.state.back as string) ?? '/'

const getIdFromURL = (url) => {
    const regex =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    const match = url.match(regex)
    return match ? match[1] : ''
}

const getMovie = async () => {
    const response = await movie.movieDetail(slug)
    Object.assign(thisMovie, response.data)
    videoURL.value = 'https://www.youtube.com/embed/' + getIdFromURL(thisMovie.trailer)
}

const getShowDate = async () => {
    const response = await showtime.getShowDate(thisMovie.id)
    showDate.value = response.data
}
const openModal = async () => {
    if (showDate.value && showDate.value.length > 0) {
        outerVisible.value = true
        selectedDate.value = showDate.value[0].date
        await getShowtimeByDate(showDate.value[0].date)
    } else {
        showToast('There are currently no screenings for this movie', ToastType.WARNING)
    }
}
const getShowtimeByDate = async (date: string) => {
    try {
        selectedShowtime.value = null
        isLoadingShowtime.value = true
        const response = await showtime.getShowtimeByDate({
            movie_id: thisMovie.id,
            date: date,
        })
        showTimes.value = response
        isLoadingShowtime.value = false
    } catch (error) {
        console.error('Error in getShowtimeByDate:', error)
    }
}

const handleSubmit = async () => {
    if (selectedDate.value && selectedShowtime.value) {
        await store.dispatch('showtime/setShowtime', selectedShowtime.value)
        router.push('booking')
        return false
    }
    showToast('Plase choose showtime', ToastType.WARNING)
}

onMounted(async () => {
    isLoadingPage.value = true
    try {
        await getMovie()
        await getShowDate()
    } catch (error) {
        showToast('Đã xảy ra lỗi. Vui lòng thử lại sau!', ToastType.ERROR)
        router.push({ path: previousPath, replace: true })
    }
    isLoadingPage.value = false
})
</script>