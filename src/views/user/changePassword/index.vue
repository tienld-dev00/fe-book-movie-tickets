<template>
    <div class="md:flex md:space-x-5 md:justify-center md:mt-5">
        <div class="md:w-6/12 md:block lg:w-[300px]">
            <DefaultHeaderProfile />
        </div>
        <div class="md:bg-white md:shadow-lg md:rounded-lg">
            <div class="md:w-full lg:w-[600px]">
                <div class="flex flex-col md:mt-0">
                    <span class="text-xl md:text-2xl font-bold bg-colers_text-700 py-3 text-center">CHANGE THE
                        PASSWORD</span>
                </div>
                <div class="ml-5 mr-5 mt-5">
                    <Form :validation-schema="validationSchema" @submit="handleChangePassword">
                        <div class="mb-4">
                            <label class="block text-gray-700">old Password</label>
                            <div class="relative">
                                <Field name="old_password" v-model="userData.old_password" id="password"
                                    :type="show_old_password ? 'text' : 'password'" placeholder="Enter Password Here"
                                    class="shadow appearance-none border rounded w-full py-3 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                <ErrorMessage name="old_password" class="text-red-500" />
                                <button @click="show_old_password = !show_old_password" type="button"
                                    class="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none">
                                    <i v-if="show_old_password" class="fa-regular fa-eye-slash"></i>
                                    <i v-else class="fa-regular fa-eye"></i>
                                </button>
                            </div>
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700">New Password</label>
                            <div class="relative">
                                <Field name="new_password" v-model="userData.new_password" id="password"
                                    :type="show_new_password ? 'text' : 'password'"
                                    placeholder="Enter new password here"
                                    class="shadow appearance-none border rounded w-full py-3 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                <ErrorMessage name="new_password" class="text-red-500" />
                                <button @click="show_new_password = !show_new_password" type="button"
                                    class="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none">
                                    <i v-if="show_new_password" class="fa-regular fa-eye-slash"></i>
                                    <i v-else class="fa-regular fa-eye"></i>
                                </button>
                            </div>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700">New Password confirmation</label>
                            <div class="relative">
                                <Field name="new_password_confirmation" v-model="userData.new_password_confirmation" id="password"
                                    :type="show_new_password_confirmation ? 'text' : 'password'"
                                    placeholder="Enter new password here"
                                    class="shadow appearance-none border rounded w-full py-3 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                <ErrorMessage name="new_password_confirmation" class="text-red-500" />
                                <button @click="show_new_password_confirmation = !show_new_password_confirmation" type="button"
                                    class="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none">
                                    <i v-if="show_new_password_confirmation" class="fa-regular fa-eye-slash"></i>
                                    <i v-else class="fa-regular fa-eye"></i>
                                </button>
                            </div>
                        </div>
                        <div class="text-center mt-5 mb-3">
                            <button type="submit"
                                class=" bg-colers_button-25 text-white px-4 py-2 rounded hover:bg-colers_button-50">Save</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import DefaultHeaderProfile from '@/components/organisms/DefaultHeaderProfile.vue';
import { changePassword } from '@/api/modules/auth/index';
import { showToast } from '@/utils/toastHelper'
import { ToastType } from '@/types';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const userData = reactive({
    old_password: '',
    new_password: '',
    new_password_confirmation: '',
});

const show_old_password = ref(false);
const show_new_password = ref(false);
const show_new_password_confirmation = ref(false);

const validationSchema = yup.object({
    old_password: yup.string().required(),
    new_password: yup.string().min(8).max(20).required(),
    new_password_confirmation: yup.string()
        .oneOf([yup.ref('new_password')], 'Passwords must match')
        .min(8)
        .max(20)
        .required(),
})

const handleChangePassword = async (values) => {
    try {
        const formData = new FormData();
        formData.append('old_password', values.old_password);
        formData.append('new_password', values.new_password);
        formData.append('new_password_confirmation', values.new_password_confirmation);

        await changePassword(formData);
        showToast("Password changed successfully", ToastType.SUCCESS);

        // Xóa dữ liệu form sau khi gửi thành công
        userData.old_password = '';
        userData.new_password = '';
        userData.new_password_confirmation = '';
    } catch (error: any) {
        showToast(Object.values(error)[0], ToastType.ERROR)
        showToast(error.message.message, ToastType.ERROR);
    }
};
</script>