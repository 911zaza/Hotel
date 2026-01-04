import axios from "axios";

const RESERVATION_URL = "http://127.0.0.1:9090/reservations/";

export const getReservations = () => axios.get(RESERVATION_URL);

export const createReservation = (data) => axios.post(RESERVATION_URL, data);

export const getReservationsByClient = (id) =>
    axios.get(RESERVATION_URL + "client/" + id);

export const cancelReservation = (reservationId, clientId) =>
    axios.delete(`${RESERVATION_URL}${reservationId}/client/${clientId}`);

export const checkAvailability = (room_id, check_in, check_out) =>
    axios.get(
        `${RESERVATION_URL}check-availability/?room_id=${room_id}&check_in=${check_in}&check_out=${check_out}`
    );
