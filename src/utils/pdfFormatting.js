import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const companyDetails = {
  name: "President's Award - Kenya",
  address: "15 Elgon Road, opposite the Kadhi's Court in Upper Hill, Nairobi",
  email: "info@presidentsaward.or.ke",
  phone: "0722 714 122, 0787 419 325",
};

export const formatPDFReport = async (title, data) => {
  const doc = new jsPDF();

  // Load logo and add to PDF
  const logoUrl = `${process.env.PUBLIC_URL}/assets/logo.png`;
  const logoBase64 = await getImageBase64(logoUrl);
  
  if (logoBase64) {
    doc.addImage(logoBase64, 'PNG', 10, 10, 30, 15);
  } else {
    console.error('Failed to load logo image.');
  }

  // Add company details
  doc.setFontSize(10);
  doc.text(companyDetails.name, 50, 15);
  doc.text(companyDetails.address, 50, 25);
  doc.text(`Email: ${companyDetails.email}`, 50, 35);
  doc.text(`Phone: ${companyDetails.phone}`, 50, 45);

  // Add report title
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 14, 60);

  // Add table
  autoTable(doc, {
    startY: 70,
    head: [Object.keys(data[0])],
    body: data.map(item => Object.values(item)),
    didDrawPage: function (data) {
      const pageHeight = doc.internal.pageSize.height;
      const footerY = pageHeight - 30;
      doc.setFontSize(10);
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
