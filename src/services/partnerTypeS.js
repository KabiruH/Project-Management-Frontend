import apiClient from './apiClient';

const addPartnerType = async (PartnerTypeData) => {
  try {
    const response = await apiClient.post('/api/PartnerTypes', PartnerTypeData);
    return response.data;
  } catch (error) {
    console.error('Error in addPartnerTypes:', error.response.data);
    throw error;
  }
};

const getPartnerTypeById = async (typeID) => {
  try {
    const response = await apiClient.get(`/api/PartnerTypes/${typeID}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching PartnerTypes with ID ${typeID}:`, error.response.data);
    throw error;
  }
};

const updatePartnerType = async (typeID, updatedData) => {
  try {
    const response = await apiClient.put(`/api/PartnerTypes/${typeID}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating PartnerTypes with ID ${typeID}:`, error.response.data);
    throw error;
  }
};

const deletePartnerType = async (typeID) => {
  try {
    await apiClient.delete(`/api/PartnerTypes/${typeID}`);
  } catch (error) {
    console.error(`Error deleting PartnerTypes with ID ${typeID}:`, error.response.data);
    throw error;
  }
};

const getPartnerType = async () => {
  try {
    const response = await apiClient.get('/api/PartnerTypes');
    return response.data;
  } catch (error) {
    console.error('Error fetching PartnerTypes:', error.response.data);
    throw error;
  }
};

export { addPartnerType, getPartnerTypeById, updatePartnerType, deletePartnerType, getPartnerType };
