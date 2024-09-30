<template>
  <Layout>
    <!-- Appointment Section -->
    <section class="appointment">
      <h2>Prochains rendez-vous</h2>
      <div class="appointment-cards">
        <p v-if="appointments.length === 0">Aucun rendez-vous disponible pour le moment.</p>
        <AppointmentCard
          v-for="appointment in appointments.slice(0, 4)"
          :key="appointment.id"
          :date="appointment.date"
          :time="appointment.time"
        />
      </div>
    </section>

    <!-- Campaigns Section -->
    <section class="campaigns">
      <h2>Campagnes <a href="#">Voir toutes</a></h2>
      <div class="campaign-cards">
        <p v-if="campaigns.length === 0">Aucune campagne disponible pour le moment.</p>
        <CampaignCard
          v-for="campagne in campaigns.slice(0, 4)"
          :image="getImageUrl(campagne.image)"
        :title="campagne.nom"
        :date="formatDate(campagne.date_debut)"
        :location="campagne.lieu"
        :campagneId="campagne.id"
        />
      </div>
    </section>

    <!-- Advice Section -->
    <section class="advice">
      <h2>Conseils <a href="#">Voir tous</a></h2>
      <div class="advice-videos">
        <p v-if="adviceVideos.length === 0">Aucun conseil disponible pour le moment.</p>
        <AdviceVideo
          v-for="video in adviceVideos.slice(0, 4)"
          :key="video.id"
          :image="video.image"
        />
      </div>
    </section>
  </Layout>
</template>

<script>
import Layout from '@/components/layouts/Layout.vue';
import AppointmentCard from '@/components/AppointmentCard.vue';
import CampaignCard from '@/components/CampaignCard.vue';
import AdviceVideo from '@/components/AdviceVideo.vue';
import consultationService from '@/services/consultationService';
import campagneService from '@/services/campagneService';
import conseilService from '@/services/conseilService';

export default {
  components: {
    Layout,
    AppointmentCard,
    CampaignCard,
    AdviceVideo,
  },
  data() {
    return {
      appointments: [],
      campaigns: [],
      adviceVideos: [],
    };
  },
  mounted() {
    this.fetchAppointments();
    this.fetchCampaigns();
    this.fetchConseil();
  },
  methods: {
    // Fetch appointments from the backend
    async fetchAppointments() {
      try {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const response = await consultationService.getRendezVousByPatiente(userId);
        this.appointments = response.data;
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    },
    // Fetch campaigns from the backend
    async fetchCampaigns() {
      try {
        const response = await campagneService.getCampagnes();
        this.campaigns = response;
        console.log(this.campaigns);
        
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    },
    getImageUrl(image) {
      return `https://certif.lomouhamedelbachir.simplonfabriques.com/storage//${image}`; // Construire l'URL complète de l'image
      // return `http://127.0.0.1:8000/storage//${image}`; // Construire l'URL complète de l'image
    },
    // Fetch advice videos from the backend
    async fetchConseil() {
      try {
        const response = await conseilService.getConseils();
        this.adviceVideos = response.data;
      } catch (error) {
        console.error('Error fetching advice videos:', error);
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('fr-FR', options); // Formater la date
    },
  },
};
</script>

<style>
.appointment-cards, .campaign-cards, .advice-videos {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.appointment section, .campaigns section, .advice section {
  margin-bottom: 40px;
}

p {
  font-size: 16px;
  color: #555;
}

h2 {
  font-size: 24px;
  margin-bottom: 15px;
}

a {
  text-decoration: none;
  color: #007bff;
}
</style>
