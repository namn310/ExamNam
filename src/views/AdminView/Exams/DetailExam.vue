<template>
  <div class="mt-2 ms-2">
    <RouterLink :to=" { name: 'exams' } ">
      <button class="btn btn-secondary"><i class="fa-solid fa-arrow-left"></i></button>
    </RouterLink>
  </div>
  <div class="p-10">
    <div>
      <RouterLink :to=" { name: 'AddQuestion-into-Exam', params: { id: id } } ">
        <button class="btn btn-success mb-3 me-3">
          <i class="fa-solid fa-plus fa-lg me-2"></i>Thêm câu hỏi vào bài thi
        </button>
      </RouterLink>
      <RouterLink :to=" { name: 'thongke', params: { id: id } } ">
        <button class="btn btn-primary mb-3">Thống kê dữ liệu làm bài kiểm tra</button>
      </RouterLink>
      <RouterLink :to=" { name: 'IRT_EXAM', params: { id: id } } ">
        <button class="btn btn-primary mb-3 ms-3">Dữ liệu tính theo IRT</button>
      </RouterLink>
      <button @click="exportPDF()" class="btn btn-danger ms-3 mb-3">
        Xuất pdf<i class="ms-2 fa-solid fa-file-pdf fa-lg"></i>
      </button>
    </div>
    <div>
      <button class="btn btn-primary me-2" @click="showListQuestion()">Danh sách câu hỏi</button>
      <button class="btn btn-primary" @click=" showDetailExam ">Thông tin đề thi</button>
    </div>
    <div class="d-flex justify-content-center" v-if=" loadingShow ">
      <div> <svg viewBox="0 0 240 240" height="120" width="120" class="pl ms-2">
          <circle stroke-linecap="round" stroke-dashoffset="-330" stroke-dasharray="0 660" stroke-width="20"
            stroke="#000" fill="none" r="105" cy="120" cx="120" class="pl__ring pl__ring--a"></circle>
          <circle stroke-linecap="round" stroke-dashoffset="-110" stroke-dasharray="0 220" stroke-width="20"
            stroke="#000" fill="none" r="35" cy="120" cx="120" class="pl__ring pl__ring--b"></circle>
          <circle stroke-linecap="round" stroke-dasharray="0 440" stroke-width="20" stroke="#000" fill="none" r="70"
            cy="120" cx="85" class="pl__ring pl__ring--c"></circle>
          <circle stroke-linecap="round" stroke-dasharray="0 440" stroke-width="20" stroke="#000" fill="none" r="70"
            cy="120" cx="155" class="pl__ring pl__ring--d"></circle>
        </svg>
        <p>Loading ... </p>
      </div>
    </div>
    <div class="questionInExam mt-2" v-if=" ListQuestionVisible && !loadingShow ">
      <div>
        <div class="nameExam text-center">
          <p v-html=" ( ExamDetail.description ) ">
          </p>
          <p style="font-size: 2.5vw; font-size: 2.5vh" class="mt-2">
            <strong>{{ ExamDetail.title }} </strong>
          </p>

        </div>
        <div class="text-center">
          <p>Thời gian làm bài: {{ ExamDetail.duration }} phút</p>
        </div>
      </div>
      <div style="margin-bottom: 15px" ref="dataQuestion" class="dataQuestion mt-2">
        <!-- Danh sách câu hỏi: <el-switch v-model="fill" /> -->
        <el-space :fill=" fill " wrap>
          <el-card v-for="(       i, index) in question" :key=" i " class="box-card">
            <template #header>
              <div class="card-header d-flex">
                <span><strong>Câu {{ index + 1 }}:</strong></span>
                <span class="ms-2" text v-html=" i.title "></span>
                <div>
                  <button @click="deleteQuestion( i.id )" class="btn btn-danger"
                    style="position: absolute; right: 50px">
                    x
                  </button>
                </div>
              </div>
            </template>
            <div v-if=" i.ImageQuestionUrl !== '' && i.ImageQuestionUrl !== null ">
              <div style="width: 30%; height: 30%; position: relative">
                <img :src=" i.ImageQuestionUrl " style="border: 1px solid black; border-radius: 5px"
                  class="img-fluid" />
              </div>
            </div>
            <div>
              <div v-for="(       ans, index2) in i.answerlist" :key=" index2 " class="text item">
                <span>{{ getLabel( index2 ) }}. {{ ans }}</span>
                <div>
                  <div style="position: relative; width: 30%; height: 30%" v-if="
                    i.ListImageAnswerUrl &&
                    i.ListImageAnswerUrl.length > 0 &&
                    i.ListImageAnswerUrl[index2].imageUrl
                  ">
                    <img :src=" i.ListImageAnswerUrl[index2].imageUrl " class="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
            <div class="text item text-blue-700 font-semibold">Đáp án : {{ i.correctAns }}</div>
          </el-card>
        </el-space>
      </div>
    </div>

    <div class="DetailExam mt-2" v-if=" DetailExamVisible && !loadingShow ">
      <hr />
      <p class="text-center" style="font-size: 3vw; font-size: 3vh">
        <strong>{{ ExamDetail.title }} </strong>
      </p>
      <el-form class="w-full p-3" :model=" sizeForm " label-width="auto" size="large">
        <el-form-item label="Tên bài kiểm tra">
          <el-input v-model=" sizeForm.title " />
        </el-form-item>
        <!-- <el-form-item label="Lớp học">
          <el-input v-model=" sizeForm.class " />
        </el-form-item> -->
        <el-form-item label="Lớp học">
          <el-select v-model=" sizeForm.class " clearable placeholder="Select" style="width: 240px">
            <el-option v-for="  item in ListClass  " :key=" item.id " :label=" item.class " :value=" item.id " />
          </el-select>
        </el-form-item>
        <el-form-item label="Mô tả">
          <!-- <el-input v-model=" sizeForm.description " /> -->
          <Ckeditor :editor=" editor " v-model=" sizeForm.description " />
        </el-form-item>
        <el-form-item label="Danh mục bài thi">
          <el-select v-model=" sizeForm.category " clearable placeholder="Select" style="width: 240px">
            <el-option v-for="(       item, index) in category" :key=" index " :label=" item.title "
              :value=" item.id " />
          </el-select>
        </el-form-item>
        <el-form-item label="Thời gian làm bài">
          <el-input v-model=" sizeForm.duration " />
        </el-form-item>
        <el-form-item label="Thời hạn làm bài">
          <el-input v-model=" sizeForm.expire_time " />
          <div class="">
            <div class="block">
              <el-date-picker v-model=" sizeForm.expire_time " type="datetime-local"
                placeholder="Select date and time" />
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click=" updateExam ">Cập nhật</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {
  getQuestionExam,
  DeleteQuestionInExam,
  getExamDetail,
  EditExam,
  getCategoryExamList
} from '@/service/examsService'
import { getImageAnswer } from '@/service/questionsService'
// import { a } from 'vitest/dist/suite-IbNSsUWN';
import { nextTick } from 'vue'
// import { RouterLink, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
// ckeditor
import { Ckeditor } from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// eslint-disable-next-line vue/no-export-in-script-setup
// thư viện pdfmake
// import PdfPrinter from 'pdfmake'
// eslint-disable-next-line no-unused-vars
import html2canvas from 'html2canvas'
// eslint-disable-next-line no-unused-vars
import jsPDF from 'jspdf'
import { getAllClass } from '@/service/class'


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
      question: [],
      ExamDetail: [],
      ListClass: [],
      id: this.$route.params.id,
      ListQuestionVisible: true,
      DetailExamVisible: false,
      fill: true,
      sizeForm: {
        title: '',
        description: '',
        class: '',
        duration: '',
        expire_time: '',
        category: ''
      }
    }
  },
  created () {
    this.getClass()
    this.fetchData()
  },
  methods: {
    cleanHtml (html) {
      return html.replace(/<script.*?>.*?<\/script>/gi, ''); // Remove script tags for security
    },
    showListQuestion () {
      this.ListQuestionVisible = true
      this.DetailExamVisible = false
    },
    showDetailExam () {
      this.DetailExamVisible = true
      this.ListQuestionVisible = false
    },
    getLabel (index) {
      return String.fromCharCode(65 + index) // Từ mã ASCII để tạo A, B, C, D,...
    },
    async getClass () {
      const result = await getAllClass()
      if (result)
      {
        this.ListClass = result.data
      }
    },
    renderMath () {
      // Kiểm tra xem MathJax đã được tải chưa
      if (window.MathJax)
      {
        nextTick(() => {
          window.MathJax.typesetPromise()
            .then(() => { })
            .catch((err) => console.error('MathJax rendering error:', err))
        })
      }
    },
    // lấy dữ liệu từ api
    async fetchData () {
      try
      {
        const result = await getQuestionExam(this.id)
        const Exam = await getExamDetail(this.id)
        const categoryFetch = await getCategoryExamList()
        if (categoryFetch)
        {
          this.category = categoryFetch['data']['data']
        }
        if (Exam)
        {
          this.ExamDetail = Exam.result
          this.sizeForm.title = this.ExamDetail.title
          this.sizeForm.description = this.ExamDetail.description
          this.sizeForm.class = this.ExamDetail.class
          this.sizeForm.duration = this.ExamDetail.duration
          this.sizeForm.category = this.ExamDetail.category
          this.sizeForm.expire_time = this.ExamDetail.expire_time
        }
        // console.log(ExamDetail.value, sizeForm.value)
        if (result)
        {
          this.question = result['data']
          // lấy danh sách câu hỏi
          // khi dùng await trong for thì nên dùng for of để xử lý hoàn tất hàm bất đồng bộ trước khi sang phần tử mới
          // eslint-disable-next-line no-unused-vars
          for (const [index, e] of this.question.entries())
          {
            e.answerlist = JSON.parse(e.answerlist)
            // answer.value.push( {'idQues':e.id,'listAns':e.answerlist} );
            if (!e.ImageQuestionUrl)
            {
              e.ImageQuestionUrl = ''
            }
            if (e.image !== '' && e.image !== null)
            {
              const imgUrl = `http://localhost:8080/assets/image/Question/${e.image}`
              // tạo mảng chứa url ảnh câu hỏi
              e.ImageQuestionUrl = imgUrl
            }

            var idQues = e.id
            // Lấy danh sách hình ảnh câu trả lời
            var fetchImageAnswer = await getImageAnswer(idQues)
            var imageAnswerQuestion = fetchImageAnswer.data
            // nếu chưa tồn tại list url ảnh thì khởi tạo mảng
            if (!e.ListImageAnswerUrl)
            {
              e.ListImageAnswerUrl = []
            }
            for (var img of imageAnswerQuestion.entries())
            {
              const imageAnsUrl = `http://localhost:8080/assets/image/AnswerQuestion/${img[1].imageAns}`
              const element = { imageUrl: imageAnsUrl, stt: img[1].stt }
              if (img[1].idQues === e.id)
              {
                e.ListImageAnswerUrl.push(element)
              }
            }
            // renderMath()
          }
          // console.log(question.value)
          this.renderMath()
          this.loadingShow = false
        }
      }
      catch (e)
      {
        this.loadingShow = false
        alert("Có lỗi xảy ra !")
      }
    },
    async deleteQuestion (idQues) {
      if (confirm('Bạn có muốn xóa câu hỏi này không ?'))
      {
        try
        {
          this.loadingShow = true
          const result = await DeleteQuestionInExam(idQues, this.id)
          if (result)
          {
            if (result.result == 'true')
            {
              // xóa câu hỏi
              // câu hỏi nào có id trùng thì xóa đi
              this.question = this.question.filter((q) => q.id !== idQues)
              ElNotification({
                title: 'Thông báo',
                message: 'Xóa câu hỏi thành công',
                type: 'success'
              })
            } else
            {
              ElNotification({
                title: 'Thông báo',
                message: 'Xóa câu hỏi thất bại',
                type: 'error'
              })
            }
          } else
          {
            alert('Có lỗi xảy ra')
          }
          this.loadingShow = false
        }
        catch (e)
        {
          this.loadingShow = false
          alert("Có lỗi xảy ra !")
        }
        // console.log(id)
      } else
      {
        return
      }
    },
    // cập nhật bài kiểm tra
    updateExam () {
      try
      {
        this.loadingShow = true
        const fetchApi = async () => {
          const result = await EditExam(this.id, this.sizeForm)
          if (result)
          {
            var message = result.message
            if (message === 'Cập nhật bài thi không thành công !')
            {
              ElNotification({
                title: 'Thông báo',
                message: 'Cập nhật bài thi không thành công !',
                type: 'error'
              })
            } else if (message === 'Cập nhật bài thi thành công !')
            {
              ElNotification({
                title: 'Thông báo',
                message: 'Cập nhật bài thi thành công !',
                type: 'success'
              })
            } else
            {
              ElNotification({
                title: 'Thông báo',
                message: message,
                type: 'error'
              })
            }
          }
        }
        fetchApi()
        this.loadingShow = false
      }
      catch (e)
      {
        this.loadingShow = false
        ElNotification({
          title: 'Thông báo',
          message: 'Có lỗi xảy ra !',
          type: 'error'
        })
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
