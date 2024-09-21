import apiClient from './api'; // Assurez-vous que le chemin est correct

export default {

    // connexion
    login(credentials) {
        return apiClient.post('/login', credentials);
      },


    //   deconnexion
      logout() {
        return apiClient.post('/logout');
      }
};
