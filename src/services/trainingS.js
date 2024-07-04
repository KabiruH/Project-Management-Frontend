import apiClient from './apiClient';

const addTraining = async (TrainingData) => {
  try {
    const response = await apiClient.post('/api/Training', TrainingData);
    return response.data;
  } catch (error) {
    console.error('Error in addTraining:', error.response.data);
    throw error;
  }
};

const getTrainingById = async (trainingID) => {
  try {
    const response = await apiClient.get(`/api/Training/${trainingID}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Training with ID ${trainingID}:`, error.response.data);
    throw error;
  }
};

const updateTraining = async (trainingID, updatedData) => {
  try {
    const response = await apiClient.put(`/api/Training/${trainingID}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating Training with ID ${trainingID}:`, error.response.data);
    throw error;
  }
};

const deleteTraining = async (trainingID) => {
  try {
    await apiClient.delete(`/api/Training/${trainingID}`);
  } catch (error) {
    console.error(`Error deleting Training with ID ${trainingID}:`, error.response.data);
    throw error;
  }
};

const getTraining = async () => {
  try {
    const response = await apiClient.get('/api/Training');
    return response.data;
  } catch (error) {
    console.error('Error fetching Training:', error.response.data);
    throw error;
  }
};

export { addTraining, getTrainingById, updateTraining, deleteTraining, getTraining };
