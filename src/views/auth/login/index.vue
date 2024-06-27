<template>
    <div class="bg-colors_header-menu-25">
        <div class="md:container mx-auto">
            <DefaultHeader />
        </div>
    </div>
    <div class="md:container mx-auto mt-7">
        <div class="flex flex-col items-center justify-center">
            <div class="bg-white shadow-md rounded-lg overflow-hidden w-full sm:w-2/3 lg:w-1/3">

                <!-- Button -->
                <div class="flex justify-center border-b">
                    <button @click="toggleTab('login')"
                        :class="{ 'border-b-2 border-orange-500': currentTab === 'login' }"
                        class="w-1/2 py-2 text-center focus:outline-none text-lg font-bold">
                        Log in
                    </button>
                    <button @click="toggleTab('registerUser')"
                        :class="{ 'border-b-2 border-orange-500': currentTab === 'registerUser' }"
                        class="w-1/2 py-2 text-center focus:outline-none text-lg font-bold">
                        RegisterUser
                    </button>
                </div>

                <!-- Login -->
                <div v-if="currentTab === 'login'" class="p-4">
                    <Form :validation-schema="validationLogin" @submit="handleLogin">
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="loginEmail">Email</label>
                            <Field name="email" v-model="state.email" id="loginEmail" type="email"
                                placeholder="Enter Email Here"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            <ErrorMessage name="email" class="text-red-500" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2"
                                for="loginPassword">Password</label>
                            <div class="relative">
                                <Field name="password" v-model="state.password" id="password"
                                    :type="showLoginPassword ? 'text' : 'password'" placeholder="Enter Password Here"
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                <ErrorMessage name="password" class="text-red-500" />
                                <button @click="showLoginPassword = !showLoginPassword" type="button"
                                    class="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none">
                                    <i v-if="showLoginPassword" class="fa-regular fa-eye-slash"></i>
                                    <i v-else class="fa-regular fa-eye"></i>
                                </button>
                            </div>
                        </div>
                        <div class="flex items-center justify-between">
                            <button
                                class="bg-colers_button-25 hover:bg-colers_button-50 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit">
                                Log in
                            </button>
                            <router-link to="/forgot-password"
                                class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                                Forgot password?
                            </router-link>
                        </div>
                    </Form>

                    <p class="text-gray-900 font-base text-medium text-center mb-3 mt-10">
                        or you can
                    </p>

                    <!-- Button Google -->
                    <div class="flex items-center justify-center">
                        <button @click="loginByGoogle"
                            class=" w-full border-2 hover:border-sky-300 bg-white items-center px-16 py-2 font-bold rounded-2xl ">
                            <div class=" flex justify-center">
                                <img style="width: 21px;" src="/src/assets/img/google.png" alt="">
                                <span class="text-gray-800 ml-2">
                                    Continue with Google
                                </span>
                            </div>
                        </button>
                    </div>
                </div>

                <!-- RegisterUser -->
                <div v-if="currentTab === 'registerUser'" class="p-4">
                    <Form :validation-schema="validationRegisterUser" @submit="handleRegisterUser">
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Full name</label>
                            <Field name="name" v-model="registerUser.name" id="name" type="text"
                                placeholder="Enter Full Name Here"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            <ErrorMessage name="name" class="text-red-500" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                            <Field name="email" v-model="registerUser.email" id="email" type="email"
                                placeholder="Enter Email Here"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            <ErrorMessage name="email" class="text-red-500" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">Phone number</label>
                            <Field name="phone_number" v-model="registerUser.phone_number" id="phone" type="text"
                                placeholder="Enter Phone Number Here"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            <ErrorMessage name="phone_number" class="text-red-500" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                            <div class="relative">
                                <Field name="password" v-model="registerUser.password" id="password"
                                    :type="showRegisterUserPassword ? 'text' : 'password'"
                                    placeholder="Enter Password Here"
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                <ErrorMessage name="password" class="text-red-500" />
                                <button @click="showRegisterUserPassword = !showRegisterUserPassword" type="button"
                                    class="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none">
                                    <i v-if="showRegisterUserPassword" class="fa-regular fa-eye-slash"></i>
                                    <i v-else class="fa-regular fa-eye"></i>
                                </button>
                            </div>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="confirmPassword">Confirm
                                password</label>
                            <div class="relative">
                                <Field name="password_confirmation" v-model="registerUser.password_confirmation" id="confirmPassword"
                                    :type="showRegisterUserConfirmPassword ? 'text' : 'password'"
                                    placeholder="Enter the password"
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                <ErrorMessage name="password_confirmation" class="text-red-500" />
                                <button @click="showRegisterUserConfirmPassword = !showRegisterUserConfirmPassword" type="button"
                                    class="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none">
                                    <i v-if="showRegisterUserConfirmPassword" class="fa-regular fa-eye-slash"></i>
                                    <i v-else class="fa-regular fa-eye"></i>
                                </button>
                            </div>
                        </div>
                        <div class="mb-4">
                            <div class="g-recaptcha" data-sitekey="your-site-key"></div>
                        </div>
                        <div class="flex items-center justify-between">
                            <button
                                class="bg-colers_button-25 hover:bg-colers_button-50 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit">
                                RegisterUser
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
    <DefaultFooter />
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from '@/utils/toastHelper'
import { useStore } from 'vuex'
import { ToastType } from '@/types';
import { register } from '@/api/modules/auth/index'
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const state = reactive({
    email: '',
    password: '',
})

const registerUser = reactive({
    name: '',
    email: '',
    phone_number: '',
    password: '',
    password_confirmation: '',
})

const validationLogin = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(20).required(),
})


const validationRegisterUser = yup.object({
    name: yup.string().required().min(6).max(225),
    email: yup.string().email().required(),
    phone_number: yup.string().required().min(9).max(11),
    password: yup.string().min(8).max(20).required(),
})

const showLoginPassword = ref(false);
const showRegisterUserPassword = ref(false);
const showRegisterUserConfirmPassword = ref(false);
const store = useStore()
const currentTab = ref('login')
const router = useRouter();

const handleLogin = async (values) => {
    try {
        await store.dispatch('auth/login', state)
        const redirectTo = store.state.auth.redirectTo
        if (redirectTo) {
            store.dispatch('auth/clearRedirectTo')
            router.push(redirectTo)
        }
    } catch (error) {
        showToast(Object.values(error)[0], ToastType.WARNING)
        showToast(error.message, ToastType.ERROR)
    }
}

const handleRegisterUser = async (values) => {
    if (registerUser.password !== registerUser.password_confirmation) {
        showToast("Passwords do not match", ToastType.WARNING)
        return
    }

    try {
        await register(registerUser)
        showToast("Registration successful", ToastType.SUCCESS)
        router.push({
            path: '/verify-account',
            query: { email: registerUser.email }
        });
    } catch (error: any) {
        showToast(Object.values(error)[0], ToastType.WARNING)
        showToast(error.message, ToastType.ERROR)
    }
}

const loginByGoogle = async () => {
    try {
        await store.dispatch('auth/googleSignInUrl');
    } catch (error: any) {
        showToast(error.message, ToastType.ERROR);
    }
}



const setLoading = () => store.dispatch('loading/setLoading')
const removeLoading = () => store.dispatch('loading/removeLoading')

onMounted(async () => {
    setLoading()
    removeLoading()
})

const toggleTab = (tab) => {
    currentTab.value = tab
}

</script>
