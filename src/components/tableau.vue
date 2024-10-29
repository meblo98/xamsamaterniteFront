<template>
  <div class="custom-table table-responsive">
    <div class="header">
      <h3>{{ title }}</h3>
      <div class="search-bar">
        <input type="text" v-model="searchTerm" placeholder="Rechercher..." />
        <iconify-icon icon="gala:search"></iconify-icon>
      </div>
      <button class="add-btn" @click="openModal"> <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0m149.3 277.3c0 11.8-9.5 21.3-21.3 21.3h-85.3V384c0 11.8-9.5 21.3-21.3 21.3h-42.7c-11.8 0-21.3-9.6-21.3-21.3v-85.3H128c-11.8 0-21.3-9.6-21.3-21.3v-42.7c0-11.8 9.5-21.3 21.3-21.3h85.3V128c0-11.8 9.5-21.3 21.3-21.3h42.7c11.8 0 21.3 9.6 21.3 21.3v85.3H384c11.8 0 21.3 9.6 21.3 21.3z"/></svg> Ajouter</button>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="entete d-flex justify-content-between">
          <h4>{{ isEditing ? "Modifier" : "Ajouter" }} {{ title }}</h4>
          <button type="button" class="btn-close bg-light" @click="closeModal"></button>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="form-fields" :class="{ 'two-columns': formFields.length > 5 }">
            <div v-for="(field, index) in formFields" :key="index" class="form-group">
              <label :for="field.name">{{ field.label }}</label>
              <input v-if="['text', 'number', 'email', 'password'].includes(field.type)" 
                     v-model="formData[field.name]" 
                     :type="field.type" 
                     :id="field.name" 
                     :placeholder="field.placeholder" 
              />
              <textarea v-else-if="field.type === 'textarea'" v-model="formData[field.name]" :id="field.name" :placeholder="field.placeholder" class="form-textarea"></textarea>
              <select v-else-if="field.type === 'select'" v-model="formData[field.name]" :id="field.name" class="form-select">
                <option v-for="(option, index) in field.options" :key="index" :value="option.value">{{ option.text }}</option>
              </select>
              <div v-else-if="field.type === 'checkbox'">
                <input v-model="formData[field.name]" :id="field.name" type="checkbox" />
                <label :for="field.name">{{ field.label }}</label>
              </div>
              <div v-else-if="field.type === 'radio'">
                <div v-for="(option, index) in field.options" :key="index">
                  <input v-model="formData[field.name]" :id="option.value" type="radio" :value="option.value" />
                  <label :for="option.value">{{ option.label }}</label>
                </div>
              </div>
              <input v-else-if="field.type === 'date'" v-model="formData[field.name]" :id="field.name" type="date" />
              <input v-else-if="field.type === 'time'" v-model="formData[field.name]" :id="field.name" type="time" />
              <input v-else-if="field.type === 'file'" :id="field.name" type="file" @change="handleFileUpload($event, field.name)" />
              <div v-if="errors[field.name]" class="error">{{ errors[field.name] }}</div>
            </div>
          </div>
          <button class="mt-3" type="submit">{{ isEditing ? "Modifier" : "Ajouter" }}</button>
        </form>
      </div>
    </div>

    <!-- tableau -->
    <table>
      <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index">{{ column.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in filteredData" :key="rowIndex">
          <td v-for="(column, colIndex) in columns" :key="colIndex">
            <span v-if="column.type !== 'action'">{{ row[column.field] }}</span>
            <span v-else>
              <button @click="handleAction('view', row)">👁️</button>
              <button @click="editData(row)">✏️</button>
              <button @click="handleAction('delete', row)">🗑️</button>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default {
  name: "Table",
  data() {
    return {
      showModal: false,
      formData: {},
      isEditing: false,
      searchTerm: '',
      errors: {},
    };
  },
  computed: {
    filteredData() {
      return this.data.filter(row => {
        return Object.values(row).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()));
      });
    },
  },
  props: {
    columns: Array,
    data: Array,
    title: {
      type: String,
      default: "Tableau",
    },
    formFields: Array,
  },
  methods: {
    handleAction(action, row) {
      if (action === 'close') this.showModal = false;
      this.$emit("action", { action, row });
    },
    handleFileUpload(event, fieldName) {
      const file = event.target.files[0];
      this.formData[fieldName] = file;
    },
    openModal() {
      this.showModal = true;
      this.isEditing = false;
      this.formData = this.initializeFormData();
    },
    editData(row) {
      this.showModal = true;
      this.isEditing = true;
      this.formData = this.initializeFormData(row);
    },
    validateForm() {
      const errors = {};
      this.formFields.forEach(field => {
        if (field.required && !this.formData[field.name]) errors[field.name] = `${field.label} est requis.`;
        if (field.type === 'email' && this.formData[field.name] && !this.validateEmail(this.formData[field.name]))
          errors[field.name] = 'Email invalide.';
      });
      return errors;
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    handleSubmit() {
      const errors = this.validateForm();
      if (Object.keys(errors).length) {
        this.errors = errors;
        return;
      }
      this.isEditing ? this.$emit("edit-data", { ...this.formData, id: this.formData.id }) : this.$emit("add-data", this.formData);
    },
    closeModal() {
      this.showModal = false;
      this.formData = {};
    },
    initializeFormData(row = {}) {
      const formData = {};
      this.formFields.forEach(field => {
        formData[field.name] = row[field.name] || (field.type === 'select' ? field.options[0].value : '');
      });
      if (row.id) formData.id = row.id;
      return formData;
    },
  },
};
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
}

.error {
  color: red;
  margin-top: 5px;
  font-size: 0.875em;
}

.custom-table {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.add-btn {

  background-color: #6932f9;
  color: white;
  border: none;
  padding: 6px 15px;
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

th,
td {
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
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}

button[type="submit"] {
  background-color: #6932f9;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  width: 100%;
  height: 50px;
}

.form-fields {
  display: grid;
  grid-gap: 10px;
}

.form-fields.two-columns {
  grid-template-columns: repeat(2, 1fr);
}
.form-select, .form-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f5f5f5;
  font-size: 16px;
}

</style>
