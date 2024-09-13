<template>
  <div class="p-5 mt-5">
    <div class="sm-container">
      <!-- User Profile Section -->
      <div
        class="mx-md-auto mb-3 mt-4 d-flex justify-content-center flex-column align-items-center"
      >
        <div class="profile-cover-avatar text-center">
          <img
            class="avatar-img img-fluid"
            style="max-width: 200px; max-height: 200px"
            src="/src/assets/img/avtUserDefault.webp"
          />
        </div>
        <h1 class="h3 profile-header-title">{{ this.userName }}</h1>
      </div>
      <!-- End User Profile Section -->
      <ul class="nav nav-tabs mb-4">
        <li class="nav-item">
          <a class="nav-link active" style="font-weight: 700">Kết quả luyện thi</a>
        </li>
      </ul>
      <div v-for="(exam, index) in listExam" :key="index">
        <div class="user-test">
          <h3
            style="font-weight: 600; font-size: 2vh; font-size: 2vw"
            id="new-economy-toeic-test-10"
          >
            {{ exam.title }}
          </h3>
          <div class="table-wrapper">
            <table class="table table-sm table-striped">
              <thead>
                <tr>
                  <th style="min-width: 150px">Ngày làm</th>
                  <th style="min-width: 100px">Kết quả</th>
                  <th style="min-width: 150px">Thời gian làm bài</th>
                  <th style="min-width: 150px"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {{ exam.created_at }}
                  </td>
                  <td>
                    {{ exam.score }}
                  </td>
                  <td>{{ exam.duration }}</td>
                  <td>
                    <RouterLink :to="{ name: 'detailResultExam', params: { id: exam.id } }">
                      Xem chi tiết
                    </RouterLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br />
        <hr />
      </div>
      <div class="mb-4 mt-3">
        <ul class="pagination justify-content-center">
          <li
            style="cursor: pointer"
            class="page-item"
            :class="{ active: page == currentPage }"
            v-for="(page, index) in ListPages"
            :key="index"
          >
            <a class="page-link" @click="changePage(page)">{{ page }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { decodeTokenStudent } from '@/service/decodeToken'
import { getUserListResult, getUserListResultByPage } from '@/service/resultServeice'
export default {
  data() {
    return {
      userName: '',
      userId: '',
      listExam: [],
      recordTotal: '',
      totalPage: '',
      currentPage: 1,
      ListPages: []
    }
  },
  created() {
    this.getListResult()
  },
  methods: {
    async getListResult() {
      const user = decodeTokenStudent()
      this.userName = user.data.name
      const result = await getUserListResult(user.data.id)
      if (result) {
        this.listExam = result.data
        this.recordTotal = result.record_total
        this.totalPage = result.total_page
        console.log(result)
        // liệt kê các trang của data
        for (var i = 1; i <= this.totalPage; i++) {
          this.ListPages.push(i)
        }
        console.log(this.ListPages)
      }
    },
    async getResultByPage(page) {
      try {
          this.userId = decodeTokenStudent().data.id
        const result = await getUserListResultByPage(this.userId, page)
        if (!result) {
          alert('Có lỗi trong quá trình lấy dữ liệu')
        }
        this.listExam = result.data
      } catch (Error) {
        alert(Error)
      }
    },
    async changePage(page) {
      this.currentPage = page
      console.log(this.currentPage)
      await this.getResultByPage(page)
    }
  }
}
</script>
<style scoped>
.active {
  background-color: deepskyblue;
  color: white;
}
</style>
