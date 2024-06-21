<template>
    <div v-show="isLoadingPage" class="flex items-center justify-center h-screen">
        <base-loading :loading="isLoadingPage" />
    </div>
    <div
        v-show="!isLoadingPage"
        class="container flex flex-col items-center gap-3 px-10 py-6 mx-auto my-6 shadow-2xl lg:px-16 min-h-fit rounded-3xl"
    >
        <div class="flex items-center justify-between w-full py-3 border-b">
            <el-button type="primary" link :icon="ArrowLeft" @click="router.back()">Trở về</el-button>
            <p class="text-base font-medium">
                Giao dịch hết hạn sau:
                <span class="inline-flex justify-center w-8 p-1 text-white bg-black rounded-md">{{
                    `${minutes}`.toString().padStart(2, '0')
                }}</span>
                :
                <span class="inline-flex justify-center w-8 p-1 text-white bg-black rounded-md">{{
                    `${seconds}`.toString().padStart(2, '0')
                }}</span>
            </p>
        </div>
        <div class="flex flex-col w-full gap-6 md:flex-row">
            <div class="flex flex-col flex-1 gap-2 p-6 h-fit rounded-2xl bg-gray-25">
                <h3 class="text-2xl">Thông tin đơn hàng</h3>
                <hr />
                <!-- <span>Mã đơn: {{ orderId }}</span> -->
                <h4 class="text-base font-semibold">Đặt vé phim {{ showtimeData.movie?.name }}</h4>
                <span class="text-sm font-normal">
                    Bắt đầu ngày {{ showtimeData.start_time }} tại {{ showtimeData.room }}
                </span>
                <hr />
                <span>Ghế đã chọn</span>
                <div class="flex justify-between text-sm font-normal" v-for="item in seats" :key="item.id">
                    <span> Ghế {{ item.name }}</span>
                    <span class="font-bold">${{ showtimeData.price }}</span>
                </div>
                <hr />
                <div class="flex items-center justify-between">
                    <span>Tổng cộng</span>
                    <span class="text-lg font-bold text-blue-400">${{ showtimeData.price * seats.length }}</span>
                </div>
            </div>

            <form
                id="payment-form"
                @submit.prevent="handleSubmit()"
                class="flex py-6 flex-col flex-1 gap-2 [&>h3]:text-2xl"
            >
                <h3>Payment</h3>
                <div id="payment-element"></div>

                <button ref="btnSubmit" type="submit" id="submit" hidden></button>
                <el-button size="large" type="primary" :loading="isPaymentInProgress" @click="btnSubmit.click()">
                    Submit
                </el-button>
                <span class="text-red-300">{{ errorMessage }}</span>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue'
import { stripePaymentIntent } from '@/api/modules/payment'
import { ToastType } from '@/types'
import { fireStore } from '@/configs/firebase'
import { collection, onSnapshot, query, deleteDoc, where } from 'firebase/firestore'
import { showToast } from '@/utils/toastHelper'
import store from '@/store'
import { showtime } from '@/api/modules/showtime/index'
import { Showtime } from '@/api/modules/showtime/types'

const seats = ref<
    Array<{
        id: number
        user_id: number
        showtime_id: number
        name: string
        status: boolean
    }>
>([])

const showtimeData = reactive({}) as Showtime

const movie = reactive({
    id: 1,
    name: 'DORAEMON - NOBITA VÀ BẢN GIAO HƯỞNG ĐỊA CẦU ( LỒNG TIẾNG) (P)',
})

const room = reactive({
    id: 1,
    name: 'Room 1',
})

const router = useRouter()
const errorMessage = ref('')
const isPaymentInProgress = ref(false)
const isLoadingPage = ref(true)
const btnSubmit = ref()
const minutes = ref()
const seconds = ref()
const orderId = ref(0)

const previousPath = (router.options.history.state.back as string) ?? '/'
const showtimeId = store.getters['showtime/selectedShowtime']

let countDownDate: number
let isGetDataFirstTime = true
let intervalId: any
let unsubscribe: any
let stripe: any
let elements: any

const deleteAllSeatInFirestore = (docs) => {
    const deletePromises = docs.map((doc) => deleteDoc(doc.ref))
    Promise.all(deletePromises)
}

