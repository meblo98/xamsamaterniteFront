<script>
import consultationService from '@/services/consultationService'; // Service pour récupérer les données du backend
import * as CanvasJS from '@canvasjs/charts';
import { Chart } from 'chart.js';

export default {
  data() {
    return {
      Chart: null, // Define chartInstance here
      options: {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "Flux mensuel des consultations"
        },
        axisY: {
          title: "Nombre de consultations",
          labelFormatter: function(e) {
            return e.value.toLocaleString(); // Format des valeurs sur l'axe Y
          }
        },
        toolTip: {
          shared: true,
          contentFormatter: function(e) {
            return "<span style='color:" + e.entries[0].dataSeries.color + ";'>" + e.entries[0].dataPoint.label + "</span>: " + e.entries[0].dataPoint.y + " consultations";
          }
        },
        data: [{
          type: "splineArea",
          color: "#7986CB",
          dataPoints: [] // Initialement vide, les données seront chargées dynamiquement
        }]
      },
      styleOptions: {
        width: "100%",
        height: "360px"
      }
    };
  },
  methods: {
    async fetchMonthlyConsultationData() {
      try {
        const response = await consultationService.getConsultations();
        const consultations = response;        
        const monthlyConsultations = {};

        consultations.forEach(consultation => {
          const date = new Date(consultation.date);
          const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
          
          if (monthlyConsultations[monthYear]) {
            monthlyConsultations[monthYear]++;
          } else {
            monthlyConsultations[monthYear] = 1;
          }
        });

        const dataPoints = Object.keys(monthlyConsultations).map(month => ({
          label: month,
          y: monthlyConsultations[month]
        }));

        this.options.data[0].dataPoints = dataPoints;
        this.$forceUpdate();
   
      } catch (error) {
        console.error("Erreur lors de la récupération des données de consultation:", error);
      }
    }
  },
  mounted() {
    this.fetchMonthlyConsultationData();
  }
};
</script>

<template>
  <CanvasJSChart :options="options" :styles="styleOptions" @chart-ref="chartInstance"/>
</template>
