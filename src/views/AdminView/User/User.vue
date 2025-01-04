<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-unused-vars -->
<script>
import TableUser from './TableUser.vue';
import { decodeToken } from '@/service/decodeToken'
import { getUserDetail } from '@/service/usersService';
export default {
    components: {
       TableUser 
    },
    created () {
        
    },
    methods: {
        
    },
}
</script>

<template>
    <div class="container">
        <TableUser />
    </div>
    
</template>