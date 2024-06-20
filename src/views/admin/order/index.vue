<template>
    <div class="flex flex-col justify-center gap-2 p-3 overflow-auto">
        <div class="flex justify-between">
            <el-input
                style="width: 240px"
                v-model="searchText"
                @input="handleSearchChange(searchText)"
                placeholder="Search by orderId, transId, cusId"
            >
                <template #prefix>
                    <el-icon class="el-input__icon"><search /></el-icon>
                </template>
            </el-input>
            <el-pagination
                background
                :current-page="metaData.current_page"
                :page-count="metaData.last_page"
                :page-size="metaData.per_page"
                :total="metaData.total"
                @current-change="handleCurrentPageChange"
                :disabled="isLoadingTable"
                layout="prev, pager, next"
            />
        </div>

        <div
            v-if="isLoadingTable"
            class="el-loading-mask"
            style="display: flex; align-items: center; justify-content: center"
        >
            <el-icon class="is-loading" color="var(--el-color-primary)" :size="26">
                <loading-icon />
            </el-icon>
        </div>
        <el-table v-else :data="orders" style="width: 100%">
            <el-table-column fixed prop="id" label="Id" width="300">
                <template #default="scope">
                    <ul class="text-sm font-normal">
                        <li><span class="font-semibold">OrderId: </span>{{ scope.row.id }}</li>
                        <li><span class="font-semibold">CustomerId:</span> {{ scope.row.user.stripe_id }}</li>
                        <li>
                            <span class="font-semibold">TransId:</span> {{ scope.row.payments[0].payment_intent_id }}
                        </li>
                    </ul>
                </template>
            </el-table-column>
            <el-table-column label="Customer Info" min-width="300">
                <template #default="scope">
                    <ul class="text-sm font-normal">
                        <li><span class="font-semibold">Name:</span> {{ scope.row.user.name }}</li>
                        <li><span class="font-semibold">Email:</span> {{ scope.row.user.email }}</li>
                    </ul>
                </template>
            </el-table-column>
            <el-table-column label="Order Info" width="300">
                <template #default="scope">
                    <ul class="text-sm font-normal">
                        <li>
                            <span class="font-semibold">Seats:</span>
                            {{ scope.row.tickets.map((ticket) => ticket.seat.name) }}
                        </li>
                        <li>
                            <span class="font-semibold">Amount:</span>
                            {{
                                new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                                    scope.row.amount
                                )
                            }}
                        </li>
                        <li>
                            <span class="font-semibold">Payment:</span> {{ PaymentMethod[scope.row.payment_method] }}
                        </li>
                        <li>
                            <el-tag
                                :type="['secondary', 'success', 'error', 'warning'][scope.row.status - 1]"
                                effect="plain"
                                round
                            >
                                {{ OrderStatus[scope.row.status] }}
                            </el-tag>
                        </li>
                    </ul>
                </template>
            </el-table-column>
            <el-table-column label="Timestamp" width="300">
                <template #default="scope">
                    <ul class="text-sm font-normal">
                        <li>
                            <span class="font-semibold">Created at:</span>
                            {{ dayjs(scope.row.created_at).format('HH:mm - DD/MM/YY') }}
                        </li>
                        <li>
                            <span class="font-semibold">Updated at:</span>
                            {{ dayjs(scope.row.updated_at).format('HH:mm - DD/MM/YY') }}
                        </li>
                    </ul>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="Operations" width="175">
                <template #default="scope">
                    <div class="flex">
                        <el-popconfirm title="Are you sure?" @confirm="handleRefundOrder(scope.row.id, scope.$index)">
                            <template #reference>
                                <el-button
                                    type="primary"
                                    size="small"
                                    :loading="loadingHandleRefund === scope.row.id"
                                    :disabled="scope.row.status !== OrderStatus.PAYMENT_SUCCEEDED"
                                >
                                    Refund
                                </el-button>
                            </template>
                        </el-popconfirm>
                        <el-button size="small" @click="handleShowModalOrderDetail(scope.row)">Detail</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="isShowModalOrderDetail" title="Order detail" width="1000">
            <div class="flex flex-col gap-3">
                <el-descriptions class="margin-top" :column="3" border>
                    <el-descriptions-item label="Order Id">
                        {{ modalOrderDetailData.id }}
                    </el-descriptions-item>
                    <el-descriptions-item label="Transaction Id">
                        {{ modalOrderDetailData.payments[0].payment_intent_id }}
                    </el-descriptions-item>
                    <el-descriptions-item label="Customer Id">
                        {{ modalOrderDetailData.user.stripe_id }}
                    </el-descriptions-item>
                    <el-descriptions-item label="Amount">
                        {{
                            new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                                modalOrderDetailData.amount
                            )
                        }}
                    </el-descriptions-item>
                    <el-descriptions-item label="Payment method">
                        {{ PaymentMethod[modalOrderDetailData.payment_method] }}
                    </el-descriptions-item>
                    <el-descriptions-item label="Showtime Id">
                        {{ modalOrderDetailData.showtime.id }}
                    </el-descriptions-item>
                    <el-descriptions-item label="Customer name">
                        {{ modalOrderDetailData.user.name }}
                    </el-descriptions-item>
                    <el-descriptions-item label="Email">
                        {{ modalOrderDetailData.user.email }}
                    </el-descriptions-item>
                    <el-descriptions-item label="Phone number">
                        {{ modalOrderDetailData.user?.phone_number ?? 'Empty' }}
                    </el-descriptions-item>
                    <el-descriptions-item label="Room">
                        {{ modalOrderDetailData.showtime.room }}
                    </el-descriptions-item>
                    <el-descriptions-item label="Time">
                        {{ dayjs(modalOrderDetailData.showtime.start_time).format('DD/MM/YY HH:MM') }} to
                        {{ dayjs(modalOrderDetailData.showtime.end_time).format('HH:MM') }}
                    </el-descriptions-item>
                    <el-descriptions-item label="Seats">
                        <div class="flex flex-wrap gap-2">
                            <el-tag type="primary" v-for="ticket in modalOrderDetailData.tickets">
                                {{ ticket.seat.name }}
                            </el-tag>
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item label="Movie" :span="3">
                        {{ modalOrderDetailData.showtime.movie }}
                    </el-descriptions-item>
                </el-descriptions>
                <el-collapse>
                    <el-collapse-item title="Payment timeline" name="1">
                        <el-timeline>
                            <el-timeline-item
                                v-for="(payment, index) in modalOrderDetailData.payments.sort((a, b) => b.id - a.id)"
                                :key="index"
                                :timestamp="dayjs(payment.created_at).format('DD/MM/YYYY - HH:MM')"
                            >
                                {{ payment.status }}
                            </el-timeline-item>
                        </el-timeline>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { order } from '@/api/modules/admin/order'
