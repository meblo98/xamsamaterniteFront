<template>
    <div class="pagination">
      <button
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
        class="pagination-btn"
      >
        Précédent
      </button>
  
      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="{ active: currentPage === page }"
        class="pagination-btn"
      >
        {{ page }}
      </button>
  
      <button
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
        class="pagination-btn"
      >
        Suivant
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: "Pagination",
    props: {
      currentPage: {
        type: Number,
        default: 1,
      },
      totalItems: {
        type: Number,
        required: true,
      },
      itemsPerPage: {
        type: Number,
        default: 10,
      },
    },
    computed: {
      totalPages() {
        return Math.ceil(this.totalItems / this.itemsPerPage);
      },
    },
    methods: {
      goToPage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.$emit("page-changed", page); // Emettre l'événement pour notifier le parent
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 20px;
  }
  .pagination-btn {
    padding: 8px 12px;
    border: none;
    background-color: #f0f0f0;
    cursor: pointer;
    border-radius: 4px;
  }
  .pagination-btn.active {
    background-color: #007bff;
    color: white;
  }
  .pagination-btn:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
  </style>
  