// src/components/Reports/ReportList/ReportList.jsx
import React from 'react';

const ReportList = ({ onSelectReport }) => {
  const reports = [
    { id: 1, name: 'Users Report' },
    { id: 2, name: 'Sales Report' },
    { id: 3, name: 'Financial Report' },
    // Add more reports as needed
  ];

  return (
    <div>
      <ul>
        {reports.map((report) => (
          <li key={report.id} className="mb-2">
            <button
              onClick={() => onSelectReport(report)}
              className="p-2 bg-gray-200 rounded"
            >
              {report.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportList;
