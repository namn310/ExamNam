<template>
  <div class="topnav1 topnav-wrapper">
    <div class="topnav-container">
      <nav class="navbar navbar-expand-lg">
        <span class="navbar-brand">
          <a class="topnav-brand ms-4" href="/"> <img :src="imgageLogo" style="width:90px;height:90px" class="topnav-logo image-fluid"/>ExamTutor </a>
        </span>
        <button @click=" toggleMenu " class="navbar-toggler pull-xs-right d-lg-none" type="button"
          data-toggle="collapse" data-target="#navbar-collapse">
          ☰
        </button>
        <!-- small menu -->
        <div v-show=" visible " class="menuSmallContainer">
          <div class="menuSmall pt-3">
            <ul>
              <li class="nav-item">
                <RouterLink class="nav-link" :to=" { name: 'home' } ">Đề thi online</RouterLink>
              </li>
              <li class="nav-item">
                <a class="nav-link">Kết quả thi</a>
              </li>
              <li>
                <RouterLink :to=" { name: 'Login' } ">Đăng nhập</RouterLink>
              </li>
            </ul>
          </div>
        </div>
        <!-- end small menu -->
        <div class="d-lg-block navbar-collapse justify-content-end collapse-hidden" id="navbar-collapse">
          <ul class="nav">
            <li class="nav-item">
              <RouterLink class="nav-link" :to=" { name: 'home' } ">Đề thi online</RouterLink>
            </li>
            <li class="nav-item">
              <a class="nav-link">Kết quả thi</a>
            </li>
            <li>
              <RouterLink :to=" { name: 'Login' } ">Đăng nhập</RouterLink>
            </li>
            <!-- toogle khi user đã đăng nhập -->
            <li class="ms-3">
              <button class="btn btn-white" @click="toggleUser">
                <i class="fa-solid fa-circle-user fa-xl" style="color: #000000"></i><i
                  class="fa-solid fa-chevron-down fa-xs ms-3"></i>
              </button>
            </li>
            <!-- toggle user function -->
              <div v-show=" UserToggleVisible ">
            <div class="toggleFunctionUserContainer">
                <ul>
                  <li>Tài khoản</li>
                  <RouterLink :to="{name:'ResultExam'}"><li>Kết quả làm bài</li></RouterLink>
                  <li>Đăng xuất</li>
                </ul>
              </div>
            </div>
            <!-- end toggle user function -->
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>
<script>
// nếu để ảnh ở trong mục src thì để tránh lỗi không hiển thị đc ảnh khi load trang thì ta nên import ảnh 
import LogoWeb from '@/assets/img/LogoWeb.png'
// nếu không thì để ảnh ở trong file public thì có thể dùng đường dẫn tuyệt đối để dẫn truyền file
export default {
  name: 'NavBarView',
  data () {
    return {
      visible: false,
      UserToggleVisible: false,
      imgageLogo: LogoWeb
    }
  },
  methods: {
    toggleMenu () {
      this.visible = !this.visible
    },
    toggleUser () {
      this.UserToggleVisible = !this.UserToggleVisible
    }
  }
}
</script>
<style scoped lang="css">
.topnav1 {
  box-shadow: 0 4px 4px -4px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.topnav-wrapper {
  background-color: #fff;
  z-index: 1001;
}

.topnav-container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding-right: 0.775rem;
  padding-left: 0.775rem;
}

.topnav1 .navbar {
  padding: 0;
}

@media (min-width: 992px) {
  .navbar-expand-lg {
    flex-flow: row nowrap;
    justify-content: flex-start;
  }
}

.navbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.topnav1 .navbar-brand {
  height: 90px;
  padding-top: 0;
  padding-bottom: 0;
  display: flex;
  align-items: center;
  margin-right: 0;
}

.navbar-brand {
  display: inline-block;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: 1rem;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap;
}

.topnav1 .navbar-brand .topnav-brand:visited {
  text-decoration: none;
}

.topnav1 .navbar-brand .topnav-brand {
  font-size: 28px;
  line-height: 60px;
  letter-spacing: -0.75px;
  color: #0a0a0a;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

/* nav small */
.menuSmallContainer {
  height: 10000px;
  width: 30%;
  background-color: darkgrey;
  opacity: 1;
  position: absolute;
  top: 69px;
  right: 0;
}

.menuSmal {}

.menuSmallContainer ul li {
  color: black;
  z-index: 4;
  list-style-type: none;
  font-size: 2vw;
  font-size: 2vh;
  margin-bottom: 10px;
}

.menuSmallContainer ul li a {
  text-decoration: none;
  color: #35509a;
}

/* end nav small */

/* toggleFunctionUserContainer */
.toggleFunctionUserContainer {
  position: absolute;
  top: 65px;
  right: 25px;
  border-radius: 10px;
  max-width: 265px;
  padding: 12px;
  border: 0;
  background: #fff;
  -webkit-box-shadow:
    0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 5px 8px 0 rgba(0, 0, 0, 0.14),
    0 1px 14px 0 rgba(0, 0, 0, 0.12);
  box-shadow:
    0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 5px 8px 0 rgba(0, 0, 0, 0.14),
    0 1px 14px 0 rgba(0, 0, 0, 0.12);
}

.toggleFunctionUserContainer ul {
  list-style-type: none;
}

.toggleFunctionUserContainer ul li {
  margin-bottom: 15px;
}

/* end toggleFunctionUserContainer */
a {
  cursor: pointer;
  color: #35509a;
  text-decoration: none;
  background-color: transparent;
}

@media (min-width: 992px) {
  .navbar-expand-lg .navbar-collapse {
    display: flex !important;
    flex-basis: auto;
  }

  .collapse-hidden:not(.show) {
    display: none;
  }

  .justify-content-end {
    justify-content: flex-end !important;
  }
}

@media (min-width: 992px) {
  .d-lg-block {
    display: block !important;
  }

  .navbar-collapse {
    flex-basis: 100%;
    flex-grow: 1;
    align-items: center;
  }
}

.topnav1 .nav {
  align-items: center;
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

.form-control,
.form-control:focus,
body,
html,
input,
input:focus,
li,
ol,
p,
textarea,
textarea:focus,
ul {
  color: #1a1a1a;
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
</style>
