<!-- eslint-disable vue/multi-word-component-names -->

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import { RouterLink } from 'vue-router';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronUpIcon } from '@heroicons/vue/20/solid'
import Cookies from 'js-cookie';
import { decodeToken } from '@/service/decodeToken'
import { getUserDetail } from '@/service/usersService';
export default {
    data() {
        return {
            url: '/src/assets/img/3781986.png',
            role: null,
        }
    },
    props: {
        isSidebarOpen: {
            type: Boolean,
            required: true,
        },
    },
    components: {
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        ChevronUpIcon
    },
    created() {
        this.fetchUser()
    },
    methods: {
        async fetchUser() {
            const a = decodeToken()
            const data2 = await getUserDetail( a.data.id )
            this.role = data2.data.role
            // console.log(data2.data.role)
        },
        logout() {
            Cookies.remove( 'tokenAdmin' )
            window.location.reload();
            this.$router.push( { name: 'Login' } )
        },
    }
}

</script>

<template>
    <div class="fixed left-0 top-0 w-64 max-md:w-40 h-full bg-gray-900 p-4 max-md:p-2  z-50 sidebar-menu transition-transform"
        :class=" { '-translate-x-full': isSidebarOpen } ">
        <div class="flex items-center pb-4 border-b border-b-gray-800">
            <img :src=" url " class="image-fluid w-8 h-8">
            <span class="text-lg font-bold text-white ml-3">Quản lý</span>
        </div>
        <ul class="mt-4">

            <li class="mb-1 group active">
                <RouterLink :to=" { name: 'homeAdmin' } "
                    class="flex items-center justify-center py-2 px-4 max-md:py-1 max-md:px-2 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                    <i class="ri-home-2-line mr-3 max-md:mr-1 text-lg"></i>
                    <span class="text-sm">Dashboard</span>
                </RouterLink>
            </li>
            <li v-if=" role === 'admin' " class="mb-1 group">
                <div class="w-full ">
                    <div class="mx-auto w-full">
                        <Disclosure v-slot=" { open } ">
                            <DisclosureButton
                                class="flex w-full justify-between items-center hover:bg-gray-950 hover:text-gray-100 rounded-md py-2 px-4 max-md:py-1 max-md:px-2 max-md:justify-center">
                                <Routerlink :to=" { name: 'product' } "
                                    class="flex items-center text-gray-300  group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                                    <i class="fa-solid fa-user-group fa-lg me-2"></i>
                                    <span class="text-sm">Người dùng</span>
                                </Routerlink>
                                <ChevronUpIcon :class=" open ? 'rotate-180 transform' : 'rotate-90 transform' "
                                    class="h-5 w-5 text-white" />
                            </DisclosureButton>
                            <DisclosurePanel>

                                <ul class="pl-7 mt-2 group-[.selected]:block">
                                    <li class="mb-4">
                                        <RouterLink :to=" { name: 'user' } "
                                            class="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3 max-md:text-xs">
                                            Danh sách người dùng</RouterLink>
                                    </li>
                                    <li class="mb-4">
                                        <RouterLink :to=" { name: 'create-user' } "
                                            class="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3 max-md:text-xs">
                                            Tạo tài khoản người dùng</RouterLink>
                                    </li>

                                </ul>
                            </DisclosurePanel>
                        </Disclosure>

                    </div>
                </div>
            </li>
            <!-- Câu hỏi -->
            <li class="mb-1 group">
                <div class="w-full ">
                    <div class="mx-auto w-full">
                        <Disclosure v-slot=" { open } ">
                            <DisclosureButton
                                class="flex w-full justify-between items-center hover:bg-gray-950 hover:text-gray-100 rounded-md py-2 px-4 max-md:py-1 max-md:px-2 max-md:justify-center">
                                <Routerlink :to=" { name: 'product' } "
                                    class="flex items-center text-gray-300  group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                                    <i class="fa-solid fa-file-circle-question fa-lg me-2"></i>
                                    <span class="text-sm">Câu hỏi</span>
                                </Routerlink>
                                <ChevronUpIcon :class=" open ? 'rotate-180 transform' : 'rotate-90 transform' "
                                    class="h-5 w-5 text-white" />
                            </DisclosureButton>
                            <DisclosurePanel>

                                <ul class="pl-7 mt-2 group-[.selected]:block">
                                    <li class="mb-4">
                                        <RouterLink :to=" { name: 'cauhoi' } "
                                            class="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
                                            Danh sách câu hỏi</RouterLink>
                                    </li>
                                    <li class="mb-4">
                                        <RouterLink :to=" { name: 'create-cauhoi' } "
                                            class="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
                                            Tạo câu hỏi</RouterLink>
                                    </li>
                                    <!-- <li class="mb-4">
                        <RouterLink :to="{ name : 'user'}" class="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Câu hỏi đã hủy</RouterLink>
                    </li>  -->
                                </ul>

                            </DisclosurePanel>
                        </Disclosure>

                    </div>
                </div>
            </li>
            <!-- Exams -->
            <li class="mb-1 group">
                <div class="w-full ">
                    <div class="mx-auto w-full">
                        <Disclosure v-slot=" { open } ">
                            <DisclosureButton
                                class="flex w-full justify-between items-center hover:bg-gray-950 hover:text-gray-100 rounded-md py-2 px-4">
                                <Routerlink :to=" { name: 'product' } "
                                    class="flex items-center text-gray-300  group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                                    <i class="fa-regular fa-clipboard fa-lg me-2"></i>
                                    <span class="text-sm">Kiểm tra</span>
                                </Routerlink>
                                <ChevronUpIcon :class=" open ? 'rotate-180 transform' : 'rotate-90 transform' "
                                    class="h-5 w-5 text-white" />
                            </DisclosureButton>
                            <DisclosurePanel>

                                <ul class="pl-7 mt-2 group-[.selected]:block">
                                    <li class="mb-4">
                                        <RouterLink :to=" { name: 'exams' } "
                                            class="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
                                            Danh sách bài kiểm tra</RouterLink>
                                    </li>
                                    <li class="mb-4">
                                        <RouterLink :to=" { name: 'create-exam' } "
                                            class="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
                                            Tạo bài kiểm tra Random câu hỏi</RouterLink>
                                    </li>
                                    <li class="mb-4">
                                        <RouterLink :to=" { name: 'create-exam-option' } "
                                            class="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
                                            Tạo bài kiểm tra tùy chọn</RouterLink>
                                    </li>
                                    <li class="mb-4">
                                        <RouterLink :to=" { name: 'categoryExam' } "
                                            class="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
                                            Danh mục bài kiểm tra</RouterLink>
                                    </li>
                                    <!-- <li class="mb-4">
                        <RouterLink :to="{ name : 'user'}" class="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Bài kiểm tra đã làm</RouterLink>
                    </li>  -->
                                </ul>

                            </DisclosurePanel>
                        </Disclosure>

                    </div>
                </div>
            </li>
            <li class="mb-1 group">
                <div class="w-full ">
                    <div class="mx-auto w-full">
                        <Disclosure>
                            <DisclosureButton
                                class="flex w-full justify-between items-center hover:bg-gray-950 hover:text-gray-100 rounded-md py-2 px-4">
                                <RouterLink :to=" { name: 'class' } "
                                    class="flex items-center text-gray-300  group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                                    <i class="fa-solid fa-graduation-cap fa-lg me-2"></i>
                                    <span class="text-sm">Lớp học</span>
                                </RouterLink>
                            </DisclosureButton>

                        </Disclosure>

                    </div>
                </div>
            </li>
            <!-- tài khoản -->
            <li class="mb-1 group">
                <div class="w-full ">
                    <div class="mx-auto w-full">
                        <Disclosure v-slot=" { open } ">
                            <DisclosureButton
                                class="flex w-full justify-between items-center hover:bg-gray-950 hover:text-gray-100 rounded-md py-2 px-4">
                                <Routerlink :to=" { name: 'product' } "
                                    class="flex items-center text-gray-300  group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                                    <i class="fa-solid fa-user fa-lg me-2"></i>
                                    <span class="text-sm">Tài khoản</span>
                                </Routerlink>
                                <ChevronUpIcon :class=" open ? 'rotate-180 transform' : 'rotate-90 transform' "
                                    class="h-5 w-5 text-white" />
                            </DisclosureButton>
                            <DisclosurePanel>

                                <ul class="pl-7 mt-2 group-[.selected]:block">
                                    <li class="mb-4">
                                        <RouterLink :to=" { name: 'userDetailAdmin' } "
                                            class="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
                                            Thông tin</RouterLink>
                                    </li>
                                    <!-- <li class="mb-4">
                                        <RouterLink :to=" { name: 'create-exam' } "
                                            class="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
                                            Đổi mật khẩu</RouterLink>
                                    </li> -->
                                </ul>

                            </DisclosurePanel>
                        </Disclosure>

                    </div>
                </div>
            </li>
            <!-- end tài khoản -->
            <li class="mb-1 group">
                <div class="w-full ">
                    <div class="mx-auto w-full">
                        <Disclosure>
                            <DisclosureButton
                                class="flex w-full justify-between items-center hover:bg-gray-950 hover:text-gray-100 rounded-md py-2 px-4">
                                <Routerlink :to=" { name: 'userDetailAdmin' } "
                                    class="flex items-center text-gray-300  group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                                    <i class="fa-solid fa-right-from-bracket fa-lg me-2"></i>
                                    <span @click="logout()" class="text-sm">Đăng xuất</span>
                                </Routerlink>

                            </DisclosureButton>

                        </Disclosure>

                    </div>
                </div>
            </li>
        </ul>
    </div>
    <!-- <div class="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay" :class="{ hidden: !isSidebarOpen }"></div> -->
</template>