<template>
  <div class="layout">
    <!-- Sidebar -->
    <aside :class="['sidebar', { 'menu-open': isOpen }]">
      <nav class="menu">
        <!-- Burger Button (visible on mobile) -->

        <!-- Logo -->
        <div class="logo">
          <img
            src="@/assets/images/logo.png"
            alt="XAM Sa Maternité"
            class="w-100"
          />
        </div>
        <ul v-if="role === 'admin'">
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard-admin"><i class="fa-brands fa-windows"></i>Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/structure">Structure</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/listeVisite-admin">Visite</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/listeSageFemme-admin">Sage-femme</router-link>
          </li>
        </ul>
        <!-- Navigation Links -->
        <ul v-if="role === 'patiente'">
          <li>
            <router-link to="/dashboard-patiente" class="active"
              ><i class="fa-brands fa-windows"></i> Dashboard</router-link
            >
          </li>
          <li>
            <router-link to="/rv-patiente"
              ><i class="fas fa-calendar"></i> Rendez-vous</router-link
            >
          </li>
          <li>
            <router-link to="/conseil-patiente"
              ><i class="fas fa-lightbulb"></i> Conseils</router-link
            >
          </li>
          <li>
            <router-link to="/campagne-patiente">🔈 Campagnes</router-link>
          </li>
        </ul>

        <ul v-if="role === 'sage-femme'">
          <li>
            <router-link to="/dashboard-sage-femme"
              ><i class="fa-brands fa-windows"></i> Dashboard</router-link
            >
          </li>
          <li>
            <router-link to="/patiente-sage-femme"
              >🤰  Patientes</router-link
            >
          </li>
          <li>
            <router-link to="/badiene-sage-femme">👩‍🦰 Badienes Gox</router-link>
          </li>
          <li>
            <router-link to="/enfant-sage-femme">🧒 Enfant</router-link>
          </li>
        </ul>

        <ul v-if="role === 'badiene-gox'">
          <li>
            <router-link to="/dashboard-badiene-gox"
              ><i class="fa-brands fa-windows"></i> Dashboard</router-link
            >
          </li>
          <li>
            <router-link to="campagne-badiene-gox">🔈 Campagnes</router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Header -->
      <header class="header">
        <input id="checkbox" type="checkbox" />
        <label class="toggle" for="checkbox" @click="toggleMenu">
          <div id="bar1" class="bars" style="background-color: #ddd"></div>
          <div id="bar2" class="bars" style="background-color: #ddd"></div>
          <div id="bar3" class="bars" style="background-color: #ddd"></div>
        </label>

        <div class="search-bar">
          <!-- <input type="text" placeholder="Rechercher quelque chose" />
          <i class="fi fi-br-search"></i> -->
        </div>
        <!-- User Profile Icons -->
        <div class="user-profile">
          <i class="fi fi-rr-settings" @click="openSettings" v-b-tooltip.hover title="Paramètres"></i>
          <i class="fas fa-bell" v-b-tooltip.hover title="Notifications"></i>
          <img :src="`https://certif.lomouhamedelbachir.simplonfabriques.com/storage//${userData.photo}`" alt="User Image" />
          <!-- <img :src="`http://127.0.0.1:8000/storage//${userData.photo}`" alt="User Image" /> -->
          <div class="dropdown">
            <button class="dropdown-toggle" @click="toggleDropdown">
              <!-- Icône pour le dropdown -->
            </button>
            <ul class="dropdown-menu">
              <li><a href="#" @click="openSettings"><i class="fi fi-rr-settings"></i>Paramètres</a></li>
              <li><a href="#" @click.prevent="logout">
                <i class="fi fi-br-sign-out-alt"></i>Déconnexion
        </a></li>
            </ul>
          </div>
        </div>
      </header>

      <!-- Main Slot (Dynamic Content) -->
      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script>
