// src/services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://localhost:7168', // Replace with your ASP.NET API URL
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;
