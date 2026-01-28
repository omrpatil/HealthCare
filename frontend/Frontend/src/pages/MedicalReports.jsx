import { useEffect, useState } from "react";

function MedicalReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("medicalReports")) || [];
    setReports(stored);
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-scroll">
        <div className="dashboard-card">
          <h3 className="dashboard-card-title">Medical Reports</h3>

          {reports.length === 0 ? (
            <p>No medical reports available.</p>
          ) : (
            reports.map((r, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #e2e8f0",
                  padding: "16px",
                  borderRadius: "10px",
                  marginBottom: "12px",
                  background: "#f8fafc",
                }}
              >
                <p><b>Appointment ID:</b> {r.appointmentId}</p>
                <p><b>Doctor:</b> {r.doctorName}</p>
                <p><b>Diagnosis:</b> {r.diagnosis}</p>
                <p><b>Prescription:</b> {r.prescription}</p>
                <p><b>Date:</b> {r.date}</p>

                <button
                  style={{
                    marginTop: "10px",
                    padding: "8px 14px",
                    borderRadius: "6px",
                    border: "none",
                    background:
                      "linear-gradient(180deg,#0aa3b5,#0284c7)",
                    color: "#fff",
                  }}
                >
                  Download Report
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MedicalReports;
