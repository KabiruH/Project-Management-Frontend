import React from 'react';

const Input = ({ name, value, onChange, placeholder, type = 'text' }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border border-gray-300 rounded"
    />
  );
};

export default Input;
