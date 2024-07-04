import apiClient from './apiClient';

const addFundingType = async (fundingtypeData) => {
  try {
    const response = await apiClient.post('/api/FundingType', fundingtypeData);
    return response.data;
  } catch (error) {
    console.error('Error in addFundingType:', error.response.data);
    throw error;
  }
};

const getFundingTypeById = async (fundingID) => {
  try {
    const response = await apiClient.get(`/api/FundingType/${fundingID}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching fundingtype with ID ${fundingID}:`, error.response.data);
    throw error;
  }
};

const updateFundingType = async (fundingID, updatedData) => {
  try {
    const response = await apiClient.put(`/api/FundingType/${fundingID}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating fundingtype with ID ${fundingID}:`, error.response.data);
    throw error;
  }
};

const deleteFundingType = async (fundingID) => {
  try {
    await apiClient.delete(`/api/FundingType/${fundingID}`);
  } catch (error) {
    console.error(`Error deleting fundingtype with ID ${fundingID}:`, error.response.data);
    throw error;
  }
};

const getFundingType = async () => {
  try {
    const response = await apiClient.get('/api/FundingType');
    return response.data;
  } catch (error) {
    console.error('Error fetching fundingtypes:', error.response.data);
    throw error;
  }
};

export { addFundingType, getFundingTypeById, updateFundingType, deleteFundingType, getFundingType };
