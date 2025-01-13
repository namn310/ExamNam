<template>
  <div class="content-wrapper p-5 mb-4">
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
    <div class="xl-container" v-if=" !loadingShow ">
      <h1 class="h4 text-center mb-4" style="font-size: 3vw; font-size: 3vh; font-weight: 500">
        {{ this.titleExam }}
        <RouterLink :to=" { name: 'ResultExam' } "><button class="ms-3 btn btn-primary">Thoát</button>
        </RouterLink>
      </h1>
      <div class="alert alert-warning w-50 mt-2" role="alert">
        Các đề thi có công thức toán học sẽ mất một chút thời gian gian nhỏ để load các công thức toán học !
      </div>
      <hr />
      <form class="test-form mt-3" autocomplete="off" @submit.prevent enctype="multipart/form-data">
        <div class="test-wrapper d-flex">
          <div class="test-content contentblock" id="test-content" style="width: 80%">
            <div class="context-wrapper"></div>
            <div class="tab-content" id="pills-tabContent">
              <div class="tab-pane active show" id="partcontent-9022" role="tabpanel" aria-labelledby="pills-tab">
                <div class="context-wrapper"></div>
                <div class="test-questions-wrapper mb-4 me-2" v-for="(       question, index) in questions"
                  :key=" index ">
                  <div class="question-wrapper" id="question-wrapper-144565">
                    <!-- number question -->
                    <div class="d-flex">
                      <div class="question-number text-center hightlightQuestion" v-if=" question.highlighted "
                        @dblclick="HighlightQuestion( index )" data-qid="144565" style="
                          width: 30px;
                          height: 30px;
                          border: 1px solid black;
                          border-radius: 5px;
                          cursor: pointer;
                        ">
                        <strong style="width: 100%; height: 100%; border-radius: 5px; cursor: pointer">{{ index + 1
                          }}</strong>
                      </div>
                      <!--  -->
                      <div @dblclick="HighlightQuestion( index )" class="question-number text-center" v-else style="
                          width: 30px;
                          height: 30px;
                          border: 1px solid black;
                          border-radius: 5px;
                          cursor: pointer;
                        ">
                        <strong style="width: 100%; height: 100%; border-radius: 5px; cursor: pointer">{{ index + 1
                          }}</strong>
                      </div>
                      <!-- title question -->
                      <div class="question-text ms-2 mb-2" :id=" 'question_' + index ">
                        <div class="boldIntro"></div>
                        <strong v-html=" question.title "></strong>
                        <div v-if=" question.imageUrl ">
                          <img :src=" question.imageUrl " class="img-fluid" style="width: 35%; height: 35%" />
                        </div>
                      </div>
                    </div>

                    <div class="question-content text-highlightable">
                      <div class="question-answers mt-3">
                        <!-- Câu trả lời -->
                        <div class="form-check" v-for="(     ans, index2) in question.answerlist" :key=" index2 ">
                          <input data-type="question-answer" class="form-check-input" type="checkbox"
                            :checked=" checkSelected( getLable( index2 ), question.id ) > 0 "
                            style="border: 1px solid black" />
                          <!-- :checked = " checkAnswerSelect( getLable( index2 ), question.AnswerSelected ) " -->

                          <!-- :class=" { 'text-danger': checkAnswerSelect( getLable( index2 ), question.AnswerSelected ) && !checkAnswerSelect( getLable( index2 ), question.correctAns ), 'text-success': checkAnswerSelect( getLable( index2 ), question.correctAns ) } " -->
                          <label :class=" {
                            'correctAnswer': CheckAnswer( getLable( index2 ), question.id ) == true,
                            'incorrectAnswer': CheckAnswer( getLable( index2 ), question.id ) == false

                          } " class="form-check-label">
                            {{ getLable( index2 ) }}. {{ ans }}
                            <!-- Nếu có hình ảnh câu trả lời thì load ra -->
                            <div>
                              <div style="position: relative; width: 30%; height: 30%" v-if="
                                question.ListImageAnswerUrl &&
                                question.ListImageAnswerUrl.length > 0 &&
                                question.ListImageAnswerUrl[index2].imageUrl
                              ">
                                <img :src=" question.ListImageAnswerUrl[index2].imageUrl " class="img-fluid" />
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="test-navigation" id="test-navigation"
            style="width: 20%; border-left: 1px solid black; padding-left: 10px">
            <div class="test-navigation__inner mb-3" id="test-navigation__inner">
              <strong class="mb-3">Đáp án</strong>
              <div>
                <div class="test-questions-list mt-3">
                  <div class="test-questions-list-part d-flex flex-wrap">
                    <div class="test-questions-list-wrapper" v-for="(       question, index) in questions"
                      :key=" index ">
                      <div v-if=" question.state == 1 " @click="scrollToQuesstion( index )">
                        <p class="test-questions-listitem" id="correctAnswer">{{ index + 1 }}</p>
                      </div>
                      <div v-else @click="scrollToQuesstion( index )">
                        <p class="test-questions-listitem" id="incorrectAnswer">{{ index + 1 }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
// import ModalView from '@/components/ModalView.vue'
import { getQuestionExam,getDetailExam } from '@/service/examsService'
import { getResultDetail, getReviewResult } from '@/service/resultServeice'
import { getImageAnswer } from '@/service/questionsService'
export default {
  name: 'ExamView',
  components: {
    // ModalView
  },
  data () {
    return {
      loadingShow: true,
      id: this.$route.params.id,
      showModal: false,
      showModal2: false,
      questions: [],
      answers: [],
      numberAnswer: ['', '', '', ''],
      answerSelected: [],
      correctAnswer: [],
      UserAnswer: [],
      titleExam: '',
      ListState: []
    }
  },
  watch: {
    questions () {
      // Khi có sự thay đổi trong dữ liệu câu hỏi, gọi lại MathJax
      this.renderMath()
    }
  },

  created () {
    this.renderMath()
    this.getExam()
    // this.getAnswerUser()
  },
  methods: {
    // di chuyển tới câu hỏi khi click
    scrollToQuesstion (index) {
      const element = document.getElementById(`question_${index - 1}`)
      if (element)
      {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    },
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
    async getExam () {
      try
      {
        const result1 = await getResultDetail(this.id)
        if (result1)
        {
          const idExam = result1.data.id_exam
          const idResult = this.$route.params.id
          const result = await getQuestionExam(idExam)
          const result2 = await getReviewResult(idResult)
          const result3 = await getDetailExam(idExam)
          if (result, result2, result3)
          {
            this.questions = result.data
            // eslint-disable-next-line no-unused-vars
            for (const [index, e] of this.questions.entries())
            {
              e.answerlist = JSON.parse(e.answerlist)
              e.correctAns = JSON.parse(e.correctAns)
              if (e.image !== null && e.image !== '')
              {
                // lấy URL hình ảnh
                e.imageUrl = `http://localhost:8080/assets/image/Question/${e.image}`
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
            }
          }
          if (result2)
          {
            this.UserAnswer = result2.data
            this.UserAnswer.forEach(e => {
              e.answer = JSON.parse(e.answer)
            })
          }
          if (result3)
          {
            this.titleExam = result3.result.title
          }
          // push thuộc tính câu trả lời người dùng làm vào mảng ques
          this.questions.forEach((e) => {
            this.UserAnswer.forEach((e2) => {
              if (e.id === e2.id_question)
              {
                e.state = e2['state']
              }
            })
          })

        }
        // console.log(this.UserAnswer, this.questions,this.CheckAnswer('D',76))
        this.loadingShow = false
        this.renderMath()
      }
      catch (e)
      {
        alert("Có lỗi trong quá trình lấy dữ liệu")
      }
    },
    toggleModal () {
      this.showModal = !this.showModal
    },
    toggleModal2 () {
      this.showModal2 = !this.showModal2
    },
    getLable (index) {
      return String.fromCharCode(65 + index) // Từ mã ASCII để tạo A, B, C, D,...
    },
    // kiểm tra xem đáp án này đã được chọn hay chưa 
    checkSelected (answer, id) {
      var flag = 0;
      this.UserAnswer.forEach(e => {
        if (e.answer !== null && e.answer !== undefined)
        {
          if (e.id_question === id && e.answer.includes(answer))
          {
            flag++
          }
        }
      });

      return flag;
    },
    // kiểm tra xem đáp án đấy có phải đáp án đúng hay không
    // checkCorrectAns (answer, id) {
    //   var flag = 0;
    //   this.questions.forEach(e => {
    //     if (e.id === id && e.correctAns.includes(answer))
    //     {
    //       flag++
    //     }
    //   })
    //   return flag > 0 ? true : false
    // },
    // checkInCorrectAns (answer, id) {
    //   var flag = 0;
    //   this.questions.forEach(e => {
    //     if (e.id === id && e.correctAns.includes(answer) && this.checkSelected(answer, id))
    //     {
    //       flag++
    //     }
    //   })
    //   return flag > 0 ? true : false
    // },


    // kiểm tra đáp án này đúng hay sai hay không có thuộc tính gì 
    CheckAnswer (answer, id) {
      var flagCorrect = 0
      var flagIncorrect = 0
      this.questions.forEach(e => {
        // nếu id câu hỏi đang xét trùng với id câu hỏi trong danh sách câu hỏi và trong danh sách đáp án có tồn tại biến answer thì flagCorrect++
        if (e.id === id && e.correctAns.includes(answer))
        {
          flagCorrect++
        }
        // nếu id câu hỏi đang xét trùng với id câu hỏi trong danh sách câu hỏi và trong danh sách đáp án có tồn tại biến answer và đây là câu trả lời của thí sinh thì flagInCorrect++
        if (e.id === id && !e.correctAns.includes(answer) && this.checkSelected(answer, id) > 0)
        {
          flagIncorrect++
        }
      })
      if (flagCorrect > 0)
      {
        return true
      }
      if (flagIncorrect > 0)
      {
        return false
      }
      // mặc định là null nếu không thỏa mãn 2 trường hợp trên
      return null
    }
  }
}
</script>
<style scoped>
input[type='radio'] {
  appearance: none;
  width: 15px;
  height: 15px;
  border: 2px solid #007bff;
  border-radius: 50%;
  position: relative;
  outline: none;
  cursor: pointer;
}

.content-wrapper {
  margin-top: 70px;
}

.test-questions-listitem {
  display: inline-flex;
  border-radius: 3px;
  border-color: #f7faff;
  border: 1px solid;
  font-weight: 600;
  margin-right: 4px;
  margin-bottom: 8px;
  width: 28px;
  height: 25px;
  font-size: 11px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

#selected {
  background-color: yellow;
}

.hightlightQuestion {
  background-color: yellow;
}

.correctAnswer {
  /* background-color: green; */
  color: green;
}

.incorrectAnswer {
  /* background-color: red; */
  color: red;
}

#correctAnswer {
  background-color: green;
  color: white;
}

#incorrectAnswer {
  background-color: red;
  color: white;
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
