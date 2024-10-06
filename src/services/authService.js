import apiClient from "./api"; // Assurez-vous que le chemin est correct

export default {
  // connexion
  login(credentials) {
    return apiClient.post("/login", credentials);
  },

  //   deconnexion
  logout() {
    return apiClient.post("/logout");
  },

  // profil
  // profil(data) {
  //   return apiClient.post("/profil", data);
  // },
  async profil(data) {
    try {
      const response = await apiClient.post("/profil", data);
      return response.data;
    } catch (error) {
      // console.error(`Erreur lors de la mise à jour du profil :`, error);
      // throw error;
    }
  },
  async getUser(){
    try {
      const response = await apiClient.get("/user-profile");
      return response.data;
    } catch (error) {
      // console.error(`Erreur lors de la recuperation du profil :`, error);
      // throw error;
    }
  }
};
