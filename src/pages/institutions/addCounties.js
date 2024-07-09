import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { customStyles } from '../../styles/customStyles';
import CountyForm from '../../components/forms/countiesF';
import CountyTable from '../../components/tables/countiesT';
import { addCounty as addCountyService, getCountyById, updateCounty, deleteCounty, getCounties } from '../../services/countyS';
import Layout from '../../components/layout';

Modal.setAppElement('#root');

const AddCounty = () => {
  const [counties, setCounties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCounty, setNewCounty] = useState({
    countyID: '',
    countyName: '',
    subCounty: '',
    region: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedCountyId, setSelectedCountyId] = useState(null);

  useEffect(() => {
    const fetchCounties = async () => {
      try {
        const fetchedCounties = await getCounties();
        setCounties(fetchedCounties);
      } catch (error) {
        console.error('Error fetching counties:', error.response.data);
      }
    };

    fetchCounties();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCounty((prev) => ({
      ...prev,
      [name]: name === 'countyID' ? parseInt(value, 10) : value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setNewCounty((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewCounty = async () => {
    try {
      const countyPayload = {
        countyID: String(newCounty.countyID), // Ensure countyID is a string
        countyName: newCounty.countyName,
        subCounty: newCounty.subCounty,
        region: newCounty.region,
        notes: newCounty.notes,
      };
  
      console.log('New County Payload:', countyPayload);
      const addedCounty = await addCountyService(countyPayload);
      setCounties((prev) => [...prev, addedCounty]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding county:', error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to add county: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };
  

  const openAddCountyModal = () => {
    setEditMode(false);
    setIsModalOpen(true);
    setNewCounty({
      countyID: '',
      countyName: '',
      subCounty: '',
      region: '',
      notes: '',
    });
  };

  const openEditCountyModal = async (county) => {
    try {
      const fetchedCounty = await getCountyById(String(county.countyID));
      setEditMode(true);
      setIsModalOpen(true);
      setSelectedCountyId(county.countyID);
      setNewCounty({
        ...fetchedCounty,
      });
    } catch (error) {
      console.error(`Error fetching county with ID ${county.countyID}:`, error.response.data);
    }
  };

  const updateExistingCounty = async () => {
    try {
      const countyPayload = { ...newCounty };

      console.log('Updated County Payload:', countyPayload);

      const updatedCounty = await updateCounty(selectedCountyId, countyPayload);
      setCounties((prev) => prev.map(inst => (inst.countyID === selectedCountyId ? updatedCounty : inst)));
      setIsModalOpen(false);
    } catch (error) {
      console.error(`Error updating county with ID ${selectedCountyId}:`, error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to update county: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const deleteExistingCounty = async (countyId) => {
    try {
      await deleteCounty(countyId);
      setCounties((prev) => prev.filter(inst => inst.countyID !== countyId));
    } catch (error) {
      console.error(`Error deleting county with ID ${countyId}:`, error.response.data);
      alert(`Failed to delete county: ${error.response.data.title}`);
    }
  };

  const closeAddCountyModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setErrors({});
  };

  const deleteCountyHandler = (countyId) => {
    if (window.confirm(`Are you sure you want to delete county with ID ${countyId}?`)) {
      deleteExistingCounty(countyId);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Counties</h1>
      <div className="p-4">
        <button
          onClick={openAddCountyModal}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          Add County
        </button>
        <CountyTable
          counties={counties}
          openEditModal={openEditCountyModal}
          deleteCounty={deleteCountyHandler}
        />
      </div>
      <Modal style={customStyles} isOpen={isModalOpen} onRequestClose={closeAddCountyModal} contentLabel={editMode ? "Edit County" : "Add County"}>
        <h2 className="subtitle2 mb-4">{editMode ? 'Edit County' : 'Add County'}</h2>
        <CountyForm 
          formValues={newCounty} 
          handleInputChange={handleInputChange} 
          handleDateChange={handleDateChange} 
          errors={errors} 
        />
        <div className="flex justify-end mt-4">
          <button onClick={editMode ? updateExistingCounty : addNewCounty} className="bg-primary px-10 text-white p-2 rounded mr-2">
            {editMode ? 'Update' : 'Save'}
          </button>
          <button onClick={closeAddCountyModal} className="outline outline-1 outline-primary px-10 text-primary p-2 rounded">
            Cancel
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default AddCounty;
