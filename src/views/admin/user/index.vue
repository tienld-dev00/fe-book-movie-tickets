<template>
    <div class="flex flex-col gap-2 p-3">
        <div class="flex justify-between">
            <el-input v-model="formSearch.valueSearch" @keydown.enter="getList" style="width: 240px"
                placeholder="Type something">
                <template #prefix>
                    <el-icon class="el-input__icon">
                        <search />
                    </el-icon>
                </template>
            </el-input>
        </div>
        <el-table :data="userData" style="width: 100%">
            <el-table-column prop="id" label="Id" width="70" />
            <el-table-column prop="name" label="Name" />
            <el-table-column prop="email" label="Email" />
            <el-table-column prop="phone_number" label="Phone Number" />
            <el-table-column label="Avatar" width="180">
                <template #default="{ row }">
                    <img :src="`http://localhost:8000/avatars/${row.avatar}`" alt="Avatar"
                    class="w-24 h-24 rounded-full object-cover"/>
                </template>
            </el-table-column>
            <el-table-column label="Status" width="180">
                <template #default="{ row }">
                    <span :class="{'text-green-500': row.status === USER_STATUS.ACTIVE, 'text-yellow-500': row.status === USER_STATUS.LOCK}">
                        {{ getStatusLabel(row.status) }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="Action" width="180">
                <template #default="{ row }">
                    <el-button plain @click="editUser(row.id)">
                        Edit
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <!-- Modal Update -->
    <el-dialog v-model="modalUpdate" title="Update User" width="600">
        <form class="ml-5 mr-5" @submit.prevent>
            <div class="mb-4">
                <label class="block text-gray-700">Full name</label>
                <input v-model="update.name" type="text" class="w-full mt-2 p-2 border rounded">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700">Email</label>
                <input disabled v-model="update.email" type="email" class="w-full mt-2 p-2 border rounded">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700">Phone Number</label>
                <input v-model="update.phone_number" type="text" class="w-full mt-2 p-2 border rounded">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700">Status</label>
                <select v-model="update.status" class="w-full mt-2 p-2 border rounded">
                    <option :value="USER_STATUS.ACTIVE">ACTIVE</option>
                    <option :value="USER_STATUS.LOCK">LOCK</option>
                </select>
            </div>
            <el-button @click="modalUpdate = false">Cancel</el-button>
            <el-button type="primary" @click="updateUser">
                Save
            </el-button>
        </form>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { user } from '@/api/modules/user'
import { FormSearchUser, UserData } from '@/api/modules/user/types'
import { USER_STATUS } from '@/constants';
import { showToast } from '@/utils/toastHelper';
import { ToastType } from '@/types';

const userData = ref<UserData[]>([])
const formSearch = reactive<FormSearchUser>({
    valueSearch: '',
})

const getStatusLabel = (status: number) => {
    return status === USER_STATUS.ACTIVE ? 'ACTIVE' : 'LOCK'
}

const getList = async () => {
    try {
        const response = await user.list(formSearch)
        userData.value = response
    } catch (error) {
        console.error('error', error);
    }
}

const update = reactive({
    id: null,
    name: '',
    email: '',
    avatar: '',
    role: '',
    status: '',
    phone_number: ''
});

const modalUpdate = ref(false)

const editUser = async (id: number) => {
    try {
        const response = await user.detail(id);
        Object.assign(update, response.data)
        update.id = id // Gán id vào update
        modalUpdate.value = true // Hiển thị modal
    } catch (error) {
        showToast(Object.values(error)[0], ToastType.WARNING)
        showToast(error.message, ToastType.ERROR)
    }
}

const updateUser = async () => {
    try {
        if (update.id !== null) {
            const response = await user.update(update, update.id);
            showToast('Update successful', ToastType.SUCCESS)
            await getList(); // Cập nhật danh sách người dùng sau khi cập nhật thành công
        }
    } catch (error) {
        showToast(Object.values(error)[0], ToastType.WARNING)
        showToast(error.message, ToastType.ERROR)
    }
    modalUpdate.value = false
}

onMounted(async () => {
    await getList();
})
</script>

