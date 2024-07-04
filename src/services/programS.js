import apiClient from './apiClient';

const addPrograms = async (ProgramsData) => {
  try {
    const response = await apiClient.post('/api/Programs', ProgramsData);
    return response.data;
  } catch (error) {
    console.error('Error in addProgramss:', error.response.data);
    throw error;
  }
};

const getProgramsById = async (programID) => {
  try {
    const response = await apiClient.get(`/api/Programs/${programID}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Programss with ID ${programID}:`, error.response.data);
    throw error;
  }
};

const updatePrograms = async (programID, updatedData) => {
  try {
    const response = await apiClient.put(`/api/Programs/${programID}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating Programs with ID ${programID}:`, error.response.data);
    throw error;
  }
};

const deletePrograms = async (programID) => {
  try {
    await apiClient.delete(`/api/Programs/${programID}`);
  } catch (error) {
    console.error(`Error deleting Programs with ID ${programID}:`, error.response.data);
    throw error;
  }
};

const getPrograms = async () => {
  try {
    const response = await apiClient.get('/api/Programs');
    return response.data;
  } catch (error) {
    console.error('Error fetching Programs:', error.response.data);
    throw error;
  }
};

export { addPrograms, getProgramsById, updatePrograms, deletePrograms, getPrograms };
