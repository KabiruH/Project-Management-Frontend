import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import { formatPDFReport } from '../../utils/pdfFormatting';
import { formatExcelReport } from '../../utils/excelFormatting';
import { fetchInstitutionData } from '../../services/reportsServices/reportInstitutionsS';
import { fetchProjectData } from '../../services/reportsServices/reportProjectsS';
import { fetchParticipantData } from '../../services/reportsServices/reportParticipantsS';

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState('');
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    if (selectedReport) {
      const fetchData = async () => {
        try {
          let data;
          switch (selectedReport) {
            case 'Award Centers':
              data = await fetchInstitutionData();
              break;
            case 'Participants':
              data = await fetchParticipantData();
              break;
            case 'Projects':
              data = await fetchProjectData();
              break;
            default:
              data = [];
          }
          if (data) {
            console.log(`Fetched data for ${selectedReport}:`, data); // Logging fetched data
            setReportData(data);
          }
        } catch (error) {
          console.error('Error fetching report data:', error);
        }
      };
      fetchData();
    }
  }, [selectedReport]);

  const handleExport = (format) => {
    if (!selectedReport) {
      alert('Please select a report first.');
      return;
    }

    if (!reportData || reportData.length === 0) {
      alert('No data available for the selected report.');
      return;
    }

    if (format === 'PDF') {
      formatPDFReport(selectedReport, reportData);
    } else if (format === 'Excel') {
      formatExcelReport(selectedReport, reportData);
    }
  };

  return (
    <Layout>
      <div className="reports-page p-4">
        <h1 className="text-3xl font-bold mb-6">Reports</h1>

        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-300 pb-2">Available Reports</h2>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setSelectedReport('Award Centers')}
                className={`w-full text-left p-2 flex items-center ${selectedReport === 'Award Centers' ? 'bg-gray-200' : 'bg-white'} hover:bg-gray-100`}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/checked.png`}
                  alt="Checkmark"
                  className={`w-6 h-6 ${selectedReport === 'Award Centers' ? 'block' : 'hidden'} mr-3`}
                />
                <span className={`font-semibold ${selectedReport === 'Award Centers' ? 'text-blue-600' : 'text-gray-800'}`}>Award Centers Report</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedReport('Participants')}
                className={`w-full text-left p-2 flex items-center ${selectedReport === 'Participants' ? 'bg-gray-200' : 'bg-white'} hover:bg-gray-100`}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/checked.png`}
                  alt="Checkmark"
                  className={`w-6 h-6 ${selectedReport === 'Participants Report' ? 'block' : 'hidden'} mr-3`}
                />
                <span className={`font-semibold ${selectedReport === 'Participants Report' ? 'text-blue-600' : 'text-gray-800'}`}>Participants Report</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedReport('Projects Report')}
                className={`w-full text-left p-2 flex items-center ${selectedReport === 'Projects Report' ? 'bg-gray-200' : 'bg-white'} hover:bg-gray-100`}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/checked.png`}
                  alt="Checkmark"
                  className={`w-6 h-6 ${selectedReport === 'Projects Report' ? 'block' : 'hidden'} mr-3`}
                />
                <span className={`font-semibold ${selectedReport === 'Projects Report' ? 'text-blue-600' : 'text-gray-800'}`}>Projects Report</span>
              </button>
            </li>
          </ul>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Export Report</h2>
          <div className="flex gap-4">
            <button
              onClick={() => handleExport('PDF')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Export as PDF
            </button>
            <button
              onClick={() => handleExport('Excel')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Export as Excel
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportsPage;
