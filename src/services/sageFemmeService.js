import apiClient from './api'; // Assurez-vous que le chemin est correct

export default {

    async getSageFemmes() {
        try {
          const response = await apiClient.get('/sages-femmes');
          return response.data; // Assurez-vous que les données sont bien renvoyées ici
        } catch (error) {
          console.error('Erreur lors de la récupération des sages-femmes:', error);
          throw error;
        }
      },

  async addSageFemme(sageFemme) {
    try {
      const response = await apiClient.post('/sages-femmes', sageFemme);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async getSageFemme(id) {
    try {
      const response = await apiClient.get(`/sages-femmes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la sage-femme avec l'id ${id} :`, error);
      throw error;
    }
  },

  async updateSageFemme(id, data) {
    try {
      const response = await apiClient.put(`/sages-femmes/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la sage-femme avec l'id ${id} :`, error);
      throw error;
    }
  },
  async deleteSageFemme(id) {
    try {
      const response = await apiClient.delete(`/sages-femmes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la sage-femme avec l'id ${id} :`, error);
      throw error;
    }
  }
};
