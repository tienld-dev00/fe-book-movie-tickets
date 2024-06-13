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
                            <input v-model="state.password" id="loginPassword" type="password"
                                placeholder="Enter Password Here"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div class="flex items-center justify-between">
                            <button @click="handleLogin"
                                class="bg-colers_button-25 hover:bg-colers_button-50 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button">
                                Log in
                            </button>
                            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                                href="#">
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <p class="text-gray-900 font-base text-medium text-center mb-3 mt-10">
                        or you can
                    </p>

                    <!-- Button Facebook -->
                    <div class="flex items-center justify-center mb-3">
                        <button @click="loginByFacebook"
                            class=" w-full border-2 hover:border-sky-300  bg-sky-700 items-center px-14 py-2 font-bold rounded-2xl ">
                            <div class=" flex justify-center">
                                <img style="width: 21px;" src="/src/assets/img/facebook.png" alt="">
                                <span class="text-white ml-2">
                                    Continue with Facebook
                                </span>
                            </div>
                        </button>
                    </div>

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
                            <input v-model="register.password" id="password" type="password"
                                placeholder="Enter Password Here"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="confirmPassword">Confirm
                                password</label>
                            <input v-model="register.password_confirmation" id="confirmPassword" type="password"
                                placeholder="Enter the password"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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
import router from '@/router'
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

const store = useStore()
const currentTab = ref('login')

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
    } catch (error: any) {
        showToast(error.message, ToastType.ERROR)
    }
}

const handleRegister = async () => {
    if (register.password !== register.password_confirmation) {
        showToast("Passwords do not match", ToastType.ERROR)
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
    } catch (error: any) {
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



// const loginByGoogle = () => {
//     axios.get('http://localhost:8000/api/google-sign-in-url')
//         .then(response => {
//             window.location.href = response.data.url;
//         })
//         .catch(error => {
//             console.error('Error during Google login:', error);
//         });
// };

// const loginByFacebook = () => {
//     axios.get('http://localhost:8000/api/facebook-sign-in-url')
//         .then(response => {
//             window.location.href = response.data.url;
//         })
//         .catch(error => {
//             console.error('Error during facebook login:', error);
//         });
// };
</script>
