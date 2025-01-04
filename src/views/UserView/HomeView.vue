<template>
  <div class="container-fluid pb-0">
    <div class="col-12 col-md-9 order-md-1">
      <h1 id="thư-viện-đề-thi" style="font-size: 3vh; font-size: 3vw; font-weight: 500">
        Thư viện đề thi
      </h1>
      <br />
      <!-- danh mục đề thi -->
      <div class="test-exams">
        <ul class="nav nav-pills flex-wrap">
          <li class="nav-item w-auto">
            <a class="nav-link" @click="getOptionBySubject( 0 )" :class=" { active: currentIdSubject === 0 } ">Tất cả</a>
          </li>
          <li class="nav-item w-auto" @click="getOptionBySubject( e.id )" v-for=" e in ListCategoryExam " :key=" e.id ">
            <a :class=" { active: currentIdSubject === e.id } " class="nav-link">{{ e.title }}</a>
          </li>
        </ul>
      </div>

      <br />
      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <div class="input-addon inner-addon right-addon">
              <div class="input-group flex-nowrap">
                <!-- search input tìm kiếm đề thi -->
                <input type="text" style="width: 30vw" class="form-control"
                  placeholder="Nhập từ khoá bạn muốn tìm kiếm: đề thi, dạng câu hỏi ..." />
                <button class="btn btn-primary">
                  <i class="fa-solid fa-magnifying-glass fa-lg text-white"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  </div>
  <div class="d-flex justify-content-start flex-wrap" v-if=" ListExam && ListExam.length > 0 ">
    <CardExam v-for="( item, index) in ListExam" :key=" index " :title=" item.title " :expire_time=" item.duration "
      :countQuestion=" item.totalQuestion " :idQues=" item.id " :countUserDo=" item.count_user_do " />
  </div>
  <p v-else>Không có bài thi nào !</p>
  <div class="mb-4 mt-3">
    <ul class="pagination justify-content-center">
      <li style="cursor: pointer">
        <a @click="prePage()" class="page-link"><i class="fa-solid fa-angles-left"></i></a>
      </li>
      <li style="cursor: pointer" class="page-item" :class=" { active: page == currentPage } "
        v-for="(    page, index) in ListPages" :key=" index ">
        <a class="page-link" @click="changePage( page )">{{ page }}</a>
      </li>
      <li style="cursor: pointer">
        <a @click="nextPage()" class="page-link"><i class="fa-solid fa-angles-right"></i></a>
      </li>
    </ul>
  </div>
</template>
<script>
// import router from '@/router';
import router from '@/router'
import { getCategoryExamList, getExamList } from '@/service/examsService'
import CardExam from '@/components/CardExam.vue'
export default {
  components: {
    CardExam
  },
  data () {
    return {
      ListCategoryExam: [],
      ListExam: [],
      ListPages: [],
      TotalPage: 0,
      TotalExam: 0,
      currentPage: 1,
      currentIdSubject: 0,
      currentSubject: 'Tất cả'
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    // chọn và active danh mục được chọn
    CategoryChosen (id) {
      this.currentIdSubject = id
    },
    async fetchData () {
      const category = await getCategoryExamList()
      if (category)
      {
        this.ListCategoryExam = category['data']['data']
      }
      const exam = await getExamList(this.currentPage, 0)
      if (exam)
      {
        this.ListExam = exam.data.data
        this.TotalPage = exam['data']['total_page']
        this.TotalExam = exam['data']['record_total']
        this.listpage()
      }
    },
    async nextPage () {
      if (this.currentPage === this.TotalPage)
      {
        return
      } else
      {
        await this.changePage(this.currentPage + 1)
      }
    },
    async prePage () {
      if (this.currentPage === 1)
      {
        return
      } else
      {
        await this.changePage(this.currentPage - 1)
      }
    },
    listpage () {
      // for (var i = 1; i <= this.TotalPage; i++)
      // {
      //   this.ListPages.push(i)
      // }
      this.ListPages = [] // Reset ListPages

      if (this.TotalPage <= 6)
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
      } else
      {
        await this.getExamByPage(page)
        this.listpage()
      }
    },
    async getExamByPage (page) {
      const exam = await getExamList(page, this.currentIdSubject)
      if (exam)
      {
        this.ListExam = exam['data']['data']
      } else
      {
        alert('Có lỗi xảy ra')
      }
    },
    async getOptionBySubject (id) {
      this.currentIdSubject = id
      this.currentPage = 1
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
    }
  }
}
</script>

