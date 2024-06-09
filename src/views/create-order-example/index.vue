<template>
    <div class="flex flex-col justify-center h-screen gap-2 mx-auto w-fit">
        <h2>Create seats in firebase</h2>
        <el-select v-model="userSelected" placeholder="Select user" style="width: 240px">
            <el-option v-for="item in userOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="showtimeSelected" placeholder="Select showtime" style="width: 240px">
            <el-option v-for="item in showtimeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="seatsSelected" multiple placeholder="Select seats" style="width: 240px">
            <el-option
                v-for="item in showtimeSelected === 1 ? seatsOptions1 : seatsOptions2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
        </el-select>
        <div class="flex">
            <el-button @click="handleCreateCollection" type="primary">Create</el-button>
            <el-button @click="$router.push({ name: 'checkout', force: true })" type="primary">Checkout</el-button>
        </div>
        <form id="payment-form" @submit.prevent="handleSubmit">
            <div id="card-element"></div>
            <button type="submit">Submit Payment</button>
        </form>
    </div>
</template>
<script setup lang="ts">
const userSelected = ref()
const userOptions = ref([
    {
        label: 'User 1',
        value: 1,
    },
    {
        label: 'User 2',
        value: 2,
    },
])
const showtimeSelected = ref()
const showtimeOptions = ref([
    {
        label: 'Show time 1',
        value: 1,
    },
    {
        label: 'Show time 2',
        value: 2,
    },
])
const seatsSelected = ref()
const seatsOptions1 = ref([
    {
        label: 'A1',
        value: 1,
    },
    {
        label: 'A2',
        value: 2,
    },
    {
        label: 'A3',
        value: 3,
    },
])
const seatsOptions2 = ref([
    {
        label: 'B1',
        value: 4,
    },
    {
        label: 'B2',
        value: 5,
    },
    {
        label: 'B3',
        value: 6,
    },
])

let unsubscribe: any

import { collection, addDoc, onSnapshot, query } from 'firebase/firestore'
import { fireStore } from '@/configs/firebase'

//@ts-ignore
const stripe = Stripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY, {
    betas: ['elements_customers_beta_1'],
    apiVersion: '2024-04-10',
})
const elements = stripe.elements()
const card = elements.create('card')

const handleSubmit = () => {
    stripe
        .createPaymentMethod({
            type: 'card',
            card: card,
        })
        .then(function (result) {
            if (result.error) {
                console.error(result.error)
            } else {
                console.log(result.paymentMethod)
                // Send paymentMethod.id to your server
                console.log(result.paymentMethod.id)
                // fetch('/create-customer', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({
                //         email: 'customer@example.com', // replace with actual email
                //         paymentMethodId: result.paymentMethod.id,
                //     }),
                // })
                //     .then((response) => response.json())
                //     .then((data) => {
                //         console.log(data)
                //     })
            }
        })
}

const handleCreateCollection = async () => {
    try {
        await seatsSelected.value.forEach(async (seatSelected) => {
            await addDoc(collection(fireStore, 'seats'), {
                created_at: new Date(),
                id: seatSelected,
                name: [...seatsOptions1.value, ...seatsOptions2.value].find((item) => item.value === seatSelected)
                    ?.label,
                status: false,
                showtime_id: showtimeSelected.value,
                user_id: userSelected.value,
            })
        })
    } catch (e) {
        console.error('Error adding document: ', e)
    }
}

onMounted(async () => {
    card.mount('#card-element')
    const q = query(collection(fireStore, 'seats'))
    unsubscribe = onSnapshot(q, (querySnapshot) => {
        const seats: any = []
        querySnapshot.forEach((doc) => {
            seats.push(doc.data())
        })
        console.log('seats ', seats)
    })
})

onUnmounted(() => {
    unsubscribe && unsubscribe()
})
</script>
