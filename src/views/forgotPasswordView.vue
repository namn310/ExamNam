<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100 mt-5">
    <div class="row border rounded-5 p-3 bg-white shadow box-area">
      <div
        class="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
        style="background: #ffe4da"
      >
        <div class="mb-3">
          <img class="img-fluid mt-3" :src="url" style="width: 100%" />
        </div>
      </div>
      <div class="col-md-6 right-box">
        <div class="row align-items-center">
          <div class="header-text mb-4">
            <h3 class="text-center" style="font-weight: 600; font-size: 5vw; font-size: 5vh">
              Quên Mật Khẩu
            </h3>
          </div>
          <form @submit.prevent="submitForgotPassword">
            <div class="form-group mb-3 mt-3">
              <input
                type="email"
                class="form-control form-control-lg bg-light fs-6"
                placeholder="Nhập email của bạn"
                v-model="email"
                required
              />
            </div>
            <div class="input-group mb-2">
              <button class="btn btn-lg btn-warning w-100 fs-6" type="submit" id="submit">
                Gửi link khôi phục mật khẩu
              </button>
            </div>
          </form>
          <div class="row mt-3">
            <small>
              Bạn nhớ mật khẩu?
              <RouterLink :to="{ name: 'Login' }"> Đăng Nhập </RouterLink>
            </small>
          </div>
          <div class="mt-3 ms-5 d-flex justify-content-center" v-if="showLoading">
            <button class="btn btn-primary" type="button" disabled>
              <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
              <span role="status">Vui lòng chờ trong giây lát...</span>
            </button>
          </div>
          <div class="mt-4">
            <p><i>Trong trường hợp không thấy Gmail gửi về hãy kiểm tra trong thư mục thư spam</i></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { forgotPasswordView } from '@/service/usersService'
import { ElNotification } from 'element-plus'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      id: '',
      email: '',
      url: './src/assets/img/LogoWeb.png',
      showLoading:false
    }
  },
  methods: {
    async submitForgotPassword () {
      this.showLoading = true
      try {
        const response = await forgotPasswordView({ email: this.email })
        if (response)
        {
          if (response.message === "Email đã gửi !")
          {
            ElNotification({
              title: 'Thông báo',
              message: 'Vui lòng truy cập vào Email để lấy mã OTP !',
              type:'success'
            })
            this.showLoading = false
              Cookies.set('tokenForgetPass', response.tokenResetPass, {
                expires: 1, //set life cookie 1 ngày,
                secure: true,
                samesite: 'Strict'
              })
              this.$router.push({name:'reset-passwordForgot'})
          }
          else if (response.message === 'Email không tồn tại !')
          {
            ElNotification({
              title: 'Thông báo',
              message: response.message,
              type:'error'
            })
            this.showLoading = false
          }
          else
          {
            ElNotification({
              title: 'Thông báo',
              message: 'Có lỗi xảy ra !',
              type:'error'
            })
            this.showLoading = false
          }
        }
      } catch (e) {
        console.log(e)
        this.showLoading = false
      }
    }
  }
}
</script>

<style scoped>
.left-box {
  background-color: #ffe4da;
}
a {
  color: blue;
}
</style>
