import apiClient from './apiClient';

const addTrainingLevel = async (TrainingLevelData) => {
  try {
    const response = await apiClient.post('/api/TrainingLevel', TrainingLevelData);
    return response.data;
  } catch (error) {
    console.error('Error in addTrainingLevel:', error.response.data);
    throw error;
  }
};

const getTrainingLevelById = async (trainingLevelID) => {
  try {
    const response = await apiClient.get(`/api/TrainingLevel/${trainingLevelID}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching TrainingLevel with ID ${trainingLevelID}:`, error.response.data);
    throw error;
  }
};

const updateTrainingLevel = async (trainingLevelID, updatedData) => {
  try {
    const response = await apiClient.put(`/api/TrainingLevel/${trainingLevelID}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating TrainingLevel with ID ${trainingLevelID}:`, error.response.data);
    throw error;
  }
};

const deleteTrainingLevel = async (trainingLevelID) => {
  try {
    await apiClient.delete(`/api/TrainingLevel/${trainingLevelID}`);
  } catch (error) {
    console.error(`Error deleting TrainingLevel with ID ${trainingLevelID}:`, error.response.data);
    throw error;
  }
};

const getTrainingLevel = async () => {
  try {
    const response = await apiClient.get('/api/TrainingLevel');
    return response.data;
  } catch (error) {
    console.error('Error fetching TrainingLevel:', error.response.data);
    throw error;
  }
};

export { addTrainingLevel, getTrainingLevelById, updateTrainingLevel, deleteTrainingLevel, getTrainingLevel };
