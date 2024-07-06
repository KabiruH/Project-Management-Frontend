import apiClient from './apiClient';

const addCounty = async (CountyData) => {
  try {
    const response = await apiClient.post('/api/County', CountyData);
    return response.data;
  } catch (error) {
    console.error('Error in addCounty:', error.response.data);
    throw error;
  }
};

const getCountyById = async (CountyID) => {
  try {
    const response = await apiClient.get(`/api/County/${CountyID}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching County with ID ${CountyID}:`, error.response.data);
    throw error;
  }
};

const updateCounty = async (CountyID, updatedData) => {
  try {
    const response = await apiClient.put(`/api/County/${CountyID}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating County with ID ${CountyID}:`, error.response.data);
    throw error;
  }
};

const deleteCounty = async (CountyID) => {
  try {
    await apiClient.delete(`/api/County/${CountyID}`);
  } catch (error) {
    console.error(`Error deleting County with ID ${CountyID}:`, error.response.data);
    throw error;
  }
};

const getCounty = async () => {
    try {
      const response = await apiClient.get('/api/County');
      return response.data;
    } catch (error) {
      console.error('Error fetching Counties:', error.response.data);
      throw error;
    }
  };
  
  const getSubCounty = async (CountyID) => {
    try {
      const response = await apiClient.get(`/api/County/${CountyID}/SubCounties`);
      return response.data;
    } catch (error) {
      console.error('Error fetching SubCounties:', error.response?.data || error.message);
      throw error;
    }
  };
  


export { addCounty, getCountyById, updateCounty, deleteCounty, getCounty, getSubCounty };
