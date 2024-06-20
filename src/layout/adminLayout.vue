<template>
    <div class="flex w-screen h-screen">
        <admin-sidebar />
        <div class="flex flex-col w-full overflow-auto">
            <admin-header />
            <router-view />
        </div>
    </div>
</template>
