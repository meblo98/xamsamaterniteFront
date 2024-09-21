import apiClient from './api';

export default {
  getConseils() {
    return apiClient.get('/conseils');
  },
  getConseil(id) {
    return apiClient.get(`/conseils/${id}`);
  },
  createConseil(data) {
    return apiClient.post('/conseils', data);
  },
  updateConseil(id, data) {
    return apiClient.put(`/conseils/${id}`, data);
  },
  deleteConseil(id) {
    return apiClient.delete(`/conseils/${id}`);
  }
};
