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
                        Reset Password
                    </p>
                </div>
                <dir class="p-4">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="loginEmail">Code</label>
                        <input v-model="resetPassword.verification_code" type="text" placeholder="Enter code Here"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="loginEmail">New Password</label>
                        <div class="relative">
                            <input v-model="resetPassword.password" id="password"
                                :type="showPassword ? 'text' : 'password'" placeholder="Enter New Password Here"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            <button @click="showPassword = !showPassword"
                                class="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none">
                                <i v-if="showPassword" class="fa-regular fa-eye-slash"></i>
                                <i v-else class="fa-regular fa-eye"></i>
                            </button>
                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="loginEmail">Password
                            Confirmation</label>
                        <div class="relative">
                            <input v-model="resetPassword.password_confirmation" id="password"
                                :type="showConfirmPassword ? 'text' : 'password'"
                                placeholder="Enter Password Confirmation Here"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            <button @click="showConfirmPassword = !showConfirmPassword"
                                class="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none">
                                <i v-if="showConfirmPassword" class="fa-regular fa-eye-slash"></i>
                                <i v-else class="fa-regular fa-eye"></i>
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center justify-between mt-10">
                        <button @click="handleResetPassword"
                            class="bg-colers_button-25 hover:bg-colers_button-50 text-white font-medium py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            type="button">
                            Reset Password
                        </button>

                        <router-link :to="{ name: 'login' }"
                            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            type="button">
                            Enter your new password
                        </router-link>
                    </div>
                </dir>
            </div>
        </div>
    </div>

    <DefaultFooter />
</template>
<script setup lang="ts">
import { ResetPassword } from '@/api/modules/auth/index'
import { ToastType } from '@/types';
import { showToast } from '@/utils/toastHelper';

// Tạo state để giữ email
const resetPassword = reactive({
    verification_code: '',
    password: '',
    password_confirmation: ''
})

const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Hàm xử lý sự kiện click của nút "Send code"
const handleResetPassword = async () => {
    try {
        await ResetPassword(resetPassword)
        showToast("Password changed successfully.", ToastType.SUCCESS)
        resetPassword.verification_code = '';
        resetPassword.password = '';
        resetPassword.password_confirmation = '';
    } catch (error: any) {
        showToast(Object.values(error)[0], ToastType.WARNING)
        showToast(error.message, ToastType.ERROR)
    }
}
</script>