// src/services/reportsServices/reportS.js
import apiClient from '../apiClient';

// Endpoint for fetching institution data
const INSTITUTIONS_API_URL = '/api/Institutions';

// Function to fetch institution data
export const fetchInstitutionData = async () => {
  try {
    const response = await apiClient.get(INSTITUTIONS_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching institution data:', error);
    throw error;
  }
};

// Headers configuration for the institution report
export const reportHeaders = [
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
