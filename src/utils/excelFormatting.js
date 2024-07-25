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

  // Add the logo and company details to the sheet
  const companyInfo = [
    [{ v: '', t: 's' }], // Placeholder for logo
    [companyDetails.name],
    [companyDetails.address],
    [`Email: ${companyDetails.email}`],
    [`Phone: ${companyDetails.phone}`],
    [], // Empty row for spacing
    [title], // Report title
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

  // Style the merged cells with center alignment and bold text
  const centerBoldStyle = { font: { sz: 14, bold: true }, alignment: { horizontal: 'center' } };
  const detailsRows = [0, 1, 2, 3, 4, 6];
  detailsRows.forEach((row) => {
    for (let col = 0; col < totalColumns; col++) {
      const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
      ws[cellRef] = { t: 's', v: ws[cellRef] ? ws[cellRef].v : '', s: centerBoldStyle };
    }
  });

  // Add the logo as an image in the sheet (if available)
  if (logoBase64) {
    const imgCell = ws['A1'];
    imgCell.l = { Target: logoBase64, Tooltip: 'Company Logo' };
    imgCell.v = ''; // Ensure the cell value is empty
  }

  // Add the headers to the sheet
  XLSX.utils.sheet_add_aoa(ws, [headers.map(header => header.Header)], { origin: `A8` });

  // Apply bold style to headers
  headers.forEach((header, colIndex) => {
    const cellRef = XLSX.utils.encode_cell({ r: 7, c: colIndex }); // Header row at index 7 (1-indexed)
    if (ws[cellRef]) {
      ws[cellRef].s = { font: { bold: true }, alignment: { horizontal: 'center' } };
    }
  });

  // Add the table data starting from the 9th row (index 8)
  XLSX.utils.sheet_add_json(ws, data, { origin: 'A9', skipHeader: true });

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
