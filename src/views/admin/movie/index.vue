<template>
    <div class="flex flex-col justify-center gap-2 p-3 overflow-auto">
        <div class="flex justify-between">
            <el-input
                style="width: 240px"
                @input="handleSearch()"
                v-model="paramsGet.key_word"
                placeholder="Search by ..."
            >
                <template #prefix>
                    <el-icon class="el-input__icon"><search /></el-icon>
                </template>
            </el-input>
            <div class="mr-2">
                <span>item of all: </span>
                <el-select
                    v-model="paramsGet.per_page"
                    placeholder="Select"
                    size="small"
                    style="width: 50px"
                    @change="getListMovies()"
                >
                    <el-option v-for="(item, index) in perPageArray" :key="index" :label="item" :value="item" />
                </el-select>
            </div>
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
        <el-table style="width: 100%" v-else :data="movies">
            <el-table-column fixed prop="name" width="300">
                <template #header="scope">
                    <div class="flex items-center">
                        <span class="mr-2">Name</span>
                        <div class="flex flex-col" @click="sort(scope.column.property)">
                            <el-icon :size="10">
                                <ArrowUpBold style="cursor: pointer" />
                            </el-icon>
                            <el-icon :size="10">
                                <ArrowDownBold style="cursor: pointer" />
                            </el-icon>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="release_date" min-width="100">
                <template #default="scope">
                    <span>{{ dayjs(scope.row.release_date).format('DD-MM-YYYY') }}</span>
                </template>
                <template #header="scope">
                    <div class="flex items-center">
                        <span class="mr-2">Release Date</span>
                        <div class="flex flex-col" @click="sort(scope.column.property)">
                            <el-icon :size="10">
                                <ArrowUpBold style="cursor: pointer" />
                            </el-icon>
                            <el-icon :size="10">
                                <ArrowDownBold style="cursor: pointer" />
                            </el-icon>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="image" label="Poster" max-width="100">
                <template #default="scope">
                    <img :src="scope.row.image" alt="" />
                </template>
                <template #header="scope">
                    <div class="flex items-center">
                        <span class="mr-2">Poster</span>
                        <div class="flex flex-col" @click="sort(scope.column.property)">
                            <el-icon :size="10">
                                <ArrowUpBold style="cursor: pointer" />
                            </el-icon>
                            <el-icon :size="10">
                                <ArrowDownBold style="cursor: pointer" />
                            </el-icon>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="status" width="100">
                <template #default="scope">
                    <span>{{ scope.row.status == 0 ? 'Showing' : 'Hidden' }}</span>
                </template>
                <template #header="scope">
                    <div class="flex items-center">
                        <span class="mr-2">Status</span>
                        <div class="flex flex-col" @click="sort(scope.column.property)">
                            <el-icon :size="10">
                                <ArrowUpBold style="cursor: pointer" />
                            </el-icon>
                            <el-icon :size="10">
                                <ArrowDownBold style="cursor: pointer" />
                            </el-icon>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="category_name" label="Category" width="200">
                <template #header="scope">
                    <div class="flex items-center">
                        <span class="mr-2">Category</span>
                        <div class="flex flex-col" @click="sort(scope.column.property)">
                            <el-icon :size="10">
                                <ArrowUpBold style="cursor: pointer" />
                            </el-icon>
                            <el-icon :size="10">
                                <ArrowDownBold style="cursor: pointer" />
                            </el-icon>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="duration" label="Duration" min-width="100">
                <template #default="scope">
                    <span>{{ scope.row.duration + ' min' }}</span>
                </template>
                <template #header="scope">
                    <div class="flex items-center">
                        <span class="mr-2">Duration</span>
                        <div class="flex flex-col" @click="sort(scope.column.property)">
                            <el-icon :size="10">
                                <ArrowUpBold style="cursor: pointer" />
                            </el-icon>
                            <el-icon :size="10">
                                <ArrowDownBold style="cursor: pointer" />
                            </el-icon>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="age_limit" label="Age Limit" width="100">
                <template #header="scope">
                    <div class="flex items-center">
                        <span class="mr-2">Age Limit</span>
                        <div class="flex flex-col" @click="sort(scope.column.property)">
                            <el-icon :size="10">
                                <ArrowUpBold style="cursor: pointer" />
                            </el-icon>
                            <el-icon :size="10">
                                <ArrowDownBold style="cursor: pointer" />
                            </el-icon>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="Action" width="150" header-align="center" align="center">
                <template #default="scope">
                    <el-button :icon="View" circle></el-button>
                    <el-button type="warning" :icon="Edit" circle></el-button>
                    <el-button type="danger" :icon="Delete" circle />
                    <div class="mt-2">
                        <el-button type="success" marginTop="20px"> Show/Hide </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            :current-page="metaData.current_page"
            :page-count="metaData.last_page"
            :page-size="metaData.per_page"
            :total="metaData.total"
            @current-change="handlePageChange"
            :disabled="isLoadingTable"
            layout="prev, pager, next"
        />
    </div>
</template>

<script lang="ts" setup>
import { movie } from '@/api/modules/movie'
import { Meta, Order, OrderStatus, PaymentMethod } from '@/api/modules/admin/order/types'
import { ToastType } from '@/types'
import { showToast } from '@/utils/toastHelper'
import { Search, Loading as LoadingIcon, Delete, Edit, View, ArrowUpBold, ArrowDownBold } from '@element-plus/icons-vue'
import { dayjs } from 'element-plus'

const movies = ref<Array<Order>>([])
const metaData = reactive({}) as Meta
const paramsGet = ref({
    per_page: 5,
    page: 1,
    key_word: '',
    sort_field: '',
    sort_direction: 'desc',
})
const isLoadingTable = ref(true)
const isShowModalOrderDetail = ref(false)
const perPageArray = [5, 10, 15]
let timeoutId: any = null

// const handleShowModalOrderDetail = (order: Order) => {
//     Object.assign(modalOrderDetailData, order)
//     isShowModalOrderDetail.value = true
// }

const handlePageChange = (newPage) => {
    paramsGet.value.page = newPage
    getListMovies()
}

const sort = (sortField) => {
    paramsGet.value.sort_field = sortField
    paramsGet.value.sort_direction = paramsGet.value.sort_direction === 'asc' ? 'desc' : 'asc'
    getListMovies()
}

const handleSearch = async () => {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(async () => {
        isLoadingTable.value = true
        paramsGet.value.page = 1
        await getListMovies()
        isLoadingTable.value = false
    }, 500)
}

const getListMovies = async () => {
    isLoadingTable.value = true
    const res = await movie.list(paramsGet.value)
    movies.value = res.data.data
    Object.assign(metaData, res.data.meta)
    isLoadingTable.value = false
}

onMounted(async () => {
    try {
        await getListMovies()
    } catch (error) {
        showToast('Error when get list movies.', ToastType.ERROR)
    }
})
</script>