import apiClient from './apiClient';

const addProject = async (projectData) => {
  try {
    const response = await apiClient.post('/api/Projects', projectData);
    console.log('addProject response:', response);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error in addProject:', error.response.data);
      console.error('Validation Errors:', error.response.data.errors);
    } else {
      console.error('Error in addProject:', error.message);
    }
    throw error;
  }
};

const getProjectById = async (projectID) => {
  try {
    const response = await apiClient.get(`/api/Projects/${projectID}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with ID ${projectID}:`, error.response.data);
    throw error;
  }
};

const updateProject = async (projectID, projectData) => {
  try {
    const response = await apiClient.put(`/api/Projects/${projectID}`, projectData);
    console.log('updateProject response:', response);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error in updateProject:', error.response.data);
      console.error('Validation Errors:', error.response.data.errors);
    } else {
      console.error('Error in updateProject:', error.message);
    }
    throw error;
  }
};

const deleteProject = async (projectID) => {
  try {
    const response = await apiClient.delete(`/api/Projects/${projectID}`);
    console.log('deleteProject response:', response);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error in deleteProject:', error.response.data);
      console.error('Validation Errors:', error.response.data.errors);
    } else {
      console.error('Error in deleteProject:', error.message);
    }
    throw error;
  }
};

const getProjects = async () => {
  try {
    const response = await apiClient.get('/api/Projects');
    console.log('getProjects response:', response);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error in getProjects:', error.response.data);
      console.error('Validation Errors:', error.response.data.errors);
    } else {
      console.error('Error in getProjects:', error.message);
    }
    throw error;
  }
};

export { addProject, getProjectById, updateProject, deleteProject, getProjects };