const handleCountdown = (docs) => {
    intervalId = setInterval(() => {
        const now = new Date().getTime()

        const distance = countDownDate - now
        minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        seconds.value = Math.floor((distance % (1000 * 60)) / 1000)

        /** if the remaining transaction time is less than 0 seconds and is not in the payment process */
        if (seconds.value <= 0 && minutes.value <= 0) {
            if (isPaymentInProgress.value) {
                clear()
                return
            }
            clear()
            deleteAllSeatInFirestore(docs)
            showToast('Đã hết thời gian giao dịch.', ToastType.WARNING)
            router.push({ path: previousPath, replace: true })
        }
    }, 1000)
}

const handleSubmit = async () => {
    errorMessage.value = ''
    isPaymentInProgress.value = true

    try {
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${import.meta.env.VITE_BASE_URL}/payment/result?order_id=${orderId.value}`,
            },
        })

        if (error) {
            console.log(error)
            errorMessage.value = error.message
        }
    } catch (error) {
        console.log(error)
    }

    isPaymentInProgress.value = false
}

const clear = () => {
    unsubscribe && unsubscribe()
    clearInterval(intervalId)
}

onMounted(async () => {
    try {
        if (!showtimeId) {
            router.push({ path: previousPath, replace: true })
            return
        }
        const res = await showtime.showtimeDetail(showtimeId)
        Object.assign(showtimeData, res.data)

        /** prepare query get seats selected from firebase */
        const tasksCollection = collection(fireStore, 'seats')
        const seatsSelectedQuery = query(
            tasksCollection,
            where('user_id', '==', 1),
            where('showtime_id', '==', showtimeId),
            where('status', '==', false)
        )

        unsubscribe = onSnapshot(seatsSelectedQuery, async (snapshot) => {
            if (isGetDataFirstTime) {
                isGetDataFirstTime = false

                /** Handle if no seat is selected */
                if (snapshot.empty) {
                    showToast('Vui lòng chọn ghế trước khi thanh toán.', ToastType.WARNING)
                    router.push({ path: previousPath, replace: true })

                    return
                }

                /** set countDownDate 4:30 minute from created_at of seat (all seats selected is same time created_at) */
                countDownDate = snapshot.docs[0].data().created_at.toDate().getTime() + 4.5 * 60 * 1000

                /** set value for seats */
                snapshot.forEach((document) => {
                    //@ts-ignore
                    seats.value.push(document.data())
                })

                /** Start countdown */
                handleCountdown(snapshot.docs)

                try {
                    /** if there are valid time seats  */
                    if (countDownDate - new Date().getTime() > 0) {
                        /** Create payment intent */
                        const response = await stripePaymentIntent.processPayment({
                            seats: toRaw(seats.value).map((seat) => seat.id),
                            showtime_id: showtimeId,
                        })

                        /** @ts-ignore */
                        stripe = Stripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY, {
                            betas: ['elements_customers_beta_1'],
                            apiVersion: '2024-04-10',
                        })

                        /** Set orderId */
                        orderId.value = response.data.orderId

                        /** submit payment form */
                        elements = stripe.elements({
                            clientSecret: response.data.clientSecret,
                            customerOptions: response.data.customerOptions,
                            loader: 'auto',
                        })

                        /** Render form payment */
                        const paymentElement = elements.create('payment')
                        paymentElement.mount('#payment-element')

                        isLoadingPage.value = false
                    }
                } catch (error) {
                    /** Error when create payment intent failed */
                    clear()
                    showToast('Đã xảy ra lỗi khi tạo giao dịch thanh toán. Vui lòng thử lại sau!', ToastType.ERROR)
                    console.log(error)
                    router.push({ path: previousPath, replace: true })
                }
            } else {
                /** Handle if seat selected was changed in firestore and transaction time has not yet expired */
                if (seconds.value > 0 && minutes.value > 0) {
                    clear()
                    showToast(
                        'Ghế đã chọn hết thời gian giữ chỗ hoặc đã được cập nhật. Vui lòng chọn lại ghế!',
                        ToastType.WARNING
                    )
                    router.push({ path: previousPath, replace: true })
                }
            }
        })
    } catch (error) {
        clear()
        showToast('Đã xảy ra lỗi khi tạo thanh toán cho đơn hàng của bạn. Vui lòng thử lại sau!', ToastType.ERROR)
        router.push({ path: previousPath, replace: true })
    }
})

onUnmounted(() => {
    clear()
})
</script>
