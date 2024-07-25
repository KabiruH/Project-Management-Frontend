import React from 'react';

const DataTemplate = ({ data }) => (
  <div className="data-template">
    {/* Render your data here, e.g., tables or charts */}
    {data.map((item, index) => (
      <div key={index}>{item}</div>
    ))}
  </div>
);

export default DataTemplate;
