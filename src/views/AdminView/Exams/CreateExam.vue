<template>
  <div class="mx-auto container bg-color-white">
    <div class="text-[50px] text-center">Thêm bài kiểm tra Random câu hỏi</div>
    <el-form class="w-full p-3" :model="sizeForm" label-width="auto" size="large">
      <el-form-item label="Tên bài thi">
        <el-input v-model="sizeForm.title" />
      </el-form-item>
      <el-form-item label="Mô tả">
        <el-input v-model="sizeForm.description" />
      </el-form-item>
      <el-form-item label="Danh mục bài thi">
        <el-select v-model="sizeForm.category" clearable placeholder="Select" style="width: 240px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
      <el-form-item label="Thời gian làm bài (Phút)">
        <el-input v-model.number="sizeForm.duration" />
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
<script lang="ts" setup>
import { decodeToken } from '@/service/decodeToken'
import { createExam, getCategoryExamList } from '@/service/examsService'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { h } from 'vue'
import { ElNotification } from 'element-plus'

const router = useRouter()

const sizeForm = reactive({
  title: '',
  description: '',
  class: '',
  expire_time: '',
  duration: '',
  totalQuestion: '',
  category: '',
  id_user: ''
})
const options = ref([])
const getId = () => {
    const id = decodeToken();
    sizeForm['id_user'] = id.data.id;
    // console.log( sizeForm['id_user'] );
}
const fetchCategorys = () => {
  const fetchApi = async () => {
    const result = await getCategoryExamList()
    if (result) {
    //   console.log(result['data']['data'])
      options.value = result['data']['data'].map((item) => ({ value: item.id, label: item.title }))
    }
  }
  fetchApi()
}
onMounted(fetchCategorys)
onMounted(getId)
const onSubmit = () => {
  const fetchApi = async () => {
    if (sizeForm['title']!=='' && sizeForm['category']!=='' && sizeForm['duration']!== '' && sizeForm['class']!=='' && sizeForm['totalQuestion']!=='') {
      const result = await createExam( sizeForm )
      if ( result ) {
        ElNotification( {
          title: 'Success',
          message: h( 'i', { style: 'color: teal' }, 'Tạo bài kiểm tra thành công' )
        } )
        router.replace( { name: 'exams' } )
      }
    }
    else {
      alert("Vui lòng nhập đầy đủ thông tin bài kiểm tra")
    }
  }
  fetchApi()
  // console.log(sizeForm)
}
</script>
