<template>
    <div class="charts">
      <div class="chart">
        <h3>Statistiques des patientes</h3>
        <CanvasJSChart :options="options" :styles="styleOptions"/>
      </div>
      <div class="chart">
        <h3>Rapport sur les maladies fréquentes</h3>
        <CanvasJSChart :options="options" :styles="styleOptions"/>
      </div>
    </div>
  </template>
  
  <script>
import * as CanvasJS from '@canvasjs/charts';
  export default {
    data() {
      return {
        options: {
          theme: "light2",
          exportEnabled: true,
          title: {
            text: "Fertility Rate Comparison"
          },
          axisY: {
            title: "Fertitlity Rate"
          },
          toolTip: {
            shared: true
          },
          legend: {
            cursor: "pointer",
            itemclick: function (e) {
                if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                } else {
                    e.dataSeries.visible = true;
                }
                e.chart.render();
            }
          },
          data: [{
            type: "line",
            name: "Germany",
            showInLegend: true,
            color: "#F7C705",
            toolTipContent: "<img src=\"https://canvasjs.com/wp-content/uploads/images/gallery/javascript-column-bar-charts/germany.png\" style=\"height:11px;width:18px;\"> {name}: {y}",
            dataPoints: [
              { label: "2014", y: 1.47 },
              { label: "2015", y: 1.5 },
              { label: "2016", y: 1.6 },
              { label: "2017", y: 1.57 },
              { label: "2018", y: 1.57 },
              { label: "2019", y: 1.54 }
            ]
          }, {
            type: "line",
            name: "United Kingdom",
            showInLegend: true,
            color: "#012066",
            toolTipContent: "<img src=\"https://canvasjs.com/wp-content/uploads/images/gallery/javascript-column-bar-charts/uk.png\" style=\"height:11px;width:18px;\"> {name}: {y}",
            dataPoints: [
              { label: "2014", y: 1.81 },
              { label: "2015", y: 1.80 },
              { label: "2016", y: 1.79 },
              { label: "2017", y: 1.74 },
              { label: "2018", y: 1.68 },
              { label: "2019", y: 1.65 }
            ]
          }]
        },
        
        styleOptions: {
          width: "100%",
          height: "360px"
        }
      }
    },
    methods: {
      toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
          e.dataSeries.visible = false;
        }
        else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      }
    }
  }
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
  