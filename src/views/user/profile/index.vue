<template>
    <div class="md:flex md:space-x-5 md:justify-center md:mt-5">
        <div class="md:w-6/12 md:block lg:w-[300px]">
            <DefaultHeaderProfile />
        </div>
        <div class="md:bg-white md:shadow-lg md:rounded-lg">
            <div class="md:w-full lg:w-[600px]">
                <div class="flex flex-col mt-5 md:mt-0">
                    <span class="bg-colers_text-700 py-3 text-center text-white">ACCOUNT INFORMATION</span>
                </div>
                <Form :validation-schema="validationSchema" @submit="updateUserProfile" class="ml-5 mr-5">
                    <div class="md:mt-4 mb-4 text-center">
                        <div class="relative inline-block">
                            <img :src="avatarUrl" alt="Avatar" class="w-32 h-32 rounded-full object-cover">
                            <label for="avatar-input"
                                class="absolute cursor-pointer bottom-0 right-0 p-1 bg-white rounded-full">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="14" cy="14" r="14" fill="#050505" fill-opacity="0.77" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M9.62484 12.5417C9.304 12.5417 9.0415 12.2792 9.0415 11.9583V10.7917H7.87484C7.554 10.7917 7.2915 10.5292 7.2915 10.2083C7.2915 9.8875 7.554 9.625 7.87484 9.625H9.0415V8.45833C9.0415 8.1375 9.304 7.875 9.62484 7.875C9.94567 7.875 10.2082 8.1375 10.2082 8.45833V9.625H11.3748C11.6957 9.625 11.9582 9.8875 11.9582 10.2083C11.9582 10.5292 11.6957 10.7917 11.3748 10.7917H10.2082V11.9583C10.2082 12.2792 9.94567 12.5417 9.62484 12.5417ZM13.3593 14.5833C13.6719 14.0419 14.2496 13.7083 14.8748 13.7083C15.5001 13.7083 16.0778 14.0419 16.3904 14.5833C16.703 15.1248 16.703 15.7919 16.3904 16.3333C16.0778 16.8748 15.5001 17.2083 14.8748 17.2083C14.2496 17.2083 13.6719 16.8748 13.3593 16.3333C13.0467 15.7919 13.0467 15.1248 13.3593 14.5833ZM19.5415 10.7917H17.6923L16.969 10.0042C16.7532 9.765 16.4382 9.625 16.1115 9.625H12.3782C12.4773 9.8 12.5415 9.9925 12.5415 10.2083C12.5415 10.85 12.0165 11.375 11.3748 11.375H10.7915V11.9583C10.7915 12.6 10.2665 13.125 9.62484 13.125C9.409 13.125 9.2165 13.0608 9.0415 12.9617V18.9583C9.0415 19.6 9.5665 20.125 10.2082 20.125H19.5415C20.1832 20.125 20.7082 19.6 20.7082 18.9583V11.9583C20.7082 11.3167 20.1832 10.7917 19.5415 10.7917ZM11.9582 15.4583C11.9582 17.0683 13.2648 18.375 14.8748 18.375C16.4848 18.375 17.7915 17.0683 17.7915 15.4583C17.7915 13.8483 16.4848 12.5417 14.8748 12.5417C13.2648 12.5417 11.9582 13.8483 11.9582 15.4583Z"
                                        fill="#F9F9F9" fill-opacity="0.9" />
                                </svg>
                            </label>
                            <input id="avatar-input" accept="image/*" type="file" hidden @change="handleAvatarChange" />
                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700">Full name</label>
                        <Field name="name" v-model="userData.name" type="text" class="w-full mt-2 p-2 border rounded" />
                        <ErrorMessage name="name" class="text-red-500" />
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700">Email</label>
                        <Field name="email" disabled v-model="userData.email" type="email" class="w-full mt-2 p-2 border rounded" />
                        <ErrorMessage name="email" class="text-red-500" />
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700">Phone Number</label>
                        <Field name="phone_number" v-model="userData.phone_number" type="text" class="w-full mt-2 p-2 border rounded" />
                        <ErrorMessage name="phone_number" class="text-red-500" />
                    </div>
                    <div class="text-center mt-5 mb-3">
                        <button type="submit"
                            class=" bg-colers_button-25 text-white px-4 py-2 rounded hover:bg-colers_button-50">Save</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { getUserProfile, updateProfile } from '@/api/modules/auth/index';
import { reactive, ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import DefaultHeaderProfile from '@/components/organisms/DefaultHeaderProfile.vue';
import { showToast } from '@/utils/toastHelper';
import { ToastType } from '@/types';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const route = useRoute();
const userData = reactive({
    name: '',
    email: '',
    avatar: '',
    phone_number: ''
});

const validationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone_number: yup.string().required().min(9).max(11),
})

const avatarFile = ref<File | null>(null);

const avatarUrl = computed(() => {
    if (avatarFile.value) {
        return URL.createObjectURL(avatarFile.value);
    }
    return `http://localhost:8000/avatars/${userData.avatar}`;
});

const handleAvatarChange = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        avatarFile.value = file;
    }
};

const updateUserProfile = async (values) => {
    try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('phone_number', values.phone_number);
        if (avatarFile.value) {
            formData.append('avatar', avatarFile.value);
        }

        const response = await updateProfile(formData);
        console.log('User profile updated:', response);
        showToast('Update successful', ToastType.SUCCESS)
    } catch (error) {
        showToast(Object.values(error)[0], ToastType.WARNING)
        showToast(error.message, ToastType.ERROR)
    }
};

onMounted(async () => {
    try {
        const profileData = await getUserProfile();
        Object.assign(userData, profileData);
    } catch (error) {
        showToast(Object.values(error)[0], ToastType.WARNING)
        console.error('Error fetching user profile:', error);
    }
});
</script>
