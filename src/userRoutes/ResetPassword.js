import React, { useState, useEffect } from "react";
import "../CSS/UserSettings.css"
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const token = localStorage.getItem("authToken");
  // Regex for email and password validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      setError(
        "Password must be at least 10 characters long, and include at least 1 letter, 1 number, and 1 special character."
      );
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:4000/api/user/resetPassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email, oldPassword, newPassword }),
        }
      );
      const data = await response.json();

      if (data.success) {
        setSuccess("Password reset successfully!");
        setEmail("");
        setOldPassword("");
        setNewPassword("");
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch (error) {
      setError("An error occurred while resetting the password.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
      setSuccess("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [error, success]);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Reset Password</h2>

            {error && (
              <div className="alert alert-danger text-center" role="alert">
                <i className="fa fa-exclamation-circle me-2"></i>
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success text-center" role="alert">
                <i className="fa fa-check-circle me-2"></i>
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className={`form-control ${
                    emailRegex.test(email) ? "is-valid" : email && "is-invalid"
                  }`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="oldPassword" className="form-label">
                  Old Password
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  className="form-control"
                  placeholder="Enter your old password"
                  value={oldPassword}
                  autoComplete="off"
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <div className="input-group">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="newPassword"
                    className={`form-control ${
                      passwordRegex.test(newPassword)
                        ? "is-valid"
                        : newPassword && "is-invalid"
                    }`}
                    placeholder="Enter your new password"
                    autoComplete="off"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                <small className="form-text text-muted">
                  At least 10 chars, 1 letter, 1 number, 1 special char.
                </small>
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                  <i className="fa fa-lock me-2"></i>
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
