export default function Profile() {
  const name = localStorage.getItem("name") || "User";
  const role = localStorage.getItem("role") || "PATIENT";
  const email = localStorage.getItem("email") || "Not available";

  return (
    <div style={{ padding: "30px" }}>
      <h2>My Profile</h2>

      <div style={{ marginTop: "20px" }}>
        <img
          src="https://i.pravatar.cc/150"
          alt="User"
          style={{ borderRadius: "50%", marginBottom: "10px" }}
        />

        <h2>{name} {role === "PATIENT" ? "Patient" : "Doctor"}</h2>
        <p>Email: {email}</p>
        <p>Role: {role}</p>
        <p>Member since: 2024</p>
      </div>
    </div>
  );
}
