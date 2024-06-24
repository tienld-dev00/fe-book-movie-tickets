<template>
    <div class="min-w-[250px] flex flex-col">
        <img src="/src/assets/img/logo.png" alt="Logo" class="object-contain w-full h-24" />
        <el-menu
            :default-active="activeTab"
            class="flex flex-col w-full h-full el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
        >
            <el-menu-item index="admin_dashboard" @click="$router.push({ name: 'admin_dashboard' })">
                <el-icon><PieChart /></el-icon>
                <span>Dashboard</span>
            </el-menu-item>
            <el-menu-item index="admin_category" @click="$router.push({ name: 'admin_category' })">
                <el-icon><icon-menu /></el-icon>
                <span>Category</span>
            </el-menu-item>
            <el-menu-item index="admin-movie" @click="$router.push({ name: 'admin-movie' })">
                <el-icon><VideoCamera /></el-icon>
                <span>Movie</span>
            </el-menu-item>
            <el-menu-item index="admin-room" @click="$router.push({ name: 'admin-room' })">
                <el-icon><Grid /></el-icon>
                <span>Room</span>
            </el-menu-item>
            <el-menu-item index="admin-showtime" @click="$router.push({ name: 'admin-showtime' })">
                <el-icon><Calendar /></el-icon>
                <span>Showtime</span>
            </el-menu-item>
            <el-menu-item index="admin_user" @click="$router.push({ name: 'admin_user' })">
                <el-icon><User /></el-icon>
                <span>User</span>
            </el-menu-item>
            <el-menu-item index="admin-order" @click="$router.push({ name: 'admin-order' })">
                <el-icon><Tickets /></el-icon>
                <span>Order</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import { Menu as IconMenu, User, Calendar, Grid, VideoCamera, Tickets, PieChart } from '@element-plus/icons-vue'

const route = useRoute()
const activeTab = ref(route.name as string)

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>
