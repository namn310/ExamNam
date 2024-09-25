<template>
  <div class="mx-auto container bg-color-white">
    <div class="text-[50px] text-center">Thêm câu hỏi</div>
    <form class="mb-5" @submit.prevent enctype="multipart/form-data">
      <div class="class">
        <label for="class" class="form-label"> Lớp </label>
        <input v-model=" question.class " id="class" type="text" class="form-control border border-secondary" />
      </div>

      <div class="Subject">
        <label for="subject" class="form-label"> Môn học </label>
        <select v-model=" question.Subject " id="subject" class="form-select border border-secondary">
          <option selected>Lựa chọn môn học</option>
          <option :value=" choice['id'] " v-for="(  choice, index) in category" :key=" index ">
            {{ choice['title'] }}
          </option>
        </select>
      </div>

      <div class="Subject">
        <label for="subject" class="form-label"> Đề bài </label>
        <br />
        <Ckeditor :editor=" editor " v-model=" question.title " />
      </div>
      <!-- hình ảnh đề bài (nếu có) -->
      <div class="Image mb-3">
        <label for="image" class="form-label"> Ảnh câu hỏi (nếu có) </label>
        <br />
        <input type="file" id="image" @change=" getImage " accept="image/*" class="form-control border border-secondary"
          ref="fileImage" />
      </div>

      <!-- hiển thị ảnh nếu người dùng tải lên -->
      <div v-if=" question.image !== '' " style="border:1px solid black">
        <div style="width: 30%; height: 30%;position: relative"><img :src=" imgUrl " style="border: 1px solid black; border-radius: 5px"
            class="img-fluid" />
          <button class="btn btn-danger" style="position:absolute;top:0;right:0;padding:5px;margin:5px" @click="removeImg">X</button>
        </div>
      </div>
      <!-- danh sách các câu trả lời -->
      <div v-for="(  ans, index) in answer" :key=" index " class="mt-3 mb-3">
        <span class="d-flex">{{ getLabel( index ) }}:
          <input class="form-control border border-secondary" v-model=" answer[index] " type="text"
            :id=" 'answer' + getLabel( index ) " />
          <span><button class="btn btn-danger ms-2" @click="removeAnswer( index )">-</button></span>
        </span>
      </div>
      <div>
        <button @click="AddAnswer()" class="btn btn-primary mb-3">Tạo thêm câu trả lời</button>
      </div>

      <div class="correctAnswer mt-4">
        <label for="correctAnswer">Chọn đáp án đúng:</label>
        <div v-for="(  ans, index) in answer" :key=" index " class="mt-2">
          <input type="checkbox" :value=" getLabel( index ) " v-model=" correctAns " />
          {{ getLabel( index ) }}. {{ ans }}
        </div>
      </div>

      <div class="mt-3 flex justify-content-end">
        <button type="submit" class="btn btn-primary" @click=" postQuestion ">Tạo câu hỏi</button>
      </div>
      <!-- <p>{{ new }}</p> -->
    </form>
  </div>
</template>
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-unused-vars -->
<script>
import { decodeToken } from '@/service/decodeToken'
import { PostData } from '@/service/questionsService'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Ckeditor } from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { ElNotification } from 'element-plus'
import { getCategoryExamList } from '@/service/examsService'
import axios from 'axios'
import { data } from 'autoprefixer'
export default {
  components: {
    Ckeditor
  },
  data () {
    return {
      editor: ClassicEditor,
      category: [],
      question: {
        class: '',
        Subject: '',
        title: '',
        created_by: '',
        image: ''
      },
      imgUrl: '',
      answer: ['', '', '', ''],
      correctAns: []
    }
  },
  created () {
    this.getId()
    this.getCat()
  },
  methods: {
    getImage (event) {
      const file = event.target.files[0]
      if (file)
      {
        this.question.image = file
        // console.log(this.question.image)
        // URL.createObjectURL(file): Tạo một URL tạm thời để hiển thị ảnh đã chọn ngay trên giao diện trước khi upload lên server.
        this.imgUrl = URL.createObjectURL(file)
      }
    },
    removeImg () {
        this.question.image = ''; // Xóa file hình ảnh
      this.imgUrl = ''; // Xóa URL hình ảnh
      this.$refs.fileImage.value = ''; // Đặt lại input file
    },
    async getCat () {
      const CAT = await getCategoryExamList()
      this.category = CAT.data.data
    },
    AddAnswer () {
      this.answer.push('') // Thêm một chuỗi trống vào mảng câu trả lời
    },
    removeAnswer (index) {
      this.answer.splice(index, 1) //xóa một phần tử tại vị trí đó
    },
    getLabel (index) {
      return String.fromCharCode(65 + index) // Từ mã ASCII để tạo A, B, C, D,...
    },
    getId () {
      const id = decodeToken()
      this.question.created_by = id.data.id
    },

    async postQuestion () {
      try
      {
        // chuyển về json
        this.question.answerlist = JSON.stringify(this.answer, null, 2)
        this.question.correctAns = JSON.stringify(this.correctAns, null, 1)
        const dataQuestion = new FormData()
        dataQuestion.append('class', this.question.class)
        dataQuestion.append('Subject', this.question.Subject)
        dataQuestion.append('title', this.question.title)
        dataQuestion.append('created_by', this.question.created_by)
        dataQuestion.append('image', this.question.image)
        dataQuestion.append('answerlist', JSON.stringify(this.answer))
        dataQuestion.append('correctAns', JSON.stringify(this.correctAns))
        // Kiểm tra từng giá trị trong FormData
        // for (let [key, value] of dataQuestion.entries())
        // {
        //   console.log(key, value);  // key là tên trường, value là giá trị tương ứng
        // }
        const response = await PostData(dataQuestion)
        console.log(response)
        if (!response)
        {
          ElNotification({
            title: 'Error',
            message: response.data.message,
            type: 'error'
          })
        }
        ElNotification({
          title: 'Success',
          message: response.data.message,
          type: 'success'
        })
        this.$router.push({ name: 'cauhoi' })
      } catch (Error)
      {
        alert('Có lỗi xảy ra '.Error)
      }
    }
  }
}
</script>
<style scoped>
/* .Subject .ck-editor__editable_inline {
    min-height: 400px;
    /* Set the minimum height for the editor */
/* } * */
</style>
