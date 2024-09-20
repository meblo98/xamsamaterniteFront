import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/auth/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard-admin',
      name: 'dashboard-admin',
      component: () => import('../views/admin/AccueilAdmin.vue')
    }
  ]
})

export default router
