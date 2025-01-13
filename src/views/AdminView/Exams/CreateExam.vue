<template>
    <div class="d-flex justify-content-center" v-if=" loadingShow ">
    <div> <svg viewBox="0 0 240 240" height="120" width="120" class="pl ms-2">
        <circle stroke-linecap="round" stroke-dashoffset="-330" stroke-dasharray="0 660" stroke-width="20" stroke="#000"
          fill="none" r="105" cy="120" cx="120" class="pl__ring pl__ring--a"></circle>
        <circle stroke-linecap="round" stroke-dashoffset="-110" stroke-dasharray="0 220" stroke-width="20" stroke="#000"
          fill="none" r="35" cy="120" cx="120" class="pl__ring pl__ring--b"></circle>
        <circle stroke-linecap="round" stroke-dasharray="0 440" stroke-width="20" stroke="#000" fill="none" r="70"
          cy="120" cx="85" class="pl__ring pl__ring--c"></circle>
        <circle stroke-linecap="round" stroke-dasharray="0 440" stroke-width="20" stroke="#000" fill="none" r="70"
          cy="120" cx="155" class="pl__ring pl__ring--d"></circle>
      </svg>
      <p>Loading ... </p>
    </div>
  </div>
  <div v-else class="mx-auto container bg-color-white">
    <div class="mt-2 ms-2">
    <RouterLink :to=" { name: 'exams' } ">
      <button class="btn btn-secondary"><i class="fa-solid fa-arrow-left"></i></button>
    </RouterLink>
  </div>
    <div class="text-[30px] text-center">Thêm bài kiểm tra Random câu hỏi</div>
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
        <el-select v-model="sizeForm.class" clearable placeholder="Select" style="width: 240px">
          <el-option
            v-for="item in ListClass"
            :key="item.id"
            :label="item.class"
            :value="item.id"
          />
        </el-select>
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
import { getAllClass } from '@/service/class'
import { h } from 'vue'
import { ElNotification } from 'element-plus'
const loadingShow = ref(true)
const router = useRouter()
const ListClass = ref([])
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
  try {
    const fetchApi = async () => {
      const result = await getCategoryExamList()
      if ( result ) {
        //   console.log(result['data']['data'])
        options.value = result['data']['data'].map( ( item ) => ( { value: item.id, label: item.title } ) )
      }
      const FetchClass = await getAllClass()
      if ( FetchClass ) {
        ListClass.value = FetchClass.data
      }
    }
    fetchApi()
    loadingShow.value = false
  }
  catch ( e ) {
    loadingShow.value = false
    alert("Có lỗi xảy ra trong quá trình lấy dữ liệu")
  }
}
onMounted(fetchCategorys)
onMounted(getId)
const onSubmit = () => {
  try {
    loadingShow.value=true
    const fetchApi = async () => {
      if ( sizeForm['title'] !== '' && sizeForm['category'] !== '' && sizeForm['duration'] !== '' && sizeForm['class'] !== '' && sizeForm['totalQuestion'] !== '' ) {
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
        alert( "Vui lòng nhập đầy đủ thông tin bài kiểm tra" )
      }
    }
    fetchApi()
    loadingShow.value=false
  }
  catch ( e ) {
    loadingShow.value = false
    alert( "Có lỗi xảy ra !" );
  }
  // console.log(sizeForm)
}
</script>
