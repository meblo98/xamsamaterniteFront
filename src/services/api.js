import axios from 'axios';

// Récupérer le token depuis le localStorage ou un autre endroit
const token = localStorage.getItem('token');


const apiClient = axios.create({
  // baseURL: 'https://certif.lomouhamedelbachir.simplonfabriques.com/api',
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` // Ajouter le token JWT ici
  }
});

export default apiClient;
