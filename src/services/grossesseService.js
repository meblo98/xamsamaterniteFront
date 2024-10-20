import apiClient from "./api";

export default {
  addGrossesse(grossesseData) {
    try {
      const response = apiClient.post("/grossesses", grossesseData);
      return response;

    } catch (error) {
      console.error('Erreur lors de la création de la patiente :', error);
      throw error;
    }
  },

  // Récupérer une grossesse par ID
  getGrossesse(id) {
    try {
      const response = apiClient.get(`/grossesses/${id}`);
      return response;
    } catch (error) {
      // console.error('Erreur lors de la récupération de la grossesse :', error);
      // throw error;
    }
  },

  // Mettre à jour une grossesse
  updateGrossesse(id, grossesseData) {
    try {
      const response = apiClient.put(`/grossesses/${id}`, grossesseData);
      return response.data;
    } catch (error) {
      // console.error('Erreur lors de la mise à jour de la grossesse :', error);
      // throw error;
    }
  },

  // Supprimer une grossesse
  deleteGrossesse(id) {
    try {
      const response = apiClient.delete(`/grossesses/${id}`);
      return response.data;
    } catch (error) {
      // console.error('Erreur lors de la suppression de la grossesse :', error);
      // throw error;
    }
  },
};