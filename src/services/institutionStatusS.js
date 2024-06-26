import apiClient from './apiClient';

const addStatus = async (StatusData) => {
  try {
    const response = await apiClient.post('/api/InstitutionStatuses', StatusData);
    return response.data;
  } catch (error) {
    console.error('Error in addInstitutionStatuses:', error.response.data);
    throw error;
  }
};

const getStatusById = async (statusId) => {
  try {
    const response = await apiClient.get(`/api/InstitutionStatuses/${statusId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching InstitutionStatuses with ID ${statusId}:`, error.response.data);
    throw error;
  }
};

const updateStatus = async (statusId, updatedData) => {
  try {
    const response = await apiClient.put(`/api/InstitutionStatuses/${statusId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating InstitutionStatuses with ID ${statusId}:`, error.response.data);
    throw error;
  }
};

const deleteStatus = async (statusId) => {
  try {
    await apiClient.delete(`/api/InstitutionStatuses/${statusId}`);
  } catch (error) {
    console.error(`Error deleting InstitutionStatuses with ID ${statusId}:`, error.response.data);
    throw error;
  }
};

const getStatus = async () => {
  try {
    const response = await apiClient.get('/api/InstitutionStatuses');
    return response.data;
  } catch (error) {
    console.error('Error fetching InstitutionStatuses:', error.response.data);
    throw error;
  }
};

export { addStatus, getStatusById, updateStatus, deleteStatus, getStatus };
