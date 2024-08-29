<template>
    
    <div class="mx-auto container bg-color-white"> 
        <div class="text-[50px] text-pink-500 font-great text-center">
            Thêm sản phẩm
        </div>
        <el-form
            class="w-full p-3"
            :model="sizeForm"
            label-width="auto"
            size="large"
        >
        <el-form-item label="Title">
            <el-input v-model="sizeForm.title" />
        </el-form-item>
        <el-form-item label="Description">
            <el-input v-model="sizeForm.description" />
        </el-form-item>
        
        <el-form-item label="Giá">
            <el-input v-model.number="sizeForm.price" />
        </el-form-item>
        <el-form-item label="Giá cũ">
            <el-input v-model.number="sizeForm.oldPrice" />
        </el-form-item>
        <el-form-item label="Ảnh">
            <el-button size="small" type="primary">Chọn ảnh</el-button>
        </el-form-item>
        <el-form-item label="Vị trí">
            <el-input v-model.number="sizeForm.position" />
        </el-form-item>
        <el-form-item label="Status">
            <el-radio-group v-model="sizeForm.status">
            <el-radio border value="active">Hoạt động</el-radio>
            <el-radio border value="inactive">Dừng hoạt động</el-radio>
            </el-radio-group>
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
    image: '',
    price: 0,
    status: '',
    position : '',
    oldPrice : '',
    parentId : '',
  })

</script>

  