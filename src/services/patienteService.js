import apiClient from './api';

export default {
  // Get all patientes
  getPatientes() {
    return apiClient.get('/patientes');
  },
  // Get a specific patiente by ID
  getPatiente(id) {
    return apiClient.get(`/patientes/${id}`);
  },
  // Create a new patiente
  createPatiente(data) {
    return apiClient.post('/patientes', data);
  },
  // Update a patiente by ID
  updatePatiente(id, data) {
    return apiClient.put(`/patientes/${id}`, data);
  },
  // Delete a patiente by ID
  deletePatiente(id) {
    return apiClient.delete(`/patientes/${id}`);
  }
};
