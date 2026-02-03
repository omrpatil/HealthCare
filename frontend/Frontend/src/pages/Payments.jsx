import { useEffect, useState } from "react";
import { getPaymentsByPatient } from "../api/paymentApi";

function Payments() {
  const patientId = localStorage.getItem("userId");
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!patientId) {
      setLoading(false);
      return;
    }

    const fetchPayments = async () => {
      try {
        const res = await getPaymentsByPatient(patientId);
        setPayments(res.data);
      } catch (err) {
        console.error("Failed to load payments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [patientId]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        <h3 className="dashboard-card-title">Transaction History</h3>

        {loading ? (
          <p>Loading transactions...</p>
        ) : payments.length === 0 ? (
          <p>No transactions found</p>
        ) : (
          payments.map((p) => (
            <div
              key={p.id}
              style={{
                border: "1px solid #e2e8f0",
                padding: "14px",
                borderRadius: "10px",
                marginBottom: "12px",
                background: "#f8fafc",
              }}
            >
              <p><b>Appointment ID:</b> {p.appointmentId}</p>
              <p><b>Amount:</b> ₹{p.amount}</p>
              <p><b>Method:</b> {p.method}</p>
              <p><b>Status:</b> {p.status}</p>
              <p><b>Date:</b> {new Date(p.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Payments;
