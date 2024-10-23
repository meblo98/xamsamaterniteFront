<template>
  <Layout>
    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <div class="project-info-box mt-0">
            <h5>Informations sur l'enfant</h5>
            <p>Prénom : {{ enfant.prenom }}</p>
            <p>Nom : {{ enfant.nom }}</p>
            <p>Date de naissance : {{ enfant.date_naissance }}</p>
            <p>Lieu de naissance : {{ enfant.lieu_naissance }}</p>
            <p>Sexe : {{ enfant.sexe }}</p>
          </div>
        </div>

        <div class="col-md-7">
          <div class="project-info-box mt-0">
            <!-- Section des informations sur la mère -->
            <h5>Informations sur la maman</h5>
            <div class="mb-3">
              <p>Nom : {{ maman.nom }}</p>
              <p>Prénom : {{ maman.prenom }}</p>
              <p>Téléphone : {{ maman.telephone }}</p>
              <p>Adresse : {{ maman.adresse }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="project-info-box mt-0">
          <!-- Section des vaccinations -->
          <div v-if="vaccinations.length === 0">
            <button
              type="button"
              class="btn"
              :data-bs-toggle="'modal'"
              :data-bs-target="'#ajoutVaccination'"
            >
              Ajouter une Vaccination
            </button>

            <!-- Modal d'ajout -->
            <div
              class="modal fade"
              id="ajoutVaccination"
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
                      Ajouter une Vaccination
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
                      <label for="nom">Nom du vaccin</label>
                      <input
                        v-model="newVaccination.nom"
                        type="text"
                        class="form-control"
                        id="nom"
                        placeholder="Entrez le nom du vaccin"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="dose">Dose</label>
                      <input
                        v-model="newVaccination.dose"
                        type="text"
                        class="form-control"
                        id="dose"
                        placeholder="Entrez la dose"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="observation">Observation</label>
                      <input
                        v-model="newVaccination.observation"
                        type="text"
                        class="form-control"
                        id="observation"
                        placeholder="Entrez les observations"
                        required
                      />
                    </div>
                  </div>

                  <div class="modal-footer">
                    <button
                      class="btn"
                      @click="addVaccination({ ...newVaccination })"
                    >
                      Ajouter
                    </button>
                    <button
                      type="button"
                      class="btn"
                      data-bs-dismiss="modal"
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <p>Aucune vaccination trouvée.</p>
          </div>

          <!-- Si des vaccinations sont trouvées -->
        
            <Table
            v-else
              :columns="vaccinationColumns"
              :data="paginatedData"
              title="Les Vaccinations"
              :formFields="vaccinationFields"
              @action="handleTableAction"
              @edit-data="editVaccination"
            />
            <Pagination
              :currentPage="currentPage"
              :totalItems="totalItems"
              :itemsPerPage="itemsPerPage"
              @page-changed="handlePageChange"
            />
         
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/layouts/Layout.vue";
import Table from "@/components/tableau.vue";
import enfantService from "@/services/enfantService";
import vaccinationService from "@/services/vaccinationService";
import Swal from "sweetalert2";

export default {
  components: {
    Table,
    Layout,
  },
  data() {
    return {
      enfant: {
        nom: "",
        prenom: "",
        date_de_naissance: "",
        lieu_de_naissance: "",
        sexe: "",
      },
      maman: {
        nom: "",
        prenom: "",
        telephone: "",
        adresse: "",
      },
      vaccinations: [],
      newVaccination: {
        nom: "",
        dose: "",
        observation: "",
        enfant_id: this.id,
      },
      vaccinationColumns: [
        { label: "Nom du Vaccin", field: "nom" },
        { label: "Date du Vaccin", field: "date" },
        { label: "Dose", field: "dose" },
        { label: "Observation", field: "observation" },
        { label: "Actions", field: "action", type: "action" },
      ],
      vaccinationFields: [
        {
          name: "nom",
          label: "Nom du Vaccin",
          type: "text",
          placeholder: "Entrez le nom du vaccin",
          required: true,
        },
        {
          name: "dose",
          label: "Dose",
          type: "text",
          placeholder: "Entrez la dose",
          required: true,
        },
        {
          name: "observation",
          label: "Observation",
          type: "text",
          placeholder: "Entrez les observations",
          required: true,
        },
      ],
      paginatedData: [],
      currentPage: 1,
      totalItems: 0,
      itemsPerPage: 10,
    };
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  mounted() {
  this.fetchEnfantDetails();
  this.getVaccination();
  this.getVaccinationsPaginated(); // Add this line
},
  methods: {
    async fetchEnfantDetails() {
      try {
        const response = await enfantService.getEnfant(this.id);
        this.enfant = response;
        this.maman = response.accouchement.grossesse.patiente.user;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de l'enfant :",
          error
        );
      }
    },

    async getVaccination() {
      try {
        const response = await vaccinationService.getVaccinationByEnfant(
          this.id
        );
        if (
  response &&
  response.vaccinations &&
  Array.isArray(response.vaccinations)
) {
  this.vaccinations = response.vaccinations.map((vaccination) => ({
    id: vaccination.id,
    nom: vaccination.nom,
    date: new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(vaccination.date)), // Formater la date en français
    dose: vaccination.dose,
    observation: vaccination.observation,
  }));

  // Trier les vaccinations par date, du plus proche au plus éloigné
  this.vaccinations.sort((a, b) => new Date(a.date) - new Date(b.date));

          this.getVaccinationsPaginated()
        
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des vaccinations :",
          error
        );
      }
    },
    handleTableAction({ action, row }) {
      if (action === "edit") this.editVaccination(row);
      else if (action === "delete") this.deleteVaccination(row.id);
    },

    // async addVaccination(vaccinationData = null) {
    //   if (
    //     !vaccinationData.nom ||
    //     !vaccinationData.dose ||
    //     !vaccinationData.observation
    //   ) {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Erreur",
    //       text: "Tous les champs sont requis.",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //     return;
    //   }
    //   vaccinationData.enfant_id = this.id;
    //   try {
    //     await vaccinationService.createVaccination(vaccinationData);
    //     Swal.fire({
    //       title: "Vaccination ajoutée avec succès !",
    //       icon: "success",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //   } catch (error) {
    //     console.error("Erreur lors de l'ajout de la vaccination :", error);
    //     Swal.fire({
    //       icon: "error",
    //       title: "Erreur",
    //       text: "Impossible d'ajouter la vaccination.",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //   }
    // },
    async editVaccination(vaccinationData) {
      try {
        await vaccinationService.updateVaccination(
          vaccinationData.id,
          vaccinationData
        );
        Swal.fire({
          title: "Vaccination modifiée avec succès !",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error(
          "Erreur lors de la modification de la vaccination :",
          error
        );
      }
    },
//     async deleteVaccination(vaccinationId) {
//   Swal.fire({
//     title: 'Confirmation de suppression',
//     text: 'Êtes-vous sûr de vouloir supprimer cette vaccination ?',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Oui, supprimer',
//     cancelButtonText: 'Non, annuler',
//   }).then((result) => {
//     if (result.isConfirmed) {
//       try {
//         vaccinationService.deleteVaccination(vaccinationId);
//         this.getVaccination();
//         Swal.fire({
//           title: 'Suppression réussie',
//           text: 'La vaccination a été supprimée avec succès.',
//           icon: 'success',
//         });
//       } catch (error) {
//         console.error(
//           "Erreur lors de la suppression de la vaccination :",
//           error
//         );
//         Swal.fire({
//           title: 'Erreur de suppression',
//           text: 'Une erreur est survenue lors de la suppression de la vaccination.',
//           icon: 'error',
//         });
//       }
//     }
//   });
// },
    getVaccinationsPaginated() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.paginatedData = this.vaccinations.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.getVaccinationsPaginated();
    },
  },
};
</script>

<style lang="css">
.info {
  background-color: #fff;
  padding: 20px;
}
.project {
  margin: 15px 0;
}
.img-account-profile {
  height: 10rem;
  width: 10rem;
}
.rounded-circle {
  border-radius: 50% !important;
}
.no-gutter .project {
  margin: 0 !important;
  padding: 0 !important;
}

.has-spacer {
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 30px;
}

.has-spacer-extra-space {
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 30px;
}

.has-side-spacer {
  margin-left: 30px;
  margin-right: 30px;
}

.project-title {
  font-size: 1.25rem;
}

.project-skill {
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.06rem;
}

.project-info-box {
  margin: 15px 0;
  background-color: #fff;
  padding: 30px 40px;
  border-radius: 5px;
}

.project-info-box p {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #d5dadb;
}

.project-info-box p:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}
img {
  width: 100%;
  max-width: 100%;
  height: auto;
}
.rounded {
  border-radius: 5px !important;
}
.btn-xs.btn-icon {
  width: 34px;
  height: 34px;
  max-width: 34px !important;
  max-height: 34px !important;
  font-size: 10px;
  line-height: 34px;
}

.project-info-box p {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #d5dadb;
}
p {
  font-family: "Barlow", sans-serif !important;
  font-weight: 300;
  font-size: 1rem;
  color: #686c6d;
  letter-spacing: 0.03rem;
  margin-bottom: 10px;
}
b,
strong {
  font-weight: 700 !important;
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
  background-color: #6932f9;
  color: white;
  border: none;
  padding: 5px;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
