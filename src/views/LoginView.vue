<template>
      <div class="container d-flex justify-content-center align-items-center min-vh-100 mt-5">
        <div class="row border rounded-5 p-3 bg-white shadow box-area">
            <div class="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style="background:  #FFE4DA;">
                <div class="mb-3">
                    <img  class="img-fluid mt-3" :src="url" style="width:100%">
                </div>
            </div>
             <div class="col-md-6 right-box">
                <div class="row align-items-center">
                    <div class="header-text mb-4">
                        <h3 class="text-center" style="font-family: 'Courier New', Courier, monospace;font-weight: 600;">Đăng Nhập</h3>
                    </div>
                    <form id="loginForm" @submit.prevent>
                        <div class="form-group mb-3">
                            <input type="email" class="form-control form-control-lg bg-light fs-6" id="email_login" name="email" placeholder="Nhập Email của bạn" required>
                            <p class="emailError text-danger"></p>
                        </div>
                        <div class="form-group mb-1">
                            <input type="password" class="form-control form-control-lg bg-light fs-6" name="password" id="password" placeholder="Nhập mật khẩu" required>
                            <p class="passwordError text-danger"></p>
                        </div>
                        <div class="input-group mb-5 d-flex justify-content-between">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="formCheck">
                                <label for="formCheck" class="form-check-label text-secondary"><small>Nhớ tài
                                        khoản!</small></label>
                            </div>
                            <div class="forgot">
                                <small><a href="">Quên Mật Khẩu?</a></small>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <button class="btn btn-lg btn-warning w-100 fs-6" type="submit" id="submit"><a style="text-decoration: none;color:white">Đăng Nhập</a></button>
                        </div>
                    </form>
                    <div class="row">
                        <small>Bạn chưa có tài khoản? <RouterLink :to="{name:'register'}"> Đăng ký </RouterLink> </small>
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
            url: "./src/assets/img/LogoWeb.png"
        }
    },
   
    
}
</script>
<style></style>