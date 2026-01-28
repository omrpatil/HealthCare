import { useEffect, useState } from "react";
import MockPaymentModal from "../components/MockPaymentModal";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [activePayment, setActivePayment] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // 🔁 Load payments from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("payments")) || [];
    setPayments(stored);
  }, []);

  const COMMISSION_RATE = 0.1; // 10% website commission

  // ✅ Called after successful PIN entry
  const handleSuccess = () => {
    if (!activePayment) return;

    const updated = payments.map((p) => {
      if (p.appointmentId !== activePayment.appointmentId) return p;

      const commission = Math.round(p.amount * COMMISSION_RATE);
      const doctorAmount = p.amount - commission;

      return {
        ...p,
        status: "SUCCESS",
        commission,
        doctorAmount,
        transactionId: "TXN" + Date.now(),
        receiptId: "RCPT" + Date.now(),
        date: new Date().toLocaleString(),
      };
    });

    localStorage.setItem("payments", JSON.stringify(updated));
    setPayments(updated);
    setActivePayment(null);
    setShowSuccess(true);

    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-scroll">
        <div className="dashboard-card">
          <h3 className="dashboard-card-title">Payments</h3>

          {payments.length === 0 ? (
            <p>No payment records found.</p>
          ) : (
            payments.map((p) => (
              <div
                key={p.appointmentId}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  padding: "16px",
                  marginBottom: "14px",
                  background: "#f8fafc",
                }}
              >
                <p><b>Appointment ID:</b> {p.appointmentId}</p>
                <p><b>Amount:</b> ₹{p.amount}</p>
                <p><b>Status:</b> {p.status}</p>
                <p><b>Mode:</b> {p.mode}</p>
                <p><b>Date:</b> {p.date || "-"}</p>
                <p><b>TXN:</b> {p.transactionId || "-"}</p>

                {p.status === "SUCCESS" && (
                  <>
                    <p><b>Commission:</b> ₹{p.commission}</p>
                    <p><b>Doctor Gets:</b> ₹{p.doctorAmount}</p>
                  </>
                )}

                {p.status === "PENDING" && (
                  <button
                    onClick={() => setActivePayment(p)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginTop: "10px",
                      borderRadius: "8px",
                      border: "none",
                      background:
                        "linear-gradient(180deg,#0aa3b5,#0284c7)",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Pay Now
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* 🔐 PAYMENT PIN MODAL */}
      {activePayment && (
        <MockPaymentModal
          amount={activePayment.amount}
          onSuccess={handleSuccess}
          onClose={() => setActivePayment(null)}
        />
      )}

      {/* ✅ SUCCESS MODAL */}
      {showSuccess && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 style={{ color: "green" }}>✅ Payment Successful</h2>
            <p>Transaction completed</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payments;
