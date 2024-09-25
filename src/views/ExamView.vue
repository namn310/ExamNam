<template>
  <div class="content-wrapper p-4 mb-4">
    <div class="xl-container">
      <h1 class="h4 text-center mb-4">
        {{ data.title }}
        <button class="btn btn-warning btn-sm" @click="toggleModal2">Thoát</button>
        <ModalView :visible="showModal2" @close="toggleModal2">
          <template v-slot:modal-body>
            <p>
              Nếu thoát thì kết quả bài thi sẽ không được ghi lại. Bạn có chắc chắn muốn rời khỏi
              bài làm ?
            </p>
          </template>
          <template v-slot:buttonConfirm>
            <RouterLink :to="{ name: 'testDetail', params: { id: 1 } }"
              ><button class="ms-3 btn btn-primary">Xác nhận</button></RouterLink
            >
          </template>
        </ModalView>
      </h1>
      <hr />
      <form class="test-form mt-2" autocomplete="off" @submit.prevent enctype="multipart/form-data">
        <div class="test-wrapper d-flex">
          <div class="test-content contentblock" id="test-content" style="width: 80%">
            <div class="context-wrapper"></div>
            <div class="tab-content" id="pills-tabContent">
              <div
                class="tab-pane active show"
                id="partcontent-9022"
                role="tabpanel"
                aria-labelledby="pills-tab"
              >
                <div class="context-wrapper"></div>
                <div
                  class="test-questions-wrapper mb-4 me-2"
                  v-for="(question, index) in questions"
                  :key="index"
                >
                  <div class="question-wrapper" data-qid="144565" id="question-wrapper-144565">
                    <!-- number question -->
                    <div class="d-flex">
                      <div
                        class="question-number text-center hightlightQuestion"
                        v-if="question.highlighted"
                        @dblclick="HighlightQuestion(index)"
                        data-qid="144565"
                        style="
                          width: 30px;
                          height: 30px;
                          border: 1px solid black;
                          border-radius: 5px;
                          cursor: pointer;
                        "
                      >
                        <strong
                          style="width: 100%; height: 100%; border-radius: 5px; cursor: pointer"
                          >{{ index + 1 }}</strong
                        >
                      </div>
                      <!--  -->
                      <div
                        @dblclick="HighlightQuestion(index)"
                        class="question-number text-center"
                        v-else
                        data-qid="144565"
                        style="
                          width: 30px;
                          height: 30px;
                          border: 1px solid black;
                          border-radius: 5px;
                          cursor: pointer;
                        "
                      >
                        <strong
                          style="width: 100%; height: 100%; border-radius: 5px; cursor: pointer"
                          >{{ index + 1 }}</strong
                        >
                      </div>
                      <!-- title question -->
                      <div class="question-text ms-2 mb-2" id="output"  >
                        <strong v-html="question.title" style="display: inline-block;"></strong>
                        <div v-if="question.imageUrl">
                          <img
                            :src="question.imageUrl"
                            class="img-fluid"
                            style="width: 35%; height: 35%"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="question-content text-highlightable">
                      <div class="question-answers mt-3">
                        <!-- Câu trả lời -->
                        <div
                          class="form-check"
                          v-for="(ans, index2) in question.answerlist"
                          :key="index2"
                        >
                          <input
                            @click="ToggleSelected(question.id, index2)"
                            data-type="question-answer"
                            class="form-check-input"
                            type="checkbox"
                            style="border: 1px solid black"
                          />
                          <label id="output" class="form-label">
                            {{ getLable(index2) }}. {{ ans }}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="test-navigation"
            id="test-navigation"
            style="width: 20%; border-left: 1px solid black; padding-left: 10px"
          >
            <div class="test-navigation__inner" id="test-navigation__inner">
              <div>
                <div class="timeleft-wrapper mb-2">
                  Thời gian còn lại:
                  <span id="timeleft" class="timeleft">{{ formatTime }}</span>
                </div>
                <button
                  class="btn btn-outline-primary btn-block mb-3 mt-3"
                  @click="toggleModal"
                  id="submit-test"
                  type="submit"
                >
                  NỘP BÀI
                </button>
                <ModalView :visible="showModal" @close="toggleModal">
                  <template v-slot:modal-body>
                    <p>Xác nhận nộp bài ?</p>
                  </template>
                  <template v-slot:buttonConfirm>
                    <button @click="handleSubmit" class="ms-3 btn btn-primary">Xác nhận</button>
                  </template>
                </ModalView>
                <div class="test-questions-list">
                  <div class="test-questions-list-part d-flex flex-wrap">
                    <div
                      class="test-questions-list-wrapper"
                      v-for="(question, index) in questions"
                      :key="index"
                    >
                      <span
                        class="test-questions-listitem"
                        v-if="!question.Answer || Object.keys(question.Answer[0]).length < 1"
                      >
                        {{ index + 1 }}
                      </span>
                      <span class="test-questions-listitem" v-else id="selected">
                        {{ index + 1 }}
                      </span>
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
import ModalView from '@/components/ModalView.vue'
import { getExamDetail, getQuestionExam } from '@/service/examsService'
import { createResult } from '@/service/resultServeice'
import { decodeTokenStudent } from '@/service/decodeToken'
import { useRoute } from 'vue-router'
// import CheckAnswerResult from './CheckAnswerResult.vue'
// import Cookies from 'js-cookie'
export default {
  name: 'ExamView',
  components: {
    ModalView
  },
  data() {
    return {
      // time count donwn of exam
      durationExam: 0,
      countdown: 0,
      timer: null,
      showModal: false,
      showModal2: false,
      questions: [],
      answers: null,
      data: [],
      id: 0,
      score: 0,
      scoreQuestion: 0,
      blank_question: null,
      correct_question: null,
      incorrect_question: null
    }
  },
  async created () {
    this.renderMath()
    const route = useRoute()
    const id = route.params.id
    this.id = id
    const result = await getExamDetail(id)
    if (result) {
      this.data = result['data']
      this.durationExam = result['data'].duration
      this.scoreQuestion = 10 / result['data'].totalQuestion
    }
    const question = await getQuestionExam(id)
    if (question) {
      this.questions = question.data
      this.questions.forEach((e) => {
        e.answerlist = JSON.parse(e.answerlist)
        e.correctAns = JSON.parse(e.correctAns)
        if (e.image !== null && e.image !== '') {
          e.imageUrl = `http://localhost:8080/assets/image/Question/${e.image}`
        }
      })
    }
    console.log(this.questions)
    this.startCountDown()
    // Thêm sự kiện `beforeunload` khi component được mount
    window.addEventListener('beforeunload', this.BeforeUnload)
  },
  beforeUnmount() {
    // Xóa sự kiện `beforeunload` khi component bị hủy
    window.removeEventListener('beforeunload', this.BeforeUnload)
  },
  computed: {
    formatTime() {
      const minutes = Math.floor(this.countdown / 60)
      const seconds = this.countdown % 60
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }
  },
  methods: {
     renderMath() {
    // Kiểm tra xem MathJax đã được tải chưa
    if (window.MathJax) {
      this.$nextTick(() => {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, "ouput"]);
      });
    }

  },
    // hiện thông báo khi người dùng bấm refresh trang khi thời gian làm bài chưa kết thúc
    BeforeUnload(event) {
      if (this.countdown > 0) {
        const message = 'Thời gian làm bài vẫn còn. Nếu thoát thì kết quả sẽ không được lưu lại !'
        event.returnValue = message
        return message
      }
    },
    startCountDown() {
      // Nếu tồn tại thời gian từ localStorage, set giá trị từ localStorage
      const savedTime = localStorage.getItem('time');
      if (savedTime){
        this.countdown = parseInt(savedTime)
      } else {
        this.countdown = this.durationExam * 60
      }
      // Đếm ngược thời gian
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--
          localStorage.setItem('time', this.countdown)
        } else {
          this.stopCountdown()
          alert("Time's up!")
          this.handleSubmit()
        }
      }, 1000)
    },
    stopCountdown() {
      clearInterval(this.timer)
      this.timer = null
    },
    handleUnload() {
      window.addEventListener('beforeunload', this.BeforeUnload)
    },  
    toggleModal() {
      this.showModal = !this.showModal
    },
    toggleModal2() {
      this.showModal2 = !this.showModal2
    },
    ToggleSelected(IdQues, answerIndex) {
      // lấy câu hỏi theo idQues
      const questionItem = this.questions.find((ques) => ques.id === IdQues)
      if (questionItem) {
        // set true cho câu trả lời khi người dùng bấm chọn câu trả lời
        const newAns1 = { [answerIndex]: this.getLable(answerIndex) }
        // duyệt mảng questions
        this.questions.forEach((e) => {
          // lấy câu hỏi có id bằng idQues
          if (e.id === IdQues) {
            // nếu chưa tồn tại thuộc tính Answer thì thêm mới
            if (!e.Answer) {
              e['Answer'] = [newAns1]
            }
            // Nếu đã tồn tại rồi thì duyệt mảng Answer
            else {
              e.Answer.forEach((e1) => {
                if (!e1[answerIndex]) {
                  // nếu chưa tồn tại câu trả lời vừa chọn trong mảng thì tạo
                  e1[answerIndex] = this.getLable(answerIndex)
                } else {
                  // nếu đã tồn tại thì xóa vì khi người dùng click lại vào câu trả lời đã chọn thì set false => xóa
                  delete e1[answerIndex]
                }
              })
            }
          }
        })
      }
      // lấy độ dài của một object :   Object.keys(obj).length;
    },
    getLable(index) {
      return String.fromCharCode(65 + index) // Từ mã ASCII để tạo A, B, C, D,...
    },
    // hightlight question khi người dùng double-click vào câu hỏi
    HighlightQuestion(index) {
      this.questions[index].highlighted = !this.questions[index].highlighted
    },
    // Làm danh sách câu trả lời người dùng đã chọn để làm so sánh đáp án
    ListAnswerSelected() {
      this.blank_question = 0
      this.correct_question = 0
      this.incorrect_question = 0
      // hiển thị hộp thông báo nộp bài
      this.questions.forEach((e) => {
        if (e.Answer) {
          if (Object.keys(e.Answer[0]).length > 0) {
            if (this.CheckAnswer(e.correctAns, Object.values(e.Answer[0])) === true) {
              // nếu hàm check answer true thì câu đúng cộng thêm 1
              this.correct_question += 1
            } else {
              // false thì câu này sai
              this.incorrect_question += 1
            }
          } else {
            // nếu chưa chọn thì đây là câu bỏ trống
            this.blank_question += 1
          }
        } else {
          // nếu không tồn tại thuộc tính Answer trong mảng thì là câu bỏ trống
          this.blank_question += 1
        }
      })
      console.log(this.blank_question, this.correct_question, this.incorrect_question)
    },
    // kiểm tra các câu đúng
    CheckAnswer(correctAns, answerSelected) {
      if (correctAns.length !== answerSelected.length) {
        return false
      } else {
        // hàm every duyệt qua từng phần tử của mảng correctAns và kiểm tra xem nó có tồn tại trong mảng answerSelected hay không. Nếu có thì trả về true không thì trả về false
        return correctAns.every((e) => answerSelected.includes(e))
      }
    },

    // Nộp bài kiểm tra
    async handleSubmit() {
      this.ListAnswerSelected()
      // set mảng answers
      this.answers = []
      // duyệt mảng question để lấy dữ liệu câu trả lời người dùng rồi đổ vào mảng answers
      this.questions.forEach((e) => {
        if (e.Answer) {
          if (Object.keys(e.Answer[0]).length > 0) {
            Object.values(e.Answer[0]).forEach((e1) => {
              this.answers.push({
                id: e.id,
                answer: e1
              })
            })
          }
        }
      })
      // console.log(this.answers)
      this.score = this.scoreQuestion * this.correct_question
      const user = decodeTokenStudent()
      const result = await createResult({
        id_user: user.data.id,
        id_exam: parseInt(this.id),
        score: this.score,
        duration: this.durationExam * 60 - this.countdown,
        blank_question: this.blank_question,
        correct_question: this.correct_question,
        incorrect_question: this.questions.length - this.blank_question - this.correct_question,
        answers: this.answers
      })
      // console.log({
      //   id_user: user.data.id,
      //   id_exam: parseInt(this.id),
      //   score: this.score,
      //   duration: this.durationExam * 60 - this.countdown,
      //   blank_question: this.blank_question,
      //   correct_question: this.correct_question,
      //   incorrect_question: this.questions.length - this.blank_question - this.correct_question,
      //   answers: this.answers
      // })
      if (result) {
        this.stopCountdown()
        // console.log(result)
        this.$router.replace({ name: 'detailResultExam', params: { id: result.lastInsert } })
      }
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
  background-color: green;
  color: white;
}

.hightlightQuestion {
  background-color: yellow;
}
</style>
