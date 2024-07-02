import React from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css';

const FundingTypeForm = ({ formValues, handleInputChange, handleDateChange, errors }) => {
  return (
    <form className={styles.form}>
      <div className="space-y-4">
        <div>
          <Input
            name="fundingID"
            placeholder="Funding ID"
            value={formValues.fundingID}
            onChange={handleInputChange}
          />
          {errors.fundingID && <p className="text-red-500">{errors.fundingID[0]}</p>}
        </div>
        <div>
          <Input
            name="fundingName"
            placeholder="Funding Name"
            value={formValues.fundingName}
            onChange={handleInputChange}
          />
          {errors.fundingName && <p className="text-red-500">{errors.fundingName[0]}</p>}
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

export default FundingTypeForm;
