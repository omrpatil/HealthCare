import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";

import SignIn from "./pages/SignIn";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import AvailableDoctors from "./pages/AvailableDoctors";
import BookAppointment from "./pages/BookAppointment";
import MedicalReports from "./pages/MedicalReports";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";

function App() {
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              role === "DOCTOR" ? (
                <DoctorDashboard />
              ) : (
                <PatientDashboard />
              )
            }
          />

          <Route path="/available-doctors" element={<AvailableDoctors />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/medical-reports" element={<MedicalReports />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
