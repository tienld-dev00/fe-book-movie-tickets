<!-- <template>Payment {{ route.query.redirect_status }}</template> -->
<template>
    <el-result
        v-if="paymentStatus"
        icon="success"
        title="Thanh toán thành công"
        sub-title="
Đơn hàng của bạn đã được đặt. Chúng tôi sẽ gửi cho bạn một
email với chi tiết đơn đặt hàng của bạn."
    >
        <template #extra>
            <el-button type="primary" @click="$router.push({ name: 'home', replace: true })">
                Trở về trang chủ
            </el-button>
        </template>
    </el-result>
    <el-result
        v-else
        icon="error"
        title="Thanh toán thất bại"
        sub-title="Rất tiếc, đã xảy ra lỗi khi xử lý khoản thanh
toán của bạn. Vui lòng thử lại bằng phương thức
thanh toán khác."
    >
        <template #extra>
            <el-button type="primary" @click="$router.push({ name: 'home', replace: true })">
                Trở về trang chủ
            </el-button>
        </template>
    </el-result>
</template>

<script setup lang="ts">
const route = useRoute()
const paymentStatus = route.query.redirect_status === 'succeeded'
</script>
