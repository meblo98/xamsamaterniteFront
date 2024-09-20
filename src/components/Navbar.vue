<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><img src="/src/assets/images/logo.png" class="logo" alt="logo"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto d-flex">
          <li class="nav-item" v-if="role === 'admin'">
            <router-link class="nav-link" to="/dashboard-admin">Dashboard</router-link>
          </li>
          <li class="nav-item" v-if="role === 'admin'">
            <router-link class="nav-link" to="/manage-users">Sage-femme</router-link>
          </li>
          <li class="nav-item" v-if="role === 'admin'">
            <router-link class="nav-link" to="/campaigns">Campagnes</router-link>
          </li>
          <li class="nav-item" v-if="role === 'sage-femme'">
            <router-link class="nav-link" to="/dashboard-sage-femme">Tableau de bord Sage-femme</router-link>
          </li>
          <li class="nav-item" v-if="role === 'sage-femme'">
            <router-link class="nav-link" to="/patientes">Gérer les patientes</router-link>
          </li>
          <li class="nav-item" v-if="role === 'patiente'">
            <router-link class="nav-link" to="/dashboard-patiente">Tableau de bord Patiente</router-link>
          </li>
          <li class="nav-item" v-if="role === 'patiente'">
            <router-link class="nav-link" to="/appointments">Mes Rendez-vous</router-link>
          </li>
          <li class="nav-item" v-if="role === 'badiene-gox'">
            <router-link class="nav-link" to="/dashboard-badiene-gox">Tableau de bord Badiene Gox</router-link>
          </li>
          <li class="nav-item" v-if="role === 'badiene-gox'">
            <router-link class="nav-link" to="/campaigns">Gérer les campagnes</router-link>
          </li>
        </ul>
        <div class="dropdown profil text-end">
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
      role: localStorage.getItem('role'), // Récupère le rôle de l'utilisateur depuis le localStorage
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>

.navbar {
  margin-bottom: 20px;
  background-color: white;
}

.logo{
  width: 200px;
  padding-left: 50%;
}

.profil{
  padding-right: 100px;
}
.profil ul{
  width: 10px;
  margin-right: 100px;

}
</style>
