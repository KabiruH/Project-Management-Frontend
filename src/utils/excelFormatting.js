import * as XLSX from 'xlsx';

const companyDetails = {
  name: "President's Award - Kenya",
  address: "15 Elgon Road, opposite the Kadhi's Court in Upper Hill, Nairobi",
  email: "info@presidentsaward.or.ke",
  phone: "0722 714 122, 0787 419 325",
};

export const formatExcelReport = async (title, data, headers) => {
  // Create a new workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([]);

  // Load logo image as base64
  const logoUrl = `${process.env.PUBLIC_URL}/assets/logo.png`;
  const logoBase64 = await getImageBase64(logoUrl);

  // Add the company details and title to the sheet
  const companyInfo = [
    [{ v: '', t: 's' }], // Placeholder for logo
    [{ v: companyDetails.name, s: { font: { sz: 14, bold: true }, alignment: { horizontal: 'center' } } }],
    [{ v: companyDetails.address, s: { font: { sz: 12 }, alignment: { horizontal: 'center' } } }],
    [{ v: `Email: ${companyDetails.email}`, s: { font: { sz: 12 }, alignment: { horizontal: 'center' } } }],
    [{ v: `Phone: ${companyDetails.phone}`, s: { font: { sz: 12 }, alignment: { horizontal: 'center' } } }],
    [], // Empty row for spacing
    [{ v: title, s: { font: { sz: 16, bold: true }, alignment: { horizontal: 'center' } } }],
  ];
  XLSX.utils.sheet_add_aoa(ws, companyInfo, { origin: 'A1' });

  // Determine the number of columns to merge (based on headers length)
  const totalColumns = headers.length;
  const mergeEndCol = String.fromCharCode(64 + totalColumns); // E.g., 'E' for 5 columns

  // Merge cells for logo, company details, and title
  ws['!merges'] = [
    { s: { c: 0, r: 0 }, e: { c: totalColumns - 1, r: 0 } }, // Logo row
    { s: { c: 0, r: 1 }, e: { c: totalColumns - 1, r: 1 } }, // Company name
    { s: { c: 0, r: 2 }, e: { c: totalColumns - 1, r: 2 } }, // Address
    { s: { c: 0, r: 3 }, e: { c: totalColumns - 1, r: 3 } }, // Email
    { s: { c: 0, r: 4 }, e: { c: totalColumns - 1, r: 4 } }, // Phone
    { s: { c: 0, r: 6 }, e: { c: totalColumns - 1, r: 6 } }, // Title
  ];

  // Add the headers to the sheet using the provided headers
  const headerRow = headers.map(header => ({
    v: header.Header,
    s: {
      font: { bold: true },
      alignment: { horizontal: 'center' }
    }
  }));
  XLSX.utils.sheet_add_aoa(ws, [headerRow], { origin: 'A8' });

  // Add the table data starting from the 9th row (index 8)
  const tableData = data.map(row => headers.map(header => row[header.accessor]));
  XLSX.utils.sheet_add_aoa(ws, tableData, { origin: 'A9' });

  // Adjust column widths
  ws['!cols'] = headers.map(header => ({ wpx: 100 }));

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Report');

  // Generate the file
  XLSX.writeFile(wb, `${title}.xlsx`);
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
