import apiClient from './api';

export default {
  getAccouchements() {
    return apiClient.get('/accouchements');
  },
  getAccouchement(id) {
    return apiClient.get(`/accouchements/${id}`);
  },
  createAccouchement(data) {
    return apiClient.post('/accouchements', data);
  },
  updateAccouchement(id, data) {
    return apiClient.put(`/accouchements/${id}`, data);
  },
  deleteAccouchement(id) {
    return apiClient.delete(`/accouchements/${id}`);
  }
};
