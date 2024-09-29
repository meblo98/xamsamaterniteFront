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
      path: '/badiene-sage-femme/',
      name: 'badiene-sage-femme',
      component: () => import('@/views/sageFemme/BadieneGoxListe.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/components/profil.vue'),
    },

    {
      path: '/enfant-sage-femme',
      name: 'enfant-sage-femme',
      component: () => import('@/views/sageFemme/EnfantListe.vue'),
    },
       {
      path: '/detailEnfant-sage-femme/:id',
      name: 'detailEnfant-sage-femme',
      component: () => import('@/views/sageFemme/DetailEnfant.vue'),
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
    }, {
      path: '/campagne-badiene-gox/',
      name: 'campagne-badiene-gox',
      component: () => import('@/views/badieneGox/Campagne.vue')
    },
    {
      path: '/detailCampagne-badiene-gox/:id',
      name: 'detailCampagne-badiene-gox',
      component: () => import('@/views/badieneGox/DetailCampagne.vue'),
      props: true,
    }
  ]
});

export default router;
