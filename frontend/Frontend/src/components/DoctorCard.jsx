import { useNavigate } from "react-router-dom";

function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  // ⭐ GET RATINGS FROM LOCAL STORAGE
  const ratings = JSON.parse(localStorage.getItem("ratings")) || [];

  // ⭐ FILTER RATINGS FOR THIS DOCTOR
  const doctorRatings = ratings.filter(
    (r) => r.doctorId === doctor.doctorId
  );

  // ⭐ CALCULATE AVERAGE RATING
  const avgRating =
    doctorRatings.length > 0
      ? (
          doctorRatings.reduce((sum, r) => sum + r.rating, 0) /
          doctorRatings.length
        ).toFixed(1)
      : "No ratings";

  const handleBook = () => {
    navigate(
      `/book-appointment?doctorId=${doctor.doctorId}&fee=${doctor.consultationFee}`
    );
  };

  return (
    <div className="doctor-card">
      <h4>Dr. {doctor.doctorName}</h4>
      <p>{doctor.specialization}</p>
      <p>Location: {doctor.location}</p>
      <p>Fee: ₹{doctor.consultationFee}</p>

      {/* ⭐ RATING DISPLAY */}
      <p style={{ marginTop: "6px", fontSize: "14px" }}>
        ⭐ Rating:{" "}
        <strong>
          {avgRating}
          {avgRating !== "No ratings" && " / 5"}
        </strong>
        {doctorRatings.length > 0 && (
          <span style={{ color: "#64748b" }}>
            {" "}
            ({doctorRatings.length} reviews)
          </span>
        )}
      </p>

      <button onClick={handleBook}>
        Book Appointment
      </button>
    </div>
  );
}

export default DoctorCard;
