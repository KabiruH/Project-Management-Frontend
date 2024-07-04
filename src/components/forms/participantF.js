import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css';
import { getInstitutions } from '../../services/institutionS'
import { getLevels } from '../../services/participantLevelsS'

const ParticipantForm = ({ formValues, handleInputChange, handleDateChange, errors }) => {

  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [levels, setLevels] = useState([]);
  const [loadingLevels, setLoadingLevels] = useState(false);

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

  useEffect(() => {
    const fetchLevels = async () => {
      setLoadingLevels(true); // Set loading to true initially
      try {
        const fetchedLevels = await getLevels();
        setLevels(fetchedLevels);
        console.log(fetchedLevels); // Log fetched levels to ensure data structure
      } catch (error) {
        console.error('Error fetching award levels:', error);
      } finally {
        setLoadingLevels(false); // Set loading to false after fetching
      }
    };
    fetchLevels();
  }, []);


  return (
    <form className={styles.form}>
      <div className="space-y-4">
        <div>
          <label htmlFor="adminNumber">Admin Number:</label>
          <Input
            name="adminNumber"
            placeholder="Admin Number"
            value={formValues.adminNumber}
            onChange={handleInputChange}
          />
          {errors.adminNumber && <p className="text-red-500">{errors.adminNumber[0]}</p>}
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <Input
            name="name"
            placeholder="Name"
            value={formValues.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
        </div>
        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <Input
            name="dob"
            placeholder="Date of Birth"
            type="date"
            value={formValues.dob}
            onChange={handleDateChange} // Make sure this is correct
          />
          {errors.dob && <p className="text-red-500">{errors.dob[0]}</p>}
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select className="w-full p-2 border border-gray-300 rounded"
            name="gender"
            value={formValues.gender}
            onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className="text-red-500">{errors.gender[0]}</p>}
        </div>

        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <Input
            name="phoneNumber"
            placeholder="Phone Number"
            value={formValues.phoneNumber}
            onChange={handleInputChange}
          />
          {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber[0]}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <Input
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
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
          <label htmlFor="awardLevel">Award Level:</label>
          {loadingLevels ? (
            <p>Loading award levels...</p>
          ) : (
            <select
              name="awardLevel"
              value={formValues.awardLevel}
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
          <label htmlFor="awardLeader">Award Leader:</label>
          <Input
            name="awardLeader"
            placeholder="Award Leader"
            value={formValues.awardLeader}
            onChange={handleInputChange}
          />
          {errors.awardLeader && <p className="text-red-500">{errors.awardLeader[0]}</p>}
        </div>
      </div>
    </form>
  );
};

export default ParticipantForm;
