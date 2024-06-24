import React from 'react';

const Button = ({ onClick, children, className }) => {
  return (
    <button onClick={onClick} className={`p-2 rounded ${className}`}>
      {children}
    </button>
  );
};

export default Button;
