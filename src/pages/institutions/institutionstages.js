import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import StagesForm from '../../components/forms/institutionStagesF';
import StagesTable from '../../components/tables/institutionStagesT';
import { addStages as addStagesService, getStagesById, updateStages, deleteStages, getStages } from '../../services/institutionStageS';
import Layout from '../../components/layout';

Modal.setAppElement('#root');

const AddStages = () => {
  const [stages, setStages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStage, setNewStage] = useState({
    stageID: '',
    stageName: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedStageID, setSelectedStageID] = useState(null);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const fetchedStages = await getStages();
        setStages(fetchedStages);
      } catch (error) {
        console.error('Error fetching stages:', error.response.data);
      }
    };

    fetchStages();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setNewStage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewStage = async () => {
    try {
      const stagePayload = {
        stageID: String(newStage.stageID), // Ensure stageID is a string
        stageName: newStage.stageName,
        notes: newStage.notes,
      };

      console.log('New Stage Payload:', stagePayload);
      const addedStage = await addStagesService(stagePayload);
      setStages((prev) => [...prev, addedStage]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding stage:', error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to add stage: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const openAddStagesModal = () => {
    setEditMode(false);
    setIsModalOpen(true);
    setNewStage({
      stageID: '',
      stageName: '',
      notes: '',
    });
  };

  const openEditStageModal = async (stage) => {
    try {
      const fetchedStage = await getStagesById(String(stage.stageID));
      setEditMode(true);
      setIsModalOpen(true);
      setSelectedStageID(stage.stageID);
      setNewStage({
        ...fetchedStage,
      });
    } catch (error) {
      console.error(`Error fetching stage with ID ${stage.stageID}:`, error.response.data);
    }
  };

  const updateExistingStage = async () => {
    try {
      const stagePayload = { ...newStage };

      console.log('Updated Stage Payload:', stagePayload);

      const updatedStage = await updateStages(selectedStageID, stagePayload);
      setStages((prev) => prev.map(inst => (inst.stageID === selectedStageID ? updatedStage : inst)));
      setIsModalOpen(false);
    } catch (error) {
      console.error(`Error updating stage with ID ${selectedStageID}:`, error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to update stage: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const deleteExistingStage = async (stageID) => {
    try {
      await deleteStages(stageID);
      setStages((prev) => prev.filter(inst => inst.stageID !== stageID));
    } catch (error) {
      console.error(`Error deleting stage with ID ${stageID}:`, error.response.data);
      alert(`Failed to delete stage: ${error.response.data.title}`);
    }
  };

  const closeAddStagesModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setErrors({});
  };

  const deleteStageHandler = (stageID) => {
    if (window.confirm(`Are you sure you want to delete stage with ID ${stageID}?`)) {
      deleteExistingStage(stageID);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Stages</h1>
      <div className="p-4">
        <button
          onClick={openAddStagesModal}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          Add Stage
        </button>
        <StagesTable
          stages={stages}
          openEditModal={openEditStageModal}
          deleteStage={deleteStageHandler}
        />
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={closeAddStagesModal} contentLabel={editMode ? "Edit Stage" : "Add Stage"}>
        <h2 className="text-xl mb-4">{editMode ? 'Edit Stage' : 'Add Stage'}</h2>
        <StagesForm 
          formValues={newStage} 
          handleInputChange={handleInputChange} 
          handleDateChange={handleDateChange} 
          errors={errors} 
        />
        <div className="flex justify-end mt-4">
          <button onClick={editMode ? updateExistingStage : addNewStage} className="bg-green-500 text-white p-2 rounded mr-2">
            {editMode ? 'Update' : 'Save'}
          </button>
          <button onClick={closeAddStagesModal} className="bg-gray-500 text-white p-2 rounded">
            Cancel
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default AddStages;
