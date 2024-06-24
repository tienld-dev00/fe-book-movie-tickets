<template>
    <div v-show="isLoadingPage" class="flex items-center justify-center h-screen">
        <base-loading :loading="isLoadingPage" />
    </div>
    <div v-show="!isLoadingPage" class="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-bold text-orange-800 uppercase">{{ data.room && data.room.name }}</h2>
            <div class="flex items-center mr-2">
                <h2 class="text-xl font-bold text-orange-800">Time remaining:</h2>
                <div class="clock rounded border border-red-500 p-1 w-fit ml-2">
                    <span class="inline-flex justify-center w-8 p-1 text-white bg-black rounded-md">{{
                        minutes !== undefined ? `${minutes}`.toString().padStart(2, '0') : '00'
                    }}</span>
                    :
                    <span class="inline-flex justify-center w-8 p-1 text-white bg-black rounded-md">{{
                        seconds !== undefined ? `${seconds}`.toString().padStart(2, '0') : '00'
                    }}</span>
                </div>
            </div>
        </div>
        <!-- Seat Grid -->
        <div class="lg:flex">
            <div class="lg:w-3/4">
                <!-- Screen -->
                <div class="text-center mb-4">
                    <div class="bg-gray-300 h-10 w-full rounded-t-lg flex items-center justify-center">SCREEN</div>
                </div>
                <div class="flex flex-col w-full gap-3">
                    <div v-for="(row, key) in seats" :key="key" class="flex items-center gap-4 mx-auto">
                        <button
                            v-for="seat in row"
                            :key="seat.id"
                            :class="['w-10 h-10 rounded text-sm', checkSeat(seat.id).class]"
                            @click="toggleSeat(seat)"
                            :disabled="checkSeat(seat.id).disabled"
                        >
                            {{ seat.name }}
                        </button>
                    </div>
                </div>
            </div>
            <div class="lg:w-1/4 lg:pl-4">
                <img :src="data.movie?.image ?? ''" alt="Doraemon Movie" class="w-[250px] mb-4 mx-auto" />
                <p class="font-bold mb-2 uppercase">
                    {{ data.movie?.name ?? '' }}
                </p>
                <h3 class="font-bold">
                    Price:
                    <span class="text-yellow-800">{{
                        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.price)
                    }}</span>
                </h3>
                <p>Day: {{ dayjs(data.start_time).format('DD-MM-YYYY') }}</p>
                <p>Time: {{ dayjs(data.start_time).format('HH:mm') }} - {{ dayjs(data.end_time).format('HH:mm') }}</p>
                <!-- Seat Legend -->
                <div class="mt-6">
                    <div class="flex items-center mb-2">
                        <div class="w-6 h-6 bg-green-500 mr-2"></div>
                        <span>Purchased Seat</span>
                    </div>
                    <div class="flex items-center mb-2">
                        <div class="w-6 h-6 bg-yellow-500 mr-2"></div>
                        <span>Selected Seat</span>
                    </div>
                    <div class="flex items-center mb-2">
                        <div class="w-6 h-6 bg-gray-300 mr-2"></div>
                        <span>Empty Seat</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Buttons -->
        <div class="mt-10 flex justify-between">
            <div class="flex">
                <span>List of selected seats:</span>
                <div class="flex gap-2 ml-2">
                    <span
                        class="w-6 h-6 rounded border-slate-500 border"
                        v-for="seat in selectedSeats"
                        :key="seat.id"
                        >{{ seat.name }}</span
                    >
                </div>
            </div>
            <div>
                <p class="text-yellow-800">
                    Total:
                    {{
                        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                            data.price * selectedSeats.length
                        )
                    }}
                </p>
            </div>
            <button @click="checkOut" class="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-400">
                Continue
            </button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { showtime } from '@/api/modules/showtime/index'
import i18n from '@/i18n'
import router from '@/router/index'
import store from '@/store/index'
import { ToastType } from '@/types/toastMessage'
import { showToast } from '@/utils/toastHelper'
import { dayjs } from 'element-plus'
import { fireStore } from '@/configs/firebase'
import {
    collection,
    CollectionReference,
    doc,
    DocumentData,
    getDocs,
    onSnapshot,
    query,
    addDoc,
    where,
    deleteDoc,
    Timestamp,
} from 'firebase/firestore'

const data = ref({})
const seatsFirebase = ref([])
const seats = ref([])
const minutes = ref()
const seconds = ref()
const isLoadingPage = ref(true)
const currentTime = ref(null)
const showtimeId = ref(store.getters['showtime/selectedShowtime'])
const previousPath = (router.options.history.state.back as string) ?? '/'
const userID = ref(store.getters['auth/currentUser'].id)
const { t } = i18n.global

function chunkArray(array: any, chunkSize: any) {
    const chunks = {}
    let key: string

    for (let i = 0, j = 0; i < array.length; i += chunkSize, j++) {
        key = convertNumberToAlphabet(j)
        chunks[key] = array
            .slice(i, i + chunkSize)
            .sort((a, b) => parseInt(a.name.substring(1), 10) - parseInt(b.name.substring(1), 10))
    }

    return chunks
}

