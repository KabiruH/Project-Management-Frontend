import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ParticipantProjectForm from '../../components/forms/participantProjectF';
import ParticipantProjectTable from '../../components/tables/participantProjectT';
import { addParticipantProjects, getParticipantProjectById, updateParticipantProject, deleteParticipantProject, getParticipantProject } from '../../services/participantProjectS';
import Layout from '../../components/layout';

Modal.setAppElement('#root');

const AddParticipantProject = () => {
  const [participantProjects, setParticipantProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newParticipantProject, setnewParticipantProject] = useState({ 
    participantID: '',
    participantName: '',
    institutionName: '',
    projectID: '',
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedParticipantId, setSelectedParticipantId] = useState(null);

  useEffect(() => {
    const fetchparticipantProjects = async () => {
      try {
        const fetchedparticipantProjects = await getParticipantProject();
        setParticipantProjects(fetchedparticipantProjects);
      } catch (error) {
        console.error('Error fetching participantProjects:', error.response.data);
      }
    };
    fetchparticipantProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setnewParticipantProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setnewParticipantProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewParticipantProject = async () => {
    try {
      const participantPayload = { ...newParticipantProject };

      console.log('New ParticipantProjectPayload:', participantPayload);
      const addedParticipantProject = await addParticipantProjects(participantPayload);
      setParticipantProjects((prev) => [...prev, addedParticipantProject]);
      setIsModalOpen(false);
      setErrors({});
    } catch (error) {
      console.error('Error adding participant:', error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to add participant: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const openAddParticipantModal = () => {
    setEditMode(false);
    setIsModalOpen(true);
    setnewParticipantProject({
      participantID: '',
      participantName: '',
      institutionName: '',
      projectID: '',
    });
  };

  const openEditParticipantModal = async (participant) => {
    try {
      console.log('Fetching ParticipantProject with ID:', participant.participantID);
      const fetchedParticipantProject = await getParticipantProjectById(participant.participantID);
      console.log('Fetched Participant:', fetchedParticipantProject);
      setEditMode(true);
      setIsModalOpen(true);
      setSelectedParticipantId(participant.participantID);
      setnewParticipantProject({
        ...fetchedParticipantProject,
      });
    } catch (error) {
      console.error(`Error fetching ParticipantProject with ID ${participant.participantID}:`, error.response.data);
    }
  };
  
  const updateExistingParticipantProject = async () => {
    try {
      const participantPayload = { ...newParticipantProject };

      console.log('Updated ParticipantProjectPayload:', participantPayload);

      const updatedParticipantProject = await updateParticipantProject(selectedParticipantId, participantPayload);
      setParticipantProjects((prev) => prev.map(inst => (inst.participantID === selectedParticipantId ? updatedParticipantProject : inst)));
      setIsModalOpen(false);
      setErrors({});
    } catch (error) {
      console.error(`Error updating ParticipantProject with ID ${selectedParticipantId}:`, error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to update participant: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const deleteExistingParticipantProject = async (participantID) => {
    try {
      await deleteParticipantProject(participantID);
      setParticipantProjects((prev) => prev.filter(inst => inst.participantID !== participantID));
    } catch (error) {
      console.error(`Error deleting ParticipantProject with ID ${participantID}:`, error.response.data);
      alert(`Failed to delete participant: ${error.response.data.title}`);
    }
  };

  const closeAddParticipantModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setErrors({});
  };

  const deleteParticipantHandler = (participantID) => {
    if (window.confirm(`Are you sure you want to delete ParticipantProject with ID ${participantID}?`)) {
      deleteExistingParticipantProject(participantID);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Participant Projects</h1>
      <div className="p-4">
        <button
          onClick={openAddParticipantModal}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          Add Participant
        </button>
        <ParticipantProjectTable
          participantProjects={participantProjects}
          openEditModal={openEditParticipantModal}
          deleteParticipant={deleteParticipantHandler}
        />
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={closeAddParticipantModal} contentLabel={editMode ? "Edit Participant" : "Add Participant"}>
        <h2 className="text-xl mb-4">{editMode ? 'Edit Participant' : 'Add Participant'}</h2>
        <ParticipantProjectForm 
          formValues={newParticipantProject} 
          setFormValues={setnewParticipantProject} 
          handleInputChange={handleInputChange} 
          handleDateChange={handleDateChange} 
          errors={errors} 
        />
        <div className="flex justify-end mt-4">
          <button onClick={editMode ? updateExistingParticipantProject : addNewParticipantProject} className="bg-green-500 text-white p-2 rounded mr-2">
            {editMode ? 'Update' : 'Save'}
          </button>
          <button onClick={closeAddParticipantModal} className="bg-gray-500 text-white p-2 rounded">
            Cancel
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default AddParticipantProject;
