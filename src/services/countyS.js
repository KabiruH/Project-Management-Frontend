import apiClient from './apiClient';

const addCounty = async (countyData) => {
  try {
    const response = await apiClient.post('/api/counties', countyData);
    return response.data;
  } catch (error) {
    console.error('Error in addCounty:', error.response.data);
    throw error;
  }
};

const getCountyById = async (countyId) => {
  try {
    const response = await apiClient.get(`/api/counties/${countyId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching county with ID ${countyId}:`, error.response.data);
    throw error;
  }
};

const updateCounty = async (countyId, updatedData) => {
  try {
    const response = await apiClient.put(`/api/counties/${countyId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating county with ID ${countyId}:`, error.response.data);
    throw error;
  }
};

const deleteCounty = async (countyId) => {
  try {
    await apiClient.delete(`/api/counties/${countyId}`);
  } catch (error) {
    console.error(`Error deleting county with ID ${countyId}:`, error.response.data);
    throw error;
  }
};

const getCounties = async () => {
  try {
    const response = await apiClient.get('/api/counties');
    return response.data;
  } catch (error) {
    console.error('Error fetching counties:', error.response.data);
    throw error;
  }
};

export { addCounty, getCountyById, updateCounty, deleteCounty, getCounties };
