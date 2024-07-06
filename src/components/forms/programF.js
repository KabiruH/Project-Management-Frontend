import React, { useState, useEffect } from 'react'
import Input from '../common/Input';
import styles from '../../styles/modal.module.css'; 
import { getInstitutions } from '../../services/institutionS'

const ProgramForm = ({ formValues, handleInputChange, handleDateChange, errors }) => {
  
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedInstitutions = await getInstitutions();
        setInstitutions(fetchedInstitutions);
      } catch (error) {
        console.error('Error fetching institutions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  return (
    <form className={styles.form}>
      <div className="space-y-4">
        <div>
          <label htmlFor="programID">Program ID:</label>
          <Input
            name="programID"
            placeholder="Program ID"
            value={formValues.programID}
            onChange={handleInputChange}
          />
          {errors.programID && <p className="text-red-500">{errors.programID[0]}</p>}
        </div>
        <div>
          <label htmlFor="programName">Program Name:</label>
          <Input
            name="programName"
            placeholder="Program Name"
            value={formValues.programName}
            onChange={handleInputChange}
          />
          {errors.programName && <p className="text-red-500">{errors.programName[0]}</p>}
        </div>
        <div>
          <label htmlFor="institutionID">Institution:</label>
          {loading ? (
            <p>Loading institutions...</p>
          ) : (
            <select
              name="institutionName"
              value={formValues.institutionName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Institution</option>
              {institutions.map((institution) => (
                <option key={institution.institutionName} value={institution.institutionName}>
                  {institution.institutionName}
                </option>
              ))}
            </select>
          )}
          {errors.institutionID && <p className="text-red-500">{errors.institutionID[0]}</p>}
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
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
          <label htmlFor="endDate">End Date:</label>
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
          <label htmlFor="cost">Program Cost:</label>
          <Input
            name="cost"
            placeholder="Program Cost"
            value={formValues.cost}
            onChange={handleInputChange}
          />
          {errors.cost && <p className="text-red-500">{errors.cost[0]}</p>}
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
          <label htmlFor="coordinator">Program Coordinator:</label>
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
