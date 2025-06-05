import api from './api';

// Create a new project (requires Manager role)
export const createProject = async (projectData) => {
  try {
    const res = await api.post('/projects', projectData);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create project' };
  }
};

// Get projects for a specific team
export const getTeamProjects = async (teamId) => {
  try {
    const res = await api.get(`/projects/${teamId}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch team projects' };
  }
};
