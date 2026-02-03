// 
//First Part


  // useEffect(() => {
  //   // 🔹 Mock stats (replace later)
  //   setStats({
  //     totalAppointments: 128,
  //     todayAppointments: 6,
  //     activeDoctors: 24,
  //     totalRevenue: 4320,
  //   });

  //   if (doctorId) {
  //     getAppointmentsByDoctor(doctorId).then((res) => {
  //       setAppointments(res.data);
  //     });
  //   }
  // }, [doctorId]);
//   useEffect(() => {
//   setStats({
//     totalAppointments: 128,
//     todayAppointments: 6,
//     activeDoctors: 24,
//     totalRevenue: 4320,
//   });

//   if (userId) {
//     getDoctorByUserId(userId).then((res) => {
//       const doctorId = res.data.doctorId;

//       getAppointmentsByDoctor(doctorId).then((res) => {
//         setAppointments(res.data);
//       });
//     });
//   }
// }, [userId]);

//Second Part
// useEffect(() => {
//   setStats({
//     totalAppointments: 128,
//     todayAppointments: 6,
//     activeDoctors: 24,
//     totalRevenue: 4320,
//   });

//   if (!userId) return;

//   getDoctorByUserId(userId)
//     .then((res) => {
//       console.log("Doctor object:", res.data); //changed
//       const doctorId = res.data.doctorId;
//       return getAppointmentsByDoctor(doctorId);
//     })
//     .then((res) => {
//       console.log("Appointments:", res.data); //changed
//       setAppointments(res.data || []);
//     })
//     .catch((err) => {
//       console.error("Dashboard load failed:", err);
//       setAppointments([]); // prevent white screen
//     });

// }, [userId]);



//   return (
//     <div className="dashboard-page">
//       <div className="dashboard-scroll">

//         {/* ================= SUMMARY ================= */}
//         <div className="dashboard-summary">
//           <div className="summary-card">
//             <p>Total Appointments</p>
//             <h2>{stats.totalAppointments}</h2>
//           </div>

//           <div className="summary-card">
//             <p>Appointments Today</p>
//             <h2>{stats.todayAppointments}</h2>
//           </div>

//           <div className="summary-card">
//             <p>Active Doctors</p>
//             <h2>{stats.activeDoctors}</h2>
//           </div>

//           <div className="summary-card highlight">
//             <p>Total Revenue</p>
//             <h2>${stats.totalRevenue}</h2>
//           </div>
//         </div>

//         {/* ================= APPOINTMENTS ================= */}
//         <div className="dashboard-card">
//           <h3 className="dashboard-card-title">Your Appointments</h3>

//           <AppointmentList
//            appointments={appointments}
//            role="DOCTOR"
//            onConfirm={handleConfirm}
//            onComplete={handleComplete}
//           />

//         </div>

//       </div>
//     </div>
//   );
// }

// export default DoctorDashboard;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import AppointmentList from "../components/AppointmentList";
import {
  getAppointmentsByDoctor,
  updateAppointmentStatus,
} from "../api/appointmentApi";
import { getDoctorByUserId } from "../api/doctorApi";

/* ================= MODAL ================= */

function AvailabilityModal({ onYes, onSend, onReject, onClose }) {
  const [message, setMessage] = useState("");
  const [showMessageBox, setShowMessageBox] = useState(false);

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <h3>Are you available at this time?</h3>

        {!showMessageBox ? (
          <div style={styles.actions}>
            <button onClick={onYes} style={styles.yesBtn}>Yes</button>
            <button
              onClick={() => setShowMessageBox(true)}
              style={styles.noBtn}
            >
              No
            </button>
          </div>
        ) : (
          <>
            <textarea
              placeholder="Write message to patient..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={styles.textarea}
            />

            <div style={styles.actions}>
              <button
                onClick={() => onSend(message)}
                style={styles.sendBtn}
              >
                Send to Patient
              </button>
              <button
                onClick={() => onReject()}
                style={styles.rejectBtn}
              >
                Reject
              </button>
            </div>
          </>
        )}

        <button onClick={onClose} style={styles.cancelBtn}>
          Cancel
        </button>
      </div>
    </div>
  );
}