import apiClient from '@/services/api';
import getMediaUrl from '@/services/api';
import authService from '@/services/authService';
export default {
  name: "Layout",
  data() {
    return {
      isOpen: false, // Sidebar starts closed on mobile
      userRole: "", // Store the user's role
      profileImage: "", // Store the profile image URL
      userData: {}, // Store the user data
    };
    
  },
  computed: {
    role() {
      return localStorage.getItem("role");
    },
  },
  mounted() {
    this.getUserData();
  },
  methods: {
    logout() {
      // Supprimer le token de l'utilisateur
      localStorage.removeItem('token');

      // Faire la redirection vers la racine
      this.$router.push({ name: 'login' });
    },
    toggleDropdown() {
      const dropdownMenu = document.querySelector(".dropdown-menu");
      dropdownMenu.style.display =
        dropdownMenu.style.display === "block" ? "none" : "block";
    },
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    openSettings() {
      this.$router.push("/settings");
    },
    async getUserData() {
      try {
        // Appel API pour récupérer les données de l'utilisateur
        const response = await authService.getUser();
        const userData = response.user;
        
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur', error);
      }
    },
  },
};
</script>

<style scoped>
@import url("https://cdn-uicons.flaticon.com/2.6.0/uicons-bold-rounded/css/uicons-bold-rounded.css");
@import url("https://cdn-uicons.flaticon.com/2.6.0/uicons-regular-rounded/css/uicons-regular-rounded.css");
@import url('https://cdn-uicons.flaticon.com/2.6.0/uicons-bold-rounded/css/uicons-bold-rounded.css');
.layout {
  display: flex;
  min-height: 100vh;
}
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  background-color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  display: none;
}

.dropdown-menu li {
  margin-bottom: 10px;
}

.dropdown-menu li a {
  color: #333;
  text-decoration: none;
}



.dropdown:hover .dropdown-menu {
  display: block;
}
/* Sidebar (desktop default) */
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #ffffff;
  transition: left 0.3s ease;
  position: relative;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
}

/* From Uiverse.io by vinodjangid07 */
#checkbox {
  display: none;
}

.toggle {
  display: none;
}

.bars {
  width: 100%;
  height: 4px;
  background-color: rgb(253, 255, 243);
  border-radius: 5px;
  transition-duration: 0.3s;
}

/* #checkbox:checked + .toggle .bars {
  margin-left: 13px;
} */

#checkbox:checked + .toggle #bar2 {
  transform: translateY(14px) rotate(60deg);
  margin-left: 0;
  transform-origin: right;
  transition-duration: 0.3s;
  z-index: 2;
}

#checkbox:checked + .toggle #bar1 {
  transform: translateY(28px) rotate(-60deg);
  transition-duration: 0.3s;
  transform-origin: left;
  z-index: 1;
}

#checkbox:checked + .toggle {
  transform: rotate(-90deg);
}

/* Sidebar Menu for Larger Screens */
.menu ul {
  list-style: none;
  padding: 0;
}

.menu ul li {
  margin: 15px 0;
}

/* Responsive Styles for Mobile (max-width: 768px) */
@media (max-width: 768px) {
  /* Layout for Small Screens */
  .layout {
    flex-direction: column;
  }
  .toggle {
    position: relative;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition-duration: 0.3s;
  }
  .search-bar {
    position: relative;
    width: 200px;
    margin-left: 50px;
  }

  /* Sidebar Initially Hidden on Mobile */
  .sidebar {
    position: absolute;
    left: -250px; /* Hidden by default */
    height: 100vh;
    transition: left 0.3s ease;
  }

  /* When Menu is Open */
  .sidebar.menu-open {
    left: 0; /* Slide Sidebar in */
  }

  /* Show Burger Button on Mobile */
  .burger {
    display: block;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }

  /* Hide Menu by Default on Mobile */
  .menu ul {
    display: none;
  }

  /* Display Menu when open */
  .sidebar.menu-open ul {
    display: block;
  }

  /* Adjust Search Bar and Profile for Mobile */
  .search-bar input {
    width: 100px;
  }

  .user-profile img {
    width: 30px;
    height: 30px;
  }
}

/* Smaller Mobile Screens (max-width: 480px) */
@media (max-width: 480px) {
  .sidebar {
    width: 100%;
    left: -100%;
  }
  .toggle {
    position: relative;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition-duration: 0.3s;
  }
  .sidebar.menu-open {
    left: 0;
  }
}
</style>
