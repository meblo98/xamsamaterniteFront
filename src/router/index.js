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
      path: '/listeVisite-admin',
      name: 'listeVisite-admin',
      component: () => import('@/views/admin/ListeVisisteAdmin.vue')
    },
    {
      path: '/listeSageFemme-admin',
      name: 'listeSageFemme-admin',
      component: () => import('@/views/admin/ListeSageFemme.vue')
    },
    {
      path: '/structure',
      name: 'structure',
      component: () => import('@/views/admin/Structure.vue')
    },
    {
      path: '/dashboard-sage-femme',
      name: 'dashboard-sage-femme',
      component: () => import('@/views/sageFemme/AccueilSageFemme.vue')
    },
    {
      path: '/patiente-sage-femme',
      name: 'patiente-sage-femme',
      component: () => import('@/views/sageFemme/PatienteListe.vue')
    },
    {
      path: '/detailPatiente-sage-femme/:id',
      name: 'detailPatiente-sage-femme',
      component: () => import('@/views/sageFemme/DetailPatiente.vue'),
      props: true,
    },
    {
      path: '/dashboard-patiente',
      name: 'dashboard-patiente',
      component: () => import('@/views/patiente/AccueilPatiente.vue')
    },
    {
      path: '/campagne-patiente',
      name: 'campagne-patiente',
      component: () => import('@/views/patiente/CampagnePatiente.vue')
    },
    {
      path: '/detailCampagne-patiente',
      name: 'detailCampagne-patiente',
      component: () => import('@/views/patiente/DetailCampagnePatiente.vue')
    },
    {
      path: '/conseil-patiente',
      name: 'conseil-patiente',
      component: () => import('@/views/patiente/ConseilPatiente.vue')
    },
    {
      path: '/detailConseil-patiente',
      name: 'detailConseil-patiente',
      component: () => import('@/views/patiente/DetailConseilPatiente.vue')
    },
    {
      path: '/rv-patiente',
      name: 'rv-patiente',
      component: () => import('@/views/patiente/RendezVous.vue')
    },
    {
      path: '/dashboard-badiene-gox',
      name: 'dashboard-badiene-gox',
      component: () => import('@/views/badieneGox/AccueilBadieneGox.vue')
    }
  ]
});

export default router;
