<script>
import patienteService from '@/services/patienteService';

export default {
  data() {
    return {
      options: {
        theme: "light2",
        animationEnabled: true,
        title: {
          text: "Répartition des Tranches d'Âge des Patientes"
        },
        subtitles: [{
          text: "En pourcentage"
        }],
        data: [{
          type: "doughnut",
          startAngle: 90,
          indexLabel: "{label} : {y}",
          yValueFormatString: "#,##0'%'",
          toolTipContent: "<span style='color: {color};'>{label}</span>: {y}%",
          dataPoints: []
        }]
      },
      styleOptions: {
        width: "100%",
        height: "360px"
      }
    };
  },
  methods: {
    // Fonction pour calculer l'âge en fonction de la date de naissance
    calculerAge(dateNaissance) {
      const today = new Date();
      const birthDate = new Date(dateNaissance);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    async fetchAndCalculateAgeDistribution() {
      try {
        const response = await patienteService.getPatientes(); // Appel au service pour récupérer les patientes
        const patients = response.Liste_des_patientes; // Liste des patientes
        const ageDistribution = {
          "12-18": 0,
          "19-25": 0,
          "26-35": 0,
          "36+": 0
        };
        
        // Calcul du nombre de patientes dans chaque tranche d'âge
        patients.forEach(patient => {
          const age = this.calculerAge(patient.date_de_naissance);
          if (age >= 12 && age <= 18) {
            ageDistribution["12-18"]++;
          } else if (age >= 19 && age <= 25) {
            ageDistribution["19-25"]++;
          } else if (age >= 26 && age <= 35) {
            ageDistribution["26-35"]++;
          } else if (age >= 36) {
            ageDistribution["36+"]++;
          }
        });

        // Calcul du pourcentage pour chaque tranche d'âge
        const totalPatients = patients.length;
        const dataPoints = [
          { label: "12-18 ans", y: ((ageDistribution["12-18"] / totalPatients) * 100).toFixed(2), color: "#4F81BC" },
          { label: "19-25 ans", y: ((ageDistribution["19-25"] / totalPatients) * 100).toFixed(2), color: "#C0504D" },
          { label: "26-35 ans", y: ((ageDistribution["26-35"] / totalPatients) * 100).toFixed(2), color: "#9BBB59" },
          { label: "36 ans et plus", y: ((ageDistribution["36+"] / totalPatients) * 100).toFixed(2), color: "#8064A2" }
        ];

        // Mise à jour des données du graphique
        this.options.data[0].dataPoints = dataPoints;
        this.$forceUpdate();
      } catch (error) {
        console.error("Erreur lors de la récupération des données des patientes :", error);
      }
    }
  },
  mounted() {
    this.fetchAndCalculateAgeDistribution(); // Appel de la méthode pour récupérer et calculer les données au montage du composant
  }
};
</script>

<template>
  <CanvasJSChart :options="options" :style="styleOptions"/>
</template>
