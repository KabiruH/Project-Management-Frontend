import React from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css'; // Correct import for CSS modules

const DonorsForm = ({ formValues, handleInputChange, errors }) => {
  return (
    <form className={styles.form}>
      <div className="space-y-4">
        <div>
          <Input
            name="DonorID"
            placeholder="Donor ID"
            value={formValues.DonorID}
            onChange={handleInputChange}
          />
          {errors.DonorID && <p className="text-red-500">{errors.DonorID[0]}</p>}
        </div>
        <div>
          <Input
            name="DonorName"
            placeholder="Name"
            value={formValues.DonorName}
            onChange={handleInputChange}
          />
          {errors.DonorName && <p className="text-red-500">{errors.DonorName[0]}</p>}
        </div>
       
        <div>
          <Input
            name="Contact"
            placeholder="Contact"
            value={formValues.Contact}
            onChange={handleInputChange}
          />
          {errors.Contact && <p className="text-red-500">{errors.Contact[0]}</p>}
        </div>
        <div>
          <Input
            name="Notes"
            placeholder="Notes"
            value={formValues.Notes}
            onChange={handleInputChange}
          />
          {errors.Notes && <p className="text-red-500">{errors.Notes[0]}</p>}
        </div>
      </div>
    </form>
  );
};

export default DonorsForm;
