import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ProgramForm from '../../components/forms/programF';
import ProgramTable from '../../components/tables/programT';
import { addPrograms as addProgramService, getProgramsById, updatePrograms, deletePrograms, getPrograms } from '../../services/programS';
import Layout from '../../components/layout';

Modal.setAppElement('#root');

const AddProgram = () => {
  const [programs, setPrograms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProgram, setNewProgram] = useState({
    programID: '',
    programName: '',
    institutionName: '',
    startDate: '',
    endDate: '',
    cost: '',
    subCounty: '',
    county: '',
    description: '',
    coordinator: '',
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const fetchedPrograms = await getPrograms();
        setPrograms(fetchedPrograms);
      } catch (error) {
        console.error('Error fetching Program:', error.response.data);
      }
    };

    fetchPrograms();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProgram((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setNewProgram((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewProgram = async () => {
    try {
      const budgetPayload = { ...newProgram };

      console.log('New Program Payload:', budgetPayload);
      const addedProgram = await addProgramService(budgetPayload);
      setPrograms((prev) => [...prev, addedProgram]);
      setIsModalOpen(false);
      setErrors({});
    } catch (error) {
      console.error('Error adding programs:', error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to add programs: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const openAddProgramModal = () => {
    setEditMode(false);
    setIsModalOpen(true);
    setNewProgram({
        programID: '',
        programName: '',
        institutionName: '',
        startDate: '',
        endDate: '',
        cost: '',
        subCounty: '',
        county: '',
        description: '',
        coordinator: '',
        
    });
  };

  const openEditProgramModal = async (programs) => {
    try {
      console.log('Fetching programs with ID:', programs.programID);
      const fetchedProgram = await getProgramsById(programs.programID);
      console.log('Fetched Program:', fetchedProgram);
      setEditMode(true);
      setIsModalOpen(true);
      setSelectedProgramId(programs.programID);
      setNewProgram({
        ...fetchedProgram,
        startDate: fetchedProgram.startDate,
        endDate: fetchedProgram.endDate,
      });
    } catch (error) {
      console.error(`Error fetching programs with ID ${programs.programID}:`, error.response.data);
    }
  };
  
  const updateExistingProgram = async () => {
    try {
      const budgetPayload = { ...newProgram };
  
      console.log('Updated Program Payload:', budgetPayload);
  
      const updatedProgram = await updatePrograms(selectedProgramId, budgetPayload);
      setPrograms((prev) => prev.map(inst => (inst.programID === selectedProgramId ? updatedProgram : inst)));
      setIsModalOpen(false);
      setErrors({});
    } catch (error) {
      console.error(`Error updating programs with ID ${selectedProgramId}:`, error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to update programs: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const deleteExistingProgram = async (programID) => {
    try {
      await deletePrograms(programID);
      setPrograms((prev) => prev.filter(inst => inst.programID !== programID));
    } catch (error) {
      console.error(`Error deleting programs with ID ${programID}:`, error.response.data);
      alert(`Failed to delete programs: ${error.response.data.title}`);
    }
  };

  const closeAddProgramModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setErrors({});
  };

  const deleteProgramsHandler = (programID) => {
    if (window.confirm(`Are you sure you want to delete programs with ID ${programID}?`)) {
      deleteExistingProgram(programID);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Programs</h1>
      <div className="p-4">
        <button
          onClick={openAddProgramModal}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          Add Program
        </button>
        <ProgramTable
          programs={programs}
          openEditModal={openEditProgramModal}
          deletePrograms={deleteProgramsHandler}
        />
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={closeAddProgramModal} contentLabel={editMode ? "Edit Program" : "Add Program"}>
        <h2 className="text-xl mb-4">{editMode ? 'Edit Program' : 'Add Program'}</h2>
        <ProgramForm 
          formValues={newProgram} 
          handleInputChange={handleInputChange} 
          handleDateChange={handleDateChange} 
          errors={errors} 
        />
        <div className="flex justify-end mt-4">
          <button onClick={editMode ? updateExistingProgram : addNewProgram} className="bg-green-500 text-white p-2 rounded mr-2">
            {editMode ? 'Update' : 'Save'}
          </button>
          <button onClick={closeAddProgramModal} className="bg-gray-500 text-white p-2 rounded">
            Cancel
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default AddProgram;
