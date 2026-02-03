import { useEffect, useState } from "react";
import axios from "../api/axios";

function AdminDashboard() {
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 LOAD PENDING DOCTORS
  const loadPendingDoctors = async () => {
    try {
      const res = await axios.get("/admin/pending-doctors");
      setPendingDoctors(res.data);
    } catch (err) {
      console.error("Failed to load pending doctors", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 APPROVE DOCTOR
  const approveDoctor = async (id) => {
    try {
      await axios.put(`/admin/approve-doctor/${id}`);

      // ✅ FIXED: use id (not userId)
      setPendingDoctors((prev) =>
        prev.filter((doc) => doc.id !== id)
      );

      alert("Doctor approved");
    } catch (err) {
      alert("Approval failed");
    }
  };

  useEffect(() => {
    loadPendingDoctors();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        <h3>Pending Doctor Approvals</h3>

        {pendingDoctors.length === 0 ? (
          <p>No pending doctors</p>
        ) : (
          pendingDoctors.map((d) => (
            <div
              key={d.id}   // ✅ FIXED
              style={{
                border: "1px solid #e2e8f0",
                padding: "14px",
                borderRadius: "10px",
                marginBottom: "12px",
              }}
            >
              <p><b>Name:</b> {d.firstName} {d.lastName}</p>
              <p><b>Email:</b> {d.email}</p>

              <button
                onClick={() => approveDoctor(d.id)} // ✅ FIXED
                style={{
                  marginTop: "10px",
                  padding: "8px 14px",
                  background: "#16a34a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Approve
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
