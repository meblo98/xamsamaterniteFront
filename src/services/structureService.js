import apiClient from './api';

const structuresSanteService = {

  async getStructuresSante() {
    try {
      const response = await apiClient.get('/structure');
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des structures de santé:", error);
      return [];
    }
  },

  async addStructuresSante(data) {
    try {
      const response = await apiClient.post('/structure', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async getStructure(id) {
    try {
      const response = await apiClient.get(`/structure/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la structure avec l'id ${id} :`, error);
      throw error;
    }
  },

  async updateStructuresSante(id, data) {
    try {
      const response = await apiClient.put(`/structure/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la structure avec l'id ${id} :`, error);
      throw error;
    }
  },
  async deleteStructuresSante(id) {
    try {
      const response = await apiClient.delete(`/structure/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la structure avec l'id ${id} :`, error);
      throw error;
    }
  }
};

export default structuresSanteService;