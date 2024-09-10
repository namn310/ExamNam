<!-- eslint-disable vue/no-unused-vars -->
<template>
    <div class="text-[50px]  text-center">
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
            <el-table-column label="Lớp học" prop="class" />
            <el-table-column label="Mô tả" prop="description" />
            <el-table-column label="Danh mục bài thi" prop="category"/>
            <el-table-column label="Thời gian làm bài" prop="duration"/>
            <el-table-column label="Số lượng câu hỏi" prop="totalQuestion"/>
            <el-table-column align="right">
                <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" />
                </template>
                <template #default="scope">
                    <el-button size="small" type="primary" plain>
                        <RouterLink :to="`/admin/detail-exam/${scope.row.id}`">
                            Detail
                        </RouterLink>  
                    </el-button>
                    <el-button size="small">
                        <RouterLink :to="`/admin/edit-exam/${scope.row.id}`">
                            Edit
                        </RouterLink>   
                    </el-button>
                    <el-popconfirm
                        title="Are you sure to delete this?"
                        @confirm="handleDelete(scope.row.id)"
                        >
                        <template #reference>
                            <el-button size="small" type="danger">
                            Delete
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="totalPage * 10" @current-change="handlePageChange"/>
    </div>
</template>


<script lang="ts" setup>
    import { computed, ref, onMounted } from 'vue'
    import { ElTable } from 'element-plus'
    import { RouterLink } from 'vue-router';
    import { deleteExam, getExamList } from '@/service/examsService';

    let page = 1;
    const totalPage = ref(1)

    const handlePageChange = (newPage) =>{
        page = newPage;  
        fetchData();
    }

    interface Exams {
        id : string
        title: string
        class : string,
        description : string,
        duration : Date,
        created_at: Date,
        totalQuestion : Int16Array,
        category : string
    }

    const search = ref('')
    const exams = ref<Exams[]>([]);


    const fetchData = () => {
        const fetchApi = async () => {
            const result = await getExamList(page)
            if(result){
                exams.value = result['data']['data']
                totalPage.value = result['data']['total_page']
            }
        }
        fetchApi();
    };

    onMounted(fetchData);

    const filterTableData =  computed(() =>
        exams.value.filter(
            (data) =>
                !search.value ||
                data.title.toLowerCase().includes(search.value.toLowerCase())
        )
    )

    const handleDelete = async (row: Exams) => {
        const result = await deleteExam(row)
        if(result){
            fetchData()
        }
         console.log("ok");
         
    } 



</script>
