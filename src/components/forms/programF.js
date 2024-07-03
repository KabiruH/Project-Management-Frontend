import React from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css'; // Correct import for CSS modules

const ProgramForm = ({ formValues, handleInputChange, handleDateChange, errors }) => {
  return (
    <form className={styles.form}>
      <div className="space-y-4">
        <div>
          <Input
            name="programID"
            placeholder="Program ID"
            value={formValues.programID}
            onChange={handleInputChange}
          />
          {errors.programID && <p className="text-red-500">{errors.programID[0]}</p>}
        </div>
        <div>
          <Input
            name="programName"
            placeholder="Program Name"
            value={formValues.programName}
            onChange={handleInputChange}
          />
          {errors.programName && <p className="text-red-500">{errors.programName[0]}</p>}
        </div>
        <div>
          <Input
            name="institutionName"
            placeholder="Institution Name"
            value={formValues.institutionName}
            onChange={handleInputChange}
          />
          {errors.institutionName && <p className="text-red-500">{errors.institutionName[0]}</p>}
        </div>
        <div>
          <Input
            name="startDate"
            placeholder="Start Date"
            type="date"
            value={formValues.startDate}
            onChange={handleDateChange} // Make sure this is correct
          />
          {errors.startDate && <p className="text-red-500">{errors.startDate[0]}</p>}
        </div>
        <div>
          <Input
            name="endDate"
            placeholder="End Date"
            type="date"
            value={formValues.endDate}
            onChange={handleDateChange} // Make sure this is correct
          />
          {errors.endDate && <p className="text-red-500">{errors.endDate[0]}</p>}
        </div>
        <div>
          <Input
            name="cost"
            placeholder="Program Cost"
            value={formValues.cost}
            onChange={handleInputChange}
          />
          {errors.cost && <p className="text-red-500">{errors.cost[0]}</p>}
        </div>
        <div>
          <Input
            name="subCounty"
            placeholder="Sub County"
            value={formValues.subCounty}
            onChange={handleInputChange}
          />
          {errors.subCounty && <p className="text-red-500">{errors.subCounty[0]}</p>}
        </div>
        <div>
          <Input
            name="county"
            placeholder="County"
            value={formValues.county}
            onChange={handleInputChange}
          />
          {errors.county && <p className="text-red-500">{errors.county[0]}</p>}
        </div>
        <div>
          <Input
            name="description"
            placeholder="Description"
            value={formValues.description}
            onChange={handleInputChange}
          />
          {errors.description && <p className="text-red-500">{errors.description[0]}</p>}
        </div>
        <div>
          <Input
            name="coordinator"
            placeholder="Program Coordinator"
            value={formValues.coordinator}
            onChange={handleInputChange}
          />
          {errors.coordinator && <p className="text-red-500">{errors.coordinator[0]}</p>}
        </div>
      </div>
    </form>
  );
};

export default ProgramForm;
