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
                :src="imageUrl ? imageUrl : '/src/assets/images/women.svg'"
                alt="patiente"
              />
            </div>
            <h4 class="mb-3 text-capitalize">
              {{ user.prenom }} {{ user.nom }}
            </h4>
            <p>Téléphone : {{ user.telephone }}</p>
            <p>Adresse : {{ user.adresse }}</p>
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
              <p>Aucun rendez-vous trouvé pour cette patiente.</p>
            </div>
            <Table
              v-else
              :columns="rendezVousColumns"
              :data="rendezVous"
              title="Rendez-vous"
              :type="'rendezVous'"
              :formFields="rendezVousFields"
              @action="handleRendezVousTableAction"
              @close-modal="closeModal"
            />
          </div>

          <div class="mt-3">
            <!-- Consultation Section -->
            <div v-if="consultations.length === 0">
              <p>Aucune consultation trouvée pour cette patiente.</p>
            </div>
            <Table
              v-else
              :columns="consultationColumns"
              :data="consultations"
              :type="'consultation'"
              title="Consultations"
              :formFields="consultationFields"
              @action="handleConsultationTableAction"
              @close-modal="closeModal"
            />
          </div>
          <div class="mt-3">
            <div class="mt-3">
              <!-- Accouchements Section -->
              <div v-if="accouchements.length === 0">
                <p>Aucun accouchement trouvé pour cette patiente.</p>
              </div>
              <Table
                v-else
                :columns="accouchementsColumns"
                :data="accouchements"
                title="Accouchements"
                :type="'accouchement'"
                :formFields="accouchementFields"
                @action="handleAccouchementTableAction"
                @close-modal="closeModal"
              />
            </div>
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
import accouchementService from "@/services/accouchementService";
import urlImage from "@/services/imageUrl";

const ACTION_VIEW = "view";
const ACTION_CLOSE = "close";

export default {
  components: {
    Layout,
    Table,
  },
  data() {
    return {
      accouchements: [],
      user: [],
      FormData: {},
      accouchementsColumns: [
        { label: "Date", field: "date" },
        { label: "Mode", field: "mode" },
        { label: "Pathologie", field: "pathologie" },
        { label: "Actions", field: "action", type: "action" },
      ],
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
    this.getAccouchements();
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
    async getPatienteDetails() {
      try {
        const response = await patienteService.getPatiente(this.id);
        this.patiente = response.patiente;
        this.user = this.patiente.user;
        this.imageUrl = urlImage + `${this.user.photo}`; // Défini imageUrl ici
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
            id: consultation.id,
            date: consultation.date,
            type: consultation.visite.libelle,
            terme: consultation.terme,
            autre_examen: consultation.autre_examen,
            SA: consultation.SA,
            plaintes: consultation.plaintes,
            mois: consultation.mois,
            poids: consultation.poids,
            taille: consultation.taille,
            PB: consultation.PB,
            temperature: consultation.temperature,
            urine: consultation.urine,
            sucre: consultation.sucre,
            TA: consultation.TA,
            pouls: consultation.pouls,
            EG: consultation.EG,
            muqueuse: consultation.muqueuse,
            mollet: consultation.mollet,
            OMI: consultation.OMI,
            examen_seins: consultation.examen_seins,
            hu: consultation.hu,
            speculum: consultation.speculum,
            tv: consultation.tv,
            fer_ac_folique: consultation.fer_ac_folique,
            milda: consultation.milda,
            autre_traitement: consultation.autre_traitement,
            maf: consultation.maf,
            bdcf: consultation.bdcf,
            alb: consultation.alb,
            vat: consultation.vat,
            tpi: consultation.tpi,
            palpation: consultation.palpation,
            bdc: consultation.bdc,
            presentation: consultation.presentation,
            bassin: consultation.bassin,
            pelvimetre_externe: consultation.pelvimetre_externe,
            pelvimetre_interne: consultation.pelvimetre_interne,
            biischiatique: consultation.biischiatique,
            trillat: consultation.trillat,
            lign_innominees: consultation.lign_innominees,
            resultat: consultation.resultat,
            lieu_accouchement_apre_consentement:
              consultation.lieu_accouchement_apre_consentement,
            traitement: consultation.traitement,
            sage_femme_id: consultation.sage_femme_id,
            patiente_id: consultation.patiente_id,
            visite_id: consultation.visite_id,
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
            id: rendezVous.id,
            date_rv: rendezVous.date_rv,
            libelle: rendezVous.visite
              ? rendezVous.visite.libelle
              : "Aucun libellé",
            visite_id: rendezVous.visite_id,
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

    async getAccouchements() {
      try {
        const response = await accouchementService.getAccouchementsByPatiente(
          this.id
        );

        if (response && response.accouchements) {
          this.accouchements = response.accouchements.map((accouchement) => ({
            date: accouchement.date,
            mode: accouchement.mode,
            pathologie: accouchement.pathologie,
            lieu: accouchement.lieu,
            heure: accouchement.heure,
            terme: accouchement.terme,
            mois_grossesse: accouchement.mois_grossesse,
            debut_travail: accouchement.debut_travail,
            perinee: accouchement.perinee,
            evolution_reanimation: accouchement.evolution_reanimation,
            id: accouchement.id,
          }));
        } else {
          console.log("Aucun accouchement trouvé pour cette patiente.");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des accouchements :",
          error
        );
      }
    },
    handleAccouchementTableAction({ action, row }) {
      switch (action) {
        case ACTION_VIEW:
          this.$router.push({
            name: "detailAccouchement",
            params: { id: row.id },
          });
          break;
        case ACTION_CLOSE:
          this.showModal = false;
          break;
        default:
          break;
      }
    },

    handleConsultationTableAction({ action, row }) {
      switch (action) {
        case ACTION_VIEW:
          this.$router.push({
            name: "detailConsultation",
            params: { id: row.id },
          });
          break;
        case ACTION_CLOSE:
          this.showModal = false;
          break;
        default:
          break;
      }
    },

    handleRendezVousTableAction({ action, row }) {
      switch (action) {
        case ACTION_VIEW:
          this.$router.push({
            name: "detailRendezVous",
            params: { id: row.id },
          });
          break;
        case ACTION_CLOSE:
          this.showModal = false;
          break;
        default:
          break;
      }
    },
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
</style>
