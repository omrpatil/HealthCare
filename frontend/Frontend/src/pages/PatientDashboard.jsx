import { useEffect, useState } from "react";
import AnimatedAppointments from "../components/AnimatedAppointments";



import PaymentModal from "../components/PaymentModal"; // ✅ NEW
import {
  getAppointmentsByPatient,
  updateAppointmentStatus,
} from "../api/appointmentApi";
import { makePayment } from "../api/paymentApi";

function PatientDashboard() {
  const patientName = localStorage.getItem("name") || "User";
  const patientId = localStorage.getItem("userId");

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  // ✅ Payment modal state
  const [activePayment, setActivePayment] = useState(null);

  // ================= CANCEL =================
  const handleCancel = async (appointment) => {
    try {
      await updateAppointmentStatus(appointment.id, "CANCELLED");

      setAppointments((prev) =>
        prev.map((a) =>
          a.id === appointment.id
            ? { ...a, status: "CANCELLED" }
            : a
        )
      );
    } catch (err) {
      alert("Cancel failed");
      console.error(err);
    }
  };

  // ================= PAY (OPEN MODAL ONLY) =================
  const handlePay = (appointment) => {
    setActivePayment(appointment);
  };

  // ================= CONFIRM PAYMENT =================
  const confirmPayment = async ({ appointmentId, amount, method }) => {
    try {
      // 💳 Call payment-service
      await makePayment({
        appointmentId,
        amount,
        method,
      });

      // ✅ Mark appointment as COMPLETED
      await updateAppointmentStatus(appointmentId, "COMPLETED");

      setAppointments((prev) =>
        prev.map((a) =>
          a.id === appointmentId
            ? { ...a, status: "COMPLETED" }
            : a
        )
      );


      setActivePayment(null);
      alert("Payment successful");
    } catch (err) {
      alert("Payment failed");
      console.error(err);
    }
  };

  // ================= FETCH =================
  useEffect(() => {
    if (!patientId) return;

    const fetchAppointments = async () => {
      try {
        const res = await getAppointmentsByPatient(patientId);

        // const formatted = res.data.map((a) => ({
        //   id: a.id,
        //   // doctorName: a.doctorName,
        //   doctorId: a.doctorId,
        //   scheduledAt: new Date(a.scheduledAt).toLocaleString(),
        //   status: a.status,
        //   fee: a.consultationFee,    
        // }));

        // setAppointments(formatted);
        const formatted = res.data.map((a) => ({
          id: a.id,
          doctorId: a.doctorId,
          scheduledAt: new Date(a.scheduledAt).toLocaleString(),
          status: a.status,
          fee: a.consultationFee, // ✅ ONLY backend value
        }));

        setAppointments(formatted);        // ⭐ USE formatted

      } catch (err) {
        console.error("Fetch appointments error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [patientId]);

  // ================= FILTER =================
  const filteredAppointments =
    filter === "ALL"
      ? appointments
      : appointments.filter((a) => a.status === filter);

  return (
    <div className="dashboard-page">
      <h3>Hello, {patientName} 👋</h3>

      {/* FILTERS */}
      <div className="appointments-filters">
        {["ALL", "BOOKED", "COMPLETED", "CANCELLED"].map((s) => (
          <button
            key={s}
            className={filter === s ? "active" : ""}
            onClick={() => setFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* LIST */}
      {loading ? (
        <p>Loading appointments...</p>
      ) : filteredAppointments.length > 0 ? (
        <AnimatedAppointments
          appointments={filteredAppointments}
          onPay={handlePay}
          onCancel={handleCancel}
        />
      ) : (
        <p>No appointments found</p>
      )}

      {/* 💳 PAYMENT MODAL */}
      {activePayment && (
        <PaymentModal
          appointment={activePayment}
          onConfirm={confirmPayment}
          onClose={() => setActivePayment(null)}
        />
      )}
    </div>
  );
}

export default PatientDashboard;
