
<template>
  <Layout>
    <div class="dashboard d-block">
      <div class="row">
        <DashboardStats />
      </div>
      <div class="row mb-5">
        <Charts />
      </div>
     <div class="row">
      <div class="col-8">
        <!-- <AppointmentTable /> -->
      </div>
     <div class="col">
      <!-- <SageFemmeList /> -->
     </div>
     </div>
    </div>
  </Layout>
</template>

<script>
import DashboardStats from '@/components/DashboardStats.vue';
import Charts from '@/components/Charts.vue';
import AppointmentTable from '@/components/AppointmentTable.vue';
import SageFemmeList from '@/components/SageFemmeList.vue';
import Layout from "@/components/layouts/Layout.vue";

export default {
  components: {
    Layout,
    DashboardStats,
    Charts,
    AppointmentTable,
    SageFemmeList,
  },
};
</script>


<style>
body {
  background-color: #eaecf0;
}

.dashboard {
  /* display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px; */
}

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