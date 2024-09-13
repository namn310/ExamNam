<template>
  <div class="content-wrapper p-5 mb-4">
    <div class="xl-container">
      <h1 class="h4 text-center mb-4" style="font-size: 3vw; font-size: 3vh; font-weight: 500">
        {{ this.titleExam }}
        <RouterLink :to="{ name: 'ResultExam' }"
          ><button class="ms-3 btn btn-primary">Thoát</button>
        </RouterLink>
      </h1>
      <hr />
      <form class="test-form" autocomplete="off" @submit.prevent enctype="multipart/form-data">
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
                  class="test-questions-wrapper"
                  v-for="(question, index) in questions"
                  :key="index"
                >
                  <div class="question-wrapper" data-qid="144565" id="question-wrapper-144565">
                    <div class="d-flex">
                      <div
                        class="question-number d-flex justify-content-center text-center"
                        data-qid="144565"
                        style="
                          width: 30px;
                          height: 30px;
                          border: 1px solid black;
                          border-radius: 5px;
                          cursor: pointer;
                        "
                      >
                        <p
                          style="
                            width: 100%;
                            height: 100%;
                            border: 1px solid black;
                            border-radius: 5px;
                            cursor: pointer;
                          "
                        >
                          {{ index + 1 }}
                        </p>
                      </div>

                      <!-- <div class="question-content text-highlightable">
                      <div class="question-text">
                        <div class="boldIntro"></div>
                        <p v-html="question.title"></p>
                      </div>

                      <div
                        class="question-answers"
                        v-for="(ANSWER, index2) in question.answers"
                        :key="index2"
                      >
                        <div
                          class="form-check"
                          v-if="
                            getLable(index2) !== question.correctAnswe &&
                            getLable(index2) == question.answerSelect
                          "
                        >
                          <input
                            data-type="question-answer"
                            class="form-check-input"
                            :data-qid="'question-' + index + ANSWER"
                            type="radio"
                            :name="'question-' + index + ANSWER"
                            :id="'question-' + index + ANSWER"
                            :value="getLable(index2)"
                            v-model="question.answerSelect"
                          />
                          <label
                            class="form-check-label text-danger"
                            :for="'question-' + index + ANSWER"
                            >{{ getLable(index2) }}. {{ ANSWER }}.
                          </label>
                        </div>
                        <div
                          class="form-check"
                          v-else-if="
                            getLable(index2) == question.correctAnswe &&
                            getLable(index2) == question.answerSelect
                          "
                        >
                          <input
                            data-type="question-answer"
                            class="form-check-input"
                            :data-qid="'question-' + index + ANSWER"
                            type="radio"
                            :name="'question-' + index + ANSWER"
                            :id="'question-' + index + ANSWER"
                            :value="getLable(index2)"
                            v-model="question.answerSelect"
                          />
                          <label
                            class="form-check-label text-success"
                            :for="'question-' + index + ANSWER"
                            >{{ getLable(index2) }}. {{ ANSWER }}.
                          </label>
                        </div>
                        <div
                          class="form-check"
                          v-else-if="
                            getLable(index2) == question.correctAnswe &&
                            getLable(index2) !== question.answerSelect
                          "
                        >
                          <input
                            data-type="question-answer"
                            class="form-check-input"
                            :data-qid="'question-' + index + ANSWER"
                            type="radio"
                            :name="'question-' + index + ANSWER"
                            :id="'question-' + index + ANSWER"
                            :value="getLable(index2)"
                            v-model="question.answerSelect"
                          />
                          <label
                            class="form-check-label text-success"
                            :for="'question-' + index + ANSWER"
                            >{{ getLable(index2) }}. {{ ANSWER }}.
                          </label>
                        </div>
                        <div class="form-check" v-else>
                          <input
                            data-type="question-answer"
                            class="form-check-input"
                            :data-qid="'question-' + index + ANSWER"
                            type="radio"
                            :name="'question-' + index + ANSWER"
                            :id="'question-' + index + ANSWER"
                            :value="getLable(index2)"
                            v-model="question.answerSelect"
                          />
                          <label class="form-check-label" :for="'question-' + index + ANSWER"
                            >{{ getLable(index2) }}. {{ ANSWER }}.
                          </label>
                        </div>
                      </div>
                    </div> -->

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
                            :checked="answerSelected[index] === getLable(0)"
                          />
                          <label
                            :class="{
                              'text-danger':
                                answerSelected[index] === getLable(0) &&
                                answerSelected[index] !== correctAnswer[index],
                              'text-success': correctAnswer[index] === getLable(0)
                            }"
                            class="form-check-label"
                            :for="'question-' + index + 'A'"
                          >
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
                            :checked="answerSelected[index] === getLable(1)"
                          />
                          <label
                            :class="{
                              'text-danger':
                                answerSelected[index] === getLable(1) &&
                                answerSelected[index] !== correctAnswer[index],
                              'text-success': correctAnswer[index] === getLable(1)
                            }"
                            class="form-check-label"
                            :for="'question-' + index + 'B'"
                          >
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
                            :checked="answerSelected[index] === getLable(2)"
                          />
                          <label
                            :class="{
                              'text-danger':
                                answerSelected[index] === getLable(2) &&
                                answerSelected[index] !== correctAnswer[index],
                              'text-success': correctAnswer[index] === getLable(2)
                            }"
                            class="form-check-label"
                            :for="'question-' + index + 'C'"
                          >
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
                            :checked="answerSelected[index] === getLable(3)"
                          />
                          <label
                            :class="{
                              'text-success':
                                answerSelected[index] === getLable(3) &&
                                answerSelected[index] !== correctAnswer[index],
                              'text-success': correctAnswer[index] === getLable(3)
                            }"
                            class="form-check-label"
                            :for="'question-' + index + 'D'"
                          >
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
            <div class="test-navigation__inner mb-3" id="test-navigation__inner">
              <strong class="mb-3">Đáp án</strong>
              <div>
                <div class="test-questions-list mt-3">
                  <div class="test-questions-list-part d-flex flex-wrap">
                    <div
                      class="test-questions-list-wrapper"
                      v-for="(question, index) in questions"
                      :key="index"
                    >
                      <div v-if="checkAnswer(index) == true">
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
  data() {
    return {
      id: this.$route.params.id,
      showModal: false,
      showModal2: false,
      questions: [],
      answers: [],
      numberAnswer: ['', '', '', ''],
      // answerSelected: [],
      answerSelected: [],
      correctAnswer: [],
      UserAnswer: [],
      titleExam: ''
    }
  },
  created() {
    this.getExam()
    // this.getAnswerUser()
  },
  methods: {
    async getExam() {
      const result1 = await getResultDetail(this.id)
      if (result1) {
        const idExam = result1.data.id_exam
        const idResult = this.$route.params.id
        {
          const result = await getQuestionExam(idExam)
          const result2 = await getReviewResult(idResult)
          const result3 = await getExamDetail(idExam)
          if (result) {
            this.questions = result.data
            console.log(result.data)
          }
          if (result2) {
            this.UserAnswer = result2.data
            console.log(this.UserAnswer)
          }
          if (result3) {
            this.titleExam = result3.data.title
            console.log(result3.data.title)
          }
          // lấy danh sách đáp án mà người dùng đã làm
          this.UserAnswer.forEach((e) => {
            this.answerSelected.push(e.answer)
          })
          console.log(this.answerSelected)
          // lấy danh sách đáp án đúng
          this.questions.forEach((e) => {
            this.correctAnswer.push(e.correctAns)
          })
          console.log(this.correctAnswer)
        }
      }
    },
    toggleModal() {
      this.showModal = !this.showModal
    },
    toggleModal2() {
      this.showModal2 = !this.showModal2
    },

    getLable(index) {
      const labels = ['A', 'B', 'C', 'D']
      return labels[index]
    },
    checkAnswer(index) {
      if (this.answerSelected[index] !== this.correctAnswer[index]) {
        return false
      } else return true
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
</style>
