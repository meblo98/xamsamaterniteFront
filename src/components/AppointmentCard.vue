<template>
    <div class="appointment-card col-5">
      <i class="fa-regular fa-calendar"></i>
      <div class="appointment-info">
        <h3>Visite 8 ième mois</h3>
        <span>{{ date }}</span>
      </div>
      <div class="appointment-status mx-5">
        <a href=""><span>Voir les détails</span></a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AppointmentCard',
    props: {
      date: String,
      time: String
    }
  };
  </script>
  
  <style scoped>
  a span{
    text-decoration: none;
    text-transform: none;
  }
  .appointment-card {

    padding: 20px;
    border-radius: 10px;
    }
  </style>
  