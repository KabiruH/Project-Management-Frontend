import React from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css'; // Correct import for CSS modules

const FeedbackForm = ({ formValues, handleInputChange, handleDateChange, errors }) => {
  return (
    <form className={styles.form}>
      <div className="space-y-4">
        <div>
          <Input
            name="respondentID"
            placeholder="Respondent ID"
            value={formValues.respondentID}
            onChange={handleInputChange}
          />
          {errors.respondentID && <p className="text-red-500">{errors.respondentID[0]}</p>}
        </div>
        <div>
          <Input
            name="titleName"
            placeholder="Title Name"
            value={formValues.titleName}
            onChange={handleInputChange}
          />
          {errors.titleName && <p className="text-red-500">{errors.titleName[0]}</p>}
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Description"
            value={formValues.description}
            onChange={handleInputChange}
          />
          {errors.description && <p className="text-red-500">{errors.description[0]}</p>}
        </div>
        <div>
          <Input
            name="respondentType"
            placeholder="Respondent Type"
            value={formValues.respondentType}
            onChange={handleInputChange}
          />
          {errors.respondentType && <p className="text-red-500">{errors.respondentType[0]}</p>}
        </div>
    
        <div>
          <Input
            name="phoneNo"
            placeholder="Phone Number"
            value={formValues.phoneNo}
            onChange={handleInputChange}
          />
          {errors.phoneNo && <p className="text-red-500">{errors.phoneNo[0]}</p>}
        </div>
        <div>
          <Input
            name="respondentEmail"
            placeholder="Email"
            value={formValues.respondentEmail}
            onChange={handleInputChange}
          />
          {errors.respondentEmail && <p className="text-red-500">{errors.respondentEmail[0]}</p>}
        </div>
      </div>
    </form>
  );
};

export default FeedbackForm;
