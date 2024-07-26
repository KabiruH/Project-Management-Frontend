import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaPlus } from "react-icons/fa6";

import { customStyles } from '../../styles/customStyles';
import PartnerTypesForm from '../../components/forms/partnerTypeF';
import PartnerTypesTable from '../../components/tables/partnerTypeT';
import { addPartnerType as addPartnerTypeService, getPartnerTypeById, updatePartnerType, deletePartnerType, getPartnerType } from '../../services/partnerTypeS';
import Layout from '../../components/layout';

Modal.setAppElement('#root');

const AddPartnerTypes = () => {
  const [partnertypes, setPartnerTypes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPartnerTypes, setNewPartnerTypes] = useState({
    typeID: '',
    typeName: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedPartnerTypesID, setSelectedPartnerTypesID] = useState(null);

  useEffect(() => {
    const fetchedpartnertypes = async () => {
      try {
        const fetchedPartnerTypes = await getPartnerType();
        setPartnerTypes(fetchedPartnerTypes);
      } catch (error) {
        console.error('Error fetching partnertypes:', error.response.data);
      }
    };

    fetchedpartnertypes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPartnerTypes((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setNewPartnerTypes((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewPartnerTypes = async () => {
    try {
      const partnertypesPayload = {
        typeID: String(newPartnerTypes.typeID), // Ensure PartnerTypesID is a string
        typeName: newPartnerTypes.typeName,
        notes: newPartnerTypes.notes,
      };
  
      console.log('New partnertypes Payload:', partnertypesPayload);
      const addedpartnertypes = await addPartnerTypeService(partnertypesPayload);
      setPartnerTypes((prev) => [...prev, addedpartnertypes]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding partnertypes:', error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to add partnertypes: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };
  

  const openAddPartnerTypesModal = () => {
    setEditMode(false);
    setIsModalOpen(true);
    setNewPartnerTypes({
      typeID: '',
      typeName: '',
      notes: '',
    });
  };

  const openEditPartnerTypesModal = async (partnertypes) => {
    try {
      const fetchedPartnerTypes = await getPartnerTypeById(String(partnertypes.typeID));
      setEditMode(true);
      setIsModalOpen(true);
      setSelectedPartnerTypesID(partnertypes.typeID);
      setNewPartnerTypes({
        ...fetchedPartnerTypes,
      });
    } catch (error) {
      console.error(`Error fetching partnertypes with ID ${partnertypes.typeID}:`, error.response.data);
    }
  };

  const updateExistingPartnerTypes = async () => {
    try {
      const partnertypesPayload = { ...newPartnerTypes };

      console.log('Updated partnertypes Payload:', partnertypesPayload);

      const updatedPartnerTypes = await updatePartnerType(selectedPartnerTypesID, partnertypesPayload);
      setPartnerTypes((prev) => prev.map(inst => (inst.typeID === selectedPartnerTypesID ? updatedPartnerTypes : inst)));
      setIsModalOpen(false);
    } catch (error) {
      console.error(`Error updating partnertypes with ID ${selectedPartnerTypesID}:`, error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to update partnertypes: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const deleteExistingPartnerTypes = async (typeID) => {
    try {
      await deletePartnerType(typeID);
      setPartnerTypes((prev) => prev.filter(inst => inst.typeID !== typeID));
    } catch (error) {
      console.error(`Error deleting partnertypes with ID ${typeID}:`, error.response.data);
      alert(`Failed to delete partnertypes: ${error.response.data.title}`);
    }
  };

  const closeAddPartnerTypesModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setErrors({});
  };

  const deletePartnerTypeHandler = (typeID) => {
    if (window.confirm(`Are you sure you want to delete partnertypes with ID ${typeID}?`)) {
      deleteExistingPartnerTypes(typeID);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Partner Types</h1>
      <div className="p-4">
        <button
          onClick={openAddPartnerTypesModal}
          className="bg-blue-500 text-white p-2 rounded mb-4 flex justify-center items-center mr-auto gap-2"
        >
         <FaPlus />  <span>Partner Types</span>   
        </button>
        <PartnerTypesTable
          partnertypes={partnertypes}
          openEditModal={openEditPartnerTypesModal}
          deletePartnerType={deletePartnerTypeHandler}
        />
      </div>
      <Modal style={customStyles} isOpen={isModalOpen} onRequestClose={closeAddPartnerTypesModal} contentLabel={editMode ? "Edit Partner Types" : "Add partnertypes"}>
        <h2 className="subtitle2 mb-4">{editMode ? 'Edit Partner Types' : 'Add Partner Types'}</h2>
        <PartnerTypesForm 
          formValues={newPartnerTypes} 
          handleInputChange={handleInputChange} 
          handleDateChange={handleDateChange} 
          errors={errors} 
        />
        <div className="flex justify-end mt-4">
          <button onClick={editMode ? updateExistingPartnerTypes : addNewPartnerTypes} className="bg-primary px-5 text-white p-2 rounded mr-2">
            {editMode ? 'Update' : 'Save'}
          </button>
          <button onClick={closeAddPartnerTypesModal} className="outline outline-1 outline-primary text-primary px-5 p-2 rounded">
            Cancel
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default AddPartnerTypes;
