import apiClient from './api';

export default {
  getBadieneGoxes() {
    return apiClient.get('/badiene-gox');
  },
  getBadieneGox(id) {
    return apiClient.get(`/badiene-gox/${id}`);
  },
  createBadieneGox(data) {
    return apiClient.post('/badiene-gox', data);
  },
  updateBadieneGox(id, data) {
    return apiClient.put(`/badiene-gox/${id}`, data);
  },
  deleteBadieneGox(id) {
    return apiClient.delete(`/badiene-gox/${id}`);
  }
};
