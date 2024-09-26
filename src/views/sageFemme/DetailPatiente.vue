<template>
  <Layout>
    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <div class="project-info-box mt-0">
            <div class="card-body text-center mb-5">
              <!-- Profile picture image-->
              <img
                class="img-account-profile rounded-circle mb-2"
                src="http://bootdey.com/img/Content/avatar/avatar1.png"
                alt=""
              />
            </div>
            <!-- <h4>{{ patiente.user.prenom }} {{ patiente.user.nom }}</h4>
            <p>Téléphone : {{ patiente.user.telephone }}</p>
            <p>Adresse : {{ patiente.user.adresse }}</p> -->
            <p>Lieu de naissance : {{ patiente.lieu_de_naissance }}</p>
            <p>Date de naissance : {{ patiente.date_de_naissance }}</p>
            <p>Profession : {{ patiente.profession }}</p>
            <p>Type : {{ patiente.type }}</p>
          </div>
        </div>
        <div class="col-md-7">
          <div class="">
            <!-- Rendez-vous Section -->
            <div v-if="rendezVous.length === 0">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#ajoutRendezVous"
              >
                Ajouter un rendez-vous
              </button>

              <!-- Modal -->
              <div
                class="modal fade"
                id="ajoutRendezVous"
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
                        Ajouter un rendez-vous
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
                        <label for="date_rv">Date du rendez-vous</label>
                        <input
                          v-model="newRendezVous.date_rv"
                          type="date"
                          class="form-control"
                          id="date_rv"
                          placeholder="Sélectionnez la date"
                        />
                      </div>
                      <div class="form-group">
                        <label for="structure_sante_id"
                          >Structure de santé</label
                        >
                        <select
                          v-model="newRendezVous.visite_id"
                          id="visite_id"
                          class="form-control"
                        >
                          <option value="" disabled selected>
                            Sélectionnez le type de la consultation
                          </option>
                          <option
                            v-for="visite in visites"
                            :key="visite.id"
                            :value="visite.id"
                          >
                            {{ visite.libelle }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button class="btn btn-primary" @click="addRendezVous">
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
              <p>Aucun rendez-vous trouvé pour cette patiente.</p>
            </div>
            <Table
              v-else
              :columns="rendezVousColumns"
              :data="rendezVous"
              title="Rendez-vous"
              :type="'rendezVous'"
              @action="handleTableAction"
            />
          </div>

          <div class="mt-3">
            <!-- Consultation Section -->
            <div v-if="consultations.length === 0">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#ajoutConsultation"
              >
                Ajouter une consultation
              </button>

              <!-- Modal -->
              <div
                class="modal fade"
                id="ajoutConsultation"
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
                        Ajouter une consultation
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
  <label for="visite_id">Structure de santé</label>
  <select
    v-model="newConsultation.visite_id"
    id="visite_id"
    class="form-control"
  >
    <option value="" disabled selected>
      Sélectionnez le type de la consultation
    </option>
    <option
      v-for="visite in visites"
      :key="visite.id"
      :value="visite.id"
    >
      {{ visite.libelle }}
    </option>
  </select>
</div>

                      <div class="form-group">
                        <label for="date_consultation"
                          >Date de la consultation</label
                        >
                        <input
                          v-model="newConsultation.date"
                          type="date"
                          class="form-control"
                          id="date_consultation"
                          placeholder="Sélectionnez la date"
                        />
                      </div>
                      <div class="form-group">
                        <label for="terme">Terme</label>
                        <input
                          v-model="newConsultation.terme"
                          type="text"
                          class="form-control"
                          id="terme"
                          placeholder="Entrez le terme"
                        />
                      </div>
                      <div class="form-group">
                        <label for="plaintes">Plaintes</label>
                        <textarea
                          v-model="newConsultation.plaintes"
                          class="form-control"
                          id="plaintes"
                          placeholder="Décrivez les plaintes"
                        ></textarea>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button class="btn btn-primary" @click="addConsultation">
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

              <p>Aucune consultation trouvée pour cette patiente.</p>
            </div>
            <Table
              v-else
              :columns="consultationColumns"
              :data="consultations"
              :type="'consultation'"
              title="Consultations"
            />
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/layouts/Layout.vue";
import patienteService from "@/services/patienteService";
import consultationService from "@/services/consultationService";
import Table from "@/components/tableau.vue";
import visiteService from "@/services/visiteService";
import rendezVousService from "@/services/rendezVousService";
import Swal from "sweetalert2";

export default {
  components: {
    Layout,
    Table,
  },
  data() {
    return {
      newRendezVous: {
        date_rv: "",
        libelle: "",
        visite_id: "",
        patiente_id: this.id, // Assurez-vous que l'ID de la patiente est bien passé
      },
      newConsultation: {
        newConsultation: {
          date: "",
          terme: "",
          SA: "",
          plaintes: "",
          mois: "",
          poids: "",
          taille: "",
          PB: "",
          temperature: "",
          urine: "",
          sucre: "",
          TA: "",
          pouls: "",
          EG: "",
          muqueuse: "",
          mollet: "",
          OMI: "",
          examen_seins: "",
          hu: "",
          speculum: "",
          tv: "",
          fer_ac_folique: "",
          milda: "",
          autre_traitement: "",
          maf: "",
          bdcf: "",
          alb: "",
          vat: "",
          tpi: "",
          palpation: "",
          bdc: "",
          presentation: "",
          bassin: "",
          pelvimetre_externe: "",
          pelvimetre_interne: "",
          biischiatique: "",
          trillat: "",
          lign_innominees: "",
          autre_examen: "",
          resultat: "",
          lieu_accouchement_apre_consentement: "",
          traitement: "",
          patiente_id: this.id,
          visite_id: "",
        },
      },
      patiente: {}, // Détails de la patiente
      consultations: [], // Stockage des consultations
      rendezVous: [], // Stockage des rendez-vous
      consultationColumns: [
        { label: "Date", field: "date" },
        { label: "Type de rendez-vous", field: "type" },
        { label: "Terme", field: "terme" },
        { label: "Actions", field: "action", type: "action" },
      ],
      rendezVousColumns: [
        { label: "Date", field: "date_rv" },
        { label: "Type de rendez-vous", field: "libelle" },
        { label: "Actions", field: "action", type: "action" },
      ],
    };
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.getPatienteDetails();
    this.getConsultations();
    this.getRendezVous();
    this.getVisites();
  },
  methods: {
    async getVisites() {
      try {
        const response = await visiteService.getVisites();
        this.visites = response.ListeVisites;
      } catch (error) {
        console.error("Erreur lors de la récupération des visites :", error);
      }
    },
    async getPatienteDetails() {
      try {
        const response = await patienteService.getPatiente(this.id);
        this.patiente = response.patiente;
        
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de la patiente :",
          error
        );
      }
    },
    async getConsultations() {
      try {
        const response = await consultationService.getConsultationsByPatiente(
          this.id
        );

        if (response && response.consultations) {
          if (!Array.isArray(response.consultations)) {
            response.consultations = [response.consultations];
          }

          this.consultations = response.consultations.map((consultation) => ({
            date: consultation.date,
            type: consultation.visite.libelle,
            terme: consultation.terme,
          }));
        } else {
          console.log("Aucune consultation trouvée pour cette patiente.");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des consultations :",
          error
        );
      }
    },

    async getRendezVous() {
      try {
        const response = await consultationService.getRendezVousByPatiente(
          this.id
        );

        // Vérifie si mes_rv existe
        if (response && response.mes_rv) {
          // Si mes_rv est un objet unique
          if (!Array.isArray(response.mes_rv)) {
            // On le transforme en tableau pour le traiter de manière uniforme
            response.mes_rv = [response.mes_rv];
          }

          // Mapper les rendez-vous
          this.rendezVous = response.mes_rv.map((rendezVous) => ({
            date_rv: rendezVous.date_rv,
            libelle: rendezVous.visite
              ? rendezVous.visite.libelle
              : "Aucun libellé",
            id: rendezVous.id,
          }));
        } else {
          console.log("Aucun rendez-vous trouvé pour cette patiente.");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des rendez-vous :",
          error
        );
      }
    },

    async addRendezVous() {
      try {
        await rendezVousService.createRendezVous(this.newRendezVous);
        this.getRendezVous();
        this.resetRendezVousForm();
        Swal.fire({
          title: "Rendez-vous ajouté avec succès!",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Erreur lors de l'ajout",
          text: "Vérifiez les informations.",
          icon: "error",
        });
      }
    },
    resetRendezVousForm() {
      this.newRendezVous = {
        date_rv: "",
        visite_id: "",
        patiente_id: this.id,
      };
    },
    async addConsultation() {
  try {

    const response = await consultationService.createConsultation({
      ...this.newConsultation,
      patiente_id: this.id,
      visite_id: this.newConsultation.visite_id,  // Assurez-vous que cette valeur est correcte
    });
    
    Swal.fire({
      title: "Succès!",
      text: "Consultation ajoutée avec succès.",
      icon: "success",
    });

    // Réinitialiser les champs du formulaire après succès
    this.newConsultation = { /* champs réinitialisés */ };
    await this.getConsultations();
    $("#ajoutConsultation").modal("hide");
  } catch (error) {
    console.error("Erreur lors de la création de la consultation :", error);

    if (error.response && error.response.status === 422) {
      console.error("Erreurs de validation :", error.response.data.errors);
    }
  }
}
,
    resetConsultationForm() {
      this.newConsultation = {
        date: "",
        terme: "",
        plaintes: "",
        patiente_id: this.id,
      };
    },

    handleTableAction({ action, row }) {
      switch (action) {
        case "view":
          if (type === "consultation") {
            this.$router.push({
              name: "detailConsultation",
              params: { id: row.id },
            });
          } else if (type === "rendezVous") {
            this.$router.push({
              name: "detailRendezVous",
              params: { id: row.id },
            });
          }
          break;
        case "delete":
          this.deleteElement(row.id, row.type);
          break;
        default:
          break;
      }
    },
    async editConsultation(consultation) {
      try {
        // Appelez le service pour modifier une consultation
        await consultationService.updateConsultation(
          consultation.id,
          consultation
        );
        this.getConsultations(); // Rafraîchir la liste des consultations
        Swal.fire({
          title: "Consultation mise à jour avec succès!",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Erreur lors de la mise à jour de la consultation",
          text: "Veuillez vérifier les informations et réessayer.",
          icon: "error",
        });
      }
    },

    async editRendezVous(rendezVous) {
      try {
        // Appelez le service pour modifier un rendez-vous
        await rendezVousService.updateRendezVous(rendezVous.id, rendezVous);
        this.getRendezVous(); // Rafraîchir la liste des rendez-vous
        Swal.fire({
          title: "Rendez-vous mis à jour avec succès!",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Erreur lors de la mise à jour du rendez-vous",
          text: "Veuillez vérifier les informations et réessayer.",
          icon: "error",
        });
      }
    },

    async deleteElement(id, type) {
      Swal.fire({
        title: `Êtes-vous sûr de vouloir supprimer cette ${
          type === "consultation" ? "consultation" : "rendez-vous"
        } ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, supprimer",
        cancelButtonText: "Annuler",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            if (type === "consultation") {
              await consultationService.deleteConsultation(id);
              this.getConsultations(); // Recharger la liste après la suppression
            } else if (type === "rendezVous") {
              await rendezVousService.deleteRendezVous(id);
              this.getRendezVous(); // Recharger la liste après la suppression
            }
            Swal.fire({
              // Add sweet alert for delete operation
              title: `${
                type === "consultation" ? "Consultation" : "Rendez-vous"
              } supprimé avec succès !`,
              icon: "success",
              timer: 1000,
            });
          } catch (error) {
            console.error(
              `Erreur lors de la suppression de la ${
                type === "consultation" ? "consultation" : "rendez-vous"
              } :`,
              error
            );
            Swal.fire({
              // Add sweet alert for error
              title: `Erreur lors de la suppression de la ${
                type === "consultation" ? "consultation" : "rendez-vous"
              } !`,
              icon: "error",
              timer: 1000,
            });
          }
        }
      });
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
  -webkit-backface-visibility: hidden;
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
</style>
