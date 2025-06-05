import api from './api';

// Get companies for the authenticated user
export const getMyCompanies = async () => {
  try {
    const res = await api.get('/companies');
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch companies' };
  }
};

// Create a new company (requires 'Owner' role)
export const createCompany = async (companyData) => {
  try {
    const res = await api.post('/companies', companyData);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create company' };
  }
};
