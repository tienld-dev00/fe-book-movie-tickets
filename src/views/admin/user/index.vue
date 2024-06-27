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
            <el-table-column prop="avatar" label="Avatar" width="180" />
            <el-table-column label="Status" width="180">
                <template #default="{ row }">
                    <span>{{ getStatusLabel(row.status) }}</span>
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
                <input v-model="update.email" type="email" class="w-full mt-2 p-2 border rounded">
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
import { ref, onMounted } from 'vue'
import { user } from '@/api/modules/user'
// console.log("🚀 ~ user:", user)
import { FormSearchUser, UserData } from '@/api/modules/user/types'
import { USER_STATUS } from '@/constants';
import { showToast } from '@/utils/toastHelper';
import { ToastType } from '@/types';

const userData = ref<UserData[]>([])
// console.log("🚀 ~ userData:", userData)
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
    status: ''
});

const modalUpdate = ref(false)

const editUser = async (id: number) => {
    try {
        const response = await user.detail(id);
        Object.assign(update, response.data)
        update.id = id // Gán id vào update
        modalUpdate.value = true // Hiển thị modal
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
}

const updateUser = async () => {
    try {
        if (update.id !== null) {
            const response = await user.update(update, update.id);
            console.log("🚀 ~ updateUser ~ update.id:", update.id)
            console.log('User profile updated:', response);
            showToast('Update successful', ToastType.SUCCESS)
            await getList(); // Cập nhật danh sách người dùng sau khi cập nhật thành công
        }
    } catch (error) {
        console.error('Error updating user profile:', error);
    }
    modalUpdate.value = false
}

onMounted(async () => {
    await getList();
})
</script>
