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
          title="Patientes"
          :formFields="formFields"
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
import badieneGoxService from "@/services/badieneGoxService";
  import patienteService from "@/services/patienteService";
  
  const ACTION_VIEW = "view";
const ACTION_EDIT = "edit";
const ACTION_DELETE = "delete";
  
  export default {
    components: {
      Layout,
      Pagination,
      Table,
    },
    data() {
    return {
      newPatiente: {
        nom: "",
        prenom: "",
        adresse: "",
        telephone: "",
        email: "",
        date_de_naissance: "",
        lieu_de_naissance: "",
        profession: "",
        badien_gox_id: "",
      },
      badiene: [],
      columns: [
        { label: "Nom", field: "nom" },
        { label: "Prénom", field: "prenom" },
        { label: "Téléphone", field: "telephone" },
        { label: "Âge", field: "age" },
        { label: "Lieu de Naissance", field: "lieu_de_naissance" },
        { label: "Profession", field: "profession" },
        { label: "Adresse", field: "adresse" },
        { label: "Actions", field: "action", type: "action" },
      ],
      formFields: [
        {
          name: "prenom",
          label: "Prénom",
          type: "text",
          placeholder: "Entrez le prénom",
          required: true,
        },
        {
          name: "nom",
          label: "Nom",
          type: "text",
          placeholder: "Entrez le nom",
          required: true,
        },
        {
          name: "lieu_de_naissance",
          label: "Lieu de Naissance",
          type: "text",
          placeholder: "Entrez le lieu de naissance",
          required: true,
        },
        {
          name: "date_de_naissance",
          label: "Date de Naissance",
          type: "date",
          placeholder: "Entrez la date de naissance",
          required: true,
        },
        {
          name: "profession",
          label: "Profession",
          type: "text",
          placeholder: "Entrez la profession",
          required: true,
        },

        {
          name: "adresse",
          label: "Adresse",
          type: "text",
          placeholder: "Entrez l'adresse de la patiente",
          required: true,
        },
        {
          name: "badien_gox_id",
          label: "Badiene Gox",
          type: "select",
          options: [],
          required: true,
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Entrez l'email de la patiente",
        },
        {
          name: "telephone",
          label: "Téléphone",
          type: "text",
          placeholder: "Entrez le numéro de téléphone de la patiente",
          required: true,
        },
      ],
      formData: {},
      allData: [],
      paginatedData: [],
      currentPage: 1,
      totalItems: 0,
      itemsPerPage: 10,
    };
  },
    mounted() {
      this.getPatients();
      this.getBadiene();

    },
    props: {
    id: {
      type: Number,
      required: true,
    },
  },
    
    methods: {
      async getPatients() {
        
        try {
          const response = await patienteService.getPatientesParBadieneGox(this.id);
          
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
              badien_gox_id: patiente.badien_gox_id,
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
            name: "detailPatiente-sage-femme",
            params: { id: row.id },
          });
          break;
        case ACTION_EDIT:
          this.editPatiente(row);
          break;
        case ACTION_DELETE:
          this.deletePatiente(row.id);
          break;
        default:
          break;
      }
    },
    isDateOfBirthValid(dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      // Vérifie si l'âge est d'au moins 10 ans
      return (
        age > 10 ||
        (age === 10 &&
          (monthDiff > 0 ||
            (monthDiff === 0 && today.getDate() >= birthDate.getDate())))
      );
    },
    async addPatiente(patienteData) {
      if (!this.isDateOfBirthValid(patienteData.date_de_naissance)) {
        Swal.fire({
          title: "Erreur",
          text: "La patiente doit avoir au moins 10 ans.",
          icon: "error",
          timer: 2000,
        });
        return; // Ne pas ajouter la patiente si la validation échoue
      }

      try {
        await patienteService.createPatiente(patienteData);
        this.getPatients(); // Recharger la liste après l'ajout
        Swal.fire({
          title: "Patiente ajoutée avec succès !",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      } catch (error) {
        Swal.fire({
          title: "Erreur lors de l'ajout de la patiente !",
          text: error.response.data.message,
          icon: "error",
          timer: 2000,
        });
      }
    },
    async editPatiente(patiente) {
      if (!this.isDateOfBirthValid(patiente.date_de_naissance)) {
        Swal.fire({
          title: "Erreur",
          text: "La patiente doit avoir au moins 10 ans.",
          icon: "error",
          timer: 2000,
        });
        return; // Ne pas ajouter la patiente si la validation échoue
      }
      try {
        const updatedPatiente = await patienteService.updatePatiente(
          patiente.id,
          patiente
        );
        Swal.fire({
          title: "Patient mis à jour avec succès !",
          icon: "success",
          timer: 1000,
        });
        window.location.reload();
      } catch (error) {
        console.error("Erreur lors de la modification de la patiente :", error);
        Swal.fire({
          // Add sweet alert for error
          title: "Erreur lors de la mise à jour du patient !",
          icon: "error",
          timer: 1000,
        });
      }
    },

    async getBadiene() {
      try {
        const response = await badieneGoxService.getBadieneGoxes();
        this.badiene = response.Liste_BadieneGox;
        this.updateFormFields();
      } catch (error) {
        console.error("Erreur lors de la récupération des badiene :", error);
      }
    },
    updateFormFields() {
      const badieneOptions = this.badiene.map((badiene) => ({
        value: badiene.id,
        text: `${badiene.user.prenom} ${badiene.user.nom}`,
      }));

      this.formFields.find((field) => field.name === "badien_gox_id").options =
        badieneOptions;
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
  <style>
  button {
    background-color: #6932f9;
    color: white;
    border: none;
    padding: 5px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  </style>
  