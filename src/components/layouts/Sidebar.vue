<template>
  <aside class="sidebar">
    
    
    <nav class="menu">
      <button class="burger" @click="toggleMenu">
        <i class="fi fi-br-menu-burger"></i>
      </button>
      <div class="logo">
      <img src="@/assets/images/logo.png" alt="XAM Sa Maternité">
    </div>
      <ul :class="{ 'menu-open': isOpen }">
        <li><router-link to="/dashboard-patiente" class="active"><i class="fa-brands fa-windows"></i> Dashboard</router-link> </li>
        <li><router-link to="/rv-patiente"><i class="fas fa-calendar"></i> Rendez-vous</router-link> </li>
        <li><router-link to="/conseil-patiente"><i class="fas fa-bell"></i> Conseils</router-link> </li>
        <li><router-link to="/campagne-patiente"><i class="fi fi-rs-megaphone-announcement-leader"></i> Campagnes</router-link> </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      isOpen: false, // Menu burger fermé par défaut
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen; // Ouvre/ferme le menu au clic
    }
  }
}
</script>
<style>
  /* Styles pour la barre latérale */
.sidebar {
  width: 250px; /* largeur par défaut */
  height: 100vh; /* pleine hauteur */
  background-color: #ffffff; /* fond blanc */
  padding: 20px;
  border-right: 1px solid #ddd; /* ligne séparatrice */
  position: relative; /* position pour le bouton burger */
}

.burger {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: none; /* Cacher le bouton burger sur desktop */
}

.burger i {
  font-size: 24px;
}

/* Les éléments du menu sont affichés par défaut sur desktop */
.menu ul {
  display: block;
}

/* Styles pour l'état ouvert du menu sur mobile */
.menu-open {
  display: block !important; /* Forcer l'affichage du menu quand ouvert */
}

/* Responsivité: cache le menu et affiche le bouton burger sur mobile */
@media (max-width: 768px) {
  .sidebar {
    width: 100%; /* largeur totale sur mobile */
    height: auto; /* auto pour ajuster la hauteur */
    padding: 10px;
  }

  .menu ul {
    display: none; /* cacher le menu par défaut sur mobile */
  }

  .burger {
    display: block; /* afficher le bouton burger sur mobile */
  }
}

</style>