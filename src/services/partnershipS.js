import apiClient from './apiClient';

const addPartnerships = async (partnershipsData) => {
    try {
        const response = await apiClient.post('/api/Partnerships', partnershipsData);
        return response.data;
    } catch (error) {
        console.error('Error in addPartnerships:', error.response.data); // Log detailed error
        throw error;
    }
};

const addPartnerType = async (partnerTypeData) => {
    try {
        const response = await apiClient.post('/api/PartnerTypes', partnerTypeData);
        return response.data;
    } catch (error) {
        console.error('Error in addPartnerType:', error.response.data); // Log detailed error
        throw error;
    }
};

const getPartnerTypes = async () => {
    try {
        const response = await apiClient.get('/api/PartnerTypes');
        return response.data;
    } catch (error) {
        console.error('Error in getPartnerTypes:', error.response.data); // Log detailed error
        throw error;
    }
};

export { addPartnerships, addPartnerType, getPartnerTypes };
