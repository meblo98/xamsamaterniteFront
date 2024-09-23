import apiClient from './api';

export default {
  async getPatientes() {
    try {
      const response = await apiClient.get('/patientes');
      return response.data; // Retourner les données de la réponse
    } catch (error) {
      console.error('Erreur lors de la récupération des patientes :', error);
      throw error;
    }
  },
  async getPatiente(id) {
    try {
      const response = await apiClient.get(`/patientes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la patiente avec l'id ${id} :`, error);
      throw error;
    }
  },
  async createPatiente(data) {
    try {
      const response = await apiClient.post('/patientes', data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la patiente :', error);
      throw error;
    }
  },
  async updatePatiente(id, data) {
    try {
      const response = await apiClient.put(`/patientes/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la patiente avec l'id ${id} :`, error);
      throw error;
    }
  },
  async deletePatiente(id) {
    try {
      const response = await apiClient.delete(`/patientes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la patiente avec l'id ${id} :`, error);
      throw error;
    }
  }
};
