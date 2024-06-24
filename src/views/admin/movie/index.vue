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
            <button
                @click="handleShowModalAddMovie"
                class="text-sm bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
                Create New Movie
                <el-icon :size="15">
                    <Plus style="cursor: pointer" />
                </el-icon>
            </button>
            <div class="mr-2">
                <span>items of all: </span>
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
        <el-table style="width: 100%" v-else :data="movies" :row-class-name="rowClassName">
            <el-table-column fixed prop="name" width="250">
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
                    <span>
                        <el-tag v-if="scope.row.status == 0" type="primary" round size="large" effect="dark">
                            Active
                        </el-tag>
                        <el-tag v-else type="warning" round size="large" effect="dark"> Hidden </el-tag>
                    </span>
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
            <el-table-column prop="age_limit" label="Age Limit" width="120">
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
            <el-table-column prop="total_orders" label="Total Orders" width="120">
                <template #header="scope">
                    <div class="flex items-center">
                        <span class="mr-2">Total Orders</span>
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
                    <el-button :icon="View" circle @click="handleShowModalMovieDetail(scope.row.slug)"></el-button>
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
        <el-dialog v-model="isShowMovieDetail" title="Movie detail" width="1000">
            <div
                v-if="isLoadingModal"
                class="el-loading-mask"
                style="display: flex; align-items: center; justify-content: center"
            >
                <el-icon class="is-loading" color="var(--el-color-primary)" :size="26">
                    <loading-icon />
                </el-icon>
            </div>
            <div v-else class="flex flex-col gap-3">
                <el-descriptions class="margin-top" :column="2" border>
                    <el-descriptions-item label="Name">
                        <span class="text-red-500 font-bold"> {{ modalMovieDetailData.name }}</span>
                    </el-descriptions-item>
                    <el-descriptions-item label="Status" :width="100">
                        <span>
                            <el-tag
                                v-if="modalMovieDetailData.status == 0"
                                type="primary"
                                round
                                size="large"
                                effect="dark"
                            >
                                Active
                            </el-tag>
                            <el-tag v-else type="warning" round size="large" effect="dark"> Hidden </el-tag>
                        </span>
                    </el-descriptions-item>
                    <el-descriptions-item label="Category" :span="2">
                        {{ modalMovieDetailData.category_name }}
                    </el-descriptions-item>
                    <el-descriptions-item label="Poster" :span="2" :width="150">
                        <img :src="modalMovieDetailData.image" alt="" class="w-1/2 mx-auto" />
                    </el-descriptions-item>
                    <el-descriptions-item label="Release Date" :span="2">
                        {{ dayjs(modalMovieDetailData.release_date).format('DD-MM-YYYY') }}
                    </el-descriptions-item>
                    <el-descriptions-item label="Age Limit" :span="2">
                        {{ modalMovieDetailData.age_limit }}
                    </el-descriptions-item>
                    <el-descriptions-item label="Duration" :span="2">
                        {{ modalMovieDetailData.duration }}
                    </el-descriptions-item>
                    <el-descriptions-item label="Description" :span="2">
                        {{ modalMovieDetailData.description }}
                    </el-descriptions-item>
                    <el-descriptions-item label="Trailer" :span="2">
                        <div class="w-fit mx-auto aspect-video w-full px-5">
                            <iframe width="100%" height="100%" :src="videoURL"> </iframe>
                        </div>
                    </el-descriptions-item>
                </el-descriptions>
            </div>
        </el-dialog>
        <el-dialog
            v-model="isCreateMovie"
            title="Create New Movie"
            width="1000"
            style="max-height: 90%; overflow-y: auto"
        >
            <div class="flex flex-col gap-3">
                <Form class="demo-form-inline" @submit="handleSubmitAddMovie">
                    <el-form-item label="Name:">
                        <Field name="name" :rules="isRequired" v-slot="{ field, meta }">
                            <el-input v-model="addMovie.name" v-bind="field" placeholder="Input the name" clearable />
                            <span class="text-red-600 text-xs" v-if="meta.touched && meta.errors.length">{{
                                meta.errors[0]
                            }}</span>
                        </Field>
                    </el-form-item>

                    <el-form-item label="Category:">
                        <Field name="category" :rules="isRequired" v-slot="{ field, meta }">
                            <el-select
                                v-model="addMovie.category_id"
                                v-bind="field"
                                placeholder="Choose the category"
                                clearable
                            >
                                <el-option
                                    v-for="category in categories"
                                    :key="category.id"
                                    :label="category.name"
                                    :value="category.id"
                                />
                            </el-select>
                            <span class="text-red-600 text-xs text-xs" v-if="meta.touched && meta.errors.length">{{
                                meta.errors[0]
                            }}</span>
                        </Field>
                    </el-form-item>

                    <el-form-item label="Release Date:">
                        <Field name="release_date" :rules="isRequired" v-slot="{ field, meta }">
                            <el-date-picker
                                v-model="addMovie.release_date"
                                v-bind="field"
                                type="date"
                                placeholder="Select release day"
                                class="mr-2"
                            />
                            <span class="text-red-600 text-xs text-xs" v-if="meta.touched && meta.errors.length">{{
                                meta.errors[0]
                            }}</span>
                        </Field>
                    </el-form-item>

                    <div class="flex justify-between mr-40">
                        <el-form-item label="Age Limit:">
                            <Field name="age_limit">
                                <el-input-number v-model="addMovie.age_limit" :min="0" :max="20" class="mr-2" />
                            </Field>
                        </el-form-item>

                        <el-form-item label="Duration:">
                            <Field name="duration">
                                <el-input-number v-model="addMovie.duration" :min="1" :max="300" class="mr-2" />
                            </Field>
                        </el-form-item>
                    </div>

                    <el-form-item label="Description:">
                        <Field name="description" :rules="isRequired" v-slot="{ field, meta }">
                            <el-input
                                v-bind="field"
                                v-model="addMovie.description"
                                :rows="5"
                                type="textarea"
                                placeholder="Please input"
                            />
                            <span class="text-red-600 text-xs text-xs" v-if="meta.touched && meta.errors.length">{{
                                meta.errors[0]
                            }}</span>
                        </Field>
                    </el-form-item>

                    <el-form-item label="Poster:">
                        <Field name="poster">
                            <input type="file" accept="image/*" class="mr-2" @change="handleFileChange($event)" />
                        </Field>
                    </el-form-item>
                    <img class="w-1/3 mt-2" :src="preUrlImage" alt="" />
                    <el-form-item label="Trailer:">
                        <Field name="trailer" :rules="isRequired" v-slot="{ field, meta }">
                            <el-input v-model="addMovie.trailer" v-bind="field" placeholder="Link of trailer" />
                            <span class="text-red-600 text-xs text-xs" v-if="meta.touched && meta.errors.length">{{
                                meta.errors[0]
                            }}</span>
                        </Field>
                    </el-form-item>

                    <button
                        type="submit"
                        class="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </Form>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { movie } from '@/api/modules/admin/movie'
