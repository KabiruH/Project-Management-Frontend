import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css'; // Correct import for CSS modules
import { getTrainingType } from '../../services/trainingTypeS';
import { getTrainingLevel } from '../../services/trainingLevelS';
import { getTrainingCategory } from '../../services/trainingCategoryS';
import { getInstitutions } from '../../services/institutionS'

const TrainingForm = ({ formValues, handleInputChange, handleDateChange, errors }) => {
  const [trainingTypes, setTrainingTypes] = useState([]); // Corrected state variable name
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingTrainingTypes, setLoadingTrainingTypes] = useState(true); // Corrected state variable name
  const [trainingLevels, setTrainingLevels] = useState([]);
  const [loadingTrainingLevels, setLoadingTrainingLevels] = useState(true);
  const [trainingCategories, setTrainingCategories] = useState([]);
  const [loadingTrainingCategories, setLoadingTrainingCategories] = useState(true);

 //Fetching Institutions

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
 
 
  // Fetching training categories
  useEffect(() => {
    const fetchTrainingCategories = async () => {
      try {
        const fetchedTrainingCategories = await getTrainingCategory();
        setTrainingCategories(fetchedTrainingCategories);
      } catch (error) {
        console.error('Error fetching training categories:', error);
      } finally {
        setLoadingTrainingCategories(false);
      }
    };

    fetchTrainingCategories();
  }, []);

  // Fetching training levels
  useEffect(() => {
    const fetchTrainingLevels = async () => {
      try {
        const fetchedTrainingLevels = await getTrainingLevel();
        setTrainingLevels(fetchedTrainingLevels);
      } catch (error) {
        console.error('Error fetching training levels:', error);
      } finally {
        setLoadingTrainingLevels(false);
      }
    };

    fetchTrainingLevels();
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
          <label htmlFor="trainingID">Training ID:</label>
          <Input
            name="trainingID"
            placeholder="Training ID"
            value={formValues.trainingID}
            onChange={handleInputChange}
          />
          {errors.trainingID && <p className="text-red-500">{errors.trainingID[0]}</p>}
        </div>
        <div>
          <label htmlFor="trainingName">Training Name:</label>
          <Input
            name="trainingName"
            placeholder="Training Name"
            value={formValues.trainingName}
            onChange={handleInputChange}
          />
          {errors.trainingName && <p className="text-red-500">{errors.trainingName[0]}</p>}
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
          <label htmlFor="venue">Venue:</label>
          <Input
            name="venue"
            placeholder="Venue"
            value={formValues.venue}
            onChange={handleInputChange}
          />
          {errors.venue && <p className="text-red-500">{errors.venue[0]}</p>}
        </div>
        <div>
          <label htmlFor="date">Date:</label>
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
          <label htmlFor="categories">Categories:</label>
          {loadingTrainingCategories ? (
            <p>Loading Categories...</p>
          ) : (
            <select
              name="categories"
              value={formValues.categories}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Category</option>
              {trainingCategories.map((category) => (
                <option key={category.categoryName} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          )}
          {errors.categories && <p className="text-red-500">{errors.categories[0]}</p>}
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
          <label htmlFor="trainingLevel">Training Level:</label>
          {loadingTrainingLevels ? (
            <p>Loading Training Levels...</p>
          ) : (
            <select
              name="trainingLevel"
              value={formValues.trainingLevel}
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

export default TrainingForm;
