import apiClient from './apiClient';

const addTrainingType = async (TrainingTypeData) => {
  try {
    const response = await apiClient.post('/api/TrainingType', TrainingTypeData);
    return response.data;
  } catch (error) {
    console.error('Error in addTrainingTypes:', error.response.data);
    throw error;
  }
};

const getTrainingTypeById = async (respondentID) => {
  try {
    const response = await apiClient.get(`/api/TrainingType/${respondentID}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching TrainingTypes with ID ${respondentID}:`, error.response.data);
    throw error;
  }
};

const updateTrainingType = async (respondentID, updatedData) => {
  try {
    const response = await apiClient.put(`/api/TrainingType/${respondentID}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating TrainingTypes with ID ${respondentID}:`, error.response.data);
    throw error;
  }
};

const deleteTrainingType = async (respondentID) => {
  try {
    await apiClient.delete(`/api/TrainingType/${respondentID}`);
  } catch (error) {
    console.error(`Error deleting TrainingTypes with ID ${respondentID}:`, error.response.data);
    throw error;
  }
};

const getTrainingType = async () => {
  try {
    const response = await apiClient.get('/api/TrainingType');
    return response.data;
  } catch (error) {
    console.error('Error fetching TrainingTypes:', error.response.data);
    throw error;
  }
};

export { addTrainingType, getTrainingTypeById, updateTrainingType, deleteTrainingType, getTrainingType };