import { category } from '@/api/modules/category'
import { FormSearchCategory } from '@/api/modules/category/types'
import { Meta, Order, OrderStatus, PaymentMethod } from '@/api/modules/admin/order/types'
import { ToastType } from '@/types'
import { showToast } from '@/utils/toastHelper'
import {
    Search,
    Loading as LoadingIcon,
    Delete,
    Edit,
    View,
    ArrowUpBold,
    ArrowDownBold,
    Plus,
} from '@element-plus/icons-vue'
import { dayjs } from 'element-plus'
import { Movie } from '@/api/modules/movie/types'
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const movies = ref<Array<Movie>>([])
const categories = ref()
const addMovie = ref({
    name: '',
    release_date: null,
    category_id: null,
    age_limit: 0,
    description: '',
    duration: 1,
    image: '',
    trailer: '',
})
const metaData = reactive({}) as Meta
const modalMovieDetailData = reactive({}) as Movie
const paramsGet = ref({
    per_page: 5,
    page: 1,
    key_word: '',
    sort_field: '',
    sort_direction: 'desc',
})
const isLoadingTable = ref(true)
const isLoadingModal = ref(false)
const isShowMovieDetail = ref(false)
const isCreateMovie = ref(false)
const perPageArray = [5, 10, 15]
let timeoutId: any = null
const videoURL = ref(null)
const formSearch = reactive<FormSearchCategory>({
    valueSearch: '',
})
const preUrlImage = ref('')

const handleSubmitAddMovie = async () => {
    try {
        addMovie.value.release_date = dayjs(addMovie.value.release_date).format(
            'YYYY-MM-DD HH:mm:ss'
        ) as unknown as Date
        const response = await movie.create(addMovie.value)
        if (response) {
            showToast('Movie created successfully', ToastType.SUCCESS)
            await getListMovies()
        }
    } catch (error) {
        showToast('Error when creating new movie', ToastType.ERROR)
    } finally {
        isCreateMovie.value = false
    }
}

const handleFileChange = (event) => {
    const file = event.target.files[0]
    addMovie.value.image = file
    preUrlImage.value = URL.createObjectURL(file)
}

function isRequired(value) {
    if (value) {
        return true
    }

    return 'This is required'
}

const rowClassName = ({ row }) => {
    return row.status == 1 ? '!bg-yellow-100' : ''
}

const getIdFromURL = (url) => {
    const regex =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    const match = url.match(regex)
    return match ? match[1] : ''
}

const handleShowModalMovieDetail = async (slug) => {
    isShowMovieDetail.value = true
    isLoadingModal.value = true
    const res = await movie.movieDetail(slug)
    Object.assign(modalMovieDetailData, res.data)
    videoURL.value = 'https://www.youtube.com/embed/' + getIdFromURL(modalMovieDetailData.trailer)
    isLoadingModal.value = false
}

const handleShowModalAddMovie = async () => {
    addMovie.value = {
        name: '',
        release_date: null,
        category_id: null,
        age_limit: 0,
        description: '',
        duration: 1,
        image: '',
        trailer: '',
    }
    await getListCategory()
    isCreateMovie.value = true
}

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

const getListCategory = async () => {
    const res = await category.list(formSearch)
    categories.value = res
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
<style scoped>
.error-message {
    color: red;
}
</style>