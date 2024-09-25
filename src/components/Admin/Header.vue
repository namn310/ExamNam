<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { createPopper } from '@popperjs/core';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    props: {
        toggleSidebar: {
        type: Function,
        required: true,
    },
  },
  data() {
    return {
      isDropdownOpen: false,
      popperInstance: null,
    };
  },
  computed: {
    BreakCurmp() {
      return this.$route.name.toUpperCase();
    },
  },
  methods: {
    handleLogout() {
        // eslint-disable-next-line no-unused-vars
        const router = useRouter()
        localStorage.removeItem('token')
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
      if (this.isDropdownOpen) {
        this.showPopper();
      } else {
        this.hidePopper();
      }
    },
    showPopper() {
      if (!this.popperInstance) {
        this.popperInstance = createPopper(
          this.$refs.toggle,
          this.$refs.menu,
          {
            modifiers: [
              { name: 'offset', options: { offset: [0, 8] } },
              { name: 'preventOverflow', options: { padding: 24 } },
            ],
            placement: 'bottom-end',
          }
        );
      }
    },
    hidePopper() {
      if (this.popperInstance) {
        this.popperInstance.destroy();
        this.popperInstance = null;
      }
    },
    handleClickOutside(event) {
      if (
        this.isDropdownOpen &&
        !this.$refs.dropdown.contains(event.target)
      ) {
        this.isDropdownOpen = false;
        this.hidePopper();
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
    if (this.popperInstance) {
      this.popperInstance.destroy();
    }
  },
};
</script>


<template>
    <div class="py-2 px-6 bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
        <button type="button" class="text-lg text-gray-600 sidebar-toggle max-md:hidden" @click="toggleSidebar">
            <i class="ri-menu-line"></i>
        </button>
        
        <ul class="flex items-center text-sm ml-4">
            <li class="mr-2">
                <a href="#" class="text-gray-400 hover:text-gray-600 font-medium">Admin</a>
            </li>
            <li class="text-gray-600 mr-2 font-medium"></li>
            <li class="text-gray-600 mr-2 font-medium"></li>
        </ul>
        <ul class="ml-auto flex items-center">
            <button type="button" class="text-lg text-gray-600 sidebar-toggle md:hidden" @click="toggleSidebar">
                <i class="ri-menu-line"></i>
            </button>
            <li class="dropdown ml-3" ref="dropdown">
                <button
                type="button"
                class="dropdown-toggle flex items-center"
                @click="toggleDropdown"
                ref="toggle"
                >
                <img
                    src="https://placehold.co/32x32"
                    alt=""
                    class="w-8 h-8 rounded block object-cover align-middle"
                />
                </button>
                <ul
                :class="{ hidden: !isDropdownOpen }"
                class="dropdown-menu shadow-md shadow-black/5 z-30 py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]"
                ref="menu"
                >
                <li>
                    <a
                    href="#"
                    class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                    >Profile</a>
                </li>
                <li>
                    <a
                    href="#"
                    class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                    >Settings</a>
                </li>
                <li @click="handleLogout">
                    <a
                    href="#"
                    class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                    >Logout</a>
                </li>
                </ul>
            </li>
        </ul>
        
    </div>
</template>