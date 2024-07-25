import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import  {customStyles} from "../../styles/customStyles"
import { FaPlus } from "react-icons/fa6";

import TrainingTypeForm from '../../components/forms/trainingTypeF';
import TrainingTypeTable from '../../components/tables/trainingTypeT';
import { addTrainingType as addTrainingTypeService, getTrainingTypeById, updateTrainingType, deleteTrainingType, getTrainingType } from '../../services/trainingTypeS';
import Layout from '../../components/layout';

Modal.setAppElement('#root');

const AddTrainingType = () => {
  const [trainingtypes, setTrainingTypes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTrainingTypes, setNewTrainingTypes] = useState({
    typeID: '',
    typeName: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedTrainingTypesID, setSelectedTrainingTypesID] = useState(null);

  useEffect(() => {
    const fetchedtrainingtype = async () => {
      try {
        const fetchedTrainingTypes = await getTrainingType();
        setTrainingTypes(fetchedTrainingTypes);
      } catch (error) {
        console.error('Error fetching trainingtype:', error.response.data);
      }
    };

    fetchedtrainingtype();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrainingTypes((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setNewTrainingTypes((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewTrainingTypes = async () => {
    try {
      const trainingtypePayload = {
        typeID: String(newTrainingTypes.typeID), // Ensure TrainingTypesID is a string
        typeName: newTrainingTypes.typeName,
        notes: newTrainingTypes.notes,
      };
  
      console.log('New trainingtype Payload:', trainingtypePayload);
      const addedtrainingtype = await addTrainingTypeService(trainingtypePayload);
      setTrainingTypes((prev) => [...prev, addedtrainingtype]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding trainingtype:', error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to add trainingtype: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };
  

  const openAddTrainingTypesModal = () => {
    setEditMode(false);
    setIsModalOpen(true);
    setNewTrainingTypes({
      typeID: '',
      typeName: '',
      notes: '',
    });
  };

  const openEditTrainingTypesModal = async (trainingtype) => {
    try {
      const fetchedTrainingTypes = await getTrainingTypeById(String(trainingtype.typeID));
      setEditMode(true);
      setIsModalOpen(true);
      setSelectedTrainingTypesID(trainingtype.typeID);
      setNewTrainingTypes({
        ...fetchedTrainingTypes,
      });
    } catch (error) {
      console.error(`Error fetching trainingtype with ID ${trainingtype.typeID}:`, error.response.data);
    }
  };

  const updateExistingTrainingTypes = async () => {
    try {
      const trainingtypePayload = { ...newTrainingTypes };

      console.log('Updated trainingtype Payload:', trainingtypePayload);

      const updatedTrainingTypes = await updateTrainingType(selectedTrainingTypesID, trainingtypePayload);
      setTrainingTypes((prev) => prev.map(inst => (inst.typeID === selectedTrainingTypesID ? updatedTrainingTypes : inst)));
      setIsModalOpen(false);
    } catch (error) {
      console.error(`Error updating trainingtype with ID ${selectedTrainingTypesID}:`, error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to update trainingtype: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const deleteExistingTrainingTypes = async (typeID) => {
    try {
      await deleteTrainingType(typeID);
      setTrainingTypes((prev) => prev.filter(inst => inst.typeID !== typeID));
    } catch (error) {
      console.error(`Error deleting trainingtype with ID ${typeID}:`, error.response.data);
      alert(`Failed to delete trainingtype: ${error.response.data.title}`);
    }
  };

  const closeAddTrainingTypesModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setErrors({});
  };

  const deleteTrainingTypeHandler = (typeID) => {
    if (window.confirm(`Are you sure you want to delete trainingtype with ID ${typeID}?`)) {
      deleteExistingTrainingTypes(typeID);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Training Types</h1>
      <div className="p-4">
        <button
          onClick={openAddTrainingTypesModal}
          className="bg-blue-500 text-white p-2 rounded mb-4 flex justify-center items-center mr-auto gap-2"
        >
         <FaPlus />  <span>Training Types</span>   
        </button>
        <TrainingTypeTable
          trainingtypes={trainingtypes}
          openEditModal={openEditTrainingTypesModal}
          deleteTrainingType={deleteTrainingTypeHandler}
        />
      </div>
      <Modal style={customStyles} isOpen={isModalOpen} onRequestClose={closeAddTrainingTypesModal} contentLabel={editMode ? "Edit Training Types" : "Add trainingtype"}>
        <h2 className="text-xl mb-4">{editMode ? 'Edit Training Types' : 'Add Training Types'}</h2>
        <TrainingTypeForm 
          formValues={newTrainingTypes} 
          handleInputChange={handleInputChange} 
          handleDateChange={handleDateChange} 
          errors={errors} 
        />
        <div className="flex justify-end mt-4">
          <button onClick={editMode ? updateExistingTrainingTypes : addNewTrainingTypes} className="bg-primary px-5 text-white p-2 rounded mr-2">
            {editMode ? 'Update' : 'Save'}
          </button>
          <button onClick={closeAddTrainingTypesModal} className="outline outline-1 outline-primary text-primary px-5 p-2 rounded">
            Cancel
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default AddTrainingType;
