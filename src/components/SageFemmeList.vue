<template>
  <div class="sage-femme-list">
    <h3>Liste des sage-femmes</h3>
    <table>
      <thead>
        <tr class="bg-danger">
          <th>#</th>
          <th>sage-femme</th>
          <th>Statut</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sage, index) in sageFemmes" :key="index">
          <td><img :src="sage.photo" alt="Profile Picture" /></td>
          <td>
            <span>{{ sage.name }}</span>
          </td>
          <td>
            <span :class="sage.status">{{ sage.status }}</span>
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
      sageFemmes: [
        {
          name: "Ndeye Amy Thiam",
          status: "disponible",
          photo: "path-to-photo",
        },
        {
          name: "Ndeye Marieme Kebe",
          status: "En congée",
          photo: "path-to-photo",
        },
        { name: "Aminata Diouf", status: "disponible", photo: "path-to-photo" },
      ],
    };
  },
};
</script>

<style>
.sage-femme-list {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.Available {
  color: green;
}

.Busy {
  color: red;
}
</style>
