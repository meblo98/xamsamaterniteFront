import apiClient from './api';

export default {
  getVisites() {
    return apiClient.get('/visites');
  },
  getVisite(id) {
    return apiClient.get(`/visites/${id}`);
  },
  createVisite(data) {
    return apiClient.post('/visites', data);
  },
  updateVisite(id, data) {
    return apiClient.put(`/visites/${id}`, data);
  },
  deleteVisite(id) {
    return apiClient.delete(`/visites/${id}`);
  }
};
