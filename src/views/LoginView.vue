<template>
      <div class="container d-flex justify-content-center align-items-center min-vh-100">
        <div class="row border rounded-5 p-3 bg-white shadow box-area">
            <div class="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style="background:  #FFE4DA;">
                <div class="mb-3">
                    <img  class="img-fluid mt-3" :src="url" style="width:100%">
                </div>
            </div>
            <div class="col-md-6 right-box">
                <div class="row align-items-center text-center">
                    <div class="header-text mb-4">
                        <h3 style="font-family: 'Courier New', Courier, monospace;font-weight: 600;">Đăng Ký</h3>
                    </div>
                    <form id="loginForm" method="post" >
                        <div class=" form-group mb-3">
                            <input type="username" name="name" class="form-control form-control-lg bg-light fs-6" id="username" placeholder="Tên người dùng">
                            <p class="UsernameError text-danger text-start ps-1"></p>
                        </div>
                        <div class="form-group mb-3">
                            <input type="email" name="email" class="form-control form-control-lg bg-light fs-6" id="email_signup" placeholder="Địa chỉ Email">
                            <p class="emailError text-danger text-start ps-1"></p>
                        </div>
                        <div class="form-group mb-3">
                            <input type="text" name="phone" class="form-control form-control-lg bg-light fs-6" id="phone_signup" placeholder="Số điện thoại">
                            <p class=" text-danger text-start ps-1"></p>
                        </div>
                        <div class="form-group mb-3">
                            <input type="text" name="local" class="form-control form-control-lg bg-light fs-6" id="local_signup" placeholder="Địa chỉ">
                            <p class=" text-danger text-start ps-1"></p>
                        </div>
                        <div class="form-group mb-3">
                            <input type="password" name="pass" class="form-control form-control-lg bg-light fs-6" id="password_signup" placeholder="Mật Khẩu">
                            <small>Mật khẩu tối thiểu 6 ý tự</small>
                        </div>
                        <div class="form-group mb-3">
                            <input type="password" name="Repass" class="form-control form-control-lg bg-light fs-6" id="Re_password_signup" placeholder="Nhập lại mật khẩu">
                        </div>
                        <div class="input-group mb-3">
                            <button class="btn btn-lg btn-warning w-100 fs-6" type="submit" name="dangky" id="submit">Đăng Ký</button>
                        </div>
                    </form>
                    <div class="row">
                        <small>Bạn đã có tài khoản? <a><RouterLink to="/">Đăng Nhập</RouterLink></a></small>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            url: "./src/assets/img/PetCARE.png"
        }
    },
   
    
}
</script>
<style></style>