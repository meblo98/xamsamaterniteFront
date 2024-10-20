import apiClient from './api';

export default {
  async getAccouchements() {
    try {
      const response = await apiClient.get('/accouchements');
      return response.data;
    } catch (error) {
      // console.error('Erreur lors de la récupération des accouchements :', error);
      // throw error;
    }
  },
  async getAccouchement(id) {
    try {
      const response = await apiClient.get(`/accouchements/${id}`);
      return response.data;
    } catch (error) {
      return [];

      // console.error(`Erreur lors de la récupération de l'accouchement avec l'id ${id} :`, error);
      // throw error;
    }
  },
  async createAccouchement(data) {
    try {
      const response = await apiClient.post('/accouchements', data);
      return response;
      
    } catch (error) {
      console.error('Erreur lors de la création de l\'accouchement :', error);
      throw error;
    }
  },
  async updateAccouchement(id, data) {
    try {
      const response = await apiClient.put(`/accouchements/${id}`, data);
      return response;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'accouchement avec l'id ${id} :`, error);
      throw error;
    }
  },
  async deleteAccouchement(id) {
    try {
      const response = await apiClient.delete(`/accouchements/${id}`);
      return response.data;
    } catch (error) {
      // console.error(`Erreur lors de la suppression de l'accouchement avec l'id ${id} :`, error);
      // throw error;
    }
  },
  async getAccouchementsByPatiente(idPatiente) {
    try {
      const response = await apiClient.get(`/accouchements/patiente/${idPatiente}`);
      return response.data;
    } catch (error) {
      // console.error(`Erreur lors de la récupération des accouchements pour la patiente avec l'id ${idPatiente} :`, error);
      // throw error;
    }
  }
};
