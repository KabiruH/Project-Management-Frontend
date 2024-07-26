import React from 'react';
import Input from '../common/Input';
import styles from '../../styles/modal.module.css';
import useForm from '../../hooks/useForm';

const UserForm = ({ formValues, onSubmit, handleInputChange }) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className="space-y-4">
        <div>
          <label htmlFor="UserName">Username:</label>
          <Input
            name="userName"
            placeholder="Username"
            value={formValues.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="fnames">Full Names:</label>
          <Input
            name="name"
            placeholder="Full Names"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="UserEmail">Email:</label>
          <Input
            name="UserEmail"
            placeholder="Email"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="phoneNo">Phone Number:</label>
          <Input
            name="phoneNo"
            placeholder="Phone Number"
            value={formValues.phoneNo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="IDNo">ID Number:</label>
          <Input
            name="idNo"
            placeholder="ID Number"
            value={formValues.idNo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="roleId">User Role:</label>
          <select
            name="roleId"
            value={formValues.roleId}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select User Role</option>
            <option value="current">helper</option>
            <option value="upcoming">participant</option>
          </select>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
