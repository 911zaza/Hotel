import axios from "axios";

const CLIENT_URL = "http://127.0.0.1:9090/clients/";

export const getClients = () => axios.get(CLIENT_URL);

export const getClientById = (id) => axios.get(CLIENT_URL + id);

export const createClient = (data) => axios.post(CLIENT_URL, data);

export const updateClient = (id, data) => axios.put(CLIENT_URL + id, data);

export const deleteClient = (id) => axios.delete(CLIENT_URL + id);
