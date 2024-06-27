<template>
    <div class="bg-colors_header-menu-25">
        <div class="md:container mx-auto">
            <DefaultHeader />
        </div>
    </div>
    <div class="md:container mx-auto mt-7">
        <div class="flex flex-col items-center justify-center">
            <div class="bg-white shadow-md rounded-lg overflow-hidden w-full sm:w-2/3 lg:w-1/3">
                <div class="flex justify-center border-b">
                    <p class="py-2 text-center focus:outline-none text-lg font-bold">
                        Check Token
                    </p>
                </div>
                <dir class="p-4">
                    <div class="flex justify-between">
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="loginEmail">Code</label>
                            <input v-model="resetPassword.verification_code" type="text" placeholder="Enter code Here"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <p class="text-gray-700 mb-4">Your email: {{ email }}</p>
                    </div>
                    <div class="flex items-center justify-between mt-10">
                        <button @click=""
                            class="bg-colers_button-25 hover:bg-colers_button-50 text-white font-medium py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            type="button">
                            CheckToken
                        </button>
                    </div>
                </dir>
            </div>
        </div>
    </div>

    <DefaultFooter />
</template>
<script setup lang="ts">
import { ToastType } from '@/types';
import { showToast } from '@/utils/toastHelper';

// Tạo state để giữ email
const resetPassword = reactive({
    verification_code: '',
})
</script>