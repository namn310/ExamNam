<template>
  <div class="mx-auto container bg-color-white">
    <div class="text-[50px] text-500 text-center">Sửa bài kiểm tra</div>
    <el-form class="w-full p-3" :model="sizeForm" label-width="auto" size="large">
      <el-form-item label="Tên bài kiểm tra">
        <el-input v-model="sizeForm.title" />
      </el-form-item>
      <el-form-item label="Lớp học">
        <el-select v-model="sizeForm.class" clearable placeholder="Select" style="width: 240px">
          <el-option
            v-for="item in ListClass"
            :key="item.id"
            :label="item.class"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Mô tả">
        <el-input v-model="sizeForm.description" />
      </el-form-item>
      <el-form-item label="Danh mục cha">
        <el-select v-model="sizeForm.category" clearable placeholder="Select" style="width: 240px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Thời gian làm bài">
        <el-input v-model="sizeForm.duration" />
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
import { useRoute, useRouter } from 'vue-router'
import { EditExam, getCategoryExamList, getExamDetail } from '@/service/examsService'
import { h } from 'vue'
import { ElNotification } from 'element-plus'
import { getAllClass } from '@/service/class'

const router = useRouter()
const options = ref([])
const route = useRoute()
const id = route.params.id
const ListClass = ref([])
const sizeForm = ref({
  title: '',
  description: '',
  class: '',
  duration: '',
  expire_time: '',
  category: ''
})

const fetchData = () => {
  const fetchApi = async () => {
    const result = await getExamDetail(id)
    if (result) {
      sizeForm.value.category = result.data.category || ''
      sizeForm.value.title = result.data.title || ''
      sizeForm.value.description = result.data.description || ''
      sizeForm.value.class = result.data.class || ''
      sizeForm.value.duration = result.data.duration || ''
      sizeForm.value.expire_time = result.data.expire_time || ''
    }
    const FetchClass = await getAllClass()
    if (FetchClass) {
        ListClass.value = FetchClass.data
      console.log(ListClass.value)
    }
  }
  fetchApi()
}

const fetchCategorys = () => {
  const fetchApi = async () => {
    const result = await getCategoryExamList()
    if (result) {
      console.log(result['data']['data'])
      options.value = result['data']['data'].map((item) => ({ value: item.id, label: item.title }))
    }
  }
  fetchApi()
}
onMounted(() => {
  fetchData()
  fetchCategorys()
})

const onSubmit = () => {
  const fetchApi = async () => {
    const result = await EditExam(id, sizeForm.value)
    if (result) {
      ElNotification({
        title: 'Success',
        message: h('i', { style: 'color: teal' }, 'Sửa bài kiểm tra thành công')
      })
      router.replace({ name: 'exams' })
    }
  }
  fetchApi()
  console.log(sizeForm)
}
</script>
