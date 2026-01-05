import api from './client';

export const getEvenements = () => api.get('/evenements/');
export const getEvenement = (id) => api.get(`/evenements/${id}`);
export const createEvenement = (data) => api.post('/evenements/', data);
export const updateEvenement = (id, data) => api.put(`/evenements/${id}`, data);
export const deleteEvenement = (id) => api.delete(`/evenements/${id}`);