import axios from "axios";

const ROOM_URL = "http://127.0.0.1:9090/rooms/";

export const getRooms = () => axios.get(ROOM_URL);

export const createRoom = (data) => axios.post(ROOM_URL, data);

export const updateRoom = (id, data) => axios.put(ROOM_URL + id, data);

export const deleteRoom = (id) => axios.delete(ROOM_URL + id);

export const getRoomsByPrice = (min, max) =>
    axios.get(`${ROOM_URL}price-range/?min_price=${min}&max_price=${max}`);
