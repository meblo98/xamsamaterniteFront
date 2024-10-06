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
        { icon: '🏥', value: 0, label: 'Consultations d\'aujourd\'hui' },
        { icon: '🏨', value: 0, label: 'Accouchements dans le mois' },
        { icon: '🤰', value: 0, label: 'Patientes dans le poste' }
      ]
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
      const consultations = response || [];  // S'assure qu'il s'agit d'un tableau même si aucune donnée
      this.calculateDailyConsultations(consultations);
    },
    calculateDailyConsultations(consultations) {
      const today = new Date().toISOString().split("T")[0];
      const dailyConsultations = consultations.filter(
        (c) => c.date === today
      ).length;
      this.stats[0].value = dailyConsultations; // Met à jour la valeur de la première stat
    },

    // nombre d'accouchements par mois
    async accouchements() {
      const response = await accouchementService.getAccouchements();
      const accouchements = response.accouchements || [];  // S'assure qu'il s'agit d'un tableau
      this.calculateMonthlyAccoucchements(accouchements);
    },
    calculateMonthlyAccoucchements(accouchements) {
      const currentMonth = new Date().toISOString().split("T")[0].slice(0, 7);
      const monthlyAccoucchements = accouchements.filter(
        (a) => a.date.slice(0, 7) === currentMonth
      ).length;
      this.stats[1].value = monthlyAccoucchements; // Met à jour la deuxième stat
    },

    // nombre de patientes
    async patientes() {
      const response = await patienteService.getPatientes();
      const patientes = response.Liste_des_patientes || []; // S'assure qu'il s'agit d'un tableau
      this.calculatePatientes(patientes);
    },
    calculatePatientes(patientes) {
      const patientesCount = patientes.length;
      this.stats[2].value = patientesCount; // Met à jour la troisième stat
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

/* Responsive Design */
@media (max-width: 768px) {
  .dashboard-stats {
    flex-direction: column; 
    align-items: center; 
  }
  .stat-card {
    width: 100%; 
    margin: 10px 0; 
  }
}
</style>
