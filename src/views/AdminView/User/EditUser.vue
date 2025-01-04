<template>
  <div class="mt-2 ms-2">
    <RouterLink :to=" { name: 'user' } ">
      <button class="btn btn-secondary"><i class="fa-solid fa-arrow-left"></i></button>
    </RouterLink>
  </div>
  <div class="mx-auto container bg-color-white">
    <div class="text-[30px] text-500  text-center">
      Sửa thông tin người dùng
    </div>
    <el-form class="w-full p-3" :model=" userForm " label-width="auto" size="large">
      <el-form-item label="Tên">
        <el-input v-model=" userForm.name " />
      </el-form-item>
      <el-form-item label="Mật khẩu">
        <el-input type="password" v-model=" userForm.password " />
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model=" userForm.email " />
      </el-form-item>
      <el-form-item label="Vai trò">
        <el-radio-group v-model=" userForm.role ">
          <el-radio border value="student">Sinh viên</el-radio>
          <el-radio border value="admin">Quản trị viên</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Ngày tạo">
        <el-date-picker v-model=" userForm.create_at " type="datetime" placeholder="Chọn ngày" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click=" onSubmit ">Edit</el-button>
        <el-button @click=" onCancel ">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getUserDetail, updateUser } from '@/service/usersService'
import { ElMessage } from 'element-plus'
// import { decodeToken } from '@/service/decodeToken'


const router = useRouter()
const route = useRoute()
const userId = route.params.id

const userForm = reactive({
  name: '',
  password: '',
  email: '',
  role: '',
  create_at: new Date().toLocaleDateString(),
})

const fetchUser = async () => {
  const result = await getUserDetail(userId)
  if (result)
  {
    if (result.data.role !== 'admin')
    {
      router.push({ name: 'homeAdmin' })
    }
    const { name, password, email, role, create_at } = result.data
    userForm.name = name
    userForm.password = password
    userForm.email = email
    userForm.role = role
    userForm.create_at = new Date(create_at)
  }
}

onMounted(fetchUser)

const onSubmit = async () => {
  const updateUserDT = {
    name: userForm.name,
    password: userForm.password,
    email: userForm.email,
    role: userForm.role,
    create_at: userForm.create_at,
  }

  try
  {
    const result = await updateUser(userId, updateUserDT)
    if (result)
    {
      ElMessage.success('Cập nhật thông tin người dùng thành công')
      router.push({ name: 'user' })
    }
  } catch (error)
  {
    ElMessage.error('Cập nhật thông tin người dùng thất bại')
  }
}

const onCancel = () => {
  router.push({ name: 'user' })
}
</script>