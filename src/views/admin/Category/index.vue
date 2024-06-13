<template>
    <div class="bg-white shadow-lg rounded-lg w-[700px]">
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
                <button @click="modalCreate = true"
                    class="bg-sky-400 text-white px-4 py-2 rounded hover:bg-colers_button-50">ADD</button>
            </div>
            <el-table :data="categoryData" style="width: 100%">
                <el-table-column prop="id" label="Id" width="70" />
                <el-table-column prop="name" label="Name" />
                <el-table-column fixed="right" label="Action" width="100">
                    <template #default="{ row }">
                        <el-button plain @click="editCategory(row.id)">
                            Edit
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>

    <!-- Modal Create -->
    <el-dialog v-model="modalCreate" title="Update Category" width="600">
        <form class="ml-5 mr-5" @submit.prevent>
            <div class="mb-4">
                <label class="block text-gray-700">Full name</label>
                <input v-model="create.name" type="text" class="w-full mt-2 p-2 border rounded">
            </div>
            <el-button @click="modalCreate = false">Cancel</el-button>
            <el-button type="primary" @click="createCategory">
                Add
            </el-button>
        </form>
    </el-dialog>

    <!-- Modal Update -->
    <el-dialog v-model="modalUpdate" title="Update Category" width="600">
        <form class="ml-5 mr-5" @submit.prevent>
            <div class="mb-4">
                <label class="block text-gray-700">Full name</label>
                <input v-model="update.name" type="text" class="w-full mt-2 p-2 border rounded">
            </div>
            <el-button @click="modalUpdate = false">Cancel</el-button>
            <el-button type="primary" @click="updateCategory">
                Save
            </el-button>
        </form>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { category } from '@/api/modules/category'
console.log("🚀 ~ category:", category)

import { FormSearchCategory, CategoryData, FormCategoryData } from '@/api/modules/category/types'
import { showToast } from '@/utils/toastHelper';
import { ToastType } from '@/types';

const categoryData = ref<CategoryData[]>([])
console.log("🚀 ~ categoryData:", categoryData)

const formSearch = reactive<FormSearchCategory>({
    valueSearch: '',
})

const getList = async () => {
    try {
        const response = await category.list(formSearch)
        categoryData.value = response
    } catch (error) {
        console.error('error', error);
    }
}

const update = reactive({
    id: null,
    name: '',
});

const modalUpdate = ref(false)

const editCategory = async (id: number) => {
    try {
        const response = await category.detail(id);
        Object.assign(update, response.data)
        update.id = id // Gán id vào update
        modalUpdate.value = true // Hiển thị modal
    } catch (error) {
        console.error('Error fetching category profile:', error);
    }
}

const updateCategory = async () => {
    try {
        if (update.id !== null) {
            const response = await category.update(update, update.id);
            showToast('Update successful', ToastType.SUCCESS)
            await getList();
        }
    } catch (error) {
        console.error('Error updating category profile:', error);
    }
    modalUpdate.value = false
}

const modalCreate = ref(false)
const create = reactive({
    name: '',
});

const createCategory = async () => {
    try {
        const response = await category.create(create);
        showToast('Create successful', ToastType.SUCCESS);
        await getList();
    } catch (error) {
        console.error('Error creating category:', error);
    }
    modalCreate.value = false;
}

onMounted(async () => {
    await getList();
})
</script>
