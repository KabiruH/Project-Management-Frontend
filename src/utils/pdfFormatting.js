import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const companyDetails = {
  name: "President's Award - Kenya",
  address: "15 Elgon Road, opposite the Kadhi's Court in Upper Hill, Nairobi",
  email: "info@presidentsaward.or.ke",
  phone: "0722 714 122, 0787 419 325",
};

export const formatPDFReport = async (title, data, headers) => {
  // A4 dimensions in mm (landscape)
  const a4Width = 297;
  const a4Height = 210;

  const doc = new jsPDF({ orientation: 'landscape' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Calculate scale factor to fit A4 size
  const scaleX = a4Width / pageWidth;
  const scaleY = a4Height / pageHeight;
  const scale = Math.min(scaleX, scaleY);

  // Apply scale to all positions
  const scaledPageWidth = pageWidth * scale;
  const scaledPageHeight = pageHeight * scale;
  const margin = 10; // margin for content
  const scaledMargin = margin * scale;

  // Load logo and add to PDF
  const logoUrl = `${process.env.PUBLIC_URL}/assets/logo.png`;
  const logoBase64 = await getImageBase64(logoUrl);

  if (logoBase64) {
    const logoWidth = 30 * scale; // Width of the logo in mm
    const logoHeight = 15 * scale; // Height of the logo in mm
    const logoX = (scaledPageWidth - logoWidth) / 2; // Center the logo
    doc.addImage(logoBase64, 'PNG', logoX + scaledMargin, 10 * scale + scaledMargin, logoWidth, logoHeight);
  } else {
    console.error('Failed to load logo image.');
  }

  // Add company details with reduced spacing and bold text
  doc.setFontSize(10 * scale);
  doc.setFont('helvetica', 'bold');
  const textX = scaledPageWidth / 2; // Center the text
  const lineSpacing = 6 * scale; // Reduced line spacing
  let currentY = 30 * scale + scaledMargin;

  doc.text(companyDetails.name, textX, currentY, { align: 'center' });
  currentY += lineSpacing;
  doc.text(companyDetails.address, textX, currentY, { align: 'center' });
  currentY += lineSpacing;
  doc.text(`Email: ${companyDetails.email}`, textX, currentY, { align: 'center' });
  currentY += lineSpacing;
  doc.text(`Phone: ${companyDetails.phone}`, textX, currentY, { align: 'center' });
  currentY += lineSpacing; // Add some extra space before the line

  // Draw a bolder line after the company details
  doc.setLineWidth(0.5 * scale); // Set line width to 0.5mm for a bolder line
  doc.line(10 * scale + scaledMargin, currentY, scaledPageWidth - 10 * scale - scaledMargin, currentY);

  // Add report title
  doc.setFontSize(14 * scale);
  doc.text(title, textX, currentY + 10 * scale, { align: 'center' });

  // Prepare table data using headers
  const tableHeaders = headers.map(header => header.Header);
  const tableData = data.map(row => headers.map(header => row[header.accessor]));

  // Calculate column widths based on header text length
  const columnStyles = headers.reduce((styles, header, index) => {
    styles[index] = { cellWidth: Math.max(16 * scale, header.Header.length * 2 * scale) }; // Adjust cellWidth as needed
    return styles;
  }, {});

  // Add table with customized styles
  autoTable(doc, {
    startY: currentY + 20 * scale,
    head: [tableHeaders],
    body: tableData,
    columnStyles: columnStyles,
    rowHeight: 8 * scale, // Set row height
    headStyles: {
      fontSize: 10 * scale, // Set font size for headers
      fontStyle: 'bold', // Bold font for headers
    },
    didDrawPage: function (data) {
      const footerY = scaledPageHeight - 15 * scale; // Set distance from bottom
      doc.setFontSize(6 * scale);
      doc.text(`Page ${doc.internal.getNumberOfPages()}`, scaledPageWidth / 2, footerY, { align: 'center' });
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
