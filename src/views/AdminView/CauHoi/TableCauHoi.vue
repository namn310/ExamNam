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
        <table class="table table-hover table-bordered text-center" id="sampleTable" v-for="(  result, index) in data"
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
            <tbody id="table-product" v-for="     question in result      " :key=" question.id ">
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
                        <button class="btn btn-success btn-sm edit ms-2" type="button" title="Sửa" id="show-emp">
                            <i class="fas fa-edit"></i>
                        </button>
                        <p>{{ errorPost }}</p>
                    </td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-primary" @click=" postQuestion ">click</button>
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
export default {
    data () {
        return {
            showModalDelete: false,
            showModalEdit: false,
            currentQuestionId: null,
            data: [],
            Error: null,
            ques: [
                {
                    "class": 11,
                    "Subject": "Englishhhhh",
                    "title": "hsg",
                    "A": "1",
                    "B": "2",
                    "C": "3",
                    "D": "4",
                    "correctAns": "A",
                    "created_at": "2024-08-31 00:00:00",
                    "created_by": 1
                }
            ],
            errorPost: '',
        }
    },
    // components: {
    //     ModalView
    // },
    mounted () {
        this.fetchData();
    },
    methods: {
        async fetchData () {
            try
            {
                const response = await fetch('http://localhost:8080/questions');
                if (!response.ok)
                {
                    this.Error = 'Nhận dữ liệu thất bại';
                }
                else
                {
                    const data = await response.json();
                    this.data = data;
                }
            }
            catch (error)
            {
                this.error = "Nhận dữ liệu thất bại";
            }
        },
        // toggleModalDelete (questionId) {
        //     this.currentQuestionId = questionId;
        //     this.showModalDelete = !this.showModalDelete;
        // },
        toggleModalEdit () {
            this.showModalEdit = !this.showModalEdit
        },
        async DeleteQuestion (questionId) {
            this.currentQuestionId = questionId;
            // confirm("Xác nhận xóa câu hỏi này");
            const a = confirm("Xác nhận xóa câu hỏi này");
            try
            {
                if (a != true)
                {
                    alert('Cancel');
                }
                const response = await fetch(`http://localhost:8080/questions/delete/${this.currentQuestionId}`, {
                    method: 'DELETE',
                });
                if (!response.ok)
                {
                    alert("Xóa câu hỏi thất bại");
                }
                this.data.filter(data => data.id !== this.currentQuestionId);
                alert("Xóa câu hỏi thành công !");
            }
            catch (Error)
            {
                console.log(Error);
            }
        },
        async postQuestion () {
            try
            {
                const response = await fetch('http://localhost:8080/questions/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' // Set Content-Type to JSON
                    },
                    body: JSON.stringify(this.ques[0])
                });
                if (!response.ok)
                {
                    alert("Thêm câu hỏi không thành công !");
                }
                alert("Thêm câu hỏi thành công !");
                window.location.reload();
            }
            catch (Error)
            {
                alert(`${Error.message}`);
            }
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
