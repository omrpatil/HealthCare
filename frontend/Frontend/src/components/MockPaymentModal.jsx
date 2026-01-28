import { useState } from "react";
import "./MockPaymentModal.css";

function MockPaymentModal({ amount, onSuccess, onClose }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    const savedPin = localStorage.getItem("paymentPin");

    if (!savedPin) {
      setError("Please set Payment PIN in Settings");
      return;
    }

    if (!/^\d{4}$/.test(pin)) {
      setError("Enter 4-digit PIN");
      return;
    }

    if (pin !== savedPin) {
      setError("Incorrect PIN");
      return;
    }

    setError("");
    setLoading(true);

    // ⏳ REAL PAYMENT FEEL
    setTimeout(() => {
      onSuccess();
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Confirm Payment</h3>

        <p>Amount: ₹{amount}</p>

        <input
          type="password"
          maxLength="4"
          placeholder="Enter 4-digit PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button onClick={handlePay} disabled={loading}>
          {loading ? "Processing..." : "Confirm Payment"}
        </button>

        <button onClick={onClose} className="cancel">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default MockPaymentModal;
