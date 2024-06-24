<template>
    <div class="min-w-[250px] flex flex-col">
        <h5 class="self-center mb-2">Logo</h5>
        <el-menu
            :default-active="activeTab"
            class="flex flex-col w-full h-full el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
        >
            <el-menu-item index="1" @click="$router.push({ name: 'admin-order' })">
                <el-icon><icon-menu /></el-icon>
                <span>Quản lý đơn đặt vé</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import { Menu as IconMenu } from '@element-plus/icons-vue'

const activeTab = ref('1')

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>
