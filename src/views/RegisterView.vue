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
        <div class="row align-items-center text-center">
          <div class="header-text mb-4">
            <h3 style="font-weight: 600; font-size: 5vw; font-size: 5vh">Đăng Ký</h3>
          </div>
          <form id="loginForm" method="post" @submit.prevent="SubmitUser">
            <p class="text-start mb-2" style="font-weight: 500;">Bạn là : </p>
            <div class="form-check text-start">
              <input v-model=" data.role " class="form-check-input" type="radio" name="flexRadioDefault"
                id="flexRadioDefault1" value="admin" />
              <label class="form-check-label" for="flexRadioDefault1"> Giáo viên </label>
            </div>
            <div class="form-check text-start">
              <input v-model=" data.role " class="form-check-input" type="radio" name="flexRadioDefault"
                id="flexRadioDefault2" value="student" />
              <label class="form-check-label" for="flexRadioDefault2">
                Học sinh
              </label>
            </div>
            <div class="form-group mb-3 mt-2">
              <input type="username" name="name" :class=" validateName() == true ? 'is-valid' : 'is-invalid' "  class="form-control form-control-lg bg-light fs-6" id="username"
                placeholder="Tên người dùng" v-model=" data.name " @click=" validateName " />
              <p class="text-danger" v-if=" ErrorName = null ">{{ ErrorName }}</p>
            </div>
            <div class="form-group mb-3">
              <input type="email" name="email" :class="validateEmail() == true ? 'is-valid' : 'is-invalid'" class="form-control form-control-lg bg-light fs-6" id="email_signup"
                placeholder="Địa chỉ Email" v-model=" data.email " @input=" validateEmail " />
              <p class="text-danger" v-if=" ErrorEmail == null ">{{ ErrorEmail }}</p>
            </div>
            <div class="form-group mb-3">
              <input type="text" name="phone" :class="validatePhone() == true ? 'is-valid' : 'is-invalid'" class="form-control form-control-lg bg-light fs-6" id="phone_signup"
                placeholder="Số điện thoại" v-model=" data.phone " @input=" validatePhone " />
              <p class="text-danger" v-if=" ErrorPhone == null ">{{ ErrorPhone }}</p>
            </div>
            <div class="form-group mb-3">
              <input type="password" name="pass" :class="validatePass() == true ?'is-valid':'is-invalid'" class="form-control form-control-lg bg-light fs-6" id="password_signup"
                placeholder="Mật Khẩu" v-model=" data.password " @input=" validatePass" />
              <p class="text-danger" v-if=" ErrorPass == null ">{{ ErrorPass }}</p>
            </div>
            <div class="form-group mb-3">
              <input type="password" name="Repass"  class="form-control form-control-lg bg-light fs-6"
                id="Re_password_signup" placeholder="Nhập lại mật khẩu" v-model=" data.ConfirmPassword "
                @input=" validateConfirmPass " />
              <p class="text-danger" v-if=" ErrorConfirmPassword == null ">{{ ErrorConfirmPassword }}</p>
            </div>
            <div class="input-group mb-3">
              <button class="btn btn-lg btn-warning w-100 fs-6" type="submit" name="dangky" id="submit">
                Đăng Ký
              </button>
            </div>
          </form>
          <div class="row">
            <small>Bạn đã có tài khoản? <a>
                <RouterLink to="/Login">Đăng Nhập</RouterLink>
              </a></small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createUser } from '@/service/usersService';
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
      ErrorName: null,
      ErrorEmail: null,
      ErrorPhone: null,
      ErrorPass:  null,
      ErrorConfirmPassword:  null,
    }
  },
  methods: {
    async SubmitUser () {
      if (this.validateName()==false || this.validateEmail()==false || this.validatePhone == false || this.validatePass == false ||  this.validateConfirmPass() == false)
      {
        alert("Vui lòng kiểm tra lại thông tin !");
      }
      else
      { 
        const response = await createUser(this.data);
        if (response.message === 'Đăng ký tài khoản thành công')
        {
          alert(response.message);
          this.$router.push({name: 'Login'})
        }
        else
        {
          alert(response.message);
        }
      }
    },
    validateName () {
      const regex =
        /^[A-Za-z\sAÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+$/;
      if (this.data.name === '')
      {
        this.ErrorName = 'Tên không được để trống';
        return false;
      } else if (!regex.test(this.data.name))
      {
        this.ErrorName = 'Tên không đúng định dạng'
        // console.log(this.ErrorName)
        return false;
      } else
      {
        this.ErrorName = ''
        return true;
      }
    },
    validatePhone () {
      const regex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
      if (this.data.phone === '')
      {
        this.ErrorPhone = 'Vui lòng nhập số điện thoại'
        return false;
      } else if (!regex.test(this.data.phone))
      {
        this.ErrorPhone = 'Số điện thoại không hợp lệ'
        return false;
      } else
      {
        this.ErrorPhone = ''
        return true;
      }
    },
    validateEmail () {
      const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
      if (this.data.email === '')
      {
        this.ErrorEmail = 'Vui lòng nhập Email';
        return false;
      } else if (!regex.test(this.data.email))
      {
        this.ErrorEmail = 'Email không hợp lệ'
        return false;
      } else
      {
        this.ErrorEmail = '';
        return true;
      }
    },
    validatePass () {
      const regex = /^.{6,}$/
      if (this.data.password === '')
      {
        this.ErrorPass = 'Vui lòng nhập mật khẩu';
        return false;
      } else if (!regex.test(this.data.password))
      {
        this.ErrorPass = 'Mật khẩu tối thiểu 6 ký tự';
        return false;
      } else
      {
        this.ErrorPass = '';
        return true;
      }
    },
    validateConfirmPass () {
      if (this.data.ConfirmPassword !== this.data.password)
      {
        this.ErrorConfirmPassword = 'Mật khẩu không khớp';
        return false;
      } else
      {
        this.ErrorConfirmPassword = '';
        return true;
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
