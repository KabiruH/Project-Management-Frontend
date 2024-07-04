import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import PartnershipForm from '../../components/forms/partnershipF';
import PartnershipTable from '../../components/tables/partnershipT';
import { addPartnership as addPartnershipService, getPartnershipById, updatePartnership, deletePartnership, getPartnership } from '../../services/partnershipS';
import Layout from '../../components/layout';

Modal.setAppElement('#root');

const AddPartnership = () => {
  const [partnerships, setPartnerships] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPartnership, setNewPartnership] = useState({ 
      partnerID: '',
      partnerName: '',
      partnerEmail: '',
      phoneNo: '',
      partnerType: '',
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedPartnershipId, setSelectedPartnershipId] = useState(null);

  useEffect(() => {
    const fetchPartnerships = async () => {
      try {
        const fetchedPartnerships = await getPartnership();
        setPartnerships(fetchedPartnerships);
      } catch (error) {
        console.error('Error fetching partnerships:', error.response.data);
      }
    };

    fetchPartnerships();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPartnership((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewPartnership = async () => {
    try {
      const partnershipPayload = { ...newPartnership };

      console.log('New Partnership Payload:', partnershipPayload);
      const addedPartnership = await addPartnershipService(partnershipPayload);
      setPartnerships((prev) => [...prev, addedPartnership]);
      setIsModalOpen(false);
      setErrors({});
    } catch (error) {
      console.error('Error adding partnership:', error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to add partnership: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const openAddPartnershipModal = () => {
    setEditMode(false);
    setIsModalOpen(true);
    setNewPartnership({
      partnerID: '',
      partnerName: '',
      partnerEmail: '',
      phoneNo: '',
      partnerType: '',
    });
  };

  const openEditPartnershipModal = async (partnership) => {
    try {
      console.log('Fetching partnership with ID:', partnership.partnerID);
      const fetchedPartnership = await getPartnershipById(partnership.partnerID);
      console.log('Fetched Partnership:', fetchedPartnership); // Log the fetched partnership
      setEditMode(true);
      setIsModalOpen(true);
      setSelectedPartnershipId(partnership.partnerID);
      setNewPartnership({
        ...fetchedPartnership,
      });
    } catch (error) {
      console.error(`Error fetching partnership with ID ${partnership.partnerID}:`, error.response.data);
    }
  };

  const updateExistingPartnership = async () => {
    try {
      const partnershipPayload = { ...newPartnership };

      console.log('Updated Partnership Payload:', partnershipPayload);

      const updatedPartnership = await updatePartnership(selectedPartnershipId, partnershipPayload);
      setPartnerships((prev) => prev.map(inst => (inst.partnerID === selectedPartnershipId ? updatedPartnership : inst)));
      setIsModalOpen(false);
      setErrors({});
    } catch (error) {
      console.error(`Error updating partnership with ID ${selectedPartnershipId}:`, error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to update partnership: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const deleteExistingPartnership = async (partnerID) => {
    try {
      await deletePartnership(partnerID);
      setPartnerships((prev) => prev.filter(inst => inst.partnerID !== partnerID));
    } catch (error) {
      console.error(`Error deleting partnership with ID ${partnerID}:`, error.response.data);
      alert(`Failed to delete partnership: ${error.response.data.title}`);
    }
  };

  const closeAddPartnershipModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setErrors({});
  };

  const deletePartnershipHandler = (partnerID) => {
    if (window.confirm(`Are you sure you want to delete partnership with ID ${partnerID}?`)) {
      deleteExistingPartnership(partnerID);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Partnerships</h1>
      <div className="p-4">
        <button
          onClick={openAddPartnershipModal}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          Add Partnership
        </button>
        <PartnershipTable
          partnerships={partnerships}
          openEditModal={openEditPartnershipModal}
          deletePartnership={deletePartnershipHandler}
        />
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={closeAddPartnershipModal} contentLabel={editMode ? "Edit Partnership" : "Add Partnership"}>
        <h2 className="text-xl mb-4">{editMode ? 'Edit Partnership' : 'Add Partnership'}</h2>
        <PartnershipForm 
          formValues={newPartnership} 
          handleInputChange={handleInputChange} 
          errors={errors} 
        />
        <div className="flex justify-end mt-4">
          <button onClick={editMode ? updateExistingPartnership : addNewPartnership} className="bg-green-500 text-white p-2 rounded mr-2">
            {editMode ? 'Update' : 'Save'}
          </button>
          <button onClick={closeAddPartnershipModal} className="bg-gray-500 text-white p-2 rounded">
            Cancel
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default AddPartnership;
