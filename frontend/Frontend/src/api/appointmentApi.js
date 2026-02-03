
import axios from "./axios";

const BASE = "http://localhost:8083/api/appointments";

export const bookAppointment = (data) =>
  axios.post(BASE, data);

export const getAppointmentsByPatient = (patientId) =>
  axios.get(`${BASE}/patient/${patientId}`);

export const getAppointmentsByDoctor = (doctorId) =>
  axios.get(`${BASE}/doctor/${doctorId}`);

export const updateAppointmentStatus = (id, status) =>
  axios.put(`${BASE}/${id}/status`, null, {
    params: { status },
  });

// import axios from "axios";

// const APPOINTMENT_BASE = "http://localhost:8082/api/appointments";

// export const getAppointmentsByDoctor = (doctorId) =>
//   axios.get(`${APPOINTMENT_BASE}/doctor/${doctorId}`);

// export const updateAppointmentStatus = (id, status) =>
//   axios.put(`${APPOINTMENT_BASE}/${id}/status`, null, {
//     params: { status },
//   });


//final changes // 02/02/2026 1 Pm
// import axiosAppointment from "./axiosAppointment";

// export const bookAppointment = (data) =>
//   axiosAppointment.post("/appointments", data);

// export const getAppointmentsByPatient = (patientId) =>
//   axiosAppointment.get(`/appointments/patient/${patientId}`);

// export const getAppointmentsByDoctor = (doctorId) =>
//   axiosAppointment.get(`/appointments/doctor/${doctorId}`);

// export const updateAppointmentStatus = (id, status) =>
//   axiosAppointment.put(`/appointments/${id}/status`, null, {
//     params: { status },
//   });


