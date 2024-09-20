<template>
    <div>
      <Navbar /> <!-- La barre de navigation pour l'admin sera affichée ici -->
      <h1>Bienvenue patiente</h1>
      <!-- Autres contenus spécifiques à l'admin -->
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue';
  
  export default {
    components: {
      Navbar
    }
  };
  </script>
  