import React, { useState, useEffect } from 'react';
import reportService from '../../services/reportService';
import { exportToPDF, exportToExcel } from '../../utils/exportUtils';
import './ReportViewer.css';

const ReportViewer = ({ selectedReportId }) => {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    if (selectedReportId) {
      reportService.fetchReport(selectedReportId)
        .then(data => setReportData(data))
        .catch(err => console.error(err));
    }
  }, [selectedReportId]);

  if (!reportData) {
    return <div>Select a report to view details</div>;
  }

  return (
    <div className="report-viewer">
      <h2>{reportData.name}</h2>
      <div className="report-actions">
        <button onClick={() => exportToPDF(reportData)}>Export to PDF</button>
        <button onClick={() => exportToExcel(reportData)}>Export to Excel</button>
      </div>
      {/* Render the report content using a template */}
      <div className="report-content">
        {/* Header, Data, and Footer components can be used here */}
      </div>
    </div>
  );
};

export default ReportViewer;
