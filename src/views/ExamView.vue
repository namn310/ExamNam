<template>
  <div class="content-wrapper p-4 mb-4">
    <div class="xl-container">
      <h1 class="h4 text-center mb-4">
        {{ data.title }}
        <button class="btn btn-warning btn-sm" @click=" toggleModal2 ">Thoát</button>
        <ModalView :visible=" showModal2 " @close=" toggleModal2 ">
          <template v-slot:modal-body>
            <p>
              Nếu thoát thì kết quả bài thi sẽ không được ghi lại. Bạn có chắc chắn muốn rời khỏi
              bài làm ?
            </p>
          </template>
          <template v-slot:buttonConfirm>
            <RouterLink :to=" { name: 'testDetail', params: { id: 1 } } "><button class="ms-3 btn btn-primary">Xác
                nhận</button></RouterLink>
          </template>
        </ModalView>
      </h1>
      <hr />
      <form class="test-form mt-2" autocomplete="off" @submit.prevent enctype="multipart/form-data">
        <div class="test-wrapper d-flex">
          <div class="test-content contentblock" id="test-content" style="width: 80%">
            <div class="context-wrapper"></div>
            <div class="tab-content" id="pills-tabContent">
              <div class="tab-pane active show" id="partcontent-9022" role="tabpanel" aria-labelledby="pills-tab">
                <div class="context-wrapper"></div>
                <div class="test-questions-wrapper mb-4 me-2" v-for="( question, index) in questions" :key=" index ">
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
                      <div class="question-text ms-2 mb-2" :id="'question_' + index">
                        <strong v-html=" question.title " style="display: inline-block"></strong>
                        <div v-if=" question.imageUrl ">
                          <img :src=" question.imageUrl " class="img-fluid" style="width: 35%; height: 35%" />
                        </div>
                      </div>
                    </div>

                    <div class="question-content text-highlightable">
                      <div class="question-answers mt-3">
                        <!-- Câu trả lời -->
                        <div class="form-check" v-for="( ans, index2) in question.answerlist" :key=" index2 ">
                          <input @click="ToggleSelected( question.id, index2 )" data-type="question-answer"
                            class="form-check-input" type="checkbox" style="border: 1px solid black" />
                          <label id="output" class="form-label">
                            {{ getLable( index2 ) }}. {{ ans }}
                            <div>
                              <!-- Nếu có hình ảnh câu trả lời thì load nó ra -->
                              <div style="position: relative; width: 40%; height: 40%" v-if="
                                question.ListImageAnswerUrl &&
                                question.ListImageAnswerUrl.length > 0 &&
                                question.ListImageAnswerUrl[index2].imageUrl
                              ">
                                <img :src=" question.ListImageAnswerUrl[index2].imageUrl " class="img-fluid" />
                              </div>
                            </div>
                          </label>
                          <!-- <div>
                            <div style="position: relative; width: 30%; height: 30%" v-if="
                              question.ListImageAnswerUrl && question.ListImageAnswerUrl.length > 0 && question.ListImageAnswerUrl[index2].imageUrl
                            ">
                              <img :src=" question.ListImageAnswerUrl[index2].imageUrl " class="img-fluid" />
                            </div>
                          </div> -->
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
            <div class="test-navigation__inner" id="test-navigation__inner">
              <div>
                <div class="timeleft-wrapper mb-2">
                  Thời gian còn lại:
                  <span id="timeleft" class="timeleft">{{ formatTime }}</span>
                </div>
                <button class="btn btn-outline-primary btn-block mb-3 mt-3" @click=" toggleModal " id="submit-test"
                  type="submit">
                  NỘP BÀI
                </button>
                <ModalView :visible=" showModal " @close=" toggleModal ">
                  <template v-slot:modal-body>
                    <p>Xác nhận nộp bài ?</p>
                  </template>
                  <template v-slot:buttonConfirm>
                    <button @click=" handleSubmit " class="ms-3 btn btn-primary">Xác nhận</button>
                  </template>
                </ModalView>
                <div class="test-questions-list">
                  <div class="test-questions-list-part d-flex flex-wrap">
                    <div class="test-questions-list-wrapper" v-for="( question, index) in questions" :key=" index ">
                      <span @click="scrollToQuesstion(index)" class="test-questions-listitem"
                        v-if=" !question.Answer || Object.keys( question.Answer[0] ).length < 1 ">
                        {{ index + 1 }}
                      </span>
                      <span @click="scrollToQuesstion(index)" class="test-questions-listitem" v-else id="selected">
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
    <!-- <button class="btn btn-danger" @click="checkAnswerSelectLocalStorage( 0, 'A' )">click</button> -->
  </div>
