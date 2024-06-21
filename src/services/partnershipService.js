import apiClient from './apiClient';

const addPartnerships = async (PartnershipsData) => {
    try {
        const response = await apiClient.post('/api/Partnerships', PartnershipsData);
        return response.data;
    } catch (error) {
        console.error('Error in addPartnerships:', error.response.data); // Log detailed error
        throw error;
    }
};

export { addPartnerships };
