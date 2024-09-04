<!-- eslint-disable vue/no-unused-vars -->
<template>
    <div class="text-[50px] text-black-500 text-center">
        Danh sách câu hỏi
    </div>
    <div class="flex justify-between">
        <RouterLink :to=" { name: 'create-cauhoi' } ">
            <el-button type="primary" plain>Create câu hỏi</el-button>
        </RouterLink>
    </div>
    <div class="pt-8">
        <table class="table table-hover table-bordered text-center" id="sampleTable" v-for="(   result, index) in data"
            :key=" index ">
            <thead>
                <tr class="table-primary text-center">
                    <th>Mã câu hỏi</th>
                    <th>Câu hỏi</th>
                    <th>Môn</th>
                    <th>Lớp</th>
                    <th>Người tạo</th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="table-product" v-for="      question in result       " :key=" question.id ">
                <tr>
                    <td>{{ question.id }}</td>
                    <td>{{ question.title }}</td>
                    <td>{{ question.Subject }}</td>
                    <td>{{ question.class }}</td>
                    <td>{{ question.created_by }}</td>
                    <td>
                        <!-- button delete -->
                        <button class="btn btn-danger btn-sm trash" type="button" @click="DeleteQuestion( question.id )"
                            title="Xóa">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                        <!-- <ModalView :visible="showModalDelete" @close="toggleModalDelete">
                            <template v-slot:modal-body>
                                <p>Xác nhận xóa câu hỏi này</p>
                            </template>
<template v-slot:buttonConfirm>
                                <button class="btn btn-primary ms-2">Xóa</button>
                            </template>
</ModalView> -->
                        <!-- button change -->
                        <button class="btn btn-success btn-sm edit ms-2" @click="changeQuestion(question.id)" type="button" title="Sửa" id="show-emp">
                            <i class="fas fa-edit"></i>
                        </button>
                        <p>{{ errorPost }}</p>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- <el-table :data=" filterTableData ">
            <el-table-column type="selection" width="55" />
            <el-table-column label="Câu hỏi" prop="title" />
            <el-table-column label="Lớp" prop="Subject" />
            <el-table-column label="Thời gian tạo" prop="created_at" />
            <el-table-column label="Đáp án" prop="correctAns" />
            <el-table-column label="Người tạo" prop="created_by" />
            <el-table-column align="right">
                <template #header>
                    <el-input v-model=" search " size="small" placeholder="Type to search" />
                </template>
<template #default=" scope ">
                    <el-button size="small">
                        <RouterLink :to=" `/` ">
                            Edit
                        </RouterLink>
                    </el-button>
                    <el-button size="small" type="danger">
                        Delete
                    </el-button>
                </template>
</el-table-column>
</el-table> -->
        <!-- <el-pagination background layout="prev, pager, next" :total="totalPage * 10" @current-change="handlePageChange"/> -->
    </div>
</template>

<script>
// import { computed, ref, onMounted } from 'vue'
// import { ElTable } from 'element-plus'
// import { RouterLink } from 'vue-router';
// import { resolveTypeElements } from 'vue/compiler-sfc';
// import ModalView from '@/components/ModalView.vue';
// import { fa } from 'element-plus/es/locale';
import { getQuestionList, DeleteQues } from '@/service/questionsService';
export default {
    data () {
        return {
            showModalDelete: false,
            showModalEdit: false,
            currentQuestionId: null,
            data: [],
            Error: null,        }
    },
    // components: {
    //     ModalView
    // },
    created () {
        this.fetchQuestion();
    },
    methods: {
        async fetchQuestion () {
            try
            {
                const result = await getQuestionList();
                if (result)
                {
                    this.data = result; // Assuming 'data' is a property of the result
                }
                else
                {
                    alert("Có lỗi trong quá trình lấy dữ liệu");
                }
            } catch (error)
            {
                console.error('Error fetching question list:', error);
            }
        },

        toggleModalEdit () {
            this.showModalEdit = !this.showModalEdit
        },

        async DeleteQuestion (questionId) {
            this.currentQuestionId=questionId
            try
            {
                const del = await DeleteQues(this.currentQuestionId);
                if (del)
                {
                    // this.data.filter(data => data.id !== this.currentQuestionId);
                    alert("Xóa câu hỏi thành công");
                     window.location.reload();

                }
                else
                {
                    alert("Xóa không thành công ! Có lỗi xảy ra");
                }
            }
            catch (Error)
            {
                alert("Lỗi ".Error);
            }
        },
        changeQuestion (questionId) {
            this.currentQuestionId = questionId;
            this.$router.push({ name: 'changeQues', params: { id: this.currentQuestionId } });
        }
    }
}
// import { getQuestionList } from '@/service/questionsService';

// interface Questions {
//     id: string
//     title: string
//     Subject: string
//     created_at: Date,
//     correctAns: string,
//     created_by: string
// }

// const search = ref( '' )
// const questions = ref<Questions[]>( [] );

// const filterTableData = computed( () =>
//     questions.value.filter(
//         ( data ) =>
//             !search.value ||
//             data.title.toLowerCase().includes( search.value.toLowerCase() )
//     )
// )




</script>
