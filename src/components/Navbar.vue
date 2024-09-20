<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Mon Application</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item" v-if="role === 'admin'">
            <router-link class="nav-link" to="/dashboard-admin">Tableau de bord Admin</router-link>
            <router-link class="nav-link" to="/manage-users">Gérer les utilisateurs</router-link>
            <router-link class="nav-link" to="/campaigns">Campagnes</router-link>
          </li>
          <li class="nav-item" v-if="role === 'sage-femme'">
            <router-link class="nav-link" to="/dashboard-sage-femme">Tableau de bord Sage-femme</router-link>
            <router-link class="nav-link" to="/patientes">Gérer les patientes</router-link>
          </li>
          <li class="nav-item" v-if="role === 'patiente'">
            <router-link class="nav-link" to="/dashboard-patiente">Tableau de bord Patiente</router-link>
            <router-link class="nav-link" to="/appointments">Mes Rendez-vous</router-link>
          </li>
          <li class="nav-item" v-if="role === 'badiene-gox'">
            <router-link class="nav-link" to="/dashboard-badiene-gox">Tableau de bord Badiene Gox</router-link>
            <router-link class="nav-link" to="/campaigns">Gérer les campagnes</router-link>
          </li>
        </ul>
        <div class="dropdown text-end">
          <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="/src/assets/images/profil.jpeg" alt="profil" width="32" height="32" class="rounded-circle">
          </a>
          <ul class="dropdown-menu text-small">
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><hr class="dropdown-divider"></li>
            <li>
              <button class="dropdown-item" @click="logout">Se déconnecter</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

  <script>
  export default {
    data() {
      return {
        role: null, // Le rôle sera défini lorsque le composant sera monté
      };
    },
    mounted() {
      // Récupérer le rôle de l'utilisateur connecté
      this.role = localStorage.getItem('role');
    },
    methods: {
      logout() {
        // Supprimer le token et le rôle du localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        
        // Redirection vers la page de connexion
        this.$router.push('/');
      }
    }
  };
  </script>
  