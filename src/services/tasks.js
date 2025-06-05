import api from './api';

// Create a new task (Manager only)
export const createTask = async (taskData) => {
  try {
    const res = await api.post('/tasks', taskData);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create task' };
  }
};

// Get tasks for a specific project
export const getProjectTasks = async (projectId) => {
  try {
    const res = await api.get(`/tasks/project/${projectId}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch project tasks' };
  }
};

// Update the status of a task (Manager or Member)
export const updateTaskStatus = async (taskId, status) => {
  try {
    const res = await api.put(`/tasks/${taskId}/status`, { status });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update task status' };
  }
};

// Add a subtask to a task (Manager only)
export const addSubtask = async (taskId, subtaskData) => {
  try {
    const res = await api.post(`/tasks/${taskId}/subtask`, subtaskData);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to add subtask' };
  }
};

// Add an attachment to a task (Manager or Member)
export const addAttachment = async (taskId, attachmentData) => {
  try {
    const res = await api.post(`/tasks/${taskId}/attachment`, attachmentData, {
      headers: {
        'Content-Type': 'multipart/form-data', // assuming attachments are files
      },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to add attachment' };
  }
};
