import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AboutView from '@/views/AboutView.vue'
import ExamInfor from '@/views/ExamInfor.vue'
import ExamView from '@/views/ExamView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    {
      path: '/test/:id',
      name: 'testDetail',
      component: ExamInfor
    },
    {
      path: '/test/start/:id',
      name: 'testStart',
      component: ExamView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

export default router
