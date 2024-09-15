<template>
  <div class="p-5 mt-5">
    <div class="content-wrapper">
      <div class="lg-container">
        <div class="row">
          <div class="col-md-9">
            <div class="contentblock">
              <br />
              <h1 class="mb-3" style="font-size: 3vw;font-size:3vh;font-weight: 500;">
                Kết quả thi: {{ ExamName
                 }}
              </h1>
              <div class="mb-3">
                <RouterLink :to="{ name: 'checkAnswer', params: { id: data.id } }">
                  <button class="btn btn-primary">Xem chi tiết kết quả bài làm</button>
                </RouterLink>
                |
                <RouterLink :to="{ name: 'home' }"> Quay về trang chủ</RouterLink>
              </div>

              <div class="result-score-details">
                <div class="row">
                  <div class="col-12 col-md-3">
                    <div class="result-stats-box">
                      <div class="result-stats-item">
                        <i class="fa-solid fa-bullseye fa-lg me-2" style="color: #f20707"></i>
                        <span class="result-stats-label me-2">Kết quả làm bài</span>
                        <span class="result-stats-text"><strong>{{ data.correct_question}} / {{ data.correct_question + data.incorrect_question  }}</strong></span>
                      </div>
                      <br />
                      <br />
                      <div class="result-stats-item">
                        <span class="result-stats-icon far fa-clock me-3"></span>
                        <span class="result-stats-label me-2">Thời gian hoàn thành</span>
                        <span class="result-stats-text"><strong>{{ data.duration }} giây</strong></span>
                      </div>
                    </div>
                    <br />
                  </div>
                  <div class="col-12 col-md-9">
                    <div class="row">
                      <div class="col">
                        <div class="result-score-box">
                          <button class="btn btn-success btn-sm">
                            <i class="fa-solid fa-check fa-lg" style="color: #fcfcfc"></i>
                          </button>
                          <div class="result-score-icontext text-correct">Trả lời đúng</div>
                          <div class="result-score-text"><strong>{{ data.correct_question }}</strong></div>
                          <div class="result-score-sub"><span>câu hỏi</span></div>
                        </div>
                      </div>
                      <div class="col">
                        <div class="result-score-box">
                          <i class="fa-solid fa-circle-xmark fa-2xl" style="color: #f24207"></i>
                          <div class="result-score-icontext text-wrong mt-2">Trả lời sai</div>
                          <div class="result-score-text"><strong>{{ data.incorrect_question }}</strong></div>
                          <div class="result-score-sub"><span>câu hỏi</span></div>
                        </div>
                      </div>
                      <div class="col">
                        <div class="result-score-box">
                          <i class="fa-solid fa-ban fa-2xl" style="color: #ff7300"></i>
                          <div class="result-score-icontext text-unanswered mt-2">Bỏ qua</div>
                          <div class="result-score-text"><strong>{{ data.blank_question }}</strong></div>
                          <div class="result-score-sub"><span>câu hỏi</span></div>
                        </div>
                      </div>
                      <div class="col">
                        <div class="result-score-box" style="font-size: 3vw; font-size: 3vh">
                          <div class="result-score-icontext text-score"><strong>Điểm</strong></div>
                          <div class="result-score-text text-score text-danger">
                            <strong>{{ data.score }}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
              </div>
              <br />

              <div class="alert alert-success">
                <span class="far fa-lightbulb-on mr-1"></span>
                Tips: Khi xem chi tiết đáp án bạn nên chú ý những câu sai để sau không bị gặp lại
                lỗi sai tương tự.
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getResultDetail } from '@/service/resultServeice'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getExamDetail } from '@/service/examsService';

const data = ref([])
const route = useRoute()
const id = route.params.id
const ExamName = ref()

const fetchData = async () => {
  const result = await getResultDetail(id)
  if (result) {
      result['data'].blank_question = parseInt(result['data'].blank_question)
      result['data'].correct_question = parseInt(result['data'].correct_question)
      result['data'].incorrect_question = parseInt(result['data'].incorrect_question)
      data.value = result['data']      
    }
    const result2 = await getExamDetail(data.value.id_exam)
    if (result2)
    {
        ExamName.value= result2.data.title
    }
}
onMounted(fetchData)
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
