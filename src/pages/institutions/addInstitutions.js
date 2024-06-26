// src/pages/institutions/addInstitutions.js

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import InstitutionForm from '../../components/forms/institutionF';
import InstitutionTable from '../../components/tables/institutionT';
import { addInstitution as addInstitutionService, getInstitutionById, updateInstitution, deleteInstitution, getInstitutions } from '../../services/institutionS';
import Layout from '../../components/layout';

Modal.setAppElement('#root');

const AddInstitution = () => {
  const [institutions, setInstitutions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInstitution, setNewInstitution] = useState({
    institutionID: '',
    institutionName: '',
    stageID: '',
    statusID: '',
    institutionEmail: '',
    institutionContact: '',
    subCounty: '',
    countyID: 0,
    contactPerson: '',
    contactNumber: '',
    licenseStartDate: '',
    licenseEndDate: '',
    awardLeader: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedInstitutionId, setSelectedInstitutionId] = useState(null);

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const fetchedInstitutions = await getInstitutions();
        setInstitutions(fetchedInstitutions);
      } catch (error) {
        console.error('Error fetching institutions:', error.response.data);
      }
    };

    fetchInstitutions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInstitution((prev) => ({
      ...prev,
      [name]: name === 'countyID' ? parseInt(value, 10) : value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setNewInstitution((prev) => ({
      ...prev,
      [name]: (value),
    }));
  };

  const addNewInstitution = async () => {
    try {
      const institutionPayload = { ...newInstitution };
      if (!institutionPayload.licenseStartDate) {
        delete institutionPayload.licenseStartDate;
      }
      if (!institutionPayload.licenseEndDate) {
        delete institutionPayload.licenseEndDate;
      }

      console.log('New Institution Payload:', institutionPayload);
      const addedInstitution = await addInstitutionService(institutionPayload);
      setInstitutions((prev) => [...prev, addedInstitution]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding institution:', error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to add institution: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const openAddInstitutionModal = () => {
    setEditMode(false);
    setIsModalOpen(true);
    setNewInstitution({
      institutionID: '',
      institutionName: '',
      stageID: '',
      statusID: '',
      institutionEmail: '',
      institutionContact: '',
      subCounty: '',
      countyID: 0,
      contactPerson: '',
      contactNumber: '',
      licenseStartDate: '',
      licenseEndDate: '',
      awardLeader: '',
      notes: '',
    });
  };

  const openEditInstitutionModal = async (institution) => {
    try {
      console.log('Fetching institution with ID:', institution.institutionID);
      const fetchedInstitution = await getInstitutionById(institution.institutionID);
      console.log('Fetched Institution:', fetchedInstitution);
      setEditMode(true);
      setIsModalOpen(true);
      setSelectedInstitutionId(institution.institutionID);
      setNewInstitution({
        ...fetchedInstitution,
        licenseStartDate: fetchedInstitution.licenseStartDate ? new Date(fetchedInstitution.licenseStartDate).toISOString().slice(0, 16) : '',
        licenseEndDate: fetchedInstitution.licenseEndDate ? new Date(fetchedInstitution.licenseEndDate).toISOString().slice(0, 16) : '',
      });
    } catch (error) {
      console.error(`Error fetching institution with ID ${institution.institutionID}:`, error.response.data);
    }
  };
  

  const updateExistingInstitution = async () => {
    try {
      const institutionPayload = { ...newInstitution };
      if (newInstitution.licenseStartDate) {
        institutionPayload.licenseStartDate = new Date(newInstitution.licenseStartDate).toISOString().split('T')[0];
      }
      
      if (newInstitution.licenseEndDate) {
        institutionPayload.licenseEndDate = new Date(newInstitution.licenseEndDate).toISOString().split('T')[0];
      }
  
      console.log('Updated Institution Payload:', institutionPayload);
  
      const updatedInstitution = await updateInstitution(selectedInstitutionId, institutionPayload);
      setInstitutions((prev) => prev.map(inst => (inst.institutionID === selectedInstitutionId ? updatedInstitution : inst)));
      setIsModalOpen(false);
    } catch (error) {
      console.error(`Error updating institution with ID ${selectedInstitutionId}:`, error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to update institution: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };
  

  const deleteExistingInstitution = async (institutionId) => {
    try {
      await deleteInstitution(institutionId);
      setInstitutions((prev) => prev.filter(inst => inst.institutionID !== institutionId));
    } catch (error) {
      console.error(`Error deleting institution with ID ${institutionId}:`, error.response.data);
      alert(`Failed to delete institution: ${error.response.data.title}`);
    }
  };

  const closeAddInstitutionModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setErrors({});
  };

  const deleteInstitutionHandler = (institutionId) => {
    if (window.confirm(`Are you sure you want to delete institution with ID ${institutionId}?`)) {
      deleteExistingInstitution(institutionId);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Institutions</h1>
      <div className="p-4">
        <button
          onClick={openAddInstitutionModal}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          Add Institution
        </button>
        <InstitutionTable
          institutions={institutions}
          openEditModal={openEditInstitutionModal}
          deleteInstitution={deleteInstitutionHandler}
        />
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={closeAddInstitutionModal} contentLabel={editMode ? "Edit Institution" : "Add Institution"}>
        <h2 className="text-xl mb-4">{editMode ? 'Edit Institution' : 'Add Institution'}</h2>
        <InstitutionForm 
          formValues={newInstitution} 
          handleInputChange={handleInputChange} 
          handleDateChange={handleDateChange} 
          errors={errors} 
        />
        <div className="flex justify-end mt-4">
          <button onClick={editMode ? updateExistingInstitution : addNewInstitution} className="bg-green-500 text-white p-2 rounded mr-2">
            {editMode ? 'Update' : 'Save'}
          </button>
          <button onClick={closeAddInstitutionModal} className="bg-gray-500 text-white p-2 rounded">
            Cancel
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default AddInstitution;
