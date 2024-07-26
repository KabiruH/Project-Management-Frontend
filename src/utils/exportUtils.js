import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver'; // Ensure this import is present
import * as XLSX from 'xlsx';
import { formatPDFReport } from './pdfFormatting'; // Importing the formatting function
import { formatExcelReport } from './excelFormatting'; // Importing the formatting function

// Utility function to export data to PDF
export const exportToPDF = (reportTitle, data) => {
  if (!data || data.length === 0) {
    console.error('No data available for export.');
    return;
  }

  const doc = new jsPDF();
  formatPDFReport(doc, reportTitle, data); // Using the formatting function
  doc.save(`${reportTitle}.pdf`);
};

// Utility function to export data to Excel
export const exportToExcel = (reportTitle, data) => {
  if (!data || data.length === 0) {
    console.error('No data available for export.');
    return;
  }

  formatExcelReport(reportTitle, data); // Using the formatting function
};
