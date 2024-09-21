// /src/services/sageFemmesService.js
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
  }
};
