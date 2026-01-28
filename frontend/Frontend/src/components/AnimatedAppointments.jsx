function AnimatedAppointments({ appointments, onPay, onRate }) {
  return (
    <div>
      {appointments.map((appointment, index) => (
        <div
          key={index}
          style={{
            marginBottom: "16px",
            padding: "12px",
            borderRadius: "8px",
            background: "#f8fafc",
          }}
        >
          <p><strong>Doctor:</strong> {appointment.doctorName}</p>
          <p><strong>Date:</strong> {appointment.scheduledAt}</p>
          <p><strong>Status:</strong> {appointment.status}</p>

          {/* ✅ PAY BUTTON */}
          {appointment.status === "BOOKED" && onPay && (
            <button
              onClick={() => onPay(appointment)}
              style={{
                marginTop: "8px",
                padding: "8px 14px",
                background: "#0ea5e9",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Pay
            </button>
          )}

          {/* ⭐ RATE BUTTON */}
          {appointment.status === "COMPLETED" && onRate && (
            <button
              onClick={() => onRate(appointment)}
              style={{
                marginTop: "8px",
                marginLeft: "8px",
                padding: "8px 14px",
                background: "#22c55e",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Rate Doctor
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default AnimatedAppointments;
