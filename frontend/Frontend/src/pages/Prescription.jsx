import { useEffect, useState } from "react";
import { prescriptions } from "../utils/mockPrescriptions";
import { generatePDF } from "../utils/pdfGenerator";

export default function Prescriptions() {
  const [visible, setVisible] = useState(false);
  const [finalPrescription, setFinalPrescription] = useState(null);

  // 🔥 REAL DATA
  const patientName = localStorage.getItem("name");
  const doctorName = localStorage.getItem("selectedDoctorName");
  const specialization = localStorage.getItem("selectedSpecialization");

  useEffect(() => {
    const timer = setTimeout(() => {
      // 1️⃣ Filter prescriptions by specialization
      const matched = prescriptions.filter(
        (p) => p.specialization === specialization
      );

      // 2️⃣ Pick ONE randomly (out of 3)
      if (matched.length > 0) {
        const randomOne =
          matched[Math.floor(Math.random() * matched.length)];

        setFinalPrescription(randomOne);
      }

      setVisible(true);
    }, 15000); // ⏱ 15 sec delay (as required)

    return () => clearTimeout(timer);
  }, [specialization]);

  if (!visible) {
    return <p>Generating prescription...</p>;
  }

  if (!finalPrescription) {
    return <p>No prescription available</p>;
  }

  return (
    <div className="prescription-card">
      <h3>Prescription</h3>

      <p><b>Patient:</b> {patientName}</p>
      <p><b>Doctor:</b> {doctorName}</p>
      <p><b>Specialization:</b> {specialization}</p>

      <ul>
        {finalPrescription.medicines.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>

      <button
        onClick={() =>
          generatePDF({
            patientName,
            doctorName,
            specialization,
            medicines: finalPrescription.medicines,
          })
        }
      >
        Download PDF
      </button>
    </div>
  );
}
