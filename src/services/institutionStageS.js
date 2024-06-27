import apiClient from './apiClient';

const addStages = async (StagesData) => {
  try {
    const response = await apiClient.post('/api/InstitutionStages', StagesData);
    return response.data;
  } catch (error) {
    console.error('Error in addInstitutionStages:', error.response.data);
    throw error;
  }
};

const getStagesById = async (stagesId) => {
  try {
    const response = await apiClient.get(`/api/InstitutionStages/${stagesId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching InstitutionStages with ID ${stagesId}:`, error.response.data);
    throw error;
  }
};

const updateStages = async (stagesId, updatedData) => {
  try {
    const response = await apiClient.put(`/api/InstitutionStages/${stagesId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating InstitutionStages with ID ${stagesId}:`, error.response.data);
    throw error;
  }
};

const deleteStages = async (stagesId) => {
  try {
    await apiClient.delete(`/api/InstitutionStages/${stagesId}`);
  } catch (error) {
    console.error(`Error deleting InstitutionStages with ID ${stagesId}:`, error.response.data);
    throw error;
  }
};

const getStages = async () => {
  try {
    const response = await apiClient.get('/api/InstitutionStages');
    return response.data;
  } catch (error) {
    console.error('Error fetching InstitutionStagess:', error.response.data);
    throw error;
  }
};

export { addStages, getStagesById, updateStages, deleteStages, getStages };
