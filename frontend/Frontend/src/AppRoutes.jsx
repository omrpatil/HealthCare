import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";

import AvailableDoctors from "./pages/AvailableDoctors";
import BookAppointment from "./pages/BookAppointment";
import MedicalReports from "./pages/MedicalReports";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";


function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* PROTECTED */}
      <Route element={<Layout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/doctor" element={<DoctorDashboard />} />

        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="/doctors" element={<AvailableDoctors />} />
        <Route path="/reports" element={<MedicalReports />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
       

      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
  );
}

export default AppRoutes;
