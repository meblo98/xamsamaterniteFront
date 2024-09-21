<template>
    <div class="appointment-table">
      <h3>Rendez-vous fixé</h3>
      <table>
        <thead>
          <tr class="bg-danger">
            <th>#</th>
            <th> Nom de la patient </th>
            <th>Sage-femme désigné </th>
            <th>Date</th>
            <th>Maladies</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(appointment, index) in appointments" :key="index">
            <td>{{ appointment.id }}</td>
            <td>{{ appointment.patientName }}</td>
            <td>{{ appointment.doctor }}</td>
            <td>{{ appointment.date }}</td>
            <td>{{ appointment.disease }}</td>
            <td>
              <button><i class="fa fa-edit" aria-hidden="true"></i></button>
              <button><i class="fa-solid fa-trash-can" aria-hidden="true"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {  
      return {
        appointments: [
          { id: 1, patientName: 'Fatou Mbaye', doctor: 'Seynabou Ly', date: '12 Jan 2022', disease: 'Pregnancy' },
          { id: 2, patientName: 'Awa Faye', doctor: 'Seynabou Ly', date: '12 Jan 2022', disease: 'Family Planning' },
          { id: 3, patientName: 'Astou Ndiaye', doctor: 'Seynabou Ly', date: '12 Jan 2022', disease: 'Breastfeeding' },
        ],
      };
    },
  };
  </script>
  
  <style>
    .appointment-table {
      background-color: #fff;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
  
    table {
      width: 100%;
      border-collapse: collapse;
    }
  
    th, td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
  </style>
  