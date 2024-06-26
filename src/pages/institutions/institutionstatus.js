import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import StatusForm from '../../components/forms/institutionStatusF';
import StatusTable from '../../components/tables/institutionStatusT';
import { addStatus as addStatusService, getStatusById, updateStatus, deleteStatus, getStatus } from '../../services/institutionStatusS';
import Layout from '../../components/layout';

Modal.setAppElement('#root');

const AddStatus = () => {
  const [status, setStatus] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState({
    stateID: '',
    statusName: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedStatusID, setSelectedStatusID] = useState(null);

  useEffect(() => {
    const fetchedstatus = async () => {
      try {
        const fetchedStatus = await getStatus();
        setStatus(fetchedStatus);
      } catch (error) {
        console.error('Error fetching status:', error.response.data);
      }
    };

    fetchedstatus();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStatus((prev) => ({
      ...prev,
      [name]: name === 'statusID' ? parseInt(value, 10) : value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setNewStatus((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewStatus = async () => {
    try {
      const statusPayload = {
        statusID: String(newStatus.statusID), // Ensure StatusID is a string
        statusName: newStatus.statusName,
        notes: newStatus.notes,
      };
  
      console.log('New status Payload:', statusPayload);
      const addedstatus = await addStatusService(statusPayload);
      setStatus((prev) => [...prev, addedstatus]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding status:', error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to add status: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };
  

  const openAddStatusModal = () => {
    setEditMode(false);
    setIsModalOpen(true);
    setNewStatus({
      statusID: '',
      statusName: '',
      notes: '',
    });
  };

  const openEditStatusModal = async (status) => {
    try {
      const fetchedStatus = await getStatusById(String(status.statusID));
      setEditMode(true);
      setIsModalOpen(true);
      setSelectedStatusID(status.statusID);
      setNewStatus({
        ...fetchedStatus,
      });
    } catch (error) {
      console.error(`Error fetching status with ID ${status.statusID}:`, error.response.data);
    }
  };

  const updateExistingStatus = async () => {
    try {
      const statusPayload = { ...newStatus };

      console.log('Updated status Payload:', statusPayload);

      const updatedStatus = await updateStatus(selectedStatusID, statusPayload);
      setStatus((prev) => prev.map(inst => (inst.statusID === selectedStatusID ? updatedStatus : inst)));
      setIsModalOpen(false);
    } catch (error) {
      console.error(`Error updating status with ID ${selectedStatusID}:`, error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to update status: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const deleteExistingStatus = async (statusID) => {
    try {
      await deleteStatus(statusID);
      setStatus((prev) => prev.filter(inst => inst.statusID !== statusID));
    } catch (error) {
      console.error(`Error deleting status with ID ${statusID}:`, error.response.data);
      alert(`Failed to delete status: ${error.response.data.title}`);
    }
  };

  const closeAddStatusModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setErrors({});
  };

  const deleteStatusHandler = (statusID) => {
    if (window.confirm(`Are you sure you want to delete status with ID ${statusID}?`)) {
      deleteExistingStatus(statusID);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Status</h1>
      <div className="p-4">
        <button
          onClick={openAddStatusModal}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          Add status
        </button>
        <StatusTable
          status={status}
          openEditModal={openEditStatusModal}
          deleteStatus={deleteStatusHandler}
        />
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={closeAddStatusModal} contentLabel={editMode ? "Edit Status" : "Add status"}>
        <h2 className="text-xl mb-4">{editMode ? 'Edit Status' : 'Add Status'}</h2>
        <StatusForm 
          formValues={newStatus} 
          handleInputChange={handleInputChange} 
          handleDateChange={handleDateChange} 
          errors={errors} 
        />
        <div className="flex justify-end mt-4">
          <button onClick={editMode ? updateExistingStatus : addNewStatus} className="bg-green-500 text-white p-2 rounded mr-2">
            {editMode ? 'Update' : 'Save'}
          </button>
          <button onClick={closeAddStatusModal} className="bg-gray-500 text-white p-2 rounded">
            Cancel
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default AddStatus;
