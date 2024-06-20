// src/services/institutionService.jsimport apiClient from './apiClient';
import apiClient from './apiClient'; 
const addInstitution = async (institutionData) => {
    try {
      const response = await apiClient.post('/api/Institutions', institutionData);
      return response.data;
    } catch (error) {
      console.error('Error in addInstitution:', error.response.data); // Log detailed error
      throw error;
    }
  };
  
  export { addInstitution };
  