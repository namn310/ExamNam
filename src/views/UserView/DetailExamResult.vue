<template>
  <div class="p-5 mt-5">
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
    <div class="content-wrapper" v-else>
      <div class="lg-container">
        <div class="row">
          <div class="col-md-11">
            <div class="contentblock">
              <br />
              <h1 class="mb-3" style="font-size: 3vw;font-size:3vh;font-weight: 500;">
                Kết quả thi: {{ ExamName
                }}
              </h1>
              <div class="mb-3">
                <RouterLink :to=" { name: 'checkAnswer', params: { id: data.id } } ">
                  <button class="btn btn-primary">Xem chi tiết kết quả bài làm</button>
                </RouterLink>
                |
                <RouterLink :to=" { name: 'home' } ">
                  <button class="btn btn-secondary">Quay về trang chủ </button>
                </RouterLink>
              </div>

              <div class="result-score-details">
                <div class="row">
                  <div class="col-12 col-md-3">
                    <div class="result-stats-box">
                      <div class="result-stats-item">
                        <i class="fa-solid fa-bullseye fa-lg me-2" style="color: #f20707"></i>
                        <span class="result-stats-label me-2">Kết quả làm bài</span>
                        <span class="result-stats-text"><strong>{{ data.correct_question }} / {{ data.correct_question +
                          data.incorrect_question + data.blank_question }}</strong></span>
                      </div>
                      <br />
                      <br />
                      <div class="result-stats-item">
                        <span class="result-stats-icon far fa-clock me-3"></span>
                        <span class="result-stats-label me-2">Thời gian hoàn thành</span>
                        <span class="result-stats-text"><strong>{{ convertToMinutes( data.duration ) }}</strong></span>
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
                          <div v-if=" data.score > 0 " class="result-score-text text-score text-danger">
                            <strong>{{ ( data.score ).toFixed( 1 ) }}</strong>
                          </div>
                          <div v-else class="result-score-text text-score text-danger">
                            <strong>{{ ( data.score ) }}</strong>
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
import { getNameExam } from '@/service/examsService';
const loadingShow = ref(true)
const data = ref([])
const route = useRoute()
const id = route.params.id
const ExamName = ref()
const convertToMinutes = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} p ${remainingSeconds} s`;
}

const fetchData = async () => {
  try
  {
    const result = await getResultDetail(id)
    if (result)
    {
      result['data'].blank_question = parseInt(result['data'].blank_question)
      result['data'].correct_question = parseInt(result['data'].correct_question)
      result['data'].incorrect_question = parseInt(result['data'].incorrect_question)
      data.value = result['data']
    }
    const result2 = await getNameExam(data.value.id_exam)
    // console.log(result2)
    if (result2)
    {
      ExamName.value = result2.title
    }
    loadingShow.value = false
  }
  catch (e)
  {
    console.log(e)
    alert("Có lỗi trong quá trình lấy dữ liệu !")
  }
}
onMounted(fetchData)
</script>

<style scoped>
a {
  text-decoration: none;
}

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
