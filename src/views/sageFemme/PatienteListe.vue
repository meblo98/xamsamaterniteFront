<template>
  <Layout>
    <!-- Si aucune donnée n'est trouvée -->
    <div v-if="allData.length === 0">
      <button
        type="button"
        class="btn"
        :data-bs-toggle="'modal'"
        :data-bs-target="'#ajoutPatiente'"
      >
        Ajouter une Patiente
      </button>

      <!-- Modal d'ajout -->
      <div
        class="modal fade"
        id="ajoutPatiente"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Ajouter une Patiente
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <!-- Formulaire d'ajout -->
              <div class="form-group">
                <label for="prenom">Prénom de la Patiente</label>
                <input
                  v-model="newPatiente.prenom"
                  type="text"
                  class="form-control"
                  id="prenom"
                  placeholder="Donnez le prénom"
                  required
                />
              </div>
              <div class="form-group">
                <label for="nom">Nom de la Patiente</label>
                <input
                  v-model="newPatiente.nom"
                  type="text"
                  class="form-control"
                  id="nom"
                  placeholder="Donnez le nom"
                  required
                />
              </div>
              <div class="form-group">
                <label for="telephone">Téléphone de la Patiente</label>
                <input
                  v-model="newPatiente.telephone"
                  type="tel"
                  class="form-control"
                  id="telephone"
                  placeholder="Donnez le numéro de téléphone"
                  required
                />
              </div>
              <div class="form-group">
                <label for="adresse">Adresse de la Patiente</label>
                <input
                  v-model="newPatiente.adresse"
                  type="text"
                  class="form-control"
                  id="adresse"
                  placeholder="Donnez l'adresse"
                  required
                />
              </div>
              <div class="form-group">
                <label for="email">Email de la Patiente</label>
                <input
                  v-model="newPatiente.email"
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Donnez l'email"
                  required
                />
              </div>
              <div class="form-group">
                <label for="date_de_naissance"
                  >Date de naissance de la Patiente</label
                >
                <input
                  v-model="newPatiente.date_de_naissance"
                  type="date"
                  class="form-control"
                  id="date_de_naissance"
                  placeholder="Donnez la date de naissance"
                  required
                />
              </div>
              <div class="form-group">
                <label for="lieu_de_naissance"
                  >Lieu de naissance de la Patiente</label
                >
                <input
                  v-model="newPatiente.lieu_de_naissance"
                  type="text"
                  class="form-control"
                  id="lieu_de_naissance"
                  placeholder="Donnez le lieu de naissance"
                  required
                />
              </div>
              <div class="form-group">
                <label for="profession">Profession de la Patiente</label>
                <input
                  v-model="newPatiente.profession"
                  type="text"
                  class="form-control"
                  id="profession"
                  placeholder="Donnez la profession"
                  required
                />
              </div>
              <div class="form-group">
                <label for="type">Type de la Patiente</label>
                <select
                  v-model="newPatiente.type"
                  class="form-control"
                  id="type"
                  required
                >
                  <option value="Enceinte">Enceinte</option>
                  <option value="En planning">En planning</option>
                  <option value="Allaitente">Allaitente</option>
                </select>
              </div>
              <div class="form-group">
                <label for="badieneGox">Badiene Gox</label>
                <select
                  v-model="newPatiente.badien_gox_id"
                  class="form-control"
                  id="badien_gox_id"
                  required
                >
                  <option value="">Sélectionnez une Badiene Gox</option>
                  <option
                    v-for="badiene in badiene"
                    :key="badiene.id"
                    :value="badiene.id"
                  >
                  {{ badiene.user.prenom }} {{ badiene.user.nom }}
                  </option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn" @click="addPatiente(newPatiente)">
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
      <p>Aucune Patiente trouvée.</p>
    </div>

    <!-- Si des données sont trouvées -->
    <div class="tableau" v-else>
      <Table
        :columns="columns"
        :data="paginatedData"
        title="Liste des Patientes"
        :formFields="formFields"
        @action="handleTableAction"
        @add-data="addPatiente"
        @edit-data="editPatiente"
      />
      <Pagination
        :currentPage="currentPage"
        :totalItems="totalItems"
        :itemsPerPage="itemsPerPage"
        @page-changed="handlePageChange"
      />
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/layouts/Layout.vue";
import Pagination from "@/components/pagination.vue";
import Table from "@/components/tableau.vue";
import badieneGoxService from "@/services/badieneGoxService";
import patienteService from "@/services/patienteService";
import Swal from "sweetalert2";

const ACTION_VIEW = "view";
const ACTION_EDIT = "edit";
const ACTION_DELETE = "delete";

