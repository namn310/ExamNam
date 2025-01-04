<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div class="text-[30px] text-center text-400">Danh sách bài kiểm tra</div>
  <div class="flex justify-between">
    <RouterLink :to=" { name: 'create-exam' } ">
      <el-button type="primary" plain>Tạo bài kiểm tra</el-button>
    </RouterLink>
  </div>
  <div class="mt-3">
    <select class="form-select w-40" @change=" getOptionBySubject " v-model=" currentSubject ">
      <option selected>Tất cả</option>
      <option v-for="(     e, index) in ListCategoryExam" :key=" index " :value=" e.id ">{{
        e.title
      }}</option>
    </select>
  </div>
  <div class="pt-8">
    <table class="table table-hover table-bordered text-center table-responsive" v-if=" ListExam.length > 0 ">
      <thead>
        <tr class="table-secondary text-center">
          <th style="width:10%">Mã đề thi</th>
          <th style="width:60%">Đề thi</th>
          <th style="width:10%">Số lượng câu hỏi</th>
          <th style="width:10%">Thời gian làm bài</th>
          <!-- <th>Người tạo</th> -->
          <th style="width:10%">Chức năng</th>
        </tr>
      </thead>
      <tbody v-for="(      e, index) in ListExam" :key=" index ">
        <tr style="cursor: pointer;">
          <td>{{ e.id }}</td>
          <td @click="detail( e.id )">{{ e.title }}</td>
          <td>{{ e.totalQuestion }}</td>
          <td>{{ e.duration }} phút</td>
          <td>
            <button class="btn btn-danger" @click="deleteExamFetch( e.id )">x</button>
            <!-- <button @click="editExam(e.id)" class="btn btn-success ms-2"><i class="fa-solid fa-pen-to-square"></i></button> -->
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
        v-for="(      page, index) in ListPages" :key=" index ">
        <a class="page-link" @click="changePage( page )">{{ page }}</a>
      </li>
      <li style="cursor: pointer"><a @click="nextPage()" class="page-link"><i class="fa-solid fa-angles-right"></i></a>
      </li>
    </ul>
  </div>
</template>

<script>
import router from '@/router';
import { getCategoryExamList, deleteExam, getExamList } from '@/service/examsService'
import { ElNotification } from 'element-plus'
export default {
  data () {
    return {
      ListCategoryExam: [],
      ListExam: [],
      ListPages: [],
      TotalPage: 0,
      TotalExam: 0,
      currentPage: 1,
      currentIdSubject: 0,
      currentSubject: 'Tất cả',
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      const category = await getCategoryExamList()
      if (category)
      {
        this.ListCategoryExam = category['data']['data']
      }
      const exam = await getExamList(this.currentPage, 0)
      if (exam)
      {
        this.ListExam = exam['data']['data']
        this.TotalPage = exam['data']['total_page']
        this.TotalExam = exam['data']['record_total']
        this.listpage()
      }
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
        await this.getExamByPage(page)
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
    },
    async getExamByPage (page) {
      const exam = await getExamList(page, this.currentIdSubject)
      if (exam)
      {
        this.ListExam = exam['data']['data']
      }
      else
      {
        alert("Có lỗi xảy ra")
      }
    },
    async getOptionBySubject (event) {
      this.currentIdSubject = event.target.value
      if (this.currentIdSubject === 'Tất cả')
      {
        this.currentIdSubject = 0
      }
      const exam = await getExamList(this.currentPage, this.currentIdSubject)
      if (exam)
      {
        this.ListExam = exam['data']['data']
        this.TotalPage = exam['data']['total_page']
        this.TotalExam = exam['data']['record_total']
        this.ListPages = []
        this.listpage()
        this.currentPage = 1
        // console.log(exam, this.TotalExam, this.TotalPage)
      }
    },
    detail (id) {
      router.replace({ name: 'detail-exam', params: { id: id } })
    },
    editExam (id) {
      router.replace({ name: 'edit-exam', params: { id: id } })
    },
    async deleteExamFetch (id) {
      if (confirm("Xác nhận xóa bài kiểm tra này ?"))
      {
        const result = await deleteExam(id)
        // console.log(result)
        if (result.message === "Xóa bài thi thành công !")
        {
          ElNotification({
            title: 'Thông báo',
            message: 'Xóa bài kiểm tra thành công !',
            type: 'success'
          })
          this.ListExam = this.ListExam.filter(e => e.id !== id)
        }
        else
        {
          ElNotification({
            title: 'Thông báo',
            message: 'Xóa bài kiểm tra thất bại !',
            type: 'error'
          })
        }
      }
      else
      {
        return
      }
    }
  }
}
</script>
