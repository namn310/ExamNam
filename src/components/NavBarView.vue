<template>
  <div class="topnav1 topnav-wrapper">
    <div class="topnav-container">
      <nav class="navbar navbar-expand-lg">
        <span class="navbar-brand">
          <a class="topnav-brand" href="/">
            <img class="topnav-logo"/>ExamTutor
          </a>
        </span>
        <button
          class="navbar-toggler pull-xs-right d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-collapse">☰ </button>
        <div class="d-lg-block navbar-collapse justify-content-end collapse" id="navbar-collapse">
          <ul class="nav">
            <li class="nav-item">
              <RouterLink class="nav-link" :to="{ name: 'home' }">Đề thi online</RouterLink>
            </li>
            <li class="nav-item">
              <a class="nav-link">Kết quả thi</a>
            </li>
            <li>
              <RouterLink :to="{ name: 'login'}">Đăng nhập</RouterLink>
            </li>
            <li class="nav-item user-topnav dropdown d-none d-lg-block">
              <a class="nav-link dropdown-toggle user-topnav-profile"  role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="account-profile-img">
                  <img />
                </span>
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="/my-account/">Trang cá nhân</a>
                <a class="dropdown-item" href="/logout/">Đăng xuất</a>
              </div>
            </li>
            <li class="nav-item d-lg-none">
              <a class="nav-link" href="/notifications/">Thông báo </a>
            </li>
            <li class="nav-item d-lg-none">
              <a class="nav-link" href="/studyplan/">Lịch học của tôi</a>
            </li>
            <li class="nav-item d-lg-none">
              <a class="nav-link" href="/my-account/">Trang cá nhân</a>
            </li>
            <li class="nav-item d-lg-none">
              <a class="nav-link" href="/logout/">Đăng xuất</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
  <!-- <nav class="nav">
    <RouterLink to="/">ExamTest</RouterLink>
    <RouterLink :to="{ name: 'home' }">Home</RouterLink>
    <RouterLink :to="{ name: 'about' }">About</RouterLink>
    <RouterLink :to="{ name: 'login' }">Login</RouterLink>
    <RouterLink to="/">Over View</RouterLink>
  </nav> -->
</template>
<script>
export default {}
</script>
<style scoped lang="css">
.topnav1 {
    box-shadow: 0 4px 4px -4px rgba(0,0,0,.2);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}
.topnav-wrapper {
    background-color: #fff;
    z-index: 1001;
}
.topnav-container {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    padding-right: .775rem;
    padding-left: .775rem;
}
.topnav1 .navbar {
    padding: 0;
}
@media (min-width: 992px){
.navbar-expand-lg {
    flex-flow: row nowrap;
    justify-content: flex-start;
}
}
.navbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
}
.topnav1 .navbar-brand {
    height: 60px;
    padding-top: 0;
    padding-bottom: 0;
    display: flex;
    align-items: center;
    margin-right: 0;
}
.navbar-brand {
    display: inline-block;
    padding-top: .3125rem;
    padding-bottom: .3125rem;
    margin-right: 1rem;
    font-size: 1.25rem;
    line-height: inherit;
    white-space: nowrap;
}
.topnav1 .navbar-brand .topnav-brand:visited {
    text-decoration: none;
}
.topnav1 .navbar-brand .topnav-brand {
    font-size: 28px;
    line-height: 60px;
    letter-spacing: -.75px;
    color: #0a0a0a;
    font-weight: 600;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
}
a {
    cursor: pointer;
}
a {
    color: #35509a;
    text-decoration: none;
    background-color: transparent;
}
@media (min-width: 992px){
.navbar-expand-lg .navbar-collapse {
    display: flex !important;
    flex-basis: auto;
}
.collapse:not(.show) {
    display: none;
}
.justify-content-end {
    justify-content: flex-end !important;
}
}
@media (min-width: 992px){
.d-lg-block {
    display: block !important;
}
.navbar-collapse {
    flex-basis: 100%;
    flex-grow: 1;
    align-items: center;
}
}
.topnav1 .nav {
    align-items: center;
}
.nav {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
}
ol, p, ul {
    margin-bottom: 1rem;
}
.form-control, .form-control:focus, body, html, input, input:focus, li, ol, p, textarea, textarea:focus, ul {
    color: #1a1a1a;
}
dl, ol, ul {
    margin-top: 0;
}
address, dl, ol, ul {
    margin-bottom: 1rem;
}
</style>
