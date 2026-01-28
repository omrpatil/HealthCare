import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { bookAppointment } from "../api/appointmentApi";

function BookAppointment() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const doctorId = params.get("doctorId");
  const fee = Number(params.get("fee"));

  const [scheduledAt, setScheduledAt] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const patientId = localStorage.getItem("userId");

  const validate = () => {
    if (!doctorId) return "Doctor not selected";
    if (!patientId) return "User not logged in";
    if (!scheduledAt) return "Please select date and time";
    return "";
  };

  const handleSubmit = async () => {
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
        scheduledAt: scheduledAt,
        type: "CONSULTATION",
      };

      console.log("BOOK PAYLOAD:", payload);

      // ✅ BACKEND APPOINTMENT BOOKING
      await bookAppointment(payload);

      // ✅ MOCK PAYMENT CREATION (FRONTEND)
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

      localStorage.setItem(
        "payments",
        JSON.stringify(payments)
      );

      alert("✅ Appointment booked. Please complete payment.");

      setScheduledAt("");

      // ✅ REDIRECT TO PAYMENTS
      navigate("/payments");
    } catch (err) {
      console.error("BOOK ERROR:", err.response?.data || err);
      setError("Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-scroll">
        <div
          className="dashboard-card"
          style={{ maxWidth: "420px" }}
        >
          <h3 className="dashboard-card-title">
            Book Appointment
          </h3>

          <p>
            Doctor ID: <strong>{doctorId}</strong>
          </p>
          <p>
            Consultation Fee: <strong>₹{fee}</strong>
          </p>

          <input
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #cbdde6",
              marginBottom: "12px",
            }}
          />

          {error && (
            <p style={{ color: "red", marginBottom: "12px" }}>
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
              background:
                "linear-gradient(180deg, #0aa3b5, #0284c7)",
              color: "#fff",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;
