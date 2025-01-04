<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div class="text-[30px] text-black-500 text-center">Danh sách câu hỏi</div>
  <div class="flex justify-between">
    <RouterLink :to=" { name: 'create-cauhoi' } ">
      <el-button type="primary" plain>Create câu hỏi</el-button>
    </RouterLink>
  </div>
  <div class="pt-8">
    <!-- lọc data theo yêu cầu -->
    <div class="mb-3 d-flex">
      <div class="mb-2 d-flex" style="width: 30%">
        <p style="width:30%"><strong>Danh mục: </strong></p>
        <select class="ms-2 form-select" @change=" getOptionBySubject " v-model=" currentSubject ">
          <option selected>Tất cả</option>
          <option v-for="(     choice, index) in category" :key=" index " :value=" choice.id ">{{ choice.title }}
          </option>
        </select>
      </div>
      <!-- lọc theo lớp học -->
      <div class="ms-5">
        <div class="mb-2 d-flex">
          <p style="width:30%"><strong>Lớp</strong></p>
          <select class="ms-2 form-select" @change=" getOptionByClass " v-model=" currentClassSelected ">
            <option selected>Tất cả</option>
            <option v-for="(     choice, index) in ListClass" :key=" index " :value=" choice.id ">{{ choice.class }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <!-- search -->
    <div class="input-group mb-3" style="width: 40%">
      <button class="btn btn-outline-primary" type="button" id="button-addon1">
        <i class="fa-solid fa-magnifying-glass fa-lg"></i>
      </button>
      <input type="text" class="form-control" v-model=" search " @input=" SearchQuestion "
        placeholder="Tìm kiếm câu hỏi" />
    </div>
    <table class="table table-hover table-bordered text-center table-responsive" id="sampleTable"
      v-if=" data.length > 0 ">
      <thead>
        <tr class="table-secondary text-center">
          <th style="width:5%">Mã</th>
          <th style="width:80%">Câu hỏi</th>
          <th style="width:5%">Môn</th>
          <th style="width:5%">Lớp</th>
          <!-- <th>Người tạo</th> -->
          <th style="width:5%"></th>
        </tr>
      </thead>
      <tbody id="table-product" v-for="     question in data     " :key=" question.id ">
        <tr style="cursor: pointer;">
          <td>{{ question.id }}</td>
          <td @click="changeQuestion( question.id )">
            <p v-html=" question.title "></p>
          </td>
          <td>{{ question.CatSucject }}</td>
          <td>{{ question.class }}</td>
          <!-- <td>{{ question.CreatorName }}</td> -->
          <!-- <td>{{ question.created_by }}</td> -->
          <td>
            <!-- button delete -->
            <button class="btn btn-danger btn-sm trash mb-2" type="button" @click="DeleteQuestion( question.id )"
              title="Xóa">
              <i class="fas fa-trash-alt"></i>
            </button>
            <!-- <button class="btn btn-success btn-sm edit" @click="changeQuestion( question.id )" type="button" title="Sửa"
              id="show-emp">
              <i class="fas fa-edit"></i>
            </button> -->
            <!-- <p>{{ errorPost }}</p> -->
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Không có câu hỏi nào !</p>
  </div>
  <div class="mb-4">
    <ul class="pagination justify-content-center">
      <li style="cursor: pointer"><a @click="prePage()" class="page-link"><i class="fa-solid fa-angles-left"></i></a>
      </li>
      <li style="cursor: pointer" class="page-item" :class=" { active: page == currentPage } "
        v-for="(     page, index) in ListPages" :key=" index ">
        <a class="page-link" @click="changePage( page )">{{ page }}</a>
      </li>
      <li style="cursor: pointer"><a @click="nextPage()" class="page-link"><i class="fa-solid fa-angles-right"></i></a>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  getQuestionList,
  DeleteQues,
  questionsPage,
  getUserCreate,
  getQuestionListByCategory
} from '@/service/questionsService'
import { ElNotification } from 'element-plus'
// import Cookies from 'js-cookie'
// Một số phiên bản của jwt-decode không xuất mặc định (default export) nên phải import như này
//
import { getCategoryExamList } from '@/service/examsService'
import { getAllClass } from '@/service/class'

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
      currentPage: 1,
      search: null,
      category: [],
      currentSubject: 'Tất cả',
      currentIdSubject: 0,
      currentClassSelected: 'Tất cả',
      currentIdClass: 0,
      ListClass: [],
    }
  },
  watch: {
    data () {
      // Khi có sự thay đổi trong dữ liệu câu hỏi, gọi lại MathJax
      this.renderMath();
    }
  },
  mounted () {
    this.getClass()
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
    async getClass () {
      const result = await getAllClass()
      if (result)
      {
        this.ListClass = result.data
      }
    },
    // lấy câu hỏi theo danh mục
    async getOptionBySubject (event) {
      this.currentIdSubject = event.target.value
      if (this.currentSubject === 'Tất cả')
      {
        this.currentIdSubject = 0
      }
      if (this.currentClassSelected === 'Tất cả')
      {
        this.currentIdClass = 0
      }
      const result = await getQuestionListByCategory(this.currentIdSubject, this.currentIdClass, this.currentPage)
      // console.log(result)
      if (result)
      {
        // Thêm thuộc tính creator cho dữ liệu
        result.question.data.forEach((e) => {
          e.CreatorName = ''
        })
        this.data = []
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
        // set danh sách page rỗng
        this.ListPages = []
        // set lại tổng số trang về 0
        this.TotalPage = result.question.total_page
        this.listpage()
        this.currentPage = 1
      }
    },
    // lấy câu hỏi theo lớp học
    async getOptionByClass (event) {
      this.currentIdClass = event.target.value
      if (this.currentSubject === 'Tất cả')
      {
        this.currentIdSubject = 0
      }
      if (this.currentClassSelected === 'Tất cả')
      {
        this.currentIdClass = 0
      }
      const result = await getQuestionListByCategory(this.currentIdSubject, this.currentIdClass, this.currentPage)
      // console.log(result)1
      if (result)
      {
        // Thêm thuộc tính creator cho dữ liệu
        result.question.data.forEach((e) => {
          e.CreatorName = ''
        })
        this.data = []
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
        // set danh sách page rỗng
        this.ListPages = []
        // set lại tổng số trang về 0
        this.TotalPage = result.question.total_page
        this.listpage()
        this.currentPage = 1
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
      // console.log(this.category[0].title)
      // this.currentSubject = this.category[0].title
      // console.log(this.currentSubject)
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
        const result = await questionsPage(this.currentIdSubject, page)
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
        // this.getOptionBySubject()
      } catch (Error)
      {
        console.log(Error)
      }
    },
    // Tìm kiếm câu hỏi
    // SearchQuestion () {
    //   const input = this.search
    //   // const origin = this.data
    //   if (input !== '')
    //   {
    //     if (this.currentSubject === 'Lựa chọn môn học')
    //     {
    //       this.data = this.data2.filter((ques) => {
    //         return ques.title.toLowerCase().includes(input)
    //       })
    //     } else
    //     {
    //       this.data = this.data2.filter((ques) => {
    //         return (
    //           ques.title.toLowerCase().includes(input) &&
    //           ques.Subject == this.currentSubject
    //         )
    //       })
    //     }
    //   } else
    //   {
    //     this.data = this.data2
    //   }
    // },
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
        alert('Lỗi ', Error, 'Vui lòng thử lại sau')
      }
    },
    // view change question
    changeQuestion (questionId) {
      this.currentQuestionId = questionId
      this.$router.push({ name: 'changeQues', params: { id: this.currentQuestionId } })
    },
    listpage () {
      // for (var i = 1; i <= this.TotalPage; i++)
      // {
      //   this.ListPages.push(i)
      // }

      this.ListPages = [] // Reset ListPages

      if (this.TotalPage <= 7)
      {
        // Hiển thị tất cả các trang nếu số trang <= 7
        for (let i = 1; i <= this.TotalPage; i++)
        {
          this.ListPages.push(i)
        }
      } else
      {
        // Hiển thị phân trang dạng 12 ... 89
        if (this.currentPage <= 4)
        {
          // Nếu đang ở các trang đầu
          for (let i = 1; i <= 5; i++)
          {
            this.ListPages.push(i)
          }
          this.ListPages.push('...')
          this.ListPages.push(this.TotalPage)
        } else if (this.currentPage >= this.TotalPage - 3)
        {
          // Nếu đang ở các trang cuối
          this.ListPages.push(1)
          this.ListPages.push('...')
          for (let i = this.TotalPage - 4; i <= this.TotalPage; i++)
          {
            this.ListPages.push(i)
          }
        } else
        {
          // Nếu đang ở giữa
          this.ListPages.push(1)
          this.ListPages.push('...')
          for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++)
          {
            this.ListPages.push(i)
          }
          this.ListPages.push('...')
          this.ListPages.push(this.TotalPage)
        }
      }
    },
    async changePage (page) {
      this.currentPage = page
      if (page === '...')
      {
        return
      }
      else
      {
        await this.getQuestionByPage(page)
        this.listpage()
      }

    },
    async nextPage () {
      if (this.currentPage === this.TotalPage)
      {
        return
      }
      else
      {
        await this.changePage(this.currentPage + 1)
      }

    },
    async prePage () {
      if (this.currentPage === 1)
      {
        return
      }
      else
      {
        await this.changePage(this.currentPage - 1)
      }
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
