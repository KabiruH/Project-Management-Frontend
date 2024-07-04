import React from 'react';

const Button = ({ onClick, children, className }) => {
  return (
    <button type="submit" onClick={onClick} className={`p-2 rounded ${className}`}>
      {children}
    </button>
  );
};

export default Button;
