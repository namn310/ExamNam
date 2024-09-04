<template>
  <div class="site-content-wrapper">
    <div class="content-header pb-0 gray-bg">
      <div class="container-fluid pb-0">
        <div class="col-12 col-md-9 order-md-1">
          <h1 id="thư-viện-đề-thi" style="font-size:3vh;font-size:3vw;font-weight: 500;">Thư viện đề thi</h1>
          <br />
          <div class="test-exams">
            <ul class="nav nav-pills flex-wrap">
              <li class="nav-item w-auto">
                <a class="nav-link active" href="/tests/">Tất cả</a>
              </li>
              <li class="nav-item w-auto">
                <a class="nav-link" href="/tests/tieng-anh-thptqg/">Tiếng Anh THPTQG</a>
              </li>
              <li class="nav-item w-auto">
                <a class="nav-link" href="/tests/toan-thptqg/">Toán THPTQG</a>
              </li>
              <li class="nav-item w-auto">
                <a class="nav-link" href="/tests/sinh-hoc-thptqg/">Sinh học THPTQG</a>
              </li>
              <li class="nav-item w-auto">
                <a class="nav-link" href="/tests/hoa-hoc-thptqg/">Hóa học THPTQG</a>
              </li>
              <li class="nav-item w-auto">
                <a class="nav-link" href="/tests/vat-ly-thptqg/">Vật lý THPTQG</a>
              </li>
              <li class="nav-item w-auto">
                <a class="nav-link" href="/tests/sat/">NEW SAT</a>
              </li>

              <li class="nav-item w-auto">
                <a class="nav-link" href="/tests/act/">ACT</a>
              </li>
            </ul>
          </div>

          <br />
          <form method="GET">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <div class="input-addon inner-addon right-addon">
                    <div class="input-group flex-nowrap">
                      <input type="text" style="width: 30vw" class="form-control" enterkeyhint="done"
                        placeholder="Nhập từ khoá bạn muốn tìm kiếm: tên sách, dạng câu hỏi ..." name="term" value="">
                        <button class="btn btn-primary"> <i class="fa-solid fa-magnifying-glass fa-lg text-white"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </form>
          <br />
        </div>

        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active">Tất cả</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="content-wrapper mt-4 ms-4 me-4">
      <div class=" d-flex justify-content-start flex-wrap">
        <!-- exam test -->
        <div class="testitem-wrapper mt-2 me-2 p-3">
          <a class="text-dark" href="">
            <h2 class="testitem-title" id="ielts-simulation-listening-test-1">
              IELTS Simulation Listening test 1
            </h2>
            <div class="testitem-info-wrapper">
              <div>
                <span class="testitem-info">
                  <span class="far fa-clock mr-1 me-2"></span>40 phút |
                  <i class="fa-solid fa-user-pen me-2"></i>566811 |
                  <span class="far fa-comments mr-1 me-2"></span>1804
                </span>
              </div>
              <div>
                <span class="testitem-info"> 4 phần thi | 40 câu hỏi </span>
              </div>
            </div>

            <div class="testitem-tags mt-2">
              <span class="tag">IELTS Academic</span>
              <span class="tag">Listening</span>
            </div>
            <br />
          </a>
          <div class="testitem-start-test">
            <a class="text-dark"> </a>
            <RouterLink :to=" { name: 'testDetail', params: { id: 1 } } " class="btn btn-block btn-outline-primary">Chi tiết
            </RouterLink>
          </div>
        </div>
        <!-- exam test -->
        <div class="testitem-wrapper mt-2 me-2 p-3">
          <a class="text-dark" href="">
            <h2 class="testitem-title" id="ielts-simulation-listening-test-1">
              IELTS Simulation Listening test 1
            </h2>
            <div class="testitem-info-wrapper">
              <div>
                <span class="testitem-info">
                  <span class="far fa-clock mr-1 me-2"></span>40 phút |
                  <i class="fa-solid fa-user-pen me-2"></i>566811 |
                  <span class="far fa-comments mr-1 me-2"></span>1804
                </span>
              </div>
              <div>
                <span class="testitem-info"> 4 phần thi | 40 câu hỏi </span>
              </div>
            </div>

            <div class="testitem-tags mt-2">
              <span class="tag">IELTS Academic</span>
              <span class="tag">Listening</span>
            </div>
            <br />
          </a>
          <div class="testitem-start-test">
            <a class="text-dark"> </a>
            <RouterLink :to=" { name: 'testDetail', params: { id: 1 } } " class="btn btn-block btn-outline-primary">Chi tiết
            </RouterLink>
          </div>
        </div>
        <!-- exam test -->
        <div class="testitem-wrapper mt-2 me-2 p-3">
          <a class="text-dark" href="">
            <h2 class="testitem-title" id="ielts-simulation-listening-test-1">
              IELTS Simulation Listening test 1
            </h2>
            <div class="testitem-info-wrapper">
              <div>
                <span class="testitem-info">
                  <span class="far fa-clock mr-1 me-2"></span>40 phút |
                  <i class="fa-solid fa-user-pen me-2"></i>566811 |
                  <span class="far fa-comments mr-1 me-2"></span>1804
                </span>
              </div>
              <div>
                <span class="testitem-info"> 4 phần thi | 40 câu hỏi </span>
              </div>
            </div>

            <div class="testitem-tags mt-2">
              <span class="tag">IELTS Academic</span>
              <span class="tag">Listening</span>
            </div>
            <br />
          </a>
          <div class="testitem-start-test">
            <a class="text-dark"> </a>
            <RouterLink :to=" { name: 'testDetail', params: { id: 1 } } " class="btn btn-block btn-outline-primary">Chi tiết
            </RouterLink>
          </div>
        </div>
        <!-- exam test -->
        <div class="testitem-wrapper mt-2 me-2 p-3">
          <a class="text-dark" href="">
            <h2 class="testitem-title" id="ielts-simulation-listening-test-1">
              IELTS Simulation Listening test 1
            </h2>
            <div class="testitem-info-wrapper">
              <div>
                <span class="testitem-info">
                  <span class="far fa-clock mr-1 me-2"></span>40 phút |
                  <i class="fa-solid fa-user-pen me-2"></i>566811 |
                  <span class="far fa-comments mr-1 me-2"></span>1804
                </span>
              </div>
              <div>
                <span class="testitem-info"> 4 phần thi | 40 câu hỏi </span>
              </div>
            </div>

            <div class="testitem-tags mt-2">
              <span class="tag">IELTS Academic</span>
              <span class="tag">Listening</span>
            </div>
            <br />
          </a>
          <div class="testitem-start-test">
            <a class="text-dark"> </a>
            <RouterLink :to=" { name: 'testDetail', params: { id: 1 } } " class="btn btn-block btn-outline-primary">Chi tiết
            </RouterLink>
          </div>
        </div>
        <!-- exam test -->
        <div class="testitem-wrapper mt-2 me-2 p-3">
          <a class="text-dark" href="">
            <h2 class="testitem-title" id="ielts-simulation-listening-test-1">
              IELTS Simulation Listening test 1
            </h2>
            <div class="testitem-info-wrapper">
              <div>
                <span class="testitem-info">
                  <span class="far fa-clock mr-1 me-2"></span>40 phút |
                  <i class="fa-solid fa-user-pen me-2"></i>566811 |
                  <span class="far fa-comments mr-1 me-2"></span>1804
                </span>
              </div>
              <div>
                <span class="testitem-info"> 4 phần thi | 40 câu hỏi </span>
              </div>
            </div>

            <div class="testitem-tags mt-2">
              <span class="tag">IELTS Academic</span>
              <span class="tag">Listening</span>
            </div>
            <br />
          </a>
          <div class="testitem-start-test">
            <a class="text-dark"> </a>
            <RouterLink :to=" { name: 'testDetail', params: { id: 1 } } " class="btn btn-block btn-outline-primary">Chi tiết
            </RouterLink>
          </div>
        </div>
        <!-- exam test -->
        <div class="testitem-wrapper mt-2 me-2 p-3">
          <a class="text-dark" href="">
            <h2 class="testitem-title" id="ielts-simulation-listening-test-1">
              IELTS Simulation Listening test 1
            </h2>
            <div class="testitem-info-wrapper">
              <div>
                <span class="testitem-info">
                  <span class="far fa-clock mr-1 me-2"></span>40 phút |
                  <i class="fa-solid fa-user-pen me-2"></i>566811 |
                  <span class="far fa-comments mr-1 me-2"></span>1804
                </span>
              </div>
              <div>
                <span class="testitem-info"> 4 phần thi | 40 câu hỏi </span>
              </div>
            </div>

            <div class="testitem-tags mt-2">
              <span class="tag">IELTS Academic</span>
              <span class="tag">Listening</span>
            </div>
            <br />
          </a>
          <div class="testitem-start-test">
            <a class="text-dark"> </a>
            <RouterLink :to=" { name: 'testDetail', params: { id: 1 } } " class="btn btn-block btn-outline-primary">Chi tiết
            </RouterLink>
          </div>
        </div>

      </div>
    </div>
  </div>

  <nav class="jqpages mt-5">
    <div class="pagination">
      <span class="page-item active">
        <a class="page-link" href="?page=1">1</a>
      </span>

      <span class="page-item">
        <a class="page-link" href="?page=2">2</a>
      </span>

      <span class="page-item">
        <a class="page-link" href="?page=3">3</a>
      </span>

      <span class="page-item">
        <a class="page-link" href="?page=4">4</a>
      </span>

      <span class="page-item">
        <a class="page-link" href="?page=5">5</a>
      </span>

      <span class="page-item">
        <a class="page-link" href="?page=2"><i class="fas fa-chevron-right"></i></a>
      </span>
    </div>
  </nav>
</template>
<script>
export default {}
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

.testitem-wrapper {
  border: 1px solid black;
  border-radius: 5px;
  max-width: 350px;
  min-width: 300px;
  margin-left: 20px;
}

.testitem-start-test {
  margin-bottom: 10px
}
</style>
