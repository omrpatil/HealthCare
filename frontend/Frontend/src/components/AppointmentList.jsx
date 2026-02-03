import "./AnimatedAppointments.css";

function AppointmentList({
  appointments = [],
  role,
  onConfirm,
  onCancel,
  onComplete,
}) {
  if (!appointments.length) {
    return <p style={{ color: "#64748b" }}>No appointments found</p>;
  }

  return (
    <div className="appointments-container">
      <div className="appointments-list">
        {appointments.map((a) => (
          <div className="appointment-item-wrapper" key={a.id}>
            <div className="appointment-item">
              
              {/* LEFT INFO */}
              <div>
                <p>
                  <strong>
                    {role === "DOCTOR"
                      ? a.patientName || "Patient"
                      : a.doctorName || "Doctor"}
                  </strong>
                </p>

                <p>
                  <b>Date:</b>{" "}
                  {new Date(a.scheduledAt).toLocaleString()}
                </p>

                <span className={`status ${a.status}`}>
                  {a.status}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="appointment-actions">
                {/* DOCTOR ACTIONS */}
                {role === "DOCTOR" && a.status === "BOOKED" && (
                  <button
                    onClick={() => onConfirm?.(a.id)}
                    className="view-btn"
                  >
                    Confirm
                  </button>
                )}

                {role === "DOCTOR" && a.status === "CONFIRMED" && (
                  <button
                    onClick={() => onComplete?.(a.id)}
                    className="view-btn"
                    style={{
                      borderColor: "#16a34a",
                      color: "#16a34a",
                    }}
                  >
                    Complete
                  </button>
                )}

                {/* PATIENT ACTIONS */}
                {role === "PATIENT" && a.status === "BOOKED" && (
                  <button
                    onClick={() => onCancel?.(a)}
                    className="view-btn"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppointmentList;
