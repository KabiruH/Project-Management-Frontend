import React from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css';

const CountyForm = ({ formValues, handleInputChange, handleDateChange, errors }) => {
  return (
    <form className={styles.form}>
      <div className="space-y-4">
        <div>
          <label htmlFor="countyID">County ID:</label>
          <Input
            name="countyID"
            placeholder="County ID"
            value={formValues.countyID}
            onChange={handleInputChange}
          />
          {errors.countyID && <p className="text-red-500">{errors.countyID[0]}</p>}
        </div>
        <div>
          <label htmlFor="countyName">County Name:</label>
          <Input
            name="countyName"
            placeholder="County Name"
            value={formValues.countyName}
            onChange={handleInputChange}
          />
          {errors.countyName && <p className="text-red-500">{errors.countyName[0]}</p>}
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
          <label htmlFor="region">Region:</label>
          <Input
            name="region"
            placeholder="Region"
            value={formValues.region}
            onChange={handleInputChange}
          />
          {errors.region && <p className="text-red-500">{errors.region[0]}</p>}
        </div>
        <div>
          <label htmlFor="notes">Notes:</label>
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

export default CountyForm;
