<script lang="ts" setup>
    import { computed, ref, onMounted } from 'vue'
    import { ElTable } from 'element-plus';
    import { RouterLink } from 'vue-router';

    interface Data {
        id : string
        UserName: string
        email: string,
        FullName: string,
    }

    const search = ref('')
    const data = ref([
        {
            id : 1,
            UserName : "H",
            email : "s",
            FullName : "d"
        },
        {
            id : 2,
            UserName : "H",
            email : "s",
            FullName : "V"
        }
    ])


    const filterTableData =  computed(() =>
        data.value.filter(
            (data) =>
                !search.value ||
                data.FullName.toLowerCase().includes(search.value.toLowerCase())
        )
    )
    
    type Option = {
        id: number
        label: string
        desc: string
    }
    const value = ref<Option>()
    const options = ref([
        { id: 1, label: 'Tiêu đề giảm dần', sort: 'title', value:'asc' },
        { id: 2, label: 'Tiêu đề tăng dần', sort: 'title', value: 'desc' },
        { id: 3, label: 'Giá giảm dần', sort: 'price', value: "desc" },
        { id: 4, label: 'Giá tăng dần', sort: 'price', value : "asc"},
        { id: 5, label: 'Vị trí giảm dần', sort: 'position', value : "desc"},
        { id: 6, label: 'Vị trí tăng dần', sort: 'position', value : "asc"},
    ])

</script>

<template>
    <div class="text-[50px] text-pink-500 font-great text-center">
            Danh sách sản phẩm
        </div>
    <div class="flex justify-between">
        <RouterLink :to="{ name : 'create-user'}">
            <el-button type="primary" plain>Create User</el-button>
        </RouterLink>
    </div>
    <div class="pt-8">
        <div class="m-4">
            <el-select
                v-model="value"
                value-key="id"
                placeholder="Sắp xếp"
                style="width: 240px"
            >
            <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.label"
                :value="item"
            />
            </el-select>
        </div>
        <el-table :data="filterTableData">
            <el-table-column type="selection" width="55" />
            <el-table-column label="FullName" prop="FullName" />
            <el-table-column label="email" prop="email" />
            <el-table-column label="UserName" prop="UserName" />
            <el-table-column align="right">
                <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" />
                </template>
                <template #default="scope">
                <el-button size="small">
                    <RouterLink :to="`/`">
                        Edit
                    </RouterLink>   
                    </el-button>
                <el-button
                    size="small"
                    type="danger"
                >
                    Delete
                </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- <el-pagination background layout="prev, pager, next" :total="totalPage * 10" @current-change="handlePageChange"/> -->
    </div>
  </template>
  
  