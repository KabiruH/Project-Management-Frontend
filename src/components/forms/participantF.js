import React from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css'; // Correct import for CSS modules

const ParticipantForm = ({ formValues, handleInputChange, handleDateChange, errors }) => {
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
          <Input
            name="gender"
            placeholder="Gender"
            value={formValues.gender}
            onChange={handleInputChange}
          />
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
          <Input
            name="awardLevel"
            placeholder="Award Level"
            value={formValues.awardLevel}
            onChange={handleInputChange}
          />
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
