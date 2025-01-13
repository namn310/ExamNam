<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div class="d-flex justify-content-center" v-if=" loadingShow ">
    <div> <svg viewBox="0 0 240 240" height="120" width="120" class="pl ms-2">
        <circle stroke-linecap="round" stroke-dashoffset="-330" stroke-dasharray="0 660" stroke-width="20" stroke="#000"
          fill="none" r="105" cy="120" cx="120" class="pl__ring pl__ring--a"></circle>
        <circle stroke-linecap="round" stroke-dashoffset="-110" stroke-dasharray="0 220" stroke-width="20" stroke="#000"
          fill="none" r="35" cy="120" cx="120" class="pl__ring pl__ring--b"></circle>
        <circle stroke-linecap="round" stroke-dasharray="0 440" stroke-width="20" stroke="#000" fill="none" r="70"
          cy="120" cx="85" class="pl__ring pl__ring--c"></circle>
        <circle stroke-linecap="round" stroke-dasharray="0 440" stroke-width="20" stroke="#000" fill="none" r="70"
          cy="120" cx="155" class="pl__ring pl__ring--d"></circle>
      </svg>
      <p>Loading ... </p>
    </div>
  </div>
  <div v-else>
    <div class="text-[30px] text-center text-400">Danh sách bài kiểm tra</div>
    <div class="flex justify-between">
      <RouterLink :to=" { name: 'create-exam' } ">
        <el-button type="primary" plain>Tạo bài kiểm tra</el-button>
      </RouterLink>
    </div>
    <div class="mt-3">
      <select class="form-select w-40" @change=" getOptionBySubject " v-model=" currentSubject ">
        <option selected>Tất cả</option>
        <option v-for="(       e, index) in ListCategoryExam" :key=" index " :value=" e.id ">{{
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
        <tbody v-for="(        e, index) in ListExam" :key=" index ">
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
          v-for="(        page, index) in ListPages" :key=" index ">
          <a class="page-link" @click="changePage( page )">{{ page }}</a>
        </li>
        <li style="cursor: pointer"><a @click="nextPage()" class="page-link"><i
              class="fa-solid fa-angles-right"></i></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import router from '@/router';
import { getCategoryExamList, deleteExam, getExamList } from '@/service/examsService'
import { ElNotification } from 'element-plus'
export default {
  data () {
    return {
      loadingShow:true,
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
      try
      {
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
        this.loadingShow = false
      }
      catch (e)
      {
        this.loadingShow = false
        alert("Có lỗi trong quá trình lấy dữ liệu !")
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
      try
      {
        this.currentPage = page
        if (page === '...')
        {
          return
        }
        else
        {
          await this.getExamByPage(page)
        }
      }
      catch (e)
      {
        alert("Có lỗi trong quá trình lấy dữ liệu !")
        this.loadingShow = false
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
      try
      {
        this.loadingShow = true
        const exam = await getExamList(page, this.currentIdSubject)
        if (exam)
        {
          this.ListExam = exam['data']['data']
        }
        else
        {
          alert("Có lỗi xảy ra")
        }
        this.loadingShow = false
      }
      catch (e)
      {
        this.loadingShow = false
        alert("Có lỗi xảy ra trong quá trình lấy dữ liệu !")
      }
    },
    async getOptionBySubject (event) {
      try
      {
        this.loadingShow = true
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
        this.loadingShow = false
      }
      catch (e)
      {
          this.loadingShow = false
        alert("Có lỗi xảy ra trong quá trình lấy dữ liệu !")
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
        try
        {
          this.loadingShow = true
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
          this.loadingShow = false
        }
        catch (e)
        {
          this.loadingShow = false
          alert("Có lỗi xảy ra !")
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
<style scoped >
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