<style scoped>
.site-content-wrapper {
  padding-top: 80px;
  position: relative;
}

*,
:after,
:before {
  box-sizing: border-box;
}

.content-header {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.gray-bg,
.sp-today-todolist {
  background-color: #f8f9fa !important;
}

.pb-0,
.py-0 {
  padding-bottom: 0 !important;
}

.content-header [class*='container'] {
  padding-bottom: 0;
}

.container,
.lg-container,
.md-container,
.mm-container,
.sm-container,
.xl-container,
.xs-container {
  width: 100%;
  max-width: 1170px;
  padding-top: 2rem;
  padding-bottom: 3rem;
}

.pb-0,
.py-0 {
  padding-bottom: 0 !important;
}

@media (min-width: 992px) {

  .container,
  .container-lg,
  .container-md,
  .container-sm,
  .lg-container,
  .md-container,
  .mm-container,
  .sm-container,
  .xl-container,
  .xs-container {
    max-width: 960px;
  }
}

@media (min-width: 768px) {

  .container,
  .container-md,
  .container-sm,
  .lg-container,
  .md-container,
  .mm-container,
  .sm-container,
  .xl-container,
  .xs-container {
    max-width: 720px;
  }
}

@media (min-width: 576px) {

  .container,
  .container-sm,
  .lg-container,
  .md-container,
  .mm-container,
  .sm-container,
  .xl-container,
  .xs-container {
    max-width: 540px;
  }

  .container,
  .container-lg,
  .container-md,
  .container-sm,
  .container-xl,
  .lg-container,
  .md-container,
  .mm-container,
  .sm-container,
  .xl-container,
  .xs-container {
    width: 100%;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
    margin-right: auto;
    margin-left: auto;
  }
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -0.75rem;
  margin-left: -0.75rem;
}

@media (min-width: 768px) {
  .order-md-2 {
    order: 2;
  }
}

@media (min-width: 768px) {
  .col-md-3 {
    flex: 0 0 25%;
    max-width: 25%;
  }

  .col-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

@media (min-width: 768px) {
  .order-md-1 {
    order: 1;
  }
}

@media (min-width: 768px) {
  .col-md-9 {
    flex: 0 0 75%;
    max-width: 75%;
  }

  .col-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

.nav-pills {
  flex-wrap: nowrap;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}

ol,
p,
ul {
  margin-bottom: 1rem;
}

dl,
ol,
ul {
  margin-top: 0;
}

address,
dl,
ol,
ul {
  margin-bottom: 1rem;
}

.nav-pills .nav-item {
  margin-right: 0.4rem;
}

.w-auto {
  width: auto !important;
}

.nav-pills .nav-link.active {
  background-color: #e8f2ff;
  color: #35509a;
  font-weight: 500;
}

.nav-pills .nav-link.active,
.nav-pills .show>.nav-link {
  color: #fff;
  background-color: #35509a;
}

.nav-pills .nav-link {
  padding: 4px 15px;
  background-color: #f8f9fa;
  border-radius: 25px;
  white-space: nowrap;
  color: #1a1a1a;
}

.nav-pills .nav-link {
  border-radius: 0.35rem;
}

.nav-link {
  display: block;
  padding: 0.5rem 1rem;
}

a {
  cursor: pointer;
}

a {
  color: #35509a;
  text-decoration: none;
  background-color: transparent;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -0.75rem;
  margin-left: -0.75rem;
}
</style>
