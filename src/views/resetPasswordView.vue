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
                Đổi Mật Khẩu
              </h3>
            </div>
            <form @submit.prevent="submitResetPassword">
              <div class="form-group mb-3 mt-3">
              <input
                type="password"
                class="form-control form-control-lg bg-light fs-6"
                placeholder="Mật khẩu cũ"
                v-model="oldPassword"
                required
              />
            </div>
              <div class="form-group mb-3 mt-3">
                <input
                  type="password"
                  class="form-control form-control-lg bg-light fs-6"
                  placeholder="Mật khẩu mới"
                  v-model="newPassword"
                  required
                />
              </div>
              <div class="form-group mb-3 mt-3">
                <input
                  type="password"
                  class="form-control form-control-lg bg-light fs-6"
                  placeholder="Nhập lại mật khẩu mới"
                  v-model="confirmPassword"
                  required
                />
              </div>
              <div class="input-group mb-2">
                <button class="btn btn-lg btn-warning w-100 fs-6" type="submit" id="submit">
                  Đổi mật khẩu
                </button>
              </div>
            </form>
            <div class="row mt-3">
              <small>
                <RouterLink :to="{ name: 'Login' }"> Quay lại trang đăng nhập </RouterLink>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { resetPassword } from '@/service/usersService'
import Cookies from 'js-cookie';
  
  export default {
    data() {
      return {
        oldPassword:"",
        newPassword: '',
        confirmPassword: '',
<<<<<<< HEAD
        token: Cookies.get('tokenStudent'), // Assuming token is passed via query params
        url: './src/assets/img/LogoWeb.png' // Path to the logo image
=======
        token: this.$route.query.token, 
        url: './src/assets/img/LogoWeb.png' 
>>>>>>> 281ffce4a004fd6651073473c8d965cacb92ab9c
      }
    },
    methods: {
      async submitResetPassword() {
        if (!this.oldPassword){
          alert("Vui lòng điền đúng mật khẩu cũ")
          return
        }
        if (this.newPassword !== this.confirmPassword) {
          alert('Mật khẩu không đúng, vui lòng kiểm tra lại!')
          return
        }
        try {
          const response = await resetPassword({
            token: this.token,
            old_password: this.oldPassword,
            new_password: this.newPassword
          });
          console.log(response)
          this.$router.push({ name: 'Login' })
        } catch (e) {
          console.error(e)
          alert('Có lỗi xảy ra, vui lòng thử lại!')
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
  