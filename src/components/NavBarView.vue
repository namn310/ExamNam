<template>
  <div class="topnav1 topnav-wrapper">
    <div class="topnav-container">
      <nav class="navbar navbar-expand-lg">
        <span class="navbar-brand">
          <a class="topnav-brand ms-4" href="/"> <img :src=" imgageLogo " style="width:90px;height:90px"
              class="topnav-logo image-fluid" />ExamTutor </a>
        </span>
        <!-- small menu -->
        <div class="dropdown">
          <button class="navbar-toggler pull-xs-right d-lg-none btn btn-primary dropdown-toggle" type="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-bars fa-lg mt-3 mb-3 ms-2"></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-end d-lg-none" aria-labelledby="dropdownMenuButton1">
            <li class="nav-item">
              <RouterLink class="nav-link" :to=" { name: 'home' } "><i class="fa-solid fa-book-open fa-xl me-2"></i> Đề
                thi online</RouterLink>
            </li>
            <li class="nav-item" v-if=" !checkToken() ">
              <RouterLink class="nav-link" :to=" { name: 'Login' } "> <i
                  class="fa-solid fa-door-open fa-lg me-3"></i>Đăng nhập</RouterLink>
            </li>
            <li v-if=" checkToken() " class="nav-item">
              <RouterLink class="nav-link" :to=" { name: 'ResultExam' } "><i class="fa-solid fa-circle-user fa-xl"
                  style="margin-right:15px"></i>Tài khoản
              </RouterLink>
            </li>
            <li v-if=" checkToken() " class="nav-item">
              <RouterLink class="nav-link" :to=" { name: 'reset-password' } ">
                <i class="fa-solid fa-unlock fa-xl me-3"></i>Đổi mật khẩu
              </RouterLink>
            </li>
            <!-- <li v-if=" checkToken() " class="nav-item">
              <RouterLink class="nav-link" :to=" { name: 'ResultExam' } ">
                <i class="fa-solid fa-square-poll-horizontal fa-xl me-3"></i>Kết quả làm bài
              </RouterLink>
            </li> -->
            <li v-if=" checkToken() " class="nav-item"><i
                class="fa-solid fa-arrow-right-from-bracket fa-xl me-3"></i>Đăng xuất</li>
          </ul>
        </div>
        <!-- end small menu -->
        <div class="d-lg-block navbar-collapse justify-content-end collapse-hidden" id="navbar-collapse">
          <ul class="nav">
            <li class="nav-item">
              <RouterLink class="nav-link" :to=" { name: 'home' } ">Đề thi online</RouterLink>
            </li>
            <li v-if=" !checkToken() ">
              <RouterLink :to=" { name: 'Login' } ">Đăng nhập</RouterLink>
            </li>
            <!-- toogle khi user đã đăng nhập -->
            <li v-if=" checkToken() " class="ms-3">
              <button class="btn btn-white" @click=" toggleUser ">
                <i class="fa-solid fa-circle-user fa-xl" style="color: #000000"></i><i
                  class="fa-solid fa-chevron-down fa-xs ms-3"></i>
              </button>
            </li>
            <!-- toggle user function -->
            <div v-show=" UserToggleVisible ">
              <div class="toggleFunctionUserContainer">
                <ul>
                  <RouterLink :to=" { name: 'ResultExam' } ">
                    <li class="nav-link-largeMenu">
                      Tài khoản
                    </li>
                  </RouterLink>
                  <RouterLink :to=" { name: 'reset-password' } " v-if=" type_account == 'account' ">
                    <li class="nav-link-largeMenu">Đổi mật khẩu</li>
                  </RouterLink>
                  <!-- <RouterLink :to=" { name: 'ResultExam' } ">
                    <li class="nav-link-largeMenu">Kết quả làm bài</li>
                  </RouterLink> -->
                  <li class="nav-link-largeMenu" style="cursor: pointer;" @click="logOut()">Đăng xuất</li>
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
import Cookies from 'js-cookie';
import { decodeTokenStudent } from '@/service/decodeToken'
// nếu không thì để ảnh ở trong file public thì có thể dùng đường dẫn tuyệt đối để dẫn truyền file
export default {
  name: 'NavBarView',
  data () {
    return {
      type_account: '',
      visible: false,
      UserToggleVisible: false,
      imgageLogo: LogoWeb,
    }
  },
  created () {
    this.checkToken()
    // console.log(this.type_account)
  },
  methods: {
    toggleMenu () {
      this.visible = !this.visible
    },
    toggleUser () {
      this.UserToggleVisible = !this.UserToggleVisible
    },
    checkToken () {
      if (Cookies.get('tokenStudent') !== undefined)
      {
        const user = decodeTokenStudent()
        this.type_account = user.data.type_account
        return true;
      }
      else
      {
        return false;
      }
    },
    logOut () {
      Cookies.remove('tokenStudent');
      // Cookies.remove('tokenAdmin');
      window.location.reload();
    }
  },
  watch: {
    // Theo dõi sự thay đổi của token
    'checkToken': function () {
      this.$forceUpdate();
    }
  }
}
</script>
<style scoped lang="css">
.dropdown-menu li .nav-link {
  color: black
}

.dropdown-menu li {
  color: black;
  margin-top: 10px;
  padding-left: 10px;
}

.dropdown-menu-end.nav-item:hover {
  background: linear-gradient(90deg, #74C0FC 0%, #4D91F7 100%) !important;
  color: white !important;
}

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

.d-lg-block {
  display: none;
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
  min-width: 30%;
  background-color: #fff;
  opacity: 1;
  position: absolute;
  top: 69px;
  right: -20px;
  box-shadow: 5px 5px 5px black;
}

.menuSmallContainer ul li {
  color: #35509a;
  z-index: 4;
  list-style-type: none;
  height: 30px;
  padding: 10px;
  border-radius: 10px;
  font-size: 2vw;
  font-size: 2vh;
  margin-bottom: 10px;
  /* background-color: bisque; */
}

@media (min-width: 992px) {
  .menuSmall {
    display: none;
  }
}

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

.nav-link-largeMenu {
  padding: 4px;
  border-radius: 10px;
}

.nav-link-largeMenu:hover {
  background-color: #4D91F7;
  color: white;
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
