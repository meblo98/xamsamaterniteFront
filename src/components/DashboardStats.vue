<template>
  <div class="dashboard-stats">
    <div
      class="stat-card w-100 m-3 d-flex"
      v-for="(stat, index) in stats"
      :key="index"
    >
      <div class="icon m-3">{{ stat.icon }}</div>
      <div class="details m-2">
        <h4>{{ stat.value }}</h4>
        <p>{{ stat.label }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import accouchementService from "@/services/accouchementService";
import consultationService from "@/services/consultationService";
import patienteService from "@/services/patienteService";

export default {
  data() {
    return {
      stats: [
        // { icon: '🏥', value: dailyConsultations, label: 'Consultations d\'aujourd\'hui' },
        // { icon: '🏨', value: '89', label: 'Accouchements dans le mois' },
        // { icon: '🤰 ', value: '300', label: 'Patientes dans le poste' },
      ],
      dailyConsultations: 0,
    };
  },
  async mounted() {
    await this.consultations();
    await this.accouchements();
    await this.patientes();
  },
  methods: {
    async consultations() {
      const response = await consultationService.getConsultations();
      const consultations = response;
      this.calculateDailyConsultations(consultations);
    },
    calculateDailyConsultations(consultations) {
      const today = new Date().toISOString().split("T")[0];
      const dailyConsultations = consultations.filter(
        (c) => c.date === today
      ).length;
      this.stats.push({
        icon: "🏥",
        value: dailyConsultations,
        label: "Consultations d'aujourd'hui",
      });
    },

    // nombre d'accouchement par mois
    async accouchements() {
      const response = await accouchementService.getAccouchements();
      const accouchements = response.accouchements;
      await this.calculateMonthlyAccoucchements(accouchements);
    },

    async calculateMonthlyAccoucchements(accouchements) {
      const currentMonth = new Date().toISOString().split("T")[0].slice(0, 7);
      const monthlyAccoucchements = accouchements.filter(
        (a) => a.date.slice(0, 7) === currentMonth
      ).length;
      this.stats.push({
        icon: "🏨",
        value: monthlyAccoucchements,
        label: "Accouchements dans le mois",
      });
    },
    // nombre de patientes
    async patientes() {
      const response = await patienteService.getPatientes();
      const patientes = response.Liste_des_patientes;
      await this.calculePatiente(patientes);
    },
    async calculePatiente(patientes) {
      const patientesCount = patientes.length;
      this.stats.push({
        icon: "🤰",
        value: patientesCount,
        label: "Patientes dans le poste",
      });
    },
  },
};
</script>

<style>
.dashboard-stats {
  display: flex;
  justify-content: space-around;
}

.stat-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.icon {
  font-size: 30px;
}

.icon {
  font-size: 30px;
}

/* Ajoutez cette règle pour les appareils mobiles */
@media (max-width: 768px) {
  .dashboard-stats {
    flex-direction: column; /* Modifiez la disposition en colonne */
    align-items: center; /* Centrez les éléments */
  }
  .stat-card {
    width: 100%; /* Modifiez la largeur pour qu'elle soit de 100% */
    margin: 10px 0; /* Modifiez les marges pour qu'elles soient uniquement en haut et en bas */
  }
}
</style>
