import axios from "./axios";

const BASE = "http://localhost:8083/api/appointments";

export const bookAppointment = (data) =>
  axios.post(BASE, data);

export const getAppointmentsByPatient = (patientId) =>
  axios.get(`${BASE}/patient/${patientId}`);

export const getAppointmentsByDoctor = (doctorId) =>
  axios.get(`${BASE}/doctor/${doctorId}`);
