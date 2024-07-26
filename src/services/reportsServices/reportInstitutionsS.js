// src/services/reportsServices/reportS.js
import apiClient from '../apiClient';
import { formatDate } from '../reportsServices/formatDate';

// Endpoint for fetching institution data
const INSTITUTIONS_API_URL = '/api/Institutions';

// Function to fetch institution data
export const fetchInstitutionData = async () => {
  try {
    const response = await apiClient.get(INSTITUTIONS_API_URL);
    // Format dates in the response data
    const formattedData = response.data.map(item => ({
      ...item,
      licenseStartDate: formatDate(item.licenseStartDate),
      licenseEndDate: formatDate(item.licenseEndDate),
    }));
    return formattedData;
  } catch (error) {
    console.error('Error fetching institution data:', error);
    throw error;
  }
};

// Headers configuration for the institution report
export const institutionHeaders = [
  { Header: 'ID', accessor: 'institutionID' },
  { Header: 'Name', accessor: 'institutionName' },
  { Header: 'Stage', accessor: 'stageID' },
  { Header: 'Status', accessor: 'statusID' },
  { Header: 'Email', accessor: 'institutionEmail' },
  { Header: 'Contact', accessor: 'institutionContact' },
  { Header: 'County', accessor: 'countyID' },
  { Header: 'Sub-County', accessor: 'subCounty' },
  { Header: 'Contact Person', accessor: 'contactPerson' },
  { Header: 'Contact Number', accessor: 'contactNumber' },
  { Header: 'License Start Date', accessor: 'licenseStartDate' },
  { Header: 'License End Date', accessor: 'licenseEndDate' },
  { Header: 'Award Leader', accessor: 'awardLeader' },
];
