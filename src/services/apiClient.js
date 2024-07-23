import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://192.168.100.10:5248',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
