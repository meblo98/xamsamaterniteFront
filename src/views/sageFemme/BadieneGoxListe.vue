<template>
  <Layout>
    <!-- Si aucune donnée n'est trouvée -->
    <div v-if="allData.length === 0">
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#ajoutBadiene"
      >
        Ajouter une Badiene Gox
      </button>

      <!-- Modal d'ajout -->
      <div
        class="modal fade"
        id="ajoutBadiene"
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
                Ajouter une Badiene Gox
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
                <label for="prenom">Prénom de la Badiene Gox</label>
                <input
                  v-model="newBadiene.prenom"
                  type="text"
                  class="form-control"
                  id="prenom"
                  placeholder="Donnez le prénom"
                />
              </div>
              <div class="form-group">
                <label for="nom">Nom de la Badiene Gox</label>
                <input
                  v-model="newBadiene.nom"
                  type="text"
                  class="form-control"
                  id="nom"
                  placeholder="Donnez le nom"
                />
              </div>
              <div class="form-group">
                <label for="telephone">Téléphone de la Badiene Gox</label>
                <input
                  v-model="newBadiene.telephone"
                  type="number"
                  class="form-control"
                  id="telephone"
                  placeholder="Donnez le numéro de téléphone"
                />
              </div>
              <div class="form-group">
                <label for="email">Email de la Badiene Gox</label>
                <input
                  v-model="newBadiene.email"
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Donnez l'email"
                />
              </div>
              <div class="form-group">
                <label for="adresse">Adresse de la Badiene Gox</label>
                <input
                  v-model="newBadiene.adresse"
                  type="text"
                  class="form-control"
                  id="adresse"
                  placeholder="Donnez l'adresse"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" @click="addBadiene(data)">
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
      <p>Aucune Badiene Gox trouvée.</p>
    </div>

    <!-- Si des données sont trouvées -->
    <div class="tableau" v-else>
      <Table
        :columns="columns"
        :data="paginatedData"
        title="Liste des Badiene Gox"
        :formFields="formFields"
        @action="handleTableAction"
        @add-data="addBadiene"
        @edit-data="editBadiene"
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
import Swal from "sweetalert2";
import badieneGoxService from "@/services/badieneGoxService";

export default {
  components: {
    Layout,
    Table,
    Pagination,
  },
  data() {
    return {
      allData: [],
      newBadiene: {
        nom: "",
        prenom: "",
        adresse: "",
        telephone: "",
        email: "",
      },
      columns: [
        { label: "Nom", field: "nom" },
        { label: "Prénom", field: "prenom" },
        { label: "Téléphone", field: "telephone" },
        { label: "Adresse", field: "adresse" },
        { label: "Actions", field: "action", type: "action" },
      ],
      formFields: [
        {
          name: "prenom",
          id: "prenom",
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
          name: "adresse",
          label: "Adresse",
          type: "text",
          placeholder: "Entrez l'adresse",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Entrez l'email",
        },
        {
          name: "telephone",
          label: "Téléphone",
          type: "text",
          placeholder: "Entrez le numéro de téléphone",
        },
      ],
      paginatedData: [],
      currentPage: 1,
      totalItems: 0,
      itemsPerPage: 10,
    };
  },
  mounted() {
    this.getBadienes();
  },
  methods: {
  async getBadienes() {
    try {
      const response = await badieneGoxService.getBadieneGoxes();
      if (
        response &&
        response.Liste_BadieneGox &&
        Array.isArray(response.Liste_BadieneGox)
      ) {
        this.allData = response.Liste_BadieneGox.map((badiene) => ({
          id: badiene.id,
          nom: badiene.user.nom,
          prenom: badiene.user.prenom,
          telephone: badiene.user.telephone,
          adresse: badiene.user.adresse,
          email: badiene.user.email,
        }));
        this.totalItems = this.allData.length;
        this.getPatientsPaginated();
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des Badiene Gox :", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de récupérer les Badiene Gox.",
      });
    }
  },

  getPatientsPaginated() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedData = this.allData.slice(start, end);
  },

  handlePageChange(page) {
    this.currentPage = page;
    this.getPatientsPaginated();
  },

  async addBadiene(data = null) {
  const badieneData = data;

  if (
    !badieneData.nom ||
    !badieneData.prenom ||
    !badieneData.telephone ||
    !badieneData.email ||
    !badieneData.adresse
  ) {
    Swal.fire({
      icon: "error",
      title: "Erreur",
      text: "Tous les champs sont requis.",
    });
    return;
  }

  try {
    await badieneGoxService.createBadieneGox(badieneData);
    this.getBadienes(); // Rafraîchir les données après l'ajout
    this.resetBadiene(); // Réinitialiser le formulaire
    Swal.fire({
      icon: "success",
      title: "Ajout réussi",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Erreur lors de l'ajout",
      text: "Veuillez vérifier les données saisies.",
    });
    console.error("Erreur lors de l'ajout:", error);
  }
}
,

  resetBadiene() {
    this.newBadiene = {
      nom: "",
      prenom: "",
      adresse: "",
      telephone: "",
      email: "",
    };
  },

  async editBadiene(badiene) {
    try {
      await badieneGoxService.updateBadieneGox(badiene.id, badiene);
      this.getBadienes(); // Recharger la liste après modification
      Swal.fire({
        title: "Badiene Gox mise à jour avec succès !",
        icon: "success",
        timer: 1000,
      });
    } catch (error) {
      console.error("Erreur lors de la modification de la Badiene Gox :", error);
      Swal.fire({
        title: "Erreur lors de la mise à jour de la Badiene Gox !",
        icon: "error",
        timer: 1000,
      });
    }
  },

  async deleteBadiene(id) {
    Swal.fire({
      title: "Êtes-vous sûr de vouloir supprimer cette Badiene Gox ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await badieneGoxService.deleteBadieneGox(id);
          this.getBadienes(); // Recharger la liste après suppression
          Swal.fire({
            title: "Badiene Gox supprimée avec succès !",
            icon: "success",
            timer: 1000,
          });
        } catch (error) {
          console.error("Erreur lors de la suppression de la Badiene Gox :", error);
          Swal.fire({
            title: "Erreur lors de la suppression de la Badiene Gox !",
            icon: "error",
            timer: 1000,
          });
        }
      }
    });
  },

  async handleTableAction(event) {
    if (event.action === "edit") {
      this.editBadiene(event.row); // Utiliser event.row pour l'édition
    } else if (event.action === "delete") {
      this.deleteBadiene(event.row.id); // Utiliser event.row.id pour la suppression
    }
  },
},

};
</script>
