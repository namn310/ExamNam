
<script setup>
    import { ref } from 'vue';
    import Sidebar from "@/components/Admin/Sidebar.vue";
    import Header from '@/components/Admin/Header.vue';

    const isSidebarOpen = ref(false);

    const toggleSidebar = (e) => {
        e.preventDefault();
        isSidebarOpen.value = !isSidebarOpen.value;
    };

</script>

<template>
    <Sidebar :isSidebarOpen="isSidebarOpen" />

    <main class="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main" :class="{ active: isSidebarOpen }">
        
        <Header :toggleSidebar="toggleSidebar"/>

        <slot/>
    </main>
    

</template>