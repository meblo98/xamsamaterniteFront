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
import axios from 'axios';
import AdviceVideo from "@/components/AdviceVideo.vue";
import Layout from "@/components/layouts/Layout.vue";
import conseilService from '@/services/conseilService';

export default {
  components: {
    Layout,
    AdviceVideo,
  },
  data() {
    return {
      adviceVideos: [], // Initialement vide
    };
  },
  mounted() {
    this.fetchAdviceVideos(); // Appel à la méthode pour récupérer les conseils
  },
  methods: {
    // Méthode pour récupérer les conseils via une requête HTTP
    async fetchAdviceVideos() {
      try {
        const response = await conseilService.getConseils();
        this.adviceVideos = response.data; // Stocker les conseils dans le data
      } catch (error) {
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
