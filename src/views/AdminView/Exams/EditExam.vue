<template>
    
    <div class="mx-auto container bg-color-white"> 
        <div class="text-[50px] text-pink-500 font-great text-center">
            Thêm bài kiểm tra
        </div>
        <el-form
            class="w-full p-3"
            :model="sizeForm"
            label-width="auto"
            size="large"
        >
        <el-form-item label="Tên bài kiểm tra">
            <el-input v-model="sizeForm.title" />
        </el-form-item>
        <el-form-item label="Lớp học">
            <el-input v-model="sizeForm.class" />
        </el-form-item>
        <el-form-item label="Mô tả">
            <el-input v-model="sizeForm.description" />
        </el-form-item>
        <el-form-item label="Thời gian làm bài">
            <el-input v-model.number="sizeForm.duration" />
        </el-form-item>
        <el-form-item label="Số lượng câu hỏi">
            <el-input v-model.number="sizeForm.totalQuestion" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">Update</el-button>
            <el-button>Cancel</el-button>
        </el-form-item>
        </el-form>
    </div>
  </template>
  <!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-unused-vars -->
<script setup>

    import { onMounted, ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router';
    import { EditExam, getExamDetail } from '@/service/examsService';

    const router = useRouter()
    const options = ref([])
    const route = useRoute();
    const id = route.params.id;

    const sizeForm = ref({
        title: '',
        description: '',
        class: '',
        duration : '',
        totalQuestion : ''
    })
    
    const fetchData = () =>{
        const fetchApi = async () => {
            const result = await getExamDetail(id);
            sizeForm.value.title = result.data.title || '';
            sizeForm.value.description = result.data.description || '';
            sizeForm.value.class = result.data.class || '';
            sizeForm.value.duration = result.data.duration || '';
            sizeForm.value.totalQuestion = result.data.totalQuestion || '';
        }
        fetchApi();
    }
    onMounted(() => {
        fetchData();
    });

  const onSubmit = () => {
    const fetchApi = async () => {
        const result = await EditExam(id, sizeForm.value)
        if(result){
            console.log("Success");
            router.replace({name : 'exams'})
        }
    } 
    fetchApi();
    console.log(sizeForm);
}
</script>


  