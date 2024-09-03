<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ElTable } from 'element-plus';
import { RouterLink } from 'vue-router';

interface Data {
    id: number,
    name: string,
    email: string,
    role: string,
    created_at: string,
}

const search = ref('')
const data = ref<Data[]>([
    {
        id: 1,
        name: "manh",
        email: "manh@example.com",
        role: "student",
        created_at: "2024-09-01 12:00:00"
    },
    {
        id: 2,
        name: "amnh",
        email: "amnh@example.com",
        role: "admin",
        created_at: "2024-09-02 14:30:00"
    }
])

const filterTableData = computed(() =>
    data.value.filter(
        (user) =>
            !search.value ||
            user.name.toLowerCase().includes(search.value.toLowerCase()) ||
            user.email.toLowerCase().includes(search.value.toLowerCase())
    )
)

type Option = {
    id: number
    label: string
    sort: string
    value: string
}
const value = ref<Option>()
const options = ref<Option[]>([
    { id: 1, label: 'Tên A-Z', sort: 'name', value: 'asc' },
    { id: 2, label: 'Tên Z-A', sort: 'name', value: 'desc' },
    { id: 3, label: 'Ngày tạo cũ nhất', sort: 'created_at', value: 'asc' },
    { id: 4, label: 'Ngày tạo mới nhất', sort: 'created_at', value: 'desc' },
])

</script>

<template>
    <div class="text-[50px] text-pink-500 font-great text-center">
        Danh sách người dùng
    </div>
    <div class="flex justify-between">
        <RouterLink :to="{ name: 'create-user' }">
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
            <el-table-column label="Tên" prop="name" />
            <el-table-column label="Email" prop="email" />
            <el-table-column label="Vai trò" prop="role" />
            <el-table-column label="Ngày tạo" prop="created_at" />
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" size="small" placeholder="Type to search" />
                </template>
                <template #default="scope">
                    <el-button size="small">
                        <RouterLink :to="`/edit/${scope.row.id}`">
                            Edit
                        </RouterLink>   
                    </el-button>
                    <el-button size="small" type="danger">
                        Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
