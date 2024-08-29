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
        <el-form-item label="Môn học">
            <el-input v-model="sizeForm.title" />
        </el-form-item>
        <el-form-item label="Mô tả">
            <el-input v-model="sizeForm.description" />
        </el-form-item>
        
        <el-form-item label="Thời gian làm bài">
            <el-input v-model.number="sizeForm.time" />
        </el-form-item>
        <el-form-item label="Trạng thái">
            <el-input v-model="sizeForm.description" />
        </el-form-item>
        
        
        
        
        <el-form-item>
            <el-button type="primary">Create</el-button>
            <el-button>Cancel</el-button>
        </el-form-item>
        </el-form>
    </div>
  </template>
  <!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-unused-vars -->
<script setup>

    import { onMounted, reactive, ref } from 'vue'
    import { useRouter } from 'vue-router';


    const data = ref({ permissions: [] });


  
  const sizeForm = reactive({
    title: '',
    description: '',
    time: '',
    oldPrice : '',
  })

</script>

  