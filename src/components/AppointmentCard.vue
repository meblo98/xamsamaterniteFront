<template>
  <div class="appointment-card">
    <i class="fa-regular fa-calendar"></i>
    <div class="appointment-info">
      <h3>{{ type }}</h3>
      <span>{{ date }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppointmentCard",
  props: {
    date: String,
    type: String,
  },
};
</script>

<style scoped>
.appointment-card {
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.appointment-card i {
  font-size: 24px;
  margin-bottom: 10px;
}

.appointment-info h3 {
  margin: 10px 0;
  font-size: 18px;
  color: #333;
}

.appointment-info span {
  color: #666;
}
</style>
