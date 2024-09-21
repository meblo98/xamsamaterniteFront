import apiClient from './api';

export default {
  getConsultations() {
    return apiClient.get('/consultations');
  },
  getConsultation(id) {
    return apiClient.get(`/consultations/${id}`);
  },
  createConsultation(data) {
    return apiClient.post('/consultations', data);
  },
  updateConsultation(id, data) {
    return apiClient.put(`/consultations/${id}`, data);
  },
  deleteConsultation(id) {
    return apiClient.delete(`/consultations/${id}`);
  }
};
