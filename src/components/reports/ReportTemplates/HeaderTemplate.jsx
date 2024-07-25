import React from 'react';

const HeaderTemplate = ({ title, logoUrl }) => (
  <div className="header-template">
    <img src={logoUrl} alt="Logo" className="header-logo" />
    <h1>{title}</h1>
  </div>
);

export default HeaderTemplate;
