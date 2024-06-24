<template>
    <div class="flex flex-col justify-center gap-2 p-3 overflow-auto">
        <div class="flex justify-between gap-3">
            <el-input
                style="width: 240px"
                v-model="searchText"
                @input="handleSearchChange(searchText)"
                placeholder="Search by room name"
                class="mr-auto"
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
            <el-button type="primary" @click="handleShowModalNewRoom">Add Room</el-button>
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
        <el-table v-else :data="rooms" style="width: 100%">
            <el-table-column prop="name" label="Room name" />
            <el-table-column label="Seats" width="300">
                <template #default="scope">
                    <span>
                        {{ scope.row.row_number }} x {{ scope.row.column_number }} ({{
                            scope.row.row_number * scope.row.column_number
                        }})
                    </span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="Operations" width="175">
                <template #default="scope">
                    <div class="flex">
                        <el-popconfirm title="Are you sure?" @confirm="handleDeleteRoom(scope.row.id)">
                            <template #reference>
                                <el-button size="small" type="danger">Delete</el-button>
                            </template>
                        </el-popconfirm>
                        <el-button size="small" @click="handleShowModalUpdateRoom(scope.row)">Edit</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="isShowModalCreateRoom" title="Create New Room" class="!w-fit">
            <div class="flex flex-col gap-3">
                <el-form ref="formCreateRoomRef" v-model="roomForm" class="flex justify-center w-full gap-2">
                    <el-form-item label="Room name" prop="name">
                        <el-input v-model="roomForm.name" />
                    </el-form-item>
                    <el-form-item label="Row">
                        <el-input-number
                            @change="handleChangeRoomSize()"
                            v-model="roomForm.row_number"
                            :min="1"
                            :max="15"
                            controls-position="right"
                        />
                    </el-form-item>
                    <el-form-item label="Column">
                        <el-input-number
                            @change="handleChangeRoomSize"
                            v-model="roomForm.column_number"
                            :min="1"
                            :max="25"
                            controls-position="right"
                        />
                    </el-form-item>
                    <el-button
                        type="primary"
                        :disabled="!roomForm.name.trim()"
                        :loading="isLoadingCreateRoom"
                        @click="handleCreateRoom()"
                    >
                        Create
                    </el-button>
                </el-form>
                <div class="flex flex-col w-full gap-3">
                    <div v-for="(seats, key) in seatsData" class="flex items-center gap-4 mx-auto">
                        <span class="text-lg !w-6 font-bold">{{ key }}</span>
                        <span
                            v-for="seat in seats"
                            class="inline-flex font-medium text-xs items-center justify-center !w-8 !h-8 p-3 bg-slate-200 border-2 rounded cursor-pointer hover:opacity-80 border-slate-500"
                        >
                            {{ seat.name }}
                        </span>
                    </div>
                </div>
            </div>
        </el-dialog>
        <el-dialog v-model="isShowModalUpdateRoom" title="Room Detail" width="1000">
            <div
                v-if="isLoadingUpdateModal"
                class="el-loading-mask"
                style="display: flex; align-items: center; justify-content: center"
            >
                <el-icon class="is-loading" color="var(--el-color-primary)" :size="26">
                    <loading-icon />
                </el-icon>
            </div>
            <div v-else class="flex flex-col gap-3">
                <el-form ref="formCreateRoomRef" v-model="roomForm" class="flex justify-center w-full gap-2">
                    <el-form-item label="Room name" prop="name">
                        <el-input v-model="roomForm.name" />
                    </el-form-item>
                    <el-form-item label="Row">
                        <el-input-number
                            @change="handleChangeRoomSize()"
                            v-model="roomForm.row_number"
                            :min="1"
                            :max="15"
                            controls-position="right"
                        />
                    </el-form-item>
                    <el-form-item label="Column">
                        <el-input-number
                            @change="handleChangeRoomSize"
                            v-model="roomForm.column_number"
                            :min="1"
                            :max="25"
                            controls-position="right"
                        />
                    </el-form-item>
                    <el-button
                        type="primary"
                        :disabled="!roomForm.name.trim()"
                        :loading="isLoadingUpdateRoom"
                        @click="handleUpdateRoom()"
                    >
                        Update
                    </el-button>
                </el-form>
                <div class="flex flex-col w-full gap-3">
                    <div v-for="(seats, key) in seatsData" class="flex items-center gap-4 mx-auto">
                        <span class="text-lg !w-6 font-bold">{{ key }}</span>
                        <span
                            v-for="seat in seats"
                            class="inline-flex font-medium text-xs items-center justify-center !w-8 !h-8 p-3 bg-slate-200 border-2 rounded cursor-pointer hover:opacity-80 border-slate-500"
                        >
                            {{ seat.name }}
                        </span>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { room } from '@/api/modules/admin/room'
import { Meta, Room, RoomDetail, Seat } from '@/api/modules/admin/room/types'
import { ToastType } from '@/types'
import { showToast } from '@/utils/toastHelper'
import { Search, Loading as LoadingIcon } from '@element-plus/icons-vue'
import { FormInstance } from 'element-plus'

