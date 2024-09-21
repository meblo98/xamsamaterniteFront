import apiClient from './api';

export default {
  getCampagnes() {
    return apiClient.get('/campagnes');
  },
  getCampagne(id) {
    return apiClient.get(`/campagnes/${id}`);
  },
  createCampagne(data) {
    return apiClient.post('/campagnes', data);
  },
  updateCampagne(id, data) {
    return apiClient.put(`/campagnes/${id}`, data);
  },
  deleteCampagne(id) {
    return apiClient.delete(`/campagnes/${id}`);
  }
};
