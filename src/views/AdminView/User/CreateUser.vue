<template>
  <div class="mx-auto container bg-color-white">
    <div class="text-[30px] text-center">
      Thêm thông tin người dùng
    </div>
    <div style="margin-left:170px" class=" col-md-9 right-box">
      <div class="row align-items-center text-center mt-4">
        <form id="loginForm" method="post" @submit.prevent=" SendToken ">
          <p class="text-start mb-2" style="font-weight: 500;">Loại tài khoản : </p>
          <div class="d-flex">
            <div class="form-check text-start ">
              <input v-model=" data.role " class="form-check-input" type="radio" name="flexRadioDefault"
                id="flexRadioDefault2" value="student" style="border: 1px solid black;" />
              <label class="form-check-label" for="flexRadioDefault2">
                Học sinh
              </label>
            </div>
            <div class="form-check text-start ms-3">
              <input v-model=" data.role " class="form-check-input" type="radio" name="flexRadioDefault"
                id="flexRadioDefault2" value="teacher" style="border: 1px solid black;" />
              <label class="form-check-label" for="flexRadioDefault2">
                Giáo viên
              </label>
            </div>
            <div class="form-check text-start ms-3">
              <input v-model=" data.role " class="form-check-input" type="radio" name="flexRadioDefault"
                id="flexRadioDefault2" value="admin" style="border: 1px solid black;" />
              <label class="form-check-label" for="flexRadioDefault2">
                Quản trị viên
              </label>
            </div>
          </div>
          <div class="form-group mb-3 mt-2">
            <input type="username" @input="validateName()" name="name"
              :class=" { 'is-valid': NameValid == true, 'is-invalid': NameValid == false } "
              class="form-control form-control-lg bg-light fs-6" id="username" placeholder="Tên người dùng"
              v-model=" data.name " />
            <p class="text-danger" v-if=" ErrorName !== '' ">{{ ErrorName }}</p>
          </div>
          <div class="form-group mb-3">
            <input type="email" name="email"
              :class=" { 'is-valid': EmailValid == true, 'is-invalid': EmailValid == false } "
              class="form-control form-control-lg bg-light fs-6" id="email_signup" placeholder="Địa chỉ Email"
              v-model=" data.email " @input=" validateEmail " />
            <p class="text-danger" v-if=" ErrorEmail !== '' ">{{ ErrorEmail }}</p>
          </div>
          <div class="form-group mb-3">
            <input type="text" name="phone"
              :class=" { 'is-valid': PhoneValid == true, 'is-invalid': PhoneValid == false } "
              class="form-control form-control-lg bg-light fs-6" id="phone_signup" placeholder="Số điện thoại"
              v-model=" data.phone " @input=" validatePhone " />
            <p class="text-danger" v-if=" ErrorPhone !== '' ">{{ ErrorPhone }}</p>
          </div>
          <div class="form-group mb-3">
            <input type="password" name="pass"
              :class=" { 'is-valid': PassValid == true, 'is-invalid': PassValid == false } "
              class="form-control form-control-lg bg-light fs-6" id="password_signup" placeholder="Mật Khẩu"
              v-model=" data.password " @input=" validatePass " />
            <p class="text-danger" v-if=" ErrorPass !== '' ">{{ ErrorPass }}</p>
          </div>
          <div class="form-group mb-3">
            <input type="password" name="Repass"
              :class=" { 'is-valid': ConfirmPassValid == true, 'is-invalid': ConfirmPassValid == false } "
              class="form-control form-control-lg bg-light fs-6" id="Re_password_signup" placeholder="Nhập lại mật khẩu"
              v-model=" data.ConfirmPassword " @input=" validateConfirmPass " />
            <p class="text-danger" v-if=" ErrorConfirmPassword != '' ">{{ ErrorConfirmPassword }}</p>
          </div>
          <div style="width:40%;margin-left:250px" class="input-group mb-3">
            <button class="btn btn-lg btn-primary w-100 fs-6" type="submit" name="dangky" id="submit">
              Tạo tài khoản
            </button>
          </div>
        </form>
        <!-- load send token -->
        <div class="" v-if=" loadSendTokenShow == true ">
          <div class="alert alert-info d-flex justify-content-center" role="alert">
            <div class="spinner-grow text-primary me-2" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p>Vui lòng chờ trong giây lát ... </p>
          </div>
        </div>
        <br>
        <!-- Button trigger modal -->
        <button type="button" v-if=" loadButtonToken " class="btn btn-primary" data-bs-toggle="modal"
          data-bs-target="#ModalOTP">
          Nhập mã OTP
        </button>

        <!-- Modal nhập OTP -->
        <div class="modal fade" id="ModalOTP" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Nhập OTP</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div>
                  <p>Vui lòng nhập mã OTP được gửi về Gmail của bạn để xác thực đăng ký <i>(Lưu ý mã OTP chỉ có
                      hiệu lực trong 30 phút từ thời điểm gửi)</i> </p>
                  <input class="form-control border border-secondary mt-2 mb-2" placeholder="Mã OTP" id="OTP" name="OTP"
                    v-model=" OTP ">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" @click="submitCreateUser()">Xác nhận</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { createUser, sendOTPRegist, getUserDetail } from '@/service/usersService';
import { ElNotification } from 'element-plus'
// import Cookies from 'js-cookie'
import { decodeToken } from '@/service/decodeToken'

