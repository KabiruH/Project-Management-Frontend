import apiClient from './apiClient';

const addInstitution = async (institutionData) => {
  try {
    const response = await apiClient.post('/api/Institutions', institutionData);
    return response.data;
  } catch (error) {
    console.error('Error in addInstitution:', error.response.data);
    throw error;
  }
};

const getInstitutionById = async (institutionId) => {
  try {
    const response = await apiClient.get(`/api/Institutions/${institutionId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching institution with ID ${institutionId}:`, error.response.data);
    throw error;
  }
};

const updateInstitution = async (institutionId, updatedData) => {
  try {
    const response = await apiClient.put(`/api/Institutions/${institutionId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating institution with ID ${institutionId}:`, error.response.data);
    throw error;
  }
};

const deleteInstitution = async (institutionId) => {
  try {
    await apiClient.delete(`/api/Institutions/${institutionId}`);
  } catch (error) {
    console.error(`Error deleting institution with ID ${institutionId}:`, error.response.data);
    throw error;
  }
};

const getInstitutions = async () => {
  try {
    const response = await apiClient.get('/api/Institutions');
    return response.data;
  } catch (error) {
    console.error('Error fetching institutions:', error.response.data);
    throw error;
  }
};

export { addInstitution, getInstitutionById, updateInstitution, deleteInstitution, getInstitutions };
