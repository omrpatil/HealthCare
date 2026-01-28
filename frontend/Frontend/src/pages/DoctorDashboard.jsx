import { useEffect, useState } from "react";

function DoctorDashboard() {
  // -----------------------------
  // STATE (API-ready)
  // -----------------------------
  const [stats, setStats] = useState({
    totalAppointments: 0,
    todayAppointments: 0,
    activeDoctors: 0,
    totalRevenue: 0,
  });

  const [recentAppointments, setRecentAppointments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [topServices, setTopServices] = useState([]);
  const [topDoctors, setTopDoctors] = useState([]);

  // -----------------------------
  // TEMP MOCK DATA (replace with API later)
  // -----------------------------
  useEffect(() => {
    // Dashboard stats
    setStats({
      totalAppointments: 128,
      todayAppointments: 6,
      activeDoctors: 24,
      totalRevenue: 4320,
    });

    // Recent appointment activity
    setRecentAppointments([
      {
        id: 1,
        patient: "John Doe",
        service: "Cardiology Consultation",
        date: "Tue, 20 Aug · 2:45 PM",
        status: "cancelled",
        fee: 150,
      },
      {
        id: 2,
        patient: "Emily Clark",
        service: "Dermatology Follow-up",
        date: "Wed, 21 Aug · 1:00 PM",
        status: "booked",
        fee: 35,
      },
    ]);

    // Today’s appointments
    setTodayAppointments([
      {
        id: 1,
        patient: "Natasha Tan",
        service: "General Checkup",
        time: "1:45 PM",
        fee: 40,
        status: "booked",
      },
      {
        id: 2,
        patient: "Wendy Smith",
        service: "Neurology Consultation",
        time: "2:30 PM",
        fee: 57,
        status: "booked",
      },
    ]);

    // Top medical services
    setTopServices([
      { name: "General Consultation", thisMonth: 10, lastMonth: 0 },
      { name: "Cardiology Consultation", thisMonth: 9, lastMonth: 0 },
      { name: "Dermatology Consultation", thisMonth: 6, lastMonth: 0 },
    ]);

    // Top doctors
    setTopDoctors([
      {
        name: "Dr. Alex Smith",
        thisMonth: 636,
        lastMonth: 0,
      },
    ]);
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-scroll">

        {/* ================= SUMMARY CARDS ================= */}
        <div className="dashboard-summary">
          <div className="summary-card">
            <p>Total Appointments</p>
            <h2>{stats.totalAppointments}</h2>
            <span>This month</span>
          </div>

          <div className="summary-card">
            <p>Appointments Today</p>
            <h2>{stats.todayAppointments}</h2>
            <span>Next 24 hours</span>
          </div>

          <div className="summary-card">
            <p>Active Doctors</p>
            <h2>{stats.activeDoctors}</h2>
            <span>Available</span>
          </div>

          <div className="summary-card highlight">
            <p>Total Revenue</p>
            <h2>${stats.totalRevenue}</h2>
            <span>This month</span>
          </div>
        </div>

        {/* ================= ACTIVITY SECTION ================= */}
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3 className="dashboard-card-title">
              Recent appointment activity
            </h3>

            {recentAppointments.map((appt) => (
              <div key={appt.id} className="activity-item">
                <div>
                  <strong>{appt.service}</strong>
                  <p>{appt.patient} · {appt.date}</p>
                  <span className={`status ${appt.status}`}>
                    {appt.status}
                  </span>
                </div>
                <strong>${appt.fee}</strong>
              </div>
            ))}
          </div>

          <div className="dashboard-card">
            <h3 className="dashboard-card-title">
              Today’s appointments
            </h3>

            {todayAppointments.map((appt) => (
              <div key={appt.id} className="activity-item">
                <div>
                  <strong>{appt.service}</strong>
                  <p>{appt.time} · {appt.patient}</p>
                  <span className={`status ${appt.status}`}>
                    {appt.status}
                  </span>
                </div>
                <strong>${appt.fee}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* ================= TABLE SECTION ================= */}
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3 className="dashboard-card-title">Top medical services</h3>

            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>This month</th>
                  <th>Last month</th>
                </tr>
              </thead>
              <tbody>
                {topServices.map((service, index) => (
                  <tr key={index}>
                    <td>{service.name}</td>
                    <td>{service.thisMonth}</td>
                    <td>{service.lastMonth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="dashboard-card">
            <h3 className="dashboard-card-title">Top doctor</h3>

            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>This month</th>
                  <th>Last month</th>
                </tr>
              </thead>
              <tbody>
                {topDoctors.map((doc, index) => (
                  <tr key={index}>
                    <td>{doc.name}</td>
                    <td>${doc.thisMonth}</td>
                    <td>${doc.lastMonth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DoctorDashboard;
