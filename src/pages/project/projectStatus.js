import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import {customStyles} from "../../styles/customStyles"
import ProjectStatusForm from '../../components/forms/projectStatusF';
import ProjectStatusTable from '../../components/tables/projectStatusT';
import { addProjectStatus, getProjectStatusById, updateProjectStatus, deleteProjectStatus, getProjectStatuses } from '../../services/projectStatusS';
import Layout from '../../components/layout';

Modal.setAppElement('#root');

const AddProjectStatus = () => {
  const [projectstatuses, setProjectStatuses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectStatus, setNewProjectStatus] = useState({
    ProjectStatusID: '',
    StatusName: '',
    Notes: '',
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedProjectStatusID, setSelectedProjectStatusID] = useState(null);

  useEffect(() => {
    const fetchProjectStatuses = async () => {
      try {
        const fetchedProjectStatuses = await getProjectStatuses();
        console.log('Fetched Project Statuses:', fetchedProjectStatuses);
        setProjectStatuses(fetchedProjectStatuses);
      } catch (error) {
        console.error('Error fetching project statuses:', error);
      }
    };

    fetchProjectStatuses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProjectStatus((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewProjectStatus = async () => {
    try {
      const statusPayload = { ...newProjectStatus };
      console.log('New project status payload:', statusPayload);
      const addedStatus = await addProjectStatus(statusPayload);
      setProjectStatuses((prev) => [...prev, addedStatus]);
      setIsModalOpen(false);
    } catch (error) {
      if (error.response) {
        console.error('Error adding project status:', error.response.data);
        setErrors(error.response.data.errors || {});
        alert(`Failed to add project status: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
      } else {
        console.error('Error adding project status:', error.message);
        alert('An unexpected error occurred.');
      }
    }
  };

  const openProjectStatusModal = () => {
    setEditMode(false);
    setIsModalOpen(true);
    setNewProjectStatus({
      ProjectStatusID: '',
      StatusName: '',
      Notes: '',
    });
  };

  const openEditProjectStatusModal = async (status) => {
    try {
        const fetchedStatus = await getProjectStatusById(status.ProjectStatusID);
        setEditMode(true);
        setIsModalOpen(true);
        setSelectedProjectStatusID(status.ProjectStatusID);
        setNewProjectStatus({
            ...fetchedStatus,
        });
    } catch (error) {
        console.error(`Error fetching project status with ID ${status.ProjectStatusID}:`, error.response ? error.response.data : error.message);
    }
};

  const updateExistingProjectStatus = async () => {
    try {
      const statusPayload = { ...newProjectStatus };
      console.log('Updated project status payload:', statusPayload);
      const updatedStatus = await updateProjectStatus(selectedProjectStatusID, statusPayload);
      setProjectStatuses((prev) => prev.map(status => (status.ProjectStatusID === selectedProjectStatusID ? updatedStatus : status)));
      setIsModalOpen(false);
    } catch (error) {
      if (error.response) {
        console.error(`Error updating project status with ID ${selectedProjectStatusID}:`, error.response.data);
        setErrors(error.response.data.errors || {});
        alert(`Failed to update project status: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
      } else {
        console.error(`Error updating project status with ID ${selectedProjectStatusID}:`, error.message);
        alert('An unexpected error occurred.');
      }
    }
  };

  const deleteExistingProjectStatus = async (ProjectStatusID) => {
    try {
        await deleteProjectStatus(ProjectStatusID);
        setProjectStatuses((prev) => prev.filter(status => status.ProjectStatusID !== ProjectStatusID));
    } catch (error) {
        console.error(`Error deleting project status with ID ${ProjectStatusID}:`, error.response ? error.response.data : error.message);
        alert(`Failed to delete project status: ${error.response ? error.response.data.title : error.message}`);
    }
};

  const closeAddProjectStatusModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setErrors({});
  };

  const deleteProjectStatusHandler = (ProjectStatusID) => {
    if (window.confirm(`Are you sure you want to delete project status with ID ${ProjectStatusID}?`)) {
        deleteExistingProjectStatus(ProjectStatusID);
    }
};

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Project Statuses</h1>
      <div className="p-4">
        <button
          onClick={openProjectStatusModal}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          Add Project Status
        </button>
        <ProjectStatusTable
          projectstatuses={projectstatuses}
          openEditModal={openEditProjectStatusModal}
          deleteStatus={deleteProjectStatusHandler}
        />
      </div>
      <Modal style={customStyles} isOpen={isModalOpen} onRequestClose={closeAddProjectStatusModal} contentLabel={editMode ? "Edit Project Status" : "Add Project Status"}>
        <h2 className="subtitle2 mb-4">{editMode ? 'Edit Project Status' : 'Add Project Status'}</h2>
        <ProjectStatusForm
          formValues={newProjectStatus}
          handleInputChange={handleInputChange}
          errors={errors}
        />
        <div className="flex justify-end mt-4">
          <button onClick={editMode ? updateExistingProjectStatus : addNewProjectStatus} className="bg-primary px-5 text-white p-2 rounded mr-2">
            {editMode ? 'Update' : 'Save'}
          </button>
          <button onClick={closeAddProjectStatusModal} className="outline outline-1 outline-primary text-primary px-5 p-2 rounded">
            Cancel
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default AddProjectStatus;
