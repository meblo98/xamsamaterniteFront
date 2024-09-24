<template>
  <Layout>
    <div class="campaign-list">
      <CampaignCard v-for="n in 8" :key="n" />
    </div>
  </Layout>
  </template>
  
  <script>
  import CampaignCard from "@/components/CampaignCard.vue";
import Header from "@/components/layouts/Header.vue";
import Layout from "@/components/layouts/Layout.vue";
import Sidebar from "@/components/layouts/Sidebar.vue";
  
  export default {
    components: {
      CampaignCard,
      Layout
    },
  };
  </script>
  
  <style scoped>
  .campaign-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 50px;
    padding: 20px;
  }
  
  @media (max-width: 768px) {
    .campaign-list {
      grid-template-columns: 1fr;
      gap: 10px;
    }
  }
  </style>
  