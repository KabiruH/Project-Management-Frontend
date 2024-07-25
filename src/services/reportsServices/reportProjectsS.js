// src/services/reportsServices/reportS.js
import apiClient from '../apiClient';

// Endpoint for fetching institution data
const PROJECTS_API_URL = '/api/Projects';

// Function to fetch institution data
export const fetchProjectData = async () => {
  try {
    const response = await apiClient.get(PROJECTS_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching institution data:', error);
    throw error;
  }
};

// Headers configuration for the projects report
export const reportHeaders = [
    { Header: 'ID', accessor: 'projectID' },
    { Header: 'Name', accessor: 'projectName' },
    { Header: 'Institution', accessor: 'institutionName' },
    { Header: 'Start Date', accessor: 'startDate' },
    { Header: 'End Date', accessor: 'endDate' },
    { Header: 'Cost', accessor: 'cost' },
    { Header: 'Sub County', accessor: 'subCounty' },
    { Header: 'County', accessor: 'county' },
    { Header: 'Description', accessor: 'description' },
    { Header: "Coordinator's Name", accessor: 'coordinator' },
];
