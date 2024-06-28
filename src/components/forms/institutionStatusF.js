import React from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css';

const StatusForm = ({ formValues, handleInputChange, handleDateChange, errors }) => {
  return (
    <form className={styles.form}>
      <div className="space-y-4">
        <div>
          <Input
            name="statusID"
            placeholder="Stage ID"
            value={formValues.statusID}
            onChange={handleInputChange}
          />
          {errors.statusID && <p className="text-red-500">{errors.statusID[0]}</p>}
        </div>
        <div>
          <Input
            name="statusName"
            placeholder="Stage Name"
            value={formValues.statusName}
            onChange={handleInputChange}
          />
          {errors.statusName && <p className="text-red-500">{errors.statusName[0]}</p>}
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

export default StatusForm;
