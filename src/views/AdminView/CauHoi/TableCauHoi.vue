<!-- eslint-disable vue/no-unused-vars -->
<template>
    <div class="text-[50px] text-pink-500 font-great text-center">
            Danh sách câu hỏi
        </div>
    <div class="flex justify-between">
        <RouterLink :to="{ name : 'create-cauhoi'}">
            <el-button type="primary" plain>Create câu hỏi</el-button>
        </RouterLink>
    </div>
    <div class="pt-8">
        <el-table :data="filterTableData">
            <el-table-column type="selection" width="55" />
            <el-table-column label="Tên câu hỏi"  prop="title"/>
            <el-table-column label="Bài kiểm tra" prop="Subject" />
            <el-table-column label="Thời gian tạo" prop="created_at"/>
            <el-table-column label="Đáp án" prop="correctAns" />
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

<script lang="ts" setup>
    import { computed, ref, onMounted } from 'vue'
    import { ElTable } from 'element-plus'
    import { RouterLink } from 'vue-router';
    import { getQuestionList } from '@/service/questionsService';

    interface Questions {
        id : string
        title: string
        Subject : string
        created_at: Date,
        correctAns : string
    }

    const search = ref('')
    const questions = ref<Questions[]>([]);


    const fetchProducts = () => {
        const fetchApi = async () => {
            const result = await getQuestionList()
            if(result){
                questions.value = result
            }
        }
        fetchApi();
    };

    onMounted(fetchProducts);

    const filterTableData =  computed(() =>
        questions.value.filter(
            (data) =>
                !search.value ||
                data.title.toLowerCase().includes(search.value.toLowerCase())
        )
    )



</script>
