<template>
  <div class="d-flex justify-content-center" style="margin-top:80px" v-if=" loadingShow ">
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
    <div class="mt-3">
      <p>
        <strong>Đề: {{ titleExam }} </strong>
      </p>
    </div>
    <div class="text-[30px] text-center">Thêm câu hỏi</div>
    <form class="mb-5" @submit.prevent enctype="multipart/form-data">
      <div class="class">
        <label for="class" class="form-label"> Lớp </label>
        <input v-model=" question.class " id="class" type="text" class="form-control border border-secondary"
          :class=" { 'is-valid': question.class !== '' } " />
      </div>

      <div class="Subject">
        <label for="subject" class="form-label"> Môn học </label>
        <select v-model=" question.Subject " id="subject" class="form-select border border-secondary" :class=" {
          'is-valid': question.Subject !== '' && question.Subject !== 'Lựa chọn môn học'
        } ">
          <option>Lựa chọn môn học</option>
          <option :value=" choice['id'] " v-for="(    choice, index) in category" :key=" index ">
            {{ choice['title'] }}
          </option>
        </select>
      </div>

      <div class="Subject">
        <label for="subject" class="form-label"> Đề bài </label>
        <p>
          <i>Nếu câu hỏi và đáp án có chứa các công thức toán học thì nhập ở dạng
            <strong>Latex</strong> để có thể hiển thị trên giao diện</i>
        </p>
        <br />
        <Ckeditor :editor=" editor " v-model=" question.title " :class=" { 'is-valid': question.title !== '' } " />
      </div>
      <!-- hình ảnh đề bài (nếu có) -->
      <div class="Image mb-3">
        <label for="image" class="form-label"> Ảnh câu hỏi (nếu có) </label>
        <br />
        <input type="file" id="image" @change=" getImage " accept="image/*" class="form-control border border-secondary"
          ref="fileImage" />
      </div>

      <!-- hiển thị ảnh nếu người dùng tải lên -->
      <div v-if=" question.image !== '' ">
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
      <div v-for="(    ans, index) in answer" :key=" index " class="mt-3 mb-3" style="font-weight: 600">
        <span class="d-flex">{{ getLabel( index ) }}:
          <input :class=" { 'is-valid': answer[index] !== '' } " class="form-control border border-secondary"
            v-model=" answer[index] " type="text" :id=" 'answer' + getLabel( index ) " />
          <!-- xóa đáp án -->
          <span><button class="btn btn-danger ms-2" @click="removeAnswer( index )">-</button></span>
        </span>
        <!-- câu trả lời bằng ảnh -->
        <span><i>Ảnh câu trả lời nếu có</i></span>
        <input v-if=" !ListImageAnswer[index] " type="file" accept="image/*"
          @change="InsertImageAnswer( $event, index )" class="form-control border border-primary ms-3 w-50" />
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

      <!-- button tạo thêm câu trả lời -->
      <div>
        <button @click="AddAnswer()" class="btn btn-primary mb-3">Tạo thêm câu trả lời</button>
      </div>
      <!-- Chọn đáp án đúng của câu hỏi -->
      <div class="correctAnswer mt-4">
        <label for="correctAnswer">Chọn đáp án đúng:</label>
        <div v-for="(    ans, index) in answer" :key=" index " class="mt-2" id="output"
          :class=" { 'is-valid': correctAns !== '' } ">
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
// import { onMounted, reactive, ref } from 'vue'
// import { useRouter } from 'vue-router'
// ckeditor
import { Ckeditor } from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import thư viện làm toast message
import { ElNotification } from 'element-plus'
import { getCategoryExamList, getNameExam, AddQuestionIntoExamOption } from '@/service/examsService'
import axios from 'axios'
// import { data } from 'autoprefixer'
export default {
  components: {
    Ckeditor
  },
  data () {
    return {
      loadingShow: true,
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['bold', 'italic', 'math', '|', 'link'],
        math: {
          engine: 'mathjax', // Sử dụng MathJax để hiển thị LaTeX
          outputType: 'mathml' // 'mathml', 'html', hoặc 'latex'
        }
      },
      category: [],
      question: {
        class: '',
        Subject: 'Lựa chọn môn học',
        title: '',
        created_by: '',
        image: ''
      },
      imgUrl: '',
      answer: ['', '', '', ''],
      correctAns: [],
      ListImageAnswer: [],
      ListImageAnswerUrl: [],
      idExam: this.$route.params.id,
      titleExam: ''
    }
  },
  watch: {
    correctAns () {
      this.renderMath()
    }
  },
  mounted () {
    this.fetchData()
    this.renderMath()
  },
  created () { },
  methods: {
    async fetchData () {
      try
      {
        this.getId()
        this.getCat()
        this.getNameExam()
        this.loadingShow = false
      }
      catch (e)
      {
        this.loadingShow = false
        alert("Có lỗi xảy ra trong quá trình lấy dữ liệu !")
      }
    },
    async getNameExam () {
      var result = await getNameExam(this.idExam)
      if (result !== null)
      {
        this.titleExam = result.title
      }
    },
    renderMath () {
      // Kiểm tra xem MathJax đã được tải chưa
      this.$nextTick(() => {
        window.MathJax.typeset() // MathJax v3.x không còn sử dụng Hub.Queue nữa
      })
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
      // console.log(this.ListImageAnswer,this.ListImageAnswerUrl)
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
    async getCat () {
      const CAT = await getCategoryExamList()
      this.category = CAT.data.data
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
    getId () {
      const id = decodeToken()
      this.question.created_by = id.data.id
    },
    async postQuestion () {
      try
      {
        this.loadingShow = true
        // chuyển về json
        this.question.answerlist = JSON.stringify(this.answer, null, 2)
        this.question.correctAns = JSON.stringify(this.correctAns, null, 1)

        if (
          this.question.class !== '' &&
          this.question.Subject !== 'Lựa chọn môn học' &&
          this.question.title !== '' &&
          Object.keys(this.answer).length > 0 &&
          Object.keys(this.correctAns).length > 0
        )
        {
          const dataQuestion = new FormData()
          dataQuestion.append('class', (this.question.class))
          dataQuestion.append('Subject', (this.question.Subject))
          dataQuestion.append('title', (this.question.title))
          dataQuestion.append('created_by', (this.question.created_by))
          dataQuestion.append('image', (this.question.image))
          dataQuestion.append('answerlist', JSON.stringify(this.answer))
          dataQuestion.append('correctAns', JSON.stringify(this.correctAns))
          this.ListImageAnswer.forEach((file, index) => {
            if (file)
            {
              dataQuestion.append(`answerImage_${index}`, (file))
            }
          })
          // Kiểm tra từng giá trị trong FormData
          // for (let [key, value] of dataQuestion.entries())
          // {
          //   console.log(key, value);  // key là tên trường, value là giá trị tương ứng
          // }
          const response = await AddQuestionIntoExamOption(this.idExam, dataQuestion)
          console.log(response)
          if (response)
          {
            if (response.data.result == 'success')
            {
              ElNotification({
                title: 'Thông báo',
                message: 'Thêm câu hỏi thành công',
                type: 'success'
              })
            } else
            {
              ElNotification({
                title: 'Thông báo',
                message: 'Thêm câu hỏi thất bại. Có lỗi xảy ra',
                type: 'error'
              })
            }
          } else
          {
            ElNotification({
              title: 'Success',
              message: response.data.result,
              type: 'success'
            })
          }
          //   this.$router.push({ name: 'create-cauhoi' })
        } else
        {
          this.loadingShow = false
          alert('Vui lòng nhập đầy đủ thông tin câu hỏi')
        }
        this.loadingShow = false
      } catch (Error)
      {
        this.loadingShow = false
        alert("Thêm thất bại ! Có lỗi xảy ra")
      }

    }
  }
}
</script>
<style scoped>
/* loading */
.pl {
  width: 3em;
  height: 3em;
}

.pl__ring {
  animation: ringA 2s linear infinite;
}

.pl__ring--a {
  stroke: orange;
}

.pl__ring--b {
  animation-name: ringB;
  stroke: blue;
}

.pl__ring--c {
  animation-name: ringC;
  stroke: greenyellow;
}

.pl__ring--d {
  animation-name: ringD;
  stroke: red;
}

/* Animations */
@keyframes ringA {

  from,
  4% {
    stroke-dasharray: 0 660;
    stroke-width: 20;
    stroke-dashoffset: -330;
  }

  12% {
    stroke-dasharray: 60 600;
    stroke-width: 30;
    stroke-dashoffset: -335;
  }

  32% {
    stroke-dasharray: 60 600;
    stroke-width: 30;
    stroke-dashoffset: -595;
  }

  40%,
  54% {
    stroke-dasharray: 0 660;
    stroke-width: 20;
    stroke-dashoffset: -660;
  }

  62% {
    stroke-dasharray: 60 600;
    stroke-width: 30;
    stroke-dashoffset: -665;
  }

  82% {
    stroke-dasharray: 60 600;
    stroke-width: 30;
    stroke-dashoffset: -925;
  }

  90%,
  to {
    stroke-dasharray: 0 660;
    stroke-width: 20;
    stroke-dashoffset: -990;
  }
}

@keyframes ringB {

  from,
  12% {
    stroke-dasharray: 0 220;
    stroke-width: 20;
    stroke-dashoffset: -110;
  }

  20% {
    stroke-dasharray: 20 200;
    stroke-width: 30;
    stroke-dashoffset: -115;
  }

  40% {
    stroke-dasharray: 20 200;
    stroke-width: 30;
    stroke-dashoffset: -195;
  }

  48%,
  62% {
    stroke-dasharray: 0 220;
    stroke-width: 20;
    stroke-dashoffset: -220;
  }

  70% {
    stroke-dasharray: 20 200;
    stroke-width: 30;
    stroke-dashoffset: -225;
  }

  90% {
    stroke-dasharray: 20 200;
    stroke-width: 30;
    stroke-dashoffset: -305;
  }

  98%,
  to {
    stroke-dasharray: 0 220;
    stroke-width: 20;
    stroke-dashoffset: -330;
  }
}

@keyframes ringC {
  from {
    stroke-dasharray: 0 440;
    stroke-width: 20;
    stroke-dashoffset: 0;
  }

  8% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -5;
  }

  28% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -175;
  }

  36%,
  58% {
    stroke-dasharray: 0 440;
    stroke-width: 20;
    stroke-dashoffset: -220;
  }

  66% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -225;
  }

  86% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -395;
  }

  94%,
  to {
    stroke-dasharray: 0 440;
    stroke-width: 20;
    stroke-dashoffset: -440;
  }
}

@keyframes ringD {

  from,
  8% {
    stroke-dasharray: 0 440;
    stroke-width: 20;
    stroke-dashoffset: 0;
  }

  16% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -5;
  }

  36% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -175;
  }

  44%,
  50% {
    stroke-dasharray: 0 440;
    stroke-width: 20;
    stroke-dashoffset: -220;
  }

  58% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -225;
  }

  78% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -395;
  }

  86%,
  to {
    stroke-dasharray: 0 440;
    stroke-width: 20;
    stroke-dashoffset: -440;
  }
}
</style>
