<script>
export default {
  data() {
    return {
      chart: null,
      options: {
        animationEnabled: true,
        exportEnabled: true,
        title:{
          text: "Primary Plastic Production by Industry Section - 2015"
        },
        axisX: {
          labelTextAlign: "right"
        },
        axisY: {
          title: "in Million Tonnes per Year",
          suffix: "M"
        },
        data: [{
          type: "bar",
          yValueFormatString: "#,###M tonnes",
          dataPoints: [
            { label: "Industrial Machinery", y: 3 },
            { label: "Electrical/Electronic", y: 18 },
            { label: "Transportation", y: 27 },
            { label: "Consumer & Institutional Products", y: 42 },
            { label: "Other sectors", y: 47 },
            { label: "Textiles", y: 59 },
            { label: "Building and Construction", y: 65 },
            { label: "Packaging", y: 146 }
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