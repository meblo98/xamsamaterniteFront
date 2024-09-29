<template>
  <Layout>
    <div v-if="allData.length === 0">
      <button
        type="button"
        class="btn btn-primary"
        :data-bs-toggle="'modal'"
        :data-bs-target="'#ajoutCampagne'"
      >
        Ajouter une Campagne
      </button>

      <!-- Modal d'ajout -->
      <div
        class="modal fade"
        id="ajoutCampagne"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="ajoutCampagneLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="ajoutCampagneLabel">
                Ajouter une Campagne
              </h5>
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
                <label for="nom">Nom de la Campagne</label>
                <input
                  v-model="newCampagne.nom"
                  type="text"
                  class="form-control"
                  id="nom"
                  placeholder="Nom de la campagne"
                  required
                />
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <textarea
                  v-model="newCampagne.description"
                  class="form-control"
                  id="description"
                  placeholder="Description de la campagne"
                  required
                ></textarea>
              </div>
              <div class="form-group">
                <label for="image">Image</label>
                <input
                  type="file"
                  class="form-control"
                  id="image"
                  @change="onFileChange"
                />
              </div>
              <div class="form-group">
                <label for="date_debut">Date de Début</label>
                <input
                  v-model="newCampagne.date_debut"
                  type="date"
                  class="form-control"
                  id="date_debut"
                  required
                />
              </div>
              <div class="form-group">
                <label for="date_fin">Date de Fin</label>
                <input
                  v-model="newCampagne.date_fin"
                  type="date"
                  class="form-control"
                  id="date_fin"
                  required
                />
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" @click="addCampagne(newCampagne)">
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

      <p>Aucune campagne trouvée.</p>
    </div>

    <div class="tableau" v-else>
      <Table
        :columns="columns"
        :data="paginatedData"
        title="Liste des Campagnes"
        @action="handleTableAction"
        @add-data="addCampagne"
        @edit-data="editCampagne"
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
import Table from "@/components/tableau.vue";
import Pagination from "@/components/pagination.vue";
import campagneService from "@/services/campagneService";
import Swal from "sweetalert2";

export default {
  components: {
    Layout,
    Table,
    Pagination,
  },
  data() {
    return {
      newCampagne: {
        nom: "",
        description: "",
        date_debut: "",
        date_fin: "",
        image: null,
      },
      columns: [
        { label: "Nom", field: "nom" },
        { label: "Description", field: "description" },
        { label: "Date de Début", field: "date_debut" },
        { label: "Date de Fin", field: "date_fin" },
        { label: "Actions", field: "action", type: "action" },
      ],
      selectedFile: null,
      allData: [],
      paginatedData: [],
      currentPage: 1,
      totalItems: 0,
      itemsPerPage: 10,
    };
  },
  //   mounted() {
  //     this.getCampagnes();
  //     },
  methods: {
    onFileChange(e) {
      this.selectedFile = e.target.files[0];
    },
    async addCampagne(campagneData) {
      console.log(campagneData);

      if (
        !campagneData.nom ||
        !campagneData.description ||
        !campagneData.date_debut ||
        !campagneData.date_fin ||
        !this.selectedFile
      ) {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Tous les champs sont requis.",
        });
        return;
      }
      // Créer une instance de FormData
      const formData = new FormData();
      formData.append("nom", campagneData.nom);
      formData.append("description", campagneData.description);
      formData.append("date_debut", campagneData.date_debut);
      formData.append("date_fin", campagneData.date_fin);
      formData.append("image", this.selectedFile);
      try {
        await campagneService.createCampagne(formData);
        this.getCampagnes(); // Recharge la liste après l'ajout
        Swal.fire({
          title: "Campagne ajoutée avec succès !",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Erreur lors de l'ajout de la campagne :", error);
        Swal.fire({
          title: "Erreur lors de l'ajout de la campagne !",
          icon: "error",
          timer: 1000,
        });
      }
    },
    async getCampagnes() {
      try {
        const response = await campagneService.getCampagnes();
        if (response && Array.isArray(response)) {
          this.allData = response.map((campagne) => ({
            id: campagne.id,
            titre: campagne.titre,
            description: campagne.description,
            date_debut: campagne.date_debut,
            date_fin: campagne.date_fin,
          }));
          this.totalItems = this.allData.length;
          this.getCampagnesPaginated();
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des campagnes :", error);
      }
    },
    handleTableAction({ action, row }) {
      if (action === "view") {
        this.$router.push({
          name: "detailCampagne",
          params: { id: row.id },
        });
      } else if (action === "edit") {
        this.editCampagne(row);
      } else if (action === "delete") {
        this.deleteCampagne(row.id);
      }
    },

    async editCampagne(campagne) {
      try {
        await campagneService.updateCampagne(campagne.id, campagne);
        this.getCampagnes(); // Reload the campaigns after editing
        Swal.fire({
          title: "Campagne mise à jour avec succès !",
          icon: "success",
          timer: 1000,
        });
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la campagne :", error);
        Swal.fire({
          title: "Erreur lors de la mise à jour de la campagne !",
          icon: "error",
          timer: 1000,
        });
      }
    },
    async deleteCampagne(id) {
      Swal.fire({
        title: "Êtes-vous sûr de vouloir supprimer cette campagne ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, supprimer",
        cancelButtonText: "Annuler",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await campagneService.deleteCampagne(id);
            this.getCampagnes(); // Reload the campaigns after deletion
            Swal.fire({
              title: "Campagne supprimée avec succès !",
              icon: "success",
              timer: 1000,
            });
          } catch (error) {
            console.error(
              "Erreur lors de la suppression de la campagne :",
              error
            );
            Swal.fire({
              title: "Erreur lors de la suppression de la campagne !",
              icon: "error",
              timer: 1000,
            });
          }
        }
      });
    },
    getCampagnesPaginated() {
      if (this.allData.length > 0) {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.paginatedData = this.allData.slice(startIndex, endIndex);
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.getCampagnesPaginated();
    },
  },
};
</script>
