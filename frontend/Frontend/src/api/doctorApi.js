import axios from "./axios";

const BASE = "http://localhost:8082/api";

export const getAllDoctors = (specialization) =>
  axios.get(
    specialization && specialization !== "all"
      ? `${BASE}/doctors?specialization=${specialization}`
      : `${BASE}/doctors`
  );
