import apiClient from './api';

export default {
  async getRendezVous() {
    try {
      const response = await apiClient.get('/rv');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous :', error);
      throw error;
    }
  },
  async getRendezVousById(id) {
    try {
      const response = await apiClient.get(`/rv/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du rendez-vous avec l'id ${id} :`, error);
      throw error;
    }
  },
  async createRendezVous(data) {
    try {
      const response = await apiClient.post('/rv', data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du rendez-vous :', error);
      throw error;
    }
  },
  async updateRendezVous(id, data) {
    try {
      const response = await apiClient.put(`/rv/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du rendez-vous avec l'id ${id} :`, error);
      throw error;
    }
  },
  async deleteRendezVous(id) {
    try {
      const response = await apiClient.delete(`/rv/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression du rendez-vous avec l'id ${id} :`, error);
      throw error;
    }
  }
};
