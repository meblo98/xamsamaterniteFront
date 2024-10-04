<template>
    <Layout>
      <!-- Si aucune donnée n'est trouvée -->
      <div v-if="allData.length === 0">
        <p>Aucune Patiente trouvée.</p>
      </div>
  
      <!-- Si des données sont trouvées -->
      <div class="tableau" v-else>
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
      </div>
    </Layout>
  </template>
  
  <script>
  import Layout from "@/components/layouts/Layout.vue";
  import Pagination from "@/components/pagination.vue";
  import Table from "@/components/tableau.vue";
  import patienteService from "@/services/patienteService";
  
  const ACTION_VIEW = "view";

  
  export default {
    components: {
      Layout,
      Pagination,
      Table,
    },
    data() {
      return {
        columns: [
          { label: "Nom", field: "nom" },
          { label: "Prénom", field: "prenom" },
          { label: "Téléphone", field: "telephone" },
          { label: "Âge", field: "age" },
          { label: "Lieu de Naissance", field: "lieu_de_naissance" },
          { label: "Profession", field: "profession" },
          { label: "Type", field: "type" },
          { label: "Actions", field: "action", type: "action" },
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
          if (
            response &&
            response.Liste_des_patientes &&
            Array.isArray(response.Liste_des_patientes)
          ) {
            this.allData = response.Liste_des_patientes.map((patiente) => ({
              id: patiente.id,
              nom: patiente.user.nom,
              prenom: patiente.user.prenom,
              telephone: patiente.user.telephone,
              adresse: patiente.user.adresse,
              email: patiente.user.email,
              age: this.calculateAge(patiente.date_de_naissance),
              lieu_de_naissance: patiente.lieu_de_naissance,
              profession: patiente.profession,
              type: patiente.type,
              date_de_naissance: patiente.date_de_naissance,
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
          case ACTION_VIEW:
            this.$router.push({
              name: "detailPatiente-badiene",
              params: { id: row.id },
            });
            break;
          case ACTION_EDIT:
            break;
          case ACTION_DELETE:
            break;
          default:
            break;
        }
      },

      getPatientsPaginated() {
        if (this.allData.length > 0) {
          const startIndex = (this.currentPage - 1) * this.itemsPerPage;
          const endIndex = startIndex + this.itemsPerPage;
          this.paginatedData = this.allData.slice(startIndex, endIndex);
        }
      },
      handlePageChange(page) {
        this.currentPage = page;
        this.getPatientsPaginated();
      },
      calculateAge(dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        return age;
      },
    },
  };
  </script>
  