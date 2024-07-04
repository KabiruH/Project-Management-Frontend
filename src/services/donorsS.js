import apiClient from './apiClient';

const addDonor = async (DonorData) => {
  try {
    const response = await apiClient.post('/api/Donors', DonorData);
    return response.data;
  } catch (error) {
    console.error('Error in addDonors:', error.response.data);
    throw error;
  }
};

const getDonorById = async (DonorID) => {
  try {
    const response = await apiClient.get(`/api/Donors/${DonorID}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Donors with ID ${DonorID}:`, error.response.data);
    throw error;
  }
};

const updateDonor = async (DonorID, updatedData) => {
  try {
    const response = await apiClient.put(`/api/Donors/${DonorID}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating Donors with ID ${DonorID}:`, error.response.data);
    throw error;
  }
};

const deleteDonor = async (DonorID) => {
  try {
    await apiClient.delete(`/api/Donors/${DonorID}`);
  } catch (error) {
    console.error(`Error deleting Donors with ID ${DonorID}:`, error.response.data);
    throw error;
  }
};

const getDonor = async () => {
  try {
    const response = await apiClient.get('/api/Donors');
    return response.data;
  } catch (error) {
    console.error('Error fetching Donors:', error.response.data);
    throw error;
  }
};

export { addDonor, getDonorById, updateDonor, deleteDonor, getDonor };
