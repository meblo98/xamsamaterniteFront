import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/auth/Login.vue')
    },
    {
      path: '/dashboard-admin',
      name: 'dashboard-admin',
      component: () => import('@/views/admin/AccueilAdmin.vue')
    },
    {
      path: '/listeRv-admin',
      name: 'listeRv-admin',
      component: () => import('@/views/admin/ListeRvAdmin.vue')
    },
    {
      path: '/listeSageFemme-admin',
      name: 'listeSageFemme-admin',
      component: () => import('@/views/admin/ListeSageFemme.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/admin/ListeUsers.vue')
    },
    {
      path: '/dashboard-sage-femme',
      name: 'dashboard-sage-femme',
      component: () => import('@/views/sageFemme/AccueilSageFemme.vue')
    },
    {
      path: '/dashboard-patiente',
      name: 'dashboard-patiente',
      component: () => import('@/views/patiente/AccueilPatiente.vue')
    },
    {
      path: '/dashboard-badiene-gox',
      name: 'dashboard-badiene-gox',
      component: () => import('@/views/badieneGox/AccueilBadieneGox.vue')
    }
  ]
});

export default router;
