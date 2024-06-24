import { useState } from 'react';

const useForm = (initialState) => {
  const [formValues, setFormValues] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  return {
    formValues,
    handleInputChange,
    setFormValues
  };
};

export default useForm;
