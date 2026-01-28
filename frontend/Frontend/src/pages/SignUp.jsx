import { useState } from "react";
import axios from "axios";
import "./SignUp.css";

function SignUp() {
  const [role, setRole] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    address: "",
    clinicLocation: "",
    consultationFee: "",
    experienceYears: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      alert("Please select Patient or Doctor");
      return;
    }

    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      dob: form.dob,
      email: form.email,
      phone: form.phone,
      password: form.password,
      gender: form.gender,
      role: role,
      address: role === "PATIENT" ? form.address : null,
      clinicLocation: role === "DOCTOR" ? form.clinicLocation : null,
      consultationFee: role === "DOCTOR" ? form.consultationFee : null,
      experienceYears: role === "DOCTOR" ? form.experienceYears : null,
    };

    try {
      await axios.post(
        "http://localhost:8081/api/users/register",
        payload
      );

      alert("✅ Account created successfully");
      window.location.href = "/signin";
    } catch (err) {
      console.error(err);
      alert("❌ Signup failed");
    }
  };

  return (
    <div className="signup-page">
      <section>
        {Array.from({ length: 220 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </section>

      <div className="signup">
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="row">
            <input
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>

          {/* DOB */}
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            required
          />

          {/* Email */}
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* Phone */}
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {/* Gender */}
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>

          {/* Role */}
          <div className="role-switch">
            <button
              type="button"
              className={role === "PATIENT" ? "active" : ""}
              onClick={() => setRole("PATIENT")}
            >
              Patient
            </button>

            <button
              type="button"
              className={role === "DOCTOR" ? "active" : ""}
              onClick={() => setRole("DOCTOR")}
            >
              Doctor
            </button>
          </div>

          {/* Patient Fields */}
          {role === "PATIENT" && (
            <input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              required
            />
          )}

          {/* Doctor Fields */}
          {role === "DOCTOR" && (
            <>
              <input
                name="clinicLocation"
                placeholder="Clinic Location"
                value={form.clinicLocation}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="consultationFee"
                placeholder="Consultation Fee"
                value={form.consultationFee}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="experienceYears"
                placeholder="Experience (Years)"
                value={form.experienceYears}
                onChange={handleChange}
                required
              />
            </>
          )}

          <button type="submit" className="submit-btn">
            Create Account
          </button>

          <p className="switch-auth">
            Already have an account? <a href="/signin">Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
