import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../api/userApi";
import "./SignIn.css";

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 👇 FOR FORGOT PASSWORD POPUP
  const [showForgotPopup, setShowForgotPopup] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // remove old token
    localStorage.removeItem("token");

    try {
      const res = await loginUser({ email, password });

      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("name", res.data.firstName);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("email", email);

      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else if (res.data.role === "DOCTOR") {
        navigate("/doctor");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);
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

              {error && <p style={{ color: "red" }}>{error}</p>}

              <div className="links">
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => setShowForgotPopup(true)}
                >
                  Forgot Password
                </button>
                <NavLink to="/signup">Signup</NavLink>
              </div>

              <div className="inputBox">
                <input type="submit" value="Login" />
              </div>
            </form>

            {/* 🔽 FORGOT PASSWORD POPUP */}
            {showForgotPopup && (
              <div className="popup-overlay">
                <div className="popup-box">
                  <h3>Reset Account?</h3>
                  <p>
                    You have to delete the previous account and create a new
                    account.
                  </p>

                  <p style={{ fontSize: "13px", marginTop: "8px", color: "#ccc" }}>
                    or contact admin –{" "}
                    <a
                      href="mailto:hellodoc8@gmail.com"
                      style={{ color: "#4da6ff", textDecoration: "none" }}
                    >
                      hellodoc8@gmail.com
                    </a>
                  </p>


                  <div className="popup-actions">
                    <button
                      className="yes-btn"
                      onClick={() => {
                        setShowForgotPopup(false);
                        navigate("/signup");
                      }}
                    >
                      Yes
                    </button>

                    <button
                      className="no-btn"
                      onClick={() => setShowForgotPopup(false)}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* 🔼 POPUP END */}
          </div>
        </div>
      </section>
    </div>
  );
}
