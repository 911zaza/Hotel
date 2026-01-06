import api from './client';

export const getPlats = () => api.get('/plats/');
export const createPlat = (data) => api.post('/plats/', data);
export const updatePlat = (id, data) => api.put(`/plats/${id}`, data);
export const deletePlat = (id) => api.delete(`/plats/${id}`);

export const uploadPlatImage = (file) => {
  const form = new FormData();
  form.append('file', file);
  return api.post('/plats/upload-image', form, { headers: { 'Content-Type': 'multipart/form-data' } });
};