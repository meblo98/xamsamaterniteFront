<template>
  <Layout>
    <h2>Les campagnes</h2>
    <div class="campaign-list">
    <article 
      v-for="campagne in campagnes" 
      :key="campagne.id" 
      class="card-wrapper"
    >
      <CampaignCard
      :image="`https://certif.lomouhamedelbachir.simplonfabriques.com/storage/${campagne.image}`"
      :title="campagne.nom"
        :date="formatDate(campagne.date_debut)"
        :location="campagne.lieu"
        :campagneId="campagne.id"
      />
    </article>
  </div>
  </Layout>
</template>

<script>
import CampaignCard from "@/components/CampaignCard.vue";
import Layout from "@/components/layouts/Layout.vue";
import campagneService from "@/services/campagneService";
import urlImage from "@/services/imageUrl";

export default {
  components: {
    CampaignCard,
    Layout,
  },
  data() {
    return {
      campagnes: [],
    };
  },
  mounted() {
    this.fetchCampagnes();
  },
  methods: {
    async fetchCampagnes() {
      try {
        const response = await campagneService.getCampagnes(); // L'URL de ton API
        this.campagnes = response; // Stockage des campagnes récupérées        
      } catch (error) {
        console.error('Erreur lors de la récupération des campagnes :', error);
      }
    },
 
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('fr-FR', options); // Formater la date
    },
  },
  
};


</script>

<style scoped>
.campaign-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 50px;
  padding: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #6932f9;
}

@media (max-width: 768px) {
  .campaign-list {
    grid-template-columns: 1fr;
    gap: 10px;
    
  }
}
</style>
