<template>
    <div class="h-[60px] p-3 flex justify-end items-center border">
        <el-dropdown>
            <span class="el-dropdown-link">
                <el-avatar :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="handleLogout">Log out </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'
import { showToast } from '@/utils/toastHelper'
import { ToastType } from '@/types'

const store = useStore()

const handleLogout = async () => {
    try {
        await store.dispatch('auth/logout')
        router.push({ name: 'home' })
        showToast('Logged out successfully', ToastType.SUCCESS)
    } catch (error: any) {
        showToast(error.message, ToastType.ERROR)
    }
}
</script>
