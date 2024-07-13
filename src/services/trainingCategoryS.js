import apiClient from './apiClient';

const addTrainingCategory = async (TrainingCategoryData) => {
  try {
    const response = await apiClient.post('/api/TrainingCategory', TrainingCategoryData);
    return response.data;
  } catch (error) {
    console.error('Error in addTrainingCategory:', error.response.data);
    throw error;
  }
};

const getTrainingCategoryById = async (categoryID) => {
  try {
    const response = await apiClient.get(`/api/TrainingCategory/${categoryID}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching TrainingCategory with ID ${categoryID}:`, error.response.data);
    throw error;
  }
};

const updateTrainingCategory = async (categoryID, updatedData) => {
  try {
    const response = await apiClient.put(`/api/TrainingCategory/${categoryID}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating TrainingCategory with ID ${categoryID}:`, error.response.data);
    throw error;
  }
};

const deleteTrainingCategory = async (categoryID) => {
  try {
    await apiClient.delete(`/api/TrainingCategory/${categoryID}`);
  } catch (error) {
    console.error(`Error deleting TrainingCategory with ID ${categoryID}:`, error.response.data);
    throw error;
  }
};

const getTrainingCategory = async () => {
  try {
    const response = await apiClient.get('/api/TrainingCategory');
    return response.data;
  } catch (error) {
    console.error('Error fetching TrainingCategory:', error.response.data);
    throw error;
  }
};

export { addTrainingCategory, getTrainingCategoryById, updateTrainingCategory, deleteTrainingCategory, getTrainingCategory };
