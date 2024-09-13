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
        <!-- <button type="submit" disabled="" style="display: none" aria-hidden="true"></button>
        <input type="hidden" name="uid" value="da7207cb-bd08-426b-a520-854bb4b631e9" />
        <input type="hidden" name="start_time" value="1724755098.855" />
        <input type="hidden" name="end_time" value="0" />
        <input type="hidden" name="time_limit" value="50.0" />
        <input type="hidden" name="timeleft_value" value="0" /> -->

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
                      <div class="question-text ms-2 mb-2">
                        <div class="boldIntro"></div>
                        <strong v-html="question.title"></strong>
                      </div>
                    </div>

                    <div class="question-content text-highlightable">
                      <div class="question-answers">
                        <!-- Câu trả lời A -->
                        <div class="form-check">
                          <input
                            @click="ToggleSelected(index, 'A')"
                            data-type="question-answer"
                            class="form-check-input"
                            :data-qid="'question-' + index + 'A'"
                            type="radio"
                            :name="'question-' + index + 'A'"
                            :id="'question-' + index + 'A'"
                            :value="getLable(0)"
                            v-model="answerSelected[index]"
                          />
                          <label class="form-check-label" :for="'question-' + index + 'A'">
                            {{ getLable(0) }}. {{ question.A }}.
                          </label>
                        </div>

                        <!-- Câu trả lời B -->
                        <div class="form-check">
                          <input
                            @click="ToggleSelected(index, 'B')"
                            data-type="question-answer"
                            class="form-check-input"
                            :data-qid="'question-' + index + 'B'"
                            type="radio"
                            :name="'question-' + index + 'B'"
                            :id="'question-' + index + 'B'"
                            :value="getLable(1)"
                            v-model="answerSelected[index]"
                          />
                          <label class="form-check-label" :for="'question-' + index + 'B'">
                            {{ getLable(1) }}. {{ question.B }}.
                          </label>
                        </div>

                        <!-- Câu trả lời C -->
                        <div class="form-check">
                          <input
                            @click="ToggleSelected(index, 'C')"
                            data-type="question-answer"
                            class="form-check-input"
                            :data-qid="'question-' + index + 'C'"
                            type="radio"
                            :name="'question-' + index + 'C'"
                            :id="'question-' + index + 'C'"
                            :value="getLable(2)"
                            v-model="answerSelected[index]"
                          />
                          <label class="form-check-label" :for="'question-' + index + 'C'">
                            {{ getLable(2) }}. {{ question.C }}.
                          </label>
                        </div>

                        <!-- Câu trả lời D -->
                        <div class="form-check">
                          <input
                            @click="ToggleSelected(index, 'D')"
                            data-type="question-answer"
                            class="form-check-input"
                            :data-qid="'question-' + index + 'D'"
                            type="radio"
                            :name="'question-' + index + 'D'"
                            :id="'question-' + index + 'D'"
                            :value="getLable(3)"
                            v-model="answerSelected[index]"
                          />
                          <label class="form-check-label" :for="'question-' + index + 'D'">
                            {{ getLable(3) }}. {{ question.D }}.
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
                  <span
                    data-totaltime="50.0"
                    data-timeleft-value="48.766666666666666"
                    id="timeleft"
                    class="timeleft"
                    >{{ formatTime }}</span
                  >
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
                      <span class="test-questions-listitem" v-if="question.checked" id="selected">
                        {{ index + 1 }}
                      </span>
                      <span class="test-questions-listitem" v-else> {{ index + 1 }} </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <button
      class="btn btn-danger"
      @click="
        () => {
          console.log(this.questions.length - this.answers.length)
        }
      "
    >
      click
    </button>
  </div>
</template>
<script>
import ModalView from '@/components/ModalView.vue'
import { getExamDetail, getQuestionExam } from '@/service/examsService'
import { createResult } from '@/service/resultServeice'
import { decodeTokenStudent } from '@/service/decodeToken'
import { useRoute } from 'vue-router'
// import Cookies from 'js-cookie'
export default {
  name: 'ExamView',
  components: {
    ModalView
  },
  data() {
    return {
      // time count donwn of exam
      countdown: 0,
      timer: null,
      showModal: false,
      showModal2: false,
      questions: [],
      answers: [],
      numberAnswer: ['', '', '', ''],
      data: [],
      answerSelected: [],
      id: 0,
      score: 0,
      scoreQuestion: 0,
      blank_question: 0,
      correct_question: 0,
      incorrect_question: 0
    }
  },
  async created() {
    const route = useRoute()
    const id = route.params.id
    this.id = id
    const result = await getExamDetail(id)
    if (result) {
      this.data = result['data']
      this.countdown = result['data'].duration
      this.scoreQuestion = 10 / result['data'].totalQuestion
    }

    const question = await getQuestionExam(id)
    if (question) {
      this.questions = question['data']
    }
  },
  computed: {
    formatTime() {
      const minutes = Math.floor(this.countdown / 60)
      const seconds = this.countdown % 60
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }
  },
  mounted() {
    this.startCountDown()
  },
  methods: {
    startCountDown() {
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--
        } else {
          this.stopCountdown()
          alert("Time's up!")
        }
      }, 1000)
    },
    stopCountdown() {
      clearInterval(this.timer)
      this.timer = null
    },
    beforeDestroy() {
      this.stopCountdown()
    },
    toggleModal() {
      this.showModal = !this.showModal
    },
    toggleModal2() {
      this.showModal2 = !this.showModal2
    },
    ToggleSelected(quesIndex, ans) {
      this.questions[quesIndex].checked = true
      const existingAnswerIndex = this.answers.findIndex(
        (answer) => answer.id === this.questions[quesIndex].id
      )

      if (existingAnswerIndex !== -1) {
        // Nếu đã tồn tại, cập nhật câu trả lời
        this.answers[existingAnswerIndex].answer = ans
      } else {
        // Nếu chưa tồn tại, thêm mới câu trả lời
        this.answers.push({
          id: this.questions[quesIndex].id,
          answer: ans
        })
      }
    },
    getLable(index) {
      const labels = ['A', 'B', 'C', 'D']
      return labels[index]
    },
    HighlightQuestion(index) {
      this.questions[index].highlighted = !this.questions[index].highlighted
    },
    async handleSubmit() {
      this.answers.forEach((userAnswer) => {
        const question = this.questions.find((q) => q.id === userAnswer.id) // Tìm câu hỏi tương ứng
        if (question && question.correctAns === userAnswer.answer) {
          this.score += this.scoreQuestion
          this.correct_question += 1
        }
      })      
      const user = decodeTokenStudent()
      const result = await createResult({
        id_user: user.data.id,
        id_exam: parseInt(this.id),
        score: this.score,
        duration: this.countdown,
        blank_question: this.questions.length - this.answers.length,
        correct_question: this.correct_question,
        incorrect_question: this.questions.length - this.blank_question - this.correct_question,
        answers: this.answers
      })
      // console.log({
      //   id_user: "1",
      //   id_exam: parseInt(this.id),
      //   score: this.score,
      //   duration: this.countdown,
      //   blank_question: this.questions.length - this.answers.length,
      //   correct_question: this.correct_question,
      //   incorrect_question: this.questions.length - this.blank_question - this.correct_question,
      //   answers:this.answers
      // });
      if (result) {
        this.stopCountdown()
        // console.log(result)
        this.$router.replace({ name: 'detailResultExam', params: { id: result.id } })
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
}

.hightlightQuestion {
  background-color: yellow;
}
</style>
