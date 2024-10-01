<template>
  <div class="custom-table table-responsive">
    <div class="header">
      <h3>{{ title }}</h3>
      <button class="add-btn" @click="openModal">Ajouter</button>
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
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

    <!-- Modal -->
    <div
      v-if="showModal"
      class="modal-overlay modal-dialog modal-lg"
      @click.self="closeModal"
    >
      <div class="modal-content w-100">
        <div class="entete d-flex" style="grid-gap: 400px">
          <h4>{{ isEditing ? "Modifier" : "Ajouter" }} {{ title }}</h4>
          <button
            type="button"
            class="btn-close bg-light"
            @click="closeModal"
          ></button>
        </div>
        <form @submit.prevent="handleSubmit">
          <div
            v-for="(field, index) in formFields"
            :key="index"
            class="form-group"
          >
            <label :for="field.name">{{ field.label }}</label>
            <input
              v-if="
                field.type === 'text' ||
                field.type === 'email' ||
                field.type === 'password'
              "
              v-model="formData[field.name]"
              :type="field.type"
              :id="field.name"
              :placeholder="field.placeholder"
            />
            <textarea
              v-else-if="field.type === 'textarea'"
              v-model="formData[field.name]"
              :id="field.name"
              :placeholder="field.placeholder"
            />
            <select
              v-else-if="field.type === 'select'"
              v-model="formData[field.name]"
              :id="field.name"
              
            >
              <option
                v-for="(option, index) in field.options"
                :key="index"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
            <div v-else-if="field.type === 'checkbox'">
              <input
                v-model="formData[field.name]"
                :id="field.name"
                type="checkbox"
              />
              <label :for="field.name">{{ field.label }}</label>
            </div>
            <div v-else-if="field.type === 'radio'">
              <div v-for="(option, index) in field.options" :key="index">
                <input
                  v-model="formData[field.name]"
                  :id="option.value"
                  type="radio"
                  :value="option.value"
                />
                <label :for="option.value">{{ option.label }}</label>
              </div>
            </div>
            <input
              v-else-if="field.type === 'date'"
              v-model="formData[field.name]"
              :id="field.name"
              type="date"
            />
            <input
              v-else-if="field.type === 'time'"
              v-model="formData[field.name]"
              :id="field.name"
              type="time"
            />
          </div>
          <button type="submit">
            {{ isEditing ? "Modifier" : "Ajouter" }}
          </button>
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
      showModal: false, // pour afficher/masquer la modal
      formData: {}, // pour stocker les données du formulaire
      isEditing: false, // pour savoir si on est en mode édition ou ajout
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
      type: Array, // Les champs de formulaire sont passés comme props
      required: true,
    },
  },
  methods: {
    handleAction(action, row) {
      this.$emit("action", { action, row });
    },
    openModal() {
      this.showModal = true;
      this.isEditing = false; // Mode ajout
      this.formData = {}; // Réinitialiser les données du formulaire
    },
    editData(row) {
      this.showModal = true;
      this.isEditing = true; // Mode édition
      this.formData = { ...row }; // Pré-remplir les champs avec les données de la ligne à éditer
    },
    handleSubmit() {
      if (this.isEditing) {
        this.$emit("edit-data", this.formData); // Émet l'événement pour modifier les données
      } else {
        this.$emit("add-data", this.formData); // Émet l'événement pour ajouter des données
      }
      this.closeModal(); // Fermer la modal après soumission
    },
    closeModal() {
      this.showModal = false; // Fermer la modal
      this.formData = {}; // Réinitialiser les données du formulaire
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
select {
  background-color: white; /* Couleur de fond pour le sélecteur */
  color: #000; /* Couleur du texte dans le sélecteur */
  padding: 8px; /* Pour améliorer l'apparence du sélecteur */
  border: 1px solid #ccc; /* Bordure pour une meilleure visibilité */
  border-radius: 4px; /* Bordure arrondie */
}
select option {
  border: 1px solid red !important; /* Pour rendre les options visibles */
  color: #000 !important;
}

select option {
  color: #000; /* Couleur du texte dans les options */
  background-color: white; /* Couleur de fond des options */
}
select {
  color: #000 !important;
  background-color: white !important;
}

.form-group {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 5px;
}
.add-btn {
  background-color: #6932f9;
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

.form-group {
  margin-bottom: 15px;
}

form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
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
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
</style>
