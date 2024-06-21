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
                        The account has been registered. <br> Please activate your account in gmail.
                    </p>
                </div>
                <button
                    class="bg-colers_button-25 hover:bg-colers_button-50 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5 mb-5"
                    type="button">
                    Resend activation email
                </button>
            </div>
        </div>
    </div>

    <DefaultFooter />
</template>
<script setup lang="ts">


</script>