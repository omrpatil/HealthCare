function SpecialtyFilter({ active, setActive }) {
  const specialties = [
    "all",
    "cardiologist",
    "dermatologist",
    "pediatrician",
    "neurologist",
    "oncologist",
    "nephrologist",
  ];

  return (
    <div className="specialty-navbar">
      {specialties.map((s) => (
        <button
          key={s}
          className={`specialty-btn ${active === s ? "active" : ""}`}
          onClick={() => setActive(s)}
        >
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default SpecialtyFilter;
