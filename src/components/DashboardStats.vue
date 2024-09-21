<template>
    <div class="dashboard-stats">
      <div class="stat-card w-50 m-3 d-flex" v-for="(stat, index) in stats" :key="index">
        <div class="icon m-3">{{ stat.icon }}</div>
        <div class="details m-2">
          <h4>{{ stat.value }}</h4>
          <p>{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        stats: [
          { icon: '🏥', value: '250', label: 'OPD d\'aujourd\'hui' },
          { icon: '🏨', value: '89', label: 'Accouchements d\'aujourd\'hui' },
          { icon: '🧑‍⚕️', value: '300', label: 'Patientes' },
          { icon: '🔧', value: '52', label: 'Materiels' },
        ],
      };
    },
  };
  </script>
  
  <style>
    .dashboard-stats {
      display: flex;
      justify-content: space-around;
      padding: 20px;
    }
  
    .stat-card {
      background-color: #fff;
      border-radius: 8px;
      padding: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
  
    .icon {
      font-size: 30px;
    }
  </style>
  