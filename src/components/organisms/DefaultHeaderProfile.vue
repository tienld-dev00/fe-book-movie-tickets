<template>
    <button ref="menuProfileRef" @click="toggleMenu" class="w-full border relative">
        <div class="flex justify-between items-center p-2 border border-colers_text-600">
            <span class="mx-5 text-colers_text-600 text-xl">ACCOUNT</span>
            <i ref="iconRef" class="fa-solid fa-bars text-colers_text-600 text-2xl mx-5"></i>
        </div>
        <ul ref="menuListProfileRef"
            :class="['z-10', isMenuOpen ? '' : 'hidden', 'md:block absolute top-full left-0 w-full bg-colors_header-menu-75 border border-colers_text-600']">
            <a href="/profile" class="block p-4 text-start text-lg text-black hover:bg-blue-800">ACCOUNT INFORMATION</a>
            <a href="/password-change" class="block p-4 text-start text-lg text-black hover:bg-blue-800">CHANGE
                PASSWORD</a>
            <a href="/transaction-history" class="block p-4 text-start text-lg text-black hover:bg-blue-800">TRANSACTION
                HISTORY</a>
        </ul>
    </button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const menuProfileRef = ref(null);
const iconRef = ref(null);
const menuListProfileRef = ref(null);
const isMenuOpen = ref(false);

const toggleMenu = () => {
    iconRef.value.classList.toggle('text-red-500');
    menuListProfileRef.value.classList.toggle('hidden');
}
</script>
