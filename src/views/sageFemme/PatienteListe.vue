<template>
  <Layout>
    <Table
      :columns="columns"
      :data="paginatedData"
      title="Liste des Patientes"
      @action="handleTableAction"
    />
    
    <Pagination
      :currentPage="currentPage"
      :totalItems="totalItems"
      :itemsPerPage="itemsPerPage"
      @page-changed="handlePageChange"
    />
  </Layout>
</template>

<script>
import Layout from "@/components/layouts/Layout.vue";
import Pagination from "@/components/pagination.vue";
import Table from "@/components/tableau.vue";
import patienteService from "@/services/patienteService";

export default {
  components: {
    Layout,
    Pagination,
    Table,
  },
  data() {
    return {
      columns: [
        { label: 'Nom', field: 'nom' },
        { label: 'Prénom', field: 'prenom' },
        { label: 'Âge', field: 'age' },
        { label: 'Lieu de Naissance', field: 'lieu_de_naissance' },
        { label: 'Profession', field: 'profession' },
        { label: 'Type', field: 'type' },
        { label: 'Date de Naissance', field: 'date_de_naissance' },
        { label: 'Actions', field: 'action', type: 'action' }
      ],
      allData: [],
      paginatedData: [],
      currentPage: 1,
      totalItems: 0,
      itemsPerPage: 10,
    };
  },
  mounted() {
    this.getPatients();
  },
  methods: {
    async getPatients() {
      try {
        const response = await patienteService.getPatientes();
        if (response && response.Liste_des_patientes && Array.isArray(response.Liste_des_patientes)) {
          this.allData = response.Liste_des_patientes.map(patiente => ({
            nom: patiente.user.nom,
            prenom: patiente.user.prenom,
            age: this.calculateAge(patiente.date_de_naissance),
            lieu_de_naissance: patiente.lieu_de_naissance,
            profession: patiente.profession,
            type: patiente.type,
            date_de_naissance: patiente.date_de_naissance,
            id: patiente.id,
          }));
          this.totalItems = this.allData.length;
          this.getPatientsPaginated();
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des patientes :", error);
      }
    },
    handleTableAction({ action, row }) {
      switch (action) {
        case 'view':
        this.$router.push({ name: 'detailPatiente-sage-femme', params: { id: row.id } });
          break;
        case 'edit':
          // Gérer l'action de modification
          console.log("Modifier:", row);
          break;
        case 'delete':
          // Gérer l'action de suppression
          console.log("Supprimer:", row);
          break;
        default:
          break;
      }
    },
    calculateAge(dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.getPatientsPaginated();
    },
    getPatientsPaginated() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedData = this.allData.slice(startIndex, endIndex);
    }
  }
};
</script>
