<template>
  <div class="content-wrapper p-4 mb-4">
    <div class="xl-container">
      <h1 class="h4 text-center mb-4">
        {{ data.title }}
        <button class="btn btn-warning btn-sm" @click="toggleModal2">Thoát</button>
        <ModalView :visible="showModal2" @close="toggleModal2">
          <template v-slot:modal-body>
            <p>Nếu thoát thì kết quả bài thi sẽ không được ghi lại. Bạn có chắc chắn muốn rời khỏi bài làm ?</p>
          </template>
          <template v-slot:buttonConfirm>
              <RouterLink :to=" { name: 'testDetail', params: { id: 1 } } "><button class="ms-3 btn btn-primary">Xác
                        nhận</button></RouterLink>
          </template>
        </ModalView>
      </h1>
      <hr/>
      <form class="test-form mt-2" autocomplete="off" @submit.prevent enctype="multipart/form-data">
        <input name="csrfmiddlewaretoken" type="hidden"
          value="QawFgl6s0hsbP0zO5BJpzCkoE1f1OGGd0aYfkaOvDLJdGIp7LI3jaqCVVVT1HFA9" />

        <button type="submit" disabled="" style="display: none" aria-hidden="true"></button>
        <input type="hidden" name="uid" value="da7207cb-bd08-426b-a520-854bb4b631e9" />
        <input type="hidden" name="start_time" value="1724755098.855" />
        <input type="hidden" name="end_time" value="0" />
        <input type="hidden" name="time_limit" value="50.0" />
        <input type="hidden" name="timeleft_value" value="0" />

        <div class="test-wrapper d-flex">
          <div class="test-content contentblock" id="test-content" style="width: 80%">
            <div class="context-wrapper"></div>
            <div class="tab-content" id="pills-tabContent">
              <div class="tab-pane active show" id="partcontent-9022" role="tabpanel" aria-labelledby="pills-tab">
                <div class="context-wrapper"></div>

                <div class="test-questions-wrapper" v-for="( question, index) in questions" :key=" index ">

                  <div class="question-wrapper" data-qid="144565" id="question-wrapper-144565">
                    <div  class="question-number text-center hightlightQuestion" v-if=" question.highlighted " @dblclick="HighlightQuestion( index )"
                       data-qid="144565" style="width:30px;height:30px;border:1px solid black;border-radius:5px;cursor: pointer;">
                      <strong
                        style="width:100%;height:100%;border-radius:5px;cursor: pointer">{{
                          index + 1
                        }}</strong>
                    </div>
                    <!--  -->
                      <div @dblclick="HighlightQuestion( index )" class="question-number text-center" v-else data-qid="144565" style="width:30px;height:30px;border:1px solid black;border-radius:5px;cursor: pointer;">
                      <strong
                       style="width:100%;height:100%;border-radius:5px;cursor: pointer">{{
                          index + 1
                        }}</strong>
                    </div>

                    <div class="question-content text-highlightable">
                      <div class="question-text">
                        <div class="boldIntro"></div>
                        <p>
                          {{ question.title }}
                        </p>
                      </div>

                      <div class="question-answers" v-for="(   ANSWER, index2) in question.answers" :key=" index2 ">
                        <div class="form-check">
                          <input @click="ToggleSelected( index )" data-type="question-answer" class="form-check-input"
                            :data-qid=" 'question-' + index + ANSWER " type="radio"
                            :name=" 'question-' + index + ANSWER " :id=" 'question-' + index + ANSWER "
                            :value=" getLable( index2 ) " v-model=" answerSelected[index] " />
                          <label class="form-check-label" :for=" 'question-' + index + ANSWER ">{{ getLable( index2 )
                            }}.
                            {{ ANSWER }}. </label>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div class="test-navigation" id="test-navigation"
            style="width: 20%;border-left:1px solid black;padding-left:10px">
            <div class="test-navigation__inner" id="test-navigation__inner">
              <div>
                <div class="timeleft-wrapper mb-2">
                  Thời gian còn lại:
                  <span data-totaltime="50.0" data-timeleft-value="48.766666666666666" id="timeleft"
                    class="timeleft">{{formatTime }}</span>
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
                    <RouterLink :to=" { name: 'home' } "><button class="ms-3 btn btn-primary">Xác
                        nhận</button></RouterLink>

                  </template>
                </ModalView>
                <div class="test-questions-list">
                  <div class="test-questions-list-part d-flex flex-wrap">
                    <div class="test-questions-list-wrapper" v-for="(   question, index) in questions" :key=" index ">
                      <span class="test-questions-listitem" v-if=" question.checked " id="selected"> {{ index + 1 }}
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
  </div>
