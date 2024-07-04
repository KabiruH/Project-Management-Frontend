import React from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css'; // Correct import for CSS modules

const TestimonialsForm = ({ formValues, handleInputChange, errors }) => {
  return (
    <form className={styles.form}>
      <div className="space-y-4">
        <div>
          <label htmlFor="UserID">User ID:</label>
          <Input
            name="UserID"
            placeholder="User ID"
            value={formValues.UserID}
            onChange={handleInputChange}
          />
          {errors.UserID && <p className="text-red-500">{errors.UserID[0]}</p>}
        </div>
        <div>
          <label htmlFor="Username">User Name:</label>
          <Input
            name="Username"
            placeholder="Name"
            value={formValues.Username}
            onChange={handleInputChange}
          />
          {errors.Username && <p className="text-red-500">{errors.Username[0]}</p>}
        </div>
        <div>
          <label htmlFor="Role">User Role:</label>
          <Input
            name="Role"
            placeholder="Role"
            value={formValues.Role}
            onChange={handleInputChange}
          />
          {errors.Role && <p className="text-red-500">{errors.Role[0]}</p>}
        </div>
        <div>
          <label htmlFor="Description">Testimonial:</label>
          <Input
            name="Description"
            placeholder="Description"
            value={formValues.Description}
            onChange={handleInputChange}
          />
          {errors.Description && <p className="text-red-500">{errors.Description[0]}</p>}
        </div>
        <div>
          <label htmlFor="Notes">Internal Notes:</label>
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

export default TestimonialsForm;
