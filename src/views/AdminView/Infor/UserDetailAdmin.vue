<template>
  <div class="d-flex justify-content-center" style="margin-top: 100px;" v-if=" loadingShow ">
    <div> <svg viewBox="0 0 240 240" height="120" width="120" class="pl ms-2">
        <circle stroke-linecap="round" stroke-dashoffset="-330" stroke-dasharray="0 660" stroke-width="20" stroke="#000"
          fill="none" r="105" cy="120" cx="120" class="pl__ring pl__ring--a"></circle>
        <circle stroke-linecap="round" stroke-dashoffset="-110" stroke-dasharray="0 220" stroke-width="20" stroke="#000"
          fill="none" r="35" cy="120" cx="120" class="pl__ring pl__ring--b"></circle>
        <circle stroke-linecap="round" stroke-dasharray="0 440" stroke-width="20" stroke="#000" fill="none" r="70"
          cy="120" cx="85" class="pl__ring pl__ring--c"></circle>
        <circle stroke-linecap="round" stroke-dasharray="0 440" stroke-width="20" stroke="#000" fill="none" r="70"
          cy="120" cx="155" class="pl__ring pl__ring--d"></circle>
      </svg>
      <p>Loading ... </p>
    </div>
  </div>
  <div v-else class="d-flex p-5">
    <!-- ảnh -->
    <div class="d-flex flex-column text-center justify-content-between"
      style="background-color: azure; box-shadow: 5px 5px beige">
      <div style="padding: 40px">
        <img :src=" url " class="img-fluid align-items-center" style="max-width: 200px; max-height: 200px" />
        <p style="font-weight: 500; font-size: 3.5vw; font-size: 3.5vh">{{ data.name }}</p>
        <p style="font-weight: 400; font-size: 1.7vw; font-size: 1.7vh">Chức vụ: {{ data.role }}</p>
      </div>
    </div>
    <!-- thông tin cá nhân -->
    <div style="margin-left: 70px; width: 100%">
      <div>
        <div class="d-flex nav">
          <p id="nav_item" style="cursor: pointer" class="p-2" @click="UserInforActive()">
            <strong> Thông tin tài khoản</strong>
          </p>
          <p id="nav_item" class="p-2" style="margin-left: 30px; cursor: pointer" @click="UserPassActive()"
            v-if=" type_account == 'account' ">
            <strong>Đổi mật khẩu </strong>
          </p>
        </div>
        <!-- infor -->
        <div class="user-infor mt-5" v-if=" userInforShow == true ">
          <form>
            <div class="d-flex">
              <p style="word-wrap: none">Tên</p>
              <input class="form-control ms-4" type="text" v-model=" data.name " />
            </div>
            <div class="d-flex mt-4">
              <p style="word-wrap: none">Email</p>
              <input class="form-control ms-2" type="text" v-model=" data.email " />
              <button @click="openModalChangeEmail()" class="ms-2" type="button" data-bs-toggle="modal"
                data-bs-target="#exampleModal"><i class="fa-solid fa-pen-to-square fa-lg"></i></button>
              <div class="modal fade" id="exampleModal" tabindex="-1" @hide="resetEmail()">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Email</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <label for="password" class="form-label">Mật khẩu</label>
                      <input type="password" id="password" class="form-control border border-secondary"
                        placeholder="Nhập mật khẩu của bạn" v-model=" password ">
                      <label for="emailChangeInput" class="form-label mt-3">Email</label>
                      <input type="text" @input="validateEmail()" id="emailChangeInput"
                        class="form-control border border-secondary" v-model=" email ">
                      <p class="text-danger" v-if=" ErrorEmail !== '' ">{{ ErrorEmail }}</p>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" class="btn btn-primary" @click="updateEmailFetch()">Cập nhật</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex mt-4">
              <p style="word-wrap: none">
                Thời gian tạo: <strong class="ms-2">{{ data.create_at }} </strong>
              </p>
            </div>
          </form>
        </div>
        <!-- change pass -->
        <div class="user-pass mt-5" v-if=" userPassShow == true ">
          <!-- <form> -->
          <div class="d-flex">
            <input class="form-control border border-primary" placeholder="Nhập mật khẩu cũ" type="password"
              v-model=" pass.oldpass " />
          </div>
          <div class="mt-4">
            <input placeholder="Nhập mật khẩu mới" class="form-control border border-primary"
              :class=" { 'is-valid': checkPassClass == true, 'is-invalid': checkPassClass == false } "
              @input=" validatePass " type="password" v-model=" pass.newpass " />
            <p class="text-danger" v-if=" ErrorPass !== '' ">{{ ErrorPass }}</p>
          </div>
          <div class="mt-4">
            <input placeholder="Nhập lại mật khẩu mới" :class=" {
              'is-valid': checkConfirmPassClass == true,
              'is-invalid': checkConfirmPassClass == false
            } " class="form-control border border-primary" @input=" validateConfirmPass " type="password"
              v-model=" confirmnewpass " />
            <p class="text-danger" v-if=" ErrorConfirmPassword !== '' ">{{ ErrorConfirmPassword }}</p>
          </div>
          <div class="d-flex justify-content-center">
            <button @click=" ChangePass " class="btn btn-primary mt-4 align-items-center text-center">
              Đổi mật khẩu
            </button>
          </div>

          <!-- </form> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { decodeToken } from '@/service/decodeToken'