</template>
<script>
import ModalView from '@/components/ModalView.vue'
import { getExamDetail, getQuestionExam } from '@/service/examsService';
import { useRoute } from 'vue-router';
export default {
  name: 'ExamView',
  components: {
    ModalView
  },
  data () {
    return {
      // time count donwn of exam
      countdown: 0,
      timer:null,
      showModal: false,
      showModal2:false,
      questions: [
        {
          title: 'Crom(III) oxit có công thức hóa học là',
          answers: ['X', 'CrO3.', 'CrO', 'Cr2O3'],
          checked: false,
          highlighted: false,
        },
        {
          title: 'Chất X có công thức cấu tạo CH3CH2COOCH3. Tên gọi của X là',
          answers: ['metyl axetat.', 'etyl axetat.', 'metyl propionat.', 'propyl fomat.'],
          checked: false,
          highlighted: false,

        },
        {
          title: 'Chất nào sau đây có tính lưỡng tính?',
          answers: ['NaAlO2', 'Al(NO3)3', 'AlCl3.', 'Al(OH)3.'],
          checked: false,
          highlighted: false,

        },
        {
          title: 'Chất nào sau đây không có phản ứng thủy phân?',
          answers: ['Xenlulozơ.', 'Saccarozơ.', 'Glucozơ.', 'Etyl axetat.'],
          checked: false,
          highlighted: false,

        },
         {
          title: 'Chất nào sau đây không có phản ứng thủy phân?',
          answers: ['Xenlulozơ.', 'Saccarozơ.', 'Glucozơ.', 'Etyl axetat.'],
          checked: false,
          highlighted: false,

        },
         {
          title: 'Chất nào sau đây không có phản ứng thủy phân?',
          answers: ['Xenlulozơ.', 'Saccarozơ.', 'Glucozơ.', 'Etyl axetat.'],
          checked: false,
          highlighted: false,

        },
         {
          title: 'Chất nào sau đây không có phản ứng thủy phân?',
          answers: ['Xenlulozơ.', 'Saccarozơ.', 'Glucozơ.', 'Etyl axetat.'],
          checked: false,
          highlighted: false,

        },
         {
          title: 'Chất nào sau đây không có phản ứng thủy phân?',
          answers: ['Xenlulozơ.', 'Saccarozơ.', 'Glucozơ.', 'Etyl axetat.'],
          checked: false,
          highlighted: false,

        },
         {
          title: 'Chất nào sau đây không có phản ứng thủy phân?',
          answers: ['Xenlulozơ.', 'Saccarozơ.', 'Glucozơ.', 'Etyl axetat.'],
          checked: false,
          highlighted: false,

        },
         {
          title: 'Chất nào sau đây không có phản ứng thủy phân?',
          answers: ['Xenlulozơ.', 'Saccarozơ.', 'Glucozơ.', 'Etyl axetat.'],
          checked: false,
          highlighted: false,

        },
         {
          title: 'Chất nào sau đây không có phản ứng thủy phân?',
          answers: ['Xenlulozơ.', 'Saccarozơ.', 'Glucozơ.', 'Etyl axetat.'],
          checked: false,
          highlighted: false,

        },
         {
          title: 'Chất nào sau đây không có phản ứng thủy phân?',
          answers: ['Xenlulozơ.', 'Saccarozơ.', 'Glucozơ.', 'Etyl axetat.'],
          checked: false,
          highlighted: false,

        },
         {
          title: 'Chất nào sau đây không có phản ứng thủy phân?',
          answers: ['Xenlulozơ.', 'Saccarozơ.', 'Glucozơ.', 'Etyl axetat.'],
          checked: false,
          highlighted: false,

        },
         {
          title: 'Chất nào sau đây không có phản ứng thủy phân?',
          answers: ['Xenlulozơ.', 'Saccarozơ.', 'Glucozơ.', 'Etyl axetat.'],
          checked: false,
          highlighted: false,

        },
      ],
      data : [],
      answerSelected: [],
    }
  },
  async created() {
      const route = useRoute();
      const id = route.params.id;
      const result = await getExamDetail(id);
      if(result){
          this.data = result['data']
          this.countdown = result['data'].duration
      }

      const question = await getQuestionExam(id)
      if(question){
        console.log(question['data']);
        
      }

  },
  computed: {
    formatTime () {
      const minutes = Math.floor(this.countdown / 60);
      const seconds = this.countdown % 60;
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  },
  mounted() {
    this.startCountDown();
  },
  methods: {
    startCountDown(){
       this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          this.stopCountdown();
          alert("Time's up!");
        }
      }, 1000);
    },
    stopCountdown () {
      clearInterval(this.timer);
      this.timer = null;
    },
    beforeDestroy() {
      this.stopCountdown();
    },
    toggleModal () {
      this.showModal = !this.showModal
    },
    toggleModal2 () {
      this.showModal2=!this.showModal2
    },
    ToggleSelected (quesIndex) {
      // this.questions[quesIndex].checked;
      this.questions[quesIndex].checked = true;
      console.log(this.questions[quesIndex]);
    },
    getLable (index) {
      const labels = ['A', 'B', 'C', 'D'];
      return labels[index];
    },
    HighlightQuestion (index) {
      this.questions[index].highlighted = !this.questions[index].highlighted
    }

  }

}
</script>
<style scoped>
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
