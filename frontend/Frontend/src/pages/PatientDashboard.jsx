import { useEffect, useState } from "react";
import AnimatedAppointments from "../components/AnimatedAppointments";
import { getAppointmentsByPatient } from "../api/appointmentApi";

function PatientDashboard() {
  const patientName = localStorage.getItem("name") || "User";
  const patientId = localStorage.getItem("userId");

  const [appointments, setAppointments] = useState([]);
  const [doctorMap, setDoctorMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!patientId) {
      setLoading(false);
      return;
    }

    const fetchAppointments = async () => {
      try {
        // 1️⃣ Fetch appointments
        const res = await getAppointmentsByPatient(patientId);

        const formatted = res.data.map((a) => ({
          id: a.id,
          doctorId: a.doctorId,
          scheduledAt: new Date(a.scheduledAt).toLocaleString(),
          status: a.status,
        }));

        setAppointments(formatted);

        // 2️⃣ Fetch doctor names (unique doctorIds only)
        const uniqueDoctorIds = [
          ...new Set(res.data.map((a) => a.doctorId)),
        ];

        const map = {};

        for (const id of uniqueDoctorIds) {
          try {
            const response = await fetch(
              `http://localhost:8082/api/doctors/${id}`
            );
            const data = await response.json();
            map[id] = data.doctorName;
          } catch {
            map[id] = "Doctor";
          }
        }

        setDoctorMap(map);
      } catch (err) {
        console.error("Fetch appointments error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [patientId]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-scroll">
        <div className="dashboard-card" style={{ marginBottom: "24px" }}>
          <h3>Hello, {patientName} 👋</h3>
          <p style={{ color: "#64748b", marginTop: "6px" }}>
            Here’s a quick look at your appointments
          </p>
        </div>

        <div className="dashboard-card">
          <h3 className="dashboard-card-title">Your Appointments</h3>

          {loading ? (
            <p>Loading appointments...</p>
          ) : appointments.length > 0 ? (
            <AnimatedAppointments
              appointments={appointments.map((a) => ({
                ...a,
                doctorName: doctorMap[a.doctorId] || "Doctor",
              }))}
            />
          ) : (
            <p>No appointments found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
