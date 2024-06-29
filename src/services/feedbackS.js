import apiClient from './apiClient';

const addFeedback = async (FeedbackData) => {
  try {
    const response = await apiClient.post('/api/Feedback', FeedbackData);
    return response.data;
  } catch (error) {
    console.error('Error in addFeedbacks:', error.response.data);
    throw error;
  }
};

const getFeedbackById = async (respondentID) => {
  try {
    const response = await apiClient.get(`/api/Feedback/${respondentID}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Feedbacks with ID ${respondentID}:`, error.response.data);
    throw error;
  }
};

const updateFeedback = async (respondentID, updatedData) => {
  try {
    const response = await apiClient.put(`/api/Feedback/${respondentID}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating Feedbacks with ID ${respondentID}:`, error.response.data);
    throw error;
  }
};

const deleteFeedback = async (respondentID) => {
  try {
    await apiClient.delete(`/api/Feedback/${respondentID}`);
  } catch (error) {
    console.error(`Error deleting Feedbacks with ID ${respondentID}:`, error.response.data);
    throw error;
  }
};

const getFeedback = async () => {
  try {
    const response = await apiClient.get('/api/Feedback');
    return response.data;
  } catch (error) {
    console.error('Error fetching Feedbacks:', error.response.data);
    throw error;
  }
};

export { addFeedback, getFeedbackById, updateFeedback, deleteFeedback, getFeedback };
