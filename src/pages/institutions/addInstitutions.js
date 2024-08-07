import React, { useState, useEffect } from 'react';
import {customStyles} from "../../styles/customStyles"
import { FaPlus } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { splitWordFunc } from '../../utils/splitWordFunc';
import InstitutionForm from '../../components/forms/institutionF';
import InstitutionTable from '../../components/tables/institutionT';
import { addInstitution as addInstitutionService, getInstitutionById, updateInstitution, deleteInstitution, getInstitutions } from '../../services/institutionS';
import Layout from '../../components/layout';
import Modal from 'react-modal';

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
    county: '',
    subCounty: '',
    contactPerson: '',
    contactNumber: '',
    licenseStartDate: '',
    licenseEndDate: '',
    awardLeader: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("ID");

  const [selectedInstitutionId, setSelectedInstitutionId] = useState(null);
  const [filteredInstitutions, setFilteredInstitutions] = useState(institutions);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const fetchedInstitutions = await getInstitutions();
        setInstitutions(fetchedInstitutions);
        console.log(fetchedInstitutions)
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
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setNewInstitution((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewInstitution = async () => {
    try {
      const institutionPayload = { ...newInstitution };

      console.log('New Institution Payload:', institutionPayload);
      const addedInstitution = await addInstitutionService(institutionPayload);
      setInstitutions((prev) => [...prev, addedInstitution]);
      setIsModalOpen(false);
      setErrors({});
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
      county: '',
      subCounty: '',
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
        licenseStartDate: fetchedInstitution.licenseStartDate,
        licenseEndDate: fetchedInstitution.licenseEndDate,
      });
    } catch (error) {
      console.error(`Error fetching institution with ID ${institution.institutionID}:`, error.response.data);
    }
  };

  const updateExistingInstitution = async () => {
    try {
      const institutionPayload = { ...newInstitution };

      console.log('Updated Institution Payload:', institutionPayload);

      const updatedInstitution = await updateInstitution(selectedInstitutionId, institutionPayload);
      setInstitutions((prev) => prev.map(inst => (inst.institutionID === selectedInstitutionId ? updatedInstitution : inst)));
      setIsModalOpen(false);
      setErrors({});
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


//new changes 
const filterInstitutions = (searchTerm, column) => {
  const filtered = institutions?.filter(institution => 
    institution[column].toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredInstitutions(filtered);
};
const handleFilterParameterChange = (event) => {
  const value = event.target.value;
  setSelectedColumn(value);
  filterInstitutions(searchTerm, value);
};

//handle search change
const handleSearchChange = (event) => {
  const value = event.target.value;
  setSearchTerm(value);
  filterInstitutions(value, selectedColumn);
};



  return (
    <Layout>
      <div className="">
        <h1 className="text-2xl font-[600] ml-3 mb-4">Award Center</h1>
        <div className="p-4">
          <div className="flex justify-between">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 mr-auto text-white p-2 flex justify-center items-center gap-2 rounded mb-4">
              <FaPlus /> <span>Award Center</span>
            </button>
            <form className="px-2 border-2 border-greys rounded-md flex justify-center items-center gap-2 mb-4">
              <select value={selectedColumn} onChange={handleFilterParameterChange}>
                {institutions.length > 0 ? Object.keys(institutions[1]).map(op=><option value={op}>{splitWordFunc(op)}</option>) : <option>No filter property</option>}
              </select>
              <input
                placeholder="search"
                onChange={handleSearchChange}
                className="rounded-sm h-10 outline outline-none focus:outline-none  px-2 my-1"
              />
              <button className="text-[20px]">
                <FiSearch />
              </button>
            </form>
          </div>
          <InstitutionTable
            institutions={filteredInstitutions}
            openEditModal={openEditInstitutionModal}
            deleteInstitution={deleteInstitutionHandler}
          />
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeAddInstitutionModal}
          contentLabel={editMode ? "Edit Institution" : "Add Institution"}
          style={customStyles}>
          <h2 className="subtitle1 mb-4">
            {editMode ? "Edit Award Center" : "Add Award Center "}
          </h2>
          <InstitutionForm
            formValues={newInstitution}
            handleInputChange={handleInputChange}
            handleDateChange={handleDateChange}
            errors={errors}
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={editMode ? updateExistingInstitution : addNewInstitution}
              className="bg-primary px-5 text-white p-2 rounded mr-2">
              {editMode ? "Update" : "Save"}
            </button>
            <button
              onClick={closeAddInstitutionModal}
              className="outline outline-1 outline-primary text-primary px-5 p-2 rounded">
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default AddInstitution;
