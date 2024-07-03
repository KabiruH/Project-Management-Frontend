import apiClient from './apiClient';

const addTestimonial = async (TestimonialData) => {
  try {
    const response = await apiClient.post('/api/Testimonials', TestimonialData);
    return response.data;
  } catch (error) {
    console.error('Error in addTestimonials:', error.response.data);
    throw error;
  }
};

const getTestimonialById = async (UserID) => {
  try {
    const response = await apiClient.get(`/api/Testimonials/${UserID}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Testimonials with ID ${UserID}:`, error.response.data);
    throw error;
  }
};

const updateTestimonial = async (UserID, updatedData) => {
  try {
    const response = await apiClient.put(`/api/Testimonials/${UserID}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating Testimonials with ID ${UserID}:`, error.response.data);
    throw error;
  }
};

const deleteTestimonial = async (UserID) => {
  try {
    await apiClient.delete(`/api/Testimonials/${UserID}`);
  } catch (error) {
    console.error(`Error deleting Testimonials with ID ${UserID}:`, error.response.data);
    throw error;
  }
};

const getTestimonial = async () => {
  try {
    const response = await apiClient.get('/api/Testimonials');
    return response.data;
  } catch (error) {
    console.error('Error fetching Testimonials:', error.response.data);
    throw error;
  }
};

export { addTestimonial, getTestimonialById, updateTestimonial, deleteTestimonial, getTestimonial };
