import { useState } from "react";
import "./PaymentModal.css";

function PaymentModal({ appointment, onConfirm, onClose }) {
  const [method, setMethod] = useState("UPI");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const amount = appointment.fee; 
  const handlePay = () => {
    if (!/^\d{4}$/.test(pin)) {
      setError("Enter a valid 4-digit PIN");
      return;
    }

    setError("");
    setLoading(true);

    // ⏳ simulate real payment delay
    setTimeout(() => {
      onConfirm({
        appointmentId: appointment.id,
        amount,
        method,
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="payment-overlay">
      <div className="payment-modal">
        <h3>Confirm Payment</h3>

        {/* <p className="amount">₹{amount}</p> */}
        <p className="amount">₹{appointment.fee}</p>


        {/* PAYMENT METHOD */}
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="UPI">UPI</option>
          <option value="CARD">Debit / Credit Card</option>
          <option value="WALLET">Wallet</option>
        </select>

        {/* PIN */}
        <input
          type="password"
          maxLength="4"
          placeholder="Enter 4-digit PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button onClick={handlePay} disabled={loading}>
          {loading ? "Processing..." : "Pay Securely"}
        </button>

        <button className="cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default PaymentModal;
