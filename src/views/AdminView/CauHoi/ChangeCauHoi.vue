<template>
  <div class="mx-auto container bg-color-white">
    <RouterLink :to="{name:'cauhoi'}">
      <button class="btn btn-secondary mt-2"><i class="fa-solid fa-arrow-left-long"></i></button>
    </RouterLink>
    
    <div class="text-[30px] text-500 text-center">Cập nhật câu hỏi</div>
    <form class="mb-5" @submit.prevent enctype="multipart/form-data">
      <div class="class">
        <label for="class" class="form-label"> Lớp học </label>
        <select size="" v-model=" question.class " id="class" class="form-select border border-secondary">
          <option>Lựa chọn lớp học</option>
          <option :value=" choice['id'] " v-for="( choice, index) in ListClass" :key=" index ">
            {{ choice['class'] }}
          </option>
        </select>
      </div>

      <div class="Subject">
        <label for="subject" class="form-label"> Môn học </label>
        <select v-model=" question.Subject " id="subject" class="form-select">
          <option selected>Lựa chọn môn học</option>
          <option :value=" choice['id'] " v-for="( choice, index) in category" :key=" index ">
            {{ choice['title'] }}
          </option>
        </select>
      </div>

      <div class="Subject">
        <label for="subject" class="form-label"> Đề bài </label>
        <p><strong v-html=" question.title "></strong></p>
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
      <div v-if=" question.image !== '' && question.image !== null ">
        <div style="width: 30%; height: 30%; position: relative">
          <img :src=" imgUrl " style="border: 1px solid black; border-radius: 5px" class="img-fluid" />
          <button class="btn btn-danger" style="position: absolute; top: 0; right: 0; padding: 5px; margin: 5px"
            @click=" removeImg ">
            X
          </button>
        </div>
      </div>
      <!-- danh sách các câu trả lời -->
      <p><strong>Các câu trả lời</strong></p>
      <div v-for="( ans, index) in answer" :key=" index " class="mt-3 mb-3" style="font-weight: 600">
        <span class="d-flex">{{ getLabel( index ) }}:
          <input :class=" { 'is-valid': answer[index] !== '' } " class="form-control border border-secondary"
            v-model=" answer[index] " type="text" :id=" 'answer' + getLabel( index ) " />
          <!-- xóa đáp án -->
          <span><button class="btn btn-danger ms-2" @click="removeAnswer( index )">-</button></span>
        </span>
        <!-- câu trả lời bằng ảnh -->
        <span><i>Ảnh câu trả lời nếu có</i></span>
        <input v-if=" !ListImageAnswer[index] " type="file" accept="image/*" @change="InsertImageAnswer( $event, index )"
          class="form-control border border-primary ms-3 w-50" />
        <!-- Nếu câu trả lời là ảnh thì hiển thị nó ra -->
        <div>
          <div style="position: relative; width: 30%; height: 30%" v-if=" ListImageAnswerUrl[index] ">
            <img :src=" ListImageAnswerUrl[index] " class="img-fluid" />
            <button class="btn btn-danger" style="position: absolute; top: 0; right: 0; padding: 5px; margin: 5px"
              @click="removeImageAnswer( index )">
              X
            </button>
          </div>
        </div>
      </div>

      <div>
        <button @click="AddAnswer()" class="btn btn-primary mb-3">Tạo thêm câu trả lời</button>
      </div>

      <div class="correctAnswer mt-4">
        <label for="correctAnswer">Chọn đáp án đúng:</label>
        <div v-for="( ans, index) in answer" :key=" index " class="mt-2">
          <input type="checkbox" :value=" getLabel( index ) " v-model=" correctAns " />
          {{ getLabel( index ) }}. {{ ans }}
        </div>
      </div>
      <div class="mt-3 d-flex justify-content-end">
        <button type="submit" class="btn btn-primary" @click=" UpdateQuestion ">Cập nhật</button>
      </div>
    </form>
  </div>
