import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css';
import { getParticipantById } from '../../services/participantS';
import { getProjects } from '../../services/projectService';

const ParticipantProjectForm = ({ formValues, setFormValues, handleDateChange, errors }) => {
  const [allProjects, setAllProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getProjects();
        setAllProjects(fetchedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (formValues.institutionName) {
      // Filter projects based on the participant's institution
      const institutionProjects = allProjects.filter(
        (project) => project.institutionName === formValues.institutionName
      );
      setFilteredProjects(institutionProjects);
    }
  }, [formValues.institutionName, allProjects]);

  const handleAdminInputChange = async (e) => {
    const { value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      participantID: value,
    }));

    if (value) {
      try {
        const participant = await getParticipantById(value);
        if (participant) {
          setFormValues((prevValues) => ({
            ...prevValues,
            participantName: participant.name,
            institutionName: participant.institutionName,
            projects: participant.projects || [],
          }));
          const institutionProjects = allProjects.filter(
            (project) => project.institutionName === participant.institutionName
          );
          setFilteredProjects(institutionProjects);
        }
      } catch (error) {
        console.error('Error fetching participant details:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleProjectSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormValues((prevValues) => ({
      ...prevValues,
      projects: selectedOptions,
    }));
  };

  const handleRemoveProject = (projectId) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      projects: prevValues.projects.filter((id) => id !== projectId),
    }));
  };

  return (
    <form className={styles.form}>
      <div className="space-y-4">
        <div>
          <label htmlFor="participantID">Participant ID:</label>
          <Input
            name="participantID"
            placeholder="Admin Number"
            value={formValues.participantID}
            onChange={handleAdminInputChange}
          />
          {errors.participantID && <p className="text-red-500">{errors.participantID[0]}</p>}
        </div>

        <div>
          <label htmlFor="participantName">Name:</label>
          <Input
            name="participantName"
            placeholder="Participant Name"
            value={formValues.participantName}
            onChange={handleInputChange}
          />
          {errors.participantName && <p className="text-red-500">{errors.participantName[0]}</p>}
        </div>

        <div>
          <label htmlFor="institutionID">Institution:</label>
          <Input
            name="institutionName"
            placeholder="Institution Name"
            value={formValues.institutionName}
            onChange={handleInputChange}
            disabled
          />
          {errors.institutionName && <p className="text-red-500">{errors.institutionName[0]}</p>}
        </div>
       
        <div>
          <label htmlFor="projects">Projects:</label>
          {loadingProjects ? (
            <p>Loading projects...</p>
          ) : (
            <>

              <select
                name="projects"
                multiple
                value={formValues.projects || []}
                onChange={handleProjectSelectChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {filteredProjects.map((project) => (
                  <option key={project.projectID} value={project.projectID}>
                    {project.projectName}
                  </option>
                ))}
              </select>

            </>
          )}
          {errors.projects && <p className="text-red-500">{errors.projects[0]}</p>}
        </div>
      </div>
      {formValues.projects?.length > 0 && (
        <div className="selected-projects">
          {formValues.projects.map((projectId) => {
            const project = allProjects.find((proj) => proj.projectID === projectId);
            return (
              <div key={projectId} className="selected-project">
                <span>{project?.projectName}</span>
                <button type="button" onClick={() => handleRemoveProject(projectId)}>
                  ×
                </button>
              </div>
            );
          })}
        </div>
      )}
    </form>
  );
};

export default ParticipantProjectForm;
