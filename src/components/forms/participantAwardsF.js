import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css';
import { getParticipantById } from '../../services/participantS';
import { getLevels } from '../../services/participantLevelsS';

const AwardsForm = ({ formValues, handleInputChange, handleDateChange, errors }) => {
  const [levels, setLevels] = useState([]);
  const [loadingLevels, setLoadingLevels] = useState(false);

  const handleAdminInputChange = async (e) => {
    const { value } = e.target;
    handleInputChange(e); // Update the adminNo field value
    if (value) {
      try {
        const participant = await getParticipantById(value);
        if (participant) {
          handleInputChange({ target: { name: 'studentName', value: participant.name } });
          handleInputChange({ target: { name: 'institutionName', value: participant.institutionName } });
          handleInputChange({ target: { name: 'awardLevel', value: participant.levelName } });
        }
      } catch (error) {
        console.error('Error fetching participant data:', error);
      }
    }
  };

  // Fetch award levels
  useEffect(() => {
    const fetchLevels = async () => {
      setLoadingLevels(true); // Set loading to true initially
      try {
        const fetchedLevels = await getLevels();
        setLevels(fetchedLevels);
        console.log(fetchedLevels); // Log fetched levels to ensure data structure
      } catch (error) {
        // console.error('Error fetching award levels:', error);
      } finally {
        setLoadingLevels(false); // Set loading to false after fetching
      }
    };
    fetchLevels();
  }, []);

  const calculateEndDate = (startDate, levelName) => {
    let monthsToAdd = 0;
    switch (levelName) {
      case 'Bronze':
        monthsToAdd = 6;
        break;
      case 'Silver':
        monthsToAdd = 12;
        break;
      case 'Gold':
        monthsToAdd = 18;
        break;
      default:
        monthsToAdd = 0;
    }
    if (startDate && monthsToAdd) {
      const date = new Date(startDate);
      date.setMonth(date.getMonth() + monthsToAdd);
      return date.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
    }
    return '';
  };

  useEffect(() => {
    if (formValues.startDate && formValues.levelName) {
      const endDate = calculateEndDate(formValues.startDate, formValues.levelName);
      handleInputChange({ target: { name: 'endDate', value: endDate } });
    }
  }, [formValues.startDate, formValues.levelName]);

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
          <label htmlFor="awardLevel">Award Level:</label>
          {loadingLevels ? (
            <p>Loading award levels...</p>
          ) : (
            <select
              name="levelName"
              value={formValues.levelName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Award Level</option>
              {levels.map((level) => (
                <option key={level.levelName} value={level.levelName}>
                  {level.levelName}
                </option>
              ))}
            </select>
          )}
          {errors.awardLevel && <p className="text-red-500">{errors.awardLevel[0]}</p>}
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
