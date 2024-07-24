import apiClient from './apiClient';

const addParticipantStatus = async (ParticipantStatusData) => {
  try {
    const response = await apiClient.post('/api/ParticipantStatus', ParticipantStatusData);
    return response.data;
  } catch (error) {
    console.error('Error in addParticipantStatus:', error.response.data);
    throw error;
  }
};

const getParticipantStatusById = async (adminNumber) => {
  try {
    const response = await apiClient.get(`/api/ParticipantStatus/${adminNumber}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ParticipantStatus with ID ${adminNumber}:`, error.response.data);
    throw error;
  }
};

const updateParticipantStatus = async (adminNumber, updatedData) => {
  try {
    const response = await apiClient.put(`/api/ParticipantStatus/${adminNumber}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating ParticipantStatus with ID ${adminNumber}:`, error.response.data);
    throw error;
  }
};

const deleteParticipantStatus = async (adminNumber) => {
  try {
    await apiClient.delete(`/api/ParticipantStatus/${adminNumber}`);
  } catch (error) {
    console.error(`Error deleting ParticipantStatus with ID ${adminNumber}:`, error.response.data);
    throw error;
  }
};

const getParticipantStatus = async () => {
  try {
    const response = await apiClient.get('/api/ParticipantStatus');
    return response.data;
  } catch (error) {
    console.error('Error fetching ParticipantStatus:', error.response.data);
    throw error;
  }
};

export { addParticipantStatus, getParticipantStatusById, updateParticipantStatus, deleteParticipantStatus, getParticipantStatus };
