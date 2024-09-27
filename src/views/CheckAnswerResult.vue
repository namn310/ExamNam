<template>
  <div class="content-wrapper p-5 mb-4">
    <div class="xl-container">
      <h1 class="h4 text-center mb-4" style="font-size: 3vw; font-size: 3vh; font-weight: 500">
        {{ this.titleExam }}
        <RouterLink :to=" { name: 'ResultExam' } "><button class="ms-3 btn btn-primary">Thoát</button>
        </RouterLink>
      </h1>
      <hr />
      <form class="test-form" autocomplete="off" @submit.prevent enctype="multipart/form-data">
        <div class="test-wrapper d-flex">
          <div class="test-content contentblock" id="test-content" style="width: 80%">
            <div class="context-wrapper"></div>
            <div class="tab-content" id="pills-tabContent">
              <div class="tab-pane active show" id="partcontent-9022" role="tabpanel" aria-labelledby="pills-tab">
                <div class="context-wrapper"></div>
                <div class="test-questions-wrapper mb-4 me-2" v-for="(  question, index) in questions" :key=" index ">
                  <div class="question-wrapper" data-qid="144565" id="question-wrapper-144565">
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
                      <div @dblclick="HighlightQuestion( index )" class="question-number text-center" v-else
                        data-qid="144565" style="
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
                      <div class="question-text ms-2 mb-2">
                        <div class="boldIntro"></div>
                        <strong v-html=" question.title "></strong>
                      </div>
                    </div>

                    <div class="question-content text-highlightable">
                      <div class="question-answers mt-3">
                        <!-- Câu trả lời -->
                        <div class="form-check" v-for="(  ans, index2) in question.answerlist" :key=" index2 ">
                          <input @click="ToggleSelected( question.id, index2 )" data-type="question-answer"
                            class="form-check-input" type="checkbox" :checked="checkAnswerSelect(getLable(index2),question.AnswerSelected)" style="border: 1px solid black" />
                          <label :class="{'text-danger':checkAnswerSelect(getLable(index2),question.AnswerSelected) && !checkAnswerSelect(getLable(index2),question.correctAns) ,'text-success':checkAnswerSelect(getLable(index2),question.correctAns)}" class="form-check-label">
                            {{ getLable( index2 ) }}. {{ ans }}
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
                    <div class="test-questions-list-wrapper" v-for="(  question, index) in questions" :key=" index ">
                      <div v-if="CheckAnswer(question.correctAns,question.AnswerSelected)">
                        <p class="test-questions-listitem" id="correctAnswer">{{ index + 1 }}</p>
                      </div>
                      <div v-else>
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
import { getExamDetail, getQuestionExam } from '@/service/examsService'
import { getResultDetail, getReviewResult } from '@/service/resultServeice'
export default {
  name: 'ExamView',
  components: {
    // ModalView
  },
  data () {
    return {
      id: this.$route.params.id,
      showModal: false,
      showModal2: false,
      questions: [],
      answers: [],
      numberAnswer: ['', '', '', ''],
      answerSelected: [],
      correctAnswer: [],
      UserAnswer: [],
      titleExam: ''
    }
  },
  watch: {
    questions() {
      // Khi có sự thay đổi trong dữ liệu câu hỏi, gọi lại MathJax
      this.renderMath();
    }
  },

  created () {
    this.renderMath()
    this.getExam()
    // this.getAnswerUser()
  },
  methods: {
    renderMath() {
    // Kiểm tra xem MathJax đã được tải chưa
    if (window.MathJax) {
        this.$nextTick(() => {
          window.MathJax.typesetPromise()
            .then(() => {
              // console.log("MathJax rendering completed");
            })
            .catch(err => console.error("MathJax rendering error:", err));
        });
      }
  },
    async getExam () {
      const result1 = await getResultDetail(this.id)
      if (result1)
      {
        const idExam = result1.data.id_exam
        const idResult = this.$route.params.id
        {
          const result = await getQuestionExam(idExam)
          const result2 = await getReviewResult(idResult)
          const result3 = await getExamDetail(idExam)
          if (result)
          {
            this.questions = result.data
            this.questions.forEach((e) => {
              e.answerlist = JSON.parse(e.answerlist)
              e.correctAns = JSON.parse(e.correctAns)
              e.AnswerSelected = []
            })
          }
          if (result2)
          {
            this.UserAnswer = result2.data
          }
          if (result3)
          {
            this.titleExam = result3.data.title
          }
          // push thuộc tính câu trả lời người dùng làm vào mảng ques
          this.questions.forEach(e => {
            this.UserAnswer.forEach(e2 => {
              if (e.id === e2.id_question)
              {
                e.AnswerSelected.push(e2.answer)
              }
            })
          })
        }
        console.log(this.questions)
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
    checkAnswerSelect (answer, AnswerSelected) {
      const result = AnswerSelected.find(e => answer === e)
      if (result)
      {
        return true
      }
      else
      {
        return false
      }
    },
     CheckAnswer(correctAns, answerSelected) {
      if (correctAns.length !== answerSelected.length) {
        return false
      } else {
        // hàm every duyệt qua từng phần tử của mảng correctAns và kiểm tra xem nó có tồn tại trong mảng answerSelected hay không. Nếu có thì trả về true không thì trả về false
        return correctAns.every((e) => answerSelected.includes(e))
      }
    },
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
</style>
