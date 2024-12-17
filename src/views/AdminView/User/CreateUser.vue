<template>
    <div class="mx-auto container bg-color-white">
      <div class="text-[30px] text-center">
        Thêm thông tin người dùng
      </div>
      <el-form
        class="w-full p-3"
        :model="userForm"
        label-width="auto"
        size="large"
      >
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
        <!-- <el-form-item label="Ngày tạo">
          <el-date-picker
            v-model="userForm.create_at"
            type="datetime"
            placeholder="Chọn ngày"
          />
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button @click="onCancel">Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { createUser } from '@/service/usersService'
  import { ElMessage } from 'element-plus';

  const router = useRouter()
  const userForm = reactive({
    name: '',
    password: '',
    email: '',
    role: '',
    create_at: '',
  })

  
  const onSubmit = () => {
    const fetchApi = async () => {
      if (userForm['name'] !== '' && userForm['password'] !=='' && userForm['role']!=='' && userForm['email']!=='')
      {
        try
        {
          const result = await createUser(userForm)
          console.log(result);
          if (result)
          {
            ElMessage.success('Tạo thông tin người dùng thành công');
            router.replace({ name: 'user' });
          }
        } catch (error)
        {
          console.error("Đã xảy ra lỗi khi tạo thông tin người dùng:", error);
          ElMessage.error('Tạo thông tin người dùng thất bại');
        }
      }
      else
      {
        alert("Vui lòng nhập đủ thông tin !")
      }
      }
      fetchApi();
  }

const onCancel = () => {
  router.replace({name : 'user'})
}
</script>
