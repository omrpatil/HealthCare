import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const userName = localStorage.getItem("name") || "User";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <aside className="modern-sidebar">
      <div>
        {/* LOGO */}
        <div className="logo">
          <span className="logo-icon">🩺</span>
          <h2>HelloDoc</h2>
        </div>

        {/* MAIN MENU */}
        <div className="menu-section">
          <p className="menu-title">MAIN</p>

          <NavLink to="/dashboard" className="menu-item">
            Dashboard
          </NavLink>

          <NavLink to="/doctors" className="menu-item">
            Available Doctors
          </NavLink>

          <NavLink to="/book-appointment" className="menu-item">
            Book Appointment
          </NavLink>

          <NavLink to="/reports" className="menu-item">
            Medical Reports
          </NavLink>

         

          <NavLink to="/profile" className="menu-item">
            Profile
          </NavLink>

          <NavLink to="/settings" className="menu-item">
            Settings
          </NavLink>
        </div>

        {/* ACCOUNT */}
        <div className="menu-section">
          <p className="menu-title">ACCOUNT</p>

          <div className="menu-item logout" onClick={handleLogout}>
            Logout
          </div>
        </div>
      </div>

      {/* USER PROFILE */}
      <div
        className="user-card clickable"
        onClick={() => navigate("/profile")}
      >
        <img src="https://i.pravatar.cc/100" alt="User" />
        <strong>{userName}</strong>
      </div>
    </aside>
  );
}

export default Sidebar;
