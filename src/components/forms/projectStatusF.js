import React from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css';

const ProjectStatusForm = ({ formValues, handleInputChange, errors }) => {
  return (
    <form className={styles.form}>
      <div className="space-y-4">
        <div>
          <Input
            name="ProjectStatusID"
            placeholder="Status ID"
            value={formValues.ProjectStatusID}
            onChange={handleInputChange}
          />
          {errors.statusID && <p className="text-red-500">{errors.ProjectStatusID[0]}</p>}
        </div>
        <div>
          <Input
            name="StatusName"
            placeholder="Status Name"
            value={formValues.StatusName}
            onChange={handleInputChange}
          />
          {errors.statusName && <p className="text-red-500">{errors.StatusName[0]}</p>}
        </div>
        <div>
          <Input
            name="Notes"
            placeholder="Notes"
            value={formValues.Notes}
            onChange={handleInputChange}
          />
          {errors.notes && <p className="text-red-500">{errors.Notes[0]}</p>}
        </div>
      </div>
    </form>
  );
};

export default ProjectStatusForm;
