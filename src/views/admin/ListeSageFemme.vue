<template>
  <Navbar />
  <div class="sage-femme-list">
    <div class="header">
      <h1>Liste des Sage-femmes</h1>
      <div class="actions">
        
        <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ajoutSageFemme">
  Ajouter une sage-femme
</button>
<!-- Modal -->
<div class="modal fade" id="ajoutSageFemme" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="form-group">
        <label for="prenom">Prénom</label>
        <input
          v-model="newSageFemme.prenom"
          type="text"
          class="form-control"
          id="prenom"
          placeholder="Entrez le prénom"
        />
      </div>
      <div class="form-group">
        <label for="nom">Nom</label>
        <input
          v-model="newSageFemme.nom"
          type="text"
          class="form-control"
          id="nom"
          placeholder="Entrez le nom"
        />
      </div>
      <div class="form-group">
        <label for="adresse">Adresse</label>
        <input
          v-model="newSageFemme.adresse"
          type="text"
          class="form-control"
          id="adresse"
          placeholder="Entrez l'adresse"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          v-model="newSageFemme.email"
          type="email"
          class="form-control"
          id="email"
          placeholder="Entrez l'email"
        />
      </div>
      <div class="form-group">
        <label for="telephone">Téléphone</label>
        <input
          v-model="newSageFemme.telephone"
          type="text"
          class="form-control"
          id="telephone"
          placeholder="Entrez le téléphone"
        />
      </div>
      <div class="form-group">
        <label for="matricule">Matricule</label>
        <input
          v-model="newSageFemme.matricule"
          type="text"
          class="form-control"
          id="matricule"
          placeholder="Entrez le matricule"
        />
      </div>
      <div class="form-group">
        <label for="structure_sante_id">Structure de santé</label>
        <input
          v-model="newSageFemme.structure_sante_id"
          type="number"
          class="form-control"
          id="structure_sante_id"
          placeholder="Entrez l'ID de la structure de santé"
        />
      </div>
     
      </div>
      <div class="modal-footer">
        <button class="btn" variant="primary" @click="addSageFemme">
        Ajouter
      </button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>
      </div>
    </div>

    <!-- Tableau pour afficher les sages-femmes -->
    <table class="table m-3">
      <thead>
        <tr>
          <th>Nom complet</th>
          <th>Adresse</th>
          <th>Email</th>
          <th>Téléphone</th>
          <th>Matricule</th>
          <th>Structure de santé</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sageFemme in sageFemmes" :key="sageFemme.id">
          <td>{{ sageFemme.user.prenom }} {{ sageFemme.user.nom }}</td>
          <td>{{ sageFemme.user.adresse }}</td>
          <td>{{ sageFemme.user.email }}</td>
          <td>{{ sageFemme.user.telephone }}</td>
          <td>{{ sageFemme.matricule }}</td>
          <td>{{ sageFemme.structure_sante.nom }}</td>
          <td>
            <button class="btn-action" @click="viewSageFemme(sageFemme.id)"><i class="fa fa-eye"></i></button>
            <button class="btn-action" @click="editSageFemme(sageFemme.id)"><i class="fa fa-edit"></i></button>
            <button class="btn-action" @click="deleteSageFemme(sageFemme.id)">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>


<script>
import Navbar from "@/components/Navbar.vue";
import sageFemmeService from "@/services/sageFemmeService"; // Assurez-vous d'importer votre service

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      newSageFemme: {
        prenom: '',
        nom: '',
        adresse: '',
        email: '',
        telephone: '',
        matricule: '',
        structure_sante_id: null,
      },
      sageFemmes: [],
    };
  },
  mounted() {
    this.getSageFemmes();
  },
  methods: {
    async getSageFemmes() {
    try {
      const response = await sageFemmeService.getSageFemmes();
      this.sageFemmes = response.sages_femmes; // Assurez-vous de récupérer le tableau à partir de la réponse
    } catch (error) {
      console.error('Erreur lors de la récupération des sages-femmes:', error);
    }
  },
    async addSageFemme() {
      try {
        await sageFemmeService.addSageFemme(this.newSageFemme);
        this.getSageFemmes(); // Mettre à jour la liste après ajout
        this.resetForm(); // Réinitialiser le formulaire
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la sage-femme:', error);
      }
    },

    resetForm() {
      this.newSageFemme = {
        prenom: '',
        nom: '',
        adresse: '',
        email: '',
        telephone: '',
        matricule: '',
        structure_sante_id: null,
      };
    },
    viewSageFemme(id) {
      // Logique pour afficher les détails de la sage-femme
    },
    editSageFemme(id) {
      // Logique pour éditer la sage-femme
    },
    deleteSageFemme(id) {
      // Logique pour supprimer la sage-femme
    },
  },
};
</script>

<style scoped>
.sage-femme-list {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.table {
  width: 100%;
}

.btn-action {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.fa, .fa-solid {
  font-size: 16px;
  color: #7e33e0;
}

.btn{
  background-color: #7e33e0;
  color: #fff;
}
</style>
