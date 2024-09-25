<template>
  <div class="custom-table">
    <div class="header">
      <h3>{{ title }}</h3>
    <button class="add-btn" @click="showModal = true">Ajouter</button>
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index">{{ column.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
          <td v-for="(column, colIndex) in columns" :key="colIndex">
            <span v-if="column.type !== 'action'">{{ row[column.field] }}</span>
            <span v-else>
              <button @click="handleAction('view', row)">👁️</button>
              <button @click="handleAction('edit', row)">✏️</button>
              <button @click="handleAction('delete', row)">🗑️</button>
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h4>Ajouter {{ title }}</h4>
        <form @submit.prevent="handleSubmit">
          <div v-for="(field, index) in formFields" :key="index" class="form-group">
            <label :for="field.name">{{ field.label }}</label>
            <input 
              v-model="formData[field.name]" 
              :type="field.type" 
              :id="field.name" 
              :placeholder="field.placeholder"
            />
          </div>
          <button type="submit">Ajouter</button>
          <button type="button" @click="closeModal">Annuler</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      showModal: false,  // pour afficher/masquer la modal
      formData: {},      // pour stocker les données du formulaire
    };
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      default: "Tableau",
    },
    formFields: {
      type: Array,  // Les champs de formulaire sont passés comme props
      required: true,
    },
  },
  methods: {
    handleAction(action, row) {
      this.$emit('action', { action, row });
    },
    handleSubmit() {
      this.$emit('add-data', this.formData);  // Émet l'événement pour ajouter des données
      this.closeModal();  // Fermer la modal après soumission
    },
    closeModal() {
      this.showModal = false;  // Fermer la modal
      this.formData = {};      // Réinitialiser les données du formulaire
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

.add-btn {
  background-color: #6932F9;
  color: white;
  border: none;
  padding: 5px;
  margin-bottom: 10px;
  cursor: pointer;
}

button {
  background-color: #fff;
  border: none;
  margin-left: 5px;
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

th {
  background-color: #f0f0f0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

.form-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}

button[type="submit"] {
  background-color: #6932F9;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

button[type="button"] {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
</style>
