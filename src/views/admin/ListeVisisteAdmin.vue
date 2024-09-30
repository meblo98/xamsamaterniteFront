<template>
<Layout>
  <div class="visite-list">
    <div class="header">
      <h1>Liste des Visites</h1>
      <div class="actions">
        <!-- Button trigger modal -->
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#ajoutVisite"
        >
          Ajouter une visite
        </button>
        <!-- Modal -->
        <div
          class="modal fade"
          id="ajoutVisite"
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
                  Ajouter une visite
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
            
                <div class="form-group">
                  <label for="libelle">Libelle</label>
                  <input
                    v-model="newVisite.libelle"
                    type="text"
                    class="form-control"
                    id="libelle"
                    placeholder="Entrez le libelle"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-primary" @click="addVisite">
                  Ajouter
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tableau pour afficher les visites -->
    <div class="table-responsive">
      <table class="table m-3">
        <thead>
          <tr>
            <th>Nom de la visite</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="visite in visites" :key="visite.id">
            <td>{{ visite.libelle }}</td>
            <td>
             
              <button class="btn-action" @click="editVisite(visite.id)">
                <i class="fa fa-edit"></i>
              </button>
              <button class="btn-action" @click="deleteVisite(visite.id)">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal pour modifier une visite -->
  <div
    class="modal fade"
    id="editVisite"
    ref="editVisite"
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
            Modifier une visite
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="libelle">Libelle</label>
              <input
                v-model="editedVisite.libelle"
                type="text"
                class="form-control"
                id="libelle"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="updateVisite">
            Modifier
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  </div>
</Layout>
</template>

<script>
import Layout from "@/components/layouts/Layout.vue";
import Navbar from "@/components/Navbar.vue";
import visiteService from "@/services/visiteService";
import { Modal } from "bootstrap";
import Swal from 'sweetalert2';

export default {
  components: {
    Layout,
  },
  data() {
    return {
      visites: [],
      newVisite: {
        libelle: "",
      },
      editedVisite: {
        id: "",
        libelle: "",
      },
    };
  },
  mounted() {
    this.getVisites();
  },
  methods: {
    async getVisites() {
      try {
        const response = await visiteService.getVisites();
        this.visites = response.ListeVisites;
        console.log(this.visites);
        
      } catch (error) {
        console.error("Erreur lors de la récupération des visites :", error);
      }
    },

    async addVisite() {
      try {
        await visiteService.createVisite(this.newVisite);
        this.getVisites();
        this.resetForm();
        Swal.fire({
          title: 'Visite ajoutée avec succès!',
          icon: 'success'
        });
      } catch (error) {
        Swal.fire({
          title: 'Erreur lors de l\'ajout de la visite',
          text: 'Veuillez vérifier les informations et réessayer.',
          icon: 'error'
        });
      }
    },
    resetForm() {
      this.newVisite = {
        libelle: "",
  
      };
    },
    async deleteVisite(id) {
      Swal.fire({
        title: 'Supprimer la visite?',
        text: 'Voulez-vous vraiment supprimer cette visite?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Non, annuler'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await visiteService.deleteVisite(id);
            this.getVisites();
            Swal.fire({
              title: 'Visite supprimée avec succès!',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            });
          } catch (error) {
            console.error("Erreur lors de la suppression de la visite :", error);
            Swal.fire({
              title: 'Erreur lors de la suppression',
              text: 'Veuillez réessayer.',
              icon: 'error'
            });
          }
        }
      });
    },
    async editVisite(id) {
      const visite = this.visites.find(v => v.id === id);
      this.editedVisite = { ...visite };
      const editModal = new Modal(this.$refs.editVisite);
      editModal.show();
    },
    async updateVisite() {
      try {
        await visiteService.updateVisite(this.editedVisite.id, this.editedVisite);
        this.getVisites();
        Swal.fire({
          title: 'Visite mise à jour avec succès!',
          icon: 'success'
        });
      } catch (error) {
        Swal.fire({
          title: 'Erreur lors de la mise à jour de la visite',
          text: 'Veuillez réessayer.',
          icon: 'error'
        });
      }
    },

  },
};
</script>

<style scoped>
.visite-list {
  margin: 2rem;
}

.actions {
  margin-bottom: 1rem;
}

.table th,
.table td {
  vertical-align: middle;
  text-align: center;
}

.btn-action {
  border: none;
  background: none;
  color: #333;
  font-size: 1.2rem;
  cursor: pointer;
  margin-right: 0.5rem;
}

.fa,
.fa-solid {
  font-size: 16px;
  color: #7e33e0;
}

.btn {
  background-color: #7e33e0;
  color: #fff;
}
</style>
