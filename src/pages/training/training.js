import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import TrainingForm from '../../components/forms/trainingF';
import TrainingTable from '../../components/tables/trainingT';
import { addTraining as addTrainingService, getTrainingById, updateTraining, deleteTraining, getTraining } from '../../services/trainingS';
import Layout from '../../components/layout';

Modal.setAppElement('#root');

const AddTraining = () => {
  const [trainings, setTrainings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTraining, setNewTraining] = useState({ 
      
      trainingID: '',
      trainingName: '',
      institutionName: '',
      venue: '',
      date: '',
      categories: '',
      subCounty: '',
      county: '',
      coordinator: '',
      trainingLevel: '',
      trainingType: '',
      notes: '',
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedTrainingId, setSelectedTrainingId] = useState(null);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const fetchedTrainings = await getTraining();
        setTrainings(fetchedTrainings);
      } catch (error) {
        console.error('Error fetching trainings:', error.response.data);
      }
    };

    fetchTrainings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTraining((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setNewTraining((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewTraining = async () => {
    try {
      const trainingPayload = { ...newTraining };

      console.log('New Training Payload:', trainingPayload);
      const addedTraining = await addTrainingService(trainingPayload);
      setTrainings((prev) => [...prev, addedTraining]);
      setIsModalOpen(false);
      setErrors({});
    } catch (error) {
      console.error('Error adding training:', error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to add training: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const openAddTrainingModal = () => {
    setEditMode(false);
    setIsModalOpen(true);
    setNewTraining({
      trainingID: '',
      trainingName: '',
      institutionName: '',
      venue: '',
      date: '',
      categories: '',
      subCounty: '',
      county: '',
      coordinator: '',
      trainingLevel: '',
      trainingType: '',
      notes: '',
    });
  };

  const openEditTrainingModal = async (training) => {
    try {
      console.log('Fetching training with ID:', training.trainingID);
      const fetchedTraining = await getTrainingById(training.trainingID);
      console.log('Fetched Training:', fetchedTraining);
      setEditMode(true);
      setIsModalOpen(true);
      setSelectedTrainingId(training.trainingID);
      setNewTraining({
        ...fetchedTraining,
        date: fetchedTraining.date,
       
      });
    } catch (error) {
      console.error(`Error fetching training with ID ${training.trainingID}:`, error.response.data);
    }
  };
  
  const updateExistingTraining = async () => {
    try {
      const trainingPayload = { ...newTraining };
  
      console.log('Updated Training Payload:', trainingPayload);
  
      const updatedTraining = await updateTraining(selectedTrainingId, trainingPayload);
      setTrainings((prev) => prev.map(inst => (inst.trainingID === selectedTrainingId ? updatedTraining : inst)));
      setIsModalOpen(false);
      setErrors({});
    } catch (error) {
      console.error(`Error updating training with ID ${selectedTrainingId}:`, error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to update training: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const deleteExistingTraining = async (trainingID) => {
    try {
      await deleteTraining(trainingID);
      setTrainings((prev) => prev.filter(inst => inst.trainingID !== trainingID));
    } catch (error) {
      console.error(`Error deleting training with ID ${trainingID}:`, error.response.data);
      alert(`Failed to delete training: ${error.response.data.title}`);
    }
  };

  const closeAddTrainingModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setErrors({});
  };

  const deleteTrainingHandler = (trainingID) => {
    if (window.confirm(`Are you sure you want to delete training with ID ${trainingID}?`)) {
      deleteExistingTraining(trainingID);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Trainings</h1>
      <div className="p-4">
        <button
          onClick={openAddTrainingModal}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          Add Training
        </button>
        <TrainingTable
          trainings={trainings}
          openEditModal={openEditTrainingModal}
          deleteTraining={deleteTrainingHandler}
        />
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={closeAddTrainingModal} contentLabel={editMode ? "Edit Training" : "Add Training"}>
        <h2 className="text-xl mb-4">{editMode ? 'Edit Training' : 'Add Training'}</h2>
        <TrainingForm 
          formValues={newTraining} 
          handleInputChange={handleInputChange} 
          handleDateChange={handleDateChange} 
          errors={errors} 
        />
        <div className="flex justify-end mt-4">
          <button onClick={editMode ? updateExistingTraining : addNewTraining} className="bg-green-500 text-white p-2 rounded mr-2">
            {editMode ? 'Update' : 'Save'}
          </button>
          <button onClick={closeAddTrainingModal} className="bg-gray-500 text-white p-2 rounded">
            Cancel
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default AddTraining;
