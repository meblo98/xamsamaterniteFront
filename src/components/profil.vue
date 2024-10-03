<template>
  <Layout>
    <div class="container-xl px-4 mt-4">
      <div class="row">
        <div class="col-xl-4">
          <!-- Profile picture card-->
          <div class="card mb-4 mb-xl-0">
            <div class="card-header">Image du profil</div>
            <div class="card-body text-center">
              <!-- Profile picture image-->
              <img
                class="img-account-profile rounded-circle mb-2"
                :src="fullImageUrl"
                alt="Profile Image"
              />
              <!-- Profile picture help block-->
              <div class="small font-italic text-muted mb-4">
                JPG ou PNG d'une taille maximale de 5 Mo
              </div>
              <!-- Profile picture upload button-->
              <input type="file" @change="handleFileUpload" />
            </div>
          </div>
        </div>
        <div class="col-xl-8">
          <!-- Account details card-->
          <div class="card mb-4">
            <div class="card-header">Détails du compte</div>
            <div class="card-body">
              <form @submit.prevent="submitForm">
                <!-- Form Row-->
                <div class="row gx-3 mb-3">
                  <div class="col-md-6">
                    <label class="small mb-1" for="prenom">Prenom</label>
                    <input
                      class="form-control"
                      id="prenom"
                      v-model="profile.prenom"
                      type="text"
                      placeholder="Entrez votre prénom"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="small mb-1" for="nom">Nom</label>
                    <input
                      class="form-control"
                      id="nom"
                      v-model="profile.nom"
                      type="text"
                      placeholder="Entrez votre nom"
                    />
                  </div>
                </div>
                <div class="row gx-3 mb-3">
                  <div class="col-md-6">
                    <label class="small mb-1" for="telephone">Téléphone</label>
                    <input
                      class="form-control"
                      id="telephone"
                      v-model="profile.telephone"
                      type="text"
                      placeholder="Entrez votre téléphone"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="small mb-1" for="adresse">Adresse</label>
                    <input
                      class="form-control"
                      id="adresse"
                      v-model="profile.adresse"
                      type="text"
                      placeholder="Entrez votre adresse"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <label class="small mb-1" for="email">Email</label>
                  <input
                    class="form-control"
                    id="email"
                    v-model="profile.email"
                    type="email"
                    placeholder="Entrez votre email"
                  />
                </div>
                <div class="row gx-3 mb-3">
                  <div class="col-md-6">
                    <label class="small mb-1" for="inputOldPassword"
                      >Ancien mot de passe</label
                    >
                    <input
                      class="form-control"
                      id="inputOldPassword"
                      v-model="profile.old_password"
                      type="password"
                      placeholder="Entrez votre ancien mot de passe"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="small mb-1" for="inputNewPassword"
                      >Nouveau mot de passe</label
                    >
                    <input
                      class="form-control"
                      id="inputNewPassword"
                      v-model="profile.password"
                      type="password"
                      placeholder="Entrez votre nouveau mot de passe"
                    />
                  </div>
                </div>
                <button class="btn btn-primary" type="submit">
                  Enregistrer les changements
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import authService from "@/services/authService";
import Layout from "./layouts/Layout.vue";
import Swal from "sweetalert2";
const BASE_IMAGE_URL = "https://certif.lomouhamedelbachir.simplonfabriques.com/";
export default {
  components: {
    Layout,
  },
  data() {
    return {
      profile: {
        prenom: "",
        nom: "",
        email: "",
        telephone: "",
        adresse: "",
        old_password: "",
        password: "",
        photo: null, // URL de la photo
      },
      selectedFile: null, // Fichier sélectionné
    };
  },
  computed: {
    fullImageUrl() {
      // return this.profile.photo
      //   ? `https://certif.lomouhamedelbachir.simplonfabriques.com/storage//${this.profile.photo}`
      //   : "@/assets/images/women.svg";
      return this.profile.photo
        ? `http://127.0.0.1:8000/storage//${this.profile.photo}`
        : "@/assets/images/women.svg";
    },
  },
  methods: {
    async fetchProfile() {
      try {
        // Appel API pour récupérer les données de l'utilisateur
        const response = await authService.getUser();
        const userData = response.user;
        if (userData) {
          // Assurez-vous de mettre à jour le modèle profile directement
          this.profile.prenom = userData.prenom;
          this.profile.nom = userData.nom;
          this.profile.email = userData.email;
          this.profile.telephone = userData.telephone;
          this.profile.adresse = userData.adresse;
          this.profile.photo = userData.photo; // Ajoutez si nécessaire
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données utilisateur",
          error
        );
        this.profileImage = "@/assets/images/women.svg"; // Image par défaut en cas d'erreur
      }
    },
    // Gestion du téléchargement de fichier
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    // Soumettre le formulaire pour mettre à jour le profil
    async submitForm() {
      const formData = new FormData();
      formData.append("prenom", this.profile.prenom);
      formData.append("nom", this.profile.nom);
      formData.append("email", this.profile.email);
      formData.append("telephone", this.profile.telephone);
      formData.append("adresse", this.profile.adresse);
      formData.append("old_password", this.profile.old_password);
      formData.append("password", this.profile.password);

      // Ajout de la photo si elle est sélectionnée
      if (this.selectedFile) {
        formData.append("photo", this.selectedFile);
      }

      try {
        await authService.profil(formData);
        Swal.fire({
          title: "Succès!",
          text: "Profil mis à jour avec succès !",
          icon: "success",
          timer: 1000, 
        });
      } catch (error) {
        console.error("Erreur lors de la mise à jour du profil:", error);
      }
    },
  },
  mounted() {
    this.fetchProfile(); 
  },
};
</script>

<style lang="css">
.img-account-profile {
  height: 10rem;
}
.rounded-circle {
  border-radius: 50% !important;
}
.card {
  box-shadow: 0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%);
}
</style>
