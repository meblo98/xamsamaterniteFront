<script>
export default {
  data() {
    return {
      chart: null,
      options: {
        animationEnabled: true,
        exportEnabled: true,
        title:{
          text: "Accouchements par Mois"
        },
        axisX: {
          title: "Mois",
          labelAngle: -30
        },
        axisY: {
          title: "Nombre d'Accouchements",
          suffix: ""
        },
        data: [{
          type: "bar",
          yValueFormatString: "#,###",
          dataPoints: [
            { label: "Janvier", y: 120 },
            { label: "Février", y: 130 },
            { label: "Mars", y: 150 },
            { label: "Avril", y: 140 },
            { label: "Mai", y: 160 },
            { label: "Juin", y: 170 },
            { label: "Juillet", y: 180 },
            { label: "Août", y: 190 },
            { label: "Septembre", y: 200 },
            { label: "Octobre", y: 210 },
            { label: "Novembre", y: 220 },
            { label: "Décembre", y: 230 }
          ]
        }]
      }
    }
  }
}
</script>

<template>
    <CanvasJSChart :options="options"/>
</template>