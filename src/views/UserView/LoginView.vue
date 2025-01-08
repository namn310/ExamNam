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
              <label class="form-check-label" for="flexRadioDefault1"> Quản trị viên </label>
            </div>
            <div class="form-check text-start">
              <input v-model=" data.role " class="form-check-input" type="radio" name="flexRadioDefault"
                id="flexRadioDefault3" value="teacher" />
              <label class="form-check-label" for="flexRadioDefault3"> Giáo viên </label>
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
          <!-- kích hoạt tài khoản -->
          <div class="input-group mb-2">
            <button class="btn btn-lg btn-primary w-100 fs-6" id="submit" data-bs-toggle="modal"
              data-bs-target="#ModalOTP" v-if=" ActiveAccountButton === true" @click="SendToken()">
              <a style="text-decoration: none; color: white">Kích hoạt tài khoản</a>
            </button>
          </div>
          <!-- modal nhập otp -->
          <div class="modal fade" id="ModalOTP" tabindex="-1">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Nhập OTP</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="" v-if=" loadSendTokenShow == true ">
                    <div class="alert alert-info d-flex justify-content-center" role="alert">
                      <div class="spinner-grow text-primary me-2" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                      <p>Vui lòng chờ trong giây lát ...</p>
                    </div>
                  </div>
                  <div>
                    <p>
                      Vui lòng nhập mã OTP được gửi về Gmail của bạn để xác thực đăng ký
                      <i>(Lưu ý mã OTP chỉ có hiệu lực trong 30 phút từ thời điểm gửi)</i>
                    </p>
                    <input class="form-control border border-secondary mt-2 mb-2" placeholder="Mã OTP" id="OTP"
                      name="OTP" v-model=" OTP " />
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                    Cancel
                  </button>
                  <button type="button" class="btn btn-primary" @click="submitActiveUser()">
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- đăng nhập google -->
          <div class="input-group mb-3">
            <button class="btn btn-lg btn-white w-100 fs-6 border border-dark d-flex justify-content-center"
              type="submit" id="submit">
              <div>
                <img :src=" iconGoogle " style="width: 30px; height: 30px" class="img-fluid me-2" />
              </div>
              <div>
                <a style="text-decoration: none; color: black" @click="loginGoogle()">Đăng nhập bằng Google</a>
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
import { Login, sendOTPRegist,activeAccount } from '@/service/usersService'
import Cookies from 'js-cookie'
// eslint-disable-next-line no-unused-vars
import { googleAuthCodeLogin } from 'vue3-google-login'
// eslint-disable-next-line no-unused-vars
import { googleTokenLogin } from 'vue3-google-login'
import { googleSdkLoaded } from 'vue3-google-login'
import { ElNotification } from 'element-plus'
export default {
  data () {
    return {
      url: './src/assets/img/LogoWeb.png',
      iconGoogle: './src/assets/img/google_icon.png',
      data: {
        email: '',
        password: '',
        role: 'student'
      },
      ActiveAccountButton: false,
      token: '',
      loadSendTokenShow: false,
      OTP: ''
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
          console.log(response)
          if (this.data.role == 'student')
          {
            if (response.message === 'Đăng nhập thành công !')
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
            } else if (
              response.message === 'Đăng nhập thất bại ! Tài khoản hoặc mật khẩu không chính xác'
            )
            {
              ElNotification({
                title: 'Thông báo',
                message: response.message,
                type: 'error'
              })
            } else if (
              response.message === 'Tài khoản chưa được kích hoạt ! Vui lòng kích hoạt tài khoản'
            )
            {
              this.ActiveAccountButton = true
              ElNotification({
                title: 'Thông báo',
                message: response.message,
                type: 'error'
              })
            } else
            {
              ElNotification({
                title: 'Thông báo',
                message: 'Có lỗi xảy ra. Vui lòng thử lại sau',
                type: 'error'
              })
            }
          }
          // nếu role là admin
          if (this.data.role == 'admin')
          {
            if (response.message === 'Đăng nhập thành công !')
            {
              Cookies.set('tokenAdmin', response.jwtAdmin, {
                expires: 1, //set life cookie 1 ngày,
                secure: true,
                samesite: 'Strict'
                // httponly: true
              })
              // alert(response.message)
              this.$router.push({ name: 'homeAdmin' })
            } else if (
              response.message === 'Đăng nhập thất bại ! Tài khoản hoặc mật khẩu không chính xác'
            )
            {
              ElNotification({
                title: 'Thông báo',
                message: response.message,
                type: 'error'
              })
            } else if (
              response.message === 'Tài khoản chưa được kích hoạt ! Vui lòng kích hoạt tài khoản'
            )
            {
              ElNotification({
                title: 'Thông báo',
                message: response.message,
                type: 'error'
              })
            } else
            {
              ElNotification({
                title: 'Thông báo',
                message: 'Có lỗi xảy ra. Vui lòng thử lại sau',
                type: 'error'
              })
            }
          }
            // nếu role là teacher
          if (this.data.role == 'teacher')
          {
            if (response.message === 'Đăng nhập thành công !')
            {
              Cookies.set('tokenAdmin', response.jwtAdmin, {
                expires: 1, //set life cookie 1 ngày,
                secure: true,
                samesite: 'Strict'
                // httponly: true
              })
              // alert(response.message)
              this.$router.push({ name: 'homeAdmin' })
            } else if (
              response.message === 'Đăng nhập thất bại ! Tài khoản hoặc mật khẩu không chính xác'
            )
            {
              ElNotification({
                title: 'Thông báo',
                message: response.message,
                type: 'error'
              })
            } else if (
              response.message === 'Tài khoản chưa được kích hoạt ! Vui lòng kích hoạt tài khoản'
            )
            {
              ElNotification({
                title: 'Thông báo',
                message: response.message,
                type: 'error'
              })
            } else
            {
              ElNotification({
                title: 'Thông báo',
                message: 'Có lỗi xảy ra. Vui lòng thử lại sau',
                type: 'error'
              })
            }
          }
        } catch (e)
        {
          // nếu có lỗi thì báo lỗi
          alert(e)
        }
      }
    },
    async SendToken () {
      if (this.data.email !== '')
      {
        this.loadSendTokenShow = true
        this.token = this.generateRandomToken()
        const response = await sendOTPRegist({
          email: this.data.email,
          role: this.data.role,
          type_token: 'activeAccount',
          tk: this.token
        })
        if (response)
        {
          this.loadSendTokenShow = false
          if (response.message === 'Mã OTP đã được gửi')
          {
            ElNotification({
              title: 'Thông báo',
              message: 'Mã OTP đã được gửi',
              type: 'success'
            })
            // hiển thị nút nhập token
          } else if (response.message === 'Email đã tồn tại !')
          {
            ElNotification({
              title: 'Thông báo',
              message: 'Email đã tồn tại !',
              type: 'error'
            })
          } else
          {
            ElNotification({
              title: 'Thông báo',
              message: 'Có lỗi xảy ra',
              type: 'error'
            })
          }
        } else
        {
          this.loadSendTokenShow = false
          alert('Có lỗi xảy ra !')
        }
      } else
      {
        alert('Vui lòng kiểm tra lại thông tin !')
      }
    },
      async submitActiveUser () {
      if (this.data.email !== '' && (this.OTP !== '') || this.OTP !== null)
      {
        const result = await activeAccount({
          email: (this.data.email),
          role: (this.data.role),
          OTP: this.OTP,
          token: this.token,
          type_token: 'activeAccount',
        })
        if (result)
        {
          console.log(result)
          var message = result.message
          // console.log(result,message)
          if (message === 'Mã OTP không hợp lệ')
          {
             ElNotification({
              title: 'Thông báo',
              message: message,
              type: 'error'
            })
          }
          else if(message === 'Email không tồn tại'){
             ElNotification({
              title: 'Thông báo',
              message: message,
              type: 'error'
            })
          }
          else if (message === 'Xác thực tài khoản thành công')
          {
             ElNotification({
              title: 'Thông báo',
              message: message,
              type: 'success'
             })
            this.$router.replace({ name: 'Login' }).then(() => {
              window.location.reload()
            })
          }
          else
          {
             ElNotification({
              title: 'Thông báo',
              message: "Có lỗi xảy ra ! Vui lòng thử lại sau",
              type: 'error'
            })
          }
        }
        else
        {
          alert("Có lỗi xảy ra !")
        }
      }
      else
      {
        alert("Kiểm tra lại thông tin !")
      }
    },
    generateRandomToken (length = 32) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let token = ''
      for (let i = 0; i < length; i++)
      {
        const randomIndex = Math.floor(Math.random() * characters.length)
        token += characters[randomIndex]
      }
      return token
    },
    async loginGoogle () {
      try
      {
        googleSdkLoaded((google) => {
          // Initialize the Google OAuth 2.0 client with the correct configuration
          google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // Your Google Client ID
            callback: (response) => {
              // This callback function will receive the ID token in response.credential
              // console.log("Google Login Response:", response);
              const idToken = response.credential // This is the ID token you need
              // console.log(idToken)
              this.verifyTokenGoogle(idToken) // Call your backend to verify the ID token
            }
          })

          // Prompt the user to log in with Google
          google.accounts.id.prompt() // This will display the Google login prompt
        })
      } catch
      {
        console.log('Error !')
      }
    },
    async verifyTokenGoogle (token) {
      try
      {
        const dataSend = {
          token: token,
          role: this.data.role
        }
        const sendData = await fetch('http://localhost:8080/users/loginGoogle', {
          method: 'POST',
          body: JSON.stringify(dataSend),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await sendData.json()
        // console.log(data)
        // kiểm tra token và điều hướng đến giao diện
        if (this.data.role == 'student')
        {
          if (data.jwtStudent)
          {
            Cookies.set('tokenStudent', data.jwtStudent, {
              expires: 1, //set life cookie 1 ngày,
              secure: true,
              samesite: 'Strict'
              // httponly: true
            })
            alert(data.message)
            this.$router.push({ name: 'home' }).then(() => {
              window.location.reload()
            })
          } else
          {
            alert(data.message)
          }
        }

        if (this.data.role == 'admin')
        {
          if (data.jwtAdmin)
          {
            Cookies.set('tokenAdmin', data.jwtAdmin, {
              expires: 1, //set life cookie 1 ngày,
              secure: true,
              samesite: 'Strict'
              // httponly: true
            })
          }
          alert(data.message)

          this.$router.push({ name: 'homeAdmin' })
        }
        // if (data.sucess)
        // {
        //   console.log('User authenticated successfully:', data);
        // }
        // else
        // {
        //   console.log('User authenticated successfully:', data);
        // }
      } catch (e)
      {
        console.log(e)
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
