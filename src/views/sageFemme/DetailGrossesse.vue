<template>
  <Layout>
    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <div class="project-info-box mt-0">
            <div
              class="walletBalanceCard mb-3"
              v-for="(rv, index) in paginatedRvs"
              :key="index"
            >
              <div class="walletBalanceCard mb-3">
                <div class="svgwrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                      fill="#6932f9"
                      d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zM329 305c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-95 95-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L329 305z"
                    />
                  </svg>
                </div>

                <div class="balancewrapper">
                  <span class="balanceHeading">{{ rv.libelle }}</span>
                  <p class="balance">
                    <span id="currency"></span>Date: {{ rv.date_rv }}
                  </p>
                </div>

                <!-- Condition pour afficher le bon bouton -->
                <button
                  v-if="rv.consultation"
                  @click="showConsultation(rv.consultation)"
                  class="addmoney"
                >
                  <span class="plussign">+</span>
                  Afficher consultation
                </button>

                <button v-else @click="addConsultation(rv)" class="addmoney">
                  <span class="plussign">+</span> Ajouter consultation
                </button>
              </div>
            </div>
            <div v-if="rendezVous.length > 5">
              <button @click="prevPage">↩ Précédent</button>
              <span class="mx-3">Page {{ currentPage }} sur {{ totalPages }}</span>
              <button @click="nextPage">Suivant ↪</button>
            </div>
            <!-- Modal pour afficher ou ajouter une consultation -->
            <div
              v-if="isModalVisible"
              class="modal fade show"
              tabindex="-1"
              style="display: block"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">{{ modalTitle }}</h5>
                    <button
                      type="button"
                      class="close"
                      @click="closeModal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <!-- Formulaire d'ajout de consultation -->
                    <form
                      v-if="!selectedRendezVous.consultation"
                      @submit.prevent="submitConsultation"
                    >
                      <div class="form-group">
                        <label for="terme">Date</label>
                        <input
                          v-model="consultation.date"
                          type="date"
                          class="form-control"
                          id="date"
                        />
                      </div>
                      <div class="form-group">
                        <label for="terme">Terme</label>
                        <input
                          v-model="consultation.terme"
                          type="text"
                          class="form-control"
                          id="terme"
                        />
                      </div>
                      <div class="form-group">
                        <label for="terme">SA</label>
                        <input
                          v-model="consultation.SA"
                          type="text"
                          class="form-control"
                          id="SA"
                        />
                      </div>
                      <div class="form-group">
                        <label for="terme">Mois</label>
                        <input
                          v-model="consultation.mois"
                          type="number"
                          class="form-control"
                          id="moi"
                        />
                      </div>
                      <div class="form-group">
                        <label for="terme">Poids</label>
                        <input
                          v-model="consultation.poids"
                          type="number"
                          class="form-control"
                          id="poids"
                        />
                      </div>
                      <div class="form-group">
                        <label for="terme">Taille</label>
                        <input
                          v-model="consultation.taille"
                          type="text"
                          class="form-control"
                          id="taille"
                        />
                      </div>
                      <div class="form-group">
                        <label for="terme">temperature</label>
                        <input
                          v-model="consultation.temperature"
                          type="text"
                          class="form-control"
                          id="temperature"
                        />
                      </div>
                      <div class="form-group">
                        <label for="terme">Tension Arterielle</label>
                        <input
                          v-model="consultation.TA"
                          type="text"
                          class="form-control"
                          id="TA"
                        />
                      </div>
                      <div class="form-group">
                        <label for="terme">Pouls</label>
                        <input
                          v-model="consultation.pouls"
                          type="text"
                          class="form-control"
                          id="pouls"
                        />
                      </div>
                      <!-- Ajouter d'autres champs nécessaires ici -->
                      <button type="submit" class="btn btn-primary">
                        Ajouter la consultation
                      </button>
                    </form>

                    <!-- Détails de la consultation si elle existe -->
                    <div v-else>
                      <p>
                        <strong>Date:</strong>
                        {{ selectedRendezVous.consultation.date }}
                      </p>
                      <p>
                        <strong>SA:</strong>
                        {{ selectedRendezVous.consultation.SA }}
                      </p>
                      <p>
                        <strong>Plaintes:</strong>
                        {{ selectedRendezVous.consultation.plaintes }}
                      </p>
                      <p>
                        <strong>Mois:</strong>
                        {{ selectedRendezVous.consultation.mois }}
                      </p>
                      <p>
                        <strong>Temperature:</strong>
                        {{ selectedRendezVous.consultation.temperature }}
                      </p>
                      <p>
                        <strong>Pouls:</strong>
                        {{ selectedRendezVous.consultation.pouls }}
                      </p>
                      <p>
                        <strong>Resultat:</strong>
                        {{ selectedRendezVous.consultation.resultat }}
                      </p>
                      <p>
                        <strong>Lieu accouchement apres consentement:</strong>
                        {{
                          selectedRendezVous.consultation
                            .lieu_accouchement_apre_consentement
                        }}
                      </p>
                      <p>
                        <strong>Poinds:</strong>
                        {{ selectedRendezVous.consultation.poids }}
                      </p>
                      <p>
                        <strong>Tension arterielle:</strong>
                        {{ selectedRendezVous.consultation.TA }}
                      </p>
                      <p>
                        <strong>Terme:</strong>
                        {{ selectedRendezVous.consultation.terme }}
                      </p>
                      <!-- Afficher d'autres détails de la consultation ici -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <div class="">
            <!-- Condition pour afficher l'accouchement ou le bouton d'ajout -->
            <div v-if="accouchement">
              <!-- Afficher les détails de l'accouchement -->
              <p>
                <strong>Date:</strong>
                {{ accouchement.date }}
              </p>
              <p>
                <strong>Mode:</strong>
                {{ accouchement.mode }}
              </p>
              <p>
                <strong>Lieu:</strong>
                {{ accouchement.lieu }}
              </p>
              <!-- Afficher d'autres détails de l'accouchement ici -->
            </div>
            <div v-else>
              <!-- Bouton pour ajouter un accouchement -->
              <button @click="addAccouchementModal" class="addmoney">
                <span class="plussign">+</span> Ajouter un accouchement
              </button>
            </div>
            <!-- Modal pour ajouter un accouchement -->
            <div
              v-if="isAccouchementModalVisible"
              class="modal fade show"
              tabindex="-1"
              style="display: block"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Ajouter un accouchement</h5>
                    <button
                      type="button"
                      class="close"
                      @click="closeAccouchementModal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <!-- Formulaire d'ajout d'accouchement -->
                    <form @submit.prevent="addAccouchement">
                      <div class="form-group">
                        <label for="date">Date</label>
                        <input
                          v-model="newAccouchement.date"
                          type="date"
                          class="form-control"
                          id="date"
                        />
                      </div>
                      <div class="form-group">
                        <label for="mode">Heure</label>
                        <input
                          v-model="newAccouchement.heure"
                          type="time"
                          class="form-control"
                          id="heure"
                        />
                      </div>
                      <div class="form-group mb-3">
                        <label for="lieu">Debut Travail</label>
                        <input
                          v-model="newAccouchement.debut_travail"
                          type="time"
                          class="form-control"
                          id="debut_travail"
                        />
                      </div>
                      <div class="form-group mb-3">
                        <label for="lieu">Lieu</label>
                        <select
                          v-model="newAccouchement.lieu"
                          class="form-control"
                          id="lieu"
                        >
                          <option value="" disabled selected>
                            Choisissez un lieu
                          </option>
                          <option value="maternité">Maternité</option>
                          <option value="domicile">Domicile</option>
                        </select>
                      </div>
                      <div class="form-group mb-3">
                        <label for="mode">Mode</label>
                        <select
                          v-model="newAccouchement.mode"
                          class="form-control"
                          id="mode"
                        >
                          <option value="" disabled selected>
                            Choisissez un mode
                          </option>
                          <option value="naturel">Naturel</option>
                          <option value="instrumental">Instrumental</option>
                          <option value="césarienne">Césarienne</option>
                        </select>
                      </div>
                      <div class="form-group mb-3">
                        <label for="lieu">Terme</label>
                        <select
                          v-model="consultation.terme"
                          class="form-control"
                          id="terme"
                        >
                          <option value="" disabled selected>
                            Choisissez un terme
                          </option>
                          <option value="prématuré">Prématuré</option>
                          <option value="à terme">À terme</option>
                          <option value="post-terme">Post-terme</option>
                        </select>
                      </div>
                      <div class="form-group mb-3">
                        <label for="lieu">Mois de grossesse</label>
                        <input
                          v-model="newAccouchement.mois_grossesse"
                          type="text"
                          class="form-control"
                          id="mois_grossesse"
                        />
                      </div>
                      <div class="form-group mb-3">
                        <label for="perinee">Périnée</label>
                        <select
                          v-model="newAccouchement.perinee"
                          class="form-control"
                          id="perinee"
                        >
                          <option value="" disabled selected>
                            Choisissez une option
                          </option>
                          <option value="intact">Intact</option>
                          <option value="episiotomie">Épisiotomie</option>
                          <option value="dechirure">Déchirure</option>
                        </select>
                      </div>
                      <div class="form-group mb-3">
                        <label for="evolution_reanimation"
                          >Évolution réanimation</label
                        >
                        <select
                          v-model="newAccouchement.evolution_reanimation"
                          class="form-control"
                          id="evolution_reanimation"
                        >
                          <option value="" disabled selected>
                            Choisissez une option
                          </option>
                          <option value="favorable">Favorable</option>
                          <option value="transfert">Transfert</option>
                          <option value="décès">Décès</option>
                        </select>
                      </div>
                      <button type="submit" class="btn btn-primary">
                        Ajouter l'accouchement
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <!-- Section pour les conseils -->
            <button
              v-if="!conseils || conseils.length === 0"
              type="button"
              class="btn"
              @click="openAddConseilModal"
            >
              Ajouter un conseil
            </button>

            <p v-if="!conseils || conseils.length === 0">
              Aucun conseil trouvé pour cette patiente.
            </p>

            <Table
              v-else
              :columns="conseilColumns"
              :data="conseils"
              title="Conseils"
              :formFields="conseilFields"
              @action="handleConseilTableAction"
              @add-data="addConseil"
              @edit-data="editConseil"
              @change="handleFileUpload($event, 'image')"
            />

            <!-- Modal pour ajouter ou afficher les détails du conseil -->
            <div
              v-if="isConseilModalVisible"
              class="modal fade show"
              tabindex="-1"
              style="display: block"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">{{ modalConseilTitle }}</h5>
                    <button
                      type="button"
                      class="close"
                      @click="closeConseilModal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <!-- Formulaire d'ajout de conseil -->
                    <form
                      v-if="!selectedConseil"
                      @submit.prevent="submitConseil"
                    >
                      <div class="form-group mb-3">
                        <label for="contenu">Image du conseil</label>
                        <input
                          type="file"
                          class="form-control"
                          id="image"
                          @change="handleFileUpload($event, 'image')"
                        />
                      </div>
                      <div class="form-group mb-3">
                        <label for="contenu">Contenu du conseil</label>
                        <textarea
                          v-model="conseil.description"
                          class="form-control"
                          id="description"
                        ></textarea>
                      </div>
                      <button type="submit" class="btn btn-primary">
                        Ajouter le conseil
                      </button>
                    </form>

                    <!-- Détails du conseil si sélectionné -->
                    <div v-else>
                      <p>
                        <strong>Contenu :</strong> {{ selectedConseil.contenu }}
                      </p>
                      <!-- Afficher d'autres détails du conseil ici -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/layouts/Layout.vue";