export default {
  components: {
    Layout,
    Pagination,
    Table,
  },
  data() {
    return {
      newPatiente: {
        nom: "",
        prenom: "",
        adresse: "",
        telephone: "",
        email: "",
        date_de_naissance: "",
        lieu_de_naissance: "",
        profession: "",
        type: "",
        badien_gox_id: "",
      },
      badiene: [],
      columns: [
        { label: "Nom", field: "nom" },
        { label: "Prénom", field: "prenom" },
        { label: "Téléphone", field: "telephone" },
        { label: "Âge", field: "age" },
        { label: "Lieu de Naissance", field: "lieu_de_naissance" },
        { label: "Profession", field: "profession" },
        { label: "Type", field: "type" },
        { label: "Actions", field: "action", type: "action" },
      ],
      formFields: [
        {
          name: "prenom",
          label: "Prénom",
          type: "text",
          placeholder: "Entrez le prénom",
        },
        {
          name: "nom",
          label: "Nom",
          type: "text",
          placeholder: "Entrez le nom",
        },
        {
          name: "lieu_de_naissance",
          label: "Lieu de Naissance",
          type: "text",
          placeholder: "Entrez le lieu de naissance",
        },
        {
          name: "date_de_naissance",
          label: "Date de Naissance",
          type: "date",
          placeholder: "Entrez la date de naissance",
        },
        {
          name: "profession",
          label: "Profession",
          type: "text",
          placeholder: "Entrez la profession",
        },
        {
          name: "type",
          label: "Type",
          type: "select",
          options: [
            { value: "", text: "Selectionner le type de patiente" },
            { value: "Enceinte", text: "Enceinte" },
            { value: "En planning", text: "En planning" },
            { value: "Allaitente", text: "Allaitente" },
          ],
          placeholder: "Entrez le type de patiente",
        },
        {
          name: "adresse",
          label: "Adresse",
          type: "text",
          placeholder: "Entrez l'adresse de la patiente",
        },
        {
          name: "badien_gox_id",
          label: "Badiene Gox",
          type: "select",
          options: [],
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Entrez l'email de la patiente",
        },
        {
          name: "telephone",
          label: "Téléphone",
          type: "text",
          placeholder: "Entrez le numéro de téléphone de la patiente",
        },
      ],
      formData: {},
      allData: [],
      paginatedData: [],
      currentPage: 1,
      totalItems: 0,
      itemsPerPage: 10,
    };
  },
  mounted() {
    this.getPatients();
    this.getBadiene();
  },
  methods: {
    async getPatients() {
      try {
        const response = await patienteService.getPatientes();
        if (
          response &&
          response.Liste_des_patientes &&
          Array.isArray(response.Liste_des_patientes)
        ) {
          this.allData = response.Liste_des_patientes.map((patiente) => ({
            id: patiente.id,
            nom: patiente.user.nom,
            prenom: patiente.user.prenom,
            telephone: patiente.user.telephone,
            adresse: patiente.user.adresse,
            email: patiente.user.email,
            age: this.calculateAge(patiente.date_de_naissance),
            lieu_de_naissance: patiente.lieu_de_naissance,
            profession: patiente.profession,
            type: patiente.type,
            badien_gox_id: patiente.badien_gox_id,
            date_de_naissance: patiente.date_de_naissance,
          }));
          this.totalItems = this.allData.length;
          this.getPatientsPaginated();
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des patientes :", error);
      }
    },
    handleTableAction({ action, row }) {
      switch (action) {
        case ACTION_VIEW:
          this.$router.push({
            name: "detailPatiente-sage-femme",
            params: { id: row.id },
          });
          break;
        case ACTION_EDIT:
          this.editPatiente(row);
          break;
        case ACTION_DELETE:
          this.deletePatiente(row.id);
          break;
        default:
          break;
      }
    },
    async addPatiente(patienteData) {

      if (
        !patienteData.nom ||
        !patienteData.prenom ||
        !patienteData.telephone ||
        !patienteData.email ||
        !patienteData.adresse ||
        !patienteData.badien_gox_id
      ) {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Tous les champs sont requis.",
        });
        return;
      }
      
      try {
        await patienteService.createPatiente(patienteData);
        this.getPatients(); // Recharger la liste après l'ajout
        Swal.fire({
          title: "Patiente ajoutée avec succès !",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        this.getPatients(); // Recharger la liste après l'ajout
      } catch (error) {
        console.error("Erreur lors de l'ajout de la patiente :", error);
        Swal.fire({
          title: "Erreur lors de l'ajout de la patiente !",
          icon: "error",
          timer: 1000,
        });
      }
    },
    async editPatiente(patiente) {
      try {
        const updatedPatiente = await patienteService.updatePatiente(
          patiente.id,
          patiente
        );
        this.getPatients(); // Recharger la liste après la modification
        Swal.fire({
          // Add sweet alert for edit operation
          title: "Patient mis à jour avec succès !",
          icon: "success",
          timer: 1000,
        });
      } catch (error) {
        console.error("Erreur lors de la modification de la patiente :", error);
        Swal.fire({
          // Add sweet alert for error
          title: "Erreur lors de la mise à jour du patient !",
          icon: "error",
          timer: 1000,
        });
      }
    },
    async deletePatiente(id) {
      Swal.fire({
        title: "Êtes-vous sûr de vouloir supprimer cette patiente ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, supprimer",
        cancelButtonText: "Annuler",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await patienteService.deletePatiente(id);
            this.getPatients(); // Recharger la liste après la suppression
            Swal.fire({
              // Add sweet alert for delete operation
              title: "Patient supprimé avec succès !",
              icon: "success",
              timer: 1000,
            });
          } catch (error) {
            console.error(
              "Erreur lors de la suppression de la patiente :",
              error
            );
            Swal.fire({
              // Add sweet alert for error
              title: "Erreur lors de la suppression du patient !",
              icon: "error",
              timer: 1000,
            });
          }
        }
      });
    },
    async getBadiene() {
      try {
        const response = await badieneGoxService.getBadieneGoxes();
        this.badiene = response.Liste_BadieneGox;        
        this.updateFormFields();
      } catch (error) {
        console.error("Erreur lors de la récupération des badiene :", error);
      }
    },
    updateFormFields() {
      const badieneOptions = this.badiene.map((badiene) => ({
        value: badiene.id,
        text: `${badiene.user.prenom} ${badiene.user.nom}`,
      }));
      
      this.formFields.find((field) => field.name === "badien_gox_id").options =
        badieneOptions;
    },
    getPatientsPaginated() {
      if (this.allData.length > 0) {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.paginatedData = this.allData.slice(startIndex, endIndex);
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.getPatientsPaginated();
    },
    calculateAge(dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;
    },
  },
};
</script>
<style>
button {
  background-color: #6932f9;
  color: white;
  border: none;
  padding: 5px;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>