import { getUserDetail, changePassAdmin, updateEmailUser } from '@/service/usersService'
// thư viện mã hóa pass
import CryptoJS from 'crypto-js'

import { ElNotification } from 'element-plus'

export default {
  data () {
    return {
      loadingShow: true,
      type_account: '',
      url: '../src/assets/img/3607444.png',
      data: [],
      id: null,
      pass: {
        oldpass: null,
        newpass: null
      },
      confirmnewpass: null,
      userInforShow: true,
      userPassShow: false,
      ErrorPass: null,
      ErrorConfirmPassword: null,
      checkPassClass: null,
      checkConfirmPassClass: null,
      email: '',
      ErrorEmail: '',
      EmailValid: null,
      password: '',
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    async updateEmailFetch () {
      if (this.ErrorEmail === '' && this.email !== this.data.email && this.password !== '')
      {
        const result = await updateEmailUser(this.id, {
          email: this.email,
          password: this.password
        })
        if (result)
        {
          const message = result.message

          if (message === 'Cập nhật thành công !')
          {
            ElNotification({
              title: 'Thông báo',
              message: "Cập nhật thành công",
              type: 'success'
            })
            this.data.email = this.email
          }
          else if (message === 'Mật khẩu không chính xác !')
          {
            ElNotification({
              title: 'Thông báo',
              message: message,
              type: 'error'
            })
          }
          else
          {
            ElNotification({
              title: 'Thông báo',
              message: message,
              type: 'error'
            })
          }
        }
        else
        {
          ElNotification({
            title: 'Thông báo',
            message: "Có lỗi xảy ra !",
            type: 'error'
          })
        }
      }
      else if (this.email === this.data.email && this.password !== '')
      {
        alert("Bạn hiện tại đang dùng email này cho tài khoản rồi !")
      }
      else if (this.password === '')
      {
        alert("Vui lòng nhập mật khẩu !")
      }
      else
      {
        alert("Vui lòng kiểm tra lại Email")
      }
    },
    openModalChangeEmail () {
      this.password = ''
      this.email = this.data.email
      this.validateEmail()
    },
    // nếu người dùng nhập xong nhưng mà tắt modal đi thì khôi phục lại email trong modal về email gốc
    resetEmail () {
      this.password = ''
      this.email = this.data.email
      this.validateEmail()
    },
    validateEmail () {
      const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
      if (this.email === '')
      {
        this.ErrorEmail = 'Vui lòng nhập Email';
        this.EmailValid = false
      } else if (!regex.test(this.email))
      {
        this.ErrorEmail = 'Email không hợp lệ'
        this.EmailValid = false
      } else
      {
        this.ErrorEmail = '';
        this.EmailValid = true
      }
    },
    async getUser () {
      try
      {
        const decode = decodeToken()
        this.type_account = decode.data.type_account
        this.id = decode.data.id
        // console.log(decode);
        const data2 = await getUserDetail(this.id)
        this.data = data2.data
        // console.log(this.data)
        this.loadingShow = false
      }
      catch (e)
      {
        this.loadingShow = false
        alert("Có lỗi xảy ra trong quá trình lấy dữ liệu")
      }
    },
    UserInforActive () {
      this.userPassShow = false
      this.userInforShow = true
    },
    UserPassActive () {
      this.userPassShow = true
      this.userInforShow = false
    },
    validatePass () {
      const regex = /^.{6,}$/
      if (this.pass.newpass === '')
      {
        this.checkPassClass == false
        return false
      } else if (!regex.test(this.pass.newpass))
      {
        this.ErrorPass = 'Mật khẩu tối thiểu 6 ký tự'
        this.checkPassClass == false
        return false
      } else
      {
        this.ErrorPass = ''
        this.checkPassClass == true
        return true
      }
    },

    validateConfirmPass () {
      if (this.confirmnewpass !== this.pass.newpass)
      {
        this.ErrorConfirmPassword = 'Mật khẩu không khớp'
        this.checkConfirmPassClass == false
        return false
      } else
      {
        this.ErrorConfirmPassword = ''
        this.checkConfirmPassClass == true
        return true
      }
    },
    async ChangePass () {
      if (this.ErrorConfirmPassword !== '' && this.ErrorPass !== '')
      {
        alert('Vui lòng điền đầy đủ thông tin')
      } else
      {
        try
        {
          const request = await changePassAdmin(this.id, {
            oldpass: JSON.stringify(CryptoJS.MD5(this.pass.oldpass).toString()),
            newpass: JSON.stringify(CryptoJS.MD5(this.pass.newpass).toString())
          })
          if (request)
          {
            if (request === 'Cập nhật mật khẩu thành công')
            {
              ElNotification({
                title: 'Thông báo',
                message: 'Cập nhật mật khẩu thành công !',
                type: 'success'
              })
            } else
            {
              ElNotification({
                title: 'Thông báo',
                message: 'Mật khẩu cũ không chính xác !',
                type: 'error'
              })
            }
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
<style lang="css" scoped>
#nav_item:hover {
  color: blue;
}

.nav_active {
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-radius: 2px;
}
</style>
