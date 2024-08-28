<script lang="ts">
    import { defineComponent, onMounted, PropType, ref } from 'vue';
    import { RouterLink } from 'vue-router';
    // import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
    // import { ChevronUpIcon } from '@heroicons/vue/20/solid'

    export default defineComponent({
    props: {
        isSidebarOpen: {
        type: Boolean as PropType<boolean>,
        required: true,
        },
    },
    // components : {
    //     Disclosure,
    //     DisclosureButton, 
    //     DisclosurePanel,
    //     // ChevronUpIcon
    // },
    });

</script>

<template>
    <div class="fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 sidebar-menu transition-transform" :class="{ '-translate-x-full': isSidebarOpen }">
        <a href="#" class="flex items-center pb-4 border-b border-b-gray-800">
            <img src="https://placehold.co/32x32" alt="" class="w-8 h-8 rounded object-cover">
            <span class="text-lg font-bold text-white ml-3">Admin</span>
        </a>
        <ul class="mt-4">
            
            <li class="mb-1 group active">
                <RouterLink :to="{ name : 'user'}" class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                    <i class="ri-home-2-line mr-3 text-lg"></i>
                    <span class="text-sm">Dashboard</span>
                </RouterLink>
            </li>
            <!-- <li class="mb-1 group">
                <div class="w-full ">
                    <div class="mx-auto w-full">
                    <Disclosure v-slot="{ open }">
                        <DisclosureButton
                            class="flex w-full justify-between items-center hover:bg-gray-950 hover:text-gray-100 rounded-md py-2 px-4"
                            >
                            <Routerlink :to="{ name : 'product'}" class="flex items-center text-gray-300  group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                                <i class="ri-instance-line mr-3 text-lg"></i>
                                <span class="text-sm">Order</span>
                            </Routerlink>
                            <ChevronUpIcon
                                :class="open ? 'rotate-180 transform' : 'rotate-90 transform'"
                                class="h-5 w-5 text-color-5"
                            />
                        </DisclosureButton>
                        <DisclosurePanel>
                        
                        <ul class="pl-7 mt-2 group-[.selected]:block">
                    <li class="mb-4">
                        <RouterLink :to="{ name : 'order'}" class="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Danh sách đơn hàng</RouterLink>
                    </li> 
                    <li class="mb-4">
                        <RouterLink :to="{name : 'order-confirmed'}" class="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Đơn hàng đã xác nhận</RouterLink>
                    </li> 
                    <li class="mb-4">
                        <RouterLink :to="{ name : 'deleted-product'}" class="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Đơn hàng đã hủy</RouterLink>
                    </li> 
                </ul>
                        
                        </DisclosurePanel>
                    </Disclosure>
                    
                    </div>
                </div>
            </li>
            <li class="mb-1 group">
                <div class="w-full ">
                    <div class="mx-auto w-full">
                    <Disclosure v-slot="{ open }">
                        <DisclosureButton
                            class="flex w-full justify-between items-center hover:bg-gray-950 hover:text-gray-100 rounded-md py-2 px-4"
                            >
                            <Routerlink :to="{ name : 'product'}" class="flex items-center text-gray-300  group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                                <i class="ri-instance-line mr-3 text-lg"></i>
                                <span class="text-sm">Product</span>
                            </Routerlink>
                            <ChevronUpIcon
                                :class="open ? 'rotate-180 transform' : 'rotate-90 transform'"
                                class="h-5 w-5 text-color-5"
                            />
                        </DisclosureButton>
                        <DisclosurePanel>
                        
                        <ul class="pl-7 mt-2 group-[.selected]:block">
                    <li class="mb-4" >
                        <RouterLink :to="{ name : 'product'}" class="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Danh sách sản phẩm</RouterLink>
                    </li> 
                    <li class="mb-4">
                        <RouterLink :to="{name : 'create'}" class="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Thêm sản phẩm</RouterLink>
                    </li> 
                    <li class="mb-4">
                        <RouterLink :to="{ name : 'deleted-product'}" class="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Sản phẩm đã xóa</RouterLink>
                    </li> 
                </ul>
                        
                        </DisclosurePanel>
                    </Disclosure>
                    
                    </div>
                </div>
            </li> -->
        </ul>
    </div>
    <div class="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay" :class="{ hidden: !isSidebarOpen }"></div>
</template>