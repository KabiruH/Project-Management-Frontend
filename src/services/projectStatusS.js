import apiClient from './apiClient';

const addProjectStatus = async (projectStatusData) => {
    try {
        const response = await apiClient.post('/api/ProjectStatuses', projectStatusData);
        return response.data;
    } catch (error) {
        console.error('Error in addProjectStatus:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const getProjectStatusById = async (projectStatusID) => {
    try {
        const response = await apiClient.get(`/api/ProjectStatuses/${projectStatusID}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ProjectStatus with ID ${projectStatusID}:`, error.response ? error.response.data : error.message);
        throw error;
    }
};

const updateProjectStatus = async (projectStatusID, projectStatusData) => {
    try {
        const response = await apiClient.put(`/api/ProjectStatuses/${projectStatusID}`, projectStatusData);
        return response.data;
    } catch (error) {
        console.error('Error in updateProjectStatus:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const deleteProjectStatus = async (projectStatusID) => {
  try {
      const response = await apiClient.delete(`/api/ProjectStatuses/${projectStatusID}`);
      console.log(`Deleted project status with ID ${projectStatusID}`);
      return response.data;
    } catch (error) {
      if (error.response) {
          console.error('Error in deleteProjectStatus:', error.response.data);
      } else if (error.request) {
          console.error('Error in deleteProjectStatus: No response received', error.request);
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
        console.error('Error in getProjectStatuses:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export {
    addProjectStatus,
    getProjectStatusById,
    updateProjectStatus,
    deleteProjectStatus,
    getProjectStatuses
};
