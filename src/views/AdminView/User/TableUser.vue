<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { ElTable } from 'element-plus';
import { RouterLink } from 'vue-router';
import { getUserList } from '@/service/usersService';


interface Users {
    id: number,
    name: string,
    password: string;
    email: string,
    role: string,
    create_at: Date,
}

const search = ref('')
const users = ref<Users[]>([])

// Hàm lấy danh sách người dùng
const fetchUsers = async () => {
    try {
        const result = await getUserList();
        if (result) {
            users.value = result['data'];
        }
    } catch (error) {
        console.error("Lỗi không thể tải thông tin người dùng:", error);
    }
};

// Gọi hàm lấy danh sách người dùng được gọi khi component được tạo
    onMounted(fetchUsers);
// Lọc dữ liệu người dùng theo tên
    const filterTableData =  computed(() =>
        users.value.filter(
            (data) =>
                !search.value ||
                data.name.toLowerCase().includes(search.value.toLowerCase())
        )
    )

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
        <el-table :data="filterTableData">
            <el-table-column type="selection" width="55" />
            <el-table-column label="ID" prop="id" />
            <el-table-column label="Tên" prop="name" />
            <el-table-column label="Mật khẩu" prop="password" />
            <el-table-column label="Email" prop="email" />
            <el-table-column label="Vai trò" prop="role" />
            <el-table-column label="Ngày tạo" prop="create_at" />
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
