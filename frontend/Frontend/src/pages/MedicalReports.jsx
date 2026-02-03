import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./MedicalReports.css";

function MedicalReports() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);

  const handleOk = () => {
    setShowPopup(false);
    navigate("/dashboard"); // ✅ redirect to dashboard
  };

  return (
    <div className="dashboard-page">
      <h2>Medical Reports</h2>

      {/* CONFIDENTIAL POPUP */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="confidential-popup">
            <h3 className="confidential-title">
              ⚠ Confidential Medical Notice
            </h3>

            <p>
              This medical report contains sensitive and confidential patient
              information.
            </p>

            <p>
              For privacy and medical regulations, online access to this report
              is restricted.
            </p>

            <p>
              Please visit the hospital or consult your doctor to collect the
              report. Online report download is not available.
            </p>

            <button
              className="confidential-btn"
              onClick={handleOk}   // ✅ FIXED
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* DUMMY MEDICAL REPORT */}
      <div className="report-card">
        <h3>Hospital Medical Report</h3>

        <div className="report-meta">
          <p><strong>Patient Name:</strong> #########</p>
          <p><strong>Doctor:</strong> ############(@)</p>
          <p><strong>Date:</strong> ######</p>
          <p><strong>Report ID:</strong> ##</p>
        </div>

        <hr />

        <h4>Diagnosis</h4>
        <p>
          ##########################
          #########################
        </p>

        <h4>Prescribed Treatment</h4>
        <ul>
          <li>################# – once daily</li>
          <li>################# – once daily</li>
          <li>################</li>
          <li>#############</li>
        </ul>

        <h4>Doctor’s Advice</h4>
        <p>###############################</p>

        <div className="report-footer">
          <p><strong>Status:</strong> Verified</p>
          <p><strong>Note:</strong> Online download is disabled</p>
        </div>
      </div>
    </div>
  );
}

export default MedicalReports;
