<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100 mt-5">
    <div class="row border rounded-5 p-3 bg-white shadow box-area">
      <div class="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
        style="background: #ffe4da">
        <div class="mb-3">
          <img class="img-fluid mt-3" :src=" url " style="width: 100%" />
        </div>
      </div>
      <div class="col-md-6 right-box">
        <div class="row align-items-center">
          <div class="header-text mb-4">
            <h3 class="text-center" style="font-weight: 600; font-size: 5vw; font-size: 5vh">
              Đăng Nhập
            </h3>
          </div>
          <form id="loginForm" @submit.prevent=" checkLogin ">
            <p class="text-start mb-2" style="font-weight: 500">Bạn là :</p>
            <div class="form-check text-start">
              <input v-model=" data.role " class="form-check-input" type="radio" name="flexRadioDefault"
                id="flexRadioDefault1" value="admin" />
              <label class="form-check-label" for="flexRadioDefault1"> Giáo viên </label>
            </div>
            <div class="form-check text-start">
              <input v-model=" data.role " class="form-check-input" type="radio" name="flexRadioDefault"
                id="flexRadioDefault2" value="student" />
              <label class="form-check-label" for="flexRadioDefault2"> Học sinh </label>
            </div>
            <div class="form-group mb-3 mt-3">
              <input type="email" class="form-control form-control-lg bg-light fs-6" id="email_login" name="email"
                placeholder="Nhập Email của bạn" required v-model=" data.email " />
            </div>
            <div class="form-group mb-1">
              <input type="password" class="form-control form-control-lg bg-light fs-6" name="password" id="password"
                placeholder="Nhập mật khẩu" required v-model=" data.password " />
            </div>
            <div class="input-group mb-5 d-flex justify-content-between">
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="formCheck" />
                <label for="formCheck" class="form-check-label text-secondary"><small>Nhớ tài khoản!</small></label>
              </div>
              <div class="forgot">
                <!-- <small><a href="">Quên Mật Khẩu?</a></small> -->
                <small>
                  <RouterLink :to=" { name: 'forgot-password' } ">Quên Mật Khẩu?</RouterLink>
                </small>
                <!-- <small>  
                  <RouterLink :to=" { name: 'reset-password' } ">Đổi Mật Khẩu?</RouterLink>
                </small> -->
              </div>
            </div>
            <div class="input-group mb-2">
              <button class="btn btn-lg btn-warning w-100 fs-6" type="submit" id="submit">
                <a style="text-decoration: none; color: white">Đăng Nhập</a>
              </button>
            </div>
          </form>
          <div class="input-group mb-3">
            <button class="btn btn-lg btn-white w-100 fs-6 border border-dark d-flex justify-content-center"
              type="submit" id="submit">
              <div>
                <img :src=" iconGoogle " style="width:30px;height:30px" class="img-fluid me-2">
              </div>
              <div>
                <a style="text-decoration: none; color: black">Đăng nhập bằng Google</a>
              </div>
            </button>
          </div>
          <div class="row">
            <small>Bạn chưa có tài khoản? <RouterLink :to=" { name: 'register' } "> Đăng ký </RouterLink>
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Login } from '@/service/usersService'
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      url: './src/assets/img/LogoWeb.png',
      iconGoogle: './src/assets/img/google_icon.png',
      data: {
        email: '',
        password: '',
        role: 'student'
      }
    }
  },
  methods: {
    async checkLogin () {
      if (this.data.role == '')
      {
        alert('Vui lòng chọn hình thức đăng nhập !')
      } else
      {
        try
        {
          //   localStorage.removeItem('token')
          const response = await Login(this.data)
          if (this.data.role == 'student')
          {
            if (response.jwtStudent)
            {
              Cookies.set('tokenStudent', response.jwtStudent, {
                expires: 1, //set life cookie 1 ngày,
                secure: true,
                samesite: 'Strict'
                // httponly: true
              })
              alert(response.message)
              this.$router.push({ name: 'home' }).then(() => {
                window.location.reload()
              })
            }
            else
            {
              alert(response.message)
            }
          }

          if (this.data.role == 'admin')
          {
            if (response.jwtAdmin)
            {
              Cookies.set('tokenAdmin', response.jwtAdmin, {
                expires: 1, //set life cookie 1 ngày,
                secure: true,
                samesite: 'Strict'
                // httponly: true
              })
            }
            alert(response.message)

            this.$router.push({ name: 'homeAdmin' })
          }
        } catch (e)
        {
          alert(e)
        }
      }
    }
  }
}
</script>
<style scoped>
a {
  color: blue;
}
</style>
