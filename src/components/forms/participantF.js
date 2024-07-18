import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css';
import { getInstitutions } from '../../services/institutionS'
import { getLevels } from '../../services/participantLevelsS'
import { getCounty, getSubCounty } from '../../services/countiesS'

const ParticipantForm = ({ formValues, handleInputChange, handleDateChange, errors }) => {

  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [levels, setLevels] = useState([]);
  const [loadingLevels, setLoadingLevels] = useState(false);
  const [counties, setCounties] = useState([]);
  const [subCounties, setSubCounties] = useState([]);

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
      } catch (error) {
        console.error('Error fetching award levels:', error);
      } finally {
        setLoadingLevels(false); // Set loading to false after fetching
      }
    };
    fetchLevels();
  }, []);

  //Fetch counties and subcounties
useEffect(() => {
  // Fetch counties when component mounts
  const fetchCounties = async () => {
    try {
      const countyData = await getCounty();
      setCounties(countyData);
      // console.log(countyData)
    } catch (error) {
      console.error('Error fetching counties:', error);
    }
  };
  fetchCounties();
}, []);



const handleCountyChange = async (event) => {
  const county = event.target.value;
  const countyName = counties.find(c => c.county === county)?.county || '';
  console.log('Selected County ID:', county); // Log the countyID for debugging
  
  // Update form values with selected county ID and county name
  if (county && counties.find(c => c.county === county)) {
    handleInputChange({ target: { name: 'county', value: county } });
  }
  
  
  if (county) {
    try {
      const subCountyData = await getSubCounty(county);
      setSubCounties(subCountyData);
      // console.log('Sub-counties fetched:', subCountyData);
    } catch (error) {
      console.error('Error fetching sub-counties:', error);
      setSubCounties([]); // Clear sub-counties in case of an error
    }
  } else {
    setSubCounties([]);
  }
};

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
        <label htmlFor="county">County:</label>
        <select
  id="county"
  name="countyID"
  value={formValues.countyID}
  onChange={handleCountyChange}
  className="w-full p-2 border border-gray-300 rounded"
>
  <option value="">Select County</option>
  {counties.map((county) => (
    <option key={county.countyID} value={county.countyID}>
      {county.countyName}
    </option>
  ))}
</select>
        {errors.county && <p className="text-red-500">{errors.county[0]}</p>}
      </div>

        <div>
        <label htmlFor="subCounty">Sub-County:</label>
        <select
          id="subCounty"
          name="subCounty"
          value={formValues.subCountyID}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Sub-County</option>
          {subCounties.length === 0 ? (
            <option value="">Loading Sub-Counties...</option>
          ) : (
            subCounties.map((subCounty) => (
              <option key={subCounty.SubCountyID} value={subCounty.SubCountyName}>
                {subCounty.SubCountyName}
              </option>
            ))
          )}
        </select>
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
