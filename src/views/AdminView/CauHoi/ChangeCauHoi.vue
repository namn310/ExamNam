<template>
  <div class="mx-auto container bg-color-white">
    <div class="text-[50px] text-500 text-center">Cập nhật câu hỏi</div>
    <form class="mb-5" @submit.prevent>
      <div class="class">
        <label for="class" class="form-label"> Lớp </label>
        <input v-model="question.class" id="class" type="text" class="form-control" />
      </div>

      <div class="Subject">
        <label for="subject" class="form-label"> Môn học </label>
        <input v-model="question.Subject" id="subject" type="text" class="form-control" />
      </div>

      <div class="Subject">
        <label for="subject" class="form-label"> Đề bài </label>
        <Ckeditor :editor="editor" v-model="question.title"  />
        <!-- <textarea
          style="width: 100%; border: 1px solid black; height: 20vh"
          v-model="question.title"
        ></textarea> -->
      </div>

      <div class="answer mb-2 mt-3">
        Đáp án
        <div>
          <span
            >A:<input class="form-control" v-model="question.A" type="text" id="answerA"
          /></span>
        </div>
        <div>
          <span
            >B:<input class="form-control" v-model="question.B" type="text" id="answerB"
          /></span>
        </div>
        <div>
          <span
            >C:<input class="form-control" v-model="question.C" type="text" id="answerC"
          /></span>
        </div>
        <div>
          <span
            >D:<input class="form-control" v-model="question.D" type="text" id="answerD"
          /></span>
        </div>
      </div>

      <div class="correctAnswer">
        <label for="correctAnswer">Đáp án câu hỏi</label>
        <input type="text" id="correctAnswer" class="form-control" v-model="question.correctAns" />
      </div>

      <div class="mt-3">
        <button type="submit" class="btn btn-primary" @click="UpdateQuestion">Cập nhật</button>
      </div>
      <!-- <p>{{ new }}</p> -->
    </form>
  </div>
</template>
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-unused-vars -->
<script>
import { PutData, GetDetail } from '@/service/questionsService'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Ckeditor } from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { ElNotification } from 'element-plus'
export default {
  components: {
    Ckeditor
  },
  computed: {
    idques() {
      return this.$route.params.id
    }
  },
  data() {
    return {
      editor: ClassicEditor,
      question: []
    }
  },
  created() {
    this.getDetailQues()
  },
  methods: {
    async getDetailQues() {
      try {
        const questionDetail = await GetDetail(this.idques)
        if (!questionDetail) {
          alert('Có lỗi trong quá trình lấy dữ liệu')
        }
        this.question = questionDetail.data
        console.log(this.question)
      } catch (Error) {
        alert(Error)
      }
    },
    async UpdateQuestion() {
      try {
        const ques = await PutData(this.idques, this.question)
        console.log(ques)
        if (!ques)
        {
          ElNotification({
            title: 'Error',
            message: 'Cập nhật câu hỏi thất bại !',
            type:'error'
          })
        }
        ElNotification({
          title: 'Success',
          message: 'Cập nhật câu hỏi thành công !',
          type:'success'
        })
      } catch (Error) {
        console.log(Error)
      }
    }
  }
}
// const data = ref({ permissions: [] });
//   const sizeForm = reactive({
//     title: '',
//     description: '',
//     time: '',
//     oldPrice : '',
//   })
</script>
<style>
.ck-editor__editable_inline {
  min-height: 200px; /* Set the minimum height for the editor */
}
</style>
