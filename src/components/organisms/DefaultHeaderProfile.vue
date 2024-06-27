<template>
    <button id="menuProfile" class="w-full border relative">
        <div class="flex justify-between items-center p-2 border border-colers_text-600">
            <span class="mx-5 text-colers_text-600 text-xl">ACCOUNT</span>
            <i class="fa-solid fa-bars text-colers_text-600 text-2xl mx-5"></i>
        </div>
        <ul id="menuListProfile"
            class="z-10 hidden md:block absolute top-full left-0 w-full bg-colors_header-menu-75 border border-colers_text-600">
            <a href="/profile/1" class="block p-4 text-start text-lg text-black hover:bg-blue-800">ACCOUNT INFORMATION</a>
            <a href="/password-change" class="block p-4 text-start text-lg text-black hover:bg-blue-800">CHANGE
                PASSWORD</a>
            <a href="/transaction-history" class="block p-4 text-start text-lg text-black hover:bg-blue-800">TRANSACTION HISTORY</a>
        </ul>
    </button>
</template>
<script setup lang="ts">
onMounted(() => {
    document.getElementById('menuProfile').addEventListener('click', function () {
        const icon = this.querySelector('i');
        const menuListProfile = document.getElementById('menuListProfile');

        icon.classList.toggle('text-red-500');
        menuListProfile.classList.toggle('hidden');
    });
})
</script>