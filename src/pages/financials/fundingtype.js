import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaPlus } from "react-icons/fa6";

import { customStyles } from '../../styles/customStyles';
import FundingTypeForm from '../../components/forms/fundingTypeF';
import FundingTypeTable from '../../components/tables/fundingTypeT';
import { addFundingType as addFundingTypeService, getFundingTypeById, updateFundingType, deleteFundingType, getFundingType } from '../../services/fundingTypeS';
import Layout from '../../components/layout';

Modal.setAppElement('#root');

const AddFundingType = () => {
  const [fundingtype, setFundingType] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFundingType, setNewFundingType] = useState({
    fundingID: '',
    fundingName: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedFundingTypeID, setSelectedFundingTypeID] = useState(null);

  useEffect(() => {
    const fetchedfundingtype = async () => {
      try {
        const fetchedFundingType = await getFundingType();
        setFundingType(fetchedFundingType);
      } catch (error) {
        console.error('Error fetching fundingtype:', error.response.data);
      }
    };

    fetchedfundingtype();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFundingType((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setNewFundingType((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewFundingType = async () => {
    try {
      const fundingtypePayload = {
        fundingID: String(newFundingType.fundingID), // Ensure FundingTypeID is a string
        fundingName: newFundingType.fundingName,
        notes: newFundingType.notes,
      };
  
      console.log('New fundingtype Payload:', fundingtypePayload);
      const addedfundingtype = await addFundingTypeService(fundingtypePayload);
      setFundingType((prev) => [...prev, addedfundingtype]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding fundingtype:', error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to add fundingtype: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };
  

  const openAddFundingTypeModal = () => {
    setEditMode(false);
    setIsModalOpen(true);
    setNewFundingType({
      fundingID: '',
      fundingName: '',
      notes: '',
    });
  };

  const openEditFundingTypeModal = async (fundingtype) => {
    try {
      const fetchedFundingType = await getFundingTypeById(String(fundingtype.fundingID));
      setEditMode(true);
      setIsModalOpen(true);
      setSelectedFundingTypeID(fundingtype.fundingID);
      setNewFundingType({
        ...fetchedFundingType,
      });
    } catch (error) {
      console.error(`Error fetching fundingtype with ID ${fundingtype.fundingID}:`, error.response.data);
    }
  };

  const updateExistingFundingType = async () => {
    try {
      const fundingtypePayload = { ...newFundingType };

      console.log('Updated fundingtype Payload:', fundingtypePayload);

      const updatedFundingType = await updateFundingType(selectedFundingTypeID, fundingtypePayload);
      setFundingType((prev) => prev.map(inst => (inst.fundingID === selectedFundingTypeID ? updatedFundingType : inst)));
      setIsModalOpen(false);
    } catch (error) {
      console.error(`Error updating fundingtype with ID ${selectedFundingTypeID}:`, error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to update fundingtype: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const deleteExistingFundingType = async (fundingID) => {
    try {
      await deleteFundingType(fundingID);
      setFundingType((prev) => prev.filter(inst => inst.fundingID !== fundingID));
    } catch (error) {
      console.error(`Error deleting fundingtype with ID ${fundingID}:`, error.response.data);
      alert(`Failed to delete fundingtype: ${error.response.data.title}`);
    }
  };

  const closeAddFundingTypeModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setErrors({});
  };

  const deleteFundingTypeHandler = (fundingID) => {
    if (window.confirm(`Are you sure you want to delete fundingtype with ID ${fundingID}?`)) {
      deleteExistingFundingType(fundingID);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">FundingType</h1>
      <div className="p-4">
        <button
          onClick={openAddFundingTypeModal}
          className="bg-blue-500 text-white p-2 rounded mb-4 flex justify-center items-center ml-auto gap-2"
        >
           <span>Funding Type</span> <FaPlus />   
        </button>
        <FundingTypeTable
          fundingtype={fundingtype}
          openEditModal={openEditFundingTypeModal}
          deleteFundingType={deleteFundingTypeHandler}
        />
      </div>
      <Modal style={customStyles} isOpen={isModalOpen} onRequestClose={closeAddFundingTypeModal} contentLabel={editMode ? "Edit FundingType" : "Add fundingtype"}>
        <h2 className="subtitle2 mb-4">{editMode ? 'Edit FundingType' : 'Add FundingType'}</h2>
        <FundingTypeForm 
          formValues={newFundingType} 
          handleInputChange={handleInputChange} 
          handleDateChange={handleDateChange} 
          errors={errors} 
        />
        <div className="flex justify-end mt-4">
          <button onClick={editMode ? updateExistingFundingType : addNewFundingType} className="bg-primary px-5 text-white p-2 rounded mr-2">
            {editMode ? 'Update' : 'Save'}
          </button>
          <button onClick={closeAddFundingTypeModal} className="outline outline-1 outline-primary text-primary px-5 p-2 rounded">
            Cancel
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default AddFundingType;
