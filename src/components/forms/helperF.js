import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css'; // Correct import for CSS modules
import { getInstitutions } from '../../services/institutionS';
import { getHelperTypes } from '../../services/helperTypeS';

const HelpersForm = ({ formValues, handleInputChange, handleDateChange, errors }) => {
  const [institutions, setInstitutions] = useState([]);
  const [helperTypes, setHelperTypes] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [loadingHelperTypes, setLoadingHelperTypes] = useState(true);

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

    const fetchHelperTypes = async () => {
      // setLoadingHelperTypes(true);
      try {
        const fetchedHelpers = await getHelperTypes(); 
        setHelperTypes(fetchedHelpers);
        console.log(fetchedHelpers);
      } catch (error) {
        console.error('Error fetching helper types:', error);
      } finally {
        setLoadingHelperTypes(false);
      }
    };

    fetchData();
    fetchHelperTypes();
  }, []);

  return (
    <form className={styles.form}>
      <div className="space-y-4">
        <div>
          <label htmlFor="helperID">Helper ID:</label>
          <Input
            name="helperID"
            placeholder="Helper ID"
            value={formValues.helperID}
            onChange={handleInputChange}
          />
          {errors.helperID && <p className="text-red-500">{errors.helperID[0]}</p>}
        </div>
        <div>
          <label htmlFor="helperName">Name:</label>
          <Input
            name="helperName"
            placeholder="Name"
            value={formValues.helperName}
            onChange={handleInputChange}
          />
          {errors.helperName && <p className="text-red-500">{errors.helperName[0]}</p>}
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
          <label htmlFor="gender">Gender:</label>
          <select
            name="gender"
            value={formValues.gender}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className="text-red-500">{errors.gender[0]}</p>}
        </div>
        <div>
          <label htmlFor="idNo">ID Number:</label>
          <Input
            name="idNo"
            placeholder="ID Number"
            value={formValues.idNo}
            onChange={handleInputChange}
          />
          {errors.idNo && <p className="text-red-500">{errors.idNo[0]}</p>}
        </div>
        <div>
          <label htmlFor="phoneNo">Phone Number:</label>
          <Input
            name="phoneNo"
            placeholder="Phone Number"
            value={formValues.phoneNo}
            onChange={handleInputChange}
          />
          {errors.phoneNo && <p className="text-red-500">{errors.phoneNo[0]}</p>}
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
          <label htmlFor="HelperType">Helper Type:</label>
          {loadingHelperTypes ? (
            <p>Loading helper types...</p>
          ) : (
            <select
              name="helperType"
              value={formValues.helperType}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Helper Type</option>
              {helperTypes.map((helper) => (
                <option key={helper.typeName} value={helper.typeName}>
                  {helper.typeName}
                </option>
              ))}
            </select>
          )}
          {errors.helperType && <p className="text-red-500">{errors.helperType[0]}</p>}
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
      </div>
    </form>
  );
};

export default HelpersForm;
