import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import  {customStyles} from "../../styles/customStyles"

import TrainingLevelForm from '../../components/forms/trainingLevelF';
import TrainingLevelTable from '../../components/tables/trainingLevelT';
import { addTrainingLevel as addTrainingLevelService, getTrainingLevelById, updateTrainingLevel, deleteTrainingLevel, getTrainingLevel } from '../../services/trainingLevelS';
import Layout from '../../components/layout';

Modal.setAppElement('#root');

const AddTrainingLevel = () => {
  const [traininglevels, setTrainingLevel] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTrainingLevel, setNewTrainingLevel] = useState({
    trainingLevelID: '',
    levelName: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedTrainingLevelID, setSelectedTrainingLevelID] = useState(null);

  useEffect(() => {
    const fetchedtrainingLevel = async () => {
      try {
        const fetchedTrainingLevel = await getTrainingLevel();
        setTrainingLevel(fetchedTrainingLevel);
      } catch (error) {
        console.error('Error fetching trainingLevel:', error.response.data);
      }
    };

    fetchedtrainingLevel();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrainingLevel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setNewTrainingLevel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewTrainingLevel = async () => {
    try {
      const trainingLevelPayload = {
        trainingLevelID: String(newTrainingLevel.trainingLevelID), // Ensure TrainingLevelID is a string
        levelName: newTrainingLevel.levelName,
        notes: newTrainingLevel.notes,
      };
  
      console.log('New trainingLevel Payload:', trainingLevelPayload);
      const addedtrainingLevel = await addTrainingLevelService(trainingLevelPayload);
      setTrainingLevel((prev) => [...prev, addedtrainingLevel]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding trainingLevel:', error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to add trainingLevel: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };
  

  const openAddTrainingLevelModal = () => {
    setEditMode(false);
    setIsModalOpen(true);
    setNewTrainingLevel({
      trainingLevelID: '',
      levelName: '',
      notes: '',
    });
  };

  const openEditTrainingLevelModal = async (trainingLevel) => {
    try {
      const fetchedTrainingLevel = await getTrainingLevelById(String(trainingLevel.trainingLevelID));
      setEditMode(true);
      setIsModalOpen(true);
      setSelectedTrainingLevelID(trainingLevel.trainingLevelID);
      setNewTrainingLevel({
        ...fetchedTrainingLevel,
      });
    } catch (error) {
      console.error(`Error fetching trainingLevel with ID ${trainingLevel.trainingLevelID}:`, error.response.data);
    }
  };

  const updateExistingTrainingLevel = async () => {
    try {
      const trainingLevelPayload = { ...newTrainingLevel };

      console.log('Updated trainingLevel Payload:', trainingLevelPayload);

      const updatedTrainingLevel = await updateTrainingLevel(selectedTrainingLevelID, trainingLevelPayload);
      setTrainingLevel((prev) => prev.map(inst => (inst.trainingLevelID === selectedTrainingLevelID ? updatedTrainingLevel : inst)));
      setIsModalOpen(false);
    } catch (error) {
      console.error(`Error updating trainingLevel with ID ${selectedTrainingLevelID}:`, error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to update trainingLevel: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const deleteExistingTrainingLevel = async (trainingLevelID) => {
    try {
      await deleteTrainingLevel(trainingLevelID);
      setTrainingLevel((prev) => prev.filter(inst => inst.trainingLevelID !== trainingLevelID));
    } catch (error) {
      console.error(`Error deleting trainingLevel with ID ${trainingLevelID}:`, error.response.data);
      alert(`Failed to delete trainingLevel: ${error.response.data.title}`);
    }
  };

  const closeAddTrainingLevelModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setErrors({});
  };

  const deleteTrainingLevelHandler = (trainingLevelID) => {
    if (window.confirm(`Are you sure you want to delete trainingLevel with ID ${trainingLevelID}?`)) {
      deleteExistingTrainingLevel(trainingLevelID);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">TrainingLevel</h1>
      <div className="p-4">
        <button
          onClick={openAddTrainingLevelModal}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          Add TrainingLevel
        </button>
        <TrainingLevelTable
          traininglevels={traininglevels}
          openEditModal={openEditTrainingLevelModal}
          deleteTrainingLevel={deleteTrainingLevelHandler}
        />
      </div>
      <Modal style={customStyles} isOpen={isModalOpen} onRequestClose={closeAddTrainingLevelModal} contentLabel={editMode ? "Edit TrainingLevel" : "Add trainingLevel"}>
        <h2 className="subtitle2 mb-4">{editMode ? 'Edit TrainingLevel' : 'Add TrainingLevel'}</h2>
        <TrainingLevelForm 
          formValues={newTrainingLevel} 
          handleInputChange={handleInputChange} 
          handleDateChange={handleDateChange} 
          errors={errors} 
        />
        <div className="flex justify-end mt-4">
          <button onClick={editMode ? updateExistingTrainingLevel : addNewTrainingLevel} className="bg-primary -px-5 text-white p-2 rounded mr-2">
            {editMode ? 'Update' : 'Save'}
          </button>
          <button onClick={closeAddTrainingLevelModal} className="outline outline-1 outline-primary text-primary px-5 p-2 rounded">
            Cancel
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default AddTrainingLevel;
