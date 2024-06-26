import React from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css';

const StagesForm = ({ formValues, handleInputChange, handleDateChange, errors }) => {
  return (
    <form className={styles.form}>
      <div className="space-y-4">
        <div>
          <Input
            name="stageID"
            placeholder="Stage ID"
            value={formValues.stageID}
            onChange={handleInputChange}
          />
          {errors.stageID && <p className="text-red-500">{errors.stageID[0]}</p>}
        </div>
        <div>
          <Input
            name="stageName"
            placeholder="Stage Name"
            value={formValues.stageName}
            onChange={handleInputChange}
          />
          {errors.stageName && <p className="text-red-500">{errors.stageName[0]}</p>}
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

export default StagesForm;
