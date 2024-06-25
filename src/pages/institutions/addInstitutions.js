import React, { useState } from 'react';
import Modal from 'react-modal';
import InstitutionForm from '../../components/forms/institutionForm';
import InstitutionTable from '../../components/tables/institutionTable';
import { addInstitution as addInstitutionService } from '../../services/institutionService';
import Layout from '../../components/layout'; // Active import

Modal.setAppElement('#root'); // Ensure the root element is set for accessibility

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInstitution((prev) => ({ ...prev, [name]: value }));
  };

  const addInstitution = async () => {
    try {
      console.log('New Institution Payload:', newInstitution);
      const addedInstitution = await addInstitutionService(newInstitution);
      setInstitutions((prev) => [...prev, addedInstitution]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error in addInstitution:', error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to add institution: ${error.response.data.title}`);
    }
  };

  const openAddInstitutionModal = () => setIsModalOpen(true);
  const closeAddInstitutionModal = () => {
    setIsModalOpen(false);
    setErrors({});
  };

  const deleteInstitution = (institutionID) => {
    setInstitutions((prev) => prev.filter(inst => inst.institutionID !== institutionID));
  };

  return (
    <Layout>
      <div className="p-4">
        <button
          onClick={openAddInstitutionModal}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          Add Institution
        </button>
        <InstitutionTable
          institutions={institutions}
          openEditModal={openAddInstitutionModal}
          deleteInstitution={deleteInstitution}
        />
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={closeAddInstitutionModal} contentLabel="Add Institution">
        <h2 className="text-xl mb-4">Add Institution</h2>
        <InstitutionForm 
          formValues={newInstitution} 
          handleInputChange={handleInputChange} 
          errors={errors} // Ensure errors is passed as an object
        />
        <div className="flex justify-end mt-4">
          <button onClick={addInstitution} className="bg-green-500 text-white p-2 rounded mr-2">
            Save
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
