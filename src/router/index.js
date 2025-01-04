import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'

// src client
// import LayoutClient from '@/Layout/LayoutClient.vue'
import HomeView from '@/views/UserView/HomeView.vue'
import RegisterView from '@/views/UserView/RegisterView.vue'
// view nhập OTP để xác nhận đăng ký tài khoản
import LoginView from '@/views/UserView/LoginView.vue'
import forgotPasswordView from '@/views/UserView/forgotPasswordView.vue'
// view form quên mật khẩu
import resetPasswordForgotView from '@/views/UserView/resetPasswordForgotView.vue'
// view form đổi mật khẩu
import resetPasswordView from '@/views/UserView/resetPasswordView.vue'
import AboutView from '@/views/UserView/AboutView.vue'
import ExamInfor from '@/views/UserView/ExamInfor.vue'
import ExamView from '@/views/UserView/ExamView.vue'
import ExamResult from '@/views/UserView/ExamResult.vue'
import DetailExamResult from '@/views/UserView/DetailExamResult.vue'
import CheckAnswerResult from '@/views/UserView/CheckAnswerResult.vue'
import TestView from '@/views/UserView/TestView.vue'

// src admin
// eslint-disable-next-line no-unused-vars
// import HomeAdmin from '@/views/AdminView/HomeAdmin.vue'
import User from '@/views/AdminView/User/User.vue'
import CreateUser from '@/views/AdminView/User/CreateUser.vue'
import EditUser from '@/views/AdminView/User/EditUser.vue'
import CauHoi from '@/views/AdminView/CauHoi/CauHoi.vue'
import CreateCauHoi from '@/views/AdminView/CauHoi/CreateCauHoi.vue'
import ChangeCauHoi from '@/views/AdminView/CauHoi/ChangeCauHoi.vue'
import Exams from '@/views/AdminView/Exams/Exams.vue'
import CreateExam from '@/views/AdminView/Exams/CreateExam.vue'
// tạo bài kiểm tra tùy ý thêm câu hỏi
import CreateExamOption from '@/views/AdminView/Exams/CreateExamOption.vue'
// trang điều hướng thêm câu hỏi sau khi thêm bài kiểm tra thành công
import AddQuestionIntoExam from '@/views/AdminView/Exams/AddQuestionIntoExam.vue'
import EditExam from '../views/AdminView/Exams/EditExam.vue'
import ClassManage from '@/views/AdminView/Class/ClassManage.vue'
import DetailExam from '@/views/AdminView/Exams/DetailExam.vue'
import StatisticExam from '@/views/AdminView/Exams/StatisticExam.vue'
import IRT_DATA from '@/views/AdminView/Exams/IRT_DATA.vue'
import CategoryExam from '@/views/AdminView/Exams/CategoryExam.vue'
import CartExam from '@/views/UserView/CartExam.vue'
// import UserInfo from '@/views/UserInfo.vue'
import UserDetailAdmin from '@/views/AdminView/Infor/UserDetailAdmin.vue'
import HomeAdmin from '@/views/AdminView/HomeAdmin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // hiện hai footer
      // component: LayoutClient,
      children: [
        // trang ch
        {
          path: '/',
          name: 'home',
          component: HomeView,
          meta: {
            layout: 'home'
          }
        },
        {
          path: '/category/:id',
          name: 'category-exam',
          component: CartExam,
          meta: {
            layout: 'home'
          }
        },
        {
          path: '/about',
          name: 'about',
          component: AboutView
        },
        // xem chi tiết bài thi
        {
          path: '/test/:id',
          name: 'testDetail',
          component: ExamInfor
        },
        // bắt đầu làm bài thi
        {
          path: '/test/start/:id',
          name: 'testStart',
          component: ExamView,
          meta: {
            requiresAuth: true //các link cần đăng nhập để truy cập
          }
        },
        // danh sách các bài thi đã làm
        {
          path: '/user/resultList',
          name: 'ResultExam',
          component: ExamResult,
          meta: {
            requiresAuth: true //các link cần đăng nhập để truy cập
          }
        },
        //chi tiết bài thi đã làm
        {
          path: '/user/resultDetail/:id',
          name: 'detailResultExam',
          component: DetailExamResult,
          meta: {
            requiresAuth: true //các link cần đăng nhập để truy cập
          }
        },
        // check lại đáp án bài thi
        {
          path: '/test/checkResult/:id',
          name: 'checkAnswer',
          component: CheckAnswerResult,
          meta: {
            requiresAuth: true //các link cần đăng nhập để truy cập
          }
        },
        // Đăng ký
        {
          path: '/register',
          name: 'register',
          component: RegisterView
        },
        // Đăng nhập
        {
          path: '/login',
          name: 'Login',
          component: LoginView
        },
        {
          path: '/forgot-password',
          name: 'forgot-password',
          component: forgotPasswordView
        },
        {
          path: '/reset-passwordForgot',
          name: 'reset-passwordForgot',
          component: resetPasswordForgotView
        },
        {
          path: '/reset-password',
          name: 'reset-password',
          component: resetPasswordView,
          meta: {
            requiresAuth: true //các link cần đăng nhập để truy cập
          }
        },
        // test
        {
          path: '/testView',
          name: 'test',
          component: TestView
        }
        // {
        //   path: '/user-info',
        //   name: 'userInfo',
        //   component: UserInfo
        // }
      ]
    },
    // layout admin
    {
      path: '/admin',
      children: [
        {
          path: '',
          name: 'homeAdmin',
          component: HomeAdmin,
          meta: {
            layout: 'admin'
          }
        },
        {
          path: 'userDetail',
          name: 'userDetailAdmin',
          component: UserDetailAdmin,
          meta: {
            layout: 'admin'
          }
        },
        {
          path: 'user',
          name: 'user',
          component: User,
          meta: {
            layout: 'admin'
          }
        },
        {
          path: 'create-user',
          name: 'create-user',
          component: CreateUser,
          meta: {
            layout: 'admin'
          }
        },
        {
          path: 'changeUser/:id',
          name: 'changeUser',
          component: EditUser,
          meta: {
            layout: 'admin'
          }
        },
        {
          path: 'cauhoi',
          name: 'cauhoi',
          component: CauHoi,
          meta: {
            layout: 'admin'
          }
        },
        {
          path: 'create-cauhoi',
          name: 'create-cauhoi',
          component: CreateCauHoi,
          meta: {
            layout: 'admin'
          }
        },
        {
          path: 'cauhoi/change/:id',
          name: 'changeQues',
          component: ChangeCauHoi,
          meta: {
            layout: 'admin'
          }
        },
        {
          path: 'exams',
          name: 'exams',
          component: Exams,
          meta: {
            layout: 'admin'
          }
        },
        {
          path: 'create-exam',
          name: 'create-exam',
          component: CreateExam,
          meta: {
            layout: 'admin'
          }
        },
        // tạo exam tùy chọn câu hỏi
        {
          path: 'create-exam-option',
          name: 'create-exam-option',
          component: CreateExamOption,
          meta: {
            layout: 'admin'
          }
        },
        // sau khi đã thêm bài kiểm tra thì điều hướng đến giao diện thêm câu hỏi vào bài kiểm tra vừa mới tạo
        {
          path: 'AddQuestion-into-Exam/:id',
          name: 'AddQuestion-into-Exam',
          component: AddQuestionIntoExam,
          meta: {
            layout: 'admin'
          }
        },
        //khi click vào nút xem danh sách câu hỏi của bài kiểm tra thì điều hướng đến detail của exam đó để xem được các câu hỏi đã thêm
        // {},
        {
          path: 'edit-exam/:id',
          name: 'edit-exam',
          component: EditExam,
          meta: {
            layout: 'admin'
          }
        },
        {
          path: 'detail-exam/:id',
          name: 'detail-exam',
          component: DetailExam,
          meta: {
            layout: 'admin'
          }
        },
        {
          path: 'class',
          name: 'class',
          component: ClassManage,
          meta: {
            layout: 'admin'
          }
        },
        // thống kê dữ liệu bài thi
        {
          path: 'statistic-exam/:id',
          name: 'thongke',
          component: StatisticExam,
          meta: {
            layout: 'admin'
          }
        },
        // dữ liệu IRT bài kiểm tra
        {
          path: 'IRT_EXAM/:id',
          name: 'IRT_EXAM',
          component: IRT_DATA,
          meta: {
            layout: 'admin'
          }
        },
        {
          path: 'categoryExam',
          name: 'categoryExam',
          component: CategoryExam,
          meta: {
            layout: 'admin'
          }
        }
      ]
    }
  ]
})

// kiểm tra tokenAdmin trước khi truy cập vào các page của admin
router.beforeEach((to, from, next) => {
  const adminToken = Cookies.get('tokenAdmin')
  if (to.path.startsWith('/admin') && !adminToken) {
    next({ name: 'Login' })
  } else {
    next()
  }
})
//kiểm tra xem người dùng đã đăng nhập hay chưa
router.beforeEach((to, from, next) => {
  const userToken = Cookies.get('tokenStudent') // Lấy token từ cookies
  // Kiểm tra xem route có yêu cầu đăng nhập không
  if (to.matched.some((record) => record.meta.requiresAuth) && to.path.startsWith('/')) {
    if (!userToken) {
      // Nếu không có token thì về trang đăng nhập
      next({ name: 'Login' })
    } else {
      // Nếu đã đăng nhập thì được truy cập vào
      next()
    }
  } else {
    // Nếu không cần đăng nhập thì vẫn được truy cấp
    next()
  }
})

export default router