</template>
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-unused-vars -->
<script>
import { PutData, GetDetail, getImageAnswer } from '@/service/questionsService'
import { onMounted, reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { Ckeditor } from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { ElNotification } from 'element-plus'
import { data } from 'autoprefixer'
import { get } from '@/utils/request'
import { getCategoryExamList } from '@/service/examsService'
import { getAllClass } from '@/service/class'
export default {
  components: {
    Ckeditor
  },
  computed: {
    idques () {
      return this.$route.params.id
    }
  },
  data () {
    return {
      editor: ClassicEditor,
      question: [],
      answer: [],
      correctAns: [],
      category: [],
      imgUrl: '',
      ListImageAnswer: [],
      ListImageAnswerUrl: [],
      ListClass:[],
    }
  },
  watch: {
    question () {
      this.renderMath()
    },
    'question.title': function (newVal) {
      this.renderMath() // Gọi MathJax để xử lý công thức LaTeX
    }
  },
  created () {
    this.getClass()
    this.renderMath()
    this.getDetailQues()
  },

  methods: {
    renderMath () {
      // Kiểm tra xem MathJax đã được tải chưa
      if (window.MathJax)
      {
        this.$nextTick(() => {
          window.MathJax.typesetPromise()
            .then(() => {
              // console.log("MathJax rendering completed");
            })
            .catch((err) => console.error('MathJax rendering error:', err))
        })
      }
    },
    async getClass () {
      const result = await getAllClass()
      if (result)
      {
        this.ListClass = result.data
      }
    },
    InsertImageAnswer (event, index) {
      const file = event.target.files[0]
      if (file)
      {
        this.ListImageAnswer[index] = file
        this.ListImageAnswerUrl[index] = URL.createObjectURL(file)
      }
    },
    removeImageAnswer (index) {
      this.ListImageAnswer[index] = null
      this.ListImageAnswerUrl[index] = null
    },
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
      this.question.image = '' // Xóa file hình ảnh
      this.imgUrl = '' // Xóa URL hình ảnh
      this.$refs.fileImage.value = '' // Đặt lại input file
    },
    AddAnswer () {
      this.answer.push('') // Thêm một chuỗi trống vào mảng câu trả lời
    },
    removeAnswer (index) {
      this.answer.splice(index, 1) //xóa một phần tử tại vị trí đó
      this.correctAns.splice(index, 1) // nếu câu trả lời bị xóa thì xóa luôn cả trong danh sách câu trả lời
      this.removeImageAnswer(index)
    },
    getLabel (index) {
      return String.fromCharCode(65 + index) // Từ mã ASCII để tạo A, B, C, D,...
    },
    async getDetailQues () {
      try
      {
        const questionDetail = await GetDetail(this.idques)
        // lấy danh sách ảnh
        const ListImage = await getImageAnswer(this.idques)
        // console.log(ListImage.data)
        const CAT = await getCategoryExamList()
        this.category = CAT.data.data
        if (!questionDetail)
        {
          alert('Có lỗi trong quá trình lấy dữ liệu')
        }
        this.question = questionDetail.data
        JSON.parse(this.question.answerlist).forEach((e) => {
          this.answer.push(e)
        })
        JSON.parse(this.question.correctAns).forEach((e) => {
          this.correctAns.push(e)
        })
        // lấy link ảnh đề bài
        this.imgUrl = `http://localhost:8080/assets/image/Question/${this.question.image}`
        // mảng link ảnh đáp án
        ListImage.data.forEach((e) => {
          this.ListImageAnswerUrl[e.stt] =
            `http://localhost:8080/assets/image/AnswerQuestion/${e.imageAns}`
          this.ListImageAnswer[e.stt] = e.imageAns
        })
      } catch (Error)
      {
        alert(Error)
      }
    },

    async UpdateQuestion () {
      const dataQuestion = new FormData()
      if (this.question.class !== '' && this.question.Subject !== 'Lựa chọn môn học' && this.question.title !== '' && Object.keys(this.answer).length > 0 && Object.keys(this.correctAns).length > 0)
      {
        dataQuestion.append('class', this.question.class)
        dataQuestion.append('Subject', this.question.Subject)
        dataQuestion.append('title', this.question.title)
        dataQuestion.append('created_by', this.question.created_by)
        dataQuestion.append('image', this.question.image)
        dataQuestion.append('answerlist', JSON.stringify(this.answer))
        dataQuestion.append('correctAns', JSON.stringify(this.correctAns))
        dataQuestion.append('created_at', this.question.created_at)
        // for (let [key, value] of dataQuestion.entries()) {
        //   console.log(key, value) // key là tên trường, value là giá trị tương ứng
        // }
        this.ListImageAnswer.forEach((file, index) => {
          if (file)
          {
            dataQuestion.append(`answerImage_${index}`, file)
          }
        })
        try
        {
          const ques = await PutData(this.idques, dataQuestion)
          if (ques)
          {
            console.log(ques)
            const titleResponse = ques.data.message
            if (titleResponse === 'Cập nhật câu hỏi không thành công !')
            {
              ElNotification({
                title: 'Thông báo',
                message: 'Cập nhật câu hỏi thất bại ! Vui lòng kiếm tra lại thông tin hoặc đường dẫn ảnh',
                type: 'error'
              })
            }
            else if (titleResponse === 'File ảnh không đúng định dạng !')
            {
              ElNotification({
                title: 'Thông báo',
                message: titleResponse,
                type: 'error'
              })
            }
            else if (titleResponse === 'Cập nhật thông tin câu hỏi thành công !')
            {
              ElNotification({
                title: 'Thông báo',
                message: "Cập nhật thông tin câu hỏi thành công !",
                type: 'success'
              })
            }
            else
            {
              ElNotification({
                title: 'Thông báo',
                message: 'Cập nhật câu hỏi thất bại ! Vui lòng kiếm tra lại thông tin hoặc đường dẫn ảnh',
                type: 'error'
              })
            }
            // this.$router.push({ name: 'cauhoi' })
          }

          else
          {
            ElNotification({
              title: 'Thông báo',
              message: 'Có lỗi xảy ra vui lòng thử lại sau',
              type: 'error'
            })
          }
        }
        catch (Error)
        {
          console.log(Error)
        }
      }
      else
      {
        alert("Vui lòng kiểm tra lại thông tin câu hỏi")
      }
    }
  }
}
</script>
<style>
.ck-editor__editable_inline {
  min-height: 200px;
  /* Set the minimum height for the editor */
}
</style>
