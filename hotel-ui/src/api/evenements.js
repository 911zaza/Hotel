import api from './client';

export const getEvenements = () => api.get('/evenements/');
export const getEvenement = (id) => api.get(`/evenements/${id}`);
export const createEvenement = (data) => api.post('/evenements/', data);
export const updateEvenement = (id, data) => api.put(`/evenements/${id}`, data);
export const deleteEvenement = (id) => api.delete(`/evenements/${id}`);

export const uploadEvenementImage = (file) => {
	const form = new FormData();
	form.append('file', file);
	return api.post('/evenements/upload-image', form, { headers: { 'Content-Type': 'multipart/form-data' } });
};