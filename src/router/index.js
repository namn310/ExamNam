import { createRouter, createWebHistory } from 'vue-router'
// src client
import LayoutClient from '@/Layout/LayoutClient.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AboutView from '@/views/AboutView.vue'
import ExamInfor from '@/views/ExamInfor.vue'
import ExamView from '@/views/ExamView.vue'
import ExamResult from '@/views/ExamResult.vue'
import DetailExamResult from '@/views/DetailExamResult.vue'
import CheckAnswerResult from '@/views/CheckAnswerResult.vue'

// src admin
import HomeAdmin from '@/views/AdminView/HomeAdmin.vue'
import User from '@/views/AdminView/User/User.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LayoutClient,
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
        // login
        {
          path: '/login',
          name: 'login',
          component: LoginView
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
        }
      ]
    }
  ]
})

export default router
