<template>
    <div class="flex flex-col gap-2 p-3 overflow-auto">
        <div class="flex justify-between">
            <el-input style="width: 240px" placeholder="Type something">
                <template #prefix>
                    <el-icon class="el-input__icon"><search /></el-icon>
                </template>
            </el-input>
            <el-pagination background layout="prev, pager, next" :total="100" />
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
            <el-table-column fixed prop="id" label="Id" width="150" />
            <el-table-column label="Customer Info" min-width="300">
                <template #default="scope">
                    <ul class="text-sm font-normal">
                        <li>userId: {{ scope.row.user.id }}</li>
                        <li>cusId: {{ scope.row.user.stripe_id }}</li>
                        <li>name: {{ scope.row.user.name }}</li>
                    </ul>
                </template>
            </el-table-column>
            <el-table-column label="Order Info" width="120">
                <template #default="scope">
                    <ul>
                        <li>{{ scope.row.tickets.map((ticket) => ticket.seat_id) }}</li>
                        <li>amount: {{ scope.row.amount }}</li>
                    </ul>
                </template>
            </el-table-column>
            <el-table-column label="Status" min-width="120">
                <template #default="scope">
                    <el-tag>
                        {{ OrderStatus[scope.row.status] }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Transaction Id">
                <template #default="scope"> </template>
            </el-table-column>
            <el-table-column fixed="right" label="Operations" width="150">
                <template #default="scope">
                    <el-button link type="primary" size="small"> Detail </el-button>
                    <el-popconfirm title="Are you sure?" @confirm="handleRefundOrder(scope.row.id, scope.$index)">
                        <template #reference>
                            <el-button
                                type="primary"
                                link
                                size="small"
                                :disabled="scope.row.status !== OrderStatus.PAYMENT_SUCCEEDED"
                            >
                                Refund
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import { order } from '@/api/modules/order'
import { Order, OrderStatus } from '@/api/modules/order/types'
import { ToastType } from '@/types'
import { showToast } from '@/utils/toastHelper'
import { Search, Loading as LoadingIcon } from '@element-plus/icons-vue'

const orders = ref<Array<Order>>([])
const isLoadingTable = ref(true)

const handleRefundOrder = async (orderId: number, index: number) => {
    try {
        const res = await order.refund(orderId)
        console.log(res)
        orders.value[index].status = OrderStatus.REFUNDED
        showToast('Refund success!', ToastType.SUCCESS)
    } catch (error) {
        console.log(error)
        showToast('Refund failed!', ToastType.ERROR)
    }
}

onMounted(async () => {
    isLoadingTable.value = true
    const res = await order.list({})
    orders.value = res.data
    isLoadingTable.value = false
})
</script>
