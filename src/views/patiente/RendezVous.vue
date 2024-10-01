<template>
  <Layout>
    <h2>Mes Rendez-vous</h2>
    <div class="appointment-list">
      <!-- Ajout de log pour vérifier rv -->
      <div v-if="rv && rv.length > 0">
        <div
          v-for="appointment in rv"
          :key="appointment.id"
          class="appointment-card-wrapper"
        >
          <AppointmentCard
            :date="formatDate(appointment.date_rv)"
            :type="appointment.visite.libelle"
          />
        </div>
      </div>
      <div v-else>
        <p>Aucun rendez-vous pour toi.</p>
      </div>
    </div>
  </Layout>
</template>

<script>
import AppointmentCard from "@/components/AppointmentCard.vue";
import Layout from "@/components/layouts/Layout.vue";
import authService from "@/services/authService";
import consultationService from "@/services/consultationService";

export default {
  components: {
    AppointmentCard,
    Layout,
  },
  data() {
    return {
      rv: [], // Liste des rendez-vous
    };
  },
  mounted() {
    this.fetchAppointments(); // Charger les rendez-vous à la montée du composant
  },
  methods: {
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
        console.error(
          "Erreur lors de la récupération des rendez-vous :",
          error
        );
      }
    },
    // Fonction pour formater la date en français
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("fr-FR", options);
    },
  },
};
</script>

<style scoped>
.appointment-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.appointment-card-wrapper {
  width: 350px;
}
h2 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #6932f9;
}
</style>
