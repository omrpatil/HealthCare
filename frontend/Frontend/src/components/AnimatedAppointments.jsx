function AnimatedAppointments({ appointments, onPay, onCancel }) {
  return (
    <div>
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          style={{
            marginBottom: "16px",
            padding: "14px",
            borderRadius: "10px",
            background: "#f8fafc",
            boxShadow: "0 6px 18px rgba(15, 23, 42, 0.06)",
          }}
        >
          <p>
            <strong>Doctor ID:</strong> {appointment.doctorId}
          </p>
          {/* <p><strong>Doctor:</strong> {appointment.doctorName}</p> */}
          <p><strong>Date:</strong> {appointment.scheduledAt}</p>

          <span className={`status ${appointment.status.toLowerCase()}`}>
            {appointment.status}
          </span>

          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
            
            {/* PAY */}
            {appointment.status === "BOOKED" && (
              <button
                //onClick={() => onPay(appointment)}
                onClick={() => onPay({ ...appointment, fee: appointment.fee })}
                style={{
                  padding: "6px 14px",
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

            {/* CANCEL */}
            {appointment.status === "BOOKED" && (
              <button
                onClick={() => onCancel(appointment)}
                style={{
                  padding: "6px 14px",
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnimatedAppointments;
