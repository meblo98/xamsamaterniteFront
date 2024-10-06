import apiClient from './api';

export default {
  async getBadieneGoxes() {
    try {
      const response = await apiClient.get('/badiene-gox');
      return response.data;
    } catch (error) {
      // console.error('Erreur lors de la récupération des badiene-goxes :', error);
      // throw error;
    }
  },
  async getBadieneGox(id) {
    try {
      const response = await apiClient.get(`/badiene-gox/${id}`);
      return response.data;
    } catch (error) {
      // console.error(`Erreur lors de la récupération de la badiene-gox avec l'id ${id} :`, error);
      // throw error;
    }
  },
  async createBadieneGox(data) {
    try {
      const response = await apiClient.post('/badiene-gox', data);
      return response.data;
    } catch (error) {
      // console.error('Erreur lors de la création de la badiene-gox :', error);
      // throw error;
    }
  },
  async updateBadieneGox(id, data) {
    try {
      const response = await apiClient.put(`/badiene-gox/${id}`, data);
      return response.data;
    } catch (error) {
      // console.error(`Erreur lors de la mise à jour de la badiene-gox avec l'id ${id} :`, error);
      // throw error;
    }
  },
  async deleteBadieneGox(id) {
    try {
      const response = await apiClient.delete(`/badiene-gox/${id}`);
      return response.data;
    } catch (error) {
      // console.error(`Erreur lors de la suppression de la badiene-gox avec l'id ${id} :`, error);
      // throw error;
    }
  }
};
