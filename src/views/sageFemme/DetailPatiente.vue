<template>
  <Layout>
    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <div class="project-info-box mt-0">
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

export default {
  components: {
    Layout,
    Table,
  },
  data() {
    return {
      patiente: {}, // Détails de la patiente
      consultations: [], // Stockage des consultations
      rendezVous: [], // Stockage des rendez-vous
      consultationColumns: [
        { label: "Date", field: "date" },
        { label: "Type de rendez-vous", field: "type" },
        { label: "Terme", field: "terme" },
        { label: 'Actions', field: 'action', type: 'action' }
      ],
      rendezVousColumns: [
        { label: "Date", field: "date_rv" },
        { label: "Type de rendez-vous", field: "libelle" },
        { label: 'Actions', field: 'action', type: 'action' }
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
  },
  methods: {
    async getPatienteDetails() {
      try {
        const response = await patienteService.getPatiente(this.id);
        this.patiente = response.patiente;
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de la patiente :", error);
      }
    },
    async getConsultations() {
  try {
    const response = await consultationService.getConsultationsByPatiente(this.id);
    
    if (response && response.consultations) {
      if (!Array.isArray(response.consultations)) {
        response.consultations = [response.consultations];
      }

      this.consultations = response.consultations.map(consultation => ({
        date: consultation.date,
        type: consultation.visite.libelle,
        terme: consultation.terme,
      }));
    } else {
      console.log("Aucune consultation trouvée pour cette patiente.");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des consultations :", error);
  }
},

    async getRendezVous() {
  try {
    const response = await consultationService.getRendezVousByPatiente(this.id);
    
    // Vérifie si mes_rv existe
    if (response && response.mes_rv) {
      // Si mes_rv est un objet unique
      if (!Array.isArray(response.mes_rv)) {
        // On le transforme en tableau pour le traiter de manière uniforme
        response.mes_rv = [response.mes_rv];
      }

      // Mapper les rendez-vous
      this.rendezVous = response.mes_rv.map(rendezVous => ({
        date_rv: rendezVous.date_rv,
        libelle: rendezVous.visite ? rendezVous.visite.libelle : 'Aucun libellé',
        id: rendezVous.id,
      }));
    } else {
      console.log("Aucun rendez-vous trouvé pour cette patiente.");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des rendez-vous :", error);
  }
},



  },
};
</script>


<style lang="css">
  .info{
    background-color: #fff;
    padding: 20px;
  }
  .project {
  margin: 15px 0;
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
</style>