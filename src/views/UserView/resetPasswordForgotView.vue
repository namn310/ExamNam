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
              Đổi Mật Khẩu
            </h3>
          </div>
          <form @submit.prevent=" submitResetPassword ">
            <div class="form-group mb-3 mt-3">
               <input type="text" class="form-control form-control-lg bg-light fs-6" placeholder="Nhập mã OTP"
                v-model=" OTP " required />
            </div>
            <div class="form-group mb-3 mt-3">
              <input type="password" class="form-control form-control-lg bg-light fs-6" placeholder="Mật khẩu mới"
                v-model=" newPassword " required />
            </div>
            <div class="form-group mb-3 mt-3">
              <input type="password" class="form-control form-control-lg bg-light fs-6"
                placeholder="Nhập lại mật khẩu mới" v-model=" confirmPassword " required />
            </div>
            <div class="input-group mb-2">
              <button class="btn btn-lg btn-warning w-100 fs-6" type="submit" id="submit">
                Đổi mật khẩu
              </button>
            </div>
          </form>
          <div class="row mt-3">
            <small>
              <RouterLink :to=" { name: 'Login' } "> Quay lại trang đăng nhập </RouterLink>
            </small>
          </div>
          <div class="mt-3 ms-5 d-flex justify-content-center" v-if=" showLoading ">
            <button class="btn btn-primary" type="button" disabled>
              <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
              <span role="status">Vui lòng chờ trong giây lát...</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resetPasswordForgot } from '@/service/usersService'
import { ElNotification } from 'element-plus'
import CryptoJS from 'crypto-js'
import Cookies from 'js-cookie';

export default {
  data () {
    return {
      OTP:'',
      newPassword: '',
      confirmPassword: '',
      token: '',
      // token: this.$route.query.token,
      url: './src/assets/img/LogoWeb.png',
      showLoading: false
    }
  },
  created () {
    this.getToken()
  },
  methods: {
    async submitResetPassword () {
      this.showLoading = true
      if (this.newPassword !== this.confirmPassword)
      {
        alert('Mật khẩu không đúng, vui lòng kiểm tra lại!')
        return
      }
      else
      {
        try
        {
          const response = await resetPasswordForgot({
            token: JSON.stringify(this.token),
            new_password: JSON.stringify(CryptoJS.MD5(this.newPassword).toString()),
            OTP: JSON.stringify(this.OTP)
          });
          if (response.message === 'Đổi mật khẩu thành công !')
          {
            ElNotification({
              title: 'Success',
              message: response.message,
              type: 'success'
            })
            this.showLoading = false
            Cookies.remove('tokenForgetPass')
            this.$router.push({ name: 'Login' })
          }
          else if (response.message === 'Mã OTP đã hết hiệu lực !')
          {
            ElNotification({
              title: 'Thông báo',
              message: response.message,
              type: 'error'
            })
            this.showLoading = false
          }
          else if (response.message === 'Không tồn tại Token hợp lệ !')
          {
            ElNotification({
              title: 'Thông báo',
              message: response.message,
              type: 'error'
            })
            this.showLoading = false
          }
          else
          {
          console.log(response.message)
            ElNotification({
              title: 'Thông báo',
              message: response.message,
              type: 'error'
            })
            this.showLoading = false
          }

        } catch (e)
        {
          ElNotification({
            title: 'Thông báo',
            message: 'Có lỗi xảy ra, vui lòng thử lại!',
            type: 'error'
          })
          this.showLoading = false
        }
      }
    },
    getToken () {
      this.token = Cookies.get('tokenForgetPass')
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