import { useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";
import SpecialtyFilter from "../components/SpecialtyFilter";
import { getAllDoctors } from "../api/doctorApi";
import { useNavigate } from "react-router-dom"; 

function AvailableDoctors() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [active, setActive] = useState("all");

  // ✅ Doctor select handler
  const handleSelectDoctor = (doctor) => {
    localStorage.setItem("selectedDoctorId", doctor.doctorId);
    localStorage.setItem("selectedDoctorName", doctor.doctorName);
    localStorage.setItem("selectedSpecialization", doctor.specialization);

    navigate("/book-appointment");
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await getAllDoctors(active);
        setDoctors(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDoctors();
  }, [active]);

  const filteredDoctors = doctors.filter((doctor) => {
    const name = doctor?.doctorName || "";
    const loc = doctor?.location || "";

    return (
      name.toLowerCase().includes(search.toLowerCase()) &&
      loc.toLowerCase().includes(location.toLowerCase())
    );
  });

  return (
    <div className="dashboard-page">
      <div className="dashboard-sticky">
        <div className="page-header-row">
          <div />
          <div className="page-header-actions">
            <input
              placeholder="Search doctor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <input
              placeholder="Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <SpecialtyFilter active={active} setActive={setActive} />
      </div>

      <div className="dashboard-scroll">
        <div className="doctor-list">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.doctorId}
                doctor={doctor}
                onSelect={handleSelectDoctor}
              />
            ))
          ) : (
            <p>No doctors found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AvailableDoctors;
