<template>
<Layout>
  <div class="structure-list">
    <div class="header">
      <h1>Liste des Structures de Santé</h1>
      <div class="actions">
        <!-- Button trigger modal -->
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#ajoutStructure"
        >
          Ajouter une Structure
        </button>
        <!-- Modal -->
        <div
          class="modal fade"
          id="ajoutStructure"
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
                  Ajouter une Structure
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
                  <label for="nom">Nom de la Structure</label>
                  <input
                    v-model="newStructure.nom"
                    type="text"
                    class="form-control"
                    id="nom"
                    placeholder="Entrez le nom de la structure"
                  />
                </div>
                <div class="form-group">
                  <label for="lieu">Adresse</label>
                  <input
                    v-model="newStructure.lieu"
                    type="text"
                    class="form-control"
                    id="lieu"
                    placeholder="Entrez l'adresse de la structure"
                  />
                </div>
                <div class="form-group">
                  <label for="district_sanitaire_id">District</label>
                  <input
                    v-model="newStructure.district_sanitaire_id"
                    type="text"
                    class="form-control"
                    id="district_sanitaire_id"
                    placeholder="Entrez l'adresse de la structure"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-primary" @click="addStructure">
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

    <!-- Tableau pour afficher les structures -->
    <div class="table-responsive">
      <table class="table m-3">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Lieu</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="structure in structures" :key="structure.id">
            <td>{{ structure.nom }}</td>
            <td>{{ structure.lieu }}</td>
            <td>
             
              <button class="btn-action" @click="editStructure(structure.id)">
                <i class="fa fa-edit"></i>
              </button>
              <button class="btn-action" @click="deleteStructure(structure.id)">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal pour modifier une structure -->
  <div
    class="modal fade"
    id="editStructure"
    ref="editStructure"
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
            Modifier la Structure
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
              <label for="nom">Nom de la Structure</label>
              <input
                v-model="editedStructure.nom"
                type="text"
                class="form-control"
                id="nom"
                placeholder="Nom de la structure"
              />
            </div>
            <div class="form-group">
              <label for="lieu">Lieu</label>
              <input
                v-model="editedStructure.lieu"
                type="text"
                class="form-control"
                id="lieu"
                placeholder="Adresse"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="updateStructure">
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
import structureService from "@/services/structureService";
import { Modal } from "bootstrap";
import Swal from 'sweetalert2';

export default {
  components: {
    Layout,
  },
  data() {
    return {
      structures: [],
      newStructure: {
        nom: "",
        lieu: "",
        district_sanitaire_id: "",
      },
      editedStructure: {
        id: "",
        nom: "",
        lieu: "",
        district_sanitaire_id:","
      },
    };
  },
  mounted() {
    this.getStructures();
  },
  methods: {
    async getStructures() {
      try {
        const response = await structureService.getStructuresSante();
        this.structures = response.structures_sante;        
      } catch (error) {
        console.error("Erreur lors de la récupération des structures :", error);
      }
    },
    async addStructure() {
      try {
        await structureService.addStructuresSante(this.newStructure);
        this.getStructures(); 
        this.resetForm(); 
        Swal.fire({
          title: 'Structure ajoutée avec succès!',
          icon: 'success'
        });
      } catch (error) {
        Swal.fire({
          title: 'Erreur lors de l\'ajout de la structure',
          text: 'Veuillez vérifier les informations et réessayer.',
          icon: 'error'
        });
      }
    },
    resetForm() {
      this.newStructure = {
        nom: "",
        lieu: "",
        district_sanitaire_id: "",
      };
    },
    async deleteStructure(id) {
      Swal.fire({
        title: 'Supprimer la structure?',
        text: 'Voulez-vous vraiment supprimer cette structure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Non, annuler'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await structureService.deleteStructuresSante(id);
            this.getStructures();
            Swal.fire({
              title: 'Structure supprimée avec succès!',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            });
          } catch (error) {
            console.error("Erreur lors de la suppression de la structure :", error);
            Swal.fire({
              title: 'Erreur lors de la suppression',
              text: 'Veuillez réessayer.',
              icon: 'error'
            });
          }
        }
      });
    },
    async editStructure(id) {
      const structure = this.structures.find(s => s.id === id);
      this.editedStructure = { ...structure };
      const editModal = new Modal(this.$refs.editStructure);
      editModal.show();
    },
    async updateStructure() {
      try {
        await structureService.updateStructuresSante(this.editedStructure.id, this.editedStructure);
        this.getStructures();
        Swal.fire({
          title: 'Structure mise à jour avec succès!',
          icon: 'success'
        });
      } catch (error) {
        Swal.fire({
          title: 'Erreur lors de la mise à jour de la structure',
          text: 'Veuillez réessayer.',
          icon: 'error'
        });
      }
    },
  
  },
};
</script>

<style scoped>
.structure-list {
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
