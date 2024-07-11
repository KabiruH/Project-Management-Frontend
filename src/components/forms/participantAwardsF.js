import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css';
import { getParticipantById } from '../../services/participantS';

const AwardsForm = ({ formValues, handleInputChange, handleDateChange, errors }) => {
    const [studentName, setStudentName] = useState('');
  const [awardLevel, setAwardLevel] = useState('');

  const handleAdminInputChange  = async (e) => {
    const { value } = e.target;
    handleInputChange(e); // Update the adminNo field value
    if (value) {
      try {
        const participant = await getParticipantById(value);
        if (participant) {
          setStudentName({ target: { name: 'name', value: participant.name } });
          handleInputChange({ target: { name: 'institutionName', value: participant.institutionName } });
          setAwardLevel({ target: { name: 'awardName', value: participant.awardLevel } });
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
          <label htmlFor="studentName">Student Name:</label>
          <Input
            name="studentName"
            placeholder="Student Name"
            value={formValues.studentName}
            onChange={handleInputChange}
            disabled 
          />
          {errors.studentName && <p className="text-red-500">{errors.name[0]}</p>}
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
          <label htmlFor="awardLevel">Award Level:</label>
          <Input
            name="awardLevel"
            placeholder="Award Level"
            value={formValues.awardLevel}
            onChange={handleInputChange}
            disabled 
          />
          {errors.awardName && <p className="text-red-500">{errors.awardName[0]}</p>}
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
