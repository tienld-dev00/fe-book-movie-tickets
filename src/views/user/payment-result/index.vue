<template>
    <el-result
        v-if="paymentStatus"
        icon="success"
        title="Payment Successful"
        sub-title="
Your order has been placed. We will send you an email with your order details."
    >
        <template #extra>
            <el-button type="primary" @click="$router.push({ name: 'home', replace: true })">
                Return to Home Page
            </el-button>
        </template>
    </el-result>
    <el-result
        v-else
        icon="error"
        title="Payment Failed"
        sub-title="Sorry, there was an error processing your payment. Please try again using a different payment method."
    >
        <template #extra>
            <el-button type="primary" @click="$router.push({ name: 'home', replace: true })">
                Return to Home Page
            </el-button>
        </template>
    </el-result>
</template>

<script setup lang="ts">
const route = useRoute()
const paymentStatus = route.query.redirect_status === 'succeeded'
</script>
