// src/services/reportsServices/reportS.js
import apiClient from '../apiClient';
import { formatDate } from '../reportsServices/formatDate';

// Endpoint for fetching participant data
const PARTICIPANTS_API_URL = '/api/Participants';

// Function to fetch participant data
export const fetchParticipantData = async () => {
  try {
    const response = await apiClient.get(PARTICIPANTS_API_URL);
    // Format DOB in the response data
    const formattedData = response.data.map(item => ({
      ...item,
      dob: formatDate(item.dob),
    }));
    return formattedData;
  } catch (error) {
    console.error('Error fetching participant data:', error);
    throw error;
  }
};

// Headers configuration for the participant report
export const participantHeaders = [
    { Header: 'Admin Number', accessor: 'adminNumber' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Date of Birth', accessor: 'dob' },
    { Header: 'Gender', accessor: 'gender' },
    { Header: 'Phone Number', accessor: 'phoneNumber' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Institution Name', accessor: 'institutionName' },
    { Header: 'Sub-County', accessor: 'subCounty' },
    { Header: 'County', accessor: 'county' },
    { Header: 'Award Level', accessor: 'awardLevel' },
    { Header: 'Award Leader', accessor: 'awardLeader' },
];
