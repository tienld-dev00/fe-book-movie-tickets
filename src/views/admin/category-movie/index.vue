<template>
    <div class="flex flex-col gap-2 p-3">
        <div class="flex justify-between">
            <el-input style="width: 240px" placeholder="Type something">
                <template #prefix>
                    <el-icon class="el-input__icon"><search /></el-icon>
                </template>
            </el-input>
            <el-button type="primary" small>New Category</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="Id" width="180" />
            <el-table-column prop="name" label="Name" />
            <el-table-column prop="created_at" label="Created at" width="180" />
            <el-table-column prop="updated_at" label="Updated at" width="180" />
            <el-table-column fixed="right" label="Operations" width="120">
                <template #default>
                    <el-button link type="primary" size="small">Detail </el-button>
                    <el-button link type="primary" size="small">Edit</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="1000" />
    </div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
const tableData = [
    { id: 1, name: 'Comedy', created_at: '25/08/2023', updated_at: '07/02/2024' },
    { id: 2, name: 'Western', created_at: '16/07/2023', updated_at: '26/06/2023' },
    { id: 3, name: 'Crime|Film-Noir|Thriller', created_at: '28/04/2024', updated_at: '18/08/2023' },
    { id: 4, name: 'Action|Crime|Drama|Mystery|Thriller', created_at: '27/03/2024', updated_at: '15/05/2024' },
    { id: 5, name: 'Drama', created_at: '03/02/2024', updated_at: '31/03/2024' },
    { id: 6, name: 'Comedy', created_at: '21/07/2023', updated_at: '10/01/2024' },
    { id: 7, name: 'Crime|Drama|Thriller', created_at: '12/07/2023', updated_at: '18/09/2023' },
    { id: 8, name: 'Adventure|Children|Fantasy|Musical', created_at: '22/12/2023', updated_at: '09/12/2023' },
    { id: 9, name: 'Drama|Romance', created_at: '11/01/2024', updated_at: '31/05/2023' },
    { id: 10, name: 'Drama', created_at: '05/08/2023', updated_at: '20/01/2024' },
]
</script>
