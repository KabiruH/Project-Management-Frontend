import React, { useState, useEffect } from 'react'
import Input from '../common/Input';
import styles from '../../styles/modal.module.css';
import { getInstitutions } from '../../services/institutionS'

const ProjectForm = ({ formValues, handleInputChange, handleDateChange, errors }) => {
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
          <label htmlFor="cost">Project Cost:</label>
          <Input
            name="cost"
            placeholder="Cost"
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
          <label htmlFor="coordinator">Coordinator Name:</label>
          <Input
            name="coordinator"
            placeholder="Coordinator's Name"
            value={formValues.coordinator}
            onChange={handleInputChange}
          />
          {errors.coordinator && <p className="text-red-500">{errors.coordinator[0]}</p>}
        </div>
        <div>
        <label htmlFor="notes">Notes:</label>
          <textarea
            name="notes"
            placeholder="Notes"
            value={formValues.notes}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          {errors.notes && <p className="text-red-500">{errors.notes[0]}</p>}
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;
