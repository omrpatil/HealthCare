import { useState, useEffect } from "react";

function Settings() {
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("paymentPin");
    if (saved) setPin(saved);
  }, []);

  const savePin = () => {
    if (!/^\d{4}$/.test(pin)) {
      setMessage("❌ PIN must be exactly 4 digits");
      return;
    }

    localStorage.setItem("paymentPin", pin);
    setMessage("✅ Payment PIN saved");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-scroll">
        <div className="dashboard-card" style={{ maxWidth: "420px" }}>
          <h3 className="dashboard-card-title">Settings</h3>

          <label>Set 4-Digit Payment PIN</label>

          <input
            type="password"
            maxLength="4"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />

          <button onClick={savePin}>Save PIN</button>

          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Settings;
