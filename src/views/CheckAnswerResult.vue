<template>
    <div class="content-wrapper p-5 mb-4">
        <div class="xl-container">
            <h1 class="h4 text-center mb-4">
                Đề thi Toán Trung học phổ thông quốc gia 2023
                    <RouterLink :to=" { name: 'ResultExam' } "><button
                                class="ms-3 btn btn-primary">Thoát</button></RouterLink>
            </h1>
            <hr />
            <form class="test-form" autocomplete="off" @submit.prevent enctype="multipart/form-data">
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
                            <div class="tab-pane active show" id="partcontent-9022" role="tabpanel"
                                aria-labelledby="pills-tab">
                                <div class="context-wrapper"></div>

                                <div class="test-questions-wrapper" v-for="(question, index) in questions"
                                    :key=" index ">

                                    <div class="question-wrapper" data-qid="144565" id="question-wrapper-144565">
                                        <div class="question-number d-flex justify-content-center text-center" data-qid="144565" style="width:30px;height:30px;border:1px solid black;border-radius:5px;cursor: pointer;">
                                            <p style="width:100%;height:100%;border:1px solid black;border-radius:5px;cursor: pointer"
                                                >{{
                                                    index + 1 }}</p>
                                        </div>
                                        <div class="question-content text-highlightable">
                                            <div class="question-text">
                                                <div class="boldIntro"></div>
                                                <p>
                                                    {{ question.title }}
                                                </p>
                                            </div>

                                            <div class="question-answers"
                                                v-for="( ANSWER, index2) in question.answers" :key=" index2">
                                                <div class="form-check" v-if="getLable(index2)!==question.correctAnswe && getLable(index2) ==question.answerSelect">
                                                    <input data-type="question-answer"
                                                        class="form-check-input"
                                                        :data-qid=" 'question-' + index + ANSWER " type="radio"
                                                        :name=" 'question-' + index + ANSWER "
                                                        :id=" 'question-' + index + ANSWER "
                                                        :value=" getLable( index2 ) "
                                                        v-model=" question.answerSelect " />
                                                    <label class="form-check-label text-danger"
                                                        :for=" 'question-' + index + ANSWER ">{{
                                                        getLable( index2 )
                                                        }}.
                                                        {{ ANSWER }}. </label>
                                                </div>
                                                 <div class="form-check" v-else-if="getLable(index2)==question.correctAnswe && getLable(index2) ==question.answerSelect">
                                                    <input data-type="question-answer"
                                                        class="form-check-input"
                                                        :data-qid=" 'question-' + index + ANSWER " type="radio"
                                                        :name=" 'question-' + index + ANSWER "
                                                        :id=" 'question-' + index + ANSWER "
                                                        :value=" getLable( index2 ) "
                                                        v-model=" question.answerSelect " />
                                                    <label class="form-check-label text-success"
                                                        :for=" 'question-' + index + ANSWER ">{{
                                                        getLable( index2 )
                                                        }}.
                                                        {{ ANSWER }}. </label>
                                                </div>
                                                 <div class="form-check" v-else-if="getLable(index2)==question.correctAnswe && getLable(index2) !==question.answerSelect">
                                                    <input data-type="question-answer"
                                                        class="form-check-input"
                                                        :data-qid=" 'question-' + index + ANSWER " type="radio"
                                                        :name=" 'question-' + index + ANSWER "
                                                        :id=" 'question-' + index + ANSWER "
                                                        :value=" getLable( index2 ) "
                                                        v-model=" question.answerSelect " />
                                                    <label class="form-check-label text-success"
                                                        :for=" 'question-' + index + ANSWER ">{{
                                                        getLable( index2 )
                                                        }}.
                                                        {{ ANSWER }}. </label>
                                                </div>
                                                 <div class="form-check" v-else>
                                                    <input data-type="question-answer"
                                                        class="form-check-input"
                                                        :data-qid=" 'question-' + index + ANSWER " type="radio"
                                                        :name=" 'question-' + index + ANSWER "
                                                        :id=" 'question-' + index + ANSWER "
                                                        :value=" getLable( index2 ) "
                                                        v-model=" question.answerSelect " />
                                                    <label class="form-check-label"
                                                        :for=" 'question-' + index + ANSWER ">{{
                                                        getLable( index2 )
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
                        <div class="test-navigation__inner mb-3" id="test-navigation__inner">
                            <strong class="mb-3">Đáp án</strong>
                            <div>
                                <div class="test-questions-list mt-3">
                                    <div class="test-questions-list-part d-flex flex-wrap">
                                        <div class="test-questions-list-wrapper" v-for="( question, index) in questions"
                                            :key=" index ">
                                            <div v-if="checkAnswer(index)==true">
                                                <p class="test-questions-listitem" id="correctAnswer"> {{ index + 1 }}
                                                </p>
                                            </div>
                                            <div v-else>
                                                <p class="test-questions-listitem" id="incorrectAnswer"> {{ index + 1 }} </p>
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
export default {
    name: 'ExamView',
    components: {
        // ModalView
    },
    data () {
        return {
            showModal: false,
            showModal2: false,
            questions: [
                {
                    title: 'Crom(III) oxit có công thức hóa học là',
                    answers: ['X', 'CrO3', 'CrO', 'Cr2O3'],
                    correctAnswe: 'A',
                    answerSelect: 'A'
                },
                {
                    title: 'Chất X có công thức cấu tạo CH3CH2COOCH3. Tên gọi của X là',
                    answers: ['metyl axetat.', 'etyl axetat.', 'metyl propionat.', 'propyl fomat.'],
                    correctAnswe: 'A',
                    answerSelect: 'B'
                },
                {
                    title: 'Chất nào sau đây có tính lưỡng tính?',
                    answers: ['NaAlO2', 'Al(NO3)3', 'AlCl3.', 'Al(OH)3.'],
                    correctAnswe: 'A',
                    answerSelect: 'B'
                },
                {
                    title: 'Chất nào sau đây không có phản ứng thủy phân?',
                    answers: ['Xenlulozơ.', 'Saccarozơ.', 'Glucozơ.', 'Etyl axetat.'],
                    correctAnswe: 'A',
                    answerSelect: 'B'
                },
            ],
            // answerSelected: [],
        }
    },
    methods: {
        toggleModal () {
            this.showModal = !this.showModal
        },
        toggleModal2 () {
            this.showModal2 = !this.showModal2
        },

        getLable (index) {
            const labels = ['A', 'B', 'C', 'D'];
            return labels[index];
        },
        checkAnswer (index) {
            if (this.questions[index].answerSelect !== this.questions[index].correctAnswe)
            {
                return false;
            }
            else return true;
        },
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
    background-color: yellow;
}

.hightlightQuestion {
    background-color: yellow;
}
.correctAnswer{
    /* background-color: green; */
    color:green
}
.incorrectAnswer{
    /* background-color: red; */
    color:red
}
#correctAnswer{
    background-color: green;
    color:white
}
#incorrectAnswer{
    background-color: red;
    color:white
}
</style>
