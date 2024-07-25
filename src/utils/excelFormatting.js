import * as XLSX from 'xlsx';

const companyDetails = {
  name: "President's Award - Kenya",
  address: "15 Elgon Road, opposite the Kadhi's Court in Upper Hill, Nairobi",
  email: "info@presidentsaward.or.ke",
  phone: "0722 714 122, 0787 419 325",
};

export const formatExcelReport = (title, data) => {
  const ws = XLSX.utils.json_to_sheet(data);

  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Add the company details to the sheet
  const companyInfo = [
    [companyDetails.name],
    [companyDetails.address],
    [`Email: ${companyDetails.email}`],
    [`Phone: ${companyDetails.phone}`],
  ];
  XLSX.utils.sheet_add_aoa(ws, companyInfo, { origin: 'A1' });

  // Add the title to the sheet
  ws['A5'] = { v: title, t: 's', s: { font: { sz: 14, bold: true } } };

  // Adjust row height and column width
  ws['!cols'] = [{ wpx: 200 }];
  ws['!rows'] = [{ hpx: 25 }];

  // Add the table data
  XLSX.utils.sheet_add_json(ws, data, { origin: 'A7', skipHeader: false });

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Report');

  // Generate the file
  XLSX.writeFile(wb, `${title}.xlsx`);
};
