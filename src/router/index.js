import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'

// src client
// import LayoutClient from '@/Layout/LayoutClient.vue'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import forgotPasswordView from '@/views/forgotPasswordView.vue'
import resetPasswordForgotView from '@/views/resetPasswordForgotView.vue'
import resetPasswordView from '@/views/resetPasswordView.vue'
import AboutView from '@/views/AboutView.vue'
import ExamInfor from '@/views/ExamInfor.vue'
import ExamView from '@/views/ExamView.vue'
import ExamResult from '@/views/ExamResult.vue'
import DetailExamResult from '@/views/DetailExamResult.vue'
import CheckAnswerResult from '@/views/CheckAnswerResult.vue'
import TestView from '@/views/TestView.vue'

// src admin
import HomeAdmin from '@/views/AdminView/HomeAdmin.vue'
import User from '@/views/AdminView/User/User.vue'
import CreateUser from '@/views/AdminView/User/CreateUser.vue'
import EditUser from '@/views/AdminView/User/EditUser.vue'
import CauHoi from '@/views/AdminView/CauHoi/CauHoi.vue'
import CreateCauHoi from '@/views/AdminView/CauHoi/CreateCauHoi.vue'
import ChangeCauHoi from '@/views/AdminView/CauHoi/ChangeCauHoi.vue'
import Exams from '@/views/AdminView/Exams/Exams.vue'
import CreateExam from '@/views/AdminView/Exams/CreateExam.vue'
import EditExam from '../views/AdminView/Exams/EditExam.vue'
import DetailExam from '@/views/AdminView/Exams/DetailExam.vue'
import CategoryExam from '@/views/AdminView/Exams/CategoryExam.vue'
import CartExam from '@/views/CartExam.vue'


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
      ]
    },
    // layout admin
    {
      path: '/admin',
      children: [
        {
          path: '',
          name: 'homeAdmin',
          component: User,
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
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
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
