<template>
  <Layout>
    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <div class="project-info-box mt-0">
            <h5>DÉTAILS DE LA CAMPAGNE</h5>
            <p class="mb-0">
              {{ campagne.description }}
            </p>
          </div>
          <!-- / project-info-box -->

          <div class="project-info-box">
            <p><b>Nom:</b> {{ campagne.nom }}</p>
            <p><b>Date début:</b> {{ formatDate(campagne.date_debut) }}</p>
            <p><b>Date fin:</b> {{ formatDate(campagne.date_fin) }}</p>
          </div>
          <!-- / project-info-box -->
        </div>
        <!-- / column -->

        <div class="col-md-7">
          <img
            :src="`https://certif.lomouhamedelbachir.simplonfabriques.com/storage//${campagne.image}`"
            alt="Image de la campagne"
            class="rounded"
          />
             <!-- <img
            :src="`http://127.0.0.1:8000/storage//${campagne.image}`"
            alt="Image de la campagne"
            class="rounded"
          /> -->
        </div>
        <!-- / column -->
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/layouts/Layout.vue";
import campagneService from "@/services/campagneService";

export default {
  components: {
    Layout,
  },
  data() {
    return {
      campagne: {},
      imageUrl: null,
    };
  },
  methods: {
    async fetchCampagneDetails() {
      try {
        const response = await campagneService.getCampagne(this.$route.params.id); // Récupère l'ID depuis l'URL
        this.campagne = response.campagne;
          
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de la campagne:", error);
        this.imageUrl = "/src/assets/images/campagne.jpg"; // Image par défaut en cas d'erreur
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    }
  },
  mounted() {
    this.fetchCampagneDetails(); // Récupère les détails de la campagne quand le composant est monté
    this.imageUrl = `https://certif.lomouhamedelbachir.simplonfabriques.com/storage/${this.campagne.image}`;
  }
};
</script>

<style>
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
