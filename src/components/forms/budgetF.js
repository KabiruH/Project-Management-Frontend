import React from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css'; // Correct import for CSS modules

const BudgetForm = ({ formValues, handleInputChange, handleDateChange, errors }) => {


  
  return (
    <form className={styles.form}>
      <div className="space-y-4">
        <div>
          <label htmlFor="projectID">Project ID:</label>
          <Input
            name="projectID"
            placeholder="Project ID"
            value={formValues.projectID}
            onChange={handleInputChange}
          />
          {errors.projectID && <p className="text-red-500">{errors.projectID[0]}</p>}
        </div>
        <div>
          <label htmlFor="projectName">Project Name:</label>
          <Input
            name="projectName"
            placeholder="Project Name"
            value={formValues.projectName}
            onChange={handleInputChange}
          />
          {errors.projectName && <p className="text-red-500">{errors.projectName[0]}</p>}
        </div>
        <div>
          <label htmlFor="coordinator">Coordinator:</label>
          <Input
            name="coordinator"
            placeholder="Coordinator"
            value={formValues.coordinator}
            onChange={handleInputChange}
          />
          {errors.coordinator && <p className="text-red-500">{errors.coordinator[0]}</p>}
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <Input
            name="startDate"
            placeholder="Start Date"
            type="date"
            value={formValues.startDate}
            onChange={handleDateChange}
          />
          {errors.startDate && <p className="text-red-500">{errors.startDate[0]}</p>}
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <Input
            name="endDate"
            placeholder="End Date"
            type="date"
            value={formValues.endDate}
            onChange={handleDateChange}
          />
          {errors.endDate && <p className="text-red-500">{errors.endDate[0]}</p>}
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <Input
            name="description"
            placeholder="Description"
            value={formValues.description}
            onChange={handleInputChange}
          />
          {errors.description && <p className="text-red-500">{errors.description[0]}</p>}
        </div>
        <div>
          <label htmlFor="cost">Cost:</label>
          <Input
            name="cost"
            placeholder="Cost"
            value={formValues.cost}
            onChange={handleInputChange}
          />
          {errors.cost && <p className="text-red-500">{errors.cost[0]}</p>}
        </div>
        <div>
          <label htmlFor="institutionName">Institution Name:</label>
          <Input
            name="institutionName"
            placeholder="Institution Name"
            value={formValues.institutionName}
            onChange={handleInputChange}
          />
          {errors.institutionName && <p className="text-red-500">{errors.institutionName[0]}</p>}
        </div>
        <div>
          <label htmlFor="county">County:</label>
          <Input
            name="county"
            placeholder="County"
            value={formValues.county}
            onChange={handleInputChange}
          />
          {errors.county && <p className="text-red-500">{errors.county[0]}</p>}
        </div>
        <div>
          <label htmlFor="subCounty">Sub County:</label>
          <Input
            name="subCounty"
            placeholder="Sub County"
            value={formValues.subCounty}
            onChange={handleInputChange}
          />
          {errors.subCounty && <p className="text-red-500">{errors.subCounty[0]}</p>}
        </div>
      </div>
    </form>
  );
};

export default BudgetForm;
