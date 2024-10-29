
<template>
  <Layout>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <DashboardStats />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-6">
          <SurfaceChart/>
        </div>
        <div class="col-6">
          <BarChart/>
        </div>
      </div>
      <!-- <div class="row mb-5">
        <Charts />
      </div> -->
      <div class="row mb-3">
        <div class="col-6">
          <ChartCirculaire/>
        </div>
        <div class="col-6">
          <MultiserieChart/>
        </div>
      </div>
    </div>
  </Layout>
  </template>
  
  <script>
  import BarChart from '@/components/BarChart.vue';
import ChartCirculaire from '@/components/ChartCirculaire.vue';
import Charts from '@/components/Charts.vue';
import DashboardStats from '@/components/DashboardStats.vue';
import Layout from '@/components/layouts/Layout.vue';
import MultiserieChart from '@/components/MultiserieChart.vue';
import SurfaceChart from '@/components/SurfaceChart.vue';
  
  export default {
    components: {
      Layout,
      DashboardStats,
      Charts,
      ChartCirculaire,
      MultiserieChart,
      SurfaceChart,
      BarChart,
    }
  };
  </script>
  
  <style>
/* Medium screen and up */
@media (min-width: 768px) {
  .dashboard {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 20px;
  }
}

/* Small screen */
@media (max-width: 767px) {
  .dashboard {
    display: block;
  }
  .row {
    flex-direction: column;
  }
  .col-8, .col {
    width: 100%;
  }
}

/* Extra small screen */
@media (max-width: 479px) {
  .dashboard {
    padding: 10px;
  }
  .row {
    margin-bottom: 20px;
  }
}
</style>