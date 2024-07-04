import React from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css'; // Correct import for CSS modules

const HelpersForm = ({ formValues, handleInputChange, handleDateChange, errors }) => {
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
          <label htmlFor="idNo">ID Number:</label>
          <Input
            name="idNo"
            placeholder="ID Number"
            type="date"
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
        <label htmlFor="county">Helper Type:</label>
          <Input
            name="helperType"
            placeholder="Helper Type"
            value={formValues.helperType}
            onChange={handleInputChange}
          />
          {errors.helperType && <p className="text-red-500">{errors.helperType[0]}</p>}
        </div>
        <div>
        <label htmlFor="county">Coordinator:</label>
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
