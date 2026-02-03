// import axios from "./axios";
import axios from "axios";

const BASE = "http://localhost:8082/api";
const DOCTOR_BASE = "http://localhost:8083/api"

export const getAllDoctors = (specialization) =>
  axios.get(
    specialization && specialization !== "all"
      ? `${BASE}/doctors?specialization=${specialization}`
      : `${BASE}/doctors`
  );
//tEMP REMOVED FOR 1 pM
// export const getDoctorByUserId = (userId) =>
//   axios.get(`/api/doctors/user/${userId}`);
//1pM
export const getDoctorByUserId = (userId) =>
  axios.get(`/api/doctors/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

//  export const getDoctorByUserId = (userId) =>
//   axios.get(`/doctors/user/${userId}`);

