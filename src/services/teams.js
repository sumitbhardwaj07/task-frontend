import api from './api';

// Create a new team (Owner or Manager only)
export const createTeam = async (teamData) => {
  try {
    const res = await api.post('/teams', teamData);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create team' };
  }
};

// Get all teams for a specific company
export const getCompanyTeams = async (companyId) => {
  try {
    const res = await api.get(`/teams/${companyId}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch teams' };
  }
};
