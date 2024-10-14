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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { forgotPasswordView } from '@/service/usersService'


export default {
  data() {
    return {
      id: '',
      email: '',
      url: './src/assets/img/LogoWeb.png'
    }
  },
  methods: {
    async submitForgotPassword() {
      try {
        const response = await forgotPasswordView({ email: this.email, id: this.id })
        alert(response.message)
      } catch (e) {
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
