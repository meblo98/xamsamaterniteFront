<template>
  <header class="header">
    <div class="search-bar">
      <input type="text" placeholder="Search for something" />
      <i class="fi fi-br-search"></i>
    </div>
    <div class="user-profile">
      <i class="fi fi-rr-settings"></i>
      <i class="fas fa-bell"></i>
      <img src="@/assets/images/profil.jpeg" alt="User Image" />
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
@import url("https://cdn-uicons.flaticon.com/2.6.0/uicons-bold-rounded/css/uicons-bold-rounded.css");
@import url("https://cdn-uicons.flaticon.com/2.6.0/uicons-regular-rounded/css/uicons-regular-rounded.css");
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff;
}

.search-bar {
  display: flex;
  align-items: center;
  margin-right: 20px;
  background-color: #f0f0f0;
}

.search-bar input[type="text"] {
  padding: 10px;
  border: none;
  border-radius: 10px;
  width: 200px;
  background-color: #f0f0f0;
}

.search-bar i {
  margin-left: 10px;
  font-size: 18px;
  cursor: pointer;
}

.user-profile {
  display: flex;
  align-items: center;
}

.user-profile i {
  margin-right: 10px;
  font-size: 18px;
}

.user-profile img {
  width: 40px; /* adjust the width as needed */
  height: 40px; /* adjust the height as needed */
  border-radius: 50%;
}

/* Media queries for responsiveness */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: center;
  }
  .search-bar {
    margin-bottom: 10px;
  }
  .user-profile {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .search-bar input[type="text"] {
    width: 150px; /* adjust the width as needed */
  }
  .user-profile img {
    width: 30px; /* adjust the width as needed */
    height: 30px; /* adjust the height as needed */
  }
}
</style>
