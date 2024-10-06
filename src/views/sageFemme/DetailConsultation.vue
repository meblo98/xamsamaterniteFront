<template>
  <Layout>
    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <div class="project-info-box mt-0">
            <h5 class="mb-5">Detail de la consultation</h5>
            <p>Date: {{ consultation.date }}</p>
            <p>Type: {{ type.libelle }}</p>
            <p>Terme: {{ consultation.terme }}</p>
          </div>
        </div>

        <div class="col-md-7">
          <div class="project-info-box mt-0">
            <!-- Section des informations sur la mère -->
            <h5></h5>
            <div class="mb-3"></div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/layouts/Layout.vue";
import consultationService from "@/services/consultationService";

export default {
  components: {
    Layout,
  },
  data() {
    return {
      consultation: [],
      type: [],
    };
  },
  props: {
        id: {
          type: Number,
          required: true,
        },
      },
  mounted() {
    this.getConsultation();
  },

  methods: {
    // Fonction pour afficher les informations de la consultation
    async getConsultation(){
        try{
            const response = await consultationService.getConsultation(this.id);
            this.consultation = response;            
            this.type = response.visite;    
        }catch(error){
            console.error(error);
        }
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
button {
  background-color: #6932f9;
  color: white;
  border: none;
  padding: 5px;
  margin-bottom: 10px;
  cursor: pointer;
}

</style>
