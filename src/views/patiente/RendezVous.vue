<template>
  <Layout>
    <h2>Conseils</h2>
    <div class="appointment-list">
      
      <div v-if="appointments.length > 0">
        <div 
          v-for="appointment in appointments" 
          :key="appointment.id" 
          class="appointment-card-wrapper"
        >
          <AppointmentCard
            :date="formatDate(appointment.date)"
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
import consultationService from "@/services/consultationService";


export default {
  components: {
    AppointmentCard,
    Layout,
  },
  data() {
    return {
      appointments: [],
    };
  },
  mounted() {
    this.fetchAppointments();
  },
  methods: {
    async fetchAppointments() {
      try {
        const userId = JSON.parse(localStorage.getItem('user')).id;        
        const response = await consultationService.getRendezVousByPatiente(userId); // URL de ton API
        this.appointments = response; // Stocke les rendez-vous récupérés
        console.log(this.appointments);
        
      } catch (error) {
        console.error('Erreur lors de la récupération des rendez-vous :', error);
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
.appointment-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.appointment-card-wrapper {
  width: 250px;
}
h2 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #6932F9;
}
</style>
