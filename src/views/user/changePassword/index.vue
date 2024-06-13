<template>
    <div class="md:flex md:space-x-5 md:justify-center md:mt-5">
        <div class="md:w-6/12 md:block lg:w-[300px]">
            <DefaultHeaderProfile />
        </div>
        <div class="md:bg-white md:shadow-lg md:rounded-lg">
            <div class="md:w-full lg:w-[600px]">
                <div class="flex flex-col md:mt-0">
                    <span class="text-xl md:text-2xl font-bold bg-colers_text-700 py-3 text-center">CHANGE THE PASSWORD</span>
                </div>
                <form class="ml-5 mr-5 mt-5">
                    <div class="mb-4">
                        <label class="block text-gray-700">Old password</label>
                        <input type="password" class="w-full mt-2 p-2 border rounded">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700">A new password</label>
                        <input type="password" class="w-full mt-2 p-2 border rounded">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700">Enter your new password</label>
                        <input type="password" class="w-full mt-2 p-2 border rounded">
                    </div>
                    <div class="text-center mt-5 mb-3">
                        <button @click="updateUserProfile"
                            class=" bg-colers_button-25 text-white px-4 py-2 rounded hover:bg-colers_button-50">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import DefaultHeaderProfile from '@/components/organisms/DefaultHeaderProfile.vue';
</script>