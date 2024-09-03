<template>
    <div class="mx-auto container bg-color-white">
      <div class="text-[50px] text-pink-500 font-great text-center">
        Thêm người dùng
      </div>
      <el-form
        class="w-full p-3"
        :model="userForm"
        label-width="auto"
        size="large"
      >
        <el-form-item label="ID">
          <el-input v-model.number="userForm.id" disabled />
        </el-form-item>
        <el-form-item label="Tên">
          <el-input v-model="userForm.name" />
        </el-form-item>
        <el-form-item label="Mật khẩu">
          <el-input type="password" v-model="userForm.password" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="userForm.email" />
        </el-form-item>
        <el-form-item label="Vai trò">
          <el-radio-group v-model="userForm.role">
            <el-radio border value="student">Sinh viên</el-radio>
            <el-radio border value="admin">Quản trị viên</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Ngày tạo">
          <el-date-picker
            v-model="userForm.created_at"
            type="datetime"
            placeholder="Chọn ngày"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">Create</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  
  const userForm = reactive({
    id: '',
    name: '',
    password: '',
    email: '',
    role: '',
    created_at: '',
  })
  </script>
  