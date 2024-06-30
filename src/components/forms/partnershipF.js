import React from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css'; // Correct import for CSS modules

const PartnershipForm = ({ formValues, handleInputChange, handleDateChange, errors }) => {
  return (
    <form className={styles.form}>
      <div className="space-y-4">
        <div>
          <Input
            name="partnerID"
            placeholder="Partner ID"
            value={formValues.partnerID}
            onChange={handleInputChange}
          />
          {errors.partnerID && <p className="text-red-500">{errors.partnerID[0]}</p>}
        </div>
        <div>
          <Input
            name="partnerName"
            placeholder="Partner Name"
            value={formValues.partnerName}
            onChange={handleInputChange}
          />
          {errors.partnerName && <p className="text-red-500">{errors.partnerName[0]}</p>}
        </div>
        <div>
          <Input
            name="partnerEmail"
            placeholder="Partner Email"
            value={formValues.partnerEmail}
            onChange={handleInputChange}
          />
          {errors.partnerEmail && <p className="text-red-500">{errors.partnerEmail[0]}</p>}
        </div>
        <div>
          <Input
            name="phoneNo"
            placeholder="Phone No"
            value={formValues.phoneNo}
            onChange={handleInputChange}
          />
          {errors.phoneNo && <p className="text-red-500">{errors.phoneNo[0]}</p>}
        </div>
        <div>
          <Input
            name="partnerType"
            placeholder="Partner Type"
            value={formValues.partnerType}
            onChange={handleInputChange}
          />
          {errors.partnerType && <p className="text-red-500">{errors.partnerType[0]}</p>}
        </div>
      </div>
    </form>
  );
};

export default PartnershipForm;