</template>
<script>
import ModalView from '@/components/ModalView.vue'
import { getExamDetail, getQuestionExam } from '@/service/examsService'
import { createResult } from '@/service/resultServeice'
import { decodeTokenStudent } from '@/service/decodeToken'
import { useRoute } from 'vue-router'
import { getImageAnswer } from '@/service/questionsService'
// import CheckAnswerResult from './CheckAnswerResult.vue'
// import Cookies from 'js-cookie'
export default {
  name: 'ExamView',
  components: {
    ModalView
  },
  data () {
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
  // mounted () {
  //   this.renderMath()
  // },
  async created () {
    const route = useRoute()
    const id = route.params.id
    this.id = id
    const result = await getExamDetail(id)
    if (result)
    {
      this.data = result['data']
      this.durationExam = result['data'].duration
      this.startCountDown()
      this.scoreQuestion = 10 / result['data'].totalQuestion
    }
    const question = await getQuestionExam(id)
    if (question)
    {
      this.questions = question.data
      for (const [index, e] of this.questions.entries())
      {
        e.answerlist = JSON.parse(e.answerlist)
        e.correctAns = JSON.parse(e.correctAns)
        // lấy hình ảnh câu hỏi
        if (e.image !== null && e.image !== '')
        {
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
    // if (
    //   localStorage.getItem('dataQuestion') !== null ||
    //   localStorage.getItem('dataQuestion' !== undefined)
    // )
    // {
    //   this.questions = JSON.parse(localStorage.getItem('dataQuestion'))
    //   console.log(this.questions)

    // }
    this.renderMath()
  },
  mounted () {
    // Thêm sự kiện `beforeunload` khi component được mount
    window.addEventListener('beforeunload', this.BeforeUnload)
  },
  beforeRouteLeave (to, from, next) {
    if (this.countdown > 0)
    {
      const answer = window.confirm(
        'Thời gian làm bài vẫn còn. Bạn có chắc chắn muốn rời đi không?'
      )
      if (answer)
      {
        for (let i = localStorage.length - 1; i >= 0; i--)
        {
          const key = localStorage.key(i)
          if (key === 'timeExam')
          {
            localStorage.removeItem(key)
          }
          if (key === 'dataQuestion')
          {
            localStorage.removeItem(key)
          }
        }
        next() // Cho phép điều hướng
      } else
      {
        next(false) // Hủy điều hướng
      }
    } else
    {
      next() // Cho phép điều hướng nếu không còn thời gian
    }
  },
  beforeUnmount () {
    // Xóa sự kiện `beforeunload` khi component bị hủy
    window.removeEventListener('beforeunload', this.BeforeUnload)
  },
  computed: {
    formatTime () {
      const minutes = Math.floor(this.countdown / 60)
      const seconds = this.countdown % 60
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }
  },
  watch: {
    questions () {
      // Khi có sự thay đổi trong dữ liệu câu hỏi, gọi lại MathJax
      this.renderMath()
    }
  },
  methods: {
     scrollToQuesstion(index) {
      const element = document.getElementById(`question_${index-1}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    },
    // nếu có dữ liệu đáp án đã chọn từ localStorage thì load ra
    checkAnswerSelectLocalStorage (index, label) {
      // check xem questions.Answer laf array koong
      if (
        this.questions[index] &&
        Array.isArray(this.questions[index].Answer) &&
        this.questions[index].Answer[0]
      )
      {
        const answers = this.questions[index].Answer[0]
        const lengthAnswer = Object.keys(answers).length

        // Loop through answers and check if label matches
        if (lengthAnswer > 0)
        {
          for (var i = 0; i < lengthAnswer; i++)
          {
            if (answers[i] === label)
            {
              return true
            }
          }
        }
      }
      // Return false if questions[index] or Answer array is not valid
      return false
      // const lengthAnswer = Object.values(this.questions[index].Answer[0]).length
      // var a = ''
      // if (lengthAnswer > 0)
      // {
      //   for (var i = 0; i < lengthAnswer; i++)
      //   {
      //     if (this.questions[index].Answer[0][i] == label)
      //     {
      //       a = 1
      //     }
      //   }
      //   return a > 0 ? true : false
      // }
      // else
      // {
      //   return false
      // }
    },
    deleteLocal () {
      for (let i = localStorage.length - 1; i >= 0; i--)
      {
        const key = localStorage.key(i)
        if (key === 'dataQuestion')
        {
          localStorage.removeItem(key)
        }
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
    // hiện thông báo khi người dùng bấm refresh trang khi thời gian làm bài chưa kết thúc
    BeforeUnload (event) {
      localStorage.setItem('timeExam', this.countdown)
      localStorage.setItem('dataQuestion', JSON.stringify(this.questions))
      event.preventDefault()
      event.returnValue = ''
      console.log('nam')
    },
    startCountDown () {
      // localStorage.clear();
      // Nếu tồn tại thời gian từ localStorage, set giá trị từ localStorage
      const savedTime = localStorage.getItem('timeExam')
      if (savedTime)
      {
        this.countdown = parseInt(savedTime)
      } else
      {
        this.countdown = this.durationExam * 60
      }
      // Đếm ngược thời gian
      this.timer = setInterval(() => {
        if (this.countdown > 0)
        {
          this.countdown--
        } else
        {
          this.stopCountdown()
          alert("Time's up!")
          this.handleSubmit()
        }
      }, 1000)
    },
    stopCountdown () {
      clearInterval(this.timer)
      this.timer = null
    },
    toggleModal () {
      this.showModal = !this.showModal
    },
    toggleModal2 () {
      this.showModal2 = !this.showModal2
    },
    ToggleSelected (IdQues, answerIndex) {
      console.log(this.questions)
      // lấy câu hỏi theo idQues
      const questionItem = this.questions.find((ques) => ques.id === IdQues)
      if (questionItem)
      {
        // set true cho câu trả lời khi người dùng bấm chọn câu trả lời
        const newAns1 = { [answerIndex]: this.getLable(answerIndex) }
        // duyệt mảng questions
        this.questions.forEach((e) => {
          // lấy câu hỏi có id bằng idQues
          if (e.id === IdQues)
          {
            // nếu chưa tồn tại thuộc tính Answer thì thêm mới
            if (!e.Answer)
            {
              e['Answer'] = [newAns1]
            }
            // Nếu đã tồn tại rồi thì duyệt mảng Answer
            else
            {
              e.Answer.forEach((e1) => {
                if (!e1[answerIndex])
                {
                  // nếu chưa tồn tại câu trả lời vừa chọn trong mảng thì tạo
                  e1[answerIndex] = this.getLable(answerIndex)
                } else
                {
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
    getLable (index) {
      return String.fromCharCode(65 + index) // Từ mã ASCII để tạo A, B, C, D,...
    },
    // hightlight question khi người dùng double-click vào câu hỏi
    HighlightQuestion (index) {
      this.questions[index].highlighted = !this.questions[index].highlighted
    },
    // Làm danh sách câu trả lời người dùng đã chọn để làm so sánh đáp án
    ListAnswerSelected () {
      this.blank_question = 0
      this.correct_question = 0
      this.incorrect_question = 0
      // hiển thị hộp thông báo nộp bài
      this.questions.forEach((e) => {
        if (e.Answer)
        {
          if (Object.keys(e.Answer[0]).length > 0)
          {
            if (this.CheckAnswer(e.correctAns, Object.values(e.Answer[0])) === true)
            {
              // nếu hàm check answer true thì câu đúng cộng thêm 1
              this.correct_question += 1
            } else
            {
              // false thì câu này sai
              this.incorrect_question += 1
            }
          } else
          {
            // nếu chưa chọn thì đây là câu bỏ trống
            this.blank_question += 1
          }
        } else
        {
          // nếu không tồn tại thuộc tính Answer trong mảng thì là câu bỏ trống
          this.blank_question += 1
        }
      })
      console.log(this.blank_question, this.correct_question, this.incorrect_question)
    },
    // kiểm tra các câu đúng
    CheckAnswer (correctAns, answerSelected) {
      if (correctAns.length !== answerSelected.length)
      {
        return false
      } else
      {
        // hàm every duyệt qua từng phần tử của mảng correctAns và kiểm tra xem nó có tồn tại trong mảng answerSelected hay không. Nếu có thì trả về true không thì trả về false
        return correctAns.every((e) => answerSelected.includes(e))
      }
    },

    // Nộp bài kiểm tra
    async handleSubmit () {
      this.ListAnswerSelected()
      // set mảng answers
      this.answers = []
      // duyệt mảng question để lấy dữ liệu câu trả lời người dùng rồi đổ vào mảng answers
      this.questions.forEach((e) => {
        if (e.Answer)
        {
          if (Object.keys(e.Answer[0]).length > 0)
          {
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
      if (result)
      {
        this.stopCountdown()
        for (let i = localStorage.length - 1; i >= 0; i--)
        {
          const key = localStorage.key(i)
          if (key === 'timeExam')
          {
            localStorage.removeItem(key)
          }
        }
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
