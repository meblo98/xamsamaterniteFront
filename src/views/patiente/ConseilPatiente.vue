<template>
  <Layout>
    <section class="appointment">
      <h2>Conseils</h2>
      <div class="conseil-cards">
        <!-- Affichage conditionnel en cas de conseils absents -->
        <p v-if="adviceVideos.length === 0">Aucun conseil disponible pour le moment.</p>
        <AdviceVideo
          v-for="video in adviceVideos"
          :key="video.id"
          :image="video.image"
        ></AdviceVideo>
      </div>
    </section>
  </Layout>
</template>

<script>
  // Importation du composant AdviceVideo
  import AdviceVideo from "@/components/AdviceVideo.vue";

  // Importation du composant Layout
  import Layout from "@/components/layouts/Layout.vue";

  // Importation du service conseilService
  import conseilService from '@/services/conseilService';

  export default {
    // Définition des composants enfants
    components: {
      // Enregistrement du composant Layout
      Layout,
      // Enregistrement du composant AdviceVideo
      AdviceVideo,
    },

    // Définition de l'état initial du composant
    data() {
      // Initialisation d'un tableau vide pour stocker les vidéos de conseils
      return {
        adviceVideos: [], // Initialement vide
      };
    },

    // Définition du hook de cycle de vie mounted
    mounted() {
      // Appel à la méthode pour récupérer les conseils
      this.fetchAdviceVideos();
    },

    // Définition des méthodes du composant
    methods: {
      // Méthode pour récupérer les conseils via une requête HTTP
      async fetchAdviceVideos() {
        try {
          // Appel à la méthode getConseils du service conseilService
          const response = await conseilService.getConseils();
          // Stockage des conseils dans le tableau adviceVideos
          this.adviceVideos = response.mes_conseils; // Stocker les conseils dans le data
        } catch (error) {
          // Gestion des erreurs
          console.error('Erreur lors de la récupération des conseils:', error);
        }
      },
    },
  };
</script>
<style scoped>
.conseil-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}
</style>
