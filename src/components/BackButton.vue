<template>
    <button @click="goBack" class="back-button">
      Retour
    </button>
  </template>
  
  <script>
  export default {
    methods: {
      goBack() {
        this.$router.go(-1); // Retourne à la page précédente
      },
    },
  };
  </script>
  
  <style scoped>
.back-button {
  background-color: #6932f9;
  color: white;
  border: none;
  width: 100%; /* Remplacez 10vw par 100% pour remplir le conteneur */
  max-width: 200px; /* Ajoutez une largeur maximale si nécessaire */
  padding: 10px; /* Augmentez le padding pour un meilleur aspect sur mobile */
  margin-bottom: 10px;
  cursor: pointer;
}
  </style>