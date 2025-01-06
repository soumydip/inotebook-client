import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../CSS/signup.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // Toggle password visibility
    const [isChecked, setIsChecked] = useState(false);
    // Handle checkbox toggle
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };
  const navigate = useNavigate();

  // Handle form submission for login
  const handleLogin = async (e) => {
    e.preventDefault();

    // Email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if fields are empty or invalid
    if (!email || !password) {
      setErrorMessage("Email and Password cannot be blank.");
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/login",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        localStorage.setItem("authToken", response.data.token);
        
        alert(response.data.message);
        localStorage.setItem("theme","light");
        navigate("/", { replace: true });
        
      } else {
        setErrorMessage(
          response.data.message || "Login failed. Please try again."
        );
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "An error occurred. Please try again.";
      setErrorMessage(errorMsg);
    }
  };

  return (
    <div className="displayBox">
      <div className="container from-data mt-5 containerS">
        <div className="fromthis user">
          <h2>Login</h2>
          <div className="errorMessageFrom">
            {errorMessage && (
              <div className="alert alert-danger alertMessage">
                {errorMessage}
              </div>
            )}
          </div>
          <form onSubmit={handleLogin} className="needs-validation" noValidate>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <div className="input-group">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  <i
                    className={`fa ${
                      passwordVisible ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
            <div className="form-check mt-4">
            <input
              type="checkbox"
              className="form-check-input"
              id="acceptTerms"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="acceptTerms">
              I agree to the <Link to="/inotebook/terms-and-conditions" target="_blank" id="term">terms and conditions.</Link>
            </label>
          </div>
          <center><button type="submit" className={`btn btn-${isChecked?"success":"btn-outline-success"}`} disabled={!isChecked} >
            login 
          </button></center>
            <p style={{ color: "white", paddingTop: "20px" }}>
              Have No Account?
              <Link to="/signup" style={{ color: "aqua" }}>
                {" "}
                Click Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
