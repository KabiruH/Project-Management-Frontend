import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import  {customStyles} from "../../styles/customStyles"
import { FaPlus } from "react-icons/fa6";

import TrainingCategoryForm from '../../components/forms/trainingCategoryF';
import TrainingCategoryTable from '../../components/tables/trainingCategoryT';
import { addTrainingCategory as addTrainingCategoryService, getTrainingCategoryById, updateTrainingCategory, deleteTrainingCategory, getTrainingCategory } from '../../services/trainingCategoryS';
import Layout from '../../components/layout';

Modal.setAppElement('#root');
const AddTrainingCategory = () => {
  const [trainingcategory, setTrainingCategory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTrainingCategory, setNewTrainingCategory] = useState({
    categoryID: '',
    categoryName: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedTrainingCategoryID, setSelectedTrainingCategoryID] = useState(null);

  useEffect(() => {
    const fetchedtrainingCategory = async () => {
      try {
        const fetchedTrainingCategory = await getTrainingCategory();
        setTrainingCategory(fetchedTrainingCategory);
      } catch (error) {
        console.error('Error fetching trainingCategory:', error.response.data);
      }
    };

    fetchedtrainingCategory();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrainingCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setNewTrainingCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewTrainingCategory = async () => {
    try {
      const trainingCategoryPayload = {
        categoryID: String(newTrainingCategory.categoryID), // Ensure TrainingCategoryID is a string
        categoryName: newTrainingCategory.categoryName,
        notes: newTrainingCategory.notes,
      };
  
      console.log('New trainingCategory Payload:', trainingCategoryPayload);
      const addedtrainingCategory = await addTrainingCategoryService(trainingCategoryPayload);
      setTrainingCategory((prev) => [...prev, addedtrainingCategory]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding trainingCategory:', error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to add trainingCategory: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };
  

  const openAddTrainingCategoryModal = () => {
    setEditMode(false);
    setIsModalOpen(true);
    setNewTrainingCategory({
      categoryID: '',
      categoryName: '',
      notes: '',
    });
  };

  const openEditTrainingCategoryModal = async (trainingCategory) => {
    try {
      const fetchedTrainingCategory = await getTrainingCategoryById(String(trainingCategory.categoryID));
      setEditMode(true);
      setIsModalOpen(true);
      setSelectedTrainingCategoryID(trainingCategory.categoryID);
      setNewTrainingCategory({
        ...fetchedTrainingCategory,
      });
    } catch (error) {
      console.error(`Error fetching trainingCategory with ID ${trainingCategory.categoryID}:`, error.response.data);
    }
  };

  const updateExistingTrainingCategory = async () => {
    try {
      const trainingCategoryPayload = { ...newTrainingCategory };

      console.log('Updated trainingCategory Payload:', trainingCategoryPayload);

      const updatedTrainingCategory = await updateTrainingCategory(selectedTrainingCategoryID, trainingCategoryPayload);
      setTrainingCategory((prev) => prev.map(inst => (inst.categoryID === selectedTrainingCategoryID ? updatedTrainingCategory : inst)));
      setIsModalOpen(false);
    } catch (error) {
      console.error(`Error updating trainingCategory with ID ${selectedTrainingCategoryID}:`, error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to update trainingCategory: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const deleteExistingTrainingCategory = async (categoryID) => {
    try {
      await deleteTrainingCategory(categoryID);
      setTrainingCategory((prev) => prev.filter(inst => inst.categoryID !== categoryID));
    } catch (error) {
      console.error(`Error deleting trainingCategory with ID ${categoryID}:`, error.response.data);
      alert(`Failed to delete trainingCategory: ${error.response.data.title}`);
    }
  };

  const closeAddTrainingCategoryModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setErrors({});
  };

  const deleteTrainingCategoryHandler = (categoryID) => {
    if (window.confirm(`Are you sure you want to delete trainingCategory with ID ${categoryID}?`)) {
      deleteExistingTrainingCategory(categoryID);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Category Types</h1>
      <div className="p-4">
        <button
          onClick={openAddTrainingCategoryModal}
          className="bg-blue-500 text-white p-2 rounded mb-4 flex justify-center items-center ml-auto gap-2"
        >
           <span> Category Types</span> <FaPlus />    
        </button>
        <TrainingCategoryTable
          trainingcategory={trainingcategory}
          openEditModal={openEditTrainingCategoryModal}
          deleteTrainingCategory={deleteTrainingCategoryHandler}
        />
      </div>
      <Modal style={customStyles} isOpen={isModalOpen} onRequestClose={closeAddTrainingCategoryModal} contentLabel={editMode ? "Edit Category Types" : "Add trainingCategory"}>
        <h2 className="subtitle2 mb-4">{editMode ? 'Edit Category Types' : 'Add Category Types'}</h2>
        <TrainingCategoryForm 
          formValues={newTrainingCategory} 
          handleInputChange={handleInputChange} 
          handleDateChange={handleDateChange} 
          errors={errors} 
        />
        <div className="flex justify-end mt-4">
          <button onClick={editMode ? updateExistingTrainingCategory : addNewTrainingCategory} className="bg-primary px-5 text-white p-2 rounded mr-2">
            {editMode ? 'Update' : 'Save'}
          </button>
          <button onClick={closeAddTrainingCategoryModal} className="outline outline-1 outline-primary text-primary px-5 p-2 rounded">
            Cancel
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default AddTrainingCategory;