export default {
  data () {
    return {
      url: './src/assets/img/LogoWeb.png',
      data: {
        role: 'student',
        name: '',
        email: '',
        phone: '',
        password: '',
        ConfirmPassword: ''
      },
      NameValid: null,
      EmailValid: null,
      PhoneValid: null,
      PassValid: null,
      ConfirmPassValid: null,
      ErrorName: null,
      ErrorEmail: null,
      ErrorPhone: null,
      ErrorPass: null,
      ErrorConfirmPassword: null,
      loadSendTokenShow: false,
      loadButtonToken: false,
      OTP: '',
      token: ''
    }
  },
  created () {
    this.fetchUser()
  },
  methods: {
    async fetchUser () {
      const a = decodeToken()
      const data2 = await getUserDetail(a.data.id)
      if (data2.data.role !== 'admin')
      {
        this.$router.push({ name: 'homeAdmin' })
      }
      // console.log(data2.data.role)
    },
    async submitCreateUser () {
      if (this.NameValid == true && this.EmailValid == true && this.PhoneValid == true && this.PassValid == true && this.ConfirmPassValid == true && (this.OTP !== '') || this.OTP !== null)
      {
        const result = await createUser({
          email: (this.data.email),
          role: (this.data.role),
          name: this.data.name,
          phone: this.data.phone,
          password: this.data.password,
          OTP: this.OTP,
          token: this.token
        })
        if (result)
        {
          var message = result.message
          console.log(result, message)
          if (message === 'Mã OTP không hợp lệ')
          {
            ElNotification({
              title: 'Thông báo',
              message: message,
              type: 'error'
            })
          }
          else if (message === 'Email đã tồn tại')
          {
            ElNotification({
              title: 'Thông báo',
              message: message,
              type: 'error'
            })
          }
          else if (message === 'Đăng ký tài khoản thành công')
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
    async SendToken () {
      if (this.NameValid == true && this.EmailValid == true && this.PhoneValid == true && this.PassValid == true && this.ConfirmPassValid == true)
      {
        this.loadSendTokenShow = true
        this.token = this.generateRandomToken()
        const response = await sendOTPRegist({
          email: (this.data.email),
          role: (this.data.role),
          type_token: ('regist'),
          tk: this.token
        })
        if (response)
        {
          this.loadSendTokenShow = false
          if (response.message === 'Mã OTP đã được gửi')
          {
            ElNotification({
              title: 'Thông báo',
              message: "Mã OTP đã được gửi",
              type: 'success'
            })
            // hiển thị nút nhập token
            this.loadButtonToken = true
          }
          else if (response.message === 'Email đã tồn tại !')
          {
            ElNotification({
              title: 'Thông báo',
              message: "Email đã tồn tại !",
              type: 'error'
            })
          }
          else
          {
            ElNotification({
              title: 'Thông báo',
              message: "Có lỗi xảy ra",
              type: 'error'
            })
          }
        }
        else
        {
          this.loadSendTokenShow = false
          alert("Có lỗi xảy ra !")
        }
      }
      else
      {
        alert("Vui lòng kiểm tra lại thông tin !");
      }
    },
    generateRandomToken (length = 32) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let token = '';
      for (let i = 0; i < length; i++)
      {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters[randomIndex];
      }
      return token;
    },

    validateName () {
      const regex =
        /^[A-Za-z\sAÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+$/;
      if (this.data.name === '')
      {
        this.ErrorName = 'Tên không được để trống';
        this.NameValid = false
      } else if (!regex.test(this.data.name))
      {
        this.ErrorName = 'Tên không đúng định dạng'
        // console.log(this.ErrorName)
        this.NameValid = false
      } else
      {
        this.ErrorName = ''
        this.NameValid = true
      }
    },
    validatePhone () {
      const regex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
      if (this.data.phone === '')
      {
        this.ErrorPhone = 'Vui lòng nhập số điện thoại'
        this.PhoneValid = false
      } else if (!regex.test(this.data.phone))
      {
        this.ErrorPhone = 'Số điện thoại không hợp lệ'
        this.PhoneValid = false
      } else
      {
        this.ErrorPhone = ''
        this.PhoneValid = true
      }
    },
    validateEmail () {
      const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
      if (this.data.email === '')
      {
        this.ErrorEmail = 'Vui lòng nhập Email';
        this.EmailValid = false
      } else if (!regex.test(this.data.email))
      {
        this.ErrorEmail = 'Email không hợp lệ'
        this.EmailValid = false
      } else
      {
        this.ErrorEmail = '';
        this.EmailValid = true
      }
    },
    validatePass () {
      const regex = /^.{6,}$/
      if (this.data.password === '')
      {
        this.ErrorPass = 'Vui lòng nhập mật khẩu';
        this.PassValid = false
      } else if (!regex.test(this.data.password))
      {
        this.ErrorPass = 'Mật khẩu tối thiểu 6 ký tự';
        this.PassValid = false
      } else
      {
        this.ErrorPass = '';
        this.PassValid = true
      }
    },
    validateConfirmPass () {
      if (this.data.ConfirmPassword !== this.data.password)
      {
        this.ErrorConfirmPassword = 'Mật khẩu không khớp';
        this.ConfirmPassValid = false
      } else
      {
        this.ErrorConfirmPassword = '';
        this.ConfirmPassValid = true
      }
    }
  }
}
</script>
