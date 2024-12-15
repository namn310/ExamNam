<!-- eslint-disable vue/no-v-text-v-html-on-component -->

<template>
  <div class="p-10">
    <div>
      <RouterLink :to=" { name: 'AddQuestion-into-Exam', params: { id: id } } ">
        <button class="btn btn-success mb-3 me-3"> <i class="fa-solid fa-plus fa-lg me-2"></i>Thêm câu hỏi vào bài thi
        </button>
      </RouterLink>
      <RouterLink :to=" { name: 'thongke', params: { id: id } } ">
        <button class="btn btn-primary mb-3">Thống kê dữ liệu làm bài kiểm tra</button>
      </RouterLink>
      <RouterLink :to=" { name: 'IRT_EXAM', params: { id: id } } ">
        <button class="btn btn-primary mb-3 ms-3">Dữ liệu tính theo IRT </button>
      </RouterLink>
      <button @click="exportPDF()" class="btn btn-danger ms-3 mb-3">Xuất pdf<i
          class="ms-2 fa-solid fa-file-pdf fa-lg"></i></button>
    </div>
    <div>
      <div class="nameExam d-flex justify-content-center">
        <p style="font-size:3vw;font-size:3vh"><strong>{{ ExamDetail.title }} </strong></p>
      </div>
      <div class="d-flex justify-content-end">
        <p>Thời gian làm bài: {{ ExamDetail.duration }} phút</p>
      </div>
    </div>
    <div style="margin-bottom: 15px" ref="dataQuestion" class="dataQuestion mt-2">
      <!-- Danh sách câu hỏi: <el-switch v-model="fill" /> -->
      <el-space :fill=" fill " wrap>
        <el-card v-for="(   i, index) in question" :key=" i " class="box-card">
          <template #header>
            <div class="card-header d-flex">
              <span><strong>Câu {{ index + 1 }}:</strong></span>
              <span class="ms-2" text v-html=" i.title "></span>
              <div>
                <button @click="deleteQuestion(i.id)" class="btn btn-danger" style="position: absolute;right: 50px;">x</button>
              </div>
            </div>
          </template>
          <div v-if=" i.ImageQuestionUrl !== '' && i.ImageQuestionUrl !== null ">
            <div style="width: 30%; height: 30%; position: relative">
              <img :src=" i.ImageQuestionUrl " style="border: 1px solid black; border-radius: 5px" class="img-fluid" />
            </div>
          </div>
          <div>
            <div v-for="(   ans, index2) in i.answerlist" :key=" index2 " class="text item">
              <span>{{ getLabel( index2 ) }}. {{ ans }}</span>
              <div>
                <div style="position: relative; width: 30%; height: 30%" v-if="
                  i.ListImageAnswerUrl && i.ListImageAnswerUrl.length > 0 && i.ListImageAnswerUrl[index2].imageUrl
                ">
                  <img :src=" i.ListImageAnswerUrl[index2].imageUrl " class="img-fluid" />
                </div>
              </div>

            </div>
          </div>
          <div class="text item text-blue-700 font-semibold">Đáp án : {{ ( i.correctAns ) }}</div>
        </el-card>
      </el-space>
    </div>
  </div>
</template>

<script lang="js" setup>
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import { getQuestionExam,DeleteQuestionInExam,getExamDetail } from '@/service/examsService'
import { getImageAnswer } from '@/service/questionsService'
// import { a } from 'vitest/dist/suite-IbNSsUWN';
import { onMounted, ref, nextTick } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
// thư viện pdfmake
// import PdfPrinter from 'pdfmake'
// eslint-disable-next-line no-unused-vars
import html2canvas from 'html2canvas'
// eslint-disable-next-line no-unused-vars
import jsPDF from 'jspdf'
const question = ref([])
const ExamDetail = ref([])
const route = useRoute()
// const ListImageAnswer = ref([])
// const ListImageAnswerUrl = ref([])
// const imgUrl = ref([])
const id = route.params.id
// const answer = ref( [] );
const fill = ref(true)
const getLabel = (index) => {
  return String.fromCharCode(65 + index) // Từ mã ASCII để tạo A, B, C, D,...
}
const renderMath = () => {
  // Kiểm tra xem MathJax đã được tải chưa
  if (window.MathJax)
  {
    nextTick(() => {
      window.MathJax.typesetPromise()
        .then(() => {

        })
        .catch((err) => console.error('MathJax rendering error:', err))
    })
  }
}
// lấy dữ liệu từ api
const fetchData = async () => {
  const result = await getQuestionExam(id)
  const Exam = await getExamDetail(id)
  if (Exam)
  {
    ExamDetail.value = Exam.result
  }
  console.log(ExamDetail.value)
  if (result)
  {
    question.value = result['data']
    // lấy danh sách câu hỏi
    // khi dùng await trong for thì nên dùng for of để xử lý hoàn tất hàm bất đồng bộ trước khi sang phần tử mới
    // eslint-disable-next-line no-unused-vars
    for (const [index, e] of question.value.entries())
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
    renderMath()
  }
}
const deleteQuestion = async (idQues) => {
  if (confirm("Bạn có muốn xóa câu hỏi này không ?"))
  {
   
      const result = await DeleteQuestionInExam(idQues, id)
      if (result)
      {
        console.log(result)
        if (result.result == 'true')
        {
          // xóa câu hỏi
          // câu hỏi nào có id trùng thì xóa đi
          question.value = question.value.filter((q) => q.id !== idQues);
           ElNotification({
              title: 'Thông báo',
              message: 'Xóa câu hỏi thành công',
              type: 'success'
            })
        }
        else
        {
           ElNotification({
              title: 'Thông báo',
              message: 'Xóa câu hỏi thất bại',
              type: 'error'
            })
        }
      }
      else
      {
        alert("Có lỗi xảy ra")
      }
    // console.log(id)
  }
  else
  {
    return
  }
}
onMounted(fetchData)
</script>
