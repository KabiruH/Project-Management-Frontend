import apiClient from './apiClient';

const addParticipantProjects = async (ParticipantProjectData) => {
  try {
    const response = await apiClient.post('/api/ParticipantProject', ParticipantProjectData);
    return response.data;
  } catch (error) {
    console.error('Error in addParticipantProjects:', error.response.data);
    throw error;
  }
};

const getParticipantProjectById = async (participantID) => {
  try {
    const response = await apiClient.get(`/api/ParticipantProject/${participantID}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ParticipantProjects with ID ${participantID}:`, error.response.data);
    throw error;
  }
};

const updateParticipantProject = async (participantID, updatedData) => {
  try {
    const response = await apiClient.put(`/api/ParticipantProject/${participantID}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating ParticipantProject with ID ${participantID}:`, error.response.data);
    throw error;
  }
};

const deleteParticipantProject = async (participantID) => {
  try {
    await apiClient.delete(`/api/ParticipantProject/${participantID}`);
  } catch (error) {
    console.error(`Error deleting ParticipantProjects with ID ${participantID}:`, error.response.data);
    throw error;
  }
};

const getParticipantProject = async () => {
  try {
    const response = await apiClient.get('/api/ParticipantProjects');
    return response.data;
  } catch (error) {
    console.error('Error fetching ParticipantProjects:', error.response.data);
    throw error;
  }
};

export { addParticipantProjects, getParticipantProjectById, updateParticipantProject, deleteParticipantProject, getParticipantProject };
