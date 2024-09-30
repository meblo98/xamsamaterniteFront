
<template>
  <Layout>
    <div class="container">
      <div class="row">
        <DashboardStats />
      </div>
      <div class="row mb-5">
        <Charts />
      </div>
    </div>
  </Layout>
  </template>
  
  <script>
  import Charts from '@/components/Charts.vue';
import DashboardStats from '@/components/DashboardStats.vue';
import Layout from '@/components/layouts/Layout.vue';
  
  export default {
    components: {
      Layout,
      DashboardStats,
      Charts
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