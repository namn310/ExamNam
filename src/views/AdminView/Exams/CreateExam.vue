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
        <el-form-item label="Mô tả">
            <el-input v-model="sizeForm.description" />
        </el-form-item>
        <el-form-item label="Thời hạn làm bài">
            <el-input v-model="sizeForm.expire_time" />
            <div class="demo-datetime-picker">
                <div class="block">
                    <el-date-picker
                        v-model="sizeForm.expire_time"
                        type="datetime"
                        placeholder="Select date and time"
                        format="YYYY-MM-DD HH:mm:ss"
                        date-format="MMM DD, YYYY"
                        time-format="HH:mm"
                    />
                </div>
            </div>
        </el-form-item>
        <el-form-item label="Thời gian làm bài">
            <el-input v-model="sizeForm.duration" />
        </el-form-item>
        <el-form-item label="Lớp học">
            <el-input v-model.number="sizeForm.class" />
        </el-form-item>
        <el-form-item label="Số lượng câu hỏi">
            <el-input v-model.number="sizeForm.totalQuestion" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button>Cancel</el-button>
        </el-form-item>
        </el-form>
    </div>
  </template>
  <!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-unused-vars -->
<script setup>

    import { createExam } from '@/service/examsService';
    import { onMounted, reactive, ref } from 'vue'
    import { useRouter } from 'vue-router';

    const router = useRouter()

  const sizeForm = reactive({
    title: '',
    description: '',
    class: '',
    expire_time : '',
    duration : '',
    totalQuestion : '',
    id_user : 1
  })

  const onSubmit = () => {
    const fetchApi = async () => {
        const result = await createExam(sizeForm)
        if(result){
            console.log("Success");
            router.replace({name : 'exams'})
        }
    } 
    fetchApi();
    console.log(sizeForm);
    
}

</script>


  