<template>
  <div class="content-wrapper p-4 mb-4">
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
      <h1 class="h4 text-center mb-4">
        {{ data && data.title ? data.title : "N/A" }}
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
      <div class="alert alert-warning mt-2" role="alert">
        Các đề thi có công thức toán học sẽ mất một chút thời gian gian nhỏ để load các công thức toán học !
      </div>
      <hr />
      <form class="test-form mt-2" autocomplete="off" @submit.prevent enctype="multipart/form-data">
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
                      <div class="question-text ms-2 mb-2" :id=" 'question_' + index ">
                        <strong v-html=" question.title " style="display: inline-block"></strong>
                        <div v-if=" question.imageUrl ">
                          <img :src=" question.imageUrl " class="img-fluid" style="width: 35%; height: 35%" />
                        </div>
                      </div>
                    </div>

                    <div class="question-content text-highlightable">
                      <div class="question-answers mt-3">
                        <!-- Câu trả lời -->
                        <div class="form-check" v-for="(  ans, index2) in question.answerlist" :key=" index2 ">
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
                    <div class="test-questions-list-wrapper" v-for="(  question, index) in questions" :key=" index ">
                      <span @click="scrollToQuesstion( index )" class="test-questions-listitem"
                        v-if=" !question.Answer || Object.keys( question.Answer[0] ).length < 1 ">
                        {{ index + 1 }}
                      </span>
                      <span @click="scrollToQuesstion( index )" class="test-questions-listitem" v-else id="selected">
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
import { getExamDetail, getQuestionToDoExam } from '@/service/examsService'
import { createResult } from '@/service/resultServeice'
import { decodeTokenStudent } from '@/service/decodeToken'
import { useRoute } from 'vue-router'
import { getImageAnswer } from '@/service/questionsService'
// eslint-disable-next-line no-unused-vars
import CryptoJS from 'crypto-js';
// import CheckAnswerResult from './CheckAnswerResult.vue'
// import Cookies from 'js-cookie'
export default {
  name: 'ExamView',
  components: {
    ModalView
  },
  data () {
    return {
      loadingShow: true,
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
      totalQuestion: 0,
      blank_question: null,
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
    const question = await getQuestionToDoExam(id)
    if (result && question)
    {
      // console.log(result)
      this.data = result['result']
      this.durationExam = result['result'].duration
      this.startCountDown()
      this.totalQuestion = result['result'].totalQuestion
    }
    this.questions = question.data

    // eslint-disable-next-line no-unused-vars
    for (const [index, e] of this.questions.entries())
    {
      e.answerlist = JSON.parse(e.answerlist)
      // e.correctAns = JSON.parse(e.correctAns)
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
      // this.renderMath()
      this.renderMath()
      // console.log(this.questions)
      this.loadingShow = false
    }
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

    scrollToQuesstion (index) {
      const element = document.getElementById(`question_${index - 1}`)
      if (element)
      {
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
      console.log('Load lại trang thời gian vẫn giữ nguyên không bị refresh')
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
      // hiển thị hộp thông báo nộp bài
      this.questions.forEach((e) => {
        if (e.Answer)
        {
          // if (Object.keys(e.Answer[0]).length > 0)
          // {
          //   if (this.CheckAnswer(e.correctAns, Object.values(e.Answer[0])) === true)
          //   {
          //     // nếu hàm check answer true thì câu đúng cộng thêm 1
          //     this.correct_question += 1
          //   } else
          //   {
          //     // false thì câu này sai
          //     this.incorrect_question += 1
          //     e.idIncorrect={id:e.id,state:0}
          //   }
          // } else
          // {
          if (!Object.keys(e.Answer[0]).length > 0)
          {
            // nếu chưa chọn thì đây là câu bỏ trống
            this.blank_question += 1
            e.idIncorrect = { id: e.id, state: 0 }
          }
          // }
        } else
        {
          // nếu không tồn tại thuộc tính Answer trong mảng thì là câu bỏ trống
          this.blank_question += 1
          e.idIncorrect = { id: e.id, state: 0 }
        }
      })
      // console.log(this.blank_question, this.correct_question, this.incorrect_question)
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
      // tạo mảng danh sách câu trả lời của người dùng theo từng câu hỏi để gửi dữ liệu đi
      this.answers = []
      const questionCheck = []
      // duyệt mảng question để lấy dữ liệu câu trả lời người dùng rồi đổ vào mảng answers
      this.questions.forEach((e) => {
        // mảng dùng để thực hiện việc đối chiếu đáp án với đáp án đúng
        questionCheck.push({
          id: e.id,
          state: 0
        })
        // danh sách câu hỏi người dùng chọn 
        const ArrayAnswerToPush = [];
        if (e.Answer)
        {
          // kiểm tra nếu danh sách câu trả lời lớn hơn 0 
          if (Object.keys(e.Answer[0]).length > 0)
          {
            // dữ liệu answer được lưu ở dạng đối tượng
            // duyệt phần tử đầu tiên và thêm vào mảng ArrayAnswerToPush
            Object.values(e.Answer[0]).forEach(value => {
              ArrayAnswerToPush.push(value)
            })
            // thêm dữ liệu câu trả lời gồm id câu hỏi và danh sách câu trả lời mà người dùng chọn
            this.answers.push({
              id: e.id,
              answer: ArrayAnswerToPush
            })
            // const answersFromQuestion = Object.values(e.Answer[0]);

            // Object.values(e.Answer[0]).forEach((e1) => {

            //   // this.answers.forEach(e2 => {
            //   //   if (e2.id === e.id)
            //   //   {
            //   //     e2.answer.push(e1);
            //   //   }
            //   //     else
            //   // {
            //   //   this.answers.push({
            //   //     id: e.id,
            //   //     answer: e1
            //   //   })
            //   // }
            //   // })


            // })

          }
          // nếu độ dài câu trả lời là 0 thì thêm một mảng câu hỏi rỗng 
          else
          {
            this.answers.push({
              id: e.id,
              answer: ArrayAnswerToPush
            })
          }
        }
        // if (e.idIncorrect)
        // {
        //   questionIncorect.push({
        //     id: e.idIncorrect.id,
        //     state: e.idIncorrect.state
        //   })
        // }
      })
      console.log(this.questions, this.answers, questionCheck)
      this.score = this.scoreQuestion * this.correct_question
      const user = decodeTokenStudent()
      const result = await createResult({
        id_user: user.data.id,
        id_exam: parseInt(this.id),
        // score: this.score,
        duration: this.durationExam * 60 - this.countdown,
        blank_question: this.blank_question,
        // correct_question: this.correct_question,
        // incorrect_question: this.questions.length - this.blank_question - this.correct_question,
        listQuestionCheck: questionCheck,
        answers: this.answers,
        totalQuestion: this.totalQuestion,
      })
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
