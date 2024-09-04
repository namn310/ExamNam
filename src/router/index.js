import { createRouter, createWebHistory } from 'vue-router'
// src client
// import LayoutClient from '@/Layout/LayoutClient.vue'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
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
import CauHoi from '@/views/AdminView/CauHoi/CauHoi.vue'
import CreateCauHoi from '@/views/AdminView/CauHoi/CreateCauHoi.vue'
import Exams from '@/views/AdminView/Exams/Exams.vue'
import CreateExam from '@/views/AdminView/Exams/CreateExam.vue'
import EditExam from '../views/AdminView/Exams/EditExam.vue'
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
          component: HomeView
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
          component: ExamView
        },
        // danh sách các bài thi đã làm
        {
          path: '/user/resultList',
          name: 'ResultExam',
          component: ExamResult
        },
        //chi tiết bài thi đã làm
        {
          path: '/user/resultDetail/:id',
          name: 'detailResultExam',
          component: DetailExamResult
        },
        // check lại đáp án bài thi
        {
          path: '/test/checkResult/:id',
          name: 'checkAnswer',
          component: CheckAnswerResult
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
          path: '/',
          name: 'homeAdmin',
          component: HomeAdmin,
          meta : {
            layout : 'admin'
          }
        },
        {
          path: 'user',
          name: 'user',
          component: User,
          meta : {
            layout : 'admin'
          }
        },
        {
          path: 'create-user',
          name: 'create-user',
          component: CreateUser,
          meta : {
            layout : 'admin'
          }
        },
        {
          path: 'cauhoi',
          name: 'cauhoi',
          component: CauHoi,
          meta : {
            layout : 'admin'
          }
        },
        {
          path: 'create-cauhoi',
          name: 'create-cauhoi',
          component: CreateCauHoi,
          meta : {
            layout : 'admin'
          }
        },
        {
          path: 'exams',
          name: 'exams',
          component: Exams,
          meta
          : {
            layout : 'admin'
          }
        },
        {
          path: 'create-exam',
          name: 'create-exam',
          component: CreateExam,
          meta : {
            layout : 'admin'
          }
        },
        {
          path: 'edit-exam/:id',
          name: 'edit-exam',
          component: EditExam,
          meta : {
            layout : 'admin'
          }
        }
      ]
    }
  ]
})

export default router
