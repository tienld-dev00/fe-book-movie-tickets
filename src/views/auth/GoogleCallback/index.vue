<template>
    <div v-if="loading">Loading...</div>
    <div v-else>Redirecting...</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { showToast } from '@/utils/toastHelper';
import { GoogleCallBack, ToastType } from '@/types';

const loading = ref(true);

const store = useStore();
const route = useRoute();
const router = useRouter();

const handleGoogleCallback = async () => {
    try {
        const code = route.query.code as string;
        const error = route.query.error as string;

        if (error) {
            showToast(GoogleCallBack.ERROR, ToastType.ERROR);
            router.push({ name: 'login' });
        } else if (code) {
            const response = await store.dispatch('auth/googleLoginCallback', code);
            const accessToken = response?.access_token;

            if (accessToken) {
                localStorage.setItem('access_token', accessToken);
                await store.dispatch('auth/setAccessToken', accessToken);
                await store.dispatch('auth/setProfile');
                router.push({ name: 'home' });
            } else {
                showToast(GoogleCallBack.ERROR, ToastType.ERROR);
                router.push({ name: 'login' });
            }
        } else {
            showToast(GoogleCallBack.ERROR, ToastType.ERROR);
            router.push({ name: 'login' });
        }

        loading.value = false;
    } catch (error: any) {
        showToast(error.message, ToastType.ERROR);
        router.push({ name: 'login' });
    }
};

onMounted(() => {
    handleGoogleCallback();
});
</script>
