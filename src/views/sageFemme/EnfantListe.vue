<template>
  <Layout>
    <!-- Si aucune donnée n'est trouvée -->
    <div v-if="allData.length === 0">
      <button
        type="button"
        class="btn btn-primary"
        :data-bs-toggle="'modal'"
        :data-bs-target="'#ajoutEnfant'"
      >
        Ajouter un Enfant
      </button>

      <!-- Modal d'ajout -->
      <div
        class="modal fade"
        id="ajoutEnfant"
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
                Ajouter un Enfant
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
                <label for="accouchement"
                  >Sélectionnez un accouchement (par nom de la mère)</label
                >
                <select
                  v-model="selectedAccouchementId"
                  class="form-control"
                  id="accouchement_id"
                  @change="updateAccouchementId"
                >
                  <option value="" disabled selected>
                    Sélectionnez La mère de l'enfant
                  </option>
                  <option
                    v-for="accouchement in accouchements"
                    :key="accouchement.id"
                    :value="accouchement.id"
                  >
                    {{ accouchement.patiente.user.prenom }}
                    {{ accouchement.patiente.user.nom }} ({{
                      accouchement.patiente.user.telephone
                    }})
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="prenom">Prénom de l'Enfant</label>
                <input
                  v-model="newEnfant.prenom"
                  type="text"
                  class="form-control"
                  id="prenom"
                  placeholder="Donnez le prénom"
                  required
                />
              </div>
              <div class="form-group">
                <label for="nom">Nom de l'Enfant</label>
                <input
                  v-model="newEnfant.nom"
                  type="text"
                  class="form-control"
                  id="nom"
                  placeholder="Donnez le nom"
                  required
                />
              </div>
              <div class="form-group">
                <label for="date_naissance"
                  >Date de naissance de l'Enfant</label
                >
                <input
                  v-model="newEnfant.date_naissance"
                  type="date"
                  class="form-control"
                  id="date_naissance"
                  placeholder="Donnez la date de naissance"
                  required
                />
              </div>
              <div class="form-group">
                <label for="lieu_naissance"
                  >Lieu de naissance de l'Enfant</label
                >
                <input
                  v-model="newEnfant.lieu_naissance"
                  type="text"
                  class="form-control"
                  id="lieu_naissance"
                  placeholder="Donnez le lieu de naissance"
                  required
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-primary"
                @click="addEnfant({ ...newEnfant })"
              >
                Ajouter
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
      <p>Aucun Enfant trouvé.</p>
    </div>

    <!-- Si des données sont trouvées -->
    <div class="tableau" v-else>
      <Table
        :columns="columns"
        :data="paginatedData"
        title="Liste des Enfants"
        :formFields="formFields"
        @action="handleTableAction"
        @add-data="addEnfant"
        @edit-data="editEnfant"
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
import accouchementService from "@/services/accouchementService";
import enfantService from "@/services/enfantService";
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
      selectedAccouchementId: "", // pour stocker l'ID de l'accouchement sélectionné
      accouchements: [], // tableau d'accouchements récupérés depuis l'API
      newEnfant: {
        nom: "",
        prenom: "",
        date_naissance: "",
        lieu_naissance: "",
        accouchement_id: "",
      },
      getFormData() {
        return {
          nom: this.newEnfant.nom,
          prenom: this.newEnfant.prenom,
          date_naissance: this.newEnfant.date_naissance,
          lieu_naissance: this.newEnfant.lieu_naissance,
          accouchement_id: this.selectedAccouchementId,
        };
      },
      columns: [
        { label: "Nom", field: "nom" },
        { label: "Prénom", field: "prenom" },
        { label: "Date de Naissance", field: "date_naissance" },
        { label: "Lieu de Naissance", field: "lieu_naissance" },
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
          name: "date_naissance",
          label: "Date de Naissance",
          type: "date",
          placeholder: "Entrez la date de naissance",
        },
        {
          name: "lieu_naissance",
          label: "Lieu de Naissance",
          type: "text",
          placeholder: "Entrez le lieu de naissance",
        },
        {
          name: "accouchement_id",
          label: "Mère de l'enfant",
          type: "select",
          options: [],
        },
      ],
      allData: [],
      paginatedData: [],
      currentPage: 1,
      totalItems: 0,
      itemsPerPage: 10,
    };
  },
  mounted() {
    this.getEnfants();
    this.getAccouchements();
  },
  methods: {
    updateAccouchementId() {
      this.newEnfant.accouchement_id = this.selectedAccouchementId;
    },
    async getAccouchements() {
      try {
        const response = await accouchementService.getAccouchements();
        this.accouchements = response.accouchements;
        this.formFields[4].options = this.accouchements.map((accouchement) => ({
      value: accouchement.id,
      text: `${accouchement.patiente.user.prenom} ${accouchement.patiente.user.nom} (${accouchement.patiente.user.telephone})`,
    }));
      } catch (error) {
        console.error(error);
      }
    },
    async getEnfants() {
      try {
        const response = await enfantService.getEnfants();
        if (
          response &&
          response.Liste_des_enfants &&
          Array.isArray(response.Liste_des_enfants)
        ) {
          this.allData = response.Liste_des_enfants.map((enfant) => ({
            id: enfant.id,
            nom: enfant.nom,
            prenom: enfant.prenom,
            accouchement_id: enfant.accouchement_id,
            lieu_naissance: enfant.lieu_naissance,
            date_naissance: enfant.date_naissance,
          }));
          this.totalItems = this.allData.length;
          this.getEnfantsPaginated();
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des enfants :", error);
      }
    },
    handleTableAction({ action, row }) {
      switch (action) {
        case ACTION_VIEW:
          this.$router.push({
            name: "detailEnfant-sage-femme",
            params: { id: row.id },
          });
          break;
        case ACTION_EDIT:
          this.editEnfant(row);
          break;
        case ACTION_DELETE:
          this.deleteEnfant(row.id);
          break;
        default:
          break;
      }
    },

    async addEnfant(enfantData) {
      if (
        !enfantData.nom ||
        !enfantData.prenom ||
        !enfantData.date_naissance ||
        !enfantData.lieu_naissance ||
        !enfantData.accouchement_id
      ) {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Tous les champs sont requis.",
        });
        return;
      }

      try {
        await enfantService.createEnfant(enfantData);
        this.getEnfants(); // Recharger la liste après l'ajout
        Swal.fire({
          title: "Enfant ajouté avec succès !",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        this.$router.replace({ name: "enfant-sage-femme" });
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'enfant :", error);
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Impossible d'ajouter l'enfant.",
        });
      }
    },
    async editEnfant(enfantData) {
      if (
        !enfantData.nom ||
        !enfantData.prenom ||
        !enfantData.date_naissance ||
        !enfantData.lieu_naissance
      ) {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Tous les champs sont requis.",
        });
        return;
      }

      try {
        await enfantService.updateEnfant(enfantData.id, enfantData);
        this.getEnfants(); // Recharger la liste après la modification
        Swal.fire({
          title: "Enfant modifié avec succès !",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Erreur lors de la modification de l'enfant :", error);
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Impossible de modifier l'enfant.",
        });
      }
    },
    async deleteEnfant(enfantId) {
      try {
        await enfantService.deleteEnfant(enfantId);
        this.getEnfants(); // Recharger la liste après la suppression
        Swal.fire({
          title: "Enfant supprimé avec succès !",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Erreur lors de la suppression de l'enfant :", error);
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Impossible de supprimer l'enfant.",
        });
      }
    },
    getEnfantsPaginated() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.paginatedData = this.allData.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.getEnfantsPaginated();
    },
  
  },
};
</script>
