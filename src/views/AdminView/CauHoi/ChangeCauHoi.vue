<template>
  <div class="mx-auto container bg-color-white">
    <div class="text-[50px] text-500 text-center">Cập nhật câu hỏi</div>
    <form class="mb-5" @submit.prevent enctype="multipart/form-data">
      <div class="class">
        <label for="class" class="form-label"> Lớp </label>
        <input v-model=" question.class " id="class" type="text" class="form-control" />
      </div>

      <div class="Subject">
        <label for="subject" class="form-label"> Môn học </label>
        <select v-model=" question.Subject " id="subject" class="form-select">
          <option selected>Lựa chọn môn học</option>
          <option :value=" choice['id'] " v-for="(  choice, index) in category" :key=" index ">{{ choice['title'] }}
          </option>
        </select>
      </div>

      <div class="Subject">
        <label for="subject" class="form-label"> Đề bài </label>
        <Ckeditor :editor=" editor " v-model=" question.title " />
      </div>
      <!-- hình ảnh đề bài (nếu có) -->
      <div class="Image mb-3">
        <label for="image" class="form-label"> Ảnh câu hỏi (nếu có) </label>
        <br />
        <input type="file" id="image" @change=" getImage " accept="image/*" class="form-control border border-secondary"
          ref="fileImage" />
      </div>

      <!-- hiển thị ảnh nếu người dùng tải lên -->
      <div v-if=" question.image !== '' && question.image !== null " style="border:1px solid black">
        <div style="width: 30%; height: 30%;position: relative"><img :src=" imgUrl "
            style="border: 1px solid black; border-radius: 5px" class="img-fluid" />
          <button class="btn btn-danger" style="position:absolute;top:0;right:0;padding:5px;margin:5px"
            @click=" removeImg ">X</button>
        </div>
      </div>
      <div v-for="(    ans, index) in answer" :key=" index " class="mt-3 mb-3">
        <span class="d-flex">{{ getLabel( index ) }}:
          <input class="form-control" v-model=" answer[index] " type="text" :id=" 'answer' + getLabel( index ) " />
          <span><button class="btn btn-danger ms-2" @click="removeAnswer( index )">-</button></span>
        </span>
      </div>
      <div>
        <button @click="AddAnswer()" class="btn btn-primary mb-3">Tạo thêm câu trả lời</button>
      </div>

      <div class="correctAnswer mt-4">
        <label for="correctAnswer">Chọn đáp án đúng:</label>
        <div v-for="(    ans, index) in answer" :key=" index " class="mt-2">
          <input type="checkbox" :value=" getLabel( index ) " v-model=" correctAns " />
          {{ getLabel( index ) }}. {{ ans }}
        </div>
      </div>
      <div class="mt-3 d-flex justify-content-end">
        <button type="submit" class="btn btn-primary" @click=" UpdateQuestion ">Cập nhật</button>
      </div>
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
import { data } from 'autoprefixer'
import { get } from '@/utils/request'
import { getCategoryExamList } from '@/service/examsService'
export default {
  components: {
    Ckeditor
  },
  computed: {
    idques () {
      return this.$route.params.id
    },
  },
  data () {
    return {
      editor: ClassicEditor,
      question: [],
      answer: [],
      correctAns: [],
      category: [],
      imgUrl: ''
    }
  },
  created () {
    this.getDetailQues();
  },

  methods: {
    getImage (event) {
      const file = event.target.files[0]
      if (file)
      {
        this.question.image = file
        // console.log(this.question.image)
        // URL.createObjectURL(file): Tạo một URL tạm thời để hiển thị ảnh đã chọn ngay trên giao diện trước khi upload lên server.
        this.imgUrl = URL.createObjectURL(file)
      }
    },
    removeImg () {
      this.question.image = ''; // Xóa file hình ảnh
      this.imgUrl = ''; // Xóa URL hình ảnh
      this.$refs.fileImage.value = ''; // Đặt lại input file
    },
    AddAnswer () {
      this.answer.push('') // Thêm một chuỗi trống vào mảng câu trả lời
    },
    removeAnswer (index) {
      this.answer.splice(index, 1); //xóa một phần tử tại vị trí đó
      this.correctAns.splice(index, 1) // nếu câu trả lời bị xóa thì xóa luôn cả trong danh sách câu trả lời
    },
    getLabel (index) {
      return String.fromCharCode(65 + index) // Từ mã ASCII để tạo A, B, C, D,...
    },
    async getDetailQues () {
      try
      {
        const questionDetail = await GetDetail(this.idques)
        const CAT = await getCategoryExamList()
        this.category = CAT.data.data
        if (!questionDetail)
        {
          alert('Có lỗi trong quá trình lấy dữ liệu')
        }
        this.question = questionDetail.data
        JSON.parse(this.question.answerlist).forEach((e) => {
          this.answer.push(e)
        });
        JSON.parse(this.question.correctAns).forEach((e) => {
          this.correctAns.push(e);
        })
        this.imgUrl = `http://localhost:8080/assets/image/Question/${this.question.image}`
      } catch (Error)
      {
        alert(Error)
      }
    },

    async UpdateQuestion () {
      const dataQuestion = new FormData()
      dataQuestion.append('class', this.question.class)
      dataQuestion.append('Subject', this.question.Subject)
      dataQuestion.append('title', this.question.title)
      dataQuestion.append('created_by', this.question.created_by)
      dataQuestion.append('image', this.question.image)
      dataQuestion.append('answerlist', JSON.stringify(this.answer))
      dataQuestion.append('correctAns', JSON.stringify(this.correctAns))
      dataQuestion.append('created_at', this.question.created_at)
      for (let [key, value] of dataQuestion.entries())
      {
        console.log(key, value);  // key là tên trường, value là giá trị tương ứng
      }
      try
      {
        const ques = await PutData(this.idques, dataQuestion)
        if (ques.message == "Cập nhật bài thi không thành công !")
        {
          ElNotification({
            title: 'Error',
            message: 'Cập nhật câu hỏi thất bại !',
            type: 'error'
          })
        }
        ElNotification({
          title: 'Success',
          message: 'Cập nhật câu hỏi thành công !',
          type: 'success'
        })
        this.$router.push({ name: 'cauhoi' });
      } catch (Error)
      {
        console.log(Error)
      }
    }
  }
}

</script>
<style>
.ck-editor__editable_inline {
  min-height: 200px;
  /* Set the minimum height for the editor */
}
</style>
