import api from './api';

export async function loginApi(email, password) {
  try {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
}
