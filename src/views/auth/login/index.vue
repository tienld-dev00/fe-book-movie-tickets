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
                    <button @click="toggleTab('register')"
                        :class="{ 'border-b-2 border-orange-500': currentTab === 'register' }"
                        class="w-1/2 py-2 text-center focus:outline-none text-lg font-bold">
                        Register
                    </button>
                </div>

                <!-- Login -->
                <div v-if="currentTab === 'login'" class="p-4">
                    <div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="loginEmail">Email</label>
                            <input v-model="state.email" id="loginEmail" type="email" placeholder="Enter Email Here"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2"
                                for="loginPassword">Password</label>
                            <div class="relative">
                                <input v-model="state.password" id="password"
                                    :type="showLoginPassword ? 'text' : 'password'" placeholder="Enter Password Here"
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                <button @click="showLoginPassword = !showLoginPassword"
                                    class="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none">
                                    <i v-if="showLoginPassword" class="fa-regular fa-eye-slash"></i>
                                    <i v-else class="fa-regular fa-eye"></i>
                                </button>
                            </div>
                        </div>
                        <div class="flex items-center justify-between">
                            <button @click="handleLogin"
                                class="bg-colers_button-25 hover:bg-colers_button-50 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button">
                                Log in
                            </button>
                            <router-link to="/forgot-password"
                                class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                                Forgot password?
                            </router-link>
                        </div>
                    </div>

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

                <!-- Register -->
                <div v-if="currentTab === 'register'" class="p-4">
                    <div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Full name</label>
                            <input v-model="register.name" id="name" type="text" placeholder="Enter Full Name Here"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                            <input v-model="register.email" id="email" type="email" placeholder="Enter Email Here"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">Phone number</label>
                            <input v-model="register.phone_number" id="phone" type="text"
                                placeholder="Enter Phone Number Here"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                            <div class="relative">
                                <input v-model="register.password" id="password"
                                    :type="showRegisterPassword ? 'text' : 'password'" placeholder="Enter Password Here"
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                <button @click="showRegisterPassword = !showRegisterPassword"
                                    class="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none">
                                    <i v-if="showRegisterPassword" class="fa-regular fa-eye-slash"></i>
                                    <i v-else class="fa-regular fa-eye"></i>
                                </button>
                            </div>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="confirmPassword">Confirm
                                password</label>
                            <div class="relative">
                                <input v-model="register.password_confirmation" id="confirmPassword"
                                    :type="showRegisterConfirmPassword ? 'text' : 'password'"
                                    placeholder="Enter the password"
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                <button @click="showRegisterConfirmPassword = !showRegisterConfirmPassword"
                                    class="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none">
                                    <i v-if="showRegisterConfirmPassword" class="fa-regular fa-eye-slash"></i>
                                    <i v-else class="fa-regular fa-eye"></i>
                                </button>
                            </div>
                        </div>
                        <div class="mb-4">
                            <div class="g-recaptcha" data-sitekey="your-site-key"></div>
                        </div>
                        <div class="flex items-center justify-between">
                            <button @click="handleRegister"
                                class="bg-colers_button-25 hover:bg-colers_button-50 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button">
                                Register
                            </button>
                        </div>
                    </div>
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


const state = reactive({
    email: '',
    password: '',
})

const register = reactive({
    name: '',
    email: '',
    phone_number: '',
    password: '',
    password_confirmation: '',
})
const showLoginPassword = ref(false);
const showRegisterPassword = ref(false);
const showRegisterConfirmPassword = ref(false);
const store = useStore()
const currentTab = ref('login')
const router = useRouter();

const handleLogin = async () => {
    try {
        await store.dispatch('auth/login', state)
        await store.dispatch('auth/profile')
        const userRole = store.state.auth.user.role
        if (userRole === 0) {
            router.push({ name: 'admin_dashboard' })
        } else if (userRole === 1) {
            router.push({ name: 'home' })
        } else {
            throw new Error("Invalid user role")
        }
    } catch (error) {
        showToast(Object.values(error)[0], ToastType.WARNING)
        showToast(error.message, ToastType.ERROR)
    }
}

const handleRegister = async () => {
    if (register.password !== register.password_confirmation) {
        showToast("Passwords do not match", ToastType.WARNING)
        return
    }

    try {
        await store.dispatch('auth/register', {
            name: register.name,
            email: register.email,
            phone_number: register.phone_number,
            password: register.password,
            password_confirmation: register.password_confirmation,
        })
        showToast("Registration successful", ToastType.SUCCESS)

        // Clear input fields after successful registration
        // register.name = '';
        // register.email = '';
        // register.phone_number = '';
        // register.password = '';
        // register.password_confirmation = '';
        router.push({
            path: '/verify-account',
            query: { email: register.email }
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
