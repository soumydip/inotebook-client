import React from "react";
import { useTheme } from "../othersRoutes/AllContext"; // Theme Context Import
import { Link, useNavigate } from "react-router-dom";
import "../CSS/UserSettings.css";
import axios from "axios";
const UserSetting = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("theme");
    alert("Successfully logged out");
    navigate("/login"); // Navigate to the login page
  };
  //delete account
  const handleDeleteAccount = async () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (userConfirmed) {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.delete(
          "http://localhost:4000/api/user/deleteUser",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.success) {
          alert("Your account has been deleted successfully."); // Optionally, you can clear user data from local storage or redirect to login page
          localStorage.removeItem("authToken");
          localStorage.removeItem('theme');
          window.location.href = "/login"; //Redirect to login page
        } else {
          alert("Failed to delete your account. Please try again later.");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        alert(
          "An error occurred while deleting your account. Please try again later."
        );
      }
    }
  };
  return (
    <div
      className={`container mt-5 p-4 rounded ${
        theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <h2 className="text-center mb-4">Settings</h2>

      {/* Theme Selection */}
      <div className="text-center mb-4">
        <p className="mb-3">Choose your theme:</p>

        <button
          className={`btn ${
            theme === "light" ? "btn-primary" : "btn-outline-primary"
          } me-3`}
          onClick={() => theme !== "light" && toggleTheme()}
        >
          <i className="fas fa-sun me-2"></i> Light Mode
        </button>

        <button
          className={`btn ${
            theme === "dark" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => theme !== "dark" && toggleTheme()}
        >
          <i className="fas fa-moon me-2"></i> Dark Mode
        </button>
      </div>

      {/* Account Management */}
      <div className="text-center mb-4">
        <p className="mb-3">Manage Your Account:</p>
        <Link to="/update-profile">
          <button
            className={`btn ${
              theme === "dark" ? "btn-warning" : "btn-outline-warning"
            } me-3`}
          >
            Update Profile
          </button>
        </Link>
        <Link to="/reset-password">
          <button
            className={`btn ${
              theme === "dark" ? "btn-secondary" : "btn-outline-secondary"
            } me-3`}
          >
            Change Password
          </button>
        </Link>
        <button
          className={`btn ${
            theme === "dark" ? "btn-danger" : "btn-outline-danger"
          }`}
          onClick={handleDeleteAccount}
        >
          {" "}
          Delete Account{" "}
        </button>
      </div>

      {/* Privacy Settings */}
      <div className="text-center mb-4">
        <p className="mb-3">Privacy Settings:</p>
        <button
          className={`btn ${
            theme === "dark" ? "btn-info" : "btn-outline-info"
          }`}
        >
          Manage Privacy
        </button>
      </div>

      {/* Help Section */}
      <div className="text-center mb-4">
        <p className="mb-3">Need Help?</p>
        <Link to="/help">
          <button
            className={`btn ${
              theme === "dark" ? "btn-primary" : "btn-outline-primary"
            } rounded-pill px-4 py-2`}
          >
            View FAQs / Support
          </button>
        </Link>
      </div>

      {/* About Section */}
      <div className="text-center mb-4">
        <p className="mb-3">About This App:</p>
        <button
          className={`btn ${
            theme === "dark" ? "btn-dark" : "btn-outline-dark"
          }`}
        >
          Version 1.0.0
        </button>
      </div>

      {/* Logout Option */}
      <div className="text-center">
        <button
          onClick={logout}
          className={`btn ${
            theme === "dark" ? "btn-danger" : "btn-outline-danger"
          } px-4 py-2`}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserSetting;
