import apiClient from './apiClient';

const addProjectStatus = async (projectStatusData) => {
    try {
        const response = await apiClient.post('/api/ProjectStatuses', projectStatusData);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error in addProjectStatus:', error.response.data);
        } else {
            console.error('Error in addProjectStatus:', error.message);
        }
        throw error;
    }
};

const getProjectStatusById = async (statusId) => {
  try {
    const response = await apiClient.get(`/api/ProjectStatuses/${statusId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ProjectStatus with ID ${statusId}:`, error.response.data);
    throw error;
  }
};

const updateProjectStatus = async (projectStatusId, projectStatusData) => {
    try {
      const response = await apiClient.put(`/api/ProjectStatuses/${projectStatusId}`, projectStatusData);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Error in updateProjectStatus:', error.response.data);
      } else {
        console.error('Error in updateProjectStatus:', error.message);
      }
      throw error;
    }
  };
  
const deleteProjectStatus = async (projectStatusId) => {
    try {
      const response = await apiClient.delete(`/api/ProjectStatuses/${projectStatusId}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Error in deleteProjectStatus:', error.response.data);
      } else {
        console.error('Error in deleteProjectStatus:', error.message);
      }
      throw error;
    }
  };

const getProjectStatuses = async () => {
    try {
      const response = await apiClient.get('/api/ProjectStatuses');
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Error in getProjectStatuses:', error.response.data);
      } else {
        console.error('Error in getProjectStatuses:', error.message);
      }
      throw error;
    }
  };

export { addProjectStatus, getProjectStatusById, updateProjectStatus, deleteProjectStatus, getProjectStatuses };
