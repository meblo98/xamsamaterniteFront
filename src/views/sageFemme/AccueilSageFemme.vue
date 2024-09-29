
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
  