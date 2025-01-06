import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/signup.css";
export default function SignUp() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  // Handle checkbox toggle
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validation, setValidation] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone: false,
  });

  // Regex patterns for validation
  const regexPatterns = {
    name: /^[a-zA-Z\s]{5,30}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
    phone: /^\d{10}$/,
  };

  // Handle input changes and validate fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "confirmPassword") {
      setValidation((prev) => ({
        ...prev,
        confirmPassword: value === formData.password,
      }));
    } else if (regexPatterns[name]) {
      setValidation((prev) => ({
        ...prev,
        [name]: regexPatterns[name].test(value),
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, phone } = formData;

    if (!Object.values(validation).every((isValid) => isValid)) {
      setErrorMessage("Please ensure all fields are valid.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/signup",
        {
          userName: name,
          email,
          password,
          phone,
        }
      );

      if (response.data.success) {
        localStorage.setItem("authToken", response.data.user.token);
        localStorage.setItem("theme","light");
        alert("Registration successful!");
        navigate("/");
      } else {
        setErrorMessage(response.data.message || "Registration failed.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data.message || "Network Error. Please try again."
      );
    }
  };

  return (
    <div className="container from-data mt-5 containerS">
      <div className="user">
        <h2>Register</h2>

        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className={`form-control ${
                validation.name ? "is-valid" : "is-invalid"
              }`}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className={`form-control ${
                validation.email ? "is-valid" : "is-invalid"
              }`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone Field */}
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone:
            </label>
            <input
              type="text"
              className={`form-control ${
                validation.phone ? "is-valid" : "is-invalid"
              }`}
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <div className="input-group">
              <p className="fw-lighter fs-6 text-info">
                At least 10 chars, 1 letter, 1 number, 1 special char
              </p>
              <input
                type={passwordVisible ? "text" : "password"}
                className={`form-control ${
                  validation.password ? "is-valid" : "is-invalid"
                }`}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
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

          {/* Confirm Password Field */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password:
            </label>
            <input
              type="text"
              className={`form-control ${
                validation.confirmPassword ? "is-valid" : "is-invalid"
              }`}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
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
            Register
          </button></center>
          <p className="mt-3 text-center">
            Have an account?{" "}
            <Link to="/login">
              <span style={{ color: "aqua" }}>Login here</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
