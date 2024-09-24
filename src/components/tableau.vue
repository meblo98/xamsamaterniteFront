<template>
    <div class="custom-table">
      <h3>{{ title }}</h3>
      <table>
        <thead>
          <tr>
            <th v-for="(column, index) in columns" :key="index">{{ column.label }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in data" :key="rowIndex">
            <td v-for="(column, colIndex) in columns" :key="colIndex">
              <!-- Vérifie si la colonne est une image -->
              <img v-if="column.type === 'image'" :src="row[column.field]" alt="Image" />
              <!-- Sinon, affiche simplement la valeur de la colonne -->
              <span v-else>{{ row[column.field] }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: "Table",
    props: {
      columns: {
        type: Array,
        required: true, // Les colonnes sont nécessaires
      },
      data: {
        type: Array,
        required: true, // Les données du tableau sont requises
      },
      title: {
        type: String,
        default: "Tableau",
      },
    },
  };
  </script>
  
  <style scoped>
  .custom-table {
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
  }
  </style>
  