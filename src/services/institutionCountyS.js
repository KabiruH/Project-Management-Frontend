import apiClient from './apiClient';

const addCounty = async (CountyData) => {
  try {
    const response = await apiClient.post('/api/Counties', CountyData);
    return response.data;
  } catch (error) {
    console.error('Error in addCounty:', error.response.data);
    throw error;
  }
};

const getCountyById = async (CountyId) => {
  try {
    const response = await apiClient.get(`/api/Counties/${CountyId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching County with ID ${CountyId}:`, error.response.data);
    throw error;
  }
};

const updateCounty = async (CountyId, updatedData) => {
  try {
    const response = await apiClient.put(`/api/Counties/${CountyId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating County with ID ${CountyId}:`, error.response.data);
    throw error;
  }
};

const deleteCounty = async (CountyId) => {
  try {
    await apiClient.delete(`/api/Counties/${CountyId}`);
  } catch (error) {
    console.error(`Error deleting County with ID ${CountyId}:`, error.response.data);
    throw error;
  }
};

const getCounties = async () => {
  try {
    const response = await apiClient.get('/api/Counties');
    return response.data;
  } catch (error) {
    console.error('Error fetching Counties:', error.response.data);
    throw error;
  }
};

export { addCounty, getCountyById, updateCounty, deleteCounty, getCounties };