const convertNumberToAlphabet = (number: number) => {
    let key: string

    if (number < 26) {
        key = String.fromCharCode(65 + number)
    } else {
        let character = String.fromCharCode(64 + number / 25)
        key = `${character}${String.fromCharCode(64 + (number % 25))}`
    }

    return key
}

const clear = () => {
    unsubscribe && unsubscribe()
    clearInterval(intervalId)
}
// firebase function:
let unsubscribe

function setupRealtimeListener() {
    const tasksCollection = collection(fireStore, 'seats')
    const tasksQuery = query(tasksCollection, where('showtime_id', '==', showtimeId.value))
    unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
        seatsFirebase.value = snapshot.docs.map((doc) => doc.data())
    })
}

function checkSeat(id) {
    const seatInData = seatsFirebase.value.find((dataSeat) => dataSeat.id == id)
    if (seatInData) {
        if (seatInData.user_id === userID.value && !seatInData.status) {
            return { class: 'bg-yellow-400 hover:bg-yellow-300', disabled: false }
        } else {
            return { class: 'bg-green-500 cursor-not-allowed', disabled: true }
        }
    }
    return { class: 'bg-gray-300 hover:bg-gray-100', disabled: false }
}

async function toggleSeat(seat) {
    const seatInData = seatsFirebase.value.find(
        (dataSeat) => dataSeat.id == seat.id && dataSeat.user_id == userID.value
    )
    if (seatInData) {
        await remove(seat.id)
    } else {
        await add(seat)
    }
}

async function checkData(id) {
    const tasksCollection = collection(fireStore, 'seats')
    const q = query(tasksCollection, where('id', '==', id), where('showtime_id', '==', showtimeId.value))
    const querySnapshot = await getDocs(q)
    return querySnapshot
}

async function add(seat) {
    try {
        const querySnapshot = await checkData(seat.id)
        if (!querySnapshot.empty) {
            return
        }
        if (selectedSeats.value.length >= 5) {
            showToast(t('message.error.MAXIMUM_ORDER'), ToastType.WARNING)
            return
        }
        if (selectedSeats.value.length > 0 && selectedSeats.value.length <= 5) {
            currentTime.value = selectedSeats.value[0].created_at
        }
        const newSeat = {
            id: seat.id,
            name: seat.name,
            user_id: userID.value,
            showtime_id: showtimeId.value,
            created_at: currentTime.value,
            status: false,
        }
        const tasksCollection = collection(fireStore, 'seats')
        await addDoc(tasksCollection, newSeat)
    } catch (error) {
        console.error('Error', error)
    }
}

async function remove(id) {
    const querySnapshot = await checkData(id)

    if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref
        await deleteDoc(docRef) // Xóa document
    }
}

let intervalId

const handleCountdown = (selectedSeats) => {
    intervalId = setInterval(async () => {
        const now = new Date().getTime()

        if (selectedSeats.value.length > 0 && selectedSeats.value.length <= 5) {
            currentTime.value = selectedSeats.value[0].created_at
        }
        const fiveMinLater = currentTime.value.toDate().getTime() + 4.5 * 60 * 1000
        const distance = fiveMinLater - now
        minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        seconds.value = Math.floor((distance % (1000 * 60)) / 1000)
        /** if the remaining transaction time is less than 0 seconds*/
        if (seconds.value <= 0 && minutes.value <= 0) {
            clear()
            const deletePromises = selectedSeats.value.map((seat) => {
                remove(seat.id)
            })
            await Promise.all(deletePromises)

            showToast(t('message.warning.EXPIRED_TIME'), ToastType.WARNING)
            router.push({ path: previousPath, replace: true })
        }
    }, 1000)
}

const checkOut = () => {
    if (selectedSeats.value.length > 0) {
        router.push({ name: 'checkout' })
    }

    showToast(t('message.warning.NO_SEAT'), ToastType.WARNING)
    return
}

const selectedSeats = computed(() => {
    return seatsFirebase.value.filter((seat) => seat.user_id === userID.value && seat.status === false)
})

const getShowtimeDetail = async () => {
    const response = await showtime.showtimeDetail(showtimeId.value)
    data.value = response.data
    seats.value = chunkArray(data.value.room.seats, data.value.room.column_number)
}

onMounted(async () => {
    isLoadingPage.value = true
    try {
        if (!showtimeId.value) {
            clear()
            showToast(t('message.error.UNEXPECTED_ERROR'), ToastType.WARNING)
            router.push({ path: previousPath, replace: true })
            return
        }
        await getShowtimeDetail()
        currentTime.value = Timestamp.fromDate(new Date())
        handleCountdown(selectedSeats)
    } catch (error) {
        clear()
        showToast(t('message.error.UNEXPECTED_ERROR'), ToastType.ERROR)
        router.push({ path: previousPath, replace: true })
    }
    isLoadingPage.value = false
    setupRealtimeListener()
})

onUnmounted(() => {
    clear()
})
</script>