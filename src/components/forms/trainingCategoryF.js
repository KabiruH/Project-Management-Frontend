import React from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css';

const TrainingCategoryForm = ({ formValues, handleInputChange, handleDateChange, errors }) => {
  return (
    <form className={styles.form}>
      <div className="space-y-4">
        <div>
          <Input
            name="categoryID"
            placeholder="Category ID"
            value={formValues.categoryID}
            onChange={handleInputChange}
          />
          {errors.categoryID && <p className="text-red-500">{errors.categoryID[0]}</p>}
        </div>
        <div>
          <Input
            name="categoryName"
            placeholder="Category Name"
            value={formValues.categoryName}
            onChange={handleInputChange}
          />
          {errors.categoryName && <p className="text-red-500">{errors.categoryName[0]}</p>}
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

export default TrainingCategoryForm;
