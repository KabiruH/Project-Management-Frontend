import apiClient from './apiClient';

const addInstitutionStages = async (InstitutionStagesData) => {
  try {
    const response = await apiClient.post('/api/InstitutionStages', InstitutionStagesData);
    return response.data;
  } catch (error) {
    console.error('Error in addInstitutionStages:', error.response.data);
    throw error;
  }
};

const getInstitutionStagesById = async (InstitutionStagesId) => {
  try {
    const response = await apiClient.get(`/api/InstitutionStages/${InstitutionStagesId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching InstitutionStages with ID ${InstitutionStagesId}:`, error.response.data);
    throw error;
  }
};

const updateInstitutionStages = async (InstitutionStagesId, updatedData) => {
  try {
    const response = await apiClient.put(`/api/InstitutionStages/${InstitutionStagesId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating InstitutionStages with ID ${InstitutionStagesId}:`, error.response.data);
    throw error;
  }
};

const deleteInstitutionStages = async (InstitutionStagesId) => {
  try {
    await apiClient.delete(`/api/InstitutionStages/${InstitutionStagesId}`);
  } catch (error) {
    console.error(`Error deleting InstitutionStages with ID ${InstitutionStagesId}:`, error.response.data);
    throw error;
  }
};

const getInstitutionStages = async () => {
  try {
    const response = await apiClient.get('/api/InstitutionStages');
    return response.data;
  } catch (error) {
    console.error('Error fetching InstitutionStagess:', error.response.data);
    throw error;
  }
};

export { addInstitutionStages, getInstitutionStagesById, updateInstitutionStages, deleteInstitutionStages, getInstitutionStages };
