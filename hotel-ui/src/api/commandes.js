import api from './client';

export const getCommandes = () => api.get('/commandes/');
export const createCommande = (data) => api.post('/commandes/', data);
export const updateCommande = (id, data) => api.put(`/commandes/${id}`, data);
export const deleteCommande = (id) => api.delete(`/commandes/${id}`);
export const getCommandesByClient = (clientId) => api.get(`/commandes/client/${clientId}`);