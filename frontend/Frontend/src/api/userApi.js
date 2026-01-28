import axios from "./axios";

const BASE = "http://localhost:8081/api/users";

export const loginUser = (data) =>
  axios.post(`${BASE}/login`, data);

export const registerUser = (data) =>
  axios.post(`${BASE}/register`, data);
