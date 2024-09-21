import apiClient from './api';

export default {
  getEnfants() {
    return apiClient.get('/enfants');
  },
  getEnfant(id) {
    return apiClient.get(`/enfants/${id}`);
  },
  createEnfant(data) {
    return apiClient.post('/enfants', data);
  },
  updateEnfant(id, data) {
    return apiClient.put(`/enfants/${id}`, data);
  },
  deleteEnfant(id) {
    return apiClient.delete(`/enfants/${id}`);
  }
};
