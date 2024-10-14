<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div class="text-[50px] text-black-500 text-center">Danh sách câu hỏi</div>
  <div class="flex justify-between">
    <RouterLink :to=" { name: 'create-cauhoi' } ">
      <el-button type="primary" plain>Create câu hỏi</el-button>
    </RouterLink>
  </div>
  <div class="pt-8">
    <!-- lọc data theo yêu cầu -->
    <div class="mb-2" style="width: 30%">
      <select class="form-select" @change=" getOptionBySubject " v-model=" currentSubject ">
        <option selected>Lựa chọn môn học</option>
        <option v-for="( choice, index) in category" :key=" index ">{{ choice['title'] }}</option>
      </select>
    </div>
    <!-- search -->
    <div class="input-group mb-3" style="width: 40%">
      <button class="btn btn-outline-primary" type="button" id="button-addon1">
        <i class="fa-solid fa-magnifying-glass fa-lg"></i>
      </button>
      <input type="text" class="form-control" v-model=" search " @input=" SearchQuestion " placeholder="Tìm kiếm câu hỏi" />
    </div>
    <table class="table table-hover table-bordered text-center table-responsive" id="sampleTable" v-if=" data.length > 0 ">
      <thead>
        <tr class="table-primary text-center">
          <th>Mã câu hỏi</th>
          <th>Câu hỏi</th>
          <th>Môn</th>
          <th>Lớp</th>
          <!-- <th>Người tạo</th> -->
          <th></th>
        </tr>
      </thead>
      <tbody id="table-product" v-for=" question in data " :key=" question.id ">
        <tr>
          <td>{{ question.id }}</td>
          <td><p v-html=" question.title "></p></td>
          <td >{{ question.CatSucject }}</td>
          <td>{{ question.class }}</td>
          <!-- <td>{{ question.CreatorName }}</td> -->
          <!-- <td>{{ question.created_by }}</td> -->
          <td class="d-flex flex-column">
            <!-- button delete -->
            <button class="btn btn-danger btn-sm trash mb-2" type="button" @click="DeleteQuestion( question.id )"
              title="Xóa">
              <i class="fas fa-trash-alt"></i>
            </button>
            <button class="btn btn-success btn-sm edit" @click="changeQuestion( question.id )" type="button" title="Sửa"
              id="show-emp">
              <i class="fas fa-edit"></i>
            </button>
            <!-- <p>{{ errorPost }}</p> -->
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Không có câu hỏi nào !</p>
  </div>
  <div class="mb-4">
    <ul class="pagination justify-content-center">
      <li style="cursor: pointer" class="page-item" :class=" { active: page == currentPage } "
        v-for="( page, index) in ListPages" :key=" index ">
        <a class="page-link" @click="changePage( page )">{{ page }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
// import { computed, ref, onMounted } from 'vue'
// import { ElTable } from 'element-plus'
// import { RouterLink } from 'vue-router';
// import { resolveTypeElements } from 'vue/compiler-sfc';
// import ModalView from '@/components/ModalView.vue';
// import { fa } from 'element-plus/es/locale';
import {
  getQuestionList,
  DeleteQues,
  questionsPage,
  getUserCreate
} from '@/service/questionsService'
import { ElNotification } from 'element-plus'
// import Cookies from 'js-cookie'
// Một số phiên bản của jwt-decode không xuất mặc định (default export) nên phải import như này
//
import { getCategoryExamList } from '@/service/examsService'
export default {
  data () {
    return {
      showModalDelete: false,
      showModalEdit: false,
      currentQuestionId: null,
      data: [],
      data2: [],
      creator: [],
      Error: null,
      TotalQuestion: 0,
      ListPages: [],
      TotalPage: 0,
      currentPage: 0,
      search: null,
      category: [],
      currentSubject: 'Lựa chọn môn học'
    }
  },
  watch: {
    data() {
      // Khi có sự thay đổi trong dữ liệu câu hỏi, gọi lại MathJax
      this.renderMath();
    }
  },
  created () {
    this.fetchQuestion()
    this.renderMath()
  },
  methods: {
    renderMath () {
      // Kiểm tra xem MathJax đã được tải chưa
      if (window.MathJax)
      {
        this.$nextTick(() => {
          window.MathJax.typesetPromise()
            .then(() => {
              // console.log("MathJax rendering completed");
            })
            .catch(err => console.error("MathJax rendering error:", err));
        });
      }
    },
    // lấy tên môn học cần lọc
    getOptionBySubject () {
      // console.log(this.currentSubject)
      if (this.currentSubject.toLowerCase() == 'lựa chọn môn học')
      {
        return (this.data = this.data2)
      }
      else
      {
        this.data = this.data2.filter((ques) => {
          return ques.CatSucject.toLowerCase() == this.currentSubject.toLowerCase()
        })
      }
    },
    // lấy dữ liệu question từ api
    async fetchQuestion () {
      // try
      // {
      const result = await getQuestionList()
      const response = await getUserCreate()
      const CAT = await getCategoryExamList()
      this.category = CAT.data.data
      this.creator = response.data
      if (result)
      {
        // Thêm thuộc tính creator cho dữ liệu
        result.question.data.forEach((e) => {
          e.CreatorName = ''
        })
        this.data = result.question.data
        // data2 là dữ liệu gốc để sau dùng cho việc tìm kiếm
        this.data2 = result.question.data
        // set thông tin người tạo câu hỏi vào mảng
        this.data.forEach((ques) => {
          this.creator.forEach((cre) => {
            if (cre.id === ques.created_by)
            {
              ques.CreatorName = cre.name
            }
          })
        })
        // lấy tên danh mục
        this.data.forEach((ques) => {
          this.category.forEach((cat) => {
            if (ques.Subject === cat.id)
            {
              ques.CatSucject = cat.title
            }
          })
        })
        // lấy tổng số bản ghi
        this.TotalQuestion = result.question.record_total
        this.TotalPage = result.question.total_page
        // lấy danh sách các trang
        this.listpage()
      } else
      {
        alert('Có lỗi trong quá trình lấy dữ liệu')
      }
    },
    async getQuestionByPage (page) {
      try
      {
        const result = await questionsPage(page)
        if (!result)
        {
          alert('Có lỗi trong quá trình lấy dữ liệu')
        }
        this.data = result.question.data
        this.data2 = result.question.data
        this.data.forEach((ques) => {
          this.creator.forEach((cre) => {
            if (cre.id === ques.created_by)
            {
              ques.CreatorName = cre.name
            }
          })
        })
        // lấy tên danh mục
        this.data.forEach((ques) => {
          this.category.forEach((cat) => {
            if (ques.Subject === cat.id)
            {
              ques.CatSucject = cat.title
            }
          })
        })
        this.getOptionBySubject()
      } catch (Error)
      {
        alert(Error)
      }
    },
    // Tìm kiếm câu hỏi
    SearchQuestion () {
      const input = this.search
      // const origin = this.data
      if (input !== '')
      {
        if (this.currentSubject === 'Lựa chọn môn học')
        {
          this.data = this.data2.filter((ques) => {
            return ques.title.toLowerCase().includes(input)
          })
        } else
        {
          this.data = this.data2.filter((ques) => {
            return (
              ques.title.toLowerCase().includes(input) &&
              ques.Subject == this.currentSubject
            )
          })
        }
      } else
      {
        this.data = this.data2
      }
    },
    toggleModalEdit () {
      this.showModalEdit = !this.showModalEdit
    },
    // Xóa câu hỏi
    async DeleteQuestion (questionId) {
      this.currentQuestionId = questionId
      if (!confirm("Bạn có muốn xóa câu hỏi này không ?"))
      {
        return;  // Nếu người dùng nhấn 'Cancel', dừng việc xóa
      }
      try
      {
        const del = await DeleteQues(this.currentQuestionId)
        console.log(del)
        if (del.message == "Xóa bài thi thành công !")
        {

          ElNotification({
            title: 'Success',
            message: 'Xóa câu hỏi thành công !',
            type: 'success'
          })
          this.data = this.data.filter(data => data.id !== this.currentQuestionId);
          // window.location.reload()
        } else
        {
          ElNotification({
            title: 'Error',
            message: 'Xóa không thành công ! Có lỗi xảy ra',
            type: 'error'
          })
        }
      } catch (Error)
      {
        alert('Lỗi ',Error,'Vui lòng thử lại sau')
      }
    },
    // view change question
    changeQuestion (questionId) {
      this.currentQuestionId = questionId
      this.$router.push({ name: 'changeQues', params: { id: this.currentQuestionId } })
    },
    listpage () {
      for (var i = 1; i <= this.TotalPage; i++)
      {
        this.ListPages.push(i)
      }
    },
    async changePage (page) {
      this.currentPage = page
      await this.getQuestionByPage(page)
    }
  },
  computed: {}
}
</script>
<style scoped>
.active {
  background-color: deepskyblue;
  color: white;
}
</style>
