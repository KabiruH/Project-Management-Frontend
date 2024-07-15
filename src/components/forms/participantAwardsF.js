import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css';
import { getParticipantById } from '../../services/participantS';

const AwardsForm = ({ formValues, handleInputChange, handleDateChange, errors }) => {
   
  const handleAdminInputChange  = async (e) => {
    const { value } = e.target;
    handleInputChange(e); // Update the adminNo field value
    if (value) {
      try {
        const participant = await getParticipantById(value);
        if (participant) {
          handleInputChange({ target: { name: 'name', value: participant.name } });
          handleInputChange({ target: { name: 'institutionName', value: participant.institutionName } });
          handleInputChange({ target: { name: 'levelName', value: participant.levelName } });
        }
      } catch (error) {
        console.error('Error fetching participant data:', error);
      }
    }
  };

    return (
    <form className={styles.form}>
      <div className="space-y-4">
        <div>
          <label htmlFor="awardID">Award ID:</label>
          <Input
            name="awardID"
            placeholder="Award ID"
            value={formValues.awardID}
            onChange={handleInputChange}
          />
          {errors.awardID && <p className="text-red-500">{errors.awardID[0]}</p>}
        </div>
        <div>
  <label htmlFor="adminNo">AdminNo:</label>
  <Input
    name="adminNo"
    placeholder="AdminNo"
    value={formValues.adminNo}
    onChange={handleAdminInputChange}
  />
  {errors.adminNo && <p className="text-red-500">{errors.adminNo[0]}</p>}
</div>
        <div>
          <label htmlFor="name">Student Name:</label>
          <Input
            name="name"
            placeholder="Student Name"
            value={formValues.name}
            onChange={handleInputChange}
            disabled 
          />
          {errors.studentName && <p className="text-red-500">{errors.studentName[0]}</p>}
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
          <label htmlFor="levelName">Award Level:</label>
          <Input
            name="levelName"
            placeholder="Award Level"
            value={formValues.levelName}
            onChange={handleInputChange}
            disabled 
          />
          {errors.levelName && <p className="text-red-500">{errors.levelName[0]}</p>}
        </div>
        
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <Input
            name="startDate"
            type="date"
            placeholder="Start Date"
            value={formValues.startDate}
            onChange={handleDateChange}
          />
          {errors.startDate && <p className="text-red-500">{errors.startDate[0]}</p>}
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <Input
            name="endDate"
            type="date"
            placeholder="End Date"
            value={formValues.endDate}
            onChange={handleDateChange}
          />
          {errors.endDate && <p className="text-red-500">{errors.endDate[0]}</p>}
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <Input
            name="status"
            placeholder="Status"
            value={formValues.status}
            onChange={handleInputChange}
          />
          {errors.status && <p className="text-red-500">{errors.status[0]}</p>}
        </div>
        <div>
          <label htmlFor="notes">Notes:</label>
          <Input
            name="notes"
            placeholder="Notes"
            value={formValues.notes}
            onChange={handleInputChange}
          />
          {errors.notes && <p className="text-red-500">{errors.notes[0]}</p>}
        </div>
      </div>
    </form>
  );
};

export default AwardsForm;
