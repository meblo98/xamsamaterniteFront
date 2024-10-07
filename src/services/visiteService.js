import apiClient from './api';

export default {
  async getVisites() {
    try {
      const response = await apiClient.get('/visites');
      return response.data;
    } catch (error) {
      // console.error('Erreur lors de la récupération des visites :', error);
      // throw error;
    }
  },
  async getVisite(id) {
    try {
      const response = await apiClient.get(`/visites/${id}`);
      return response.data;
    } catch (error) {
      // console.error(`Erreur lors de la récupération de la visite avec l'id ${id} :`, error);
      // throw error;
    }
  },
  async createVisite(data) {
    try {
      const response = await apiClient.post('/visites', data);
      return response.data;
    } catch (error) {
      // console.error('Erreur lors de la création de la visite :', error);
      // throw error;
    }
  },
  async updateVisite(id, data) {
    try {
      const response = await apiClient.put(`/visites/${id}`, data);
      return response.data;
    } catch (error) {
      // console.error(`Erreur lors de la mise à jour de la visite avec l'id ${id} :`, error);
      // throw error;
    }
  },
  async deleteVisite(id) {
    try {
      const response = await apiClient.delete(`/visites/${id}`);
      return response.data;
    } catch (error) {
      // console.error(`Erreur lors de la suppression de la visite avec l'id ${id} :`, error);
      // throw error;
    }
  }
};
