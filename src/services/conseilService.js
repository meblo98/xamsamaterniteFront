import apiClient from './api';

export default {
  async getConseils() {
    try {
      const response = await apiClient.get('/conseils');
      return response.data;
    } catch (error) {
      // console.error('Erreur lors de la récupération des conseils :', error);
      // throw error;
    }
  },
  async getConseil(id) {
    try {
      const response = await apiClient.get(`/conseils/${id}`);
      return response.data;
    } catch (error) {
      // console.error(`Erreur lors de la récupération du conseil avec l'id ${id} :`, error);
      // throw error;
    }
  },
  async getConseilsPatiente(id){
    try {
      const response = await apiClient.get(`/conseils/${id}/patiente`);
      return response.data;
    } catch (error) {
      
    }
  },
  async createConseil(formData) {
    try {
      const response = await apiClient.post('/conseils', formData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du conseil :', error);
      throw error;
    }
  },
  async updateConseil(id, data) {
    try {
      const response = await apiClient.put(`/conseils/${id}`, data);
      return response.data;
    } catch (error) {
      // console.error(`Erreur lors de la mise à jour du conseil avec l'id ${id} :`, error);
      // throw error;
    }
  },
  async deleteConseil(id) {
    try {
      const response = await apiClient.delete(`/conseils/${id}`);
      return response.data;
    } catch (error) {
      // console.error(`Erreur lors de la suppression du conseil avec l'id ${id} :`, error);
      // throw error;
    }
  }
};
