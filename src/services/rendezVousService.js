import apiClient from './api';

export default {
  getRendezVous() {
    return apiClient.get('/rv');
  },
  getRendezVousById(id) {
    return apiClient.get(`/rv/${id}`);
  },
  createRendezVous(data) {
    return apiClient.post('/rv', data);
  },
  updateRendezVous(id, data) {
    return apiClient.put(`/rv/${id}`, data);
  },
  deleteRendezVous(id) {
    return apiClient.delete(`/rv/${id}`);
  }
};