const rooms = ref<Array<Room>>([])
const roomForm = reactive({ name: '' }) as RoomDetail
const metaData = reactive({}) as Meta
const searchText = ref('')
const isLoadingTable = ref(true)
const isShowModalUpdateRoom = ref(false)
const isShowModalCreateRoom = ref(false)
const isLoadingCreateRoom = ref(false)
const isLoadingUpdateRoom = ref(false)
const seatsData = ref<Seats>({})
const formCreateRoomRef = ref<FormInstance>()
const isLoadingUpdateModal = ref(false)

let timeoutId: any = null

export type Seats = {
    [key: string]: { name: string }[]
}

const handleShowModalUpdateRoom = async (roomData: Room) => {
    isLoadingUpdateModal.value = true
    isShowModalUpdateRoom.value = true

    try {
        const res = await room.detail(roomData.id)
        Object.assign(roomForm, res.data)
        seatsData.value = chunkArray(res.data.seats, res.data.column_number)
        isLoadingUpdateModal.value = false
    } catch (error) {
        console.log('🚀 ~ handleShowModalUpdateRoom ~ error:', error)
        showToast('Error when get detail room', ToastType.ERROR)
    }

    isLoadingUpdateModal.value = false
}

const handleShowModalNewRoom = async () => {
    Object.assign(roomForm, { row_number: 7, column_number: 12, name: '' })
    seatsData.value = generatorSeats(7, 12)
    isShowModalCreateRoom.value = true
}

const handleCurrentPageChange = async (val: number) => {
    try {
        isLoadingTable.value = true
        const res = await room.list({ page: val })
        rooms.value = res.data
        Object.assign(metaData, res.meta)
    } catch (error) {
        console.log('🚀 ~ handleCurrentPageChange ~ error:', error)
        showToast('Error when get list room', ToastType.ERROR)
    }

    isLoadingTable.value = false
}

const handleSearchChange = async (searchText: string) => {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(async () => {
        isLoadingTable.value = true
        try {
            const res = await room.list({ keyword: searchText })
            rooms.value = res.data
            Object.assign(metaData, res.meta)
        } catch (error) {
            console.log('🚀 ~ timeoutId=setTimeout ~ error:', error)
            showToast('Error when search room. Please try again later.', ToastType.ERROR)
        }
        isLoadingTable.value = false
    }, 500)
}

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

const generatorSeats = (row: number, col: number) => {
    let newSeatObject: Seats = {}

    for (let i = 0; i < row; i++) {
        const key = convertNumberToAlphabet(i)
        newSeatObject[key] = Array(col)
            .fill({ name: `${key}${i + 1}` })
            .map((_, i) => {
                return { name: key + (i + 1) }
            })
    }

    return newSeatObject
}

const handleChangeRoomSize = () => {
    seatsData.value = generatorSeats(roomForm.row_number, roomForm.column_number)
}

const handleCreateRoom = async () => {
    isLoadingCreateRoom.value = true

    try {
        const res = await room.create({
            name: '',
            row_number: roomForm.row_number,
            column_number: roomForm.column_number,
            seats: Object.values(JSON.parse(JSON.stringify(seatsData.value))).flat(1) as Seat[],
        })
        isShowModalCreateRoom.value = false
        showToast(res.message, ToastType.SUCCESS)
        clearRoomForm()
        await getListRoom()
    } catch (error) {
        console.log('🚀 ~ handleCreateRoom ~ error:', error)
        showToast('Error when create room. please try again later', ToastType.ERROR)
    }

    isLoadingCreateRoom.value = false
}

const handleUpdateRoom = async () => {
    isLoadingUpdateRoom.value = true

    try {
        const res = await room.update({
            id: roomForm.id,
            name: roomForm.name,
            row_number: roomForm.row_number,
            column_number: roomForm.column_number,
            seats: Object.values(JSON.parse(JSON.stringify(seatsData.value))).flat(1) as Seat[],
        })
        await getListRoom()
        showToast(res.message, ToastType.SUCCESS)
    } catch (error) {
        console.log('🚀 ~ handleUpdateRoom ~ error:', error)
        showToast('Error when update room. Please try again later', ToastType.ERROR)
    }

    isLoadingUpdateRoom.value = false
}

const handleDeleteRoom = async (roomId: number) => {
    isLoadingTable.value = true

    try {
        const res = await room.delete(roomId)
        showToast(res.message, ToastType.SUCCESS)
    } catch (error) {
        console.log('🚀 ~ handleDeleteRoom ~ error:', error)
        showToast('Error when delete room. Please try again later', ToastType.ERROR)
    }

    await getListRoom()
    isLoadingTable.value = false
}

const getListRoom = async () => {
    try {
        const res = await room.list({ page: metaData.current_page, keyword: searchText.value })
        rooms.value = res.data
        Object.assign(metaData, res.meta)
    } catch (error) {
        console.log('🚀 ~ getListRoom ~ error:', error)
        showToast('Error when get list room. Please try again later!', ToastType.ERROR)
    }
}

const clearRoomForm = () => {
    roomForm.name = ''
    roomForm.column_number = 12
    roomForm.row_number = 7
}

onMounted(async () => {
    isLoadingTable.value = true
    await getListRoom()
    isLoadingTable.value = false
})
</script>
