<template>
    <div class="campaign-card">
      <img src="/src/assets/images/profil.jpeg" alt="Campagne" class="campaign-image" />
      <div class="campaign-details">
        <h3>Dotation de moustiquaire</h3>
        <button class="btn-view">Voir le contenu</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // props: {
    //   title: {
    //     type: String,
    //     default: "Dotation de moustiquaire",
    //   },
    //   campaignImage: {
    //     type: String,
    //     default: require("/src/assets/images/profil"), // Remplace par l'image que tu souhaites
    //   },
    // },
  };
  </script>
  
  <style scoped>
  .campaign-card {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease;
  }
  
  .campaign-card:hover {
    transform: translateY(-5px);
  }
  
  .campaign-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .campaign-details {
    padding: 16px;
    text-align: center;
  }
  
  .campaign-details h3 {
    margin-bottom: 12px;
    font-size: 18px;
    color: #333;
  }
  
  .btn-view {
    background-color: #5a3ee8;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-view:hover {
    background-color: #4a32c4;
  }
  </style>
  