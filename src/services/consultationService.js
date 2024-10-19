import apiClient from './api';

export default {
  async getConsultations() {
    try {
      const response = await apiClient.get('/consultations');
      return response.data;
    } catch (error) {
      // console.error('Erreur lors de la récupération des consultations :', error);
      // throw error;
    }
  },
  async getConsultation(id) {
    try {
      const response = await apiClient.get(`/consultations/${id}`);
      return response.data;
    } catch (error) {
      // console.error(`Erreur lors de la récupération de la consultation avec l'id ${id} :`, error);
      // throw error;
    }
  },
  async createConsultation(data) {
    try {
      const response = await apiClient.post('/consultations', data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la consultation :', error);
      throw error;
    }
  },
  async updateConsultation(id, data) {
    try {
      const response = await apiClient.put(`/consultations/${id}`, data);
      return response.data;
    } catch (error) {
      // console.error(`Erreur lors de la mise à jour de la consultation avec l'id ${id} :`, error);
      // throw error;
    }
  },
  async deleteConsultation(id) {
    try {
      const response = await apiClient.delete(`/consultations/${id}`);
      return response.data;
    } catch (error) {
      // console.error(`Erreur lors de la suppression de la consultation avec l'id ${id} :`, error);
      // throw error;
    }
  },
  async getConsultationsByPatiente(patienteId) {
    try {
      const response = await apiClient.get(`/consultations/patient/${patienteId}`);
      return response.data; // Assure-toi que la réponse contient les données nécessaires
    } catch (error) {
      // console.error("Erreur lors de la récupération des consultations :", error);
      // throw error; // Relance l'erreur pour gestion ultérieure
    }
  },
  
  async getRendezVousByPatiente(patienteId) {
    try {
      const response = await apiClient.get(`/patients/${patienteId}/rendezvous`);
      return response.data; // Assure-toi que la réponse contient les données nécessaires
    } catch (error) {
      // console.error("Erreur lors de la récupération des rendez-vous :", error);
      // throw error; // Relance l'erreur pour gestion ultérieure
    }
  },
};

