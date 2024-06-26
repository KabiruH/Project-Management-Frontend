import apiClient from './apiClient';

const addInstitutionStatuses = async (InstitutionStatusesData) => {
  try {
    const response = await apiClient.post('/api/InstitutionStatuses', InstitutionStatusesData);
    return response.data;
  } catch (error) {
    console.error('Error in addInstitutionStatuses:', error.response.data);
    throw error;
  }
};

const getInstitutionStatusesById = async (InstitutionStatusesId) => {
  try {
    const response = await apiClient.get(`/api/InstitutionStatuses/${InstitutionStatusesId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching InstitutionStatuses with ID ${InstitutionStatusesId}:`, error.response.data);
    throw error;
  }
};

const updateInstitutionStatuses = async (InstitutionStatusesId, updatedData) => {
  try {
    const response = await apiClient.put(`/api/InstitutionStatuses/${InstitutionStatusesId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating InstitutionStatuses with ID ${InstitutionStatusesId}:`, error.response.data);
    throw error;
  }
};

const deleteInstitutionStatuses = async (InstitutionStatusesId) => {
  try {
    await apiClient.delete(`/api/InstitutionStatuses/${InstitutionStatusesId}`);
  } catch (error) {
    console.error(`Error deleting InstitutionStatuses with ID ${InstitutionStatusesId}:`, error.response.data);
    throw error;
  }
};

const getInstitutionStatuses = async () => {
  try {
    const response = await apiClient.get('/api/InstitutionStatuses');
    return response.data;
  } catch (error) {
    console.error('Error fetching InstitutionStatuses:', error.response.data);
    throw error;
  }
};

export { addInstitutionStatuses, getInstitutionStatusesById, updateInstitutionStatuses, deleteInstitutionStatuses, getInstitutionStatuses };
