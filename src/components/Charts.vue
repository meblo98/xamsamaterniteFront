<template>
    <div class="charts">
      <div class="chart">
        <h3>Statistiques des patientes</h3>
        <canvas id="patientStats"></canvas>
      </div>
      <div class="chart">
        <h3>Rapport sur les maladies fréquentes</h3>
        <canvas id="diseaseReport"></canvas>
      </div>
    </div>
  </template>
  
  <script>
  import { Chart } from 'chart.js';
  
  export default {
    mounted() {
      this.renderPatientStatsChart();
      this.renderDiseaseReportChart();
    },
    methods: {
      renderPatientStatsChart() {
        const ctx = document.getElementById('patientStats').getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                label: 'New Patients',
                data: [120, 190, 300, 500, 200, 300, 450],
                borderColor: '#ff6384',
                fill: false,
              },
              {
                label: 'Old Patients',
                data: [100, 150, 250, 400, 170, 250, 400],
                borderColor: '#36a2eb',
                fill: false,
              },
            ],
          },
        });
      },
      renderDiseaseReportChart() {
        const ctx = document.getElementById('diseaseReport').getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Disease A', 'Disease B', 'Disease C', 'Disease D', 'Disease E'],
            datasets: [
              {
                label: 'Number of Cases',
                data: [200, 150, 180, 220, 170],
                backgroundColor: '#36a2eb',
              },
            ],
          },
        });
      },
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
  </style>
  