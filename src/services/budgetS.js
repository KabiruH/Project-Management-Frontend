import apiClient from './apiClient';

const addBudget = async (budgetData) => {
  try {
    const response = await apiClient.post('/api/Budget', budgetData);
    return response.data;
  } catch (error) {
    console.error('Error in addBudget:', error.response.data);
    throw error;
  }
};

const getBudgetById = async (projectID) => {
  try {
    const response = await apiClient.get(`/api/Budget/${projectID}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching budget with ID ${projectID}:`, error.response.data);
    throw error;
  }
};

const updateBudget = async (projectID, updatedData) => {
  try {
    const response = await apiClient.put(`/api/Budget/${projectID}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating budget with ID ${projectID}:`, error.response.data);
    throw error;
  }
};

const deleteBudget = async (projectID) => {
  try {
    await apiClient.delete(`/api/Budget/${projectID}`);
  } catch (error) {
    console.error(`Error deleting budget with ID ${projectID}:`, error.response.data);
    throw error;
  }
};

const getBudgets = async () => {
  try {
    const response = await apiClient.get('/api/Budget');
    return response.data;
  } catch (error) {
    console.error('Error fetching budgets:', error.response.data);
    throw error;
  }
};

export { addBudget, getBudgetById, updateBudget, deleteBudget, getBudgets };
