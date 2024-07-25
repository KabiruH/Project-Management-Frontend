// src/services/reportsServices/reportS.js
import apiClient from '../apiClient';

// Endpoint for fetching institution data
const PARTICIPANTS_API_URL = '/api/Participants';

// Function to fetch institution data
export const fetchParticipantData = async () => {
  try {
    const response = await apiClient.get(PARTICIPANTS_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching institution data:', error);
    throw error;
  }
};

// Headers configuration for the institution report
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
