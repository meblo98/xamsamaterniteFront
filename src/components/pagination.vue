<template>
  <div class="pagination">
    <button
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
      class="pagination-btn"
      style="background-color: #6932f9; color: white"
    >
      <svg
        height="16"
        width="16"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 1024 1024"
      >
        <path
          d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"
          fill="#fff"
        ></path>
      </svg>
      <span class="mx-3">Précédent</span>
    </button>

    <button
      v-for="page in totalPages"
      :key="page"
      @click="goToPage(page)"
      :class="{ active: currentPage === page }"
      class="pagination-btn"
      style="background-color: #6932f9; color: white"
    >
      {{ page }}
    </button>

    <button
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
      class="pagination-btn"
      style="background-color: #6932f9; color: white"
    >
      <span class="mx-3">Suivant</span>

      <svg
        height="16"
        width="16"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 1024 1024"
      >
        <path
          d="M149.328125 495.52477c0 11.2973 9.168824 20.466124 20.466124 20.466124l604.773963 0-188.083679 188.083679c-7.992021 7.992021-7.992021 20.947078 0 28.939099 4.001127 3.990894 9.240455 5.996574 14.46955 5.996574 5.239328 0 10.478655-1.995447 14.479783-5.996574l223.00912-223.00912c3.837398-3.837398 5.996574-9.046027 5.996574-14.46955 0-5.433756-2.159176-10.632151-5.996574-14.46955l-223.019353-223.029586c-7.992021-7.992021-20.957311-7.992021-28.949332 0-7.992021 8.002254-7.992021 20.957311 0 28.949332l188.073446 188.073446-604.753497 0C139.859375 475.058646 149.328125 484.217237 149.328125 495.52477z"
          fill="#fff"
        ></path>
      </svg>
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
  justify-content: end;
  gap: 8px;
  margin-top: 20px;
}
.pagination-btn {
  border: none;
  border-radius: 25px;
  padding: 6px 15px;
  background-color: #f0f0f0;
  cursor: pointer;
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
