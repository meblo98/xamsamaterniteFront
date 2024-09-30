<template>
 <Layout>
  <div class="sage-femme-list">
    <div class="header">
      <h1>Liste des Sage-femmes</h1>
      <div class="actions">
        <!-- Button trigger modal -->
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#ajoutSageFemme"
        >
          Ajouter une sage-femme
        </button>
        <!-- Modal -->
        <div
          class="modal fade"
          id="ajoutSageFemme"
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
                  Modal title
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
                  <label for="prenom">Prénom</label>
                  <input
                    v-model="newSageFemme.prenom"
                    type="text"
                    class="form-control"
                    id="prenom"
                    placeholder="Entrez le prénom"
                  />
                </div>
                <div class="form-group">
                  <label for="nom">Nom</label>
                  <input
                    v-model="newSageFemme.nom"
                    type="text"
                    class="form-control"
                    id="nom"
                    placeholder="Entrez le nom"
                  />
                </div>
                <div class="form-group">
                  <label for="adresse">Adresse</label>
                  <input
                    v-model="newSageFemme.adresse"
                    type="text"
                    class="form-control"
                    id="adresse"
                    placeholder="Entrez l'adresse"
                  />
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    v-model="newSageFemme.email"
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="Entrez l'email"
                  />
                </div>
                <div class="form-group">
                  <label for="telephone">Téléphone</label>
                  <input
                    v-model="newSageFemme.telephone"
                    type="text"
                    class="form-control"
                    id="telephone"
                    placeholder="Entrez le téléphone"
                  />
                </div>
                <div class="form-group">
                  <label for="matricule">Matricule</label>
                  <input
                    v-model="newSageFemme.matricule"
                    type="text"
                    class="form-control"
                    id="matricule"
                    placeholder="Entrez le matricule"
                  />
                </div>
                <div class="form-group">
                  <label for="structure_sante_id">Structure de santé</label>
                  <select
                    v-model="newSageFemme.structure_sante_id"
                    id="structure_sante_id"
                    class="form-control"
                  >
                    <option value="" disabled selected>
                      Sélectionnez une structure de santé
                    </option>
                    <option
                      v-for="structure in structuresSante"
                      :key="structure.id"
                      :value="structure.id"
                    >
                      {{ structure.nom }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn" variant="primary" @click="addSageFemme">
                  Ajouter
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tableau pour afficher les sages-femmes -->
    <div class="table-responsive">
      <table class="table m-3">
        <thead>
          <tr>
            <th>Nom complet</th>
            <th>Adresse</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Matricule</th>
            <th>Structure de santé</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sageFemme in sageFemmes" :key="sageFemme.id">
            <td>{{ sageFemme.user.prenom }} {{ sageFemme.user.nom }}</td>
            <td>{{ sageFemme.user.adresse }}</td>
            <td>{{ sageFemme.user.email }}</td>
            <td>{{ sageFemme.user.telephone }}</td>
            <td>{{ sageFemme.matricule }}</td>
            <td>{{ sageFemme.structure_sante.nom }}</td>
            <td>
              <button class="btn-action" @click="editSageFemme(sageFemme.id)">
                <i class="fa fa-edit"></i>
              </button>
              <button class="btn-action" @click="deleteSageFemme(sageFemme.id)">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- Modal pour modifier une sage-femme -->
  <div
    class="modal fade"
    id="editSageFemme"
    ref="editSageFemme"
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
            Modifier une sage-femme
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
              <label for="prenom">Prénom</label>
              <input
                v-model="editedSageFemme.prenom"
                type="text"
                class="form-control"
                id="prenom"
                placeholder="Entrez le prénom"
              />
            </div>
            <div class="form-group">
              <label for="nom">Nom</label>
              <input
                v-model="editedSageFemme.nom"
                type="text"
                class="form-control"
                id="nom"
                placeholder="Entrez le nom"
              />
            </div>
            <div class="form-group">
              <label for="adresse">Adresse</label>
              <input
                v-model="editedSageFemme.adresse"
                type="text"
                class="form-control"
                id="adresse"
                placeholder="Entrez l'adresse"
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                v-model="editedSageFemme.email"
                type="email"
                class="form-control"
                id="email"
                placeholder="Entrez l'email"
              />
            </div>
            <div class="form-group">
              <label for="telephone">Téléphone</label>
              <input
                v-model="editedSageFemme.telephone"
                type="text"
                class="form-control"
                id="telephone"
                placeholder="Entrez le téléphone"
              />
            </div>
            <div class="form-group">
              <label for="matricule">Matricule</label>
              <input
                v-model="editedSageFemme.matricule"
                type="text"
                class="form-control"
                id="matricule"
                placeholder="Entrez le matricule"
              />
            </div>
            <div class="form-group">
              <label for="structure_sante_id">Structure de santé</label>
              <select
                v-model="editedSageFemme.structure_sante_id"
                id="structure_sante_id"
                class="form-control"
              >
                <option value="" disabled selected>
                  Sélectionnez une structure de santé
                </option>
                <option
                  v-for="structure in structuresSante"
                  :key="structure.id"
                  :value="structure.id"
                >
                  {{ structure.nom }}
                </option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="updateSageFemme">
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
import Navbar from "@/components/Navbar.vue";
import sageFemmeService from "@/services/sageFemmeService";
import { Modal } from "bootstrap";
import structuresSanteService from "@/services/structureService";
import Swal from 'sweetalert2';
import Layout from "@/components/layouts/Layout.vue";

export default {
  components: {
    Layout,
  },
  data() {
    return {
      structuresSante: [],
      editedSageFemme: {
        id: "",
        prenom: "",
        nom: "",
        adresse: "",
        email: "",
        telephone: "",
        matricule: "",
        structure_sante_id: null,
      },
      newSageFemme: {
        prenom: "",
        nom: "",
        adresse: "",
        email: "",
        telephone: "",
        matricule: "",
        structure_sante_id: null,
      },
      sageFemmes: [],
    };
  },
  mounted() {
    this.getSageFemmes();
    this.getStructuresSante();
  },
  methods: {
    async getStructuresSante() {
      const reponse = await structuresSanteService.getStructuresSante();
      this.structuresSante = reponse.structures_sante;
    },
    async getSageFemmes() {
      try {
        const response = await sageFemmeService.getSageFemmes();
        this.sageFemmes = response.sages_femmes; // Assurez-vous de récupérer le tableau à partir de la réponse
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des sages-femmes:",
          error
        );
      }
    },
    async addSageFemme() {
      try {
        await sageFemmeService.addSageFemme(this.newSageFemme);
        this.getSageFemmes(); // Mettre à jour la liste après ajout
        this.resetForm(); // Réinitialiser le formulaire
        Swal.fire({
          title: 'Sage-femme ajoutée avec succès!',
          icon: 'success'
        });
      } catch (error) {
        Swal.fire({
          title: 'Erreur lors de l\'ajout d\'une sage-femme',
          text: 'Veuillez vérifier les informations et réessayer.',
          icon: 'error'
        });
      }
    },

    resetForm() {
      this.newSageFemme = {
        prenom: "",
        nom: "",
        adresse: "",
        email: "",
        telephone: "",
        matricule: "",
        structure_sante_id: null,
      };
    },
    viewSageFemme(id) {
      // Logique pour afficher les détails de la sage-femme
    },

    async deleteSageFemme(id) {
      Swal.fire({
        title: 'Supprimer la sage-femme?',
        text: 'Voulez-vous vraiment supprimer cette sage-femme?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Non, annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            sageFemmeService.deleteSageFemme(id);
            const index = this.sageFemmes.findIndex(sageFemme => sageFemme.id === id);
            this.sageFemmes.splice(index, 1);
            Swal.fire({
              title: 'Sage-femme supprimée avec succès!',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            });
          } catch (error) {
            console.error("Erreur lors de la suppression d'une sage-femme :", error);
            Swal.fire({
              title: 'Erreur lors de la suppression d\'une sage-femme',
              text: 'Veuillez réessayer.',
              icon: 'error'
            });
          }
        }
      });
    }
  ,
    async editSageFemme(id) {
      if (!id) {
    console.error("Erreur : l'ID de la sage-femme est manquant");
    return;
  }
      try {
        const response = await sageFemmeService.getSageFemme(id);
        const sageFemme = response.sage_femme;
        
        if (sageFemme) {
          this.editedSageFemme.id = sageFemme.id;
          this.editedSageFemme.prenom = sageFemme.user.prenom;
          this.editedSageFemme.nom = sageFemme.user.nom;
          this.editedSageFemme.adresse = sageFemme.user.adresse;
          this.editedSageFemme.email = sageFemme.user.email;
          this.editedSageFemme.telephone = sageFemme.user.telephone;
          this.editedSageFemme.matricule = sageFemme.matricule;
          this.editedSageFemme.structure_sante_id = sageFemme.structure_sante_id;
        } else {
          console.error(
            "Erreur lors de la récupération des données de la sage-femme :",
            response
          );
        }
        // Ouvrir le modal
        const modal = new Modal(this.$refs.editSageFemme);
        modal.show();
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de la sage-femme :",
          error
        );
      }
    },
    async updateSageFemme() {
  try {
    await sageFemmeService.updateSageFemme(this.editedSageFemme.id, this.editedSageFemme);
    const index = this.sageFemmes.findIndex(sageFemme => sageFemme.id === this.editedSageFemme.id);
    this.sageFemmes.splice(index, 1, this.editedSageFemme);
    Swal.fire({
      title: 'Sage-femme modifiée avec succès !',
      icon: 'success'
    });
  } catch (error) {
    if (error.response && error.response.status === 422) {
      const erreurs = error.response.data.errors;
      let messageErreur = '';
      if (erreurs.email) {
        messageErreur += `L'email est déjà utilisé.\n`;
      }
      if (erreurs.telephone) {
        messageErreur += `Le téléphone est déjà utilisé.\n`;
      }
      Swal.fire({
        title: 'Erreur lors de la modification',
        text: messageErreur,
        icon: 'error'
      });
    } else {
      console.error("Erreur lors de la modification :", error);
      Swal.fire({
        title: 'Erreur lors de la modification',
        text: 'Veuillez vérifier les informations et réessayer.',
        icon: 'error'
      });
    }
  }
}
,
  },
};
</script>

<style scoped>
.sage-femme-list {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.table {
  width: 100%;
}

.btn-action {
  background-color: transparent;
  border: none;
  cursor: pointer;
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
