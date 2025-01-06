import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../othersRoutes/AllContext";
import "../CSS/All.css";

export default function Navbar() {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken"); // Get the token from localStorage

  const handleNavigate = (path) => {
    setIsModalOpen(false);
    navigate(path);
  };

  // Toggle Modal Function
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Close Modal when clicking outside
  const closeModalOnOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setIsModalOpen(false);
    }
  };

  // Function to check if a link is active
  const isActiveLink = (path) =>
    location.pathname === path ? "activeLink" : "";

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken"); // Remove the token from localStorage
    alert("Successfully logged out");
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div>
      {/* Always render Navbar */}
      <nav
        className={`navbar navbar-expand-lg bg-body-tertiary ${
          theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"
        }`}
      >
        <div className="container-fluid navbarmain fixed-top">
          <Link className="navbar-brand" to="/" style={{ color: "white" }}>
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
            <li className="nav-item">
                <Link
                  className={`nav-link ${isActiveLink("/add-note")}`}
                  to="/add-note"
                  style={{ padding: "5px" }}
                >
                  Add note
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActiveLink("/")}`}
                  aria-current="page"
                  to="/"
                  style={{ color: "white", padding: "5px" }}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActiveLink("/help")}`}
                  to="/help"
                  style={{ padding: "5px" }}
                >
                  Help
                </Link>
              </li>
              
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActiveLink("/about")}`}
                  style={{ padding: "5px" }}
                  to="/about"
                >
                  About
                </Link>
              </li>
              {token && (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActiveLink("/profile")}`}
                    to="/profile"
                    style={{ padding: "5px" }}
                  >
                    <i className="fa-solid fa-user"></i>
                  </Link>
                </li>
              )}
              {token && (
                <li className="nav-item">
                  <button
                    className="btn btn-outline-dark"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasSidebar"
                    aria-controls="offcanvasSidebar"
                  >
                    <i className="fa-solid fa-bars"></i>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Render Sidebar and Shortcut Button only when token exists */}
      {token && (
        <>
          {/* Offcanvas Sidebar */}
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasSidebar"
            aria-labelledby="offcanvasSidebarLabel"
          >
            <div className="offcanvas-header">
              <h2 className="offcanvas-title" id="offcanvasSidebarLabel">
                iNotebook Menu
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="list-group">
                <h3>Note</h3>
                <Link to="/">
                <li className={`list-group-item `}>
                   <i className="fa-solid fa-file mx-3"></i>My Notes
                </li>
                </Link>
                <Link to="/add-note">
                <li className={`list-group-item `}>
                  <i className="fa-solid fa-plus mx-3"></i>Add Note
                </li>
                </Link>
                <Link to="/recycle-bin">
                <li className={`list-group-item `}>
                  <i className="fa-solid fa-trash mx-3"></i>Recycle Bin
                </li>
                </Link>
                <hr />

                <h3>My Profile</h3>
                <Link to="/profile">
                <li className={`list-group-item`}>
                  <i className="fa-solid fa-user mx-3"></i>Profile
                </li>
                </Link>
                <Link to="/update-profile">
                <li className={`list-group-item`}>
                  <i className="fa-solid fa-user-pen mx-3"></i>Update Profile
                </li>
                </Link>
                <Link to="/reset-password">
                <li className={`list-group-item`}>
                  <i className="fa-solid fa-pen-to-square mx-3"></i>Reset Password
                </li>
                </Link>
                

                <hr />
                <Link to="/Settings">
                <li className={`list-group-item`}>
                  <i className="fa-solid fa-gear mx-3"></i>Settings
                </li>
                </Link>
                <Link to="/help">
                <li className={`list-group-item`}>
                  <i className="fa-solid fa-circle-question mx-3"></i>Help
                </li>
                </Link>
                <Link to="/about">
                <li className={`list-group-item`}>
                  <i className="fa-solid fa-question mx-3"></i>About
                </li>
                </Link>
                <Link to="/help">
                <li className={`list-group-item`}>
                 <i className="fa-regular fa-message mx-3"></i>Send Feedback
                </li>
                </Link>
                <li className="list-group-item"  onClick={logout}>
                <i className="fa-solid fa-arrow-right-from-bracket mx-3"></i>
                  logout
                </li>
              </ul>
            </div>
          </div>

          {/* Shortcut button */}
          <div
            className="d-flex justify-content-end align-items-end"
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              zIndex: "10",
            }}
          >
            <button
              className={`btn btn-info ${isModalOpen ? "active" : ""}`}
              onClick={toggleModal}
              title="More Action"
              style={{
                borderRadius: "10px",
                padding: "10px",
                fontSize: "24px",
              }}
            >
              <i
                className={`fa-solid ${
                  isModalOpen ? "fa-times" : "fa-compress-arrows-alt"
                }`}
              ></i>
            </button>
          </div>

          {/* Modal Box */}
          {isModalOpen && (
            <div
              className="modal-overlay"
              onClick={closeModalOnOutsideClick}
              style={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: "9",
              }}
            >
              <div
                className="modal-box"
                style={{
                  position: "fixed",
                  bottom: "100px",
                  right: "20px",
                  width: "300px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(0, 0, 0, 0.9)",
                  color: "white",
                  boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
                  padding: "20px",
                }}
              >
                <div className="row rowSpacile text-center hero-btn">
                  <div
                    className="hero-shortcut-addtianal-btn"
                    onClick={() => handleNavigate("/add-note")}
                  >
                    <i className="fa-solid fa-plus"></i>
                    <p>Add Note</p>
                  </div>
                  <div
                    className="hero-shortcut-addtianal-btn"
                    onClick={() => handleNavigate("/recycle-bin")}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                    <p>Recycle Bin</p>
                  </div>
                  <div
                    className="hero-shortcut-addtianal-btn"
                    onClick={() => handleNavigate("/profile")}
                  >
                    <i className="fa-solid fa-user"></i>
                    <p>My Profile</p>
                  </div>
                  <div
                    className="hero-shortcut-addtianal-btn"
                    onClick={() => handleNavigate("/")}
                  >
                    <i className="fa-solid fa-book-open"></i>
                    <p>My Note</p>
                  </div>
                  <div
                    className="hero-shortcut-addtianal-btn"
                    onClick={() => handleNavigate("/Settings")}
                  >
                    <i className="fa-solid fa-gear"></i>
                    <p>Settings</p>
                  </div>
                  <div className="hero-shortcut-addtianal-btn" onClick={logout}>
                    <i className="fa-solid fa-sign-out-alt"></i>
                    <p>Log Out</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
