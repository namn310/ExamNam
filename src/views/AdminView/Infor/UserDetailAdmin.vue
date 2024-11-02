<template>
  <div class="d-flex p-5">
    <!-- ảnh -->
    <div
      class="d-flex flex-column text-center justify-content-between"
      style="background-color: azure; box-shadow: 5px 5px beige"
    >
      <div style="padding: 40px">
        <img
          :src="url"
          class="img-fluid align-items-center"
          style="max-width: 200px; max-height: 200px"
        />
        <p style="font-weight: 500; font-size: 3.5vw; font-size: 3.5vh">{{ data.name }}</p>
      </div>
    </div>
    <!-- thông tin cá nhân -->
    <div style="margin-left: 70px; width: 100%">
      <div>
        <div class="d-flex nav">
          <p id="nav_item" style="cursor: pointer" class="p-2" @click="UserInforActive()">
            <strong> Thông tin tài khoản</strong>
          </p>
          <p
            id="nav_item"
            class="p-2"
            style="margin-left: 30px; cursor: pointer"
            @click="UserPassActive()"
          >
            <strong>Đổi mật khẩu </strong>
          </p>
        </div>
        <!-- infor -->
        <div class="user-infor mt-5" v-if="userInforShow == true">
          <form>
            <div class="d-flex">
              <p style="word-wrap: none">Họ tên</p>
              <input class="form-control ms-2" type="text" v-model="data.name" />
            </div>
            <div class="d-flex mt-4">
              <p style="word-wrap: none">Email</p>
              <input class="form-control ms-2" type="text" v-model="data.email" />
            </div>
            <div class="d-flex mt-4">
              <p style="word-wrap: none">
                Thời gian tạo: <strong class="ms-2">{{ data.create_at }} </strong>
              </p>
            </div>
          </form>
        </div>
        <!-- change pass -->
        <div class="user-pass mt-5" v-if="userPassShow == true">
          <!-- <form> -->
          <div class="d-flex">
            <input
              class="form-control border border-primary"
              placeholder="Nhập mật khẩu cũ"
              type="password"
              v-model="pass.oldpass"
            />
          </div>
          <div class="mt-4">
            <input
              placeholder="Nhập mật khẩu mới"
              class="form-control border border-primary"
              :class="{ 'is-valid': checkPassClass == true, 'is-invalid': checkPassClass == false }"
              @input="validatePass"
              type="password"
              v-model="pass.newpass"
            />
            <p class="text-danger" v-if="ErrorPass !== ''">{{ ErrorPass }}</p>
          </div>
          <div class="mt-4">
            <input
              placeholder="Nhập lại mật khẩu mới"
              :class="{
                'is-valid': checkConfirmPassClass == true,
                'is-invalid': checkConfirmPassClass == false
              }"
              class="form-control border border-primary"
              @input="validateConfirmPass"
              type="password"
              v-model="confirmnewpass"
            />
            <p class="text-danger" v-if="ErrorConfirmPassword !== ''">{{ ErrorConfirmPassword }}</p>
          </div>
          <div class="d-flex justify-content-center">
            <button @click="ChangePass" class="btn btn-primary mt-4 align-items-center text-center">
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
import { getUserDetail, changePassAdmin } from '@/service/usersService'
// thư viện mã hóa pass
import CryptoJS from 'crypto-js'

import { ElNotification } from 'element-plus'

export default {
  data() {
    return {
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
      checkConfirmPassClass: null
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    async getUser() {
      const decode = decodeToken()
      this.id = decode.data.id
      // console.log(decode);
      const data2 = await getUserDetail(this.id)
      this.data = data2.data
      // console.log(this.data)
    },
    UserInforActive() {
      this.userPassShow = false
      this.userInforShow = true
    },
    UserPassActive() {
      this.userPassShow = true
      this.userInforShow = false
    },
    validatePass() {
      const regex = /^.{6,}$/
      if (this.pass.newpass === '') {
        this.checkPassClass == false
        return false
      } else if (!regex.test(this.pass.newpass)) {
        this.ErrorPass = 'Mật khẩu tối thiểu 6 ký tự'
        this.checkPassClass == false
        return false
      } else {
        this.ErrorPass = ''
        this.checkPassClass == true
        return true
      }
    },

    validateConfirmPass() {
      if (this.confirmnewpass !== this.pass.newpass) {
        this.ErrorConfirmPassword = 'Mật khẩu không khớp'
        this.checkConfirmPassClass == false
        return false
      } else {
        this.ErrorConfirmPassword = ''
        this.checkConfirmPassClass == true
        return true
      }
    },
    async ChangePass() {
      if (this.ErrorConfirmPassword !== '' && this.ErrorPass !== '') {
        alert('Vui lòng điền đầy đủ thông tin')
      } else {
        try {
          const request = await changePassAdmin(this.id, {
            oldpass: JSON.stringify(CryptoJS.MD5(this.pass.oldpass).toString()),
            newpass: JSON.stringify(CryptoJS.MD5(this.pass.newpass).toString())
          })
          if (request) {
            if (request === 'Cập nhật mật khẩu thành công') {
              ElNotification({
                title: 'Thông báo',
                message: 'Cập nhật mật khẩu thành công !',
                type: 'success'
              })
            } else {
              ElNotification({
                title: 'Thông báo',
                message: 'Mật khẩu cũ không chính xác !',
                type: 'error'
              })
            }
          }
        } catch (e) {
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
