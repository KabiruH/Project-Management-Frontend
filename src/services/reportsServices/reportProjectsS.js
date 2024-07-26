// src/services/reportsServices/reportS.js
import apiClient from '../apiClient';
import { formatDate } from '../reportsServices/formatDate';

// Endpoint for fetching project data
const PROJECTS_API_URL = '/api/Projects';

// Function to fetch project data
export const fetchProjectData = async () => {
  try {
    const response = await apiClient.get(PROJECTS_API_URL);
    // Format startDate and endDate in the response data
    const formattedData = response.data.map(item => ({
      ...item,
      startDate: formatDate(item.startDate),
      endDate: formatDate(item.endDate),
    }));
    return formattedData;
  } catch (error) {
    console.error('Error fetching project data:', error);
    throw error;
  }
};

// Headers configuration for the projects report
export const projectHeaders = [
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
