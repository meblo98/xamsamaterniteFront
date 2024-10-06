import apiClient from './api';

export default {
  async getEnfants() {
    try {
      const response = await apiClient.get('/enfants');
      return response.data;
    } catch (error) {
      // console.error('Erreur lors de la récupération des enfants :', error);
      // throw error;
    }
  },
  async getEnfant(id) {
    try {
      const response = await apiClient.get(`/enfants/${id}`);
      return response.data;
    } catch (error) {
      // console.error(`Erreur lors de la récupération de l'enfant avec l'id ${id} :`, error);
      // throw error;
    }
  },
  async createEnfant(data) {
    try {
      const response = await apiClient.post('/enfants', data);
      return response.data;
    } catch (error) {
      // console.error('Erreur lors de la création de l\'enfant :', error);
      // throw error;
    }
  },
  async updateEnfant(id, data) {
    try {
      const response = await apiClient.put(`/enfants/${id}`, data);
      return response.data;
    } catch (error) {
      // console.error(`Erreur lors de la mise à jour de l'enfant avec l'id ${id} :`, error);
      // throw error;
    }
  },
  async deleteEnfant(id) {
    try {
      const response = await apiClient.delete(`/enfants/${id}`);
      return response.data;
    } catch (error) {
      // console.error(`Erreur lors de la suppression de l'enfant avec l'id ${id} :`, error);
      // throw error;
    }
  }
};