import { Meta, Order, OrderStatus, PaymentMethod } from '@/api/modules/admin/order/types'
import { ToastType } from '@/types'
import { showToast } from '@/utils/toastHelper'
import { Search, Loading as LoadingIcon } from '@element-plus/icons-vue'
import { dayjs } from 'element-plus'

const orders = ref<Array<Order>>([])
const modalOrderDetailData = reactive({}) as Order
const metaData = reactive({}) as Meta
const searchText = ref('')
const isLoadingTable = ref(true)
const loadingHandleRefund = ref(0)
const isShowModalOrderDetail = ref(false)
let timeoutId: any = null

const handleShowModalOrderDetail = (order: Order) => {
    Object.assign(modalOrderDetailData, order)
    isShowModalOrderDetail.value = true
}

const handleRefundOrder = async (orderId: number, index: number) => {
    loadingHandleRefund.value = orderId
    try {
        const res = await order.refund(orderId)
        orders.value[index].status = OrderStatus.REFUNDED
        orders.value[index].updated_at = new Date()

        if (res.code && res.code === 200) {
            showToast('Refund success!', ToastType.SUCCESS)
        }
    } catch (error) {
        console.log(error)
        showToast('Refund failed!', ToastType.ERROR)
    }
    loadingHandleRefund.value = 0
}

const handleCurrentPageChange = async (val: number) => {
    isLoadingTable.value = true
    const res = await order.list({ page: val })
    orders.value = res.data
    Object.assign(metaData, res.meta)
    isLoadingTable.value = false
}

const handleSearchChange = async (searchText: string) => {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(async () => {
        isLoadingTable.value = true
        const res = await order.list({ keyword: searchText })
        orders.value = res.data
        Object.assign(metaData, res.meta)
        isLoadingTable.value = false
    }, 500)
}

onMounted(async () => {
    isLoadingTable.value = true

    try {
        const res = await order.list({})
        orders.value = res.data
        Object.assign(metaData, res.meta)
    } catch (error) {
        showToast('Error when get list order.', ToastType.ERROR)
    }

    isLoadingTable.value = false
})
</script>