import consultationService from "@/services/consultationService";
import Table from "@/components/tableau.vue";
import Swal from "sweetalert2";
import accouchementService from "@/services/accouchementService";
import conseilService from "@/services/conseilService";
import grossesseService from "@/services/grossesseService";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
const ACTION_VIEW = "view";
const ACTION_EDIT = "edit";
const ACTION_DELETE = "delete";

export default {
  components: {
    Layout,
    Table,
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      conseils: [], // Liste des conseils pour la patiente
      conseil: {}, // Les champs de formulaire pour l'ajout d'un conseil
      selectedConseil: null, // Conseil sélectionné pour affichage
      isConseilModalVisible: false, // Etat pour montrer ou cacher le modal
      modalConseilTitle: "", // Titre du modal
      conseilColumns: [
        { label: "Contenu", field: "description" },
        { label: "Actions", field: "action", type: "action" },
      ],
      conseilFields: [
        { label: "Image", name: "image", type: "textarea", required: true },
        { label: "Description", name: "description", type: "textarea",required:true, },
      ],
      isAccouchementModalVisible: false,
      isModalVisible: false, // Utilisé pour contrôler la visibilité du modal
      selectedRendezVous: null,
      consultation: {},
      modalTitle: "",
      conseils: [],
      newConseil: {
        image: null,
        description: "",
        patiente_id: this.id,
      },
      accouchement: [],
      user: [],
      FormData: {},
      selectedFile: null,
      patiente: {}, // Détails de la patiente
      consultations: [], // Stockage des consultations
      rendezVous: [], // Stockage des rendez-vous
      selectedRendezVous: null, // Le rendez-vous sélectionné lors du clic
      newAccouchement: {
        date: "",
        heure: "",
        debut_travail: "",
        mois_grossesse: "",
        terme: "",
        mode: "",
        perinee: "",
        pathologie: "",
        evolution_reanimation: "",
        lieu: "",
        grossesse_id: this.id,
      },
    };
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.getGrossesse();
  },
  computed: {
    paginatedRvs() {
      return this.rendezVous.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    totalPages() {
      return Math.ceil(this.rendezVous.length / this.pageSize);
    },
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    async getGrossesse() {
      try {
        const response = await grossesseService.getGrossesse(this.id);

        this.grossesse = response.data;
        this.conseils = this.grossesse.conseils.map((conseil) => {
          return {
            id: conseil.id,
            image: conseil.image,
            description: conseil.description,
          };
        });
        this.accouchement = this.grossesse.accouchement;
        this.rendezVous = this.grossesse.rendez_vous.map((rv) => {
          return {
            id: rv.id,
            libelle: rv.libelle,
            date_rv: rv.date_rv,
            consultation: rv.consultation || null, // Si une consultation existe, l'inclure
          };
        });
  
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des rendez-vous :",
          error
        );
      }
    },
    addAccouchementModal() {
      this.isAccouchementModalVisible = true;
    },
    handleAccouchementTableAction({ action, row }) {
      switch (action) {
        case ACTION_VIEW:
          this.$router.push({
            name: "detailAccouchement",
            params: { id: row.id },
          });
          break;
        case ACTION_EDIT:
          this.editAccouchement(row);
          break;
        case ACTION_DELETE:
          this.deleteAccouchement(row.id);
          break;
        default:
          break;
      }
    },
    handleFileUpload(event, fieldName) {
      const file = event.target.files[0];
      if (fieldName === "image") {
        this.selectedFile = file; // Met à jour selectedFile avec le fichier
        this.newCampagne.image = file; // Met également à jour l'image dans newCampagne si nécessaire
      }
    },
    // Méthode pour ajouter une consultation
    addConsultation(rv) {
      this.selectedRendezVous = rv;
      this.modalTitle = "Ajouter une consultation";
      this.consultation = {}; // Réinitialiser le formulaire
      this.isModalVisible = true; // Afficher le modal
    },
    showConsultation(consultation) {
      this.selectedRendezVous = { consultation };
      this.modalTitle = "Détails de la consultation";
      this.isModalVisible = true; // Afficher le modal avec les détails
    },
    closeModal() {
      this.isModalVisible = false; // Fermer le modal
    },
    async submitConsultation() {
      try {
        const data = {
          terme: this.consultation.terme,
          date: this.consultation.date,
          mois: this.consultation.mois,
          pouls: this.consultation.pouls,
          SA: this.consultation.SA,
          poids: this.consultation.poids,
          taille: this.consultation.taille,
          temperature: this.consultation.temperature,
          TA: this.consultation.TA,
          rendez_vous_id: this.selectedRendezVous.id,
        };
        const response = await consultationService.createConsultation(data);
        Swal.fire({
          title: "Consultation ajouter avec succès!",
          icon: "success",
        });
        // Fermer le modal après le succès
        this.isModalVisible = false;
        window.location.reload();
      } catch (error) {
        console.error("Erreur lors de l'ajout de la consultation :", error);
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

    async addAccouchement() {
      try {
        await accouchementService.createAccouchement({
          ...this.newAccouchement,
          patiente_id: this.id,
        });
        Swal.fire({
          title: "Accouchement ajouté avec succès!",
          icon: "success",
        });
        this.getAccouchements();
      } catch (error) {
        Swal.fire({
          title: "Erreur lors de l'ajout",
          text: error,
          icon: "error",
        });
      }
    },
    resetAccouchementForm() {
      this.newAccouchement = {
        date: "",
        mode: "",
        perinee: "",
        lieu: "",
        mois_grossesse: "",
        terme: "",
        debut_travail: "",
        pathologie: "",
        heure: "",
        evolution_reanimation: "",
        mode: "",
        patiente_id: this.id,
      };
    },
    async editAccouchement(accouchement) {
      try {
        // Appelez le service pour modifier un accouchement
        await accouchementService.updateAccouchement(
          accouchement.id,
          accouchement
        );
        this.getAccouchements(); // Rafraîchir la liste des accouchements
        Swal.fire({
          title: "Accouchement mis à jour avec succès!",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Erreur lors de la mise à jour de l'accouchement",
          text: "Veuillez vérifier les informations et réessayer.",
          icon: "error",
        });
      }
    },

    handleFileUpload(event, fieldName) {
      const file = event.target.files[0];
      if (fieldName === "image") {
        this.selectedFile = file; // Met à jour selectedFile avec le fichier
        this.conseil.image = file; // Met également à jour l'image dans newCampagne si nécessaire
      }
    },

    // Ouvrir le modal pour ajouter un conseil
    openAddConseilModal() {
      this.selectedConseil = null;
      this.conseil = {}; // Réinitialiser le formulaire
      this.modalConseilTitle = "Ajouter un conseil";
      this.isConseilModalVisible = true; // Afficher le modal
    },
    // Ouvrir le modal pour modifier un conseil
    editConseil(conseil) {
      this.selectedConseil = conseil;
      this.modalConseilTitle = "Modifier le conseil";
      this.isConseilModalVisible = true;
    },

    // Ouvrir le modal pour voir un conseil
    viewConseil(conseil) {
      this.selectedConseil = conseil;
      this.modalConseilTitle = "Détails du conseil";
      this.isConseilModalVisible = true;
    },

    // Fermer le modal
    closeConseilModal() {
      this.isConseilModalVisible = false;
    },

    // Soumettre le formulaire pour ajouter un nouveau conseil
    async submitConseil() {
      try {
        const formData = new FormData();
        formData.append("image", this.selectedFile);
        formData.append("description", this.conseil.description);
        formData.append("grossesse_id", this.id);

        const response = await conseilService.createConseil(formData);
        console.log("Conseil ajouté avec succès", response);
        // Fermer le modal après succès
        this.isConseilModalVisible = false;
      } catch (error) {
        console.error("Erreur lors de l'ajout du conseil :", error);
      }
    },
    // async addConseil(conseilData) {
    //   let errorMessage = "";

    //   if (!conseilData.description) errorMessage += "Description, ";
    //   if (!this.selectedFile) errorMessage += "Image, ";

    //   if (errorMessage) {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Erreur",
    //       text: `Le(s) champ(s) suivant(s) est(sont) requis : ${errorMessage
    //         .trim()
    //         .slice(0, -1)}.`,
    //     });
    //     return;
    //   }

    //   if (!this.selectedFile || this.selectedFile.size === 0) {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Erreur",
    //       text: "Veuillez sélectionner un fichier valide.",
    //     });
    //     return;
    //   }

    //   try {
    //     const formData = new FormData();
    //     formData.append("description", conseilData.description);
    //     formData.append("image", this.selectedFile); // Ajouter l'image
    //     formData.append("patiente_id", conseilData.patiente_id);
    //     // Appel au service pour créer un conseil
    //     const response = await conseilService.createConseil(formData);

    //     // Rechargez la liste des conseils
    //     this.getConseilsPatiente();

    //     Swal.fire({
    //       title: "Conseil ajouté avec succès !",
    //       icon: "success",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });

    //     // Réinitialisez le formulaire après l'ajout
    //     this.resetConseilForm();
    //   } catch (error) {
    //     console.error("Erreur lors de l'ajout du conseil :", error);
    //     Swal.fire({
    //       title: "Erreur lors de l'ajout du conseil !",
    //       icon: "error",
    //       timer: 1000,
    //     });
    //   }
    // },

    // resetConseilForm() {
    //   this.newConseil = {
    //     image: "",
    //     description: "",
    //     patiente_id: this.id,
    //   };
    // },
  },
};
</script>

<style scoped>
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

.walletBalanceCard {
  width: fit-content;
  height: 55px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  /* padding: 0px 12px; */
  font-family: Arial, Helvetica, sans-serif;
}
.svgwrapper {
  width: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.svgwrapper svg {
  width: 100%;
}
.balancewrapper {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 120px;
  gap: 0px;
}
.balanceHeading {
  font-size: 8px;
  color: #6932f9;
  font-weight: 100;
  letter-spacing: 0.6px;
}
.balance {
  font-size: 13.5px;
  color: #6932f9;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.addmoney {
  padding: 1px 15px;
  background-color: #6932f9;
  color: white;
  border: none;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.addmoney:hover {
  background-color: whitesmoke;
  color: #6932f9;
}
.plussign {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
