import apiClient from './api';

export default {
  getVaccinations() {
    return apiClient.get('/vaccinations');
  },
  getVaccination(id) {
    return apiClient.get(`/vaccinations/${id}`);
  },
  createVaccination(data) {
    return apiClient.post('/vaccinations', data);
  },
  updateVaccination(id, data) {
    return apiClient.put(`/vaccinations/${id}`, data);
  },
  deleteVaccination(id) {
    return apiClient.delete(`/vaccinations/${id}`);
  }
};
