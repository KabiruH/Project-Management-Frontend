// src/services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL, // Replace with your ASP.NET API URL
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;
