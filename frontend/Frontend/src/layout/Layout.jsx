import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/available-doctors": "Available Doctors",
    "/book-appointment": "Book Appointment",
    "/medical-reports": "Medical Reports",
    "/payments": "Payments",
    "/settings": "Settings",
    "/profile": "My Profile",
  };

  const title = pageTitles[location.pathname] || "";

  return (
    <div className="layout">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="content">
        {/* GLOBAL HEADER */}
        <div className="top-header global-header">
          <button
            className="menu-toggle"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          <h1 className="page-title">{title}</h1>
        </div>

        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
