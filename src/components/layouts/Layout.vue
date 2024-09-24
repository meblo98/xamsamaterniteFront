<template>
  <div class="layout">
    <!-- Sidebar -->
    <aside :class="['sidebar', { 'menu-open': isOpen }]">
      <nav class="menu">
        <!-- Burger Button (visible on mobile) -->

 <input id="checkbox" type="checkbox">
    <label class="toggle" for="checkbox">
        <div id="bar1" class="bars"></div>
        <div id="bar2" class="bars"></div>
        <div id="bar3" class="bars"></div>
    </label>


        <!-- Logo -->
        <div class="logo">
          <img
            src="@/assets/images/logo.png"
            alt="XAM Sa Maternité"
            class="w-100"
          />
        </div>
        <!-- Navigation Links -->
        <ul>
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
              ><i class="fas fa-bell"></i> Conseils</router-link
            >
          </li>
          <li>
            <router-link to="/campagne-patiente"
              ><i class="fi fi-rs-megaphone-announcement-leader"></i>
              Campagnes</router-link
            >
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Header -->
      <header class="header">
        <div class="search-bar">
          <input type="text" placeholder="Rechercher quelque chose" />
          <i class="fi fi-br-search"></i>
        </div>
        <!-- User Profile Icons -->
        <div class="user-profile">
          <i class="fi fi-rr-settings"></i>
          <i class="fas fa-bell"></i>
          <img src="@/assets/images/profil.jpeg" alt="User Image" />
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
import { defineComponent } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  name: "Layout",
  data() {
    return {
      isOpen: false, // Sidebar starts closed on mobile
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped>
@import url("https://cdn-uicons.flaticon.com/2.6.0/uicons-bold-rounded/css/uicons-bold-rounded.css");
@import url("https://cdn-uicons.flaticon.com/2.6.0/uicons-regular-rounded/css/uicons-regular-rounded.css");

.layout {
  display: flex;
  min-height: 100vh;
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
  position: relative;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition-duration: .3s;
}

.bars {
  width: 100%;
  height: 4px;
  background-color: rgb(253, 255, 243);
  border-radius: 5px;
  transition-duration: .3s;
}

/* #checkbox:checked + .toggle .bars {
  margin-left: 13px;
} */

#checkbox:checked + .toggle #bar2 {
  transform: translateY(14px) rotate(60deg);
  margin-left: 0;
  transform-origin: right;
  transition-duration: .3s;
  z-index: 2;
}

#checkbox:checked + .toggle #bar1 {
  transform: translateY(28px) rotate(-60deg);
  transition-duration: .3s;
  transform-origin: left;
  z-index: 1;
}

#checkbox:checked + .toggle {
  transform: rotate(-90deg);
}
/* #checkbox:checked + .toggle #bar3 {
  transform: rotate(90deg);
  transition-duration: .3s;
  transform-origin:right;
} */


/* Burger Button Hidden on Desktop */
/* .burger {
  display: none;
} */

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

  .sidebar.menu-open {
    left: 0;
  }
}
</style>
