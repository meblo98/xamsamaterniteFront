<template>
  <Layout>
    <Table
      :columns="columns"
      :data="paginatedData"
      title="Liste des Patientes"
      :formFields="formFields"
      @action="handleTableAction"
      @add-data="addPatiente"
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
import Swal from "sweetalert2";

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
        { label: "Telephone", field: "telephone" },
        { label: "Âge", field: "age" },
        { label: "Lieu de Naissance", field: "lieu_de_naissance" },
        { label: "Profession", field: "profession" },
        { label: "Type", field: "type" },
        { label: "Actions", field: "action", type: "action" },
      ],
      formFields: [
        // Champs du formulaire pour ajouter/modifier une patiente
        {
          name: "prenom",
          label: "Prénom",
          type: "text",
          placeholder: "Entrez le prénom",
        },
        {
          name: "nom",
          label: "Nom",
          type: "text",
          placeholder: "Entrez le nom",
        },
        {
          name: "lieu_de_naissance",
          label: "Lieu de Naissance",
          type: "text",
          placeholder: "Entrez le lieu de naissance",
        },
        {
          name: "date_de_naissance",
          label: "Date de Naissance",
          type: "date",
          placeholder: "Entrez la date de naissance",
        },
        {
          name: "profession",
          label: "Profession",
          type: "text",
          placeholder: "Entrez la profession",
        },
        {
          name: "type",
          label: "Type",
          type: "text",
          placeholder: "Entrez le type de patiente",
        },
        {
          name: "adresse",
          label: "Adresse",
          type: "text",
          placeholder: "Entrez l'adresse de la patiente",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Entrez l'email de la patiente",
        },
        {
          name: "telephone",
          label: "Telephone",
          type: "number",
          placeholder: "Entrez le numero telephone de la patiente",
        },
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
        case "view":
          this.$router.push({
            name: "detailPatiente-sage-femme",
            params: { id: row.id },
          });
          break;
        case "edit":
          this.editPatiente(row);
          break;
        case "delete":
          this.deletePatiente(row.id);
          break;
        default:
          break;
      }
    },
    async addPatiente(newPatiente) {
      try {
        await patienteService.createPatiente(newPatiente);
        this.getPatients(); // Recharger la liste après l'ajout
        Swal.fire({
          // Add sweet alert for add operation
          title: "Patient ajouté avec succès !",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Erreur lors de l'ajout de la patiente :", error);
        Swal.fire({
          // Add sweet alert for error
          title: "Erreur lors de l'ajout du patient !",
          icon: "error",
          timer: 1000,
        });
      }
    },

    async editPatiente(patiente) {
      try {
        const updatedPatiente = await patienteService.updatePatiente(
          patiente.id,
          patiente
        );
        this.getPatients(); // Recharger la liste après la modification
        Swal.fire({
          // Add sweet alert for edit operation
          title: "Patient mis à jour avec succès !",
          icon: "success",
          timer: 1000
        });
      } catch (error) {
        console.error("Erreur lors de la modification de la patiente :", error);
        Swal.fire({
          // Add sweet alert for error
          title: "Erreur lors de la mise à jour du patient !",
          icon: "error",
          timer: 1000
        });
      }
    },

    async deletePatiente(id) {
      Swal.fire({
        title: "Êtes-vous sûr de vouloir supprimer cette patiente ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, supprimer",
        cancelButtonText: "Annuler",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await patienteService.deletePatiente(id);
            this.getPatients(); // Recharger la liste après la suppression
            Swal.fire({
              // Add sweet alert for delete operation
              title: "Patient supprimé avec succès !",
              icon: "success",
              timer: 1000
            });
          } catch (error) {
            console.error(
              "Erreur lors de la suppression de la patiente :",
              error
            );
            Swal.fire({
              // Add sweet alert for error
              title: "Erreur lors de la suppression du patient !",
              icon: "error",
              timer: 1000
            });
          }
        }
      });
    },
    calculateAge(dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const today = new Date();
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
    handlePageChange(page) {
      this.currentPage = page;
      this.getPatientsPaginated();
    },
    getPatientsPaginated() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedData = this.allData.slice(startIndex, endIndex);
    },
  },
};
</script>
