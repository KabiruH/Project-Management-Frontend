import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const companyDetails = {
  name: "President's Award - Kenya",
  address: "15 Elgon Road, opposite the Kadhi's Court in Upper Hill, Nairobi",
  email: "info@presidentsaward.or.ke",
  phone: "0722 714 122, 0787 419 325",
};

export const formatPDFReport = async (title, data, headers) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Load logo and add to PDF
  const logoUrl = `${process.env.PUBLIC_URL}/assets/logo.png`;
  const logoBase64 = await getImageBase64(logoUrl);

  if (logoBase64) {
    const logoWidth = 30; // Width of the logo in mm
    const logoHeight = 15; // Height of the logo in mm
    const logoX = (pageWidth - logoWidth) / 2; // Center the logo
    doc.addImage(logoBase64, 'PNG', logoX, 10, logoWidth, logoHeight);
  } else {
    console.error('Failed to load logo image.');
  }

  // Add company details with reduced spacing and bold text
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  const textX = pageWidth / 2; // Center the text
  const lineSpacing = 6; // Reduced line spacing
  let currentY = 30;

  doc.text(companyDetails.name, textX, currentY, { align: 'center' });
  currentY += lineSpacing;
  doc.text(companyDetails.address, textX, currentY, { align: 'center' });
  currentY += lineSpacing;
  doc.text(`Email: ${companyDetails.email}`, textX, currentY, { align: 'center' });
  currentY += lineSpacing;
  doc.text(`Phone: ${companyDetails.phone}`, textX, currentY, { align: 'center' });
  currentY += lineSpacing; // Add some extra space before the line

  // Draw a bolder line after the company details
  doc.setLineWidth(0.5); // Set line width to 0.5mm for a bolder line
  doc.line(10, currentY, pageWidth - 10, currentY);

  // Add report title
  doc.setFontSize(14);
  doc.text(title, textX, currentY + 10, { align: 'center' });

  // Prepare table data using headers
  const tableHeaders = headers.map(header => header.Header);
  const tableData = data.map(row => headers.map(header => row[header.accessor]));

  // Add table
  autoTable(doc, {
    startY: currentY + 20,
    head: [tableHeaders],
    body: tableData,
    didDrawPage: function (data) {
      const pageHeight = doc.internal.pageSize.height;
      const footerY = pageHeight - 30;
      doc.setFontSize(6);
      doc.text(`Page ${doc.internal.getNumberOfPages()}`, data.settings.margin.left, footerY);
    },
    theme: 'striped',
  });

  doc.save(`${title}.pdf`);
};

// Helper function to convert image URL to Base64
const getImageBase64 = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.onerror = () => reject(null);
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  });
};
