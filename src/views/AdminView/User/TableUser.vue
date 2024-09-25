<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox, ElTable } from 'element-plus';
import { RouterLink } from 'vue-router';
import { deleteUser, getUserList } from '@/service/usersService';


interface Users {
    id: number,
    name: string,
    email: string,
    role: string,
    create_at: Date,
}

const search = ref('')
const users = ref<Users[]>([])

const currentPage = ref(1) // Trang hiện tại
const pageSize = ref(10) // Số lượng người dùng hiển thị trên mỗi trang
// Hàm lấy danh sách người dùng
const fetchData = () => {
        const fetchUser = async () => {
            const result = await getUserList();
            if(result){
                users.value = result['data']['data']    
            }
        }
        fetchUser();
    };

// Gọi hàm lấy danh sách người dùng được gọi khi component được tạo
    onMounted(fetchData);
// Lọc dữ liệu người dùng theo tên
    const filterTableData =  computed(() =>
        users.value.filter(
            (data) =>
                !search.value ||
                data.name.toLowerCase().includes(search.value.toLowerCase())
        )
    )
    // Dữ liệu người dùng phân trang
    const paginationUsers = computed(() => {
        const start = (currentPage.value - 1) * pageSize.value;
        const end = start + pageSize.value;
        return filterTableData.value.slice(start, end);
    })
    // Hàm chuyển trang
    const handleChange = (page : number) =>{
        currentPage.value = page;
    }
    const onDelete = async (row: Users) => {
        try{
            await ElMessageBox.confirm(
                'Bạn có chắc chắn muốn xóa người dùng này không?',
                'Xác nhận xóa',
                {
                    confirmButtonText: 'Xác nhận',
                    cancelButtonText: 'Hủy',
                    type: 'warning',
                }
            );
            const result = await deleteUser(row);
            if (result) {
                ElMessage.success('Xóa người dùng thành công');
                fetchData();
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi khi xóa người dùng:', error);
            ElMessage.error('Xóa người dùng thất bại');
        }
    }
</script>

<template>
    <div class="text-[50px] text-center">
        Danh sách người dùng
    </div>
    <div class="flex justify-between">
        <RouterLink :to="{ name: 'create-user' }">
            <el-button type="primary" plain>Create User</el-button>
        </RouterLink>
    </div>
    <div class="pt-8">
        <el-table :data="paginationUsers">
            <el-table-column type="selection" width="55" />
            <el-table-column label="ID" prop="id" />
            <el-table-column label="Tên" prop="name" />
            <el-table-column label="Email" prop="email" />
            <el-table-column label="Vai trò" prop="role" />
            <el-table-column label="Ngày tạo" prop="create_at" />
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" size="small" placeholder="Type to search" />
                </template>
                <template #default="scope">
                    <el-button size="small">
                        <RouterLink :to= "`/admin/changeUser/${scope.row.id}`">
                            Edit
                        </RouterLink>   
                    </el-button>
                    <el-button size="small" type="danger" @click="onDelete(scope.row.id)">
                        Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--Phân trang-->
        <el-pagination
            @current-change="handleChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="filterTableData.length"
        />
    </div>
</template>
