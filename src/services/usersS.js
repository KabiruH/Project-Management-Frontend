import apiClient from './apiClient';

const addUsers = async (UsersData) => {
  try {
    const response = await apiClient.post('/api/Users', UsersData);
    return response.data;
  } catch (error) {
    console.error('Error in addUsers:', error.response.data);
    throw error;
  }
};

const getUsersById = async (Username) => {
  try {
    const response = await apiClient.get(`/api/Users/${Username}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Users with ID ${Username}:`, error.response.data);
    throw error;
  }
};

const updateUsers = async (username, updatedData) => {
  try {
    const response = await apiClient.put(`/api/Users/${username}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating Users with ID ${username }:`, error.response.data);
    throw error;
  }
};

const deleteUsers = async (username) => {
  try {
    await apiClient.delete(`/api/Users/${username}`);
  } catch (error) {
    console.error(`Error deleting Users with ID ${username}:`, error.response.data);
    throw error;
  }
};

const getUsers = async () => {
  try {
    const response = await apiClient.get('/api/User');
    return response.data;
  } catch (error) {
    console.error('Error fetching Users:', error.response.data);
    throw error;
  }
};

export { addUsers, getUsersById, updateUsers, deleteUsers, getUsers };
