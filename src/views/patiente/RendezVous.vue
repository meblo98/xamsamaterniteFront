<template>
  <Layout>
    <div class="appointment">
      <h2>Mes rendez-vous</h2>
      <div class="cards">
        <AppointmentCard
          class="card"
          v-for="appointment in appointments"
          :key="appointment.id"
          :date="appointment.date"
          :time="appointment.time"
        />
      </div>
    </div>
  </Layout>
</template>

<script>
import AppointmentCard from "@/components/AppointmentCard.vue";
import Layout from "@/components/layouts/Layout.vue";

export default {
  components: {
    Layout,
    AppointmentCard,
  },
  data() {
    return {
      appointments: [
        { id: 1, date: "25 janvier 2032", time: "08 h 30" },
        { id: 2, date: "25 janvier 2032", time: "08 h 30" },
        { id: 1, date: "25 janvier 2032", time: "08 h 30" },
        { id: 2, date: "25 janvier 2032", time: "08 h 30" },
        { id: 1, date: "25 janvier 2032", time: "08 h 30" },
        { id: 2, date: "25 janvier 2032", time: "08 h 30" },
        { id: 1, date: "25 janvier 2032", time: "08 h 30" },
        { id: 2, date: "25 janvier 2032", time: "08 h 30" },
      ],
    };
  },
};
</script>

<style scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  width: calc(20% - 20px);
}

.card i {
  font-size: 30px;
  color: #f49efa;
}



@media (max-width: 992px) {
  .card {
    width: calc(33.33% - 20px);
  }
}

@media (max-width: 768px) {
  .card {
    width: calc(50% - 20px);
  }
}

@media (max-width: 576px) {
  .card {
    width: 100%;
  }
}
</style>