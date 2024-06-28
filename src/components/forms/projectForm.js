import React from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css';
import useForm from '../../hooks/useForm';

const ProjectForm = ({ onSubmit }) => {
  const initialState = {
    projectID: '',
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
  };
  
  const { formValues, handleInputChange, setFormValues } = useForm(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className="space-y-4">
      <Input
          name="projectID"
          placeholder="Project ID"
          value={formValues.projectID}
          onChange={handleInputChange}
        />
        <Input
          name="projectName"
          placeholder="Project Name"
          value={formValues.projectName}
          onChange={handleInputChange}
        />
        <Input
          name="institutionName"
          placeholder="Institution"
          value={formValues.institutionName}
          onChange={handleInputChange}
        />
        <Input
          name="startDate"
          placeholder="Start Date"
          value={formValues.startDate}
          onChange={handleInputChange}
        />
        <Input
          name="endDate"
          placeholder="End Date"
          value={formValues.endDate}
          onChange={handleInputChange}
        />
        <Input
          name="cost"
          placeholder="Cost"
          value={formValues.cost}
          onChange={handleInputChange}
        />
        <Input
          name="subCounty"
          placeholder="Sub County"
          value={formValues.subCounty}
          onChange={handleInputChange}
        />
        <Input
          name="county"
          placeholder="County"
          value={formValues.county}
          onChange={handleInputChange}
        />
        <Input
          name="description"
          placeholder="Description"
          value={formValues.description}
          onChange={handleInputChange}
        />
        <Input
          name="coordinator"
          placeholder="Coordinator's Name"
          value={formValues.coordinator}
          onChange={handleInputChange}
        />
        <Input
          name="notes"
          placeholder="Notes"
          value={formValues.notes}
          onChange={handleInputChange}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
