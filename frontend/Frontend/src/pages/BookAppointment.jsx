import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAppointmentsByDoctor } from "../api/appointmentApi";   //added 1 Pm

import { bookAppointment } from "../api/appointmentApi";
import { validateAppointmentTime } from "../utils/appointmentTimeValidator";
;

function BookAppointment() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const doctorId = params.get("doctorId");
  const fee = Number(params.get("fee"));
  const patientId = localStorage.getItem("userId");
  const [appointments, setAppointments] = useState([]); 

  const [scheduledAt, setScheduledAt] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


useEffect(() => {
  if (!doctorId) return;

  getAppointmentsByDoctor(doctorId)
    .then((res) => {
      console.log("DOCTOR APPOINTMENTS:", res.data);
      setAppointments(res.data || []);
    })
    .catch((err) => {
      console.error("Failed to fetch doctor appointments", err);
      setAppointments([]);
    });
}, [doctorId]);

// useEffect(() => {
//   if (!doctorId) return;

//   getAppointmentsByDoctor(doctorId)
//     .then((res) => {
//       console.log("DOCTOR APPOINTMENTS:", res.data);
//       setAppointments(res.data || []);
//     })
//     .catch((err) => {
//       console.error("Failed to fetch doctor appointments", err);
//       setAppointments([]);
//     });
// }, [doctorId]);


//      useEffect(() => {
//   if (!doctorId) return;

// //  fetch(`http://localhost:8080/api/appointments/doctor/${doctorId}`)     
// fetch(`http://localhost:8083/api/appointments/doctor/${doctorId}`)   //changed 1 Pm 02/02/2026


//     .then(res => res.json())
//     .then(data => {
//       console.log("DOCTOR APPOINTMENTS:", data); // 👈 ADD THIS
//       setAppointments(data || []);
//     })
//     .catch(() => setAppointments([]));
// }, [doctorId]);


  // ================= VALIDATION =================
  const validate = () => {
    if (!doctorId) return "Doctor not selected.";
    if (!patientId) return "Please login to book appointment.";
    if (!scheduledAt) return "Please select appointment date & time.";

    const selectedDate = new Date(scheduledAt);
    const now = new Date();

    if (isNaN(selectedDate.getTime()))
      return "Invalid date and time.";

    

    // ✅ FUTURE APPOINTMENT ONLY
    if (selectedDate.getTime() <= now.getTime())
      return "Appointment must be scheduled in the future.";

    const timeError = validateAppointmentTime(
    scheduledAt,
    appointments
);

if (timeError) return timeError;


    return "";
  };
  

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    if (loading) return; // prevent double click

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const payload = {
        doctorId: Number(doctorId),
        patientId: Number(patientId),
        scheduledAt,
        consultationFee: fee,
        type: "CONSULTATION",
      };

      console.log("BOOK PAYLOAD:", payload);

      // ✅ BACKEND BOOKING
      await bookAppointment(payload);
      // ✅ Generate prescription after payment (frontend only)



      // ✅ TEMP PAYMENT RECORD (frontend mock only)
      const payments =
        JSON.parse(localStorage.getItem("payments")) || [];

      payments.push({
        appointmentId: Date.now(),
        doctorId: Number(doctorId),
        patientId: Number(patientId),
        amount: fee,
        status: "PENDING",
        mode: "Mock Gateway",
        transactionId: null,
        date: null,
      });

      localStorage.setItem("payments", JSON.stringify(payments));

      alert("✅ Appointment booked successfully. Please complete payment.");

    

      
      

      // ✅ SAFE REDIRECT
      navigate("/dashboard");
    } catch (err) {
      console.error("BOOK ERROR:", err.response?.data || err);
      setError(
        "Unable to book appointment right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-scroll">
        <div className="dashboard-card" style={{ maxWidth: "420px" }}>
          <h3 className="dashboard-card-title">Book Appointment</h3>

          <p>
            Doctor ID: <strong>{doctorId || "-"}</strong>
          </p>

          <p>
            Consultation Fee: <strong>₹{fee}</strong>
          </p>

          <input
            type="datetime-local"
            value={scheduledAt}
            min={new Date().toISOString().slice(0, 16)} // ✅ UI-level future guard
            onChange={(e) => setScheduledAt(e.target.value)}
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #cbdde6",
              marginBottom: "12px",
            }}
          />

          {error && (
            <p style={{ color: "#dc2626", marginBottom: "12px" }}>
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              background: loading
                ? "#94a3b8"
                : "linear-gradient(180deg, #0aa3b5, #0284c7)",
              color: "#fff",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "600",
            }}
          >
            {loading ? "Booking appointment..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;
