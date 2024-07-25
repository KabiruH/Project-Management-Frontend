import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FaPlus } from "react-icons/fa6";

import { customStyles } from '../../styles/customStyles';
import Layout from '../../components/layout';
import ProjectForm from '../../components/forms/projectForm';
import ProjectTable from '../../components/tables/projectTable';
import { addProject as addProjectService, getProjectById, updateProject, deleteProject, getProjects } from '../../services/projectService';


Modal.setAppElement('#root');

const AddProject = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    projectId: '',
    projectName: '',
    institutionName: '',
    startDate: '',
    endDate: '',
    cost: '',
    subCounty: '',
    county: '',
    description: '',
    coordinator: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error.response.data);
      }
    };

    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewProject = async () => {
    try {
      const projectPayload = { ...newProject };

      console.log('New Project Payload:', projectPayload);
      const addedProject = await addProjectService(projectPayload);
      setProjects((prev) => [...prev, addedProject]);
      setIsModalOpen(false);
      setErrors({});
    } catch (error) {
      console.error('Error adding project:', error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to add project: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const openAddProjectModal = () => {
    setEditMode(false);
    setIsModalOpen(true);
    setNewProject({
      projectId: '',
      projectName: '',
      institutionName: '',
      startDate: '',
      endDate: '',
      cost: '',
      subCounty: '',
      county: '',
      description: '',
      coordinator: '',
      notes: '',
    });
  };

  const openEditProjectModal = async (project) => {
    try {
      console.log('Fetching project with ID:', project.projectID);
      const fetchedProject = await getProjectById(project.projectID);
      console.log('Fetched Project:', fetchedProject);
  
      setEditMode(true); // Sets the form to edit mode
      setIsModalOpen(true); // Opens the modal
      setSelectedProjectId(project.projectID); // Sets the ID of the selected project
  
      setNewProject({
        ...fetchedProject,
        startDate: fetchedProject.startDate,
        endDate: fetchedProject.endDate,
      }); // Initializes form fields with fetched project data
    } catch (error) {
      console.error(`Error fetching project with ID ${project.projectID}:`, error.message);
      if (error.response) {
        console.error(error.response.data);
      } else {
        alert('Failed to fetch project. Please check your network connection or CORS configuration.');
      }
    }
  };
  
  

  const updateExistingProject = async () => {
    try {
      const projectPayload = { ...newProject };

      console.log('Updated Project Payload:', projectPayload);

      const updatedProject = await updateProject(selectedProjectId, projectPayload);
      setProjects((prev) => prev.map(proj => (proj.projectID === selectedProjectId ? updatedProject : proj)));
      setIsModalOpen(false);
      setErrors({});
    } catch (error) {
      console.error(`Error updating project with ID ${selectedProjectId}:`, error.response.data);
      setErrors(error.response.data.errors || {});
      alert(`Failed to update project: ${error.response.data.title}\nDetails: ${JSON.stringify(error.response.data.errors, null, 2)}`);
    }
  };

  const deleteExistingProject = async (projectID) => {
    try {
      await deleteProject(projectID);
      setProjects((prev) => prev.filter(proj => proj.projectID !== projectID));
    } catch (error) {
      console.error(`Error deleting project with ID ${projectID}:`, error.response.data);
      alert(`Failed to delete project: ${error.response.data.title}`);
    }
  };

  const closeAddProjectModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setErrors({});
  };

  const deleteProjectHandler = (projectID) => {
    if (window.confirm(`Are you sure you want to delete project with ID ${projectID}?`)) {
      deleteExistingProject(projectID);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <div className="p-4">
        <button
          onClick={openAddProjectModal}
          className="bg-blue-500 text-white p-2 rounded mb-4  flex justify-center items-center mr-auto gap-2"
        >
           <FaPlus /> <span>Project</span>
        </button>
        <ProjectTable
          projects={projects}
          openEditModal={openEditProjectModal}
          deleteProject={deleteProjectHandler}
        />
      </div>
      <Modal style={customStyles} isOpen={isModalOpen} onRequestClose={closeAddProjectModal} contentLabel={editMode ? "Edit Project" : "Add Project"}>
        <h2 className="subtitle2 mb-4">{editMode ? 'Edit Project' : 'Add Project'}</h2>
        <ProjectForm
          formValues={newProject}
          handleInputChange={handleInputChange}
          handleDateChange={handleDateChange}
          errors={errors}
        />
        <div className="flex justify-end mt-4">
          <button onClick={editMode ? updateExistingProject : addNewProject} className="bg-primary text-white px-5 p-2 rounded mr-2">
            {editMode ? 'Update' : 'Save'}
          </button>
          <button onClick={closeAddProjectModal} className="outline outline-1 outline-primary px-5 text-primary p-2 rounded">
            Cancel
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default AddProject;