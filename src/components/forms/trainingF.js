import React from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css'; // Correct import for CSS modules

const TrainingForm = ({ formValues, handleInputChange, handleDateChange, errors }) => {
  return (
    <form className={styles.form}>
      <div className="space-y-4">
        <div>
          <Input
            name="trainingID"
            placeholder="Training ID"
            value={formValues.trainingID}
            onChange={handleInputChange}
          />
          {errors.trainingID && <p className="text-red-500">{errors.trainingID[0]}</p>}
        </div>
        <div>
          <Input
            name="trainingName"
            placeholder="Training Name"
            value={formValues.trainingName}
            onChange={handleInputChange}
          />
          {errors.trainingName && <p className="text-red-500">{errors.trainingName[0]}</p>}
        </div>
        <div>
          <Input
            name="institutionName"
            placeholder="Institution Name"
            value={formValues.institutionName}
            onChange={handleInputChange}
          />
          {errors.institutionName && <p className="text-red-500">{errors.institutionName[0]}</p>}
        </div>
        <div>
          <Input
            name="venue"
            placeholder="Venue"
            value={formValues.venue}
            onChange={handleInputChange}
          />
          {errors.venue && <p className="text-red-500">{errors.venue[0]}</p>}
        </div>
        <div>
          <Input
            name="date"
            placeholder="Date"
            type="date"
            value={formValues.date}
            onChange={handleInputChange}
          />
          {errors.date && <p className="text-red-500">{errors.date[0]}</p>}
        </div>
        <div>
          <Input
            name="categories"
            placeholder="Categories"
            value={formValues.categories}
            onChange={handleInputChange}
          />
          {errors.categories && <p className="text-red-500">{errors.categories[0]}</p>}
        </div>
        
        <div>
          <Input
            name="subCounty"
            placeholder="Sub County"
            value={formValues.subCounty}
            onChange={handleInputChange}
          />
          {errors.subCounty && <p className="text-red-500">{errors.subCounty[0]}</p>}
        </div>
        <div>
          <Input
            name="county"
            placeholder="County"
            value={formValues.county}
            onChange={handleInputChange}
          />
          {errors.county && <p className="text-red-500">{errors.county[0]}</p>}
        </div>
        <div>
          <Input
            name="coordinator"
            placeholder="Coordinator"
            value={formValues.coordinator}
            onChange={handleInputChange}
          />
          {errors.coordinator && <p className="text-red-500">{errors.coordinator[0]}</p>}
        </div>
       
        
        <div>
          <Input
            name="trainingLevel"
            placeholder="Training Level"
            value={formValues.trainingLevel}
            onChange={handleInputChange}
          />
          {errors.trainingLevel && <p className="text-red-500">{errors.trainingLevel[0]}</p>}
        </div>
        
        
        <div>
          <Input
            name="trainingType"
            placeholder="Training Type"
            value={formValues.trainingType}
            onChange={handleInputChange}
          />
          {errors.trainingType && <p className="text-red-500">{errors.trainingType[0]}</p>}
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

export default TrainingForm;
