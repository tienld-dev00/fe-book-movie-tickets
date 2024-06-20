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
                        Enter email to receive password reset code
                    </p>
                </div>
                <dir class="p-4">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="loginEmail">Email</label>
                        <input v-model="email.email" id="loginEmail" type="email" placeholder="Enter Email Here"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div class="flex items-center justify-between mt-10">
                        <button @click="sendCode"
                            class="bg-colers_button-25 hover:bg-colers_button-50 text-white font-medium py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            type="button">
                            Resend the code
                        </button>

                        <router-link :to="{ name: 'reset_password' }" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
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
import { checkForgotPassword } from '@/api/modules/auth/index'
import { ToastType } from '@/types';
import { showToast } from '@/utils/toastHelper';

// Tạo state để giữ email
const email = reactive({
    email: ''
})

// Hàm xử lý sự kiện click của nút "Send code"
const sendCode = async () => {
    try {
        await checkForgotPassword(email)
        showToast("Password change code has been sent. Please check your email.", ToastType.SUCCESS)

    } catch (error: any) {
        showToast(Object.values(error)[0], ToastType.WARNING)
        showToast(error.message, ToastType.ERROR)
    }
}
</script>