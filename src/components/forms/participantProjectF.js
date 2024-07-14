import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css';
import { getInstitutions } from '../../services/institutionS'


const ParticipantProjectForm = ({ formValues, handleInputChange, handleDateChange, errors }) => {

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
          <label htmlFor="participantID">Participant ID:</label>
          <Input
            name="participantID"
            placeholder="Admin Number"
            value={formValues.participantID}
            onChange={handleInputChange}
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
          {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
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
          <label htmlFor="projectID">Project ID:</label>
          <Input
            name="projectID"
            placeholder="projectID"
            value={formValues.projectID}
            onChange={handleInputChange}
          />
          {errors.projectID && <p className="text-red-500">{errors.projectID[0]}</p>}
        </div>
        {/* <div>
          <label htmlFor="projectName">Project Name:</label>
          <Input
            name="projectName"
            placeholder="projectName"
            value={formValues.projectName}
            onChange={handleInputChange}
          />
          {errors.projectName && <p className="text-red-500">{errors.projectName[0]}</p>}
        </div> */}

      </div>
    </form>
  );
};

export default ParticipantProjectForm;
