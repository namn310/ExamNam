<template>
    <div class="container-fluid pb-0">
                    <div class="col-12 col-md-9 order-md-1">
                    <h1 id="thư-viện-đề-thi" style="font-size: 3vh; font-size: 3vw; font-weight: 500">
                        Thư viện đề thi
                    </h1>
                    <br />
                    <div class="test-exams">
                        <ul class="nav nav-pills flex-wrap">
                            <li class="nav-item w-auto">
                                <a class="nav-link" @click="changeIdcat(0)" :class=" { 'nav-link active': idcat === 0 || !idcat }" >Tất cả</a>
                            </li>
                            <li class="nav-item w-auto" v-for="item in dataCetegory" :key="item.id">
                                <a  class="nav-link" :class=" { 'nav-link active': idcat === item.id}" @click="changeIdcat(item.id)"
                               >{{ item.title }}</a>
                            </li>
                        </ul>
                    </div>

                    <br />
                    <!-- <form method="GET"> -->
                        <div class="row">
                        <div class="col-12">
                            <div class="form-group">
                            <div class="input-addon inner-addon right-addon">
                                <div class="input-group flex-nowrap">
                                <input
                                    type="text"
                                    style="width: 30vw"
                                    class="form-control"
                                    placeholder="Nhập từ khoá bạn muốn tìm kiếm: tên sách, dạng câu hỏi ..."
                                    @input="search"
                                />
                                <button @click="getExamBySearch" class="btn btn-primary">
                                    <i class="fa-solid fa-magnifying-glass fa-lg text-white"></i>
                                </button>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    <!-- </form> -->
                    <br />
                    </div>

                    <!-- <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link active">Tất cả</a>
                    </li>
                    </ul> -->
                </div>
  <div class="d-flex justify-content-start flex-wrap" v-if="data !== null && data.length >0">
    <CardExam
      v-for="item in data"
      :key="item.id"
      :title="item.title"
      :expire_time="item.duration"
      :countQuestion="item.totalQuestion"
      :idQues="item.id"
    />
  </div>
  <p v-else>Không có bài thi nào !</p>
  <div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalPage * 10"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script setup>
import CardExam from '@/components/CardExam.vue'
// import router from '@/router';
import { getCategoryExamList, getExamList } from '@/service/examsService'
import { onMounted, ref } from 'vue'
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
const dataCetegory = ref([])
const data = ref([])
const originData = ref([])
const idcat =ref()
let page = 1
const totalPage = ref(1)
const SearchInput = ref()
const changeIdcat = async(id) => {
  idcat.value = id
  if (id > 0)
  {
    data.value = originData.value.filter(e => {
      return e.category === id
    })
  }
  else
  {
    data.value=originData.value
  }
}
const search = (event) => {
  SearchInput.value = event.target.value
  if (SearchInput.value === '')
  {
    data.value = originData.value
  }
}
// const getAnxios = async () => {
//   const result = axios.get('http://localhost:8080/exams')
//   console.log(result)
// }
const getExamBySearch = () => {
  const result = SearchInput.value.toLowerCase()
  if (result !== ' ')
  {
    data.value = originData.value.filter(e => {
      return e.title.toLowerCase().includes(result)
    })
  }
  else
  {
    data.value = originData.value
  }
}
const handlePageChange = (newPage) => {
  page = newPage
  fetchDataExam()
}

const fetchDataCatgory = async () => {
  const result = await getCategoryExamList()
  if (result) {
    dataCetegory.value = result['data']['data']
  }
}
const fetchDataExam = async () => {
  const result = await getExamList(page)
  if (result) {
    data.value = result['data']['data']
    originData.value = result['data']['data']
    totalPage.value = result['data']['total_page']
  }
}
// const renderMath = () => {
//   // Gọi MathJax để render công thức LaTeX
//    if (window.MathJax) {
//         window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, "output"]);
//       }
// }
onMounted(() => {
  fetchDataCatgory()
  fetchDataExam()
  // getAnxios()
})
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
.nav-pills .show > .nav-link {
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
