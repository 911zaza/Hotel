import api from './client';

export const getPlats = () => api.get('/plats/');
export const createPlat = (data) => api.post('/plats/', data);
export const updatePlat = (id, data) => api.put(`/plats/${id}`, data);
export const deletePlat = (id) => api.delete(`/plats/${id}`);