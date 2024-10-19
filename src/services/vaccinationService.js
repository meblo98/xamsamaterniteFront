import apiClient from './api';

export default {
  async getVaccinations() {
    try {
      const response = await apiClient.get('/vaccinations');
      return response.data;
    } catch (error) {
      // console.error('Erreur lors de la récupération des vaccinations :', error);
      // throw error;
    }
  },
  async getVaccination(id) {
    try {
      const response = await apiClient.get(`/vaccinations/${id}`);
      return response.data;
    } catch (error) {
      // console.error(`Erreur lors de la récupération de la vaccination avec l'id ${id} :`, error);
      // throw error;
    }
  },
  async createVaccination(data) {
    try {
      const response = await apiClient.post('/vaccinations', data);
      return response.data;
    } catch (error) {
      // console.error('Erreur lors de la création de la vaccination :', error);
      // throw error;
    }
  },
  async updateVaccination(id, data) {
    try {
      const response = await apiClient.put(`/vaccinations/${id}`, data);
      return response.data;
    } catch (error) {
      // console.error(`Erreur lors de la mise à jour de la vaccination avec l'id ${id} :`, error);
      // throw error;
    }
  },
  async deleteVaccination(id) {
    try {
      const response = await apiClient.delete(`/vaccinations/${id}`);
      return response.data;
    } catch (error) {
      // console.error(`Erreur lors de la suppression de la vaccination avec l'id ${id} :`, error);
      // throw error;
    }
  },

  async getVaccinationByEnfant(id) {
    try {
      const response = await apiClient.get(`/vaccinations/enfant/${id}`);
      return response.data;
    } catch (error) {
      // console.error(`Erreur lors de la récupération de la vaccination avec l'id ${id} :`, error);
      // throw error;
    }
  }

};
