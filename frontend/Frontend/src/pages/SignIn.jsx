import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignIn.css";

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8081/api/users/login",
        { email, password }
      );

      // ✅ STORE EVERYTHING REQUIRED
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("name", res.data.firstName);
      localStorage.setItem("role", res.data.role);

      // ✅ THIS WAS MISSING (MOST IMPORTANT)
      localStorage.setItem("email", email);

      setError("");
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="signin-page">
      <section>
        {Array.from({ length: 220 }).map((_, i) => (
          <span key={i}></span>
        ))}

        <div className="signin">
          <div className="signin-content">
            <h2>Sign In</h2>

            <form className="form" onSubmit={handleLogin}>
              <div className="inputBox">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i>Email</i>
              </div>

              <div className="inputBox">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i>Password</i>
              </div>

              {error && (
                <p style={{ color: "red", marginBottom: "10px" }}>
                  {error}
                </p>
              )}

              <div className="links">
                <a href="#">Forgot Password</a>
                <NavLink to="/signup">Signup</NavLink>
              </div>

              <div className="inputBox">
                <input type="submit" value="Login" />
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
