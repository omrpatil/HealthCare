import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Layout() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main
        style={{
          marginLeft: "260px",
          width: "100%",
          padding: "20px",
          background: "#f8fafc",
          minHeight: "100vh",
          overflowY: "auto",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
