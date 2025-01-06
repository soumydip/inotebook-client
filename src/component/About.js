import React from "react";
import Footer from "./Footer";

export default function About() {
  return (
    <>
    <div className="about-page container mt-5">
      {/* Page Title */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-4">About iNotebook</h1>
        <p className="text-muted">
          Your one-stop solution for organizing notes, tasks, and ideas.
        </p>
      </div>

      {/* Introduction Section */}
      <section className="row mb-5">
        <div className="col-md-6">
          <img
            src="https://via.placeholder.com/500x350"
            alt="About Us"
            className="img-fluid rounded shadow-sm"
          />
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <div>
            <h2 className="fw-bold mb-3">Who We Are</h2>
            <p className="lead">
              iNotebook is a simple yet powerful web-based application that
              allows you to create, edit, and manage your notes securely. Whether
              you're a student, professional, or a creative thinker, we provide
              the tools you need to stay organized.
            </p>
            <p>
              Built with the **MERN stack**, iNotebook ensures fast performance,
              secure data handling, and a user-friendly experience.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-5">
        <h2 className="fw-bold mb-4 text-center">Features of iNotebook</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <i className="fa-solid fa-lock fa-3x text-primary mb-3"></i>
            <h4>Secure Notes</h4>
            <p>Your notes are protected with secure authentication and storage.</p>
          </div>
          <div className="col-md-4">
            <i className="fa-solid fa-clock fa-3x text-primary mb-3"></i>
            <h4>Accessible Anytime</h4>
            <p>Access your notes from anywhere, anytime using the cloud.</p>
          </div>
          <div className="col-md-4">
            <i className="fa-solid fa-user-plus fa-3x text-primary mb-3"></i>
            <h4>User Friendly</h4>
            <p>Clean interface designed for a smooth user experience.</p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="text-center mb-5">
        <h2 className="fw-bold mb-4">Our Mission</h2>
        <p className="lead">
          To provide a seamless note management platform that enhances
          productivity and creativity for individuals and teams alike.
        </p>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="fw-bold mb-4 text-center">Meet the Team</h2>
        <div className="row text-center">
          <div className="col-md-3">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="rounded-circle mb-3"
            />
            <h5>John Doe</h5>
            <p>Founder & CEO</p>
          </div>
          <div className="col-md-3">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="rounded-circle mb-3"
            />
            <h5>Jane Smith</h5>
            <p>Lead Developer</p>
          </div>
          <div className="col-md-3">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="rounded-circle mb-3"
            />
            <h5>Michael Brown</h5>
            <p>UI/UX Designer</p>
          </div>
          <div className="col-md-3">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="rounded-circle mb-3"
            />
            <h5>Emily Davis</h5>
            <p>Marketing Lead</p>
          </div>
        </div>
      </section>
      
    </div>
    <Footer/>
    </>
  );
}
