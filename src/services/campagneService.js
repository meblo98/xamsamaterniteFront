import apiClient from './api';

export default {
  async getCampagnes() {
    try {
      const response = await apiClient.get('/campagnes');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des campagnes :', error);
      throw error;
    }
  },
  async getCampagne(id) {
    try {
      const response = await apiClient.get(`/campagnes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la campagne avec l'id ${id} :`, error);
      throw error;
    }
  },
  async createCampagne(formData) {
    try {
      const response = await apiClient.post('/campagnes', formData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la campagne :', error);
      throw error;
    }
  },
  async updateCampagne(id, data) {
    try {
      const response = await apiClient.put(`/campagnes/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la campagne avec l'id ${id} :`, error);
      throw error;
    }
  },
  async deleteCampagne(id) {
    try {
      const response = await apiClient.delete(`/campagnes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la campagne avec l'id ${id} :`, error);
      throw error;
    }
  }
};
