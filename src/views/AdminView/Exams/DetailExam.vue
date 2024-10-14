<!-- eslint-disable vue/no-v-text-v-html-on-component -->

<template>
  <div class="p-10">
    <div>
      <RouterLink :to="{name:'thongke',params:{id: id}}">
        <button class="btn btn-primary mb-3">Thống kê dữ liệu làm bài kiểm tra</button>
      </RouterLink>
    </div>
    <div style="margin-bottom: 15px">Danh sách câu hỏi: <el-switch v-model="fill" /></div>
    <el-space :fill="fill" wrap>
      <el-card v-for="(i, index) in question" :key="i" class="box-card">
        <template #header>
          <div class="card-header d-flex">
            <span>Câu {{ index + 1 }}:</span>
            <span class="ms-2" text v-html="i.title"></span>
          </div>
        </template>
        <div v-if="i.ImageQuestionUrl !== '' && i.ImageQuestionUrl !== null">
          <div style="width: 30%; height: 30%; position: relative">
            <img
              :src="i.ImageQuestionUrl"
              style="border: 1px solid black; border-radius: 5px"
              class="img-fluid"
            />
          </div>
        </div>
        <div>
          <div v-for="(ans, index2) in i.answerlist" :key="index2" class="text item">
            <span>{{ getLabel(index2) }}. {{ ans }}</span>
            <div>
              <div
                style="position: relative; width: 30%; height: 30%"
                v-if="
                 i.ListImageAnswerUrl && i.ListImageAnswerUrl.length > 0 && i.ListImageAnswerUrl[index2].imageUrl
                "
              >
                <img :src="i.ListImageAnswerUrl[index2].imageUrl" class="img-fluid" />
              </div>
            </div>
            
          </div>
        </div>
        <div class="text item text-blue-700 font-semibold">Đáp án : {{ i.correctAns }}</div>
      </el-card>
    </el-space>
  </div>
</template>

<script lang="js" setup>
import { getQuestionExam } from '@/service/examsService'
import { getImageAnswer } from '@/service/questionsService'
// import { a } from 'vitest/dist/suite-IbNSsUWN';
import { onMounted, ref, nextTick } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const question = ref([])
const route = useRoute()
// const ListImageAnswer = ref([])
// const ListImageAnswerUrl = ref([])
// const imgUrl = ref([])
const id = route.params.id
// const answer = ref( [] );
const fill = ref(false)
const getLabel = (index) => {
  return String.fromCharCode(65 + index) // Từ mã ASCII để tạo A, B, C, D,...
}
const renderMath = () => {
  // Kiểm tra xem MathJax đã được tải chưa
  if (window.MathJax) {
    nextTick(() => {
      window.MathJax.typesetPromise()
        .then(() => {
          // console.log("MathJax rendering completed");
        })
        .catch((err) => console.error('MathJax rendering error:', err))
    })
  }
}
const fetchData = async () => {
  const result = await getQuestionExam(id)
  if (result) {
    question.value = result['data']
    // lấy danh sách câu hỏi
    // khi dùng await trong for thì nên dùng for of để xử lý hoàn tất hàm bất đồng bộ trước khi sang phần tử mới
    for (const [index, e] of question.value.entries()) {
      e.answerlist = JSON.parse(e.answerlist)
      // answer.value.push( {'idQues':e.id,'listAns':e.answerlist} );
      if (!e.ImageQuestionUrl) {
        e.ImageQuestionUrl = ''
      }
      if (e.image !== '' && e.image !== null) {
        const imgUrl = `http://localhost:8080/assets/image/Question/${e.image}`
        // tạo mảng chứa url ảnh câu hỏi
        e.ImageQuestionUrl = imgUrl
      }

      var idQues = e.id
      // Lấy danh sách hình ảnh câu trả lời
      var fetchImageAnswer = await getImageAnswer(idQues)
      var imageAnswerQuestion = fetchImageAnswer.data
      // nếu chưa tồn tại list url ảnh thì khởi tạo mảng
      if (!e.ListImageAnswerUrl) {
        e.ListImageAnswerUrl = []
      }
      for (var img of imageAnswerQuestion.entries()) {
        const imageAnsUrl = `http://localhost:8080/assets/image/AnswerQuestion/${img[1].imageAns}`
        const element = { imageUrl: imageAnsUrl, stt: img[1].stt }
        if (img[1].idQues === e.id) {
          e.ListImageAnswerUrl.push(element)
        }
      }
    }
    // // console.log(question.value[0].ListImageAnswerUrl[0].imageUr)
    // question.value.forEach(e => {
    //   console.log(e.ListImageAnswerUrl[0].imageUrl)
    // })
    // console.log(question.value)
    renderMath()
  }
}
onMounted(fetchData)
</script>
