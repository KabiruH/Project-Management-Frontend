import React from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css'; // Correct import for CSS modules

const InstitutionForm = ({ formValues, handleInputChange, onSubmit }) => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }} className={styles.form}>
      <div className="space-y-4">
        <Input
          name="institutionID"
          placeholder="Institution ID"
          value={formValues.institutionID}
          onChange={handleInputChange}
        />
        <Input
          name="institutionName"
          placeholder="Institution Name"
          value={formValues.institutionName}
          onChange={handleInputChange}
        />
        <Input
          name="stageID"
          placeholder="Stage ID"
          value={formValues.stageID}
          onChange={handleInputChange}
        />
        <Input
          name="statusID"
          placeholder="Status ID"
          value={formValues.statusID}
          onChange={handleInputChange}
        />
        <Input
          name="institutionEmail"
          placeholder="Institution Email"
          value={formValues.institutionEmail}
          onChange={handleInputChange}
        />
        <Input
          name="institutionContact"
          placeholder="Institution Contact"
          value={formValues.institutionContact}
          onChange={handleInputChange}
        />
        <Input
          name="subCounty"
          placeholder="Sub County"
          value={formValues.subCounty}
          onChange={handleInputChange}
        />
        <Input
          name="countyID"
          placeholder="County ID"
          type="number"
          value={formValues.countyID}
          onChange={handleInputChange}
        />
        <Input
          name="contactPerson"
          placeholder="Contact Person"
          value={formValues.contactPerson}
          onChange={handleInputChange}
        />
        <Input
          name="contactNumber"
          placeholder="Contact Number"
          value={formValues.contactNumber}
          onChange={handleInputChange}
        />
        <Input
          name="licenseStartDate"
          placeholder="License Start Date"
          value={formValues.licenseStartDate}
          onChange={handleInputChange}
        />
        <Input
          name="licenseEndDate"
          placeholder="License End Date"
          value={formValues.licenseEndDate}
          onChange={handleInputChange}
        />
        <Input
          name="awardLeader"
          placeholder="Award Leader"
          value={formValues.awardLeader}
          onChange={handleInputChange}
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={formValues.notes}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
          Submit
        </button>
      </div>
    </form>
  );
};

export default InstitutionForm;
