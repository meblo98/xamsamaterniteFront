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
          <h5>Vaccinations</h5>
          <div v-if="vaccinations.length === 0">
            <p>Aucune vaccination trouvée pour cet enfant.</p>
          </div>
          <Table
            v-else
            :columns="vaccinationColumns"
            :data="vaccinations"
            title="Vaccinations"
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
      vaccinationColumns: [
        { label: "Nom du vaccin", field: "nom_vaccin" },
        { label: "Date d'administration", field: "date_administration" },
        { label: "Lieu", field: "lieu" },
        { label: "Prochaine dose", field: "prochaine_dose" },
      ],
    };
  },
  methods: {
    async fetchEnfantDetails(enfantId) {
      try {
        const response = await enfantService.getEnfant(enfantId);
        console.log(response);
        
        this.enfant = response;
        this.maman = response.accouchement.patiente.user;
        
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de l'enfant :",
          error
        );
      }
    },
  },
  created() {
    const enfantId = this.$route.params.id; // Récupérer l'ID de l'enfant depuis l'URL ou la route
    this.fetchEnfantDetails(enfantId);
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
