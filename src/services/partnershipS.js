import apiClient from './apiClient';

const addPartnership = async (PartnershipData) => {
  try {
    const response = await apiClient.post('/api/Partnerships', PartnershipData);
    return response.data;
  } catch (error) {
    console.error('Error in addPartnerships:', error.response.data);
    throw error;
  }
};

const getPartnershipById = async (partnerID) => {
  try {
    const response = await apiClient.get(`/api/Partnerships/${partnerID}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Partnerships with ID ${partnerID}:`, error.response.data);
    throw error;
  }
};

const updatePartnership = async (partnerID, updatedData) => {
  try {
    const response = await apiClient.put(`/api/Partnerships/${partnerID}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating Partnerships with ID ${partnerID}:`, error.response.data);
    throw error;
  }
};

const deletePartnership = async (partnerID) => {
  try {
    await apiClient.delete(`/api/Partnerships/${partnerID}`);
  } catch (error) {
    console.error(`Error deleting Partnerships with ID ${partnerID}:`, error.response.data);
    throw error;
  }
};

const getPartnership = async () => {
  try {
    const response = await apiClient.get('/api/Partnerships');
    return response.data;
  } catch (error) {
    console.error('Error fetching Partnerships:', error.response.data);
    throw error;
  }
};

export { addPartnership, getPartnershipById, updatePartnership, deletePartnership, getPartnership };
