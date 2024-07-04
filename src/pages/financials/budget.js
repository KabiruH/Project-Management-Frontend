import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import BudgetForm from '../../components/forms/budgetF';
import BudgetTable from '../../components/tables/budgetT';
import { addBudget as addBudgetService, getBudgetById, updateBudget, deleteBudget, getBudgets } from '../../services/budgetS';
import Layout from '../../components/layout';

Modal.setAppElement('#root');

const AddBudget = () => {
  const [budget, setBudgets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBudget, setNewBudget] = useState({
    projectID: '',
    projectName: '',
    coordinator: '',
    startDate: '',
    endDate: '',
    description: '',
    cost: '',
    institutionName: '',
    subCounty: '',
    county: '',
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedBudgetId, setSelectedBudgetId] = useState(null);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const fetchedBudgets = await getBudgets();
        setBudgets(fetchedBudgets);
      } catch (error) {
        console.error('Error fetching Budget:', error.response.data);
      }
    };

    fetchBudgets();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBudget((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setNewBudget((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewBudget = async () => {
    try {
      const budgetPayload = { ...newBudget };

      console.log('New Budget Payload:', budgetPayload);
      const addedBudget = await addBudgetService(budgetPayload);
      setBudgets((prev) => [...prev, addedBudget]);
      setIsModalOpen(false);
      setErrors({});
    } catch (error) {
      console.error('Error adding budget:', error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to add budget: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const openAddBudgetModal = () => {
    setEditMode(false);
    setIsModalOpen(true);
    setNewBudget({
        projectID: '',
        projectName: '',
        coordinator: '',
        startDate: '',
        endDate: '',
        description: '',
        cost: '',
        institutionName: '',
        subCounty: '',
        county: '',
    });
  };

  const openEditBudgetModal = async (budget) => {
    try {
      console.log('Fetching budget with ID:', budget.projectID);
      const fetchedBudget = await getBudgetById(budget.projectID);
      console.log('Fetched Budget:', fetchedBudget);
      setEditMode(true);
      setIsModalOpen(true);
      setSelectedBudgetId(budget.projectID);
      setNewBudget({
        ...fetchedBudget,
        startDate: fetchedBudget.startDate,
        endDate: fetchedBudget.endDate,
      });
    } catch (error) {
      console.error(`Error fetching budget with ID ${budget.projectID}:`, error.response.data);
    }
  };
  
  const updateExistingBudget = async () => {
    try {
      const budgetPayload = { ...newBudget };
  
      console.log('Updated Budget Payload:', budgetPayload);
  
      const updatedBudget = await updateBudget(selectedBudgetId, budgetPayload);
      setBudgets((prev) => prev.map(inst => (inst.projectID === selectedBudgetId ? updatedBudget : inst)));
      setIsModalOpen(false);
      setErrors({});
    } catch (error) {
      console.error(`Error updating budget with ID ${selectedBudgetId}:`, error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to update budget: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const deleteExistingBudget = async (projectID) => {
    try {
      await deleteBudget(projectID);
      setBudgets((prev) => prev.filter(inst => inst.projectID !== projectID));
    } catch (error) {
      console.error(`Error deleting budget with ID ${projectID}:`, error.response.data);
      alert(`Failed to delete budget: ${error.response.data.title}`);
    }
  };

  const closeAddBudgetModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setErrors({});
  };

  const deleteBudgetHandler = (projectID) => {
    if (window.confirm(`Are you sure you want to delete budget with ID ${projectID}?`)) {
      deleteExistingBudget(projectID);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Budgets</h1>
      <div className="p-4">
        <button
          onClick={openAddBudgetModal}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          Add Budget
        </button>
        <BudgetTable
          budget={budget}
          openEditModal={openEditBudgetModal}
          deleteBudget={deleteBudgetHandler}
        />
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={closeAddBudgetModal} contentLabel={editMode ? "Edit Budget" : "Add Budget"}>
        <h2 className="text-xl mb-4">{editMode ? 'Edit Budget' : 'Add Budget'}</h2>
        <BudgetForm 
          formValues={newBudget} 
          handleInputChange={handleInputChange} 
          handleDateChange={handleDateChange} 
          errors={errors} 
        />
        <div className="flex justify-end mt-4">
          <button onClick={editMode ? updateExistingBudget : addNewBudget} className="bg-green-500 text-white p-2 rounded mr-2">
            {editMode ? 'Update' : 'Save'}
          </button>
          <button onClick={closeAddBudgetModal} className="bg-gray-500 text-white p-2 rounded">
            Cancel
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default AddBudget;
