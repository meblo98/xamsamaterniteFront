<!-- <template>
   
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div class="col-md-3 mb-2 mb-md-0">
        <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
            <img src="/src/assets/images/logo.png" class="img-fluid" alt="Sample image" style="width: 100px;">
        </a>
      </div>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="#" class="nav-link px-2 link-secondary">Home</a></li>
        <li><a href="#" class="nav-link px-2">Features</a></li>
        <li><a href="#" class="nav-link px-2">Pricing</a></li>
        <li><a href="#" class="nav-link px-2">FAQs</a></li>
        <li><a href="#" class="nav-link px-2">About</a></li>
      </ul>

      <div class="dropdown text-end">
          <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="/src/assets/images/profil.jpeg" alt="mdo" width="32" height="32" class="rounded-circle">
          </a>
          <ul class="dropdown-menu text-small">
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" @click="logout">Deconnexion</a></li>
          </ul>
        </div>
    </header>

</template>

<script>
import api from '/src/services/api'; // Le service API qui fera la requête à Laravel

  export default {
  methods: {
    async logout() {
      try {
        await api.logout();

        // Supprimer le token JWT du localStorage
        localStorage.removeItem('token');

        // Rediriger l'utilisateur vers la page de login après la déconnexion
        this.$router.push('/login');
      } catch (error) {
        console.error('Erreur lors de la déconnexion', error);
      }
    }
  }
};
</script>

<style lang="css">
body{
    background: #EAECF0;
}
header{
    padding: 50px;
    background: white;
}
</style> -->

<template>
  <div>
    <!-- La barre de navigation pour l'admin -->
    <Navbar />
    <div class="dashboard d-block">
      <div class="row">
        <DashboardStats />
      </div>
      <div class="row mb-5">
        <Charts />
      </div>
     <div class="row">
      <div class="col-8">
        <AppointmentTable />
      </div>
     <div class="col">
      <SageFemmeList />
     </div>
     </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import DashboardStats from '@/components/DashboardStats.vue';
import Charts from '@/components/Charts.vue';
import AppointmentTable from '@/components/AppointmentTable.vue';
import SageFemmeList from '@/components/SageFemmeList.vue';

export default {
  components: {
    Navbar,
    DashboardStats,
    Charts,
    AppointmentTable,
    SageFemmeList,
  },
};
</script>
<style>
body {
  background-color: #eaecf0;
}


.dashboard {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 20px;
  }
</style>
