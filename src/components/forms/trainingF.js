import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css'; // Correct import for CSS modules
import { getTrainingType } from '../../services/trainingTypeS';
import { getTrainingLevel } from '../../services/trainingLevelS';

const TrainingForm = ({ formValues, handleInputChange, handleDateChange, errors }) => {
  const [trainingTypes, setTrainingTypes] = useState([]); // Corrected state variable name
  const [trainingLevels, setTrainingLevels] = useState([]); // Corrected state variable name
  const [loading, setLoading] = useState(true);
  const [loadingTrainingTypes, setLoadingTrainingTypes] = useState(true); // Corrected state variable name
  const [loadingTrainingLevels, setLoadingTrainingLevels] = useState(true); // Corrected state variable name

  // Fetching training levels
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTrainingLevels = await getTrainingLevel();
        setTrainingLevels(fetchedTrainingLevels);
        console.log(fetchedTrainingLevels)
      } catch (error) {
        console.error('Error fetching training levels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Call the fetchData function
  }, []);

  // Fetching training types
  useEffect(() => {
    const fetchTrainingTypes = async () => {
      try {
        const fetchedTrainingTypes = await getTrainingType();
        setTrainingTypes(fetchedTrainingTypes);
      } catch (error) {
        console.error('Error fetching training types:', error);
      } finally {
        setLoadingTrainingTypes(false);
      }
    };

    fetchTrainingTypes(); // Call the fetchTrainingTypes function
  }, []);

  return (
    <form className={styles.form}>
      <div className="space-y-4">
        {/* Input fields */}
        <div>
          <Input
            name="trainingID"
            placeholder="Training ID"
            value={formValues.trainingID}
            onChange={handleInputChange}
          />
          {errors.trainingID && <p className="text-red-500">{errors.trainingID[0]}</p>}
        </div>
        <div>
          <Input
            name="trainingName"
            placeholder="Training Name"
            value={formValues.trainingName}
            onChange={handleInputChange}
          />
          {errors.trainingName && <p className="text-red-500">{errors.trainingName[0]}</p>}
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
            name="venue"
            placeholder="Venue"
            value={formValues.venue}
            onChange={handleInputChange}
          />
          {errors.venue && <p className="text-red-500">{errors.venue[0]}</p>}
        </div>
        <div>
          <Input
            name="date"
            placeholder="Date"
            type="date"
            value={formValues.date}
            onChange={handleInputChange}
          />
          {errors.date && <p className="text-red-500">{errors.date[0]}</p>}
        </div>
        <div>
          <Input
            name="categories"
            placeholder="Categories"
            value={formValues.categories}
            onChange={handleInputChange}
          />
          {errors.categories && <p className="text-red-500">{errors.categories[0]}</p>}
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
            name="coordinator"
            placeholder="Coordinator"
            value={formValues.coordinator}
            onChange={handleInputChange}
          />
          {errors.coordinator && <p className="text-red-500">{errors.coordinator[0]}</p>}
        </div>

        {/* Select fields */}
        <div>
  <label htmlFor="trainingLevel">Training Level:</label>
  {loadingTrainingLevels ? (
    <p>Loading Training Level...</p>
  ) : (
    <select
      name="trainingLevelID"
      value={formValues.trainingLevelID}
      onChange={handleInputChange}
      className="w-full p-2 border border-gray-300 rounded"
    >
      <option value="">Select Training Level</option>
      {trainingLevels.map((trainingLevel) => (
        <option key={trainingLevel.levelName} value={trainingLevel.levelName}>
          {trainingLevel.levelName}
        </option>
      ))}
    </select>
  )}
  {errors.trainingLevel && <p className="text-red-500">{errors.trainingLevel[0]}</p>}
</div>


        <div>
          <label htmlFor="trainingType">Training Type:</label>
          {loadingTrainingTypes ? (
            <p>Loading Training Types...</p>
          ) : (
            <select
              name="trainingType"
              value={formValues.trainingType}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Training Type</option>
              {trainingTypes.map((trainingType) => (
                <option key={trainingType.typeName} value={trainingType.typeName}>
                  {trainingType.typeName}
                </option>
              ))}
            </select>
          )}
          {errors.trainingType && <p className="text-red-500">{errors.trainingType[0]}</p>}
        </div>

        <div>
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

export default TrainingForm;
