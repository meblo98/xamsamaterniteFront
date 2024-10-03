<template>
  <div class="charts">
    <div class="chart">
      <h3>Fréquence des patientes en fonction des mois</h3>
      <CanvasJSChart :options="patientsChartOptions" :styles="styleOptions"/>
    </div>
    <div class="chart">
      <h3>Fréquence des accouchements en fonction des mois</h3>
      <CanvasJSChart :options="deliveriesChartOptions" :styles="styleOptions"/>
    </div>
  </div>
</template>

<script>
import accouchementService from "@/services/accouchementService";
import patienteService from "@/services/patienteService";

export default {
  data() {
    return {
      patientsChartOptions: {
        animationEnabled: true,
        exportEnabled: true,
        title: { text: "Fréquence des patientes par mois" },
        axisX: { title: "Mois ⟶" },
        axisY: { title: "Nombre ⟶" },
        data: [{ type: "spline", dataPoints: [] }], // Données vides au départ
      },
      deliveriesChartOptions: {
        animationEnabled: true,
        exportEnabled: true,
        title: { text: "Fréquence des accouchements par mois" },
        axisX: { title: "Mois ⟶" },
        axisY: { title: "Nombre ⟶" },
        data: [{ type: "spline", dataPoints: [] }], // Données vides au départ
      },
      styleOptions: {
        width: "100%",
        height: "360px",
      },
    };
  },
  methods: {
    async patienteStat() {
      try {
        const response = await patienteService.getPatientes();
        const patientes = response.Liste_des_patientes;
        
        // Grouper les patientes par mois
        const monthlyData = patientes.reduce((acc, patiente) => {
          const month = new Date(patiente.created_at).getMonth() + 1; // Obtenir le mois (Janvier = 1, Février = 2, ...)
          if (!acc[month]) acc[month] = 0;
          acc[month]++;
          return acc;
        }, {});

        // Créer les points de données pour le graphique
        const dataPoints = Object.keys(monthlyData).map((month) => ({
          label: this.getMonthLabel(month),
          y: monthlyData[month],
        }));

        // Mettre à jour les options du graphique avec les nouvelles données
        this.patientsChartOptions.data[0].dataPoints = dataPoints;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des statistiques des patientes:",
          error
        );
      }
    },
    
    // Récupérer les statistiques des accou chements
    async accouchementStat() {
      try {
        const response = await accouchementService.getAccouchements();
        const accouchements = response.accouchements;

        // Grouper les accouchements par mois
        const monthlyData = accouchements.reduce((acc, accouchement) => {
          const month = new Date(accouchement.created_at).getMonth() + 1; // Obtenir le mois
          if (!acc[month]) acc[month] = 0;
          acc[month]++;
          return acc;
        }, {});

        // Créer les points de données pour le graphique
        const dataPoints = Object.keys(monthlyData).map((month) => ({
          label: this.getMonthLabel(month),
          y: monthlyData[month],
        }));

        // Mettre à jour les options du graphique avec les nouvelles données
        this.deliveriesChartOptions.data[0].dataPoints = dataPoints;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des statistiques des accouchements:",
          error
        );
      }
    },


    getMonthLabel(month) {
      const months = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
      ];
      return months[month - 1]; // Obtenir le mois correspondant
    },

  },
  mounted() {
    this.patienteStat();
    this.accouchementStat(); // Récupérer les statistiques des accouchements au montage
  },
};
</script>

<style>
.charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.chart {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Styles pour mobile */
@media only screen and (max-width: 768px) {
  .charts {
    grid-template-columns: 1fr;
  }
  .chart {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
