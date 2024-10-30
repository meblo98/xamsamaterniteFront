<template>
  <Layout>
    <BackButton/>

    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <div class="project-info-box mt-0">
            <div class="card-body text-center mb-5">
              <!-- Profile picture image-->
              <img
                class="img-account-profile rounded-circle mb-2"
                :src="imageUrl"
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
          <div>
            <!-- Section pour la grossesse -->
            <button
              v-if="!grossesses || grossesses.length === 0"
              type="button"
              class="btn"
              data-bs-toggle="modal"
              data-bs-target="#ajoutGrossesse"
            >
              Ajouter une grossesse
            </button>

            <p v-if="!grossesses || grossesses.length === 0">
              Aucune grossesse trouvée pour cette patiente.
            </p>

            <Table
              v-else
              :columns="grossesseColumns"
              :data="grossesses"
              title="Grossesses"
              :formFields="grossesseFields"
              @action="handleGrossesseTableAction"
              @add-data="addGrossesse"
              @edit-data="editGrossesse"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Modal pour ajouter une grossesse -->
    <div
      class="modal fade"
      id="ajoutGrossesse"
      tabindex="-1"
      role="dialog"
      aria-labelledby="ajoutGrossesseTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="ajoutGrossesseTitle">Ajouter une grossesse</h5>
            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close" style="right: 0;margin-left: 200px; background-color: white;color: black"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addGrossesse">
              <!-- Champs pour ajouter les détails de la grossesse -->
              <div class="form-group">
                <label for="date_debut">Date de début</label>
                <input
                  type="date"
                  id="date_debut"
                  v-model="newGrossesse.date_debut"
                  class="form-control"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">Ajouter</button>
            </form>
          </div>
          <div class="mt-3">
            
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/layouts/Layout.vue";
import patienteService from "@/services/patienteService";
import grossesseService from "@/services/grossesseService";
import Table from "@/components/tableau.vue";
import Swal from "sweetalert2";
import BackButton from "@/components/BackButton.vue";

const ACTION_VIEW = "view";
const ACTION_EDIT = "edit";
const ACTION_DELETE = "delete";



export default {
  components: {
    Layout,
    Table,
    BackButton
  },
  data() {
    return {
      newGrossesse: {
        date_debut: "",
        patiente_id: this.id,
      },
      grossesseColumns: [
        { label: "Date de début", field: "date_debut" },
        { label: "Date de fin prevue", field: "date_prevue_accouchement" },
        { label: "Statut", field: "statut" },
        { label: "Actions", field: "action", type: "action" },
      ],
      grossesseFields: [
        {
          label: "Date de début",
          field: "date_debut",
          name: "date_debut",
          type: "date",
          required: true,
        },
        {
          label: "Date prevue pour l'accouchement",
          field: "date_prevue_accouchement",
          name: "date_prevue_accouchement",
          type: "date",
        },
        {
          label: "Statut",
          field: "statut",
          name: "statut",
          type: "select",
            options: [
              { value: "", text: "Selectionner              " },
              { value: "en_cours", text: "En cours" },
              { value: "termine", text: "Terminée" },
              { value: "avorte", text: "Avortée" },
            ],
        },
      ],
      user: {},
      patiente: {},
      grossesses: [],
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
  },
  methods: {
    async getPatienteDetails() {
      try {
        const response = await patienteService.getPatiente(this.id);
        this.patiente = response.patiente;
        this.user = this.patiente.user;
        this.grossesses = this.patiente.grossesses;
        this.imageUrl = this.user.photo
          ? `/images/${this.user.photo}`
          : "/src/assets/images/women.svg";
      } catch (error) {
        console.error("Erreur lors de la récupération des détails :", error);
      }
    },
    isDateValid(date) {
    const today = new Date();
    const inputDate = new Date(date);
    return inputDate <= today; // Vérifie si la date est dans le passé ou aujourd'hui
  },
    async addGrossesse() {
          // Vérifie si la date de début est valide
    if (!this.isDateValid(this.newGrossesse.date_debut)) {
      Swal.fire({
        title: "Erreur",
        text: "La date de début de la grossesse doit être aujourd'hui ou dans le passé.",
        icon: "error",
        timer: 2000,
      });
      return; // Ne pas ajouter la grossesse si la validation échoue
    }
      try {
        const response = await grossesseService.addGrossesse(this.newGrossesse);
        Swal.fire({
          title: "Grossesse ajoutée avec succès !",
          icon: "success",
          timer: 1500,
        });
        this.grossesses.push(response.data);
        this.newGrossesse = { dateDebut: "", patiente_id: this.id };
        window.location.reload();
      } catch (error) {         
        Swal.fire({
          title: "Erreur lors de l'ajout de la grossesse.",
          text: error.response.data.message,
          icon: "error",
          timer: 2000,
        });
      }
    },

      handleGrossesseTableAction({ action, row }) {
        switch (action) {
          case ACTION_VIEW:
            this.$router.push({
              name: "grossesse-sage-femme",
              params: { id: row.id },
            });
            break;
          case ACTION_EDIT:
            this.editGrossesse(row);
            break;
          case ACTION_DELETE:
            this.deleteAccouchement(row.id);
            break;
          default:
            break;
        }
      },


      async editGrossesse(grossesse) {
    try {
      const updatedGrossesse = await grossesseService.updateGrossesse(grossesse.id, grossesse);
      
      Swal.fire({
        icon: "success",
        title: "Grossesse modifiée avec succès",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.reload();

    } catch (error) {
      console.error("Erreur lors de la modification de la grossesse:", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de modifier la grossesse. Veuillez réessayer.",
      });
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
button {
  background-color: #6932f9;
  color: white;
  border: none;
  padding: 5px;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
