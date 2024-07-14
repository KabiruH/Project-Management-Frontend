import apiClient from './apiClient';

const addawardsService = async (AwardData) => {
  try {
    const response = await apiClient.post('/api/ParticipantAward', AwardData);
    return response.data;
  } catch (error) {
    console.error('Error in addAwards:', error.response.data);
    throw error;
  }
};

const getAwardsById = async (AwardId) => {
  try {
    const response = await apiClient.get(`/api/ParticipantAward/${AwardId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Participants Award with ID ${AwardId}:`, error.response.data);
    throw error;
  }
};

const updateAwards = async (AwardId, updatedData) => {
  try {
    const response = await apiClient.put(`/api/ParticipantAward/${AwardId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating Participants Award with ID ${AwardId}:`, error.response.data);
    throw error;
  }
};

const deleteAwards = async (AwardId) => {
  try {
    await apiClient.delete(`/api/ParticipantAward/${AwardId}`);
  } catch (error) {
    console.error(`Error deleting Participants Award with ID ${AwardId}:`, error.response.data);
    throw error;
  }
};

const getAwards = async () => {
  try {
    const response = await apiClient.get('/api/ParticipantAward');
    return response.data;
  } catch (error) {
    console.error('Error fetching Participants Awards:', error.response.data);
    throw error;
  }
};

export { addawardsService, getAwardsById, updateAwards, deleteAwards, getAwards };
