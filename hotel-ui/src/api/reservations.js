import api from './client';

export const getReservations = () => api.get('/reservations/');

export const createReservation = (data) => api.post('/reservations/', data);

export const getReservationsByClient = (id) => api.get(`/reservations/client/${id}`);

export const cancelReservation = (reservationId, clientId) =>
    api.delete(`/reservations/${reservationId}/client/${clientId}`);

export const checkAvailability = (room_id, check_in, check_out) =>
    api.get(`/reservations/check-availability/?room_id=${room_id}&check_in=${check_in}&check_out=${check_out}`);
