<template>
  <Layout>
    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <div class="project-info-box mt-0">
            <div class="walletBalanceCard mb-3" v-for="(rv, index) in paginatedRvs" :key="index">
              <div class="walletBalanceCard mb-3">
                <div class="svgwrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="#6932f9"
                      d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zM329 305c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-95 95-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L329 305z" />
                  </svg>
                </div>

                <div class="balancewrapper">
                  <span class="balanceHeading">{{ rv.libelle }}</span>
                  <p class="balance">
                    <span id="currency"></span>Date: {{ rv.date_rv }}
                  </p>
                </div>

                <!-- Condition pour afficher le bon bouton -->
                <button v-if="rv.consultation" @click="showConsultation(rv.consultation)" class="addmoney">
                  <span class="plussign"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                      viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M19.5 13v-3c0-3.3 0-4.95-1.025-5.975S15.8 3 12.5 3h-3C6.2 3 4.55 3 3.525 4.025S2.5 6.7 2.5 10v5c0 3.3 0 4.95 1.025 5.975S6.2 22 9.5 22H11m5-20v2m-5-2v2M6 2v2m7.5 16s1 0 2 2c0 0 3.177-5 6-6M7 15h4m-4-5h8"
                        color="currentColor" />
                    </svg> </span>
                  Afficher consultation
                </button>

                <button v-else @click="addConsultation(rv)" class="addmoney">
                  <span class="plussign"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                      viewBox="0 0 512 512">
                      <path fill="currentColor"
                        d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0m149.3 277.3c0 11.8-9.5 21.3-21.3 21.3h-85.3V384c0 11.8-9.5 21.3-21.3 21.3h-42.7c-11.8 0-21.3-9.6-21.3-21.3v-85.3H128c-11.8 0-21.3-9.6-21.3-21.3v-42.7c0-11.8 9.5-21.3 21.3-21.3h85.3V128c0-11.8 9.5-21.3 21.3-21.3h42.7c11.8 0 21.3 9.6 21.3 21.3v85.3H384c11.8 0 21.3 9.6 21.3 21.3z" />
                    </svg></span> Ajouter consultation
                </button>
              </div>
            </div>
            <div v-if="rendezVous.length > 5">
              <button class="pagination-btn" @click="prevPage">↩ Précédent</button>
              <button class="mx-2">{{ currentPage }}</button>
              <!-- <span class="mx-3">Page {{ currentPage }} sur {{ totalPages }}</span> -->
              <button class="pagination-btn" @click="nextPage">Suivant ↪</button>
            </div>
            <!-- Modal pour afficher ou ajouter une consultation -->
            <div v-if="isModalVisible" class="modal fade show" tabindex="-1" style="display: block">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">{{ modalTitle }}</h5>
                    <button type="button" class="close" @click="closeModal" aria-label="Close"
                      style="right: 0;margin-left: 200px; background-color: white;color: black">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <!-- Formulaire d'ajout de consultation -->
                    <form v-if="!selectedRendezVous.consultation" @submit.prevent="submitConsultation">
                      <!-- Ligne 1 -->
                      <div class="row">
                        <div class="col-md-6 form-group">
                          <label for="date">Date</label>
                          <input v-model="consultation.date" type="date" class="form-control" id="date" />
                        </div>
                        <div class="col-md-6 form-group">
                          <label for="terme">Terme</label>
                          <input v-model="consultation.terme" type="text" class="form-control" id="terme" />
                        </div>
                      </div>
                      <!-- Ligne 2 -->
                      <div class="row">
                        <div class="col-md-6 form-group">
                          <label for="SA">SA</label>
                          <input v-model="consultation.SA" type="text" class="form-control" id="SA" />
                        </div>
                        <div class="col-md-6 form-group">
                          <label for="mois">Mois</label>
                          <input v-model="consultation.mois" type="number" class="form-control" id="mois" />
                        </div>
                      </div>
                      <!-- Ligne 3 -->
                      <div class="row">
                        <div class="col-md-6 form-group">
                          <label for="poids">Poids</label>
                          <input v-model="consultation.poids" type="number" class="form-control" id="poids" />
                        </div>
                        <div class="col-md-6 form-group">
                          <label for="taille">Taille</label>
                          <input v-model="consultation.taille" type="text" class="form-control" id="taille" />
                        </div>
                      </div>
                      <!-- Ligne 4 -->
                      <div class="row">
                        <div class="col-md-6 form-group">
                          <label for="temperature">Température</label>
                          <input v-model="consultation.temperature" type="text" class="form-control" id="temperature" />
                        </div>
                        <div class="col-md-6 form-group">
                          <label for="TA">Tension Artérielle</label>
                          <input v-model="consultation.TA" type="text" class="form-control" id="TA" />
                        </div>
                      </div>
                      <!-- Ligne 5 -->
                      <div class="row">
                        <div class="col-md-6 form-group">
                          <label for="pouls">Pouls</label>
                          <input v-model="consultation.pouls" type="text" class="form-control" id="pouls" />
                        </div>
                      </div>
                      <!-- Bouton -->
                      <button type="submit" class="btn btn-primary mt-3">
                        Ajouter la consultation
                      </button>
                    </form>

                    <!-- Détails de la consultation si elle existe -->
                    <div v-else>
                      <div class="row">
                        <div class="col-md-6">
                          <p><strong>Date:</strong> {{ selectedRendezVous.consultation.date }}</p>
                        </div>
                        <div class="col-md-6">
                          <p><strong>SA:</strong> {{ selectedRendezVous.consultation.SA }}</p>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <p><strong>Plaintes:</strong> {{ selectedRendezVous.consultation.plaintes }}</p>
                        </div>
                        <div class="col-md-6">
                          <p><strong>Mois:</strong> {{ selectedRendezVous.consultation.mois }}</p>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <p><strong>Température:</strong> {{ selectedRendezVous.consultation.temperature }}</p>
                        </div>
                        <div class="col-md-6">
                          <p><strong>Pouls:</strong> {{ selectedRendezVous.consultation.pouls }}</p>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <p><strong>Résultat:</strong> {{ selectedRendezVous.consultation.resultat }}</p>
                        </div>
                        <div class="col-md-6">
                          <p><strong>Lieu accouchement après consentement:</strong> {{
                            selectedRendezVous.consultation.lieu_accouchement_apre_consentement }}</p>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <p><strong>Poids:</strong> {{ selectedRendezVous.consultation.poids }}</p>
                        </div>
                        <div class="col-md-6">
                          <p><strong>Tension artérielle:</strong> {{ selectedRendezVous.consultation.TA }}</p>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <p><strong>Terme:</strong> {{ selectedRendezVous.consultation.terme }}</p>
                        </div>
                      </div>
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
            <div class="card p-3 mb-3 d-flex" v-if="accouchement">
              <!-- Afficher les détails de l'accouchement ou les champs d'entrée -->
              <div class="row">
                <div class="col-6">
                  <p v-if="!isEditing">
                    <strong>Date:</strong>
                    {{ accouchement.date }}
                  </p>
                  <div v-else class="form">
                    <strong>Date</strong>
                    <input type="date" v-model="accouchement.date" class="form-control" />
                  </div>
                  <p v-if="!isEditing">
                    <strong>Debut Travail:</strong>
                    {{ accouchement.debut_travail }}
                  </p>
                  <div class="form" v-else>
                    <strong>Debut Travail</strong>
                    <input type="time" v-model="accouchement.debut_travail" class="form-control" />
                  </div>
                  <p v-if="!isEditing">
                    <strong>Lieu:</strong>
                    {{ accouchement.lieu }}
                  </p>
                  <div v-else class="form">
                    <strong>Lieu</strong>
                    <input type="text" v-model="accouchement.lieu" class="form-control" />
                  </div>

                  <p v-if="!isEditing">
                    <strong>Mode:</strong>
                    {{ accouchement.mode }}
                  </p>
                  <div v-else class="for">
                    <strong>Mode</strong>
                    <input type="text" v-model="accouchement.mode" class="form-control" />
                  </div>
                  <p v-if="!isEditing">
                    <strong>Périnée:</strong>
                    {{ accouchement.perinee }}
                  </p>
                  <div v-else class="form">
                    <strong>Périnée</strong>
                    <input type="text" v-model="accouchement.mode" class="form-control" />
                  </div>
                </div>
                <div class="col-6">
                  <p v-if="!isEditing">
                    <strong>Heure:</strong>
                    {{ accouchement.heure }}
                  </p>
                  <div v-else class="form">
                    <strong>Heure</strong>
                    <input type="time" v-model="accouchement.heure" class="form-control" />
                  </div>

                  <p v-if="!isEditing">
                    <strong>Terme:</strong>
                    {{ accouchement.terme }}
                  </p>
                  <div v-else class="form">
                    <span>Terme</span>
                    <input type="text" v-model="accouchement.terme" class="form-control" />
                  </div>

                  <p v-if="!isEditing">
                    <strong>Pathologie:</strong>
                    {{ accouchement.pathologie }}
                  </p>
                  <div v-else class="form">
                    <span>Pathelogie</span>
                    <input type="text" v-model="accouchement.pathologie" class="form-control" />
                  </div>
                  <p v-if="!isEditing">
                    <strong>Evolution de la reanimation:</strong>
                    {{ accouchement.evolution_reanimation }}
                  </p>
                  <div v-else class="form">
                    <span>Evaluation reanimation</span>
                    <input type="text" v-model="accouchement.evolution_reanimation" class="form-control" />
                  </div>
                  <p v-if="!isEditing">
                    <strong>Mois de la grossesse:</strong>
                    {{ accouchement.mois_grossesse }}
                  </p>
                  <div v-else class="form">
                    <span>Mois de frossesse</span>
                    <input type="text" v-model="accouchement.mois_grossesse" class="form-control" />
                  </div>
                </div>
              </div>
              <button @click="toggleEdit" class="btn btn-primary mt-3">
                {{ isEditing ? "Sauvegarder" : "Modifier" }}
              </button>
            </div>
            <div v-else>
              <!-- Bouton pour ajouter un accouchement -->
              <button @click="addAccouchementModal" class="addmoney">
                <span class="plussign">+</span> Ajouter un accouchement
              </button>
            </div>
            <!-- Modal pour ajouter un accouchement -->
            <div v-if="isAccouchementModalVisible" class="modal fade show" tabindex="-1">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Ajouter un accouchement</h5>
                    <button type="button" class="close" @click="closeModal" aria-label="Close"
                      style="right: 0;margin-left: 200px; background-color: white;color: black">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form @submit.prevent="addAccouchement">
                      <!-- Ligne 1 -->
                      <div class="row">
                        <div class="col-md-6 form-group">
                          <label for="date">Date</label>
                          <input v-model="newAccouchement.date" type="date" class="form-control" id="date" required />
                        </div>
                        <div class="col-md-6 form-group">
                          <label for="heure">Heure</label>
                          <input v-model="newAccouchement.heure" type="time" class="form-control" id="heure" required />
                        </div>
                      </div>
                      <!-- Ligne 2 -->
                      <div class="row">
                        <div class="col-md-6 form-group">
                          <label for="debut_travail">Debut Travail</label>
                          <input v-model="newAccouchement.debut_travail" type="time" class="form-control"
                            id="debut_travail" required />
                        </div>
                        <div class="col-md-6 form-group">
                          <label for="lieu">Lieu</label>
                          <select v-model="newAccouchement.lieu" class="form-control" id="lieu" required>
                            <option value="" disabled selected>Choisissez un lieu</option>
                            <option value="maternité">Maternité</option>
                            <option value="domicile">Domicile</option>
                          </select>
                        </div>
                      </div>
                      <!-- Ligne 3 -->
                      <div class="row">
                        <div class="col-md-6 form-group">
                          <label for="mode">Mode</label>
                          <select v-model="newAccouchement.mode" class="form-control" id="mode" required>
                            <option value="" disabled selected>Choisissez un mode</option>
                            <option value="naturel">Naturel</option>
                            <option value="instrumental">Instrumental</option>
                            <option value="césarienne">Césarienne</option>
                          </select>
                        </div>
                        <div class="col-md-6 form-group">
                          <label for="terme">Terme</label>
                          <select v-model="newAccouchement.terme" class="form-control" id="terme" required>
                            <option value="" disabled selected>Choisissez un terme</option>
                            <option value="prématuré">Prématuré</option>
                            <option value="à terme">À terme</option>
                            <option value="post-terme">Post-terme</option>
                          </select>
                        </div>
                      </div>
                      <!-- Ligne 4 -->
                      <div class="row">
                        <div class="col-md-6 form-group">
                          <label for="mois_grossesse">Mois de grossesse</label>
                          <input v-model="newAccouchement.mois_grossesse" type="text" class="form-control"
                            id="mois_grossesse" required />
                        </div>
                        <div class="col-md-6 form-group">
                          <label for="perinee">Périnée</label>
                          <select v-model="newAccouchement.perinee" class="form-control" id="perinee" required>
                            <option value="" disabled selected>Choisissez une option</option>
                            <option value="intact">Intact</option>
                            <option value="episiotomie">Épisiotomie</option>
                            <option value="dechirure">Déchirure</option>
                          </select>
                        </div>
                      </div>
                      <!-- Ligne 5 -->
                      <div class="row">
                        <div class="col-md-6 form-group">
                          <label for="evolution_reanimation">Évolution réanimation</label>
                          <select v-model="newAccouchement.evolution_reanimation" class="form-control"
                            id="evolution_reanimation" required>
                            <option value="" disabled selected>Choisissez une option</option>
                            <option value="favorable">Favorable</option>
                            <option value="transfert">Transfert</option>
                            <option value="décès">Décès</option>
                          </select>
                        </div>
                      </div>
                      <!-- Bouton -->
                      <button type="submit" class="btn btn-primary mt-3">Ajouter l'accouchement</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>


          </div>
          <div>
            <!-- Section pour les conseils -->
            <button v-if="!conseils || conseils.length === 0" type="button" class="btn" @click="openAddConseilModal">
              Ajouter un conseil
            </button>

            <p v-if="!conseils || conseils.length === 0">
              Aucun conseil trouvé pour cette patiente.
            </p>

            <Table v-else :columns="conseilColumns" :data="conseils" title="Conseils" :formFields="conseilFields"
              @action="handleConseilTableAction" @add-data="submitConseil" @edit-data="editConseil"
              @change="handleFileUpload($event, 'image')" />

            <!-- Modal pour ajouter ou afficher les détails du conseil -->
            <div v-if="isConseilModalVisible" class="modal fade show" tabindex="-1" style="display: block">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">{{ modalConseilTitle }}</h5>
                    <button type="button" class="close"
                      style="right: 0;margin-left: 200px; background-color: white;color: black"
                      @click="closeConseilModal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <!-- Formulaire d'ajout de conseil -->
                    <form v-if="!selectedConseil" @submit.prevent="submitConseil">
                      <div class="form-group mb-3">
                        <label for="contenu">Image du conseil</label>
                        <input type="file" class="form-control" id="image"
                          @change="handleFileUpload($event, 'image')" />
                      </div>
                      <div class="form-group mb-3">
                        <label for="contenu">Contenu du conseil</label>
                        <textarea v-model="conseil.description" class="form-control" id="description"></textarea>
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
      modalConseilTitle: "", // Titre du      // Mettre à jour localement les données de la grossesse modifiée
      conseilColumns: [
        { label: "Contenu", field: "description" },
        { label: "Actions", field: "action", type: "action" },
      ],
      conseilFields: [
        { label: "Image", name: "image", type: "file" },
        {
          label: "Description",
          name: "description",
          type: "textarea",
          required: true,
        },
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
      isEditing: false,
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
            date_rv: rv.date_rv, // Garder la date originale pour le tri
            date_rv_formatee: new Intl.DateTimeFormat('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }).format(new Date(rv.date_rv)), // Formater la date en français pour l'affichage
            consultation: rv.consultation || null, // Si une consultation existe, l'inclure
          };
        });

        // Trier les rendez-vous par date, du plus proche au plus éloigné
        this.rendezVous.sort((a, b) => new Date(a.date_rv) - new Date(b.date_rv));
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
      // Récupérer les valeurs des champs
      const accouchementDate = this.newAccouchement.date; // Remplacez par votre champ de date d'accouchement
      const travailTime = this.newAccouchement.travailTime; // Remplacez par votre champ d'heure de travail

      // Validation de la date d'accouchement
      const currentDate = new Date();
      const accouchement = new Date(accouchementDate);
      const travail = new Date(travailTime);

      if (accouchement > currentDate) {
        Swal.fire({
          title: "Erreur",
          text: "La date d'accouchement ne peut pas être une date future.",
          icon: "error",
        });
        return;
      }

      // Validation de l'heure de travail
      if (travail >= accouchement) {
        Swal.fire({
          title: "Erreur",
          text: "L'heure de travail doit être avant l'heure d'accouchement.",
          icon: "error",
        });
        return;
      }

      try {
        await accouchementService.createAccouchement({
          ...this.newAccouchement,
          patiente_id: this.id,
        });
        Swal.fire({
          title: "Accouchement ajouté avec succès!",
          icon: "success",
        });
        window.location.reload();
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
        // Fonction pour formater l'heure au format h:mm
        function formatHeure(timeString) {
          const [hours, minutes] = timeString.split(":"); // Sépare les heures et les minutes
          return `${hours}:${minutes}`; // Retourne l'heure au format h:mm
        }

        if (accouchement.debut_travail) {
          accouchement.debut_travail = formatHeure(accouchement.debut_travail); // Formate l'heure
        }
        if (accouchement.heure) {
          accouchement.heure = formatHeure(accouchement.heure); // Formate l'heure
        }
        // Appelez le service pour modifier un accouchement
        await accouchementService.updateAccouchement(
          this.accouchement.id,
          accouchement
        );
        Swal.fire({
          title: "Accouchement mis à jour avec succès!",
          icon: "success",
        });
        window.location.reload();
      } catch (error) {
        Swal.fire({
          title: "Erreur lors de la mise à jour de l'accouchement",
          text: "Veuillez vérifier les informations et réessayer.",
          icon: "error",
        });
      }
    },
    async toggleEdit() {
      this.isEditing = !this.isEditing;
      if (!this.isEditing) {
        await this.editAccouchement(this.accouchement);
        console.log("Données sauvegardées :", this.accouchement);
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
      // try {
      //   const formData = new FormData();
      //   formData.append("image", this.selectedFile);
      //   formData.append("description", this.conseil.description);
      //   formData.append("grossesse_id", this.id);

      //   const response = await conseilService.createConseil(formData);
      //   window.location.reload();

      //   console.log("Conseil ajouté avec succès", response);
      //   // Fermer le modal après succès
      // } catch (error) {
      //   console.error("Erreur lors de l'ajout du conseil :", error);
      // }

try {
  const formData = new FormData();
  formData.append("description", this.conseil.description);
  formData.append("image", this.selectedFile); // Ajouter l'image
  formData.append("grossesse_id", this.id);
  // Appel au service pour créer un conseil
  const response = await conseilService.createConseil(formData);

  // Rechargez la liste des conseils

  Swal.fire({
    title: "Conseil ajouté avec succès !",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
        window.location.reload();

  // Réinitialisez le formulaire après l'ajout
} catch (error) {
  console.error("Erreur lors de l'ajout du conseil :", error);
  Swal.fire({
    title: "Erreur lors de l'ajout du conseil !",
    icon: "error",
    timer: 1000,
  });
}
    },
   


  },
};
</script>

<style scoped>
.modal.fade.show {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.modal-dialog {
  max-width: 600px;
  margin: auto;
}

.modal-content {
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 1.5em;
}

.close {
  font-size: 1.2em;
  cursor: pointer;
}

.form-group label {
  font-weight: bold;
  margin-top: 10px;
  display: block;
}

.form-control {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  box-sizing: border-box;
  font-size: 1em;
}

.btn-primary {
  background-color: #6932f9;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1em;
}

.btn-primary:hover {
  background-color: #0056b3;
}




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

.pagination-btn {
  padding: 10px 20px;
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
  padding: 6px 15px;
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