/* ================= DASHBOARD ================= */

function DoctorDashboard() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalAppointments: 0,
    todayAppointments: 0,
    activeDoctors: 1,
    totalRevenue: 0,
  });

  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  /* ===== CONFIRM CLICK ===== */
  const handleConfirmClick = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  /* ===== AVAILABLE YES ===== */
  const handleAvailableYes = async () => {
    await updateAppointmentStatus(selectedId, "CONFIRMED");

    setAppointments((prev) =>
      prev.map((a) =>
        a.id === selectedId ? { ...a, status: "CONFIRMED" } : a
      )
    );

    setShowModal(false);
  };

  /* ===== SEND MESSAGE (NO BACKEND) ===== */
  const handleSendMessage = (message) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === selectedId
          ? {
              ...a,
              doctorMessage: message,
              status: "BOOKED", // stays booked
            }
          : a
      )
    );

    setShowModal(false);
  };

  /* ===== REJECT ===== */
  const handleReject = async () => {
  try {
    await updateAppointmentStatus(selectedId, "REJECTED");

    setAppointments((prev) =>
      prev.map((a) =>
        a.id === selectedId
          ? { ...a, status: "REJECTED" }
          : a
      )
    );
  } catch (err) {
    console.error("Reject failed", err);
  } finally {
    setShowModal(false);
  }
};


  /* ===== COMPLETE ===== */
  const handleComplete = async (id) => {
    await updateAppointmentStatus(id, "COMPLETED");

    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "COMPLETED" } : a
      )
    );
  };

  /* ===== LOAD DATA ===== */
 useEffect(() => {
  if (!userId) {
    navigate("/login");
    return;
  }

  // ✅ userId IS doctorId in your DB mapping
  getAppointmentsByDoctor(userId)
    .then((res) => {
      const appts = res.data || [];
      setAppointments(appts);

      const today = new Date().toDateString();

      setStats({
        totalAppointments: appts.length,
        todayAppointments: appts.filter(
          (a) =>
            new Date(a.scheduledAt).toDateString() === today
        ).length,
        activeDoctors: 1,
        totalRevenue: appts
          .filter((a) => a.status === "COMPLETED")
          .reduce((sum, a) => sum + (a.fee || 0), 0),
      });
    })
    .catch(() => setAppointments([]))
    .finally(() => setLoading(false));

}, [userId, navigate]);


  return (
    <div className="dashboard-page">
      <div className="dashboard-scroll">

        {/* SUMMARY */}
        <div className="dashboard-summary">
          <div className="summary-card">
            <p>Total Appointments</p>
            <h2>{stats.totalAppointments}</h2>
          </div>

          <div className="summary-card">
            <p>Appointments Today</p>
            <h2>{stats.todayAppointments}</h2>
          </div>

          <div className="summary-card highlight">
            <p>Total Revenue</p>
            <h2>₹{stats.totalRevenue}</h2>
          </div>
        </div>

        {/* LIST */}
        <div className="dashboard-card">
          <h3>Your Appointments</h3>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <AppointmentList
              appointments={appointments}
              role="DOCTOR"
              onConfirm={handleConfirmClick}
              onComplete={handleComplete}
            />
          )}
        </div>
      </div>

      {showModal && (
        <AvailabilityModal
          onYes={handleAvailableYes}
          onSend={handleSendMessage}
          onReject={handleReject}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    padding: 20,
    width: 350,
    borderRadius: 10,
  },
  textarea: {
    width: "100%",
    height: 80,
    marginTop: 10,
  },
  actions: {
    display: "flex",
    gap: 10,
    marginTop: 10,
  },
  yesBtn: { background: "#16a34a", color: "#fff" },
  noBtn: { background: "#dc2626", color: "#fff" },
  sendBtn: { background: "#2563eb", color: "#fff" },
  rejectBtn: { background: "#b91c1c", color: "#fff" },
  cancelBtn: { marginTop: 10 },
};

export default DoctorDashboard;

