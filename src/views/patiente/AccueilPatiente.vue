<template>
  <Layout>
    <!-- Appointment Section -->
    <section class="appointment">
      <h2>Prochains rendez-vous</h2>
      <div class="appointment-cards">
        <div v-if="rv && rv.length > 0">
          <div
            v-for="appointment in rv.slice(0, 2)"
            :key="appointment.id"
            class="appointment-card-wrapper w-100"
          >
            <AppointmentCard
              :date="formatDate(appointment.date_rv)"
              :type="appointment.visite.libelle"
            />
          </div>
        </div>
        <p v-else>Aucun rendez-vous disponible pour le moment.</p>
      </div>
    </section>

    <!-- Campaigns Section -->
    <section class="campaigns">
      <h2>Campagnes <a href="#">Voir toutes</a></h2>
      <div class="campaign-cards">
        <p v-if="campaigns.length === 0">
          Aucune campagne disponible pour le moment.
        </p>
        <!-- :image="`https://certif.lomouhamedelbachir.simplonfabriques.com/storage/${campagne.image}`" -->

        <CampaignCard
          v-for="campagne in campaigns.slice(0, 4)"
          :image="`http://127.0.0.1:8000/storage//${campagne.image}`"
          :key="campagne.id"
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
        <p v-if="adviceVideos.length === 0">
          Aucun conseil disponible pour le moment.
        </p>
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
import Layout from "@/components/layouts/Layout.vue";
import AppointmentCard from "@/components/AppointmentCard.vue";
import CampaignCard from "@/components/CampaignCard.vue";
import AdviceVideo from "@/components/AdviceVideo.vue";
import consultationService from "@/services/consultationService";
import campagneService from "@/services/campagneService";
import conseilService from "@/services/conseilService";
import authService from "@/services/authService";
import urlImage from "@/services/imageUrl";

export default {
  components: {
    Layout,
    AppointmentCard,
    CampaignCard,
    AdviceVideo,
  },
  data() {
    return {
      rv: [],
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
        const userData = await authService.getUser();
        const patienteId = userData.profil.id;
        const response = await consultationService.getRendezVousByPatiente(
          patienteId
        );

        // Si la réponse est un objet et non un tableau, on le transforme en tableau
        if (response.mes_rv && !Array.isArray(response.mes_rv)) {
          this.rv = [response.mes_rv];
        } else {
          this.rv = response.mes_rv;
        }
      } catch (error) {
        // console.error(
        //   "Erreur lors de la récupération des rendez-vous :",
        //   error
        // );
      }
    },
    // Fetch campaigns from the backend
    async fetchCampaigns() {
      try {
        const response = await campagneService.getCampagnes();
        this.campaigns = response;
      } catch (error) {
        // console.error("Erreur lors de la récupération des campagnes:", error);
      }
    },

    // Fetch advice videos from the backend
    async fetchConseil() {
      try {
        const response = await conseilService.getConseils();
        this.adviceVideos = response.mes_conseils;        
      } catch (error) {
        // console.error("Erreur lors de la récupération des conseil:", error);
      }
    },
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("fr-FR", options); // Formater la date
    },
  },
};
</script>

<style>
.appointment-cards,
.campaign-cards,
.advice-videos {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.appointment-card-wrapper {
  width: 500px; /* increase the width */
  margin: 20px; /* add some margin for better spacing */
}

.appointment section,
.campaigns section,
.advice section {
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
  color: #5a3ee8;
}
</style>
