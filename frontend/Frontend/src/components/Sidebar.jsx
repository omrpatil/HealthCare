import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const userName = localStorage.getItem("name") || "User";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <aside className={`modern-sidebar ${sidebarOpen ? "open" : ""}`}>
      <div>
        <div className="logo">
          <span className="logo-icon">🩺</span>
          <h2>HelloDoc</h2>
        </div>

        <div className="menu-section">
          <p className="menu-title">MAIN</p>

          <NavLink to="/dashboard" end className="menu-item" onClick={() => setSidebarOpen(false)}>
            Dashboard
          </NavLink>

          <NavLink to="/available-doctors" className="menu-item" onClick={() => setSidebarOpen(false)}>
            Available Doctors
          </NavLink>

          <NavLink to="/book-appointment" className="menu-item" onClick={() => setSidebarOpen(false)}>
            Book Appointment
          </NavLink>

          <NavLink to="/medical-reports" className="menu-item" onClick={() => setSidebarOpen(false)}>
            Medical Reports
          </NavLink>

          <NavLink to="/payments" className="menu-item" onClick={() => setSidebarOpen(false)}>
            Payments
          </NavLink>
        </div>

        <div className="menu-section">
          <p className="menu-title">ACCOUNT</p>

          <NavLink to="/settings" className="menu-item" onClick={() => setSidebarOpen(false)}>
            Settings
          </NavLink>

          <div className="menu-item logout" onClick={handleLogout}>
            Logout
          </div>
        </div>
      </div>

      {/* USER PROFILE BOTTOM */}
      <div
        className="user-card clickable"
        onClick={() => {
          setSidebarOpen(false);
          navigate("/profile");
        }}
      >
        <img src="https://i.pravatar.cc/100" alt="User" />
        <strong>{userName}</strong>
      </div>
    </aside>
  );
}

export default Sidebar;
