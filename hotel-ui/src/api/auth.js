import api from './client';

export const register = (data) => api.post('/auth/register', data);

export const login = (data) => api.post('/auth/login', data);

export const getCurrentUser = () => api.get('/auth/me');

export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (_) {}
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

