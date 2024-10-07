import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/auth/Login.vue')
    },
    {
      path: '/dashboard-admin',
      name: 'dashboard-admin',
      component: () => import('@/views/admin/AccueilAdmin.vue'),
      meta: { requiresAuth: true, role: 'admin' }
    },
    {
      path: '/listeVisite-admin',
      name: 'listeVisite-admin',
      component: () => import('@/views/admin/ListeVisisteAdmin.vue'),
      meta: { requiresAuth: true, role: 'admin' }
    },
    {
      path: '/listeSageFemme-admin',
      name: 'listeSageFemme-admin',
      component: () => import('@/views/admin/ListeSageFemme.vue'),
      meta: { requiresAuth: true, role: 'admin' }
    },
    {
      path: '/structure',
      name: 'structure',
      component: () => import('@/views/admin/Structure.vue'),
      meta: { requiresAuth: true, role: 'admin' }
    },
    {
      path: '/dashboard-sage-femme',
      name: 'dashboard-sage-femme',
      component: () => import('@/views/sageFemme/AccueilSageFemme.vue'),
      meta: { requiresAuth: true, role: 'sage-femme' }
    },
    {
      path: '/patiente-sage-femme',
      name: 'patiente-sage-femme',
      component: () => import('@/views/sageFemme/PatienteListe.vue'),
      meta: { requiresAuth: true, role: 'sage-femme' }
    },
    {
      path: '/detailPatiente-sage-femme/:id',
      name: 'detailPatiente-sage-femme',
      component: () => import('@/views/sageFemme/DetailPatiente.vue'),
      props: true,
      meta: { requiresAuth: true, role: 'sage-femme' }
    },
    {
      path: '/badiene-sage-femme/',
      name: 'badiene-sage-femme',
      component: () => import('@/views/sageFemme/BadieneGoxListe.vue'),
      meta: { requiresAuth: true, role: 'sage-femme' }
    },
    {
      path: '/detailConsultation-sage-femme/:id',
      name: 'detailConsultation',
      component: () => import('@/views/sageFemme/DetailConsultation.vue'),
      props: true,
      meta: { requiresAuth: true, role: 'sage-femme' }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/components/profil.vue'),
      meta: { requiresAuth: true }

    },

    {
      path: '/enfant-sage-femme',
      name: 'enfant-sage-femme',
      component: () => import('@/views/sageFemme/EnfantListe.vue'),
      meta: { requiresAuth: true, role: 'sage-femme' }
    },
       {
      path: '/detailEnfant-sage-femme/:id',
      name: 'detailEnfant-sage-femme',
      component: () => import('@/views/sageFemme/DetailEnfant.vue'),
      props: true,
      meta: { requiresAuth: true, role: 'sage-femme' }
    },
    {
      path: '/dashboard-patiente',
      name: 'dashboard-patiente',
      component: () => import('@/views/patiente/AccueilPatiente.vue'),
      meta: { requiresAuth: true, role: 'patiente' }
    },
    {
      path: '/campagne-patiente',
      name: 'campagne-patiente',
      component: () => import('@/views/patiente/CampagnePatiente.vue'),
      meta: { requiresAuth: true, role: 'patiente' }
    },
    {
      path: '/detailCampagne-patiente/:id',
      name: 'detailCampagne-patiente',
      component: () => import('@/views/patiente/DetailCampagnePatiente.vue'),
      props: (route) => ({ id: route.params.id }),
      meta: { requiresAuth: true, role: 'patiente' }
    },
    {
      path: '/conseil-patiente',
      name: 'conseil-patiente',
      component: () => import('@/views/patiente/ConseilPatiente.vue'),
      meta: { requiresAuth: true, role: 'patiente' }
    },
    {
      path: '/detailConseil-patiente',
      name: 'detailConseil-patiente',
      component: () => import('@/views/patiente/DetailConseilPatiente.vue'),
      meta: { requiresAuth: true, role: 'patiente' }
    },
    {
      path: '/rv-patiente',
      name: 'rv-patiente',
      component: () => import('@/views/patiente/RendezVous.vue'),
      meta: { requiresAuth: true, role: 'patiente' }
    },
    {
      path: '/dashboard-badiene-gox',
      name: 'dashboard-badiene-gox',
      component: () => import('@/views/badieneGox/AccueilBadieneGox.vue'),
      meta: { requiresAuth: true, role: 'badiene-gox' }
    },
     {
      path: '/campagne-badiene-gox/',
      name: 'campagne-badiene-gox',
      component: () => import('@/views/badieneGox/Campagne.vue'),
      meta: { requiresAuth: true, role: 'badiene-gox' }
    },
    {
      path: '/patiente-badiene-gox/',
      name: 'patiente-badiene-gox',
      component: () => import('@/views/badieneGox/Patiente.vue'),
      meta: { requiresAuth: true, role: 'badiene-gox' }
    },
    {
      path: '/detailPatiente-badiene/:id',
      name: 'detailPatiente-badiene',
      component: () => import('@/views/badieneGox/DetailePatiente.vue'),
      props: true,
      meta: { requiresAuth: true, role: 'badiene-gox' }
    },
    {
      path: '/detailCampagne-badiene-gox/:id',
      name: 'detailCampagne-badiene-gox',
      component: () => import('@/views/badieneGox/DetailCampagne.vue'),
      props: true,
      meta: { requiresAuth: true, role: 'badiene-gox' }
    }
  ]
});


// Guard global avant chaque navigation
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Exemple pour vérifier si le token est stocké
  const userRole = localStorage.getItem('role'); // Stocker le rôle de l'utilisateur (admin, sage-femme, etc.)

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      // Si l'utilisateur n'est pas authentifié, redirige vers la page de login
      return next({ name: 'login' });
    }

    // Si un rôle spécifique est requis pour la route
    if (to.meta.role && to.meta.role !== userRole) {
      // Si l'utilisateur n'a pas le bon rôle, redirige vers une page d'erreur ou autre
      return next({ name: 'unauthorized' }); // Par exemple, une page "Unauthorized"
    }
  }

  // Si tout est OK, continuer vers la route demandée
  next();
});


export default router;
