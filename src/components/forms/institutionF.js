import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css';
import { getStages } from '../../services/institutionStageS'
import { getStatus } from '../../services/institutionStatusS'
import { getCounty, getSubCounty } from '../../services/countiesS'

const InstitutionForm = ({ formValues, handleInputChange, errors }) => {

  const [stages, setStages] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loadingStages, setLoadingStages] = useState(true);
  const [loadingStatuses, setLoadingStatuses] = useState(true);
  const [counties, setCounties] = useState([]);
  const [subCounties, setSubCounties] = useState([]);

  // Fetch stages
  useEffect(() => {
    const fetchStages = async () => {
      setLoadingStages(true); // Set loading to true initially
      try {
        const fetchedStages = await getStages();
        setStages(fetchedStages);
        //console.log(fetchedStages)
      } catch (error) {
        error('Error fetching Institution Stages:', error);
      } finally {
        setLoadingStages(false); // Set loading to false after fetching
      }
    };
    fetchStages();

  }, []);


  //Fetch status
  useEffect(() => {
    const fetchStatuses = async () => {
      setLoadingStatuses(true);
      try {
        const fetchedStatuses = await getStatus();
        setStatuses(fetchedStatuses);
        // console.log(fetchedStatuses)
      } catch (error) {
        error('Error fetching Institution Statuses:', error);
      } finally {
        setLoadingStatuses(false);
      }
    };

    fetchStatuses();
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
    const countyName = event.target.value;
    console.log('Selected County ID:', countyName); // Log the countyID for debugging

    // Update form values with selected county ID and county name
    handleInputChange({ target: { name: 'countyName', value: countyName } });



    if (countyName) {
      try {
        const subCountyData = await getSubCounty(countyName);
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

  //End date function
  const handleDateChange = (event) => {
    const { name, value } = event.target;

    if (name === 'licenseStartDate') {
      const startDate = new Date(value);
      const endDate = new Date(startDate);
      endDate.setFullYear(startDate.getFullYear() + 1);

      handleInputChange({
        target: {
          name: 'licenseEndDate',
          value: endDate.toISOString().split('T')[0] // Format as YYYY-MM-DD
        }
      });
    }

    handleInputChange(event);
  };


  return (
    <form className={styles.form}>
      <div className="space-y-4">
        <div>
          <label htmlFor="institutionID">Institution ID:</label>
          <Input
            name="institutionID"
            placeholder="Institution ID"
            value={formValues.institutionID}
            onChange={handleInputChange}
          />
          {errors.institutionID && <p className="text-red-500">{errors.institutionID[0]}</p>}
        </div>
        <div>
          <label htmlFor="institutionName">Institution Name:</label>
          <Input
            name="institutionName"
            placeholder="Institution Name"
            value={formValues.institutionName}
            onChange={handleInputChange}
          />
          {errors.institutionName && <p className="text-red-500">{errors.institutionName[0]}</p>}
        </div>
        <div>
          <label htmlFor="stageID">Stage:</label>
          {loadingStages ? (
            <p>Loading stages...</p>
          ) : (
            <select
              className="w-full p-2 border border-gray-300 rounded"
              name="stageID"
              value={formValues.stageID}
              onChange={handleInputChange}
            >
              <option value="">Select Stage</option>
              {stages.map((stage) => (
                <option key={stage.stageName} value={stage.stageName}>
                  {stage.stageName}  {/* Assuming 'name' property holds stage name */}
                </option>
              ))}
            </select>
          )}
          {errors.stageID && <p className="text-red-500">{errors.stageID[0]}</p>}
        </div>

        <div>
          <label htmlFor="statusID">Status:</label>
          {loadingStatuses ? (
            <p>Loading statuses...</p>
          ) : (
            <select
              className="w-full p-2 border border-gray-300 rounded"
              name="statusID"
              value={formValues.statusID}
              onChange={handleInputChange}
            >
              <option value="">Select Status</option>
              {statuses.map((status) => (
                <option key={status.statusName} value={status.statusName}>
                  {status.statusName} {/* Assuming 'name' property holds status name */}
                </option>
              ))}
            </select>
          )}
          {errors.statusID && <p className="text-red-500">{errors.statusID[0]}</p>}
        </div>

        <div>
          <label htmlFor="institutionEmail">Institution Email:</label>
          <Input
            name="institutionEmail"
            placeholder="Institution Email"
            value={formValues.institutionEmail}
            onChange={handleInputChange}
          />
          {errors.institutionEmail && <p className="text-red-500">{errors.institutionEmail[0]}</p>}
        </div>

        <div>
          <label htmlFor="institutionContact">Institution Contact:</label>
          <Input
            name="institutionContact"
            placeholder="Institution Contact"
            value={formValues.institutionContact}
            onChange={handleInputChange}
          />
          {errors.institutionContact && <p className="text-red-500">{errors.institutionContact[0]}</p>}
        </div>

        <div>
          <label htmlFor="county">County:</label>
          <select
            id="county"
            name="county"
            value={formValues.county} // Ensure this is countyID, not countyName
            onChange={handleCountyChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select County</option>
            {counties.map((county) => (
              <option key={county.countyID} value={county.countyID}>
                {county.countyID === formValues.countyName ? county.countyID : county.countyName}
              </option>
            ))}
          </select>
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
          <label htmlFor="contactPerson">Contact Person:</label>
          <Input
            name="contactPerson"
            placeholder="Contact Person"
            value={formValues.contactPerson}
            onChange={handleInputChange}
          />
          {errors.contactPerson && <p className="text-red-500">{errors.contactPerson[0]}</p>}
        </div>
        <div>
          <label htmlFor="contactNumber">Contact Number:</label>
          <Input
            name="contactNumber"
            placeholder="Contact Number"
            value={formValues.contactNumber}
            onChange={handleInputChange}
          />
          {errors.contactNumber && <p className="text-red-500">{errors.contactNumber[0]}</p>}
        </div>

        <div>
          <label htmlFor="licenseStartDate">License Start Date:</label>
          <Input
            name="licenseStartDate"
            placeholder="License Start Date"
            type="date"
            value={formValues.licenseStartDate}
            onChange={handleDateChange} // Make sure this is correct
          />
          {errors.licenseStartDate && <p className="text-red-500">{errors.licenseStartDate[0]}</p>}
        </div>
        <div>
          <label htmlFor="licenseEndDate">License End Date:</label>
          <Input
            name="licenseEndDate"
            placeholder="License End Date"
            type="date"
            value={formValues.licenseEndDate}
            onChange={handleDateChange} // Make sure this is correct
          />
          {errors.licenseEndDate && <p className="text-red-500">{errors.licenseEndDate[0]}</p>}
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

export default InstitutionForm;
