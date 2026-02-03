import axios from "./axios";

const BASE = "http://localhost:8084/api/payments";

/**
 * Backend expects:
 * appointmentId
 * amount
 * method
 */
export const makePayment = (data) => {
  return axios.post(BASE, data);

};

 export const getPaymentsByPatient = (patientId) => {
  return axios.get(`${BASE}/patient/${patientId}`);
};
