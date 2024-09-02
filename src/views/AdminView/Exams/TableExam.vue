<!-- eslint-disable vue/no-unused-vars -->
<template>
    <div class="text-[50px] text-pink-500 font-great text-center">
            Danh sách bài kiểm tra
        </div>
    <div class="flex justify-between">
        <RouterLink :to="{ name : 'create-exam'}">
            <el-button type="primary" plain>Create bài kiểm tra</el-button>
        </RouterLink>
    </div>
    <div class="pt-8">
        <el-table :data="filterTableData">
            <el-table-column type="selection" width="55" />
            <el-table-column label="Tên bài kiểm tra" prop="title" />
            <el-table-column label="Môn học" prop="class" />
            <el-table-column label="Mô tả" prop="description" />
            <el-table-column label="Thời gian làm bài" prop="expire_time"/>
            <el-table-column align="right">
                <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" />
                </template>
                <template #default="scope">
                <el-button size="small">
                    <RouterLink :to="`/admin/edit-exam/${scope.row.id}`">
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


<script lang="ts" setup>
    import { computed, ref, onMounted } from 'vue'
    import { ElTable } from 'element-plus'
    import { RouterLink } from 'vue-router';
    import { getExamList } from '@/service/examsService';

    interface Exams {
        id : string
        title: string
        class : string,
        description : string,
        expire_time : Date,
        created_at: Date,
    }

    const search = ref('')
    const exams = ref<Exams[]>([]);


    const fetchProducts = () => {
        const fetchApi = async () => {
            const result = await getExamList()
            if(result){
                console.log(result['data']);
                
                exams.value = result['data']
            }
        }
        fetchApi();
    };

    onMounted(fetchProducts);

    const filterTableData =  computed(() =>
        exams.value.filter(
            (data) =>
                !search.value ||
                data.title.toLowerCase().includes(search.value.toLowerCase())
        )
    )



</script>
