<template>
    <div class="overflow-auto">
        <el-calendar ref="calendar" class="[&>el-calendar__body]:hidden" :value="date">
            <template #date-cell="{ data }">
                <div
                    @click="
                        () => {
                            dialogFormCreateShowtimeVisible = true
                            formCreateShowtime.date = data.day
                        }
                    "
                    :class="{
                        'flex flex-col h-full gap-1 ': true,
                        'opacity-40': dayjs(data.day).isBefore(dayjs(new Date()), 'date'),
                    }"
                >
                    <span class="text-xs">{{ data.day.split('-').slice(2)[0] }}</span>
                    <div class="flex flex-col h-full gap-1 overflow-x-hidden overflow-y-auto">
                        <div
                            @click.stop="handleShowUpdateShowtime(showtime)"
                            class="flex flex-col text-xs"
                            v-for="showtime in getShowtimesByDate(data.day)"
                        >
                            <div
                                :class="{
                                    'flex flex-col p-1 text-white bg-gray-500 rounded-lg hover:opacity-80': true,
                                    '!bg-blue-500': showtime.status === 0,
                                    '!bg-purple-500': showtime.status === 1,
                                }"
                            >
                                <span class="truncate" :title="showtime.movie">
                                    {{ showtime.movie }}
                                </span>
                                <span>
                                    {{
                                        dayjs(showtime.start_time).format('HH:mm') +
                                        ' - ' +
                                        dayjs(showtime.end_time).format('HH:mm')
                                    }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template #header="{ date }">
                <div class="flex flex-col w-full gap-3 items-top">
                    <el-form class="flex items-center gap-3 justify-end flex-1 !h-fit">
                        <el-form-item label="Movie" class="flex-1 !mb-0">
                            <el-select
                                v-model="filterForm.movieId"
                                filterable
                                clearable
                                remote
                                size="small"
                                reserve-keyword
                                placeholder="Enter a movie name"
                                remote-show-suffix
                                :remote-method="remoteMethodMovie"
                                :loading="loadingSearchMovie"
                            >
                                <el-option
                                    v-for="item in movieOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :disabled="item.status === 1"
                                    :value="item.id"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item class="flex-1 !mb-0" label="Room">
                            <el-select
                                v-model="filterForm.roomId"
                                filterable
                                remote
                                clearable
                                size="small"
                                reserve-keyword
                                placeholder="Enter a room name"
                                remote-show-suffix
                                :remote-method="remoteMethodRoom"
                                :loading="loadingSearchRoom"
                            >
                                <el-option
                                    v-for="item in roomOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item class="flex-1 !mb-0" label="Status">
                            <el-select v-model="filterForm.status" placeholder="Select" size="small">
                                <el-option label="All" value="all" />
                                <el-option label="Public" value="0" class="text-blue-500" />
                                <el-option label="Private" value="1" class="text-purple-500" />
                            </el-select>
                        </el-form-item>
                        <!-- <el-button
                            type="primary"
                            @click="
                                () => {
                                    formCreateShowtime.date = new Date()
                                    dialogFormCreateShowtimeVisible = true
                                }
                            "
                        >
                            Add Showtime
                        </el-button> -->
                    </el-form>
                    <div class="flex justify-between gap-2 items-top">
                        <span>{{ date }}</span>
                        <el-button-group>
                            <el-button size="small" @click="selectDate('prev-year')"> Previous Year </el-button>
                            <el-button size="small" @click="selectDate('prev-month')"> Previous Month </el-button>
                            <el-button size="small" @click="selectDate('today')">Today</el-button>
                            <el-button size="small" @click="selectDate('next-month')"> Next Month </el-button>
                            <el-button size="small" @click="selectDate('next-year')"> Next Year </el-button>
                        </el-button-group>
                    </div>
                </div>
            </template>
        </el-calendar>
    </div>
    <el-dialog v-model="dialogFormCreateShowtimeVisible" width="500">
        <template #header>
            <div class="flex items-center justify-between">
                <span>Add showtime</span>
                <el-switch
                    v-model="formCreateShowtime.status"
                    :disabled="dayjs(formCreateShowtime.date).isBefore(dayjs(new Date()), 'date')"
                    style="--el-switch-on-color: #409eff; --el-switch-off-color: #a855f7"
                    inline-prompt
                    active-text="Public"
                    inactive-text="private"
                />
            </div>
        </template>
        <el-form
            :disabled="dayjs(formCreateShowtime.date).isBefore(dayjs(new Date()), 'date')"
            class="flex flex-col"
            label-position="top"
        >
            <el-form-item label="Start day">
                <el-date-picker
                    v-model="formCreateShowtime.date"
                    type="date"
                    :disabled-date="disabledDate"
                    class="!w-full"
                    placeholder="Pick a day"
                />
            </el-form-item>
            <el-form-item label="Select movie">
                <el-select
                    v-model="formCreateShowtime.movieId"
                    filterable
                    remote
                    reserve-keyword
                    placeholder="Please enter a movie name"
                    remote-show-suffix
                    :remote-method="remoteMethodMovie"
                    :loading="loadingSearchMovie"
                >
                    <el-option
                        v-for="item in movieOptions"
                        :key="item.id"
                        :label="item.name"
                        :disabled="item.status === 1"
                        :value="item.id"
                    />
                </el-select>
            </el-form-item>

            <div class="flex flex-col">
                <div class="flex flex-1 gap-1">
                    <el-form-item class="flex-1" label="Select room">
                        <el-select
                            v-model="formCreateShowtime.roomId"
                            filterable
                            remote
                            reserve-keyword
                            placeholder="Please enter a room name"
                            remote-show-suffix
                            :remote-method="remoteMethodRoom"
                            :loading="loadingSearchRoom"
                        >
                            <el-option v-for="item in roomOptions" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item class="flex-1" label="Price ($)">
                        <el-input
                            type="number"
                            v-model="formCreateShowtime.price"
                            class="!w-full"
                            :precision="2"
                            :min="0"
                            :step="5"
                        />
                    </el-form-item>
                </div>
                <div class="flex flex-1 gap-1">
                    <el-form-item
                        class="flex-1"
                        label="Start time"
                        :error="
                            checkOverlap(
                                formCreateShowtime,
                                getShowtimesByDate(formCreateShowtime.date + ' ' + formCreateShowtime.start_time)
                            )
                                ? 'Overlap with another showtime'
                                : ''
                        "
                    >
                        <el-time-select
                            v-model="formCreateShowtime.start_time"
                            start="00:00"
                            step="00:15"
                            end="23:45"
                            placeholder="Select start time"
                        />
                    </el-form-item>
                    <el-form-item class="flex-1" label="Duration">
                        <el-input type="number" :min="5" :step="5" v-model="formCreateShowtime.duration"></el-input>
                    </el-form-item>
                </div>
            </div>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormCreateShowtimeVisible = false">Cancel</el-button>
                <el-button
                    v-if="!dayjs(formCreateShowtime.date).isBefore(dayjs(new Date()), 'date')"
                    type="primary"
                    :loading="isLoadingCreateShowtime"
                    @click="handleCreateRoom"
                    :disabled="!checkValidFormCreateShowtime()"
                >
                    Create
                </el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="dialogFormUpdateShowtimeVisible" title="Showtime" width="500">
        <template #header>
            <div class="flex items-center justify-between">
                <span>Showtime</span>
                <el-switch
                    v-model="formUpdateShowtime.status"
                    style="--el-switch-on-color: #409eff; --el-switch-off-color: #a855f7"
                    inline-prompt
                    :disabled="dayjs(formUpdateShowtime.date).isBefore(dayjs(new Date()), 'date')"
                    active-text="Public"
                    inactive-text="private"
                />
            </div>
        </template>
        <el-form
            class="flex flex-col"
            label-position="top"
            :disabled="dayjs(formUpdateShowtime.date).isBefore(dayjs(new Date()), 'date')"
        >
            <el-form-item label="Start day">
                <el-date-picker
                    v-model="formUpdateShowtime.date"
                    type="date"
                    :disabled-date="disabledDate"
                    class="!w-full"
                    placeholder="Pick a day"
                />
            </el-form-item>
            <el-form-item label="Select movie">
                <el-select
                    v-model="formUpdateShowtime.newMovieId"
                    filterable
                    remote
                    reserve-keyword
                    :placeholder="formUpdateShowtime.movieName"
                    remote-show-suffix
                    :remote-method="remoteMethodMovie"
                    :loading="loadingSearchMovie"
                >
                    <el-option
                        v-for="item in movieOptions"
                        :key="item.id"
                        :label="item.name"
                        :disabled="item.status === 1"
                        :value="item.id"
                    />
                </el-select>
            </el-form-item>

            <div class="flex flex-col">
                <div class="flex flex-1 gap-1">
                    <el-form-item class="flex-1" label="Select room">
                        <el-select
                            v-model="formUpdateShowtime.newRoomId"
                            filterable
                            remote
                            reserve-keyword
                            :placeholder="formUpdateShowtime.roomName"
                            remote-show-suffix
                            :remote-method="remoteMethodRoom"
                            :loading="loadingSearchRoom"
                        >
                            <el-option v-for="item in roomOptions" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item class="flex-1" label="Price ($)">
                        <el-input
                            type="number"
                            v-model="formCreateShowtime.price"
                            class="!w-full"
                            :precision="2"
                            :min="0"
                            :step="5"
                        />
                    </el-form-item>
                </div>
                <div class="flex flex-1 gap-1">
                    <el-form-item
                        class="flex-1"
                        :error="
                            checkOverlap(
                                formUpdateShowtime,
                                getShowtimesByDate(formUpdateShowtime.date + ' ' + formUpdateShowtime.start_time)
                            )
                                ? 'Overlap with another showtime'
                                : ''
                        "
                        label="Start time"
                    >
                        <el-time-select
                            v-model="formUpdateShowtime.start_time"
                            start="00:00"
                            step="00:15"
                            end="23:45"
                            placeholder="Select start time"
                        />
                    </el-form-item>
                    <el-form-item class="flex-1" label="Duration">
                        <el-input type="number" :min="5" :step="5" v-model="formUpdateShowtime.duration"></el-input>
                    </el-form-item>
                </div>
            </div>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormUpdateShowtimeVisible = false">Cancel</el-button>
                <el-button
                    v-if="!dayjs(formUpdateShowtime.date).isBefore(dayjs(new Date()), 'date')"
                    type="primary"
                    :loading="isLoadingUpdateShowtime"
                    @click="handleUpdateShowtime"
                    :disabled="!checkValidFormUpdateShowtime()"
                >
                    Update
                </el-button>
                <el-popconfirm title="Are you sure?" @confirm="handleDeleteShowtime(formUpdateShowtime.id)">
                    <template #reference>
                        <el-button
                            :title="
                                formUpdateShowtime.total_success_order
                                    ? `You cannot delete this showtime that already has ${formUpdateShowtime.total_success_order} orders placed`
                                    : ''
                            "
                            type="danger"
                            v-if="!dayjs(formUpdateShowtime.date).isBefore(dayjs(new Date()), 'date')"
                            :loading="isLoadingUpdateShowtime"
                            :disabled="formUpdateShowtime.total_success_order > 0"
                        >
                            Delete
                        </el-button>
                    </template>
                </el-popconfirm>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { dayjs, type CalendarDateType, type CalendarInstance } from 'element-plus'
import { movie } from '@/api/modules/admin/movie'
import { room } from '@/api/modules/admin/room'
import { showtime } from '@/api/modules/admin/showtime'
import { Showtime } from '@/api/modules/admin/showtime/types'
import { showToast } from '@/utils/toastHelper'
import { ToastType } from '@/types'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.extend(isSameOrAfter)

const dialogFormCreateShowtimeVisible = ref(false)
const dialogFormUpdateShowtimeVisible = ref(false)
const filterForm = reactive({
    movieId: null,
    roomId: null,
    status: 'all',
})
const calendar = ref<CalendarInstance>()

const selectDate = async (val: CalendarDateType) => {
    if (!calendar.value) return

    switch (val) {
        case 'prev-year':
            date.value = date.value.subtract(1, 'year')
            break
        case 'prev-month':
            date.value = date.value.subtract(1, 'month')
            break
        case 'today':
            date.value = dayjs(new Date())
            break
        case 'next-month':
            date.value = date.value.add(1, 'month')
            break
        case 'next-year':
            date.value = date.value.add(1, 'year')
            break
        default:
            return
    }

    calendar.value.selectDate(val)
    showtimeData.value = (await getShowtimes()) as Showtime[]
}
const emptyNewShowtime = {
    date: '' as string | Date,
    start_time: '',
    duration: 120,
    movieId: '',
    roomId: '',
    end_time: '',
    price: 10,
    status: false,
}

const formCreateShowtime = reactive({ ...emptyNewShowtime })

const formUpdateShowtime = reactive({
    id: 0,
    date: '',
    start_time: '',
    duration: 120,
    movieId: '',
    newMovieId: '',
    newRoomId: '',
    movieName: '',
    roomName: '',
    roomId: '',
    end_time: '',
    price: 10,
    total_success_order: 0,
    status: false,
})

const loadingSearchMovie = ref(false)
const loadingSearchRoom = ref(false)
const movieOptions = ref<any>([])
const roomOptions = ref<any>([])
const date = ref(dayjs(new Date()))
const showtimeData = ref<Showtime[]>([])
const isLoadingCreateShowtime = ref(false)
const isLoadingUpdateShowtime = ref(false)

const checkValidFormCreateShowtime = () => {
    return (
        !checkOverlap(
            formCreateShowtime,
            getShowtimesByDate(formCreateShowtime.date + ' ' + formCreateShowtime.start_time)
        ) &&
        formCreateShowtime.date &&
        formCreateShowtime.duration &&
        formCreateShowtime.start_time &&
        formCreateShowtime.movieId &&
        formCreateShowtime.roomId &&
        formCreateShowtime.price
    )
}

const checkValidFormUpdateShowtime = () => {
    return (
        !checkOverlap(
            formUpdateShowtime,
            getShowtimesByDate(formUpdateShowtime.date + ' ' + formUpdateShowtime.start_time)
        ) &&
        formUpdateShowtime.date &&
        formUpdateShowtime.duration &&
        formUpdateShowtime.start_time &&
        formUpdateShowtime.movieId &&
        formUpdateShowtime.roomId &&
        formUpdateShowtime.price
    )
}

// Function to calculate end time from start time and duration
function calculateEndTime(startTime, duration) {
    const start = new Date(startTime)
    const end = new Date(start.getTime() + duration * 60000)
    return end
}

// Function to check if two time intervals overlap
function isOverlapping(start1, end1, start2, end2) {
    return start1 < end2 && end1 > start2
}

// Function to check if the new showtime overlaps with any existing showtime
function checkOverlap(newShowtime: any, existingShowtimes: Showtime[]) {
    const newStartTime = new Date(`${newShowtime.date} ${newShowtime.start_time}`)
    const newEndTime = calculateEndTime(newStartTime, newShowtime.duration)

    for (const showtime of existingShowtimes) {
        if (newShowtime.id == showtime.id) continue
        if (newShowtime.roomId == showtime.room_id) {
            const existingStartTime = new Date(showtime.start_time)
            const existingEndTime = new Date(showtime.end_time)

            if (isOverlapping(newStartTime, newEndTime, existingStartTime, existingEndTime)) {
                return true
            }
        }
    }
    return false // No overlap
}

const disabledDate = (time: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Normalize today to the start of the day

    const compareTime = new Date(time)
    compareTime.setHours(0, 0, 0, 0) // Normalize the input date to the start of the day

    return compareTime < today
}

const handleShowUpdateShowtime = (showtime: Showtime) => {
    console.log(showtime)
    dialogFormUpdateShowtimeVisible.value = true
    formUpdateShowtime.id = showtime.id
    formUpdateShowtime.date = dayjs(showtime.start_time).format('YYYY-MM-DD')
    formUpdateShowtime.status = !showtime.status
    formUpdateShowtime.movieId = showtime.movie_id + ''
    formUpdateShowtime.newMovieId = ''
    formUpdateShowtime.newRoomId = ''
    formUpdateShowtime.roomId = showtime.room_id + ''
    formUpdateShowtime.roomName = showtime.room
    formUpdateShowtime.movieName = showtime.movie
    formUpdateShowtime.total_success_order = showtime.total_success_order
    formUpdateShowtime.start_time = dayjs(showtime.start_time).format('HH:mm')
    formUpdateShowtime.duration = dayjs(showtime.end_time).diff(showtime.start_time, 'minute')
}

const getShowtimesByDate = (date) => {
    const { movieId, roomId, status } = filterForm

    return showtimeData.value
        .filter((showtime) => {
            const isSameDate = dayjs(showtime.start_time).isSame(date, 'day')
            if (!isSameDate) return false

            const matchesMovieId = !movieId || showtime.movie_id === movieId
            const matchesRoomId = !roomId || showtime.room_id === roomId
            const matchesStatus = !(status !== 'all') || showtime.status === (status === '0' ? 0 : 1)

            return matchesMovieId && matchesRoomId && matchesStatus
        })
        .sort((a, b) => (dayjs(a.start_time).isAfter(dayjs(b.start_time)) ? 1 : -1))
}

const remoteMethodMovie = async (query: string) => {
    if (query) {
        loadingSearchMovie.value = true
        const res = await movie.list({ key_word: query, per_page: 100 })
        console.log('🚀 ~ remoteMethod ~ res:', res)
        movieOptions.value = res.data.data
        loadingSearchMovie.value = false
    } else {
        movieOptions.value = []
    }
}

const remoteMethodRoom = async (query: string) => {
    if (query) {
        loadingSearchRoom.value = true
        const res = await room.list({ keyword: query })
        console.log('🚀 ~ remoteMethodRoom ~ res:', res)
        roomOptions.value = res.data
        loadingSearchRoom.value = false
    } else {
        roomOptions.value = []
    }
}

const handleCreateRoom = async () => {
    isLoadingCreateShowtime.value = true

    const { movieId, roomId, date, start_time, duration, price, status } = formCreateShowtime
    const [startHour, startMinute] = start_time.split(':').map(Number)

    const startTime = dayjs(date).set('hour', startHour).set('minute', startMinute)
    const endTime = startTime.add(duration, 'minute')

    const newShowtime = {
        movie_id: parseInt(movieId),
        room_id: parseInt(roomId),
        start_time: startTime.format('YYYY-MM-DD HH:mm:ss'),
        end_time: endTime.format('YYYY-MM-DD HH:mm:ss'),
        price: price,
        status: status ? 0 : 1,
    }

    try {
        const res = await showtime.create(newShowtime)
        showtimeData.value = await getShowtimes()
        showToast(res.message, ToastType.SUCCESS)
        console.log('🚀 ~ handleCreateRoom ~ res:', res)

        dialogFormCreateShowtimeVisible.value = false
        Object.assign(formCreateShowtime, emptyNewShowtime)
    } catch (error) {
        console.log('🚀 ~ handleCreateRoom ~ error:', error)
        showToast('Create showtime error.', ToastType.ERROR)
    }

    isLoadingCreateShowtime.value = false
}

const handleUpdateShowtime = async () => {
    isLoadingUpdateShowtime.value = true

    const { movieId, roomId, status, newMovieId, newRoomId, date, start_time, duration, price, id } = formUpdateShowtime
    const [startHour, startMinute] = start_time.split(':').map(Number)

    const startTime = dayjs(date).set('hour', startHour).set('minute', startMinute)
    const endTime = startTime.add(duration, 'minute')

    const updateShowtime = {
        id,
        movie_id: parseInt(newMovieId ? newMovieId : movieId),
        room_id: parseInt(newRoomId ? newRoomId : roomId),
        start_time: startTime.format('YYYY-MM-DD HH:mm:ss'),
        end_time: endTime.format('YYYY-MM-DD HH:mm:ss'),
        price: price,
        status: status ? 0 : 1,
    }

    try {
        const res = await showtime.update(updateShowtime)
        showtimeData.value = await getShowtimes()
        showToast(res.message, ToastType.SUCCESS)

        console.log('🚀 ~ handleUpdateShowtime ~ res:', res)
    } catch (error) {
        console.log('🚀 ~ handleUpdateShowtime ~ error:', error)
        showToast('Update showtime error.', ToastType.ERROR)
    }

    isLoadingUpdateShowtime.value = false
}

const handleDeleteShowtime = async (id: number) => {
    try {
        isLoadingUpdateShowtime.value = true
        const res = await showtime.delete(id)
        showtimeData.value = await getShowtimes()
        console.log('🚀 ~ handleDeleteShowtime ~ res:', res)
        showToast(res.message, ToastType.SUCCESS)
        dialogFormUpdateShowtimeVisible.value = false
    } catch (error) {
        console.log('🚀 ~ handleDeleteShowtime ~ error:', error)
        showToast('Delete showtime error.', ToastType.ERROR)
    }

    isLoadingUpdateShowtime.value = false
}

const getShowtimes = async () => {
    console.log(date.value)
    const months = [
        dayjs(date.value).subtract(1, 'month').get('month') + 1,
        dayjs(date.value).get('month') + 1,
        dayjs(date.value).add(1, 'month').get('month') + 1,
    ]
    const years = [
        dayjs(date.value).subtract(1, 'month').get('year'),
        dayjs(date.value).get('year'),
        dayjs(date.value).add(1, 'month').get('year'),
    ]
    console.log('🚀 ~ onMounted ~ years:', years)
    console.log('🚀 ~ onMounted ~ months:', months)
    const res = await showtime.list({ months, years })
    return res.data
}

onMounted(async () => {
    showtimeData.value = await getShowtimes()
})
</script>
