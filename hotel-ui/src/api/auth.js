import axios from "axios";

const AUTH_URL = "http://127.0.0.1:9090/auth/";

export const register = (data) => axios.post(AUTH_URL + "register", data);

export const login = (data) => axios.post(AUTH_URL + "login", data);

export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("No token");
  return axios.get(AUTH_URL + "me", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const logout = () => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.post(AUTH_URL + "logout", {}, {
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => {});
  }
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

