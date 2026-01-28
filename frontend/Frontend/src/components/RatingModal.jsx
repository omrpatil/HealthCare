import { useState } from "react";

function RatingModal({ doctorId, onClose }) {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const submitRating = () => {
    const ratings =
      JSON.parse(localStorage.getItem("ratings")) || [];

    ratings.push({
      doctorId,
      rating,
      review,
      date: new Date().toLocaleDateString(),
    });

    localStorage.setItem("ratings", JSON.stringify(ratings));
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Rate Doctor</h3>

        <label>Rating (1–5)</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <textarea
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          style={{ width: "100%", marginTop: "10px" }}
        />

        <button
          onClick={submitRating}
          style={{
            marginTop: "10px",
            width: "100%",
            background:
              "linear-gradient(180deg,#0aa3b5,#0284c7)",
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "6px",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default RatingModal;